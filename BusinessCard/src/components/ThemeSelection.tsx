"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, Eye, Phone, Mail, Globe } from "lucide-react"
import { useBusinessCard } from "../context/BusinessCardContext"

const ThemeSelection = () => {
  const navigate = useNavigate()
  const { data, updateTheme } = useBusinessCard()
  const [selectedTheme, setSelectedTheme] = useState(data.theme)

  const themes = [
    { id: "blue", name: "Blue", gradient: "from-blue-900 to-blue-600" },
    { id: "red", name: "Red", gradient: "from-red-500 to-red-400" },
    { id: "green", name: "Green", gradient: "from-green-600 to-green-400" },
    { id: "orange", name: "Orange", gradient: "from-orange-500 to-yellow-400" },
    { id: "nature", name: "Nature", gradient: "from-teal-400 to-blue-500" },
  ]

  const handleBack = () => {
    navigate("/")
  }

  const handleContinue = () => {
    updateTheme(selectedTheme)
    navigate("/name-form")
  }

  const getCardGradient = () => {
    const theme = themes.find((t) => t.id === selectedTheme)
    return theme?.gradient || "from-red-500 to-red-400"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center p-4 bg-white border-b">
        <button onClick={handleBack} className="mr-4">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Setup</span>
          <ChevronLeft className="w-4 h-4 rotate-180" />
          <span className="font-medium">Business Card</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">Select Your Style/Theme</h1>

        {/* Business Card Preview */}
        <div className="flex justify-center mb-8">
          <div
            className={`w-72 h-80 bg-gradient-to-br ${getCardGradient()} rounded-2xl p-6 text-white relative shadow-xl overflow-hidden`}
          >
            {/* Logo section */}
            <div className="absolute top-4 right-4 flex flex-col items-center">
              <Eye className="w-5 h-5 mb-1" />
              <span className="text-xs">Logo</span>
            </div>

            {/* Main Content Layout with adjusted positioning */}
            <div className="flex flex-col h-full relative z-10">
              {/* Center Text - Full Name and Title - Moved higher */}
              <div className="mt-12 mb-auto flex flex-col items-center text-center">
                <h2 className="text-2xl font-bold mb-2">Full Name</h2>
                <p className="text-base opacity-90">CEO & Founder</p>
              </div>

              {/* Contact Information - Moved higher */}
              <div className="mb-12 space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+ 91 9764035729</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>john@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span>website.com</span>
                </div>
              </div>
            </div>

            {/* Exact curved lines pattern at bottom */}
            <div className="absolute bottom-0 left-0 w-full h-24 overflow-hidden">
              <svg
                className="absolute bottom-0 left-0 w-full h-full"
                viewBox="0 0 288 96"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                {/* Multiple curved lines with exact pattern */}
                <path d="M0 96C96 76 192 76 288 96V96H0V96Z" fill="white" fillOpacity="0.3" />
                <path d="M0 96C96 78 192 78 288 96V96H0V96Z" fill="white" fillOpacity="0.25" />
                <path d="M0 96C96 80 192 80 288 96V96H0V96Z" fill="white" fillOpacity="0.2" />
                <path d="M0 96C96 82 192 82 288 96V96H0V96Z" fill="white" fillOpacity="0.15" />
                <path d="M0 96C96 84 192 84 288 96V96H0V96Z" fill="white" fillOpacity="0.1" />
                <path d="M0 96C96 86 192 86 288 96V96H0V96Z" fill="white" fillOpacity="0.08" />
                <path d="M0 96C96 88 192 88 288 96V96H0V96Z" fill="white" fillOpacity="0.06" />
                <path d="M0 96C96 90 192 90 288 96V96H0V96Z" fill="white" fillOpacity="0.04" />
                <path d="M0 96C96 92 192 92 288 96V96H0V96Z" fill="white" fillOpacity="0.02" />
              </svg>
            </div>
          </div>
        </div>

        {/* Theme Options */}
        <div className="flex justify-center space-x-4 mb-8">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${theme.gradient} transition-all duration-200 ${
                selectedTheme === theme.id ? "scale-110" : "scale-100"
              }`}
            >
              {theme.id === "nature" && (
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-green-400 via-teal-300 to-blue-400 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-green-600/30 to-transparent" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            className="bg-[#7796C6] rounded-[10px] w-80 text-white px-16 py-3 rounded-lg font-medium transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default ThemeSelection
