"use client"

import type React from "react"
import { useState } from "react"
import { FiChevronLeft } from "react-icons/fi"
import ManageBuilding from "../Tabs/ManageBuilding"
import ManageFloor from "../Tabs/ManageFloor"
import ManageUnitTab from "../Tabs/ManageUnitTab"

const ManageUnit: React.FC = () => {
  const [activeTab, setActiveTab] = useState("building")

  const renderContent = () => {
    switch (activeTab) {
      case "building":
        return <ManageBuilding />
      case "floor":
        return <ManageFloor />
      case "unit":
        return <ManageUnitTab />
      default:
        return <ManageBuilding />
    }
  }

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="main-content">
        {/* Header with Breadcrumb */}
        <div className="bg-white px-6 py-3 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <FiChevronLeft className="w-4 h-4 text-gray-400" />
            <span className="breadcrumb-text">Setup</span>
            <FiChevronLeft className="w-4 h-4 text-gray-400" />
            <span className="breadcrumb-text font-medium">Manage Unit</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white">
          <div className="px-6">
            <nav className="flex space-x-8">
              {[
                { id: "building", label: "Building" },
                { id: "floor", label: "Floor" },
                { id: "unit", label: "Unit" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
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

        {/* Tab Content */}
        <div className="px-6 py-6 bg-white">{renderContent()}</div>
      </div>
    </div>
  )
}

export default ManageUnit
