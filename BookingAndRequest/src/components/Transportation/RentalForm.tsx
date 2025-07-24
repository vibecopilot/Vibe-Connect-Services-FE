"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
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

const RentalForm: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditMode = !!id

  const [formData, setFormData] = useState<TransportationRequest>({
    id: "",
    employeeName: "",
    mobileNo: "",
    email: "",
    department: "",
    projectSite: "",
    purpose: "",
    pickupLocation: "",
    dropOffLocation: "",
    date: "",
    time: "",
    noOfPassengers: "",
    transportationType: "Rental Car", // Default for Rental form
    specialRequirement: "",
    managerApproval: "No",
    bookingStatus: "Pending",
    approval: "Pending",
    status: "Pending",
  })

  // Mock data - In a real application, you would fetch this from an API
  const mockData: TransportationRequest[] = [] // No mock data for rentals yet

  useEffect(() => {
    if (isEditMode) {
      const requestToEdit = mockData.find((req) => req.id === id)
      if (requestToEdit) {
        setFormData(requestToEdit)
      } else {
        navigate("/transportation/rentals")
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
      console.log("Updating rental request:", formData)
      // In a real app, send PUT/PATCH request to API
    } else {
      console.log("Adding new rental request:", formData)
      // In a real app, send POST request to API
    }
    navigate("/transportation/rentals") // Redirect to list page after submission
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/transportation/rentals" className="text-gray-600 hover:text-gray-800">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-2xl font-bold text-gray-800">
          {isEditMode ? "Edit Rental Request" : "Add New Rental Request"}
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

        {/* Purpose */}
        <div>
          <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">
            Purpose
          </label>
          <textarea
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            rows={3}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Pickup Location */}
        <div>
          <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-1">
            Pickup Location
          </label>
          <input
            type="text"
            id="pickupLocation"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Drop-off Location */}
        <div>
          <label htmlFor="dropOffLocation" className="block text-sm font-medium text-gray-700 mb-1">
            Drop-off Location
          </label>
          <input
            type="text"
            id="dropOffLocation"
            name="dropOffLocation"
            value={formData.dropOffLocation}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Time */}
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* No. Of Passengers */}
        <div>
          <label htmlFor="noOfPassengers" className="block text-sm font-medium text-gray-700 mb-1">
            No. Of Passengers
          </label>
          <input
            type="number"
            id="noOfPassengers"
            name="noOfPassengers"
            value={formData.noOfPassengers}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Transportation Type */}
        <div>
          <label htmlFor="transportationType" className="block text-sm font-medium text-gray-700 mb-1">
            Transportation Type
          </label>
          <select
            id="transportationType"
            name="transportationType"
            value={formData.transportationType}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          >
            <option value="Rental Car">Rental Car</option>
            <option value="Bike Rental">Bike Rental</option>
          </select>
        </div>

        {/* Special Requirement */}
        <div>
          <label htmlFor="specialRequirement" className="block text-sm font-medium text-gray-700 mb-1">
            Special Requirement
          </label>
          <textarea
            id="specialRequirement"
            name="specialRequirement"
            value={formData.specialRequirement}
            onChange={handleChange}
            rows={3}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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

        {/* Booking Status (only visible in edit mode for demonstration) */}
        {isEditMode && (
          <div>
            <label htmlFor="bookingStatus" className="block text-sm font-medium text-gray-700 mb-1">
              Booking Status
            </label>
            <select
              id="bookingStatus"
              name="bookingStatus"
              value={formData.bookingStatus}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="Pending">Pending</option>
              <option value="Booked">Booked</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        )}

        {/* Approval (only visible in edit mode for demonstration) */}
        {isEditMode && (
          <div>
            <label htmlFor="approval" className="block text-sm font-medium text-gray-700 mb-1">
              Approval
            </label>
            <select
              id="approval"
              name="approval"
              value={formData.approval}
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
            onClick={() => navigate("/transportation/rentals")}
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

export default RentalForm
