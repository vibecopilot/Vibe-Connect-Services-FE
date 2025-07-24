"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Eye, Edit, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react"

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

const FlightTrainList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"All" | "Approved" | "Pending" | "Rejected">("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const itemsPerPage = 10

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

  const filteredData = mockData.filter((item) => {
    const matchesSearch =
      searchTerm.trim() === "" ||
      item.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.purposeOfTravel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mobileNo.includes(searchTerm)
    const matchesStatus = statusFilter === "All" || item.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      console.log("Delete request with id:", id)
    }
  }

  return (
    <div className="p-6 ml-[87px]">
      {/* Main content shifted 87px to the right as per layout */}
      <div className="flex items-center justify-between">
        <div className="mb-6 flex items-center gap-4">
          <div className="relative transition-all duration-300">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5E5E5E] w-4 h-4 cursor-pointer z-10"
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            />
            <input
              type="text"
              placeholder={isSearchExpanded ? "Search by name or email..." : ""}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchExpanded(true)}
              onBlur={(e) => {
                if (!e.target.value.trim()) setIsSearchExpanded(false)
              }}
              className={`pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent h-10 transition-all duration-300 ${
                isSearchExpanded ? "w-64 opacity-100" : "w-10 opacity-0 cursor-pointer"
              }`}
            />
          </div>
          <Link
            to="/flight-train/add"
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
          >
            Add
          </Link>
        </div>

        <div className="mb-6 flex items-center gap-6 bg-white border border-gray-300 rounded-md px-4 py-2">
          {["All", "Approved", "Pending", "Rejected"].map((status) => (
            <label key={status} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="statusFilter"
                value={status}
                checked={statusFilter === status}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">{status}</span>
            </label>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">
            {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of {filteredData.length}
          </span>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5 text-[#5E5E5E]" />
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              {currentPage}
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5 text-[#5E5E5E]" />
            </button>
          </nav>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200" style={{ minWidth: "1400px" }}>
            <thead className="bg-[#F7F7F7] border-b border-[#878787]">
              <tr>
                {["Action", "Employee Name", "Mobile No", "Email", "Department", "Purpose of Travel", "Departure Date", "Return Date", "Departure City", "Arrival City", "Preferred Airlines", "Class Of Travel", "Manager Approval"].map((col) => (
                  <th
                    key={col}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Link to={`/flight-train/detail/${item.id}`} className="text-[#5E5E5E] hover:text-gray-800">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link to={`/flight-train/edit/${item.id}`} className="text-[#5E5E5E] hover:text-gray-800">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleDelete(item.id)} className="text-[#5E5E5E] hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.employeeName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.mobileNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.purposeOfTravel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.departureDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.returnDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.departureCity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.arrivalCity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.preferredAirlines}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.classOfTravel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.managerApproval}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default FlightTrainList
