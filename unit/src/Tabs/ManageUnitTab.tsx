"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { FiEdit, FiTrash2, FiSearch, FiEye, FiChevronLeft, FiChevronRight } from "react-icons/fi"


interface Unit {
  id: number
  site: string
  building: string
  unit: string
  noOfFloors: number
}

const ManageUnitTab: React.FC = () => {
  const [data, setData] = useState<Unit[]>([])
  const [showSearch, setShowSearch] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchFilters, setSearchFilters] = useState({
    site: "",
    building: "",
    unit: "",
    noOfFloors: "",
  })
  const [newUnit, setNewUnit] = useState({
    building: "",
    floor: "",
    unit: "",
  })
  const [editId, setEditId] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    setData([
      { id: 1, site: "Vibe", building: "User", unit: "VibeConnect", noOfFloors: 1 },
      { id: 2, site: "Vibe", building: "User1", unit: "VibeConnect", noOfFloors: 2 },
      { id: 3, site: "Vibe", building: "User2", unit: "VibeConnect", noOfFloors: 3 },
    ])
  }, [])

  const handleSearchClick = () => {
    setShowSearch(!showSearch)
    setShowAddForm(false)
  }

  const handleAddClick = () => {
    setShowAddForm(!showAddForm)
    setShowSearch(false)
    setNewUnit({ building: "", floor: "", unit: "" })
    setEditId(null)
  }

  const handleSubmit = () => {
    if (!newUnit.building || !newUnit.floor || !newUnit.unit) return

    if (editId !== null) {
      setData((prev) =>
        prev.map((item) => (item.id === editId ? { ...item, building: newUnit.building, unit: newUnit.unit } : item)),
      )
    } else {
      const newEntry: Unit = {
        id: Date.now(),
        site: "Vibe",
        building: newUnit.building,
        unit: newUnit.unit,
        noOfFloors: Math.floor(Math.random() * 5) + 1,
      }
      setData((prev) => [...prev, newEntry])
    }

    setShowAddForm(false)
    setNewUnit({ building: "", floor: "", unit: "" })
    setEditId(null)
  }

  const handleCancel = () => {
    setShowAddForm(false)
    setNewUnit({ building: "", floor: "", unit: "" })
    setEditId(null)
  }

  const handleEdit = (item: Unit) => {
    setNewUnit({ building: item.building, floor: "", unit: item.unit })
    setEditId(item.id)
    setShowAddForm(true)
    setShowSearch(false)
  }

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id))
  }

  const filteredData = data.filter((item) => {
    return (
      item.site.toLowerCase().includes(searchFilters.site.toLowerCase()) &&
      item.building.toLowerCase().includes(searchFilters.building.toLowerCase()) &&
      item.unit.toLowerCase().includes(searchFilters.unit.toLowerCase()) &&
      item.noOfFloors.toString().includes(searchFilters.noOfFloors)
    )
  })

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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
    <div className="bg-white">
      {/* Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleSearchClick}
            className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            style={{ color: "#5E5E5E" }}
          >
            <FiSearch className="w-5 h-5" />
          </button>
          <button onClick={handleAddClick} className="custom-add-btn">
            Add Unit
          </button>
        </div>
        <div className="flex items-center space-x-4 text-sm" style={{ color: "#5E5E5E" }}>
          <span>
            {filteredData.length > 0
              ? `1-${Math.min(itemsPerPage, filteredData.length)} of ${filteredData.length}`
              : "0 of 0"}
          </span>
          <div className="flex space-x-1">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`p-1 transition-colors ${
                currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`p-1 transition-colors ${
                currentPage === totalPages || totalPages === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-white mb-6">
          <div className="flex items-center space-x-4">
            <select
              value={newUnit.building}
              onChange={(e) => setNewUnit({ ...newUnit, building: e.target.value })}
              className="unit-select-building"
            >
              <option value="">Select Building</option>
              <option value="User">User</option>
              <option value="User1">User1</option>
              <option value="User2">User2</option>
            </select>
            <select
              value={newUnit.floor}
              onChange={(e) => setNewUnit({ ...newUnit, floor: e.target.value })}
              className="unit-select-floor"
            >
              <option value="">Select Floor</option>
              <option value="Ground Floor">Ground Floor</option>
              <option value="First Floor">First Floor</option>
              <option value="Second Floor">Second Floor</option>
            </select>
            <input
              type="text"
              placeholder="Enter Unit Name"
              value={newUnit.unit}
              onChange={(e) => setNewUnit({ ...newUnit, unit: e.target.value })}
              className="unit-enter-name"
            />
            <button onClick={handleSubmit} className="custom-submit-btn">
              Submit
            </button>
            <button onClick={handleCancel} className="custom-cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white">
        <div className="custom-table-header-container">
          <table className="custom-table">
            <thead>
              <tr className="custom-table-header">
                <th style={{ width: "203px", paddingLeft: "16px" }}>Action</th>
                <th style={{ width: "271px", paddingLeft: "16px" }}>Site</th>
                <th style={{ width: "339px", paddingLeft: "16px" }}>Building</th>
                <th style={{ width: "271px", paddingLeft: "32px" }}>Unit</th>
                <th style={{ width: "271px", paddingLeft: "16px" }}>No. Of Floors</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="table-body-container">
          <table className="custom-table">
            <tbody>
              {/* Search Row */}
              {showSearch && (
                <tr>
                  <td className="custom-table-cell" style={{ width: "203px" }}>
                    <div></div>
                  </td>
                  <td className="custom-table-cell" style={{ width: "271px" }}>
                    <input
                      type="text"
                      value={searchFilters.site}
                      onChange={(e) => setSearchFilters({ ...searchFilters, site: e.target.value })}
                      className="search-input w-full"
                      placeholder=""
                    />
                  </td>
                  <td className="custom-table-cell" style={{ width: "339px" }}>
                    <input
                      type="text"
                      value={searchFilters.building}
                      onChange={(e) => setSearchFilters({ ...searchFilters, building: e.target.value })}
                      className="search-input w-full"
                      placeholder=""
                    />
                  </td>
                  <td className="custom-table-cell" style={{ width: "271px", paddingLeft: "32px" }}>
                    <input
                      type="text"
                      value={searchFilters.unit}
                      onChange={(e) => setSearchFilters({ ...searchFilters, unit: e.target.value })}
                      className="search-input w-full"
                      placeholder=""
                    />
                  </td>
                  <td className="custom-table-cell" style={{ width: "271px" }}>
                    <input
                      type="text"
                      value={searchFilters.noOfFloors}
                      onChange={(e) => setSearchFilters({ ...searchFilters, noOfFloors: e.target.value })}
                      className="search-input w-full"
                      placeholder=""
                    />
                  </td>
                </tr>
              )}
              {/* Data Rows */}
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <tr key={item.id} className="custom-table-row hover:bg-gray-50 transition-colors">
                    <td className="custom-table-cell" style={{ width: "203px" }}>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-1 hover:text-blue-600 transition-colors"
                          style={{ color: "#5E5E5E" }}
                          title="Edit"
                        >
                          <FiEdit className="w-5 h-5" />
                        </button>
                        <button
                          className="p-1 hover:text-green-600 transition-colors"
                          style={{ color: "#5E5E5E" }}
                          title="View"
                        >
                          <FiEye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1 hover:text-red-600 transition-colors"
                          style={{ color: "#5E5E5E" }}
                          title="Delete"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                    <td className="custom-table-cell" style={{ width: "271px" }}>
                      {item.site}
                    </td>
                    <td className="custom-table-cell" style={{ width: "339px" }}>
                      {item.building}
                    </td>
                    <td className="custom-table-cell" style={{ width: "271px", paddingLeft: "32px" }}>
                      {item.unit}
                    </td>
                    <td className="custom-table-cell" style={{ width: "271px" }}>
                      {item.noOfFloors}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-8">
                    
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

export default ManageUnitTab
