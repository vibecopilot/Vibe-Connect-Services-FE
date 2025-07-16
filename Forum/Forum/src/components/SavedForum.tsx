"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { FiArrowLeft } from "react-icons/fi"

interface SavedForumProps {
  onBack: () => void
}

interface SavedForumData {
  id: number
  title: string
  description: string
  tags: string
  author: string
  savedAt: string
  image?: string
}

const SavedForum: React.FC<SavedForumProps> = ({ onBack }) => {
  const [savedForums, setSavedForums] = useState<SavedForumData[]>([])

  useEffect(() => {
    loadSavedForums()
  }, [])

  const loadSavedForums = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("savedForums") || "[]")
      setSavedForums(saved)
    } catch (error) {
      console.error("Error loading saved forums:", error)
      setSavedForums([])
    }
  }

  const handleUnsave = (forumId: number) => {
    if (confirm("Are you sure you want to remove this forum from saved?")) {
      try {
        const updatedSaved = savedForums.filter((forum) => forum.id !== forumId)
        setSavedForums(updatedSaved)
        localStorage.setItem("savedForums", JSON.stringify(updatedSaved))
        alert("Forum removed from saved!")
      } catch (error) {
        console.error("Error removing saved forum:", error)
        alert("Error removing forum. Please try again.")
      }
    }
  }

  return (
    <div className="bg-white rounded-md shadow-sm min-h-96">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Saved Forum</h1>
          <button
            onClick={onBack}
            className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-medium rounded hover:bg-blue-200"
          >
            <FiArrowLeft className="w-4 h-4 mr-1" />
            Go Back
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {savedForums.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 text-lg">No Saved Forums</p>
          </div>
        ) : (
          <div className="space-y-4">
            {savedForums.map((forum) => (
              <div key={forum.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{forum.title}</h3>
                    <p className="text-blue-600 text-sm mb-2">{forum.tags}</p>
                    <p className="text-sm text-gray-600 mb-2">{forum.description}</p>
                    {forum.image && (
                      <img
                        src={forum.image || "/placeholder.svg"}
                        alt="Forum image"
                        className="w-20 h-20 object-cover rounded mb-2"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = "none"
                        }}
                      />
                    )}
                    <p className="text-xs text-gray-500">Saved on {new Date(forum.savedAt).toLocaleDateString()}</p>
                  </div>
                  <button onClick={() => handleUnsave(forum.id)} className="text-red-600 hover:text-red-700 p-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SavedForum
