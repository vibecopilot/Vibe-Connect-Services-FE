// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import IncidentSetup from "./pages/incidentsetup";

function App() {
  return (
    <Routes>
      <Route path="/incidentsetup" element={<IncidentSetup />} />
    </Routes>
  );
}

export default App;
