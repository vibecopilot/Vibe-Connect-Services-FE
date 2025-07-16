"use client"

import React from "react"
import { useAppContext } from "../context/AppContext"

type Invitation = {
  id: string
  name: string
  position: string
  profileImage?: string
  mutualConnections: number
}

const InvitationsCard: React.FC = () => {
  const { invitations, acceptInvitation, ignoreInvitation } = useAppContext() as {
    invitations: Invitation[]
    acceptInvitation: (id: string) => void
    ignoreInvitation: (id: string) => void
  }

  if (invitations.length === 0) return null

  return (
    <div className="bg-white rounded-[8.94px] border border-[#878787] overflow-hidden" data-testid="invitations-card">
      {/* Header */}
      <div className="flex justify-between items-center px-8 py-6">
        <h2 className="font-bold text-[#5E5E5E]" style={{ fontSize: "32.18px" }}>
          Invitations
        </h2>
        <button
          className="text-[#5E5E5E] hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 rounded px-2 py-1"
          style={{
            fontFamily: "PT Sans",
            fontWeight: 700,
            fontSize: "32.18px",
            lineHeight: "100%",
          }}
          data-testid="see-all-invitations"
        >
          See All
        </button>
      </div>
      {/* Invitations List */}
      {invitations.map((invitation, index) => (
        <React.Fragment key={invitation.id}>
          <div className="px-8 py-4" data-testid={`invitation-${invitation.id}`}>
            <div className="flex items-center justify-between">
              {/* Profile Info */}
              <div className="flex items-center space-x-6">
                <img
                  src={invitation.profileImage || "https://randomuser.me/api/portraits/men/85.jpg"}
                  alt={invitation.name}
                  className="rounded-full object-cover"
                  style={{ width: "146.61px", height: "141.25px" }}
                  data-testid={`invitation-image-${invitation.id}`}
                />
                <div className="flex flex-col justify-start text-left">
                  <h3
                    className="font-bold text-[#5E5E5E]"
                    style={{ fontSize: "32.18px" }}
                    data-testid={`invitation-name-${invitation.id}`}
                  >
                    {invitation.name}
                  </h3>
                  <p
                    className="text-[#5E5E5E]"
                    style={{ fontSize: "23.34px" }}
                    data-testid={`invitation-position-${invitation.id}`}
                  >
                    {invitation.position}
                  </p>
                  <p
                    className="text-[#5E5E5E]"
                    style={{ fontSize: "23.34px" }}
                    data-testid={`invitation-connections-${invitation.id}`}
                  >
                    {invitation.mutualConnections} Mutual Connections
                  </p>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => ignoreInvitation(invitation.id)}
                  className="px-3 py-1.5 rounded-md bg-white focus:outline-none"
                  style={{
                    fontSize: "21.46px",
                    color: "#5E5E5E",
                    border: "none",
                  }}
                  data-testid={`ignore-invitation-${invitation.id}`}
                >
                  Ignore
                </button>
                <button
                  onClick={() => acceptInvitation(invitation.id)}
                  className="px-3 py-1.5 border rounded-md bg-white focus:outline-none"
                  style={{
                    borderColor: "#878787",
                    color: "#19376D",
                  }}
                  data-testid={`accept-invitation-${invitation.id}`}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
          {/* 👇 Full-width border between profiles */}
          {/* This border's width is implicitly managed by the horizontal padding (px-8) of the parent InvitationsCard component. */}
          {/* To adjust its length, modify the 'px-8' class on the main InvitationsCard div. */}
          {index < invitations.length - 1 && <div className="border-t border-[#878787] w-full" />}
        </React.Fragment>
      ))}
    </div>
  )
}

export default InvitationsCard
