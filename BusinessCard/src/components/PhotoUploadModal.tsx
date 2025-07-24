"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useBusinessCard } from "../context/BusinessCardContext"

interface PhotoUploadModalProps {
  onClose: () => void
}

const PhotoUploadModal = ({ onClose }: PhotoUploadModalProps) => {
  const { updateProfileImage } = useBusinessCard()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Open file picker when modal opens
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }, [])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setSelectedImage(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    if (selectedImage) {
      updateProfileImage(selectedImage)
      onClose()
    }
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-80 overflow-hidden">
        <div className="bg-gray-800 p-6">
          <div className="aspect-square bg-white rounded-md flex items-center justify-center overflow-hidden">
            {selectedImage ? (
              <img src={selectedImage || "/placeholder.svg"} alt="Selected" className="w-full h-full object-cover" />
            ) : (
              <div className="text-gray-400 text-center p-8">
                <p>Select an image</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex p-4 bg-white gap-3">
          <button
            onClick={handleSave}
            disabled={!selectedImage}
            className={`flex-1 py-3 px-4 rounded-lg font-medium ${
              selectedImage
                ? "bg-[#7796C6] text-white hover:bg-[#6b8ac0]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 py-3 px-4 bg-white text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
          >
            Cancel
          </button>
        </div>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
    </div>
  )
}

export default PhotoUploadModal
