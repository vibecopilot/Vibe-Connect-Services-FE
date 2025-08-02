import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Purchase from './pages/Purchase';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/purchase" element={<Purchase />} />
      </Routes>
    </Router>
  );
}

export default App;
