import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import CategoryTab from './tabs/Fitout';
import Fitout from './pages/Fitout';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/fitout" element={<Fitout/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
