"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { FiChevronLeft, FiPlus, FiBookmark, FiClock, FiEyeOff } from "react-icons/fi"

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

// Mock user avatars with proper fallback images
const getUserAvatar = (name: string): string => {
  const avatars: Record<string, string> = {
    "Sejal Meher": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    "Veer shah": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    "Sneha dhuri": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  }
  return (
    avatars[name] ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=150&background=6366f1&color=ffffff&rounded=true`
  )
}

// Mock post images
const getPostImage = (index: number): string => {
  const postImages = [
    "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
  ]
  return postImages[index % postImages.length]
}

// Mock thumbnail images for activity
const getThumbnailImage = (index: number): string => {
  const thumbnails = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=100&h=100&fit=crop",
  ]
  return thumbnails[index % thumbnails.length]
}

const mockActivity = [
  {
    id: 1,
    user: "Veer shah",
    action: "Liked your Photo",
    time: "2m ago",
    avatar: getUserAvatar("Veer shah"),
    thumbnail: getThumbnailImage(0),
  },
  {
    id: 2,
    user: "Sneha dhuri",
    action: "Liked your Photo",
    time: "5m ago",
    avatar: getUserAvatar("Sneha dhuri"),
    thumbnail: getThumbnailImage(1),
  },
  {
    id: 3,
    user: "Sneha dhuri",
    action: "Liked your Photo",
    time: "8m ago",
    avatar: getUserAvatar("Sneha dhuri"),
    thumbnail: getThumbnailImage(0),
  },
  {
    id: 4,
    user: "Sneha dhuri",
    action: "Liked your Photo",
    time: "12m ago",
    avatar: getUserAvatar("Sneha dhuri"),
    thumbnail: getThumbnailImage(1),
  },
]

const mockSuggestions = [
  {
    id: 1,
    name: "Sneha dhuri",
    subtitle: "Suggested for you",
    avatar: getUserAvatar("Sneha dhuri"),
  },
  {
    id: 2,
    name: "Sneha dhuri",
    subtitle: "Suggested for you",
    avatar: getUserAvatar("Sneha dhuri"),
  },
  {
    id: 3,
    name: "Sneha dhuri",
    subtitle: "Suggested for you",
    avatar: getUserAvatar("Sneha dhuri"),
  },
  {
    id: 4,
    name: "Sneha dhuri",
    subtitle: "Suggested for you",
    avatar: getUserAvatar("Sneha dhuri"),
  },
]

const Forum: React.FC = () => {
  const [activeTab, setActiveTab] = useState("forum")
  const [activeSubTab, setActiveSubTab] = useState("main")
  const [forums, setForums] = useState<ForumPost[]>([])

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
        image: getPostImage(0),
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
        image: getPostImage(1),
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

  const handleDelete = (forumId: number) => {
    if (confirm("Are you sure you want to delete this forum?")) {
      const updatedForums = forums.filter((forum) => forum.id !== forumId)
      setForums(updatedForums)
      localStorage.setItem("forums", JSON.stringify(updatedForums))
      alert("Forum deleted successfully!")
    }
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
    <div className="forum-content-wrapper">
      {/* Action Buttons positioned below navigation tabs */}
      {activeTab === "forum" && activeSubTab === "main" && (
        <div className="forum-actions-container">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveSubTab("create")}
              className="forum-action-btn inline-flex items-center justify-center"
            >
              <FiPlus className="w-4 h-4 mr-1" />
              Create
            </button>
            <button
              onClick={() => setActiveSubTab("saved")}
              className="forum-action-btn inline-flex items-center justify-center"
            >
              <FiBookmark className="w-4 h-4 mr-1" />
              Saved
            </button>
            <button
              onClick={() => setActiveSubTab("reported")}
              className="forum-action-btn inline-flex items-center justify-center"
            >
              <FiClock className="w-4 h-4 mr-1" />
              Reported
            </button>
            <button
              onClick={() => setActiveSubTab("hidden")}
              className="forum-action-btn inline-flex items-center justify-center"
            >
              <FiEyeOff className="w-4 h-4 mr-1" />
              Hidden
            </button>
          </div>
        </div>
      )}

      <div className="forum-main-layout">
        {/* Main Content */}
        <div className="forum-main-content">
          {/* Forum Posts */}
          <div className="forum-posts-container">
            {forums.length === 0 ? (
              <div className="forum-post-card p-6">
                <div className="flex items-center justify-center h-64">
                  <p className="text-lg forum-description">No forums available. Create your first forum!</p>
                </div>
              </div>
            ) : (
              forums.map((forum, index) => (
                <div key={forum.id} className="forum-post-card">
                  {/* Post Header */}
                  <div className="px-[25px] pt-[10px] pb-[13px] flex items-center justify-between relative">
                    <div className="flex items-end space-x-3">
                      <img
                        src={getUserAvatar(forum.author) || "/placeholder.svg"}
                        alt={forum.author}
                        className="profile-image-main"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(forum.author)}&size=150&background=6366f1&color=ffffff&rounded=true`
                        }}
                      />
                      <div className="flex flex-col justify-end">
                        <h3 className="forum-author-name">{forum.author}</h3>
                        <p className="text-sm forum-time-ago">{forum.timeAgo}</p>
                      </div>
                    </div>
                    <button onClick={() => setActiveSubTab("analytics")} className="view-analysis-btn">
                      View Analysis
                    </button>
                  </div>

                  <div className="forum-post-separator"></div>

                  {/* Post Content - Title and Tags on same line */}
                  <div className="forum-text-content">
                    <div className="flex items-baseline space-x-2">
                      <h4 className="font-medium forum-title">{forum.title}</h4>
                      <p className="text-sm forum-tags">{forum.tags}</p>
                    </div>
                  </div>

                  {/* Post Image with human icon overlay */}
                  {forum.image && (
                    <div className="relative forum-image-wrapper">
                      <img
                        src={forum.image || "/placeholder.svg"}
                        alt="Forum post"
                        className="forum-post-image"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = getPostImage(index)
                        }}
                      />
                      {/* Human icon overlay positioned at bottom of image */}
                      <div className="forum-image-overlay">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Post Actions positioned at bottom */}
                  <div className="forum-post-actions">
                    <div className="flex items-center space-x-6">
                      <button
                        onClick={() => handleLike(forum.id)}
                        className={`flex items-center space-x-2 ${forum.isLiked ? "text-red-500" : ""}`}
                        style={{ color: forum.isLiked ? "#ef4444" : "#5E5E5E" }}
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <span className="text-sm action-count">{forum.likes}</span>
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
                        <span className="text-sm action-count">{forum.comments}</span>
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
                        <span className="text-sm action-count">{forum.shares}</span>
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
        <div className="forum-sidebar">
          {/* Activity Section */}
          <div className="activity-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="activity-title">Activity</h3>
              <button className="activity-see-all">See All</button>
            </div>
            <div className="activity-list-container">
              {mockActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 py-2">
                  <img
                    src={activity.avatar || "/placeholder.svg"}
                    alt={activity.user}
                    className="profile-image-activity"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(activity.user)}&size=60&background=6366f1&color=ffffff&rounded=true`
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="activity-user-name">{activity.user}</span>{" "}
                      <span className="activity-action-text">{activity.action}</span>
                    </p>
                  </div>
                  <img
                    src={activity.thumbnail || "/placeholder.svg"}
                    alt="Post thumbnail"
                    className="post-thumbnail-image"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = getThumbnailImage(activity.id % 2)
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Suggestions Section */}
          <div className="suggestions-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="suggestions-title">Suggestions</h3>
              <button className="suggestions-see-all">See All</button>
            </div>
            <div className="suggestions-list-container">
              {mockSuggestions.map((suggestion) => (
                <div key={suggestion.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <img
                      src={suggestion.avatar || "/placeholder.svg"}
                      alt={suggestion.name}
                      className="profile-image-activity"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(suggestion.name)}&size=60&background=6366f1&color=ffffff&rounded=true`
                      }}
                    />
                    <div>
                      <p className="suggestions-user-name">{suggestion.name}</p>
                      <p className="suggestions-subtitle">{suggestion.subtitle}</p>
                    </div>
                  </div>
                  <button className="suggestions-follow">Follow</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      <div className="forum-container">
        {/* Header with Breadcrumb */}
        {activeSubTab === "main" && (
          <div className="bg-white px-6 py-3">
            <div className="flex items-center space-x-2">
              <FiChevronLeft className="w-4 h-4 text-gray-400" />
              <span className="breadcrumb-text">Setup</span>
              <FiChevronLeft className="w-4 h-4 text-gray-400" />
              <span className="breadcrumb-text">Communication</span>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        {activeSubTab === "main" && (
          <div className="bg-white tab-navigation-border">
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
                      activeTab === tab.id ? "forum-tab active" : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Tab Content */}
        <div className="px-6 py-6">
          {activeTab === "forum" ? (
            renderSubContent()
          ) : (
            <div className="bg-white rounded-md shadow-sm p-6">
              <p className="text-center forum-description">
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
