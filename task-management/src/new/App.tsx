import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

// Import components
import TaskListView from "./pages/TaskListView"
import AddTask from "./pages/AddTask"
import ViewTask from "./pages/ViewTask"
import KanbanView from "./pages/KanbanView"
import AllMyTaskView from "./pages/AllMyTaskView"
import CalendarView from "./pages/CalendarView"
import Next7DaysView from "./pages/Next7DaysView"

// Main App Component
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Default redirect to task management */}
          <Route path="/" element={<Navigate to="/taskmanagement/list" replace />} />

          {/* Task Management Routes */}
          <Route path="/taskmanagement" element={<Navigate to="/taskmanagement/list" replace />} />

          <Route path="/taskmanagement/list" element={<TaskListView />} />
          <Route path="/taskmanagement/all-my-task" element={<AllMyTaskView />} />
          <Route path="/taskmanagement/calendar" element={<CalendarView />} />
          <Route path="/taskmanagement/next-7-days" element={<Next7DaysView />} />
          <Route path="/taskmanagement/add-task" element={<AddTask />} />
          <Route path="/taskmanagement/view/:taskId" element={<ViewTask />} />
          <Route path="/taskmanagement/kanban" element={<KanbanView />} />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/taskmanagement/list" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App