import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SkillGrow from "./pages/SkillGrow";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/skill-grow" element={<SkillGrow />} />
      </Routes>
    </Router>
  );
}
export default App;