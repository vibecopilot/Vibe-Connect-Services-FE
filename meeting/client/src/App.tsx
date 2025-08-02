import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Meeting from './pages/Meeting';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/meeting" element={<Meeting/>}/>
      </Routes>
    </Router>
  );
}

export default App;

