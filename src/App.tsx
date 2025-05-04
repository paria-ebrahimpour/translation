import { useState } from "react";
import "./App.css";
import Dashboard from "./components/modules/Dashboard";
import PublicView from "./components/modules/PublicView";

function App() {
  const [view, setView] = useState("dashboard");

  return (
    <div className="container">
      <header>
        <h1>Word Translation Dashboard</h1>
        <div className="view-toggle">
          <button onClick={() => setView("dashboard")}>Dashboard</button>
          <button onClick={() => setView("public")}>Public View</button>
        </div>
      </header>
      {view === "dashboard" ? <Dashboard /> : <PublicView />}
    </div>
  );
}

export default App;
