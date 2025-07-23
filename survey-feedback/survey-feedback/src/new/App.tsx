import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import SurveyFeedback from "./pages/SurveyFeedback"
import CreateSurvey from "./pages/CreateSurvey"
import CopyPastSurvey from "./pages/CopyPastSurvey"
import SurveyPreview from "./pages/SurveyPreview"
import AddSurvey from "./pages/AddSurvey"
import CreateTemplateSurvey from "./pages/CreateTemplateSurvey"
import TemplatePreview from "./pages/TemplatePreview"
import SurveyResults from "./pages/SurveyResults"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/survey-feedback" replace />} />
        <Route path="/survey-feedback" element={<SurveyFeedback />} />
        <Route path="/create-survey" element={<CreateSurvey />} />
        <Route path="/copy-survey" element={<CopyPastSurvey />} />
        <Route path="/survey-preview/:id" element={<SurveyPreview />} />
        <Route path="/add-survey" element={<AddSurvey />} />
        <Route path="/create-template-survey" element={<CreateTemplateSurvey />} />
        <Route path="/template-preview/:id" element={<TemplatePreview />} />
        <Route path="/survey-results" element={<SurveyResults />} />
      </Routes>
    </Router>
  )
}

export default App
