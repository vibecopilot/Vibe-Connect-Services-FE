import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Demand from './pages/Demand';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/demand" element={<Demand />} />
      </Routes>
    </Router>
  );
}

export default App;
