"use client"

import type React from "react"
import { ChevronsLeft, ChevronsRight } from "lucide-react" // Changed from ArrowLeft, User

interface NavigationProps {
  currentView: "profile" | "edit"
  onViewChange: (view: "profile" | "edit") => void
}

const Navigation: React.FC<NavigationProps> = ({ onViewChange }) => {
  return (
    <div className="" data-testid="navigation">
      {" "}
      {/* Removed bg-white shadow-sm */}
      <div className="pl-[32.18px] py-3">
        {" "}
        {/* Adjusted padding to align with profile header */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onViewChange("profile")}
            className={`flex items-center space-x-2 px-0 py-0 rounded-md transition-colors text-gray-600 hover:text-gray-900`} // Removed padding, no active state styling
            style={{ fontSize: "23.34px" }}
            data-testid="setup-nav-button"
          >
            <ChevronsLeft className="w-4 h-4" /> {/* Changed icon */}
            <span>Setup</span>
          </button>

          <button
            onClick={() => onViewChange("edit")}
            className={`flex items-center space-x-2 px-0 py-0 rounded-md transition-colors text-gray-600 hover:text-gray-900`} // Removed padding, no active state styling
            style={{ fontSize: "23.34px" }}
            data-testid="profile-nav-button"
          >
            <ChevronsRight className="w-4 h-4" /> {/* Changed icon */}
            <span>Employee Profile</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navigation
