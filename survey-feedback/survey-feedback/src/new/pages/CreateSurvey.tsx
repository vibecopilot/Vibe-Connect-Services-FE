
import type React from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "../components/Card"
import Breadcrumb from "../components/Breadcrumb"

const CreateSurvey: React.FC = () => {
  const navigate = useNavigate()

  const handleStartFromScratch = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("Navigating to /add-survey") // Debug log
    navigate("/add-survey")
  }

  const handleCopyExisting = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("Navigating to /copy-survey") // Debug log
    navigate("/copy-survey")
  }

  const handlePickTemplate = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("Navigating to /create-template-survey") // Debug log
    navigate("/create-template-survey")
  }

  const handleBreadcrumbClick = (item: { label: string; href: string }) => {
    if (item.label === "Setup") {
      navigate("/survey-feedback")
    }
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

      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Create Survey</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Start from Scratch */}
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow shadow-md border-0"
            onClick={handleStartFromScratch}
          >
            <CardContent>
              <div className="p-6 flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <img src="../images/img1.png"  className="w-16 h-16" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Start From Scratch</h3>
                  <p className="text-gray-600 text-sm">
                    Begin with a blank survey or form then add your questions, text and images.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Copy an existing survey */}
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow shadow-md border-0"
            onClick={handleCopyExisting}
          >
            <CardContent>
              <div className="p-6 flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <img src="/images/img2.png" alt="Copy existing survey" className="w-16 h-16" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Copy an existing survey</h3>
                  <p className="text-gray-600 text-sm">Choose a survey. Make a copy. Edit as needed.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pick a popular template */}
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow shadow-md border-0"
            onClick={handlePickTemplate}
          >
            <CardContent>
              <div className="p-6 flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <img src="/images/img3.png" alt="Pick template" className="w-16 h-16" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Pick a popular template</h3>
                  <p className="text-gray-600 text-sm">
                    Ask the right question and save time with a template built for your situation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CreateSurvey
