
import type React from "react"

import { useState } from "react"
import { Card } from "../components/Card"
import Modal from "../components/Modal"
import TextInput from "../components/TextInput"
import TextArea from "../components/TextArea"
import NotificationToaster from "../components/NotificationToaster"
import NoDataFound from "../components/NoDataFound"
import TableHead from "../components/TopHead"
import TopBar from "../components/TopBar" // Using the modified TopBar

interface Priority {
  id: string
  name: string
  description: string
  color: string
  selected: boolean
}

interface PrioritySettingsProps {
  searchQuery: string
}

export default function PrioritySettings({ searchQuery }: PrioritySettingsProps) {
  const [priorities, setPriorities] = useState<Priority[]>([
    { id: "1", name: "High", description: "This Change has urgency level High", color: "#ff0000", selected: false },
    { id: "2", name: "High", description: "This Change has urgency level High", color: "#ff0000", selected: false },
    { id: "3", name: "High", description: "This Change has urgency level High", color: "#ff0000", selected: false },
    { id: "4", name: "High", description: "This Change has urgency level High", color: "#ff0000", selected: false },
    { id: "5", name: "High", description: "This Change has urgency level High", color: "#ff0000", selected: false },
  ])

  const [showModal, setShowModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [editingItem, setEditingItem] = useState<Priority | null>(null)
  const [viewingItem, setViewingItem] = useState<Priority | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "#3b82f6",
  })
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [searchVisible, setSearchVisible] = useState(false) // State for search input visibility
  const [searchFilters, setSearchFilters] = useState({
    // State for search filters
    name: "",
    description: "",
  })

  const filteredPriorities = priorities.filter(
    (priority) =>
      priority.name.toLowerCase().includes(searchFilters.name.toLowerCase()) &&
      priority.description.toLowerCase().includes(searchFilters.description.toLowerCase()),
  )

  const selectedCount = priorities.filter((priority) => priority.selected).length
  const totalCount = priorities.length

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSearchFilterChange = (field: keyof typeof searchFilters, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [field]: value }))
  }

  const handleSearchToggle = (isVisible: boolean) => {
    setSearchVisible(isVisible)
    if (!isVisible) {
      setSearchFilters({ name: "", description: "" }) // Reset filters when hiding search
    }
  }

  const handleSave = () => {
    if (!formData.name.trim()) return

    if (editingItem) {
      setPriorities((prev) =>
        prev.map((priority) => (priority.id === editingItem.id ? { ...priority, ...formData } : priority)),
      )
      setToastMessage("Priority updated successfully!")
    } else {
      const newPriority: Priority = {
        id: Date.now().toString(),
        ...formData,
        selected: false,
      }
      setPriorities((prev) => [...prev, newPriority])
      setToastMessage("Priority created successfully!")
    }

    setFormData({ name: "", description: "", color: "#3b82f6" })
    setEditingItem(null)
    setShowModal(false)
    setShowToast(true)
  }

  const handleView = (priority: Priority) => {
    setViewingItem(priority)
    setShowViewModal(true)
  }

  const handleEdit = (priority: Priority) => {
    setEditingItem(priority)
    setFormData({
      name: priority.name,
      description: priority.description,
      color: priority.color,
    })
    setShowModal(true)
  }

  const handleDelete = (priorityId: string) => {
    setPriorities((prev) => prev.filter((priority) => priority.id !== priorityId))
    setToastMessage("Priority deleted successfully!")
    setShowToast(true)
  }

  const handleButtonClick = (type: string) => {
    if (type === "New Priority") {
      setShowModal(true)
    }
  }

  const modalContent = (
    <div className="space-y-4" style={{ fontFamily: "PT Sans, sans-serif" }}>
      <TextInput label="Name" name="name" value={formData.name} onChange={handleInputChange} required />
      <TextArea
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        rows={4}
      />
      <div>
        <label className="block text-sm font-medium mb-2">Color</label>
        <div className="flex items-center border rounded w-48 h-10 overflow-hidden">
          <input
            type="color"
            value={formData.color}
            onChange={(e) => setFormData((prev) => ({ ...prev, color: e.target.value }))}
            className="w-10 h-10 border-none p-0 m-0 cursor-pointer"
          />
          <TextInput
            label=""
            name="color"
            value={formData.color}
            onChange={handleInputChange}
            className="flex-1 h-full border-l px-2 rounded-none"
          />
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded border" style={{ backgroundColor: viewingItem.color }} />
          <span className="text-gray-600">{viewingItem.color}</span>
        </div>
      </div>
    </div>
  ) : null

  const tableColumns = [
    { label: "Actions", align: "left" as const },
    { label: "Name", align: "center" as const },
    { label: "Description", align: "center" as const },
    { label: "Color", align: "left" as const },
  ]

  return (
    <div className="space-y-6" style={{ fontFamily: "PT Sans, sans-serif" }}>
      {/* Search and Button aligned to the left */}
      <TopBar onSearchToggle={handleSearchToggle} onButtonClick={handleButtonClick} buttons={["New Priority"]} />

      {/* Priority Table */}
      <Card className="border-0">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <TableHead columns={tableColumns} />
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
                <td className="p-2 border-r border-gray-300">{/* Empty cell for Color column */}</td>
              </tr>
            )}
            <tbody>
              {filteredPriorities.length === 0 ? (
                <tr>
                  <td colSpan={tableColumns.length} className="p-8 text-center">
                    <NoDataFound message="No priorities found. Create your first priority to get started." />
                  </td>
                </tr>
              ) : (
                filteredPriorities.map((priority) => (
                  <tr key={priority.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 w-32">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(priority)}
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
                          onClick={() => handleEdit(priority)}
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
                          onClick={() => handleDelete(priority.id)}
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
                    <td className="p-4 font-medium w-1/4 text-gray-600">{priority.name}</td>
                    <td className="p-4 text-gray-600 w-2/4">{priority.description}</td>
                    <td className="p-4 w-1/4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded border" style={{ backgroundColor: priority.color }} />
                        <span className="text-sm text-gray-600">{priority.color}</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Selection Counter */}
      <div className="text-sm text-gray-600">
        {selectedCount} selected • 1-{totalCount} of {totalCount}
      </div>

      {/* Edit/Create Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingItem ? "Edit Priority" : "New Priority"}
        content={modalContent}
        showFooter={true}
        confirmText="Save"
        cancelText="Cancel"
        onConfirm={handleSave}
        onCancel={() => setShowModal(false)}
        confirmButtonClassName="bg-[#7991BB] text-white hover:bg-[#6a82a8]"
      />

      {/* View Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="View Priority"
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
