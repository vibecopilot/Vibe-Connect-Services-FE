
import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom"
import "./App.css"

// Import tab components
import CategoryTab from "./tabs/CategoryTab"
import ClosureCodeTab from "./tabs/ClosureCodeTab"
import EscalationTab from "./tabs/EscalationTab"
import LevelTab from "./tabs/LevelTab"
import ModeTab from "./tabs/ModeTab"
import RequestTab from "./tabs/RequestTab"
import StatusTab from "./tabs/StatusTab"
import TaskTypeTab from "./tabs/TaskTypeTab"
import WorklogTypeTab from "./tabs/WorklogTypeTab"

// Navigation Tab Configuration
const navigationTabs = [
  { name: "Category", path: "/servicedesk-management/category" },
  { name: "Status", path: "/servicedesk-management/status" },
  { name: "Level", path: "/servicedesk-management/level" },
  { name: "Mode", path: "/servicedesk-management/mode" },
  { name: "Escalation & Resolve Matrix", path: "/servicedesk-management/escalation" },
  { name: "Request Type", path: "/servicedesk-management/request" },
  { name: "Task Type", path: "/servicedesk-management/task-type" },
  { name: "Worklog Type", path: "/servicedesk-management/worklog-type" },
  { name: "Closure Code", path: "/servicedesk-management/closure-code" },
]

// Navigation Component
const NavigationTabs = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleTabClick = (path: string) => {
    navigate(path)
  }

  return (
    <nav className="mb-6">
      <div className="flex flex-wrap gap-6 border-b border-gray-200">
        {navigationTabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => handleTabClick(tab.path)}
            className={`pb-2 px-1 text-sm font-medium transition-colors ${
              location.pathname === tab.path
                ? "text-[#225ec4] border-b-2 border-[#225ec4]"
                : "text-gray-500 hover:text-gray-700"
            }`}
            style={{ fontFamily: "PT Sans, sans-serif" }}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </nav>
  )
}

// Main Service Desk Layout component
const ServiceDeskLayout = ({ searchQuery }: { searchQuery: string }) => {
  return (
    <div className="service-desk-management">
      {/* Global Navigation Tabs */}
      <NavigationTabs />

      <div className="tab-content">
        <Routes>
          {/* Default redirect to category tab */}
          <Route path="/" element={<Navigate to="/servicedesk-management/category" replace />} />
          <Route path="/servicedesk-management" element={<Navigate to="/servicedesk-management/category" replace />} />

          {/* Service Desk Management Routes with searchQuery prop */}
          <Route path="/servicedesk-management/category" element={<CategoryTab searchQuery={searchQuery} />} />
          <Route path="/servicedesk-management/status" element={<StatusTab searchQuery={searchQuery} />} />
          <Route path="/servicedesk-management/level" element={<LevelTab searchQuery={searchQuery} />} />
          <Route path="/servicedesk-management/mode" element={<ModeTab searchQuery={searchQuery} />} />
          <Route path="/servicedesk-management/escalation" element={<EscalationTab searchQuery={searchQuery} />} />
          <Route path="/servicedesk-management/request" element={<RequestTab searchQuery={searchQuery} />} />
          <Route path="/servicedesk-management/task-type" element={<TaskTypeTab searchQuery={searchQuery} />} />
          <Route path="/servicedesk-management/worklog-type" element={<WorklogTypeTab searchQuery={searchQuery} />} />
          <Route path="/servicedesk-management/closure-code" element={<ClosureCodeTab searchQuery={searchQuery} />} />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/servicedesk-management/category" replace />} />
        </Routes>
      </div>
    </div>
  )
}

// App Component
function App() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 p-6" style={{ fontFamily: "PT Sans, sans-serif" }}>
        {/* Optional: Add a search bar at the top */}
        <ServiceDeskLayout searchQuery={searchQuery} />
      </div>
    </Router>
  )
}

export default App
