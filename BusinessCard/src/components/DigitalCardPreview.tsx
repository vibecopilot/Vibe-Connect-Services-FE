"use client"

import { useState } from "react"
import { X } from "lucide-react"
import BusinessCard from "./BusinessCard"
import { useBusinessCard } from "../context/BusinessCardContext"
import PhotoUploadModal from "./PhotoUploadModal"

interface DigitalCardPreviewProps {
  onClose: () => void
}

const DigitalCardPreview = ({ onClose }: DigitalCardPreviewProps) => {
  const { data } = useBusinessCard()
  const [showPhotoModal, setShowPhotoModal] = useState(false)

  const handleProfileClick = () => {
    if (!data.profileImage) {
      setShowPhotoModal(true)
    }
  }

  const handlePhotoModalClose = () => {
    setShowPhotoModal(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
        <BusinessCard isDigital onProfileClick={handleProfileClick} />
      </div>

      {/* Photo Upload Modal */}
      {showPhotoModal && <PhotoUploadModal onClose={handlePhotoModalClose} />}
    </div>
  )
}

export default DigitalCardPreview
