"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
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

const HotelForm: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditMode = !!id

  const [formData, setFormData] = useState<HotelRequest>({
    id: "",
    employeeName: "",
    mobileNo: "",
    email: "",
    department: "",
    projectSite: "",
    destination: "",
    checkInDate: "",
    checkOutDate: "",
    hotelPreferences: "",
    roomType: "",
    noOfRooms: "",
    managerApproval: "No",
    status: "Pending",
  })

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

  useEffect(() => {
    if (isEditMode) {
      const requestToEdit = mockData.find((req) => req.id === id)
      if (requestToEdit) {
        setFormData(requestToEdit)
      } else {
        // Handle case where ID is not found, e.g., redirect to add or list page
        navigate("/hotel")
      }
    }
  }, [id, isEditMode, navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isEditMode) {
      console.log("Updating hotel request:", formData)
      // In a real app, send PUT/PATCH request to API
    } else {
      console.log("Adding new hotel request:", formData)
      // In a real app, send POST request to API
    }
    navigate("/hotel") // Redirect to list page after submission
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/hotel" className="text-gray-600 hover:text-gray-800">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-2xl font-bold text-gray-800">
          {isEditMode ? "Edit Hotel Request" : "Add New Hotel Request"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Employee Name */}
        <div>
          <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700 mb-1">
            Employee Name
          </label>
          <input
            type="text"
            id="employeeName"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Mobile No */}
        <div>
          <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-700 mb-1">
            Mobile No
          </label>
          <input
            type="text"
            id="mobileNo"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Department */}
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
            Department
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Project/Site */}
        <div>
          <label htmlFor="projectSite" className="block text-sm font-medium text-gray-700 mb-1">
            Project/Site
          </label>
          <input
            type="text"
            id="projectSite"
            name="projectSite"
            value={formData.projectSite}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Destination */}
        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
            Destination
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Check-In Date */}
        <div>
          <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700 mb-1">
            Check-In Date
          </label>
          <input
            type="date"
            id="checkInDate"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Check-Out Date */}
        <div>
          <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700 mb-1">
            Check-Out Date
          </label>
          <input
            type="date"
            id="checkOutDate"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Hotel Preferences */}
        <div>
          <label htmlFor="hotelPreferences" className="block text-sm font-medium text-gray-700 mb-1">
            Hotel Preferences
          </label>
          <textarea
            id="hotelPreferences"
            name="hotelPreferences"
            value={formData.hotelPreferences}
            onChange={handleChange}
            rows={3}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Room Type */}
        <div>
          <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 mb-1">
            Room Type
          </label>
          <select
            id="roomType"
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          >
            <option value="">Select Room Type</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Suite">Suite</option>
          </select>
        </div>

        {/* No. Of Rooms */}
        <div>
          <label htmlFor="noOfRooms" className="block text-sm font-medium text-gray-700 mb-1">
            No. Of Rooms
          </label>
          <input
            type="number"
            id="noOfRooms"
            name="noOfRooms"
            value={formData.noOfRooms}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Manager Approval */}
        <div>
          <label htmlFor="managerApproval" className="block text-sm font-medium text-gray-700 mb-1">
            Manager Approval
          </label>
          <select
            id="managerApproval"
            name="managerApproval"
            value={formData.managerApproval}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        {/* Status (only visible in edit mode for demonstration) */}
        {isEditMode && (
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        )}

        <div className="md:col-span-2 flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={() => navigate("/hotel")}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isEditMode ? "Update Request" : "Add Request"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default HotelForm
