import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import Home from "./pages/Home";
import PYQAnalyzer from "./pages/PYQAnalyzer";
import About from "./pages/About";
import Results from "./pages/Results";
import DynamicIsland from "./components/DynamicIsland";
import Aurora from "./components/Aurora";
import { DynamicIslandContext } from "./context/DynamicIslandContext";

function App() {
  const [forceExpanded, setForceExpanded] = useState(false);
  const islandRef = useRef(null);

  const expandDynamicIsland = () => {
    setForceExpanded(true);
  };

  // Handle clicks outside to contract the island
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        forceExpanded &&
        islandRef.current &&
        !islandRef.current.contains(event.target)
      ) {
        setForceExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [forceExpanded]);

  return (
    <DynamicIslandContext.Provider value={{ expandDynamicIsland }}>
      <BrowserRouter>
        <div className="relative w-full h-screen overflow-hidden">
          {/* Aurora Background - Always Visible */}
          <div className="fixed inset-0 z-0 bg-black">
            <Aurora />
          </div>

          {/* Dynamic Island - Always at Top */}
          <div
            ref={islandRef}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
          >
            <DynamicIsland forceExpanded={forceExpanded} />
          </div>

          {/* Page Content with Fade Transitions */}
          <div className="relative z-10 w-full h-full pt-24">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/start" element={<PYQAnalyzer />} />
              <Route path="/results" element={<Results />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </DynamicIslandContext.Provider>
  );
}

export default App;

// cd /Users/adityasriv/Coding/noodles/noods/backend && source venv/bin/activate && python app.py∫
