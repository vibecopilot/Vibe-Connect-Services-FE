"use client"

import { useState } from "react"
import { ChevronLeft, Download } from "lucide-react"
import { useBusinessCard } from "../context/BusinessCardContext"
import BusinessCard from "./BusinessCard"
import DigitalCardPreview from "./DigitalCardPreview"

const DigitalIDSuccess = () => {
  useBusinessCard()
  const [showDigitalPreview, setShowDigitalPreview] = useState(false)

  const handleBack = () => {
    // Navigate back functionality
    console.log("Navigate back")
  }

  const handleDownload = () => {
    console.log("Downloading digital ID...")
    // Implement download functionality
  }

  const handleDigitalCardClick = () => {
    setShowDigitalPreview(true)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-200">
        <button onClick={handleBack} className="mr-4 hover:bg-gray-100 p-1 rounded">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Setup</span>
          <ChevronLeft className="w-4 h-4 rotate-180" />
          <span className="font-medium text-gray-800">Business Card</span>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-12 flex flex-col items-center">
        <div className="flex items-center mb-10">
          <span className="text-3xl mr-3">👏</span>
          <h1 className="text-2xl font-bold text-gray-800">Your Digital ID is now ready!</h1>
        </div>

        <div className="mb-10">
          <BusinessCard isDigital onClick={handleDigitalCardClick} />
        </div>

        <button
          onClick={handleDownload}
          className="flex items-center space-x-3 bg-[#E6EAF3] text-[#4569A0] px-8 py-4 rounded-full hover:bg-[#d6dae8] transition-colors font-medium"
        >
          <Download className="w-5 h-5" />
          <span>Click here to download</span>
        </button>

        {/* Digital Card Preview Modal */}
        {showDigitalPreview && <DigitalCardPreview onClose={() => setShowDigitalPreview(false)} />}
      </div>
    </div>
  )
}

export default DigitalIDSuccess
