
import type React from "react"
import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "../components/Card"
import TopBar from "../components/TopBar"
import Breadcrumb from "../components/Breadcrumb"

interface Survey {
  id: string
  title: string
  created: string
  modified: string
  responses: number
  questions: number
  timeSpent: string
}

const CopyPastSurvey: React.FC = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("All")

  const recentSurveys: Survey[] = [
    {
      id: "1",
      title: "Untitled",
      created: "28/2/2025",
      modified: "28/2/2025",
      responses: 0,
      questions: 5,
      timeSpent: "2 mins",
    },
    {
      id: "2",
      title: "Customer Satisfaction Template",
      created: "28/2/2025",
      modified: "28/2/2025",
      responses: 0,
      questions: 10,
      timeSpent: "2 mins",
    },
  ]

  const allSurveys: Survey[] = [
    ...recentSurveys,
    {
      id: "3",
      title: "Untitled",
      created: "28/2/2025",
      modified: "28/2/2025",
      responses: 0,
      questions: 5,
      timeSpent: "2 mins",
    },
    {
      id: "4",
      title: "Customer Satisfaction Template",
      created: "28/2/2025",
      modified: "28/2/2025",
      responses: 0,
      questions: 10,
      timeSpent: "2 mins",
    },
  ]

  // Filter surveys based on search query
  const filteredRecentSurveys = useMemo(() => {
    if (!searchQuery.trim()) return recentSurveys
    return recentSurveys.filter((survey) => survey.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery])

  const filteredAllSurveys = useMemo(() => {
    if (!searchQuery.trim()) return allSurveys
    return allSurveys.filter((survey) => survey.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery])

  const handleSurveyClick = (surveyId: string) => {
    navigate(`/survey-preview/${surveyId}`)
  }

  const handleBreadcrumbClick = (item: { label: string; href: string }) => {
    if (item.label === "Setup") {
      navigate("/survey-feedback")
    } else if (item.label === "Survey Feedback") {
      navigate("/create-survey")
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleButtonClick = (type: string) => {
    setActiveTab(type)
  }

  const breadcrumbItems = [
    { label: "Setup", href: "/setup" },
    { label: "Survey Feedback", href: "/survey-feedback" },
  ]

  const renderSurveyCard = (survey: Survey) => (
    <Card key={survey.id} className="cursor-pointer hover:shadow-lg transition-shadow mb-4 shadow-md border-0">
      <CardContent>
        <div className="p-4 flex items-center" onClick={() => handleSurveyClick(survey.id)}>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
              <h3
                className={`text-lg font-semibold ${survey.title === "Untitled" ? "text-gray-700" : ""}`}
                style={
                  survey.title === "Untitled"
                    ? { backgroundColor: "#F4F4F4", padding: "4px 8px", borderRadius: "4px" }
                    : {}
                }
              >
                {survey.title}
              </h3>
              <div className="flex gap-8 text-center">
                <div>
                  <div className="text-xl font-bold">{survey.responses}</div>
                  <div className="text-sm text-gray-500">Responses</div>
                </div>
                <div>
                  <div className="text-xl font-bold">{survey.questions}</div>
                  <div className="text-sm text-gray-500">Questions</div>
                </div>
                <div>
                  <div className="text-xl font-bold">{survey.timeSpent}</div>
                  <div className="text-sm text-gray-500">Typical time spent</div>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Created: {survey.created} / Modified: {survey.modified}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderNoResults = () => (
    <div className="text-center py-8 text-gray-500">
      <p>No surveys found matching "{searchQuery}"</p>
    </div>
  )

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Navigation Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} onClick={handleBreadcrumbClick} />
      </div>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Copy a past survey</h1>

        {/* TopBar with Search and Filter moved to right */}
        <div className="flex justify-end mb-6">
          <TopBar onSearch={handleSearch} onButtonClick={handleButtonClick} buttons={["All"]} />
        </div>

        {/* Recent Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Recent</h2>
          {filteredRecentSurveys.length > 0 ? (
            filteredRecentSurveys.map(renderSurveyCard)
          ) : searchQuery ? (
            renderNoResults()
          ) : (
            <p className="text-gray-500">No recent surveys</p>
          )}
        </div>

        {/* All Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">All</h2>
          {filteredAllSurveys.length > 0 ? (
            filteredAllSurveys.map(renderSurveyCard)
          ) : searchQuery ? (
            renderNoResults()
          ) : (
            <p className="text-gray-500">No surveys found</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default CopyPastSurvey
