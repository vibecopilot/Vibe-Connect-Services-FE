"use client"

import type React from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

interface HotelRequest {
  id: string
  employeeName: string
  mobileNo: string
  email: string
  department: string
  projectSite: string
  destination: string
  checkInDate: string
  checkOutDate: string
  hotelPreferences: string
  roomType: string
  noOfRooms: string
  managerApproval: string
  status: "All" | "Approved" | "Pending" | "Rejected"
}

const HotelDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  // Mock data - In a real application, you would fetch this from an API
  const mockData: HotelRequest[] = [
    {
      id: "1",
      employeeName: "Sejal",
      mobileNo: "123456789",
      email: "xyz@gmail.com",
      department: "Operations",
      projectSite: "Jade Park",
      destination: "Bangalore Old City",
      checkInDate: "6th June",
      checkOutDate: "10th June",
      hotelPreferences: "-",
      roomType: "Single",
      noOfRooms: "1",
      managerApproval: "No",
      status: "Pending",
    },
  ]

  const request = mockData.find((req) => req.id === id)

  if (!request) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/hotel" className="text-gray-600 hover:text-gray-800">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h2 className="text-2xl font-bold text-gray-800">Request Not Found</h2>
        </div>
        <p className="text-gray-600">The hotel request with ID "{id}" could not be found.</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/hotel" className="text-gray-600 hover:text-gray-800">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-2xl font-bold text-gray-800">Hotel Request Details</h2>
      </div>

      <div className="bg-white rounded-lg shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-medium text-gray-500">Request ID</p>
          <p className="text-lg font-semibold text-gray-900">{request.id}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Employee Name</p>
          <p className="text-lg font-semibold text-gray-900">{request.employeeName}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Mobile No</p>
          <p className="text-lg font-semibold text-gray-900">{request.mobileNo}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Email</p>
          <p className="text-lg font-semibold text-gray-900">{request.email}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Department</p>
          <p className="text-lg font-semibold text-gray-900">{request.department}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Project/Site</p>
          <p className="text-lg font-semibold text-gray-900">{request.projectSite}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Destination</p>
          <p className="text-lg font-semibold text-gray-900">{request.destination}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Check-In Date</p>
          <p className="text-lg font-semibold text-gray-900">{request.checkInDate}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Check-Out Date</p>
          <p className="text-lg font-semibold text-gray-900">{request.checkOutDate}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Hotel Preferences</p>
          <p className="text-lg font-semibold text-gray-900">{request.hotelPreferences}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Room Type</p>
          <p className="text-lg font-semibold text-gray-900">{request.roomType}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">No. Of Rooms</p>
          <p className="text-lg font-semibold text-gray-900">{request.noOfRooms}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Manager Approval</p>
          <p className="text-lg font-semibold text-gray-900">{request.managerApproval}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Status</p>
          <p className="text-lg font-semibold text-gray-900">{request.status}</p>
        </div>
      </div>
    </div>
  )
}

export default HotelDetail
