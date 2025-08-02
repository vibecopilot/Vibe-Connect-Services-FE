"use client"

import type React from "react"
import { useState } from "react"
import { AppProvider } from "./context/AppContext"
import Navigation from "./components/Navigation"
import ProfileHeader from "./components/ProfileHeader"
import Feed from "./components/Feed"
import EditProfile from "./components/EditProfile"

type ViewType = "profile" | "edit"

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>("profile")
  const [activeToggle, setActiveToggle] = useState<"grow" | "catchup">("grow")

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view)
  }

  const handleSaveProfile = () => {
    setCurrentView("profile")
  }

  return (
    <AppProvider>
      <div className="min-h-screen bg-white" data-testid="app-container">
        <Navigation currentView={currentView} onViewChange={handleViewChange} />

        {currentView === "edit" ? (
          <EditProfile onSave={handleSaveProfile} />
        ) : (
          <div
            className="px-4 py-6"
            style={{
              width: "1377.6051025390625px",
              marginTop: "7.15px",
              marginLeft: "21.46px",
            }}
          >
            <div className="space-y-6">
              <ProfileHeader
                onEditClick={() => setCurrentView("edit")}
                activeToggle={activeToggle}
                onToggleChange={setActiveToggle}
              />
              <Feed
                showInvitations={activeToggle === "grow"}
                showBhaktiRaut={activeToggle === "catchup"}
                showRecommendations={activeToggle === "grow"} // New prop for recommendations
              />
            </div>
          </div>
        )}
      </div>
    </AppProvider>
  )
}

export default App
