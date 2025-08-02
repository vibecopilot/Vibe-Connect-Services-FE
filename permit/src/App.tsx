import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Permit from './pages/Permit';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/permissions-management" element={<Permit />} />
      </Routes>
    </Router>
  );
}

export default App;
