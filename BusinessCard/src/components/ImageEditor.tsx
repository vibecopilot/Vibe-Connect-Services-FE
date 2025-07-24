"use client"

import type React from "react"
import { useRef } from "react"
import { Upload } from "lucide-react"
import { useCardEditor } from "../context/CardEditorContext"

const ImageEditor = () => {
  const { editorState, updateCardContent } = useCardEditor()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        // Update profile image in the card editor state
        updateCardContent({ profileImage: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    updateCardContent({ profileImage: null })
  }

  return (
    <div className="space-y-6">
      {/* Current Profile Image Preview */}
      {editorState.profileImage && (
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gray-200">
            <img
              src={editorState.profileImage || "/placeholder.svg"}
              alt="Current Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <button onClick={removeImage} className="text-red-500 text-sm hover:text-red-700 transition-colors">
            Remove Image
          </button>
        </div>
      )}

      {/* Upload Section */}
      <div className="text-center">
        <button
          onClick={handleImageUpload}
          className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors"
        >
          <Upload className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-gray-500">
            {editorState.profileImage ? "Change Profile Image" : "Upload Profile Image"}
          </span>
        </button>
        <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

      {/* Instructions */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-800 mb-2">Profile Image Tips:</h4>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Use a high-quality, professional headshot</li>
          <li>• Square images work best (1:1 ratio)</li>
          <li>• Ensure good lighting and clear visibility</li>
          <li>• Avoid busy backgrounds</li>
        </ul>
      </div>
    </div>
  )
}

export default ImageEditor
