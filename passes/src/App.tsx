import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Passes from './pages/Passes';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/passes" element={<Passes />} />
      </Routes>
    </Router>
  );
}

export default App;

