"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import User from "../tabs/User"
import AddUser from "../tabs/AddUser"
import ViewUser from "../tabs/ViewUser"

export interface UserData {
  id: number
  firstName: string
  lastName: string
  email: string
  mobileNumber: string
  password?: string
  appDownload: string
  unit: string
  type: string
}

const ManageUser: React.FC = () => {
  useParams<{ tab: string }>()
  const [activeTab, setActiveTab] = useState<string>("user")
  const [, setUsers] = useState<UserData[]>([])
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [editingUser, setEditingUser] = useState<UserData | null>(null)

  useEffect(() => {
    // Initialize with sample data
    const sampleUsers: UserData[] = [
      {
        id: 1,
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        mobileNumber: "9736453728",
        appDownload: "NO",
        unit: "FM Office",
        type: "Unit_Resident",
      },
      {
        id: 2,
        firstName: "Test1",
        lastName: "User1",
        email: "test1@example.com",
        mobileNumber: "8243745698",
        appDownload: "NO",
        unit: "NA",
        type: "Tenant",
      },
      {
        id: 3,
        firstName: "Test2",
        lastName: "User2",
        email: "test2@example.com",
        mobileNumber: "8787654563",
        appDownload: "YES",
        unit: "3212",
        type: "Unit_Resident",
      },
    ]
    setUsers(sampleUsers)
  }, [])

  const handleAddUser = () => {
    setEditingUser(null)
    setActiveTab("add")
  }

  const handleEditUser = (user: UserData) => {
    setEditingUser(user)
    setActiveTab("add")
  }

  const handleViewUser = (userId: number) => {
    setSelectedUserId(userId)
    setActiveTab("view")
  }

  const handleSaveUser = () => {
    setActiveTab("user")
  }

  const handleBackToUsers = () => {
    setActiveTab("user")
    setEditingUser(null)
    setSelectedUserId(null)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "user":
        return <User onAddUser={handleAddUser} onEditUser={handleEditUser} onViewUser={handleViewUser} />
      case "add":
        return <AddUser editingUser={editingUser} onBack={handleBackToUsers} onSave={handleSaveUser} />
      case "view":
        return <ViewUser userId={selectedUserId} onBack={handleBackToUsers} />
      default:
        return <User onAddUser={handleAddUser} onEditUser={handleEditUser} onViewUser={handleViewUser} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="main-content min-h-screen py-6">{renderTabContent()}</div>
    </div>
  )
}

export default ManageUser
