
import type React from "react"

import { useState } from "react"
import { Eye, Edit, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import ToggleSwitch from "../ToggleSwitch"
import Breadcrumb from "../Breadcrumb"
import TableHead from "../TopHead"
import Modal from "../Modal"
import TextInput from "../TextInput"

interface SeatData {
  id: number
  name: string
  active: boolean
  createdOn: string
}

export default function SeatSetupManagement() {
  const navigate = useNavigate()

  // State for seats data
  const [seats, setSeats] = useState<SeatData[]>([
    { id: 1, name: "Seat1", active: false, createdOn: "2023-05-15" },
    { id: 2, name: "Seat2", active: false, createdOn: "2023-05-16" },
  ])

  // State for active tab
  const [activeTab, setActiveTab] = useState("Seat")
  const [activeSubTab, setActiveSubTab] = useState("Seat Setup")

  // State for search
  const [showSearch, setShowSearch] = useState(false)
  const [searchFilters, setSearchFilters] = useState({
    name: "",
    createdOn: "",
  })

  // State for modals
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedSeat, setSelectedSeat] = useState<SeatData | null>(null)

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    active: false,
    createdOn: "",
  })

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Setup", href: "/setup" },
    { label: "Workspace", href: "/workspace" },
  ]

  // Handle tab click
  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
    if (tab === "Facility") {
      navigate("/workspace-management/facility")
    }
  }

  // Handle sub-tab click
  const handleSubTabClick = (tab: string) => {
    setActiveSubTab(tab)
    if (tab === "Seat Type") {
      navigate("/workspace-management/seat/type")
    }
  }

  // Handle toggle change
  const handleToggleChange = (id: number, checked: boolean) => {
    setSeats(seats.map((seat) => (seat.id === id ? { ...seat, active: checked } : seat)))
  }

  // Handle search toggle
  const handleSearchToggle = () => {
    setShowSearch(!showSearch)
    if (showSearch) {
      setSearchFilters({ name: "", createdOn: "" })
    }
  }

  // Handle search filter change
  const handleSearchFilterChange = (field: string, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [field]: value }))
  }

  // Handle view button click
  const handleViewClick = (seat: SeatData) => {
    setSelectedSeat(seat)
    setFormData({
      name: seat.name,
      active: seat.active,
      createdOn: seat.createdOn,
    })
    setViewModalOpen(true)
  }

  // Handle add button click - Navigate to seat setup form
  const handleAddClick = () => {
    navigate("/workspace-management/seat/setup/new")
  }

  // Handle edit button click
  const handleEditClick = (seat: SeatData) => {
    setSelectedSeat(seat)
    setFormData({
      name: seat.name,
      active: seat.active,
      createdOn: seat.createdOn,
    })
    setEditModalOpen(true)
  }

  // Handle delete button click - Direct deletion without modal
  const handleDeleteClick = (id: number) => {
    setSeats(seats.filter((seat) => seat.id !== id))
  }

  // Handle modal close
  const handleModalClose = () => {
    setViewModalOpen(false)
    setEditModalOpen(false)
    setSelectedSeat(null)
    setFormData({ name: "", active: false, createdOn: "" })
  }

  // Handle edit submit
  const handleEditSubmit = () => {
    if (selectedSeat && formData.name.trim()) {
      setSeats(
        seats.map((seat) =>
          seat.id === selectedSeat.id ? { ...seat, name: formData.name.trim(), active: formData.active } : seat,
        ),
      )
      setEditModalOpen(false)
      setSelectedSeat(null)
      setFormData({ name: "", active: false, createdOn: "" })
    }
  }

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  // Filter seats based on search query
  const filteredSeats = seats.filter((seat) => {
    const nameMatch = seat.name.toLowerCase().includes(searchFilters.name.toLowerCase())
    const createdOnMatch = seat.createdOn.includes(searchFilters.createdOn)
    return nameMatch && createdOnMatch
  })

  return (
    <div className="bg-white min-h-screen font-['PT_Sans']">
      {/* Breadcrumb navigation */}
      <div className="p-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Main tabs */}
      <div className="border-b border-gray-200">
        <div className="flex">
          <button
            className={`px-4 py-2 text-sm relative ${
              activeTab === "Facility"
                ? "text-blue-600 font-medium border-b-2 border-blue-600"
                : "text-gray-500 font-medium"
            }`}
            onClick={() => handleTabClick("Facility")}
          >
            Facility
          </button>
          <button
            className={`px-4 py-2 text-sm relative ${
              activeTab === "Seat"
                ? "text-blue-600 font-medium border-b-2 border-blue-600"
                : "text-gray-500 font-medium"
            }`}
            onClick={() => handleTabClick("Seat")}
          >
            Seat
          </button>
        </div>
      </div>

      {/* Sub tabs */}
      <div className="border-b border-gray-200">
        <div className="flex">
          <button
            className={`px-4 py-2 text-sm relative ${
              activeSubTab === "Seat Type"
                ? "text-blue-600 font-medium border-b-2 border-blue-600"
                : "text-gray-500 font-medium"
            }`}
            onClick={() => handleSubTabClick("Seat Type")}
          >
            Seat Type
          </button>
          <button
            className={`px-4 py-2 text-sm relative ${
              activeSubTab === "Seat Setup"
                ? "text-blue-600 font-medium border-b-2 border-blue-600"
                : "text-gray-500 font-medium"
            }`}
            onClick={() => handleSubTabClick("Seat Setup")}
          >
            Seat Setup
          </button>
        </div>
      </div>

      {/* Table controls */}
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <button className="mr-2 text-gray-500" onClick={handleSearchToggle}>
            <Search className="w-5 h-5" />
          </button>
          <button
            className="px-4 py-1 border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50 text-sm"
            onClick={handleAddClick}
          >
            Add
          </button>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <span>
            1-{filteredSeats.length} of {filteredSeats.length}
          </span>
          <button className="ml-2 text-gray-400">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="ml-1 text-gray-400">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mx-4">
        <table className="w-full border-collapse">
          <TableHead
            columns={[
              { label: "Action", align: "left" },
              { label: "Name", align: "left" },
              { label: "Active/Inactive", align: "left" },
              { label: "Created On", align: "left" },
            ]}
          />

          {/* Search filters row */}
          {showSearch && (
            <tr className="bg-gray-50">
              <td className="p-2"></td>
              <td className="p-2">
                <TextInput
                  label=""
                  name="nameSearch"
                  value={searchFilters.name}
                  onChange={(e) => handleSearchFilterChange("name", e.target.value)}
                  placeholder="Search Name..."
                />
              </td>
              <td className="p-2"></td>
              <td className="p-2">
                <TextInput
                  label=""
                  name="createdOnSearch"
                  value={searchFilters.createdOn}
                  onChange={(e) => handleSearchFilterChange("createdOn", e.target.value)}
                  placeholder="Search Created On..."
                />
              </td>
            </tr>
          )}

          <tbody>
            {filteredSeats.length > 0 ? (
              filteredSeats.map((seat) => (
                <tr key={seat.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-500 hover:text-blue-600" onClick={() => handleViewClick(seat)}>
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="text-gray-500 hover:text-blue-600" onClick={() => handleEditClick(seat)}>
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="text-gray-500 hover:text-red-600" onClick={() => handleDeleteClick(seat.id)}>
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                  <td className="p-3 text-sm">{seat.name}</td>
                  <td className="p-3">
                    <ToggleSwitch checked={seat.active} onChange={(checked) => handleToggleChange(seat.id, checked)} />
                  </td>
                  <td className="p-3 text-sm">{seat.createdOn}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center">
                  <div className="text-gray-500">No seats found.</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      <Modal
        isOpen={viewModalOpen}
        onClose={handleModalClose}
        title="View Seat"
        content={
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Seat Name</label>
              <input
                type="text"
                value={formData.name}
                disabled={true}
                className="w-full px-3 py-2 border rounded-md bg-gray-100 text-black"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-white">Active</label>
              <ToggleSwitch checked={formData.active} onChange={() => {}} disabled={true} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Created On</label>
              <input
                type="text"
                value={formData.createdOn}
                disabled={true}
                className="w-full px-3 py-2 border rounded-md bg-gray-100 text-black"
              />
            </div>
          </div>
        }
        showFooter={true}
        confirmText="Close"
        onConfirm={handleModalClose}
        confirmButtonClassName="bg-[#7991BB] text-white hover:bg-[#6B82A6]"
      />

      {/* Edit Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={handleModalClose}
        title="Edit Seat"
        content={
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Seat Name</label>
              <TextInput
                label=""
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter seat name"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-white">Active</label>
              <ToggleSwitch
                checked={formData.active}
                onChange={(checked) => setFormData((prev) => ({ ...prev, active: checked }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Created On</label>
              <input
                type="text"
                value={formData.createdOn}
                disabled={true}
                className="w-full px-3 py-2 border rounded-md bg-gray-100 text-black"
              />
            </div>
          </div>
        }
        showFooter={true}
        confirmText="Submit"
        cancelText="Cancel"
        onConfirm={handleEditSubmit}
        onCancel={handleModalClose}
        confirmButtonClassName="bg-[#7991BB] text-white hover:bg-[#6B82A6]"
        cancelButtonClassName="bg-[#7991BB] text-white hover:bg-[#6B82A6]"
      />
    </div>
  )
}
