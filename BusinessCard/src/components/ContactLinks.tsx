"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft } from "lucide-react"
import { useBusinessCard } from "../context/BusinessCardContext"

const ContactLinks = () => {
  const navigate = useNavigate()
  const { data, updateContactLinks } = useBusinessCard()
  const [websiteUrl, setWebsiteUrl] = useState(data.websiteUrl)
  const [linkedinUrl, setLinkedinUrl] = useState(data.linkedinUrl)
  const [otherUrl, setOtherUrl] = useState(data.otherUrl)

  const handleBack = () => {
    navigate("/work-details")
  }

  const handleContinue = () => {
    updateContactLinks(websiteUrl.trim(), linkedinUrl.trim(), otherUrl.trim())
    navigate("/card-completion")
  }

  const handleSkip = () => {
    updateContactLinks("", "", "")
    navigate("/card-completion")
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
            <div className="w-8 h-1 bg-blue-700 rounded-full"></div>
            <div className="w-8 h-1 bg-blue-700 rounded-full"></div>
            <div className="w-8 h-1 bg-blue-700 rounded-full"></div>
            <div className="w-8 h-1 bg-blue-700 rounded-full"></div>
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Add Contact Links</h1>

        {/* Info Box */}
        <div className="bg-[#E6EAF3] w-full rounded-full flex items-center justify-center px-8 py-3 text-sm mb-8 shadow-md mx-auto">
          <span className="text-base mr-2 flex-shrink-0">💡</span>
          <span className="text-[#4569A0] text-center">These links will be displayed on your card</span>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 mb-8">
          <input
            type="url"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="Add Website Url"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="url"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            placeholder="Add Linkedin Url"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="url"
            value={otherUrl}
            onChange={(e) => setOtherUrl(e.target.value)}
            placeholder="Other Url"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleContinue}
            className="w-full py-3 rounded-[10px] font-medium bg-[#7796C6] text-white hover:bg-[#6b8ac0] transition-colors"
          >
            Continue
          </button>
          <button
            onClick={handleSkip}
            className="w-full py-3 rounded-[10px] font-medium bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContactLinks
