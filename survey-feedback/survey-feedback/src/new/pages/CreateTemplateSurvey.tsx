import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import TextInput from "../components/TextInput"
import Checkbox from "../components/Checkbox"
import { Card, CardContent } from "../components/Card"
import Breadcrumb from "../components/Breadcrumb"
import Loaders from "../components/Loaders"
import NoDataFound from "../components/NoDataFound"

interface Template {
  id: string
  title: string
  description: string
  image: string
  category: string
  usageCount: string
  isPopular?: boolean
}

const CreateTemplateSurvey: React.FC = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [filters, setFilters] = useState({
    showFreeTemplates: false,
    teamTemplates: false,
    mostPopular: false,
    forms: false,
    events: false,
    humanResources: false,
    customerFeedback: false,
    generalBusiness: false,
    satisfaction: false,
    marketing: false,
    education: false,
    benchmarkable: false,
    justForFun: false,
    academicResearch: false,
    quizzes: false,
    services: false,
    community: false,
    marketResearch: false,
    healthcare: false,
  })

  const templates: Template[] = [
    {
      id: "1",
      title: "Customer Satisfaction Template",
      description: "Keep your customers happy and turn them into advocates.",
      image: "/images/Rectangle 34626488.png",
      category: "Customer Feedback",
      usageCount: "Used 200+ times",
      isPopular: true,
    },
    {
      id: "2",
      title: "Market Research- Product Testing Template",
      description: "Launching a new product isn't easy, verify you have the right.",
      image: "/images/Rectangle 34626489.png",
      category: "Market Research",
      usageCount: "Used 2800+ times",
      isPopular: true,
    },
    {
      id: "3",
      title: "Event Registration Form",
      description: "Gather insights from employees to improve the workplace.",
      image: "/images/rectangle-34626490.png",
      category: "Events",
      usageCount: "Used 1500+ times",
    },
    {
      id: "4",
      title: "Employee Feedback Survey",
      description: "Gather insights from employees to improve the workplace.",
      image: "/images/Rectangle 34626491.png",
      category: "Human Resources",
      usageCount: "Used 1300+ times",
    },
    {
      id: "5",
      title: "Net Promoter Score Survey",
      description: "Measure customer loyalty and satisfaction effectively.",
      image: "/images/Rectangle 34626492.png",
      category: "Customer Feedback",
      usageCount: "Used 3200+ times",
      isPopular: true,
    },
    {
      id: "6",
      title: "General Event Feedback Template",
      description: "Find out how people felt about your event to improve in next.",
      image: "/images/Rectangle 34626493.png",
      category: "Events",
      usageCount: "Used 1800+ times",
    },
  ]

  const handleFilterChange = (e: { target: { name: string; value: boolean } }) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleTemplateClick = (templateId: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate("/survey-results")
    }, 1000)
  }

  const handleBreadcrumbClick = (item: { label: string; href: string }) => {
    if (item.label === "Setup") {
      navigate("/survey-feedback")
    } else if (item.label === "Survey Feedback") {
      navigate("/create-survey")
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Apply category filters
    if (filters.customerFeedback && template.category !== "Customer Feedback") return false
    if (filters.marketResearch && template.category !== "Market Research") return false
    if (filters.events && template.category !== "Events") return false
    if (filters.humanResources && template.category !== "Human Resources") return false
    if (filters.mostPopular && !template.isPopular) return false

    return matchesSearch
  })

  const breadcrumbItems = [
    { label: "Setup", href: "/setup" },
    { label: "Survey Feedback", href: "/survey-feedback" },
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Loaders isLoading={isLoading} message="Loading template..." />

      {/* Navigation Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} onClick={handleBreadcrumbClick} />
      </div>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Create Template Survey</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              {/* Explore Templates Button */}
              <button
                className="w-full text-white px-4 py-2 rounded-md mb-6 hover:opacity-90"
                style={{ backgroundColor: "#7991BB" }}
              >
                Explore templates
              </button>

              {/* Search Bar */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search templates"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Filters */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Filters</h3>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Plan Type</h4>
                    <Checkbox
                      label="Show free templates"
                      name="showFreeTemplates"
                      checked={filters.showFreeTemplates}
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Categories</h4>
                  <div className="space-y-2">
                    <Checkbox
                      label="Team templates (0)"
                      name="teamTemplates"
                      checked={filters.teamTemplates}
                      onChange={handleFilterChange}
                    />
                    <Checkbox
                      label="Most Popular (13)"
                      name="mostPopular"
                      checked={filters.mostPopular}
                      onChange={handleFilterChange}
                    />
                    <Checkbox label="Forms (127)" name="forms" checked={filters.forms} onChange={handleFilterChange} />
                    <Checkbox
                      label="Events (33)"
                      name="events"
                      checked={filters.events}
                      onChange={handleFilterChange}
                    />
                    <Checkbox
                      label="Human Resources (66)"
                      name="humanResources"
                      checked={filters.humanResources}
                      onChange={handleFilterChange}
                    />
                    <Checkbox
                      label="Customer Feedback (44)"
                      name="customerFeedback"
                      checked={filters.customerFeedback}
                      onChange={handleFilterChange}
                    />
                    <Checkbox
                      label="General Business (22)"
                      name="generalBusiness"
                      checked={filters.generalBusiness}
                      onChange={handleFilterChange}
                    />
                    <Checkbox
                      label="Satisfaction (2)"
                      name="satisfaction"
                      checked={filters.satisfaction}
                      onChange={handleFilterChange}
                    />
                    <Checkbox
                      label="Marketing (25)"
                      name="marketing"
                      checked={filters.marketing}
                      onChange={handleFilterChange}
                    />
                    <Checkbox
                      label="Education (40)"
                      name="education"
                      checked={filters.education}
                      onChange={handleFilterChange}
                    />
                    <Checkbox
                      label="Benchmarkable (26)"
                      name="benchmarkable"
                      checked={filters.benchmarkable}
                      onChange={handleFilterChange}
                    />
                    <Checkbox
                      label="Just for Fun (21)"
                      name="justForFun"
                      checked={filters.justForFun}
                      onChange={handleFilterChange}
                    />
                    <Checkbox
                      label="Academic/Research (1)"
                      name="academicResearch"
                      checked={filters.academicResearch}
                      onChange={handleFilterChange}
                    />
                    <Checkbox
                      label="Quizzes (9)"
                      name="quizzes"
                      checked={filters.quizzes}
                      onChange={handleFilterChange}
                    />
                    <Checkbox
                      label="Services (2)"
                      name="services"
                      checked={filters.services}
                      onChange={handleFilterChange}
                    />
                    <Checkbox
                      label="Community (5)"
                      name="community"
                      checked={filters.community}
                      onChange={handleFilterChange}
                    />
                    <Checkbox
                      label="Market Research (28)"
                      name="marketResearch"
                      checked={filters.marketResearch}
                      onChange={handleFilterChange}
                    />
                    <Checkbox
                      label="Healthcare (24)"
                      name="healthcare"
                      checked={filters.healthcare}
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Templates Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <Card
                  key={template.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow shadow-md border-0"
                  onClick={() => handleTemplateClick(template.id)}
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col">
                      {/* Image at the top */}
                      <div className="w-full">
                        <img
                          src={template.image || "/placeholder.svg"}
                          alt={template.title}
                          className="w-full h-40 object-cover rounded-t-md"
                        />
                      </div>
                      
                      {/* Content below image */}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 text-sm">{template.title}</h3>
                        <p className="text-xs mb-2" style={{ color: "#5E5E5E" }}>{template.usageCount}</p>
                        <p className="text-xs" style={{ color: "#878787" }}>{template.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <NoDataFound />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateTemplateSurvey