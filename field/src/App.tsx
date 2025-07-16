import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FieldSense from "./pages/FieldSense";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/field-sense" element={<FieldSense />} />
      </Routes>
    </Router>
  );
}

export default App;
