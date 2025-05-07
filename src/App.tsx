import { useState } from "react";
import PublicView from "./components/modules/PublicView";
import TranslationManagerView from "./components/modules/TranslationManagerView";

function App() {
  const [view, setView] = useState<"public" | "dashboard">("dashboard");

  return (
    <div className="max-w-[400px] m-auto p-4 mt-8 bg-white rounded-lg">
      <header>
        <div className="flex gap-2 mb-8">
          <button className="bg-[#3A59D1]" onClick={() => setView("dashboard")}>
            Dashboard
          </button>
          <button className="bg-[#3D90D7]" onClick={() => setView("public")}>
            Public View
          </button>
        </div>
      </header>
      {view === "dashboard" ? <TranslationManagerView /> : <PublicView />}
    </div>
  );
}

export default App;
