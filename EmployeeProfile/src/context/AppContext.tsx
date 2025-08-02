"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"
import type { AppContextType, Employee, Post, Invitation, Recommendation } from "../types"

const AppContext = createContext<AppContextType | undefined>(undefined)

const initialEmployee: Employee = {
  id: "1",
  name: "Kunal Sah",
  email: "kunalsah@gmail.com",
  contactNumber: "+1234567890",
  department: "Marketing",
  team: "Digital Marketing",
  jobTitle: "SEO Specialist",
  position: "SEO Specialist",
  manager: "Aniket",
  supervisor: "Sarah Johnson",
  bio: "I am Passionate about building meaningful digital experiences, I thrive at the intersection of creativity and functionality. With a keen eye for detail and a drive for innovation, I enjoy turning complex problems into elegant solutions.",
  profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
  connections: 120,
  followers: 85,
}

const initialPosts: Post[] = [
  {
    id: "1",
    authorId: "2",
    author: {
      name: "Bhakti Raut",
      profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
      position: "Completed 1 year at Gold Media",
      company: "Gold Media",
    },
    content: "",
    timestamp: "2h ago",
    likes: 12,
    comments: 3,
    shares: 1,
    isLiked: false,
    hasNotificationSettings: true,
    notificationSettings: {
      includesAll: true,
      workAnniversaries: true,
    },
  },
  {
    id: "2",
    authorId: "3",
    author: {
      name: "Aryan",
      profileImage: "https://randomuser.me/api/portraits/men/75.jpg",
      position: "Software Engineer",
      company: "Tech Corp",
    },
    content: "I am thrilled to share that i have completed a course in Advanced SEO with the president's honor call.",
    timestamp: "20th June 10:30 Pm",
    likes: 24,
    comments: 8,
    shares: 5,
    isLiked: true,
    certificate: "/images/certificate.png",
  },
]

const initialInvitations: Invitation[] = [
  {
    id: "1",
    name: "Rahul",
    position: "Tech Head",
    mutualConnections: 3,
    profileImage: "https://randomuser.me/api/portraits/men/85.jpg",
  },
  {
    id: "2",
    name: "Mohit",
    position: "UI/UX Designer",
    mutualConnections: 3,
    profileImage: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    id: "3",
    name: "Rishi",
    position: "QA Tester",
    mutualConnections: 3,
    profileImage: "https://randomuser.me/api/portraits/men/68.jpg",
  },
]

const initialRecommendations: Recommendation[] = [
  {
    id: "1",
    name: "Aryan",
    position: "Digital Marketing Associate",
    mutualConnections: 20,
    followers: 120,
    profileImage: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: "2",
    name: "Rishabh",
    position: "Brand Communications Executive",
    mutualConnections: 15,
    followers: 110,
    profileImage: "https://randomuser.me/api/portraits/men/91.jpg",
  },
  {
    id: "3",
    name: "Rohan",
    position: "Public Relations Associate",
    mutualConnections: 17,
    followers: 10,
    profileImage: "https://randomuser.me/api/portraits/men/22.jpg",
  },
]

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentEmployee, setCurrentEmployee] = useState<Employee>(initialEmployee)
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [invitations, setInvitations] = useState<Invitation[]>(initialInvitations)
  const [recommendations] = useState<Recommendation[]>(initialRecommendations)

  const updateEmployee = (updates: Partial<Employee>) => {
    setCurrentEmployee((prev) => ({ ...prev, ...updates }))
  }

  const likePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  const acceptInvitation = (invitationId: string) => {
    setInvitations((prev) => prev.filter((inv) => inv.id !== invitationId))
    setCurrentEmployee((prev) => ({ ...prev, connections: prev.connections + 1 }))
  }

  const ignoreInvitation = (invitationId: string) => {
    setInvitations((prev) => prev.filter((inv) => inv.id !== invitationId))
  }

  const toggleNotificationSetting = (postId: string, setting: "includesAll" | "workAnniversaries") => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId && post.notificationSettings
          ? {
              ...post,
              notificationSettings: {
                ...post.notificationSettings,
                [setting]: !post.notificationSettings[setting],
              },
            }
          : post,
      ),
    )
  }

  const value: AppContextType = {
    currentEmployee,
    posts,
    invitations,
    recommendations,
    updateEmployee,
    likePost,
    acceptInvitation,
    ignoreInvitation,
    toggleNotificationSetting,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}
