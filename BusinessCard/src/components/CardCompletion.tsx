"use client"

import { useState } from "react"
import { ChevronLeft, Download, Plus } from "lucide-react"
import { useBusinessCard } from "../context/BusinessCardContext"
import BusinessCard from "./BusinessCard"
import DigitalCardPreview from "./DigitalCardPreview"
import PhotoUploadModal from "./PhotoUploadModal"

const CardCompletion = () => {
  const { data } = useBusinessCard()
  const [showDigitalPreview, setShowDigitalPreview] = useState(false)
  const [showPhotoModal, setShowPhotoModal] = useState(false)

  const handleBack = () => {
    // Navigate back functionality
    console.log("Navigate back")
  }

  const handleDownload = () => {
    console.log("Downloading business card...")
    // Implement download functionality
  }

  const handleAddPhotoToDigital = () => {
    setShowPhotoModal(true)
  }

  const handleDigitalCardClick = () => {
    setShowDigitalPreview(true)
  }

  const handlePhotoModalClose = () => {
    setShowPhotoModal(false)
  }

  const hasProfileImage = !!data.profileImage

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

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Business Card Section */}
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-10">
              <span className="text-3xl mr-3">👏</span>
              <h1 className="text-2xl font-bold text-gray-800">Your Business Card is ready!</h1>
            </div>

            <div className="flex gap-8 mb-10">
              <BusinessCard />
              <BusinessCard showQR />
            </div>

            <button
              onClick={handleDownload}
              className="flex items-center space-x-3 bg-[#E6EAF3] text-[#4569A0] px-8 py-4 rounded-full hover:bg-[#d6dae8] transition-colors font-medium"
            >
              <Download className="w-5 h-5" />
              <span>Click here to download Business Card</span>
            </button>
          </div>

          {/* Digital ID Section */}
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-10">
              <span className="text-3xl mr-3">👏</span>
              <h1 className="text-2xl font-bold text-gray-800">
                {hasProfileImage ? "Your Digital ID is ready!" : "Your Digital ID is almost ready!"}
              </h1>
            </div>

            {!hasProfileImage && (
              <button
                onClick={handleAddPhotoToDigital}
                className="flex items-center space-x-2 bg-[#E6EAF3] text-[#4569A0] px-6 py-3 rounded-lg mb-8 hover:bg-[#d6dae8] transition-colors font-medium"
              >
                <Plus className="w-4 h-4" />
                <span>Add Photo to your Digital ID</span>
              </button>
            )}

            <div className="mb-10">
              <BusinessCard isDigital onClick={handleDigitalCardClick} onProfileClick={handleAddPhotoToDigital} />
            </div>

            {hasProfileImage && (
              <button
                onClick={handleDownload}
                className="flex items-center space-x-3 bg-[#E6EAF3] text-[#4569A0] px-8 py-4 rounded-full hover:bg-[#d6dae8] transition-colors font-medium"
              >
                <Download className="w-5 h-5" />
                <span>Click here to download</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Digital Card Preview Modal */}
      {showDigitalPreview && <DigitalCardPreview onClose={() => setShowDigitalPreview(false)} />}

      {/* Photo Upload Modal */}
      {showPhotoModal && <PhotoUploadModal onClose={handlePhotoModalClose} />}
    </div>
  )
}

export default CardCompletion
