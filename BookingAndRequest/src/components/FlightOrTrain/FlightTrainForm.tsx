"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

interface BookingRequest {
  id: string
  employeeName: string
  mobileNo: string
  email: string
  department: string
  purposeOfTravel: string
  departureDate: string
  returnDate: string
  departureCity: string
  arrivalCity: string
  preferredAirlines: string
  classOfTravel: string
  managerApproval: string
  status: "All" | "Approved" | "Pending" | "Rejected"
}

const FlightTrainForm: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditMode = !!id

  const [formData, setFormData] = useState<BookingRequest>({
    id: "",
    employeeName: "",
    mobileNo: "",
    email: "",
    department: "",
    purposeOfTravel: "",
    departureDate: "",
    returnDate: "",
    departureCity: "",
    arrivalCity: "",
    preferredAirlines: "",
    classOfTravel: "",
    managerApproval: "No",
    status: "Pending",
  })

  // Mock data - In a real application, you would fetch this from an API
  const mockData: BookingRequest[] = [
    {
      id: "1",
      employeeName: "Sejal",
      mobileNo: "123456789",
      email: "X",
      department: "Operations",
      purposeOfTravel: "Site Visit",
      departureDate: "6th June 2025",
      returnDate: "10th June",
      departureCity: "Mumbai",
      arrivalCity: "Bangalore",
      preferredAirlines: "N/A",
      classOfTravel: "Economy",
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
        navigate("/flight-train")
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
      console.log("Updating request:", formData)
      // In a real app, send PUT/PATCH request to API
    } else {
      console.log("Adding new request:", formData)
      // In a real app, send POST request to API
    }
    navigate("/flight-train") // Redirect to list page after submission
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/flight-train" className="text-gray-600 hover:text-gray-800">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-2xl font-bold text-gray-800">
          {isEditMode ? "Edit Flight/Train Request" : "Add New Flight/Train Request"}
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

        {/* Purpose of Travel */}
        <div>
          <label htmlFor="purposeOfTravel" className="block text-sm font-medium text-gray-700 mb-1">
            Purpose of Travel
          </label>
          <textarea
            id="purposeOfTravel"
            name="purposeOfTravel"
            value={formData.purposeOfTravel}
            onChange={handleChange}
            rows={3}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Departure Date */}
        <div>
          <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 mb-1">
            Departure Date
          </label>
          <input
            type="date"
            id="departureDate"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Return Date */}
        <div>
          <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-1">
            Return Date
          </label>
          <input
            type="date"
            id="returnDate"
            name="returnDate"
            value={formData.returnDate}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Departure City */}
        <div>
          <label htmlFor="departureCity" className="block text-sm font-medium text-gray-700 mb-1">
            Departure City
          </label>
          <input
            type="text"
            id="departureCity"
            name="departureCity"
            value={formData.departureCity}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Arrival City */}
        <div>
          <label htmlFor="arrivalCity" className="block text-sm font-medium text-gray-700 mb-1">
            Arrival City
          </label>
          <input
            type="text"
            id="arrivalCity"
            name="arrivalCity"
            value={formData.arrivalCity}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Preferred Airlines */}
        <div>
          <label htmlFor="preferredAirlines" className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Airlines
          </label>
          <input
            type="text"
            id="preferredAirlines"
            name="preferredAirlines"
            value={formData.preferredAirlines}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Class of Travel */}
        <div>
          <label htmlFor="classOfTravel" className="block text-sm font-medium text-gray-700 mb-1">
            Class Of Travel
          </label>
          <select
            id="classOfTravel"
            name="classOfTravel"
            value={formData.classOfTravel}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          >
            <option value="">Select Class</option>
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
            <option value="First Class">First Class</option>
          </select>
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
            onClick={() => navigate("/flight-train")}
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

export default FlightTrainForm
