"use client"

import type React from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

interface TransportationRequest {
  id: string
  employeeName: string
  mobileNo: string
  email: string
  department: string
  projectSite: string
  purpose: string
  pickupLocation: string
  dropOffLocation: string
  date: string
  time: string
  noOfPassengers: string
  transportationType: string
  specialRequirement: string
  managerApproval: string
  bookingStatus: string
  approval: string
  status: "All" | "Approved" | "Pending" | "Rejected"
}

const CabBusDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  // Mock data - In a real application, you would fetch this from an API
  const mockData: TransportationRequest[] = [
    {
      id: "1",
      employeeName: "Sejal",
      mobileNo: "12345678",
      email: "xyz@gmail.com",
      department: "Operations",
      projectSite: "Jade Park",
      purpose: "Site Visit",
      pickupLocation: "xyz",
      dropOffLocation: "abc",
      date: "6th June-10th June",
      time: "10:00 Am",
      noOfPassengers: "1",
      transportationType: "Cab",
      specialRequirement: "-",
      managerApproval: "No",
      bookingStatus: "Booked",
      approval: "Pending",
      status: "Pending",
    },
  ]

  const request = mockData.find((req) => req.id === id)

  if (!request) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/transportation/cab-bus" className="text-gray-600 hover:text-gray-800">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h2 className="text-2xl font-bold text-gray-800">Request Not Found</h2>
        </div>
        <p className="text-gray-600">The cab/bus request with ID "{id}" could not be found.</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/transportation/cab-bus" className="text-gray-600 hover:text-gray-800">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-2xl font-bold text-gray-800">Cab/Bus Request Details</h2>
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
          <p className="text-sm font-medium text-gray-500">Purpose</p>
          <p className="text-lg font-semibold text-gray-900">{request.purpose}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Pickup Location</p>
          <p className="text-lg font-semibold text-gray-900">{request.pickupLocation}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Drop-off Location</p>
          <p className="text-lg font-semibold text-gray-900">{request.dropOffLocation}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Date</p>
          <p className="text-lg font-semibold text-gray-900">{request.date}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Time</p>
          <p className="text-lg font-semibold text-gray-900">{request.time}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">No. Of Passengers</p>
          <p className="text-lg font-semibold text-gray-900">{request.noOfPassengers}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Transportation Type</p>
          <p className="text-lg font-semibold text-gray-900">{request.transportationType}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Special Requirement</p>
          <p className="text-lg font-semibold text-gray-900">{request.specialRequirement}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Manager Approval</p>
          <p className="text-lg font-semibold text-gray-900">{request.managerApproval}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Booking Status</p>
          <p className="text-lg font-semibold text-gray-900">{request.bookingStatus}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Approval</p>
          <p className="text-lg font-semibold text-gray-900">{request.approval}</p>
        </div>
      </div>
    </div>
  )
}

export default CabBusDetail
