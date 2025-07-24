"use client"

import { useNavigate } from "react-router-dom"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useTemplate } from "../context/TemplateContext"

const TemplatePreview = () => {
  const navigate = useNavigate()
  const { selectedCategory, getTemplatesByCategory, setSelectedTemplate } = useTemplate()

  const templates = selectedCategory ? getTemplatesByCategory(selectedCategory) : []
  const currentTemplate = templates[0] // Show first template of the category

  const handleNext = () => {
    if (currentTemplate) {
      setSelectedTemplate(currentTemplate)
      navigate("/template-selection")
    }
  }

  const handlePrevious = () => {
    navigate("/category-selection")
  }

  if (!selectedCategory || !currentTemplate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No category selected</p>
          <button onClick={() => navigate("/category-selection")} className="text-blue-600 hover:text-blue-700">
            Go back to category selection
          </button>
        </div>
      </div>
    )
  }

  const FrontComponent = currentTemplate.preview.front
  const BackComponent = currentTemplate.preview.back

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <ArrowLeft className="w-4 h-4" />
          <span>Setup</span>
          <ArrowLeft className="w-4 h-4 rotate-180" />
          <span className="text-gray-900 font-medium">Business Card</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-16">{selectedCategory}</h1>

        {/* Template Cards - Properly spaced */}
        <div className="flex gap-16 justify-center mb-16">
          <div className="flex flex-col items-center">
            <FrontComponent />
          </div>
          <div className="flex flex-col items-center">
            <BackComponent />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-8 right-8 flex gap-4">
        <button
          onClick={handlePrevious}
          className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Previous</span>
        </button>
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg font-medium"
        >
          <span>Next</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default TemplatePreview
