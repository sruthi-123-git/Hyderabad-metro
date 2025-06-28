import React, { useState } from "react";
import { useMetroNetwork } from "./MetroNetworkContext";

export default function UserView() {
  const { stations, findShortestPath } = useMetroNetwork();

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleFindRoute = () => {
    setError("");
    if (!start || !end) {
      setError("Please select both start and end stations.");
      setResult(null);
      return;
    }
    if (start === end) {
      setError("Start and end stations cannot be the same.");
      setResult(null);
      return;
    }

    const routeInfo = findShortestPath(start, end);
    if (!routeInfo) {
      setError("No route found between selected stations.");
      setResult(null);
    } else {
      setResult(routeInfo);
    }
  };

  return (
    <div>
      <h2>Find Optimal Metro Route</h2>
      <select onChange={e => setStart(e.target.value)} value={start}>
        <option value="">Select Start Station</option>
        {stations.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
      </select>
      <select onChange={e => setEnd(e.target.value)} value={end} style={{ marginLeft: 10 }}>
        <option value="">Select End Station</option>
        {stations.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
      </select>
      <button onClick={handleFindRoute} style={{ marginLeft: 10 }}>Find Route</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Route Details</h3>
          <p><strong>Path:</strong> {result.path.map(id => stations.find(s => s.id === id).name).join(" → ")}</p>
          <p><strong>Total Travel Time:</strong> {result.totalTime} minutes</p>
          <p><strong>Total Fare:</strong> ₹{result.totalFare}</p>
        </div>
      )}
    </div>
  );
}
