"use client"

import type React from "react"
import { useState } from "react"
import { FiEdit, FiTrash2, FiEye, FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi"


interface UserItem {
  id: number
  firstName: string
  lastName: string
  email: string
  mobileNumber: string
  appDownload: string
  unit: string
  type: string
}

interface UserProps {
  onAddUser: () => void
  onEditUser: (user: UserItem) => void
  onViewUser: (userId: number) => void
}

const User: React.FC<UserProps> = ({ onAddUser, onEditUser, onViewUser }) => {
  const [showSearch, setShowSearch] = useState(false)
  const [searchFilters, setSearchFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    unit: "",
    type: "",
  })

  const [data, setData] = useState<UserItem[]>([
    {
      id: 1,
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      mobileNumber: "9736453728",
      appDownload: "NO",
      unit: "FM Office",
      type: "Unit_Resident",
    },
    {
      id: 2,
      firstName: "Test1",
      lastName: "User1",
      email: "test1@example.com",
      mobileNumber: "8243745698",
      appDownload: "NO",
      unit: "NA",
      type: "Tenant",
    },
    {
      id: 3,
      firstName: "Test2",
      lastName: "User2",
      email: "test2@example.com",
      mobileNumber: "8787654563",
      appDownload: "YES",
      unit: "3212",
      type: "Unit_Resident",
    },
    {
      id: 4,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      mobileNumber: "9876543210",
      appDownload: "YES",
      unit: "A101",
      type: "Owner",
    },
    {
      id: 5,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      mobileNumber: "8765432109",
      appDownload: "NO",
      unit: "B205",
      type: "Tenant",
    },
    {
      id: 6,
      firstName: "Mike",
      lastName: "Johnson",
      email: "mike.johnson@example.com",
      mobileNumber: "7654321098",
      appDownload: "YES",
      unit: "C303",
      type: "Owner",
    },
  ])

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Calculate summary statistics
  const totalUsers = data.length
  const appDownloaded = data.filter((user) => user.appDownload === "YES").length
  const tenantDownloads = data.filter((user) => user.type === "Tenant" && user.appDownload === "YES").length
  const ownerDownloads = data.filter((user) => user.type === "Owner" && user.appDownload === "YES").length
  const approvedUsers = data.filter((user) => user.appDownload === "YES").length
  const pendingUsers = data.filter((user) => user.appDownload === "NO").length

  // Apply filters
  const filteredData = data.filter((item) => {
    return (
      item.firstName.toLowerCase().includes(searchFilters.firstName.toLowerCase()) &&
      item.lastName.toLowerCase().includes(searchFilters.lastName.toLowerCase()) &&
      item.email.toLowerCase().includes(searchFilters.email.toLowerCase()) &&
      item.unit.toLowerCase().includes(searchFilters.unit.toLowerCase()) &&
      item.type.toLowerCase().includes(searchFilters.type.toLowerCase())
    )
  })

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSearchClick = () => {
    setShowSearch(!showSearch)
  }

  const handleAddClick = () => {
    onAddUser()
  }

  const handleEditClick = (item: UserItem) => {
    onEditUser(item)
  }

  const handleDeleteClick = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setData((prev) => prev.filter((item) => item.id !== id))
    }
  }

  const handleViewClick = (item: UserItem) => {
    onViewUser(item.id)
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="summary-box p-4 rounded-lg text-center">
          <h3 className="text-sm font-medium text-black">Total Users</h3>
          <p className="text-2xl font-bold text-black">{totalUsers}</p>
        </div>
        <div className="summary-box p-4 rounded-lg text-center">
          <h3 className="text-sm font-medium text-black">App Downloaded</h3>
          <p className="text-2xl font-bold text-black">{appDownloaded}</p>
        </div>
        <div className="summary-box p-4 rounded-lg text-center">
          <h3 className="text-sm font-medium text-black">Total No. Tenant Downloads</h3>
          <p className="text-2xl font-bold text-black">{tenantDownloads}</p>
        </div>
        <div className="summary-box p-4 rounded-lg text-center">
          <h3 className="text-sm font-medium text-black">Total No. Owner Downloads</h3>
          <p className="text-2xl font-bold text-black">{ownerDownloads}</p>
        </div>
        <div className="summary-box p-4 rounded-lg text-center">
          <h3 className="text-sm font-medium text-black">Approved Users</h3>
          <p className="text-2xl font-bold text-black">{approvedUsers}</p>
        </div>
        <div className="summary-box p-4 rounded-lg text-center">
          <h3 className="text-sm font-medium text-black">Pending Users</h3>
          <p className="text-2xl font-bold text-black">{pendingUsers}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleSearchClick}
            className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors"
          >
            <FiSearch className="w-4 h-4" />
          </button>
          <button
            onClick={handleAddClick}
            className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors"
          >
            Add User
          </button>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>
            {filteredData.length > 0
              ? `1-${Math.min(itemsPerPage, filteredData.length)} of ${filteredData.length}`
              : "0 of 0"}
          </span>
          <div className="flex space-x-1">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`p-1 border rounded transition-colors ${
                currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`p-1 border rounded transition-colors ${
                currentPage === totalPages || totalPages === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-no-side-borders">
        <table className="w-full table-no-side-borders">
          <thead>
            <tr className="table-header">
              <th className="px-4 py-3 text-left text-sm font-medium table-text">Action</th>
              <th className="px-4 py-3 text-left text-sm font-medium table-text">First Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium table-text">Last Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium table-text">Email</th>
              <th className="px-4 py-3 text-left text-sm font-medium table-text">Mobile Number</th>
              <th className="px-4 py-3 text-left text-sm font-medium table-text">App Download</th>
              <th className="px-4 py-3 text-left text-sm font-medium table-text">Unit</th>
              <th className="px-4 py-3 text-left text-sm font-medium table-text">Type</th>
            </tr>
          </thead>
          <tbody>
            {/* Search Row */}
            {showSearch && (
              <tr className="bg-gray-50">
                <td className="px-4 py-2 table-horizontal-only"></td>
                <td className="px-4 py-2 table-horizontal-only">
                  <input
                    type="text"
                    value={searchFilters.firstName}
                    onChange={(e) => setSearchFilters({ ...searchFilters, firstName: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 search-input"
                    placeholder=""
                  />
                </td>
                <td className="px-4 py-2 table-horizontal-only">
                  <input
                    type="text"
                    value={searchFilters.lastName}
                    onChange={(e) => setSearchFilters({ ...searchFilters, lastName: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 search-input"
                    placeholder=""
                  />
                </td>
                <td className="px-4 py-2 table-horizontal-only">
                  <input
                    type="text"
                    value={searchFilters.email}
                    onChange={(e) => setSearchFilters({ ...searchFilters, email: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 search-input"
                    placeholder=""
                  />
                </td>
                <td className="px-4 py-2 table-horizontal-only"></td>
                <td className="px-4 py-2 table-horizontal-only"></td>
                <td className="px-4 py-2 table-horizontal-only">
                  <input
                    type="text"
                    value={searchFilters.unit}
                    onChange={(e) => setSearchFilters({ ...searchFilters, unit: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 search-input"
                    placeholder=""
                  />
                </td>
                <td className="px-4 py-2 table-horizontal-only">
                  <input
                    type="text"
                    value={searchFilters.type}
                    onChange={(e) => setSearchFilters({ ...searchFilters, type: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 search-input"
                    placeholder=""
                  />
                </td>
              </tr>
            )}
            {/* Data Rows */}
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 table-horizontal-only">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
                        title="Edit"
                      >
                        <FiEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleViewClick(item)}
                        className="p-1 text-gray-600 hover:text-green-600 transition-colors"
                        title="View"
                      >
                        <FiEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(item.id)}
                        className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm table-text table-horizontal-only">{item.firstName}</td>
                  <td className="px-4 py-3 text-sm table-text table-horizontal-only">{item.lastName}</td>
                  <td className="px-4 py-3 text-sm table-text table-horizontal-only">{item.email}</td>
                  <td className="px-4 py-3 text-sm table-text table-horizontal-only">{item.mobileNumber}</td>
                  <td className="px-4 py-3 text-sm table-horizontal-only">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.appDownload === "YES" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.appDownload}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm table-text table-horizontal-only">{item.unit}</td>
                  <td className="px-4 py-3 text-sm table-horizontal-only">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {item.type}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-8">
                  

                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default User
