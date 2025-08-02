import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import Layout from './Components/layout/Layout';
// import Login from './pages/Login';
// import Helpdesk from './pages/Helpdesk';
// import SolutionManagent from './pages/SolutionManagent';
// import Announcement from './pages/Announcement';
// import AdditionalFileds from './pages/AdditionalFields';
// import CheckLists from './pages/CheckLists';
import FacilityDetailsPage from "./components/workspace/facility-details"
import FacilityManagement from "./components/workspace/facility-management"
// import SeatManagement from './Components/workspace/seat-management';
import SeatSetupManagement from "./components/workspace/seat-setup-management"
import SeatTypeManagement from "./components/workspace/seat-type-management"

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route element={<Layout />}> */}
        {/* <Route path="/helpdesk" element={<Helpdesk />} />
          <Route path="/soulution-management" element={<SolutionManagent />} />
          <Route path="/announcements" element={<Announcement />} />
          <Route path="/additional-fields" element={<AdditionalFileds />} />
          <Route path="/checklists" element={<CheckLists />} /> */}
        <Route path="/workspace-management/facility" element={<FacilityManagement />} />
        <Route path="/workspace-management/facility/details" element={<FacilityDetailsPage />} />
        <Route path="/workspace-management/facility/details/edit/:id" element={<FacilityDetailsPage />} />
        <Route path="/workspace-management/facility/view/:id" element={<FacilityDetailsPage />} />
        <Route path="/workspace-management/facility/edit/:id" element={<FacilityManagement />} />
        {/* <Route path="/workspace-management/seat" element={<SeatManagement />} /> */}
        <Route path="/workspace-management/seat/setup" element={<SeatSetupManagement />} />
        <Route path="/workspace-management/seat/type" element={<SeatTypeManagement />} />
        <Route path="/workspace-management/seat/view/:id" element={<SeatSetupManagement />} />
        <Route path="/workspace-management/seat/edit/:id" element={<SeatSetupManagement />} />
        {/* </Route> */}
      </Routes>
    </Router>
  )
}

export default App
