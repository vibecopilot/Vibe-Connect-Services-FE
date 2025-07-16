import type React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ManageUnit from "./Screens/ManageUnit"

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<ManageUnit />} />
          <Route path="/manage-unit" element={<ManageUnit />} />
          <Route path="/building" element={<ManageUnit />} />
          <Route path="/floor" element={<ManageUnit />} />
          <Route path="/unit" element={<ManageUnit />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
