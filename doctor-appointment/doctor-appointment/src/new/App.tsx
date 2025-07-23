import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import DoctorsAppointmentList from "./pages/DoctorsAppointmentList"
import DoctorForm from "./pages/DoctorForm"
import DoctorView from "./pages/DoctorView"
import DoctorEdit from "./pages/DoctorEdit"

function App() {
  return (
    <div style={{ fontFamily: "PT Sans, sans-serif" }}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/doctors-appointment" replace />} />
          <Route path="/doctors-appointment" element={<DoctorsAppointmentList />} />
          <Route path="/doctors-appointment/new" element={<DoctorForm />} />
          <Route path="/doctors-appointment/:id/view" element={<DoctorView />} />
          <Route path="/doctors-appointment/:id/edit" element={<DoctorEdit />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
