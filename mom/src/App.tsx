import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Setup from './pages/Setup';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/mom" element={<Setup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;