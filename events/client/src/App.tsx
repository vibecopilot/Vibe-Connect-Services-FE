import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Events from './pages/EventsandBroadcasts';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/events" element={<Events/>}/>
      </Routes>
    </Router>
  );
}

export default App;

