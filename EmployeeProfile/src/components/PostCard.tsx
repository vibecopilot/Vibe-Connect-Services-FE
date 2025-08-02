"use client"

import type React from "react"
import { useState } from "react"
import { Heart, MessageCircle, Share, MoreHorizontal, ThumbsUp } from "lucide-react"
import type { Post } from "../types/index"
import { useAppContext } from "../context/AppContext"
import { useClickOutside } from "../hooks/useClickOutside"
import ToggleSwitch from "./ToggleSwitch"

interface PostCardProps {
  post: Post
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { likePost, toggleNotificationSetting } = useAppContext()
  const [showMenu, setShowMenu] = useState(false)

  const menuRef = useClickOutside(() => setShowMenu(false))

  const handleLike = () => {
    likePost(post.id)
  }

  const handleToggleNotification = (setting: "includesAll" | "workAnniversaries") => {
    toggleNotificationSetting(post.id, setting)
  }

  // Determine if it's Aryan's post (ID "2")
  const isAryanPost = post.id === "2"
  // Determine if it's Bhakti Raut's post
  const isBhaktiRautPost = post.author.name === "Bhakti Raut"

  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 pl-[32.18px] pr-6 py-6 hover:shadow-md transition-shadow"
      data-testid={`post-${post.id}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={post.author.profileImage || "https://randomuser.me/api/portraits/women/44.jpg"}
            alt={post.author.name}
            className={`rounded-full object-cover ${
              isBhaktiRautPost ? "border-2 border-[#878787]" : "border border-gray-200"
            }`}
            style={
              isBhaktiRautPost
                ? {
                    width: "106.41189575195312px",
                    height: "102.8047103881836px",
                    marginLeft: "18.82px", // 51px (desired left) - 32.18px (card padding)
                  }
                : { width: "48px", height: "48px" } // Default w-12 h-12
            }
            data-testid={`post-author-image-${post.id}`}
          />
          <div className="text-left">
            <h3
              className="font-bold text-[#5E5E5E] mr-40"
              style={{ fontSize: "32.18px" }}
              data-testid={`post-author-name-${post.id}`}
            >
              {post.author.name}
            </h3>
            {/* Conditionally render position based on author name */}
            {post.author.name !== "Aryan" && (
              <p className="text-sm text-[#5E5E5E] m-0 p-0" data-testid={`post-author-position-${post.id}`}>
                {post.author.position}
              </p>
            )}
            <p
              className="text-[#5E5E5E] m-0 p-0"
              style={{ fontSize: "23.34px" }}
              data-testid={`post-timestamp-${post.id}`}
            >
              {post.timestamp}
            </p>
          </div>
        </div>
        {/* Notification Settings or Regular Three Dots Menu (hidden for Aryan's post) */}
        {!isAryanPost && post.hasNotificationSettings && post.notificationSettings ? (
          <div className="flex items-start space-x-6">
            <div
              className="flex flex-col space-y-3 text-sm min-w-[240px] bg-gray-50 p-4 rounded-lg border border-gray-200"
              data-testid={`notification-settings-${post.id}`}
            >
              {/* Name - Professional Header */}
              <div
                className="font-semibold text-[#5E5E5E] text-left border-b border-gray-200 pb-2"
                data-testid={`notification-name-${post.id}`}
              >
                {post.author.name}
              </div>

              {/* Notification Options with Functional Toggles */}
              <div className="flex items-center justify-between py-1">
                <span className="text-[#5E5E5E] text-sm font-medium">Includes all notifications</span>
                <ToggleSwitch
                  isOn={post.notificationSettings.includesAll}
                  onToggle={() => handleToggleNotification("includesAll")}
                  testId={`toggle-includes-all-${post.id}`}
                  ariaLabel="Toggle all notifications"
                />
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-[#5E5E5E] text-sm font-medium">Work anniversaries</span>
                <ToggleSwitch
                  isOn={post.notificationSettings.workAnniversaries}
                  onToggle={() => handleToggleNotification("workAnniversaries")}
                  testId={`toggle-work-anniversaries-${post.id}`}
                  ariaLabel="Toggle work anniversaries notifications"
                />
              </div>
            </div>

            {/* Three Dots Menu - Positioned at Top */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                data-testid={`post-menu-${post.id}`}
                aria-label="Post options"
                aria-expanded={showMenu}
                aria-haspopup="true"
              >
                <MoreHorizontal className="w-5 h-5 text-[#5E5E5E]" />
              </button>

              {showMenu && (
                <div
                  className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-20 min-w-40"
                  role="menu"
                  aria-orientation="vertical"
                >
                  {[
                    { label: "Save post", action: "save" },
                    { label: "Follow", action: "follow" },
                    { label: "Hide post", action: "hide" },
                    { label: "Block", action: "block" },
                    { label: "Report post", action: "report" },
                  ].map((item, _index) => (
                    <button
                      key={item.action}
                      className="block w-full text-left px-4 py-2 text-sm text-[#5E5E5E] hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
                      onClick={() => setShowMenu(false)}
                      role="menuitem"
                      data-testid={`menu-${item.action}-${post.id}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Regular Three Dots Menu for Non-Notification Posts (hidden for Aryan's post) */
          !isAryanPost && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                data-testid={`post-menu-${post.id}`}
                aria-label="Post options"
                aria-expanded={showMenu}
                aria-haspopup="true"
              >
                <MoreHorizontal className="w-5 h-5 text-[#5E5E5E]" />
              </button>

              {showMenu && (
                <div
                  className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-20 min-w-40"
                  role="menu"
                  aria-orientation="vertical"
                >
                  {[
                    { label: "Save post", action: "save" },
                    { label: "Follow", action: "follow" },
                    { label: "Hide post", action: "hide" },
                    { label: "Block", action: "block" },
                    { label: "Report post", action: "report" },
                  ].map((item) => (
                    <button
                      key={item.action}
                      className="block w-full text-left px-4 py-2 text-sm text-[#5E5E5E] hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
                      onClick={() => setShowMenu(false)}
                      role="menuitem"
                      data-testid={`menu-${item.action}-${post.id}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        )}
      </div>

      {post.content && (
        <p
          className="text-[#5E5E5E] mb-4 leading-relaxed text-left" // Added text-left
          style={{ fontSize: "23.34px" }}
          data-testid={`post-content-${post.id}`}
        >
          {post.content}
        </p>
      )}

      {post.certificate && (
        <div className="mb-4 text-left">
          <img
            src={post.certificate || "/placeholder.svg"}
            alt="Certificate"
            className="rounded-lg border border-gray-200 shadow-sm"
            style={{ width: "715px", height: "482px", marginLeft: "29.82px" }} // Applied specific width, height, and left margin
            data-testid={`post-certificate-${post.id}`}
          />
        </div>
      )}

      <div className="flex items-center justify-start pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 transition-colors hover:scale-105 transform ${
              post.isLiked ? "text-red-500" : "text-[#5E5E5E] hover:text-red-500"
            }`}
            data-testid={`like-button-${post.id}`}
            aria-label={`${post.isLiked ? "Unlike" : "Like"} post`}
          >
            <Heart className={`w-5 h-5 ${post.isLiked ? "fill-current" : ""}`} />
            <span className="text-sm font-medium">{post.likes}</span>
          </button>

          <button
            className="flex items-center space-x-2 text-[#5E5E5E] hover:text-blue-500 transition-colors hover:scale-105 transform"
            data-testid={`comment-button-${post.id}`}
            aria-label="Comment on post"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">{post.comments}</span>
          </button>

          <button
            className="flex items-center space-x-2 text-[#5E5E5E] hover:text-green-500 transition-colors hover:scale-105 transform"
            data-testid={`share-button-${post.id}`}
            aria-label="Share post"
          >
            <Share className="w-5 h-5" />
            <span className="text-sm font-medium">{post.shares}</span>
          </button>
        </div>
        {/* Comment input is hidden for Aryan's post */}
        {!isAryanPost && !post.hasNotificationSettings && (
          <div className="flex items-center space-x-2">
            <ThumbsUp className="w-4 h-4 text-[#5E5E5E]" />
            <input
              type="text"
              placeholder="Add a comment..."
              className="px-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              data-testid={`comment-input-${post.id}`}
              aria-label="Add a comment"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default PostCard
