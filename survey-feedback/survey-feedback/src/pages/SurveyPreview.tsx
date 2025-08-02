import type React from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ChevronRight, Star } from "lucide-react"
import { Card, CardContent } from "../components/Card"
import RadioButton from "../components/RadioButton"
import TextArea from "../components/TextArea"
import DropdownMenu from "../components/DropdownMenu"
import Breadcrumb from "../components/Breadcrumb"

const SurveyPreview: React.FC = () => {
  const navigate = useNavigate()
  const { id: surveyId } = useParams<{ id: string }>()

  const [formData, setFormData] = useState({
    firstTime: "",
    recommend: "",
    suggestions: "",
    satisfaction: "",
    contactMethod: "",
  })

  const [showContactDropdown, setShowContactDropdown] = useState(false)

  const handleInputChange = (e: { target: { name: string; value: string } }) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleBreadcrumbClick = (item: { label: string; href: string }) => {
    if (item.label === "Setup") {
      navigate("/survey-feedback")
    } else if (item.label === "Survey Feedback") {
      navigate("/copy-survey")
    }
  }

  const handleCopySurvey = () => {
    // Logic to copy the survey
    console.log("Copying survey:", surveyId)
    navigate("/add-survey")
  }

  const handleAddQuestion = () => {
    navigate("/add-survey")
  }

  const breadcrumbItems = [
    { label: "Setup", href: "/setup" },
    { label: "Survey Feedback", href: "/survey-feedback" },
  ]

  const contactOptions = [
    { label: "Email", onClick: () => setFormData((prev) => ({ ...prev, contactMethod: "Email" })) },
    { label: "Phone", onClick: () => setFormData((prev) => ({ ...prev, contactMethod: "Phone" })) },
    { label: "SMS", onClick: () => setFormData((prev) => ({ ...prev, contactMethod: "SMS" })) },
    { label: "None", onClick: () => setFormData((prev) => ({ ...prev, contactMethod: "None" })) },
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Navigation Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} onClick={handleBreadcrumbClick} />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Survey Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Customer Feedback Survey</h1>
              <p className="text-gray-600 mb-8">
                Please let us know about your experience with our product and service.
              </p>

              {/* Question 1 */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">
                  1. Is this the first time you are using our Products and services?
                </h3>
                <RadioButton
                  label=""
                  name="firstTime"
                  options={["Yes", "No"]}
                  value={formData.firstTime}
                  onChange={handleInputChange}
                />
              </div>

              {/* Question 2 */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">2. Would you recommend it to your friends and colleagues?</h3>
                <RadioButton
                  label=""
                  name="recommend"
                  options={["Yes", "No"]}
                  value={formData.recommend}
                  onChange={handleInputChange}
                />
              </div>

              {/* Question 3 */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">
                  3. Do you have any suggestions to improve our product and service?
                </h3>
                <TextArea
                  label=""
                  name="suggestions"
                  value={formData.suggestions}
                  onChange={handleTextAreaChange}
                  placeholder="Type your message here......."
                  rows={4}
                />
              </div>

              {/* Question 4 */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">4. How satisfied are you with our company overall?</h3>
                <RadioButton
                  label=""
                  name="satisfaction"
                  options={["Very satisfied", "Satisfied", "Undecided", "Unsatisfied", "Very unsatisfied"]}
                  value={formData.satisfaction}
                  onChange={handleInputChange}
                />
              </div>

              {/* Question 5 */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">5. How do you prefer to be contacted?</h3>
                <div className="relative">
                  <DropdownMenu
                    items={contactOptions}
                    trigger={
                      <div className="w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer bg-white flex justify-between items-center">
                        <span>{formData.contactMethod || "Select a option"}</span>
                        <ChevronRight className="w-4 h-4 transform rotate-90" />
                      </div>
                    }
                    open={showContactDropdown}
                    onToggle={setShowContactDropdown}
                    className="w-full bg-white border border-gray-300 rounded-md shadow-lg"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  onClick={handleAddQuestion}
                  className="text-white px-4 py-2 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ backgroundColor: "#7991BB" }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Removed Card wrapper and added styling directly to the div */}
            <div className="p-6" style={{ backgroundColor: "#EBEBEB" }}>
              <h2 className="text-lg font-semibold mb-2">Untitled</h2>
              <p className="text-sm text-gray-500 mb-4">Modified: 28/2/2025</p>

              <div className="flex items-center mb-4">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="text-sm">Add to favourites</span>
              </div>

              <p className="text-sm text-gray-600 mb-6">You can always edit the survey later.</p>

              <div className="space-y-4 mb-6">
                <div>
                  <span className="text-sm font-medium">Questions</span>
                </div>
                <div>
                  <span className="text-sm font-medium">Responses</span>
                </div>
                <div>
                  <span className="text-sm font-medium">Time to complete</span>
                </div>
                <div>
                  <span className="text-sm font-medium">Completion rate</span>
                </div>
              </div>

              <button
                onClick={handleCopySurvey}
                className="w-full text-white px-4 py-2 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ backgroundColor: "#7991BB" }}
              >
                Copy This Survey
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SurveyPreview