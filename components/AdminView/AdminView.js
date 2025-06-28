import React, { useState } from "react";
import { useMetroNetwork } from "./MetroNetworkContext";

export default function AdminView() {
  const { stations, setStations } = useMetroNetwork();
  const [newStationName, setNewStationName] = useState("");
  const [newStationId, setNewStationId] = useState("");

  const addStation = () => {
    if (!newStationId || !newStationName) return;
    if (stations.find(s => s.id === newStationId)) {
      alert("Station ID already exists!");
      return;
    }
    setStations([...stations, { id: newStationId, name: newStationName, lines: [] }]);
    setNewStationName("");
    setNewStationId("");
  };

  return (
    <div>
      <h2>Admin: Manage Stations</h2>
      <ul>
        {stations.map(s => (
          <li key={s.id}>{s.name} (ID: {s.id})</li>
        ))}
      </ul>

      <h3>Add New Station</h3>
      <input
        placeholder="Station ID"
        value={newStationId}
        onChange={e => setNewStationId(e.target.value)}
      />
      <input
        placeholder="Station Name"
        value={newStationName}
        onChange={e => setNewStationName(e.target.value)}
        style={{ marginLeft: 10 }}
      />
      <button onClick={addStation} style={{ marginLeft: 10 }}>Add Station</button>
    </div>
  );
}
