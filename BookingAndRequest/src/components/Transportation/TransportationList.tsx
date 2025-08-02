"use client"

import type React from "react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Eye, Edit, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react"

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

type TransportationTab = "cab-bus" | "rentals" | "shuttle"

const TransportationList: React.FC = () => {
  const location = useLocation()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"All" | "Approved" | "Pending" | "Rejected">("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const itemsPerPage = 10

  // Get current tab from URL
  const getCurrentTab = (): TransportationTab => {
    if (location.pathname.includes("/rentals")) return "rentals"
    if (location.pathname.includes("/shuttle")) return "shuttle"
    return "cab-bus"
  }

  const currentTab = getCurrentTab()

  // Mock data
  const cabBusData: TransportationRequest[] = [
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

  const rentalsData: TransportationRequest[] = []
  const shuttleData: TransportationRequest[] = []

  const getCurrentData = () => {
    switch (currentTab) {
      case "rentals":
        return rentalsData
      case "shuttle":
        return shuttleData
      default:
        return cabBusData
    }
  }

  const filteredData = getCurrentData().filter((item) => {
    const matchesSearch =
      searchTerm.trim() === "" ||
      item.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mobileNo.includes(searchTerm)
    const matchesStatus = statusFilter === "All" || item.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = filteredData.slice(startIndex, endIndex)

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this transportation request?")) {
      console.log("Delete transportation request with id:", id)
    }
  }

  const getAddPath = () => {
    switch (currentTab) {
      case "rentals":
        return "/transportation/rentals/add"
      case "shuttle":
        return "/transportation/shuttle/add"
      default:
        return "/transportation/cab-bus/add"
    }
  }

  const getDetailPath = (id: string) => {
    switch (currentTab) {
      case "rentals":
        return `/transportation/rentals/detail/${id}`
      case "shuttle":
        return `/transportation/shuttle/detail/${id}`
      default:
        return `/transportation/cab-bus/detail/${id}`
    }
  }

  const getEditPath = (id: string) => {
    switch (currentTab) {
      case "rentals":
        return `/transportation/rentals/edit/${id}`
      case "shuttle":
        return `/transportation/shuttle/edit/${id}`
      default:
        return `/transportation/cab-bus/edit/${id}`
    }
  }

  return (
    <div className="p-6">
      {/* Sub Navigation Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-8">
          <Link
            to="/transportation/cab-bus"
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              currentTab === "cab-bus"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Cab/Bus Request
          </Link>
          <Link
            to="/transportation/rentals"
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              currentTab === "rentals"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Rentals
          </Link>
          <Link
            to="/transportation/shuttle"
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              currentTab === "shuttle"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Shuttle Service
          </Link>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`relative transition-all duration-300 ${isSearchExpanded ? "w-64" : "w-10"}`}>
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
                if (!e.target.value.trim()) {
                  setIsSearchExpanded(false)
                }
              }}
              className={`pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent h-10 transition-all duration-300 ${
                isSearchExpanded ? "w-full opacity-100" : "w-10 opacity-0 cursor-pointer"
              }`}
            />
          </div>
          <Link
            to={getAddPath()}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
          >
            Add
          </Link>
        </div>
        {/* Pagination Info (Moved to top right) */}
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

      {/* Status Filters */}
      <div className="mb-6 flex items-center gap-6 bg-white border border-gray-300 rounded-md px-4 py-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="statusFilter"
            value="All"
            checked={statusFilter === "All"}
            onChange={(e) => setStatusFilter(e.target.value as "All")}
            className="w-4 h-4 text-blue-600"
          />
          <span className="text-sm text-gray-700">All</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="statusFilter"
            value="Approved"
            checked={statusFilter === "Approved"}
            onChange={(e) => setStatusFilter(e.target.value as "Approved")}
            className="w-4 h-4 text-blue-600"
          />
          <span className="text-sm text-gray-700">Approved</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="statusFilter"
            value="Pending"
            checked={statusFilter === "Pending"}
            onChange={(e) => setStatusFilter(e.target.value as "Pending")}
            className="w-4 h-4 text-blue-600"
          />
          <span className="text-sm text-gray-700">Pending</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="statusFilter"
            value="Rejected"
            checked={statusFilter === "Rejected"}
            onChange={(e) => setStatusFilter(e.target.value as "Rejected")}
            className="w-4 h-4 text-blue-600"
          />
          <span className="text-sm text-gray-700">Rejected</span>
        </label>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200" style={{ minWidth: "1800px" }}>
            <thead className="bg-[#F7F7F7] border-b border-[#878787]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Employee Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Mobile No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Project/Site
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Purpose
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Pickup Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Drop-off Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  No. Of Passengers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Transportation Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Special Requirement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Manager Approval
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Booking Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Approval
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Link to={getDetailPath(item.id)} className="text-[#5E5E5E] hover:text-blue-800">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link to={getEditPath(item.id)} className="text-[#5E5E5E] hover:text-gray-800">
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.projectSite}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.purpose}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.pickupLocation}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.dropOffLocation}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.noOfPassengers}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.transportationType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.specialRequirement}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.managerApproval}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.bookingStatus}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.approval}</td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={17} className="px-6 py-4 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TransportationList
