"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronDown, ArrowLeft, ArrowRight } from "lucide-react"
import { useTemplate } from "../context/TemplateContext"

const CategorySelection = () => {
  const navigate = useNavigate()
  const { setSelectedCategory } = useTemplate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState("")

  const categories = [
    "Modern Corporate",
    "Sales & Marketing",
    "Simple Professional",
    "Creative & Design",
    "Service Professionals",
  ]

  const handleCategorySelect = (category: string) => {
    setSelectedValue(category)
    setSelectedCategory(category)
    setIsDropdownOpen(false)
  }

  const handleNext = () => {
    if (selectedValue) {
      navigate("/template-preview")
    }
  }

  const handlePrevious = () => {
    navigate("/")
  }

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
      <div className="flex items-center justify-center min-h-[calc(100vh-160px)] px-4">
        <div className="w-full max-w-lg">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-16">Choose a Category</h1>

          {/* Dropdown */}
          <div className="relative mb-20">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-white border border-gray-300 rounded-xl px-6 py-5 text-left flex items-center justify-between hover:border-gray-400 transition-colors shadow-sm"
            >
              <span className={`text-lg ${selectedValue ? "text-gray-900" : "text-gray-500"}`}>
                {selectedValue || "Select"}
              </span>
              <ChevronDown
                className={`w-6 h-6 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-lg z-10 overflow-hidden">
                {categories.map((category, index) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors ${
                      index !== categories.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <span className="text-gray-700 text-lg">{category}</span>
                  </button>
                ))}
              </div>
            )}
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
          disabled={!selectedValue}
          className={`flex items-center gap-2 px-8 py-3 rounded-xl transition-colors shadow-lg font-medium ${
            selectedValue ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <span>Next</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default CategorySelection
