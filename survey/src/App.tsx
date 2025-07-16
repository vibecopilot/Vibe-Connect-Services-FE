import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Communication from "./pages/Communication";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/communication" element={<Communication />} />
      </Routes>
    </Router>
  );
}

export default App;
