"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

interface UserDetails {
  id: number
  firstName: string
  lastName: string
  email: string
  mobile: string
  associatedUnits: AssociatedUnitDetails[]
}

interface AssociatedUnitDetails {
  id: string
  unitNumber: string
  building: string
  livesHere: string
  ownership: string
  unitName: string
  approved: string
  floor: string
}

interface ViewUserProps {
  userId: number | null
  onBack: () => void
}

const ViewUser: React.FC<ViewUserProps> = ({ userId, onBack }) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userId) {
      // Simulate API call to fetch user details
      setTimeout(() => {
        const mockUserDetails: UserDetails = {
          id: userId,
          firstName: "Test",
          lastName: "User",
          email: "test@user.com",
          mobile: "2213837432",
          associatedUnits: [
            {
              id: "1",
              unitNumber: "Unit 1",
              building: "A1",
              livesHere: "Yes",
              ownership: "owner",
              unitName: "FM Office",
              approved: "Yes",
              floor: "G",
            },
          ],
        }
        setUserDetails(mockUserDetails)
        setLoading(false)
      }, 500)
    }
  }, [userId])

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading user details...</div>
        </div>
      </div>
    )
  }

  if (!userDetails) {
    return (
      <div className="bg-white min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">User not found</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center text-sm nav-text mb-6 pt-6">
        <button onClick={onBack} className="flex items-center hover:text-gray-800">
          <FiChevronLeft className="mr-1" />
          Setup
        </button>
        <FiChevronRight className="mx-2" />
        <button onClick={onBack} className="hover:text-gray-800">
          Manage User
        </button>
        <FiChevronRight className="mx-2" />
        <span className="text-gray-800 font-medium">View</span>
      </div>

      <div className="max-w-full">
        {/* User Details Section */}
        <div className="mb-8">
          <h2 className="section-heading mb-4">User Details</h2>
          <div className="section-border mb-6" style={{ width: "calc(100% - 87px)" }}></div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 section-content">
            <div>
              <span className="detail-text">First Name : </span>
              <span className="detail-text font-medium">{userDetails.firstName}</span>
            </div>

            <div>
              <span className="detail-text">Last Name : </span>
              <span className="detail-text font-medium">{userDetails.lastName}</span>
            </div>

            <div>
              <span className="detail-text">Email : </span>
              <span className="detail-text font-medium">{userDetails.email}</span>
            </div>

            <div>
              <span className="detail-text">Mobile : </span>
              <span className="detail-text font-medium">{userDetails.mobile}</span>
            </div>
          </div>
        </div>

        {/* Associated Units Section */}
        <div>
          <h2 className="section-heading mb-4">Associated Units</h2>
          <div className="section-border mb-6" style={{ width: "calc(100% - 87px)" }}></div>

          {userDetails.associatedUnits.map((unit, _index) => (
            <div key={unit.id} className="mb-6">
              <h3 className="section-content detail-text mb-4">{unit.unitNumber}</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 section-content">
                <div>
                  <span className="detail-text">Building : </span>
                  <span className="detail-text font-medium">{unit.building}</span>
                </div>

                <div>
                  <span className="detail-text">Lives Here : </span>
                  <span className="detail-text font-medium">{unit.livesHere}</span>
                </div>

                <div>
                  <span className="detail-text">Ownership : </span>
                  <span className="detail-text font-medium">{unit.ownership}</span>
                </div>

                <div>
                  <span className="detail-text">Unit Name : </span>
                  <span className="detail-text font-medium">{unit.unitName}</span>
                </div>

                <div>
                  <span className="detail-text">Approved : </span>
                  <span className="detail-text font-medium">{unit.approved}</span>
                </div>

                <div>
                  <span className="detail-text">Lives Here : </span>
                  <span className="detail-text font-medium">{unit.livesHere}</span>
                </div>

                <div>
                  <span className="detail-text">Ownership : </span>
                  <span className="detail-text font-medium">{unit.ownership}</span>
                </div>

                <div>
                  <span className="detail-text">Floor : </span>
                  <span className="detail-text font-medium">{unit.floor}</span>
                </div>

                <div>
                  <span className="detail-text">Approved : </span>
                  <span className="detail-text font-medium">{unit.approved}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ViewUser
