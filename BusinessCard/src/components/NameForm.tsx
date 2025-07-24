"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft } from "lucide-react"
import { useBusinessCard } from "../context/BusinessCardContext"

const NameForm = () => {
  const navigate = useNavigate()
  const { data, updateName } = useBusinessCard()
  const [name, setName] = useState(data.name)

  const handleBack = () => {
    navigate("/theme-selection")
  }

  const handleContinue = () => {
    if (name.trim()) {
      updateName(name.trim())
      navigate("/user-profile")
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Setup</span>
          <ChevronLeft className="w-4 h-4 rotate-180" />
          <span className="font-medium">Business Card</span>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-8 relative">
        {/* Back Button */}
        <button onClick={handleBack} className="absolute left-6 top-2">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>

        {/* Progress */}
        <div className="flex justify-center mb-6">
          <div className="flex space-x-2">
            <div className="w-8 h-1 bg-blue-700 rounded-full"></div>
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">What's your name?</h1>

        {/* Info Box */}
        <div className="bg-[#E6EAF3] w-full max-w-sm mx-auto rounded-full flex items-center justify-center px-8 py-3 text-sm mb-6 shadow-md">
          <span className="text-base mr-2">💡</span>
          <span className="text-[#4569A0]">This name will be displayed on your card</span>
        </div>

        {/* Input */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add Full Name"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
        />

        {/* Button */}
        <button
          onClick={handleContinue}
          disabled={!name.trim()}
          className={`w-full py-3 rounded-[10px] font-medium transition-colors ${
            name.trim() ? "bg-[#7796C6] text-white hover:bg-[#6b8ac0]" : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default NameForm
