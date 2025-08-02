"use client"

import type React from "react"
import { Edit } from "lucide-react"
import { useAppContext } from "../context/AppContext"

interface ProfileHeaderProps {
  onEditClick: () => void
  activeToggle: "grow" | "catchup"
  onToggleChange: (toggle: "grow" | "catchup") => void
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ onEditClick, activeToggle, onToggleChange }) => {
  const { currentEmployee } = useAppContext()

  return (
    <>
      <div
        className="bg-white overflow-hidden"
        style={{ borderRadius: "8.94px", border: "0.89px solid #878787" }}
        data-testid="profile-header"
      >
        {/* Banner - Background only */}
        <div className="relative" style={{ height: "418px" }}>
          <div
            className="absolute inset-0 bg-cover bg-center border-b border-gray-200"
            style={{ backgroundImage: "url(/images/banner.png)" }}
          />
        </div>

        {/* Profile Info */}
        <div className="pb-6">
          {/* Profile Image and Edit Button Row */}
          <div className="flex items-start justify-between -mt-16 mb-4 relative z-10 pl-[32.18px]">
            <img
              src={currentEmployee.profileImage || "https://randomuser.me/api/portraits/men/32.jpg"}
              alt={currentEmployee.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover ring-2 ring-gray-200"
              data-testid="profile-image"
            />
            <button
              onClick={onEditClick}
              className="mt-20 p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:scale-105 transform"
              data-testid="edit-profile-button"
              aria-label="Edit Profile"
            >
              <Edit className="w-4 h-4 text-[#5E5E5E]" />
            </button>
          </div>

          <div className="flex justify-between items-start mb-6 pl-[32.18px]">
            <div className="flex items-center space-x-8">
              <h1
                className="text-[#5E5E5E]"
                style={{ fontSize: "32.18px", fontWeight: "normal" }}
                data-testid="profile-name"
              >
                {currentEmployee.name}
              </h1>
              <p className="text-[#5E5E5E]" style={{ fontSize: "35.76px" }} data-testid="profile-email">
                {currentEmployee.email}
              </p>
            </div>
          </div>

          <div className="mb-6 pl-[32.18px]">
            <h2 className="text-[#5E5E5E] mr-262.5 mb-3" style={{ fontSize: "32.18px", fontWeight: "normal" }}>
              Profile Information
            </h2>
            <div className="flex flex-col space-y-1.5">
              <div className="flex justify-between items-center" data-testid="profile-department">
                <span className="text-[#5E5E5E]" style={{ fontSize: "23.34px" }}>
                  Department:
                </span>
                <span className="text-[#5E5E5E] mr-230 " style={{ fontSize: "23.34px", fontWeight: "normal" }}>
                  {currentEmployee.department}
                </span>
              </div>
              <div className="flex justify-between items-center" data-testid="profile-position">
                <span className="text-[#5E5E5E]" style={{ fontSize: "23.34px" }}>
                  Position:
                </span>
                <span className="text-[#5E5E5E] mr-217 " style={{ fontSize: "23.34px", fontWeight: "normal" }}>
                  {currentEmployee.position}
                </span>
              </div>
              <div className="flex justify-between items-center" data-testid="profile-manager">
                <span className="text-[#5E5E5E]" style={{ fontSize: "23.34px" }}>
                  Manager:
                </span>
                <span className="text-[#5E5E5E] mr-239.5" style={{ fontSize: "23.34px", fontWeight: "normal" }}>
                  {currentEmployee.manager}
                </span>
              </div>
              <div className="flex justify-between items-center" data-testid="profile-connections">
                <span className="text-[#5E5E5E]" style={{ fontSize: "23.34px" }}>
                  Connections:
                </span>
                <span className="text-[#5E5E5E] mr-247" style={{ fontSize: "23.34px", fontWeight: "normal" }}>
                  {currentEmployee.connections}
                </span>
              </div>
            </div>
          </div>

          {/* About Me Section */}
          <div className="mb-6" style={{ paddingLeft: "32.18px" }}>
            <h2 className="text-[#5E5E5E] mr-290.5 mb-3" style={{ fontSize: "32.18px", fontWeight: "normal" }}>
              About Me:
            </h2>
            <div
              style={{
                width: "1222.05px",
                height: "auto",
                fontSize: "21.46px",
                color: "#5E5E5E",
                textAlign: "left",
                lineHeight: "1.6",
                whiteSpace: "pre-wrap",
              }}
              data-testid="profile-bio"
            >
              {currentEmployee.bio}
            </div>
          </div>
        </div>
      </div>
      {/* Grow / Catch Up Toggle Section */}
      <div className="bg-white mt-4 overflow-hidden" style={{ borderRadius: "8.94px", border: "0.89px solid #878787" }}>
        <div className="pl-[32.18px] pr-6 py-4 flex items-center justify-start">
          <div className="flex space-x-4">
            <button
              className={`px-6 py-2 rounded-lg text-lg font-normal transition-all focus:outline-none ${
                activeToggle === "grow" ? "bg-[#8599bb] text-white" : "bg-transparent text-[#5E5E5E]"
              }`}
              style={
                activeToggle === "grow"
                  ? { boxShadow: "none", border: "none", background: "#8599bb" }
                  : { boxShadow: "none", border: "none", background: "none" }
              }
              data-testid="grow-button"
              onClick={() => onToggleChange("grow")}
            >
              Grow
            </button>
            <button
              className={`px-6 py-2 rounded-lg text-lg font-normal transition-all focus:outline-none ${
                activeToggle === "catchup" ? "bg-[#8599bb] text-white" : "bg-transparent text-[#5E5E5E]"
              }`}
              style={
                activeToggle === "catchup"
                  ? { boxShadow: "none", border: "none", background: "#8599bb" }
                  : { boxShadow: "none", border: "none", background: "none" }
              }
              data-testid="catch-up-button"
              onClick={() => onToggleChange("catchup")}
            >
              Catch Up
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileHeader
