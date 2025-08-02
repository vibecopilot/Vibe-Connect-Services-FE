import type React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Forum from "./components/Forum.tsx"

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Forum />} />
          <Route path="/forum" element={<Forum />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
