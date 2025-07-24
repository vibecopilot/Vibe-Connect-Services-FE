import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { BusinessCardProvider } from "./context/BusinessCardContext"
import { TemplateProvider } from "./context/TemplateContext"
import { CardEditorProvider } from "./context/CardEditorContext"
import Home from "./Home/Home"
import CategorySelection from "./components/CategorySelection"
import TemplatePreview from "./components/TemplatePreview"
import TemplateSelection from "./components/TemplateSelection"
import CardEditor from "./components/CardEditor"
import FinalCardPreview from "./components/FinalCardPreview"
import ThemeSelection from "./components/ThemeSelection"
import NameForm from "./components/NameForm"
import UserProfile from "./components/UserProfile"
import CompanyProfile from "./components/CompanyProfile"
import WorkDetails from "./components/WorkDetails"
import ContactLinks from "./components/ContactLinks"
import CardCompletion from "./components/CardCompletion"
import DigitalIDSuccess from "./components/DigitalIDSuccess"

function App() {
  return (
    <BusinessCardProvider>
      <TemplateProvider>
        <CardEditorProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/category-selection" element={<CategorySelection />} />
                <Route path="/template-preview" element={<TemplatePreview />} />
                <Route path="/template-selection" element={<TemplateSelection />} />
                <Route path="/card-editor" element={<CardEditor />} />
                <Route path="/final-card-preview" element={<FinalCardPreview />} />
                <Route path="/theme-selection" element={<ThemeSelection />} />
                <Route path="/name-form" element={<NameForm />} />
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/company-profile" element={<CompanyProfile />} />
                <Route path="/work-details" element={<WorkDetails />} />
                <Route path="/contact-links" element={<ContactLinks />} />
                <Route path="/card-completion" element={<CardCompletion />} />
                <Route path="/digital-id-success" element={<DigitalIDSuccess />} />
              </Routes>
            </div>
          </Router>
        </CardEditorProvider>
      </TemplateProvider>
    </BusinessCardProvider>
  )
}

export default App
