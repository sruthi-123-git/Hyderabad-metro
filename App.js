import React, { useState } from "react";
import { MetroNetworkProvider } from "./MetroNetworkContext";
import UserView from "./UserView";
import AdminView from "./AdminView";

function App() {

  return (
    <MetroNetworkProvider>
      <div style={{ padding: 20 }}>
        <button onClick={() => setIsAdmin(!isAdmin)}>
          Switch to {isAdmin ? "User" : "Admin"} View
        </button>
        {isAdmin ? <AdminView /> : <UserView />}
      </div>
    </MetroNetworkProvider>
  );
}

export default App;
