import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Project from './pages/Project';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/project-management" element={<Project />} />
      </Routes>
    </Router>
  );
}

export default App;
