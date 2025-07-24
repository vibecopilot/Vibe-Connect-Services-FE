"use client"

import type React from "react"
import { useParams } from "react-router-dom"

const FlightTrainDetail: React.FC = () => {
  const { id } = useParams()

  // Mock data - in real app, fetch based on id
  const requestDetails = {
    employeeName: "Aniket Parkar",
    employeeMobile: "234567890",
    email: "123@work",
    department: "Operations",
    projectSite: "Jade Park, Bangalore",
    purposeOfTravel: "Demo",
    typeOfTravel: "Train",
    departureDate: "2nd June",
    returnDate: "3rd June",
    departureCity: "Mumbai",
    arrivalCity: "Bangalore",
    preferredTrainClass: "3rd AC",
    seatPreference: "lower Berth",
    managerApproval: "(If Required)",
    specialRequests: "early morning",
    govtId: "Aadhar Uploaded",
  }

  return (
    <div className="px-[15px] py-6">
      {/* The header and navigation tabs are now handled by Layout.tsx */}

      {/* Band for "Flight/Train Request Details" */}
      <div className="bg-[#D9D9D9] px-4 py-2 mb-6 rounded-md h-12 flex items-center">
        <h2 className="text-xl font-normal text-black">Flight/Train Request Details</h2>
      </div>

      {/* Detail Content */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div>
              <span className="text-sm font-medium text-gray-600">Employee Name: </span>
              <span className="text-sm text-gray-900">{requestDetails.employeeName}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Department: </span>
              <span className="text-sm text-gray-900">{requestDetails.department}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Type Of Travel: </span>
              <span className="text-sm text-gray-900">{requestDetails.typeOfTravel}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Departure City: </span>
              <span className="text-sm text-gray-900">{requestDetails.departureCity}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Seat Preference: </span>
              <span className="text-sm text-gray-900">{requestDetails.seatPreference}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Govt ID: </span>
              <span className="text-sm text-gray-900">{requestDetails.govtId}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-sm font-medium text-gray-600">Employee Mobile No: </span>
              <span className="text-sm text-gray-900">{requestDetails.employeeMobile}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Project/Site: </span>
              <span className="text-sm text-gray-900">{requestDetails.projectSite}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Departure Date: </span>
              <span className="text-sm text-gray-900">{requestDetails.departureDate}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Arrival City: </span>
              <span className="text-sm text-gray-900">{requestDetails.arrivalCity}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Manager Approval </span>
              <span className="text-sm text-gray-900">{requestDetails.managerApproval}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-sm font-medium text-gray-600">Email: </span>
              <span className="text-sm text-gray-900">{requestDetails.email}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Purpose Of Travel: </span>
              <span className="text-sm text-gray-900">{requestDetails.purposeOfTravel}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Return Date: </span>
              <span className="text-sm text-gray-900">{requestDetails.returnDate}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Preferred Train Class: </span>
              <span className="text-sm text-gray-900">{requestDetails.preferredTrainClass}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Special Requests: </span>
              <span className="text-sm text-gray-900">{requestDetails.specialRequests}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlightTrainDetail
