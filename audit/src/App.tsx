import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Audit from './pages/Audit';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/audit" element={<Audit/>}/>
      </Routes>
    </Router>
  );
}

export default App;

