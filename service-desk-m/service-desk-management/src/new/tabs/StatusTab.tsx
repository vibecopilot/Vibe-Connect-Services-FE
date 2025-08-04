
import type React from "react"

import { useState } from "react"
import { Card } from "../components/Card"
import Modal from "../components/Modal"
import TextInput from "../components/TextInput"
import TextArea from "../components/TextArea"
import RadioButton from "../components/RadioButton"
import ToggleSwitch from "../components/ToggleSwitch"
import NotificationToaster from "../components/NotificationToaster"
import NoDataFound from "../components/NoDataFound"
import TableHead from "../components/TopHead"
import SearchableTopBar from "../components/SearchableTopBar" // Using the modified SearchableTopBar

interface Status {
  id: string
  name: string
  description: string
  type: "In Progress" | "Completed"
  stopTimer: boolean
  color: string
}

interface StatusTabProps {
  searchQuery?: string
}

export default function StatusTab({ searchQuery: externalSearchQuery }: StatusTabProps) {
  const [statuses, setStatuses] = useState<Status[]>([
    {
      id: "1",
      name: "Open",
      description: "Newly created ticket",
      type: "In Progress",
      stopTimer: false,
      color: "#3b82f6",
    },
    { id: "2", name: "Closed", description: "Resolved ticket", type: "Completed", stopTimer: true, color: "#10b981" },
  ])

  const [showModal, setShowModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [editingItem, setEditingItem] = useState<Status | null>(null)
  const [viewingItem, setViewingItem] = useState<Status | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "In Progress" as "In Progress" | "Completed",
    stopTimer: false,
    color: "#3b82f6",
  })
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [searchVisible, setSearchVisible] = useState(false)
  const [searchFilters, setSearchFilters] = useState({
    name: "",
    description: "",
    stopTimer: "", // Can be "true", "false", or ""
  })

  const filteredStatuses = statuses.filter((status) => {
    const matchesName = status.name.toLowerCase().includes(searchFilters.name.toLowerCase())
    const matchesDescription = status.description.toLowerCase().includes(searchFilters.description.toLowerCase())
    const matchesStopTimer =
      searchFilters.stopTimer === "" ||
      (searchFilters.stopTimer.toLowerCase() === "true" && status.stopTimer) ||
      (searchFilters.stopTimer.toLowerCase() === "false" && !status.stopTimer)

    return matchesName && matchesDescription && matchesStopTimer
  })

  const handleSearchToggle = (isVisible: boolean) => {
    setSearchVisible(isVisible)
    if (!isVisible) {
      setSearchFilters({ name: "", description: "", stopTimer: "" })
    }
  }

  const handleSearchFilterChange = (field: keyof typeof searchFilters, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [field]: value }))
  }

  const handleButtonClick = (type: string) => {
    if (type === "New Status") {
      setShowModal(true)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (e: { target: { name: string; value: string } }) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value as "In Progress" | "Completed" }))
  }

  const handleToggleChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, stopTimer: checked }))
  }

  const handleSave = () => {
    if (!formData.name.trim()) return

    if (editingItem) {
      setStatuses((prev) => prev.map((status) => (status.id === editingItem.id ? { ...status, ...formData } : status)))
      setToastMessage("Status updated successfully!")
    } else {
      const newStatus: Status = {
        id: Date.now().toString(),
        ...formData,
      }
      setStatuses((prev) => [...prev, newStatus])
      setToastMessage("Status created successfully!")
    }

    setFormData({ name: "", description: "", type: "In Progress", stopTimer: false, color: "#3b82f6" })
    setEditingItem(null)
    setShowModal(false)
    setShowToast(true)
  }

  const handleView = (status: Status) => {
    setViewingItem(status)
    setShowViewModal(true)
  }

  const handleEdit = (status: Status) => {
    setEditingItem(status)
    setFormData({
      name: status.name,
      description: status.description,
      type: status.type,
      stopTimer: status.stopTimer,
      color: status.color,
    })
    setShowModal(true)
  }

  const handleDelete = (statusId: string) => {
    setStatuses((prev) => prev.filter((status) => status.id !== statusId))
    setToastMessage("Status deleted successfully!")
    setShowToast(true)
  }

  const modalContent = (
    <div className="space-y-4 text-left" style={{ fontFamily: "PT Sans, sans-serif" }}>
      <TextInput label="Name" name="name" value={formData.name} onChange={handleInputChange} required />
      <TextArea
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        rows={4}
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <RadioButton
            label="Status Type"
            name="type"
            options={["In Progress", "Completed"]}
            value={formData.type}
            onChange={handleRadioChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2">Stop Timer</label>
          <div className="flex justify-start">
            <ToggleSwitch checked={formData.stopTimer} onChange={handleToggleChange} />
          </div>
        </div>
      </div>

      <div>
        <TextInput
          label="Color"
          name="color"
          type="color"
          value={formData.color}
          onChange={handleInputChange}
          className="w-24 px-2 py-1"
        />
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm text-gray-600 font-mono">{formData.color.toUpperCase()}</span>
        </div>
      </div>
    </div>
  )

  const viewModalContent = viewingItem ? (
    <div className="space-y-4" style={{ fontFamily: "PT Sans, sans-serif" }}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <p className="text-gray-600">{viewingItem.name}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <p className="text-gray-600">{viewingItem.description}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
        <p className="text-gray-600">{viewingItem.type}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Stop Timer</label>
        <p className="text-gray-600">{viewingItem.stopTimer ? "Yes" : "No"}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded border" style={{ backgroundColor: viewingItem.color }} />
          <span className="text-gray-600">{viewingItem.color}</span>
        </div>
      </div>
    </div>
  ) : null

  const columns = [
    { label: "Actions", align: "left" as const },
    { label: "Name", align: "center" as const },
    { label: "Description", align: "center" as const },
    { label: "Stop Timer", align: "center" as const },
    { label: "Color", align: "center" as const },
  ]

  return (
    <div className="space-y-6" style={{ fontFamily: "PT Sans, sans-serif" }}>
      {/* Search and Button aligned to the left */}
      <div className="flex items-center gap-4">
        <SearchableTopBar
          onButtonClick={handleButtonClick}
          buttons={["New Status"]}
          onSearchToggle={handleSearchToggle}
        />
      </div>

      {/* Status Table */}
      <Card className="border-0">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <TableHead columns={columns} />
            {searchVisible && (
              <tr>
                <td className="p-2 border-r border-gray-300">{/* Empty cell for Actions column */}</td>
                <td className="p-2 border-r border-gray-300">
                  <TextInput
                    label=""
                    name="nameSearch"
                    value={searchFilters.name}
                    onChange={(e) => handleSearchFilterChange("name", e.target.value)}
                    className="text-sm"
                    placeholder="Search Name..."
                  />
                </td>
                <td className="p-2 border-r border-gray-300">
                  <TextInput
                    label=""
                    name="descriptionSearch"
                    value={searchFilters.description}
                    onChange={(e) => handleSearchFilterChange("description", e.target.value)}
                    className="text-sm"
                    placeholder="Search Description..."
                  />
                </td>
                <td className="p-2 border-r border-gray-300">
                  <TextInput
                    label=""
                    name="stopTimerSearch"
                    value={searchFilters.stopTimer}
                    onChange={(e) => handleSearchFilterChange("stopTimer", e.target.value)}
                    className="text-sm"
                    placeholder="Search Stop Timer (true/false)..."
                  />
                </td>
                <td className="p-2 border-r border-gray-300">{/* Empty cell for Color column */}</td>
              </tr>
            )}
            <tbody>
              {filteredStatuses.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="p-8 text-center">
                    <NoDataFound message="No statuses found. Create your first status to get started." />
                  </td>
                </tr>
              ) : (
                filteredStatuses.map((status) => (
                  <tr key={status.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 w-32 border-r border-gray-300">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(status)}
                          className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
                          title="View"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleEdit(status)}
                          className="p-1 text-gray-600 hover:text-green-600 transition-colors"
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(status.id)}
                          className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="p-4 font-medium w-1/4 text-center text-gray-600 border-r border-gray-300">
                      {status.name}
                    </td>
                    <td className="p-4 text-gray-600 w-2/4 text-center border-r border-gray-300">
                      {status.description}
                    </td>
                    <td className="p-4 w-1/6 text-center border-r border-gray-300">
                      {status.stopTimer ? (
                        <span className="text-gray-600 font-medium">Running</span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className="p-4 w-1/6 border-r border-gray-300">
                      <div className="flex items-center justify-center">
                        <div
                          className="w-8 h-6 rounded border border-gray-300"
                          style={{ backgroundColor: status.color }}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Edit/Create Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingItem ? "Edit Status" : "New Status"}
        content={modalContent}
        showFooter={true}
        confirmText="Save"
        cancelText="Cancel"
        onConfirm={handleSave}
        onCancel={() => setShowModal(false)}
        confirmButtonClassName="bg-[#7991BB] text-white hover:bg-[#6a82a8]"
        modalClassName="w-full max-w-lg"
      />

      {/* View Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="View Status"
        content={viewModalContent}
        showFooter={false}
      />

      {/* Toast Notification */}
      <NotificationToaster
        message={toastMessage}
        type="success"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        position="top-right"
      />
    </div>
  )
}