import type React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ManageUser from "./screens/ManageUser"

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<ManageUser />} />
          <Route path="/manage-user" element={<ManageUser />} />
          <Route path="/user" element={<ManageUser />} />
          <Route path="/add-user" element={<ManageUser />} />
          <Route path="/view-user" element={<ManageUser />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
