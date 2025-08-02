import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import FacilityDetailsPage from "./components/workspace/facility-details"
import FacilityManagement from "./components/workspace/facility-management"
import SeatSetupManagement from "./components/workspace/seat-setup-management"
import SeatTypeManagement from "./components/workspace/seat-type-management"
import SeatSetupForm from "./components/workspace/seat-setup-form"
import { FacilityProvider } from "../src/contexts/FacilityContext"

function App() {
  return (
    <FacilityProvider>
      <Router>
        <Routes>
          <Route path="/workspace-management/facility" element={<FacilityManagement />} />
          <Route path="/workspace-management/facility/details" element={<FacilityDetailsPage />} />
          <Route path="/workspace-management/facility/details/new" element={<FacilityDetailsPage />} />
          <Route path="/workspace-management/facility/details/edit/:id" element={<FacilityDetailsPage />} />
          <Route path="/workspace-management/facility/view/:id" element={<FacilityDetailsPage />} />
          <Route path="/workspace-management/facility/edit/:id" element={<FacilityDetailsPage />} />
          <Route path="/workspace-management/seat/setup" element={<SeatSetupManagement />} />
          <Route path="/workspace-management/seat/setup/new" element={<SeatSetupForm />} />
          <Route path="/workspace-management/seat/type" element={<SeatTypeManagement />} />
          <Route path="/workspace-management/seat/view/:id" element={<SeatSetupManagement />} />
          <Route path="/workspace-management/seat/edit/:id" element={<SeatSetupManagement />} />
        </Routes>
      </Router>
    </FacilityProvider>
  )
}

export default App
