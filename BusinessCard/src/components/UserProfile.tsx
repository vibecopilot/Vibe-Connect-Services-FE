"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, Plus } from "lucide-react"
import { useBusinessCard } from "../context/BusinessCardContext"

const UserProfile = () => {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { data, updateProfileImage } = useBusinessCard()
  const [showPreview, setShowPreview] = useState(false)
  const [tempImage, setTempImage] = useState<string | null>(null)

  const handleBack = () => {
    navigate("/name-form")
  }

  const handleContinue = () => {
    navigate("/company-profile")
  }

  const handleSkip = () => {
    updateProfileImage(null)
    navigate("/company-profile")
  }

  const handleAddPhoto = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setTempImage(result)
        setShowPreview(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    if (tempImage) {
      updateProfileImage(tempImage)
      setShowPreview(false)
      setTempImage(null)
    }
  }

  const handleCancel = () => {
    setShowPreview(false)
    setTempImage(null)
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
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Set a photo of yourself</h1>

        {/* Info Box */}
        <div className="bg-[#E6EAF3] w-full max-w-sm mx-auto rounded-full flex items-center justify-center px-8 py-3 text-sm mb-8 shadow-md">
          <span className="text-base mr-2">💡</span>
          <span className="text-[#4569A0]">This Photo will be displayed on your card</span>
        </div>

        {/* Photo Selection Area */}
        <div className="flex justify-center mb-8">
          {data.profileImage ? (
            <div
              className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden"
              onClick={handleAddPhoto}
            >
              <img src={data.profileImage || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div
              className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors"
              onClick={handleAddPhoto}
            >
              <Plus className="w-8 h-8 text-gray-500" />
            </div>
          )}
        </div>

        {/* Hidden File Input */}
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

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

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-3 w-64 shadow-xl">
            {/* Dark Border Frame with Centered Image */}
            <div className="w-full aspect-square bg-gray-800 rounded-md mb-3 overflow-hidden">
              <div className="w-full h-full bg-white rounded-md overflow-hidden flex items-center justify-center">
                {tempImage && (
                  <img src={tempImage || "/placeholder.svg"} alt="Preview" className="w-full h-full object-contain" />
                )}
              </div>
            </div>

            {/* Compact Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="flex-1 py-1 px-3 bg-[#7796C6] text-white rounded text-sm font-medium hover:bg-[#6b8ac0] transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 py-1 px-3 bg-white text-gray-600 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProfile
