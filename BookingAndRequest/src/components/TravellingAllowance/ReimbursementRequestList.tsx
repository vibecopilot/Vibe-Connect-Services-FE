"use client"

import type React from "react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Search, Eye, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { useTravellingAllowanceData, useFilteredData } from "../../hooks/useTravellingAllowanceData"
import type { FilterStatus } from "../../types/travellingAllowance"

const ReimbursementRequestList: React.FC = () => {
  const location = useLocation()
  const { reimbursementRequests, loading } = useTravellingAllowanceData()
  const [searchExpanded, setSearchExpanded] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState<FilterStatus>("All")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredData = useFilteredData(reimbursementRequests, searchTerm, selectedFilter)

  const subTabs = [
    { name: "Advance Reimbursements", path: "/travelling-allowance/advance-reimbursements", active: false },
    { name: "Reimbursement", path: "/travelling-allowance/reimbursement", active: true },
  ]

  const reimbursementSubTabs = [
    { name: "Reimbursement Requests", path: "/travelling-allowance/reimbursement/requests", active: true },
    { name: "Disbursement", path: "/travelling-allowance/reimbursement/disbursement", active: false },
  ]

  const filters = ["All", "Approved", "Pending", "Rejected"]

  const getCurrentSubTab = () => {
    if (location.pathname.includes("/advance-reimbursements")) return "/travelling-allowance/advance-reimbursements"
    if (location.pathname.includes("/reimbursement")) return "/travelling-allowance/reimbursement"
    return "/travelling-allowance/reimbursement"
  }

  const getCurrentReimbursementSubTab = () => {
    if (location.pathname.includes("/disbursement")) return "/travelling-allowance/reimbursement/disbursement"
    return "/travelling-allowance/reimbursement/requests"
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)
  const totalItems = filteredData.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const getStatusBadge = (status: string) => {
    const statusColors = {
      Pending: "bg-yellow-100 text-yellow-800",
      Approved: "bg-green-100 text-green-800",
      Rejected: "bg-red-100 text-red-800",
      "Under Review": "bg-blue-100 text-blue-800",
    }

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"}`}
      >
        {status}
      </span>
    )
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      console.log(`Deleting reimbursement request with id: ${id}`)
    }
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
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
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

      {/* Reimbursement Sub Navigation Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex">
          {reimbursementSubTabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                getCurrentReimbursementSubTab() === tab.path
                  ? "border-blue-500 text-blue-600 bg-blue-50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center px-6 py-2 text-sm text-gray-600 border-b border-gray-200">
        <span className="mr-4">
          {indexOfFirstItem + 1}-{indexOfLastItem > totalItems ? totalItems : indexOfLastItem} of {totalItems}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Search and Filters */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          {/* Animated Search */}
          <div className="flex items-center">
            <button
              onClick={() => setSearchExpanded(!searchExpanded)}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
            >
              <Search className="w-5 h-5 text-gray-500" />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                searchExpanded ? "w-64 ml-2" : "w-0"
              }`}
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Add Button */}
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
            <span className="text-sm">Add</span>
          </button>

          {/* Filter Radio Buttons */}
          <div className="flex items-center gap-6 ml-8">
            {filters.map((filter) => (
              <label key={filter} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="status-filter"
                  value={filter}
                  checked={selectedFilter === filter}
                  onChange={(e) => setSelectedFilter(e.target.value as FilterStatus)}
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
          <thead className="bg-gray-50 border-b border-gray-200">
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
                Purpose
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Requested Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={9} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : currentItems.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                  No data found.
                </td>
              </tr>
            ) : (
              currentItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/travelling-allowance/reimbursement/requests/detail/${item.id}`}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="View"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.employeeName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.mobileNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.purpose}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{item.totalRequestedAmount.toLocaleString()}
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

export default ReimbursementRequestList
