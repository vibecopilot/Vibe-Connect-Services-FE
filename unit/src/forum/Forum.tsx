"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { FiChevronLeft, FiPlus, FiBookmark, FiClock, FiEyeOff, FiMoreHorizontal } from "react-icons/fi"

import ForumAnalytics from "./ForumAnalytics"
import SavedForum from "./SavedForum"
import ReportedForum from "./ReportedForum"
import HiddenForum from "./HiddenForum"
import CreateForum from "./CreateForum"

interface ForumPost {
  id: number
  author: string
  timeAgo: string
  title: string
  tags: string
  description: string
  image?: string
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  createdAt: string
}

const mockActivity = [
  {
    id: 1,
    user: "Veer shah",
    action: "Liked your Photo",
    time: "2m ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    user: "Sneha dhuri",
    action: "Liked your Photo",
    time: "5m ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    user: "Sneha dhuri",
    action: "Liked your Photo",
    time: "8m ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    user: "Sneha dhuri",
    action: "Liked your Photo",
    time: "12m ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const mockSuggestions = [
  { id: 1, name: "Sneha dhuri", subtitle: "Suggested for you", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 2, name: "Sneha dhuri", subtitle: "Suggested for you", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 3, name: "Sneha dhuri", subtitle: "Suggested for you", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 4, name: "Sneha dhuri", subtitle: "Suggested for you", avatar: "/placeholder.svg?height=40&width=40" },
]

const Forum: React.FC = () => {
  const [activeTab, setActiveTab] = useState("forum")
  const [activeSubTab, setActiveSubTab] = useState("main")
  const [forums, setForums] = useState<ForumPost[]>([])
  const [showDropdown, setShowDropdown] = useState<number | null>(null)

  // Load forums from localStorage on component mount
  useEffect(() => {
    loadForums()
  }, [])

  const loadForums = () => {
    const savedForums = localStorage.getItem("forums")
    if (savedForums) {
      try {
        const parsedForums = JSON.parse(savedForums)
        setForums(parsedForums)
      } catch (error) {
        console.error("Error parsing forums:", error)
        initializeDefaultForums()
      }
    } else {
      initializeDefaultForums()
    }
  }

  const initializeDefaultForums = () => {
    const defaultForums: ForumPost[] = [
      {
        id: 1,
        author: "Sejal Meher",
        timeAgo: "12 minutes ago",
        title: "Memories For Life",
        tags: "#friends #OfficeBuddies #trek",
        description: "Amazing memories with office buddies during our recent trek!",
        image: "/placeholder.svg?height=300&width=500",
        likes: 148,
        comments: 26,
        shares: 15,
        isLiked: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        author: "Sejal Meher",
        timeAgo: "15 minutes ago",
        title: "Memories For Life",
        tags: "#friends #OfficeBuddies #trek",
        description: "Another great moment captured during our adventure!",
        image: "/placeholder.svg?height=300&width=500",
        likes: 190,
        comments: 35,
        shares: 9,
        isLiked: true,
        createdAt: new Date().toISOString(),
      },
    ]
    setForums(defaultForums)
    localStorage.setItem("forums", JSON.stringify(defaultForums))
  }

  const handleLike = (forumId: number) => {
    const updatedForums = forums.map((forum) => {
      if (forum.id === forumId) {
        return {
          ...forum,
          isLiked: !forum.isLiked,
          likes: forum.isLiked ? forum.likes - 1 : forum.likes + 1,
        }
      }
      return forum
    })
    setForums(updatedForums)
    localStorage.setItem("forums", JSON.stringify(updatedForums))
  }

  const handleSave = (forum: ForumPost) => {
    const savedForums = JSON.parse(localStorage.getItem("savedForums") || "[]")
    const forumToSave = { ...forum, savedAt: new Date().toISOString() }
    const isAlreadySaved = savedForums.some((saved: any) => saved.id === forum.id)

    if (!isAlreadySaved) {
      savedForums.push(forumToSave)
      localStorage.setItem("savedForums", JSON.stringify(savedForums))
      alert("Forum saved successfully!")
    } else {
      alert("Forum is already saved!")
    }
    setShowDropdown(null)
  }

  const handleReport = (forum: ForumPost) => {
    const reason = prompt("Please provide a reason for reporting this forum:")
    if (reason) {
      const reportedForums = JSON.parse(localStorage.getItem("reportedForums") || "[]")
      const forumToReport = {
        ...forum,
        reason,
        reportedAt: new Date().toISOString(),
      }
      reportedForums.push(forumToReport)
      localStorage.setItem("reportedForums", JSON.stringify(reportedForums))
      alert("Forum reported successfully!")
    }
    setShowDropdown(null)
  }

  const handleHide = (forum: ForumPost) => {
    if (confirm("Are you sure you want to hide this forum?")) {
      const hiddenForums = JSON.parse(localStorage.getItem("hiddenForums") || "[]")
      const forumToHide = { ...forum, hiddenAt: new Date().toISOString() }
      hiddenForums.push(forumToHide)
      localStorage.setItem("hiddenForums", JSON.stringify(hiddenForums))

      // Remove from main forums list
      const updatedForums = forums.filter((f) => f.id !== forum.id)
      setForums(updatedForums)
      localStorage.setItem("forums", JSON.stringify(updatedForums))
      alert("Forum hidden successfully!")
    }
    setShowDropdown(null)
  }

  const handleDelete = (forumId: number) => {
    if (confirm("Are you sure you want to delete this forum?")) {
      const updatedForums = forums.filter((forum) => forum.id !== forumId)
      setForums(updatedForums)
      localStorage.setItem("forums", JSON.stringify(updatedForums))
      alert("Forum deleted successfully!")
    }
    setShowDropdown(null)
  }

  const handleForumCreated = () => {
    // Reload forums from localStorage after creation
    loadForums()
    setActiveSubTab("main")
  }

  const renderSubContent = () => {
    switch (activeSubTab) {
      case "create":
        return <CreateForum onBack={() => setActiveSubTab("main")} onForumCreated={handleForumCreated} />
      case "analytics":
        return <ForumAnalytics onBack={() => setActiveSubTab("main")} />
      case "saved":
        return <SavedForum onBack={() => setActiveSubTab("main")} />
      case "reported":
        return <ReportedForum onBack={() => setActiveSubTab("main")} />
      case "hidden":
        return <HiddenForum onBack={() => setActiveSubTab("main")} />
      default:
        return renderMainForum()
    }
  }

  const renderMainForum = () => (
    <div className="flex gap-6">
      {/* Main Content */}
      <div className="flex-1">
        {/* Forum Posts */}
        <div className="space-y-6">
          {forums.length === 0 ? (
            <div className="bg-white rounded-md shadow-sm p-6">
              <div className="flex items-center justify-center h-64">
                <p className="text-lg" style={{ color: "#5E5E5E" }}>
                  No forums available. Create your first forum!
                </p>
              </div>
            </div>
          ) : (
            forums.map((forum) => (
              <div key={forum.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Post Header */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src="/placeholder.svg?height=40&width=40"
                      alt={forum.author}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-medium" style={{ color: "#5E5E5E" }}>
                        {forum.author}
                      </h3>
                      <p className="text-sm" style={{ color: "#5E5E5E" }}>
                        {forum.timeAgo}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setActiveSubTab("analytics")}
                      className="text-sm font-medium hover:text-blue-700"
                      style={{ color: "#5E5E5E" }}
                    >
                      View Analysis
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => setShowDropdown(showDropdown === forum.id ? null : forum.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <FiMoreHorizontal className="w-4 h-4" style={{ color: "#5E5E5E" }} />
                      </button>
                      {showDropdown === forum.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                          <button
                            onClick={() => handleSave(forum)}
                            className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
                            style={{ color: "#5E5E5E" }}
                          >
                            <FiBookmark className="w-4 h-4 mr-2" />
                            Save Forum
                          </button>
                          <button
                            onClick={() => handleReport(forum)}
                            className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
                            style={{ color: "#5E5E5E" }}
                          >
                            <FiClock className="w-4 h-4 mr-2" />
                            Report Forum
                          </button>
                          <button
                            onClick={() => handleHide(forum)}
                            className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
                            style={{ color: "#5E5E5E" }}
                          >
                            <FiEyeOff className="w-4 h-4 mr-2" />
                            Hide Forum
                          </button>
                          <button
                            onClick={() => handleDelete(forum.id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            Delete Forum
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="px-4 pb-3">
                  <h4 className="font-medium mb-1" style={{ color: "#5E5E5E" }}>
                    {forum.title}
                  </h4>
                  <p className="text-blue-600 text-sm mb-2">{forum.tags}</p>
                  <p className="text-sm" style={{ color: "#5E5E5E" }}>
                    {forum.description}
                  </p>
                </div>

                {/* Post Image */}
                {forum.image && (
                  <div className="relative">
                    <img
                      src={forum.image || "/placeholder.svg"}
                      alt="Forum post"
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=300&width=500"
                      }}
                    />
                    <svg className="absolute bottom-4 right-4 w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                )}

                {/* Post Actions */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => handleLike(forum.id)}
                      className={`flex items-center space-x-2 ${forum.isLiked ? "text-red-500" : ""}`}
                      style={{ color: forum.isLiked ? "#ef4444" : "#5E5E5E" }}
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                      <span className="text-sm">{forum.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2" style={{ color: "#5E5E5E" }}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <span className="text-sm">{forum.comments}</span>
                    </button>
                    <button className="flex items-center space-x-2" style={{ color: "#5E5E5E" }}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                        />
                      </svg>
                      <span className="text-sm">{forum.shares}</span>
                    </button>
                  </div>
                  <button
                    onClick={() => handleDelete(forum.id)}
                    className="hover:text-red-600"
                    style={{ color: "#5E5E5E" }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            ))
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 space-y-6">
        {/* Activity Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium" style={{ color: "#5E5E5E" }}>
              Activity
            </h3>
            <button className="text-sm hover:text-blue-700" style={{ color: "#5E5E5E" }}>
              See All
            </button>
          </div>
          <div className="space-y-3">
            {mockActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3">
                <img src={activity.avatar || "/placeholder.svg"} alt={activity.user} className="w-8 h-8 rounded-full" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm" style={{ color: "#5E5E5E" }}>
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                </div>
                <img
                  src="/placeholder.svg?height=32&width=32"
                  alt="Post thumbnail"
                  className="w-8 h-8 rounded object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Suggestions Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium" style={{ color: "#5E5E5E" }}>
              Suggestions
            </h3>
            <button className="text-sm hover:text-blue-700" style={{ color: "#5E5E5E" }}>
              See All
            </button>
          </div>
          <div className="space-y-3">
            {mockSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={suggestion.avatar || "/placeholder.svg"}
                    alt={suggestion.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium" style={{ color: "#5E5E5E" }}>
                      {suggestion.name}
                    </p>
                    <p className="text-xs" style={{ color: "#5E5E5E" }}>
                      {suggestion.subtitle}
                    </p>
                  </div>
                </div>
                <button className="text-sm font-medium hover:text-blue-700" style={{ color: "#5E5E5E" }}>
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowDropdown(null)
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <div className="main-content">
        {/* Header with Breadcrumb */}
        <div className="bg-white px-6 py-3 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <FiChevronLeft className="w-4 h-4 text-gray-400" />
            <span className="breadcrumb-text">Setup</span>
            <FiChevronLeft className="w-4 h-4 text-gray-400" />
            <span className="breadcrumb-text">Communication</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-6">
            <nav className="flex space-x-8">
              {[
                { id: "events", label: "Events" },
                { id: "broadcast", label: "Broadcast" },
                { id: "survey", label: "Survey/Polls" },
                { id: "forum", label: "Forum" },
                { id: "groups", label: "Groups" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-1 border-b-2 font-medium transition-colors duration-200 tab-text ${
                    activeTab === tab.id ? "active" : "border-transparent hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Forum Action Buttons */}
        {activeTab === "forum" && activeSubTab === "main" && (
          <div className="bg-white border-b border-gray-200">
            <div className="px-6 py-3">
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setActiveSubTab("create")}
                  className="inline-flex items-center px-3 py-1.5 text-white text-sm font-medium rounded hover:opacity-80"
                  style={{ backgroundColor: "#ADC6E6" }}
                >
                  <FiPlus className="w-4 h-4 mr-1" />
                  Create
                </button>
                <button
                  onClick={() => setActiveSubTab("saved")}
                  className="inline-flex items-center px-3 py-1.5 text-white text-sm font-medium rounded hover:opacity-80"
                  style={{ backgroundColor: "#5E5E5E" }}
                >
                  <FiBookmark className="w-4 h-4 mr-1" />
                  Saved
                </button>
                <button
                  onClick={() => setActiveSubTab("reported")}
                  className="inline-flex items-center px-3 py-1.5 text-white text-sm font-medium rounded hover:opacity-80"
                  style={{ backgroundColor: "#F87171" }}
                >
                  <FiClock className="w-4 h-4 mr-1" />
                  Reported
                </button>
                <button
                  onClick={() => setActiveSubTab("hidden")}
                  className="inline-flex items-center px-3 py-1.5 text-white text-sm font-medium rounded hover:opacity-80"
                  style={{ backgroundColor: "#5E5E5E" }}
                >
                  <FiEyeOff className="w-4 h-4 mr-1" />
                  Hidden
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content */}
        <div className="px-6 py-6">
          {activeTab === "forum" ? (
            renderSubContent()
          ) : (
            <div className="bg-white rounded-md shadow-sm p-6">
              <p className="text-center" style={{ color: "#5E5E5E" }}>
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} content will be implemented here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Forum
