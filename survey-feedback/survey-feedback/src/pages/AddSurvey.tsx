
import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Trash2, Plus, ChevronDown } from "lucide-react"
import TextInput from "../components/TextInput"
import TextArea from "../components/TextArea"
import DatePicker from "../components/DatePicker"
import Checkbox from "../components/Checkbox"
import DropdownMenu from "../components/DropdownMenu"
import { Card, CardContent } from "../components/Card"
import Breadcrumb from "../components/Breadcrumb"

interface Question {
  id: string
  name: string
  type: string
  options: string[]
  scale?: string
  shape?: string
  addRatingLabels?: boolean
  addOtherOption?: boolean
}

const AddSurvey: React.FC = () => {
  const navigate = useNavigate()
  const [surveyTitle, setSurveyTitle] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [description, setDescription] = useState("")
  const [questions, setQuestions] = useState<Question[]>([])
  const [showQuestionForm, setShowQuestionForm] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: "",
    name: "",
    type: "",
    options: ["", ""],
    scale: "",
    shape: "",
    addRatingLabels: false,
    addOtherOption: false,
  })
  const [questionTypeOpen, setQuestionTypeOpen] = useState(false)
  const [shapeDropdownOpen, setShapeDropdownOpen] = useState(false)

  const questionTypes = ["Select Type", "Multiple Choice", "Check Boxes", "Star"]
  const shapeOptions = ["Select a shape", "Star", "Heart", "Thumbs Up"]

  const handleAddQuestion = () => {
    setShowQuestionForm(true)
    setCurrentQuestion({
      id: Date.now().toString(),
      name: "",
      type: "",
      options: ["", ""],
      scale: "",
      shape: "",
      addRatingLabels: false,
      addOtherOption: false,
    })
  }

  const handleSaveQuestion = () => {
    if (currentQuestion.name && currentQuestion.type) {
      setQuestions([...questions, currentQuestion])
      setShowQuestionForm(false)
      setCurrentQuestion({
        id: "",
        name: "",
        type: "",
        options: ["", ""],
        scale: "",
        shape: "",
        addRatingLabels: false,
        addOtherOption: false,
      })
    }
  }

  const handleCancelQuestion = () => {
    setShowQuestionForm(false)
    setCurrentQuestion({
      id: "",
      name: "",
      type: "",
      options: ["", ""],
      scale: "",
      shape: "",
      addRatingLabels: false,
      addOtherOption: false,
    })
  }

  const addOption = () => {
    setCurrentQuestion({
      ...currentQuestion,
      options: [...currentQuestion.options, ""],
    })
  }

  const removeOption = (index: number) => {
    const newOptions = currentQuestion.options.filter((_, i) => i !== index)
    setCurrentQuestion({
      ...currentQuestion,
      options: newOptions,
    })
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...currentQuestion.options]
    newOptions[index] = value
    setCurrentQuestion({
      ...currentQuestion,
      options: newOptions,
    })
  }

  const handleBreadcrumbClick = (item: { label: string; href: string }) => {
    if (item.label === "Setup") {
      navigate("/survey-feedback")
    } else if (item.label === "Survey Feedback") {
      navigate("/survey-feedback")
    }
  }

  const breadcrumbItems = [
    { label: "Setup", href: "/setup" },
    { label: "Survey Feedback", href: "/survey-feedback" },
  ]

  const renderQuestionOptions = () => {
    if (currentQuestion.type === "Multiple Choice") {
      return (
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-sm font-medium w-20">Option {index + 1}</span>
              <input
                type="text"
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                placeholder="Enter an Answer option"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              <button onClick={() => removeOption(index)} className="p-2 text-gray-500 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            onClick={addOption}
            className="flex items-center justify-center w-8 h-8 text-white rounded-full hover:opacity-90"
            style={{ backgroundColor: "#7991BB" }}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      )
    }

    if (currentQuestion.type === "Check Boxes") {
      return (
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" disabled />
              <span className="text-sm font-medium w-20">Option {index + 1}</span>
              <input
                type="text"
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                placeholder="Enter an Answer option"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              <button onClick={() => removeOption(index)} className="p-2 text-gray-500 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            onClick={addOption}
            className="flex items-center justify-center w-8 h-8 text-white rounded-full hover:opacity-90"
            style={{ backgroundColor: "#7991BB" }}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      )
    }

    if (currentQuestion.type === "Star") {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <TextInput
              label="Scale"
              name="scale"
              value={currentQuestion.scale || ""}
              onChange={(e) => setCurrentQuestion({ ...currentQuestion, scale: e.target.value })}
            />
            <div>
              <label className="block text-sm font-medium mb-1">Shape</label>
              <DropdownMenu
                trigger={
                  <button className="w-full px-3 py-2 border border-gray-300 rounded-md text-left bg-white hover:bg-gray-50 flex items-center justify-between">
                    <span>{currentQuestion.shape || "Select a shape"}</span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>
                }
                items={shapeOptions.map((shape) => ({
                  label: shape,
                  onClick: () => setCurrentQuestion({ ...currentQuestion, shape }),
                }))}
                open={shapeDropdownOpen}
                onToggle={setShapeDropdownOpen}
                className="bg-white border border-gray-300 rounded-md shadow-lg z-10"
              />
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded" style={{ backgroundColor: "#7991BB" }}></div>
                <span className="text-yellow-500 text-xl">★</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Checkbox
              label="Add Rating Labels"
              name="addRatingLabels"
              checked={currentQuestion.addRatingLabels || false}
              onChange={(e) => setCurrentQuestion({ ...currentQuestion, addRatingLabels: e.target.value })}
            />
            <Checkbox
              label="Add an Other Answer Option for Comments"
              name="addOtherOption"
              checked={currentQuestion.addOtherOption || false}
              onChange={(e) => setCurrentQuestion({ ...currentQuestion, addOtherOption: e.target.value })}
            />
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Navigation Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} onClick={handleBreadcrumbClick} />
      </div>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Add Survey</h1>

        {/* Survey Basic Info */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <TextInput
              label="Survey Title:"
              name="surveyTitle"
              value={surveyTitle}
              onChange={(e) => setSurveyTitle(e.target.value)}
            />
            <DatePicker
              label="Start Date:"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <DatePicker label="End Date:" name="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <TextArea
            label="Description:"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>

        {/* Add Question Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Add Question:</h2>

          {!showQuestionForm ? (
            <button
              onClick={handleAddQuestion}
              className="text-white px-4 py-2 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ backgroundColor: "#7991BB" }}
            >
              Submit
            </button>
          ) : (
            <Card className="border-2 border-gray-200">
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <TextInput
                    label="Enter Question Name"
                    name="questionName"
                    value={currentQuestion.name}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, name: e.target.value })}
                  />
                  <div>
                    <label className="block text-sm font-medium mb-1">Question Type</label>
                    <div className="flex items-center gap-2">
                      <DropdownMenu
                        trigger={
                          <button className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-left bg-white hover:bg-gray-50 flex items-center justify-between">
                            <span>{currentQuestion.type || "Select Type"}</span>
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                          </button>
                        }
                        items={questionTypes.map((type) => ({
                          label: type,
                          onClick: () => setCurrentQuestion({ ...currentQuestion, type }),
                        }))}
                        open={questionTypeOpen}
                        onToggle={setQuestionTypeOpen}
                        className="bg-white border border-gray-300 rounded-md shadow-lg z-10"
                      />
                      <button className="p-2 text-gray-500 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {renderQuestionOptions()}

                <div className="flex justify-between mt-6">
                  <button
                    onClick={handleAddQuestion}
                    className="text-white px-4 py-2 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ backgroundColor: "#7991BB" }}
                  >
                    Submit
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancelQuestion}
                      className="bg-gray-200 text-gray-900 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveQuestion}
                      className="text-white px-4 py-2 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ backgroundColor: "#7991BB" }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default AddSurvey
