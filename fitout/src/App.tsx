import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Fitout from './pages/Fitout';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/fitout" element={<Fitout />} />
      </Routes>
    </Router>
  );
}

export default App;

