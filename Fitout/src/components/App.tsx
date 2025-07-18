import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Helpdesk from './pages/Helpdesk';
import SolutionManagent from './pages/SolutionManagent';
import Announcement from './pages/Announcement';
import AdditionalFileds from './pages/AdditionalFields';
import CheckLists from './pages/CheckLists';
import Service from '../tabs/service';
import AddServiceForm from '../forms/addserviceform';
import Fitout from '../pages/Fitout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/helpdesk" element={<Helpdesk />} />
          <Route path="/soulution-management" element={<SolutionManagent />} />
          <Route path="/announcements" element={<Announcement />} />
          <Route path="/additional-fields" element={<AdditionalFileds/>} />
          <Route path="/checklists" element={<CheckLists/>} />
          <Route path="/service" element={<Service />} />
          <Route path="/addservice" element={<AddServiceForm />} />
          <Route path="/fitout" element={<Fitout />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

