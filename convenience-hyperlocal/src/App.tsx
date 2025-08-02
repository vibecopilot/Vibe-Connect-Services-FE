import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Convenience from "./pages/Convenience";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/convenience-hyperlocal" element={<Convenience />} />
      </Routes>
    </Router>
  );
};

export default App;