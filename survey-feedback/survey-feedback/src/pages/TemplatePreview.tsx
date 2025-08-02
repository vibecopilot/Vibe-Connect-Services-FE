import type React from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Star } from "lucide-react"
import { Card, CardContent } from "../components/Card"
import RadioButton from "../components/RadioButton"
import Checkbox from "../components/Checkbox"
import Alert from "../components/Alert"
import NotificationToaster from "../components/NotificationToaster"
import Breadcrumb from "../components/Breadcrumb"

const TemplatePreview: React.FC = () => {
  const navigate = useNavigate()
  const { id: templateId } = useParams<{ id: string }>()

  const [formData, setFormData] = useState({
    recommendation: "",
    satisfaction: "",
    productFeatures: [] as string[],
    productMeeting: "",
    qualityRating: "",
  })

  const [showAlert, setShowAlert] = useState(false)
  const [showToaster, setShowToaster] = useState(false)

  const handleBreadcrumbClick = (item: { label: string; href: string }) => {
    if (item.label === "Setup") {
      navigate("/survey-feedback")
    } else if (item.label === "Survey Feedback") {
      navigate("/survey-feedback")
    }
  }

  const handleInputChange = (e: { target: { name: string; value: string } }) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleCheckboxChange = (e: { target: { name: string; value: boolean } }) => {
    const feature = e.target.name
    setFormData((prev) => ({
      ...prev,
      productFeatures: e.target.value
        ? [...prev.productFeatures, feature]
        : prev.productFeatures.filter((f) => f !== feature),
    }))
  }

  const handleUseTemplate = () => {
    setShowToaster(true)
    setTimeout(() => {
      navigate("/add-survey")
    }, 2000)
  }

  const handleAddQuestion = () => {
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 3000)
  }

  const breadcrumbItems = [
    { label: "Setup", href: "/setup" },
    { label: "Survey Feedback", href: "/survey-feedback" },
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Navigation Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} onClick={handleBreadcrumbClick} />
      </div>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Customer Satisfaction Template</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Template Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-8">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">NOT SO LIKELY</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <div
                        key={num}
                        className="w-8 h-6 border border-gray-300 rounded flex items-center justify-center text-sm"
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">EXTREMELY LIKELY</span>
                </div>
              </div>

              {/* Question 1 */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">
                  1. How likely is it that you would recommend this company to a friend or colleague?
                </h3>
                <RadioButton
                  label=""
                  name="recommendation"
                  options={["0-6 (Detractors)", "7-8 (Passives)", "9-10 (Promoters)"]}
                  value={formData.recommendation}
                  onChange={handleInputChange}
                />
              </div>

              {/* Question 2 */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">
                  2. Describe how satisfied or dissatisfied you are with our company?
                </h3>
                <RadioButton
                  label=""
                  name="satisfaction"
                  options={["Very satisfied", "Satisfied", "Undecided", "Unsatisfied", "Very unsatisfied"]}
                  value={formData.satisfaction}
                  onChange={handleInputChange}
                />
              </div>

              {/* Question 3 */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">
                  3. Which of the following words would you use to describe our product? Select all that apply.
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Checkbox
                      label="Reliable"
                      name="reliable"
                      checked={formData.productFeatures.includes("reliable")}
                      onChange={handleCheckboxChange}
                    />
                    <Checkbox
                      label="High quality"
                      name="highQuality"
                      checked={formData.productFeatures.includes("highQuality")}
                      onChange={handleCheckboxChange}
                    />
                    <Checkbox
                      label="Useful"
                      name="useful"
                      checked={formData.productFeatures.includes("useful")}
                      onChange={handleCheckboxChange}
                    />
                    <Checkbox
                      label="Unique"
                      name="unique"
                      checked={formData.productFeatures.includes("unique")}
                      onChange={handleCheckboxChange}
                    />
                    <Checkbox
                      label="Good value for money"
                      name="goodValue"
                      checked={formData.productFeatures.includes("goodValue")}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Checkbox
                      label="Overpriced"
                      name="overpriced"
                      checked={formData.productFeatures.includes("overpriced")}
                      onChange={handleCheckboxChange}
                    />
                    <Checkbox
                      label="Impractical"
                      name="impractical"
                      checked={formData.productFeatures.includes("impractical")}
                      onChange={handleCheckboxChange}
                    />
                    <Checkbox
                      label="Ineffective"
                      name="ineffective"
                      checked={formData.productFeatures.includes("ineffective")}
                      onChange={handleCheckboxChange}
                    />
                    <Checkbox
                      label="Poor quality"
                      name="poorQuality"
                      checked={formData.productFeatures.includes("poorQuality")}
                      onChange={handleCheckboxChange}
                    />
                    <Checkbox
                      label="Unreliable"
                      name="unreliable"
                      checked={formData.productFeatures.includes("unreliable")}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                </div>
              </div>

              {/* Question 4 */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">4. How well do our products meet your needs?</h3>
                <RadioButton
                  label=""
                  name="productMeeting"
                  options={["Extremely well", "Very well", "Somewhat well", "Not so well", "Not at all well"]}
                  value={formData.productMeeting}
                  onChange={handleInputChange}
                />
              </div>

              {/* Question 5 */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">5. How would you rate the quality of the product?</h3>
                <RadioButton
                  label=""
                  name="qualityRating"
                  options={[
                    "Very high quality",
                    "High quality",
                    "Neither high nor low quality",
                    "Low quality",
                    "Very low quality",
                  ]}
                  value={formData.qualityRating}
                  onChange={handleInputChange}
                />
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
            <Card>
              <CardContent>
                <div className="p-6" style={{ backgroundColor: "#EBEBEB" }}>
                  <h2 className="text-lg font-semibold mb-2">Customer Satisfaction Template</h2>
                  <p className="text-sm text-gray-500 mb-4">Used 200+ times</p>

                  <div className="flex items-center mb-4">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm">Add to favourites</span>
                  </div>

                  <p className="text-sm text-gray-600 mb-6">
                    Keep your customers happy and turn them into advocates. Learn from the people who matter most with
                    Customer Satisfaction surveys that measure and track customer happiness.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Questions</span>
                      <span className="text-sm">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Responses</span>
                      <span className="text-sm">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Time to complete</span>
                      <span className="text-sm">2 mins</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Completion rate</span>
                      <span className="text-sm">-</span>
                    </div>
                  </div>

                  <button
                    onClick={handleUseTemplate}
                    className="w-full text-white px-4 py-2 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ backgroundColor: "#7991BB" }}
                  >
                    Use This Template
                  </button>

                  <p className="text-xs text-gray-500 mt-4">You can always change it later. There are no limits.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Alert for Add Question */}
        {showAlert && (
          <div className="fixed top-4 right-4 z-50">
            <Alert
              type="info"
              title="Feature Coming Soon"
              message="Question customization will be available in the full editor."
              dismissible={true}
              onClose={() => setShowAlert(false)}
            />
          </div>
        )}

        {/* Success Toaster */}
        <NotificationToaster
          message="Template selected! Redirecting to editor..."
          type="success"
          isVisible={showToaster}
          onClose={() => setShowToaster(false)}
          position="top-right"
        />
      </div>
    </div>
  )
}

export default TemplatePreview
