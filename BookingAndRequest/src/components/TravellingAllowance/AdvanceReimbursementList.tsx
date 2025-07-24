"use client"

import type React from "react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Search, Eye, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { useTravellingAllowanceData, useFilteredData } from "../../hooks/useTravellingAllowanceData"
import type { FilterStatus } from "../../types/travellingAllowance"

const AdvanceReimbursementList: React.FC = () => {
  const location = useLocation()
  const { advanceRequests, loading } = useTravellingAllowanceData()
  const [searchExpanded, setSearchExpanded] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState<FilterStatus>("All")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredData = useFilteredData(advanceRequests, searchTerm, selectedFilter)

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

  const subTabs = [
    { name: "Advance Reimbursements", path: "/travelling-allowance/advance-reimbursements", active: true },
    { name: "Reimbursement", path: "/travelling-allowance/reimbursement", active: false },
  ]

  const advanceSubTabs = [
    { name: "Advance Reimbursement Requests", path: "/travelling-allowance/advance-reimbursements", active: true },
    { name: "Disbursement", path: "/travelling-allowance/disbursement", active: false },
    { name: "Expense Submission & Reconciliation", path: "/travelling-allowance/expense-submission", active: false },
  ]

  const filters: FilterStatus[] = ["All", "Pending", "Processing", "Approved", "Rejected", "Scheduled", "Completed"]

  const getCurrentSubTab = () => {
    if (location.pathname.includes("/advance-reimbursements")) return "/travelling-allowance/advance-reimbursements"
    if (location.pathname.includes("/reimbursement")) return "/travelling-allowance/reimbursement"
    return "/travelling-allowance/advance-reimbursements"
  }

  const getCurrentAdvanceSubTab = () => {
    if (location.pathname.includes("/disbursement")) return "/travelling-allowance/disbursement"
    if (location.pathname.includes("/expense-submission")) return "/travelling-allowance/expense-submission"
    return "/travelling-allowance/advance-reimbursements"
  }

  const getStatusBadge = (status: string) => {
    const statusColors = {
      Pending: "bg-yellow-100 text-yellow-800",
      Processing: "bg-blue-100 text-blue-800",
      Approved: "bg-green-100 text-green-800",
      Rejected: "bg-red-100 text-red-800",
      Scheduled: "bg-purple-100 text-purple-800",
      Completed: "bg-gray-100 text-gray-800",
    }

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"}`}
      >
        {status}
      </span>
    )
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleFilterChange = (filter: FilterStatus) => {
    setSelectedFilter(filter)
    setCurrentPage(1)
  }

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading requests...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      {/* Sub Navigation Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex">
          {subTabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                getCurrentSubTab() === tab.path
                  ? "border-blue-500 text-blue-600 bg-blue-50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Advance Sub Navigation Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex">
          {advanceSubTabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                getCurrentAdvanceSubTab() === tab.path
                  ? "border-blue-500 text-blue-600 bg-blue-50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Pagination Info */}
      <div className="flex justify-end items-center px-6 py-2 text-sm text-gray-600 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">
            {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of {filteredData.length}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 text-[#5E5E5E]" /> {/* Updated icon color */}
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4 text-[#5E5E5E]" /> {/* Updated icon color */}
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Animated Search */}
          <div className="flex items-center">
            <button
              onClick={() => setSearchExpanded(!searchExpanded)}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
            >
              <Search className="w-5 h-5 text-[#5E5E5E]" /> {/* Updated icon color */}
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                searchExpanded ? "w-64 ml-2" : "w-0"
              }`}
            >
              <input
                type="text"
                placeholder="Search by employee name..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Radio Buttons */}
          <div className="flex items-center gap-6 ml-8 flex-wrap">
            {filters.map((filter) => (
              <label key={filter} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="status-filter"
                  value={filter}
                  checked={selectedFilter === filter}
                  onChange={() => handleFilterChange(filter)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{filter}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F7F7F7] border-b border-[#878787]">
            {" "}
            {/* Updated bg and border */}
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Request ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mobile No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project/Site
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Destination
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Purpose
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expense Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Requested Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.length === 0 ? (
              <tr>
                <td colSpan={12} className="px-6 py-8 text-center text-gray-500">
                  No requests found matching your criteria
                </td>
              </tr>
            ) : (
              currentData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/travelling-allowance/advance-reimbursements/detail/${item.id}`}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-[#5E5E5E]" /> {/* Updated icon color */}
                      </Link>
                      <Link
                        to={`/travelling-allowance/advance-reimbursements/edit/${item.id}`}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        title="Edit Request"
                      >
                        <Edit className="w-4 h-4 text-[#5E5E5E]" /> {/* Updated icon color */}
                      </Link>
                      <button
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        title="Delete Request"
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this request?")) {
                            console.log("Delete request:", item.id)
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-[#5E5E5E]" /> {/* Updated icon color */}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.employeeName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.mobileNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.projectSite}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.destination}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.purpose}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.expenseCategory}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ₹{item.requestedAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(item.status)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdvanceReimbursementList
