"use client"

import type React from "react"
import { useState } from "react"
import { FiArrowLeft } from "react-icons/fi"

interface CreateForumProps {
  onBack: () => void
  onForumCreated: () => void
}

const CreateForum: React.FC<CreateForumProps> = ({ onBack, onForumCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    tags: "",
    description: "",
    image: null as File | null,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({
      ...prev,
      image: file,
    }))

    // Create preview URL for the selected image
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setImagePreview(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Please fill in all required fields!")
      return
    }

    // Convert image to base64 if present
    if (formData.image) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string
        createForumPost(imageDataUrl)
      }
      reader.readAsDataURL(formData.image)
    } else {
      createForumPost(undefined)
    }
  }

  const createForumPost = (imageDataUrl?: string) => {
    // Create new forum post
    const newForum = {
      id: Date.now(),
      title: formData.title.trim(),
      tags: formData.tags.trim() || "#general",
      description: formData.description.trim(),
      image: imageDataUrl,
      author: "Current User",
      timeAgo: "Just now",
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
    }

    try {
      // Get existing forums
      const existingForums = JSON.parse(localStorage.getItem("forums") || "[]")

      // Add new forum to the beginning
      const updatedForums = [newForum, ...existingForums]

      // Save to localStorage
      localStorage.setItem("forums", JSON.stringify(updatedForums))

      // Reset form
      setFormData({
        title: "",
        tags: "",
        description: "",
        image: null,
      })
      setImagePreview(null)

      // Clear file input
      const fileInput = document.getElementById("image") as HTMLInputElement
      if (fileInput) {
        fileInput.value = ""
      }

      alert("Forum created successfully!")
      onForumCreated()
    } catch (error) {
      console.error("Error creating forum:", error)
      alert("Error creating forum. Please try again.")
    }
  }

  return (
    <div className="bg-white rounded-md shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Create Forum</h1>
          <button
            onClick={onBack}
            className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-medium rounded hover:bg-blue-200"
          >
            <FiArrowLeft className="w-4 h-4 mr-1" />
            Go Back
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter Title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
              Tags:
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="#tags"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Thread Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Thread Description: <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter Description"
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            required
          />
        </div>

        {/* Forum Picture */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Forum Picture:</label>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input type="file" id="image" onChange={handleFileChange} accept="image/*" className="hidden" />
              <label
                htmlFor="image"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded cursor-pointer hover:bg-gray-300 transition-colors"
              >
                Choose File
              </label>
              <span className="text-sm text-gray-500">{formData.image ? formData.image.name : "No File Chosen"}</span>
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                <div className="relative inline-block">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="max-w-xs max-h-48 object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null)
                      setFormData((prev) => ({ ...prev, image: null }))
                      const fileInput = document.getElementById("image") as HTMLInputElement
                      if (fileInput) fileInput.value = ""
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
         <button
  type="submit"
  className="px-6 py-2 text-white font-medium rounded transition-colors"
  style={{ backgroundColor: "#6B8FC7" }}
>
  Create Forum
</button>

        </div>
      </form>
    </div>
  )
}

export default CreateForum
