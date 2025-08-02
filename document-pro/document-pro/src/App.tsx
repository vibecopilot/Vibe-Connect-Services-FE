import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import DocumentManagement from "./pages/DocumentManagement"
import DocumentView from "./pages/DocumentView"
import DocumentEdit from "./pages/DocumentEdit"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/document-management" replace />} />
        <Route path="/document-management" element={<DocumentManagement />} />
        <Route path="/document-view/:id" element={<DocumentView />} />
        <Route path="/document-edit/:id" element={<DocumentEdit />} />
      </Routes>
    </Router>
  )
}

export default App
