import React, { createContext, useState, useContext } from "react";

const MetroNetworkContext = createContext();

export function useMetroNetwork() {
  return useContext(MetroNetworkContext);
}

export function MetroNetworkProvider({ children }) {
  const [stations, setStations] = useState([
    { id: "miyapur", name: "Miyapur", lines: ["Red Line"] },
    { id: "ameerpet", name: "Ameerpet", lines: ["Red Line", "Blue Line"] },
    { id: "jntu_college", name: "JNTU College", lines: ["Red Line"] },
    
  ]);

  const [edges, setEdges] = useState([
    { from: "miyapur", to: "kukatpally", distance: 3, travelTime: 5, fare: 10 },
    { from: "kukatpally", to: "jntu_college", distance: 4, travelTime: 6, fare: 12 },
    { from: "jntu_college", to: "ameerpet", distance: 5, travelTime: 7, fare: 15 },
    
  ]);

  // Function to get neighbors of a station
  const getNeighbors = (stationId) => {
    return edges
      .filter(edge => edge.from === stationId)
      .map(edge => ({ id: edge.to, distance: edge.distance, travelTime: edge.travelTime, fare: edge.fare }));
  };

  function findShortestPath(startId, endId) {
    const distances = {};
    const previous = {};
    const fares = {};
    const times = {};
    const visited = new Set();

    stations.forEach(s => {
      distances[s.id] = Infinity;
      fares[s.id] = 0;
      times[s.id] = 0;
    });
    distances[startId] = 0;

    while (visited.size < stations.length) {
      // Pick unvisited node with smallest distance
      let currentStation = null;
      let smallestDistance = Infinity;

      for (const stationId in distances) {
        if (!visited.has(stationId) && distances[stationId] < smallestDistance) {
          smallestDistance = distances[stationId];
          currentStation = stationId;
        }
      }

      if (!currentStation || currentStation === endId) break;

      visited.add(currentStation);

      const neighbors = getNeighbors(currentStation);
      neighbors.forEach(({ id: neighborId, travelTime, fare }) => {
        if (!visited.has(neighborId)) {
          const alt = distances[currentStation] + travelTime;
          if (alt < distances[neighborId]) {
            distances[neighborId] = alt;
            previous[neighborId] = currentStation;
            fares[neighborId] = (fares[currentStation] || 0) + fare;
            times[neighborId] = (times[currentStation] || 0) + travelTime;
          }
        }
      });
    }

    // Reconstruct path
    if (distances[endId] === Infinity) return null;

    let path = [];
    let current = endId;
    while (current) {
      path.unshift(current);
      current = previous[current];
    }

    return {
      path,
      totalTime: times[endId],
      totalFare: fares[endId],
    };
  }

  return (
    <MetroNetworkContext.Provider value={{
      stations,
      setStations,
      edges,
      setEdges,
      findShortestPath
    }}>
      {children}
    </MetroNetworkContext.Provider>
  );
}
