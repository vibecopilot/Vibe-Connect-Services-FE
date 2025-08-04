
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

interface Mode {
  id: string
  name: string
  description: string
}

interface ModeTabProps {
  searchQuery?: string
}

export default function ModeTab({ searchQuery: externalSearchQuery }: ModeTabProps) {
  const [modes, setModes] = useState<Mode[]>([
    { id: "1", name: "Email", description: "Tickets created via email" },
    { id: "2", name: "Phone", description: "Tickets created via phone call" },
  ])

  const [showModal, setShowModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [editingItem, setEditingItem] = useState<Mode | null>(null)
  const [viewingItem, setViewingItem] = useState<Mode | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  })
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [searchVisible, setSearchVisible] = useState(false) // State for search input visibility
  const [searchFilters, setSearchFilters] = useState({
    // State for search filters
    name: "",
    description: "",
  })

  const filteredModes = modes.filter(
    (mode) =>
      mode.name.toLowerCase().includes(searchFilters.name.toLowerCase()) &&
      mode.description.toLowerCase().includes(searchFilters.description.toLowerCase()),
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      setModes((prev) =>
        prev.map((mode) =>
          mode.id === editingItem.id ? { ...mode, name: formData.name, description: formData.description } : mode,
        ),
      )
      setToastMessage("Mode updated successfully!")
    } else {
      const newMode: Mode = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
      }
      setModes((prev) => [...prev, newMode])
      setToastMessage("Mode created successfully!")
    }

    setFormData({ name: "", description: "" })
    setEditingItem(null)
    setShowModal(false)
    setShowToast(true)
  }

  const handleView = (mode: Mode) => {
    setViewingItem(mode)
    setShowViewModal(true)
  }

  const handleEdit = (mode: Mode) => {
    setEditingItem(mode)
    setFormData({
      name: mode.name,
      description: mode.description,
    })
    setShowModal(true)
  }

  const handleDelete = (modeId: string) => {
    setModes((prev) => prev.filter((mode) => mode.id !== modeId))
    setToastMessage("Mode deleted successfully!")
    setShowToast(true)
  }

  const handleButtonClick = (type: string) => {
    if (type === "New Mode") {
      setShowModal(true)
    }
  }

  const columns = [
    { label: "Actions", align: "left" as const },
    { label: "Name", align: "center" as const },
    { label: "Description", align: "center" as const },
  ]

  const modalContent = (
    <div className="flex flex-col items-center space-y-4" style={{ fontFamily: "PT Sans, sans-serif" }}>
      <div className="w-full max-w-md space-y-4">
        <div className="text-left">
          <TextInput label="Name" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div className="text-left">
          <TextArea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
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
    </div>
  ) : null

  return (
    <div className="space-y-6" style={{ fontFamily: "PT Sans, sans-serif" }}>
      {/* Search and Button aligned to the left */}
      <TopBar onSearchToggle={handleSearchToggle} onButtonClick={handleButtonClick} buttons={["New Mode"]} />

      {/* Modes Table */}
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
              </tr>
            )}
            <tbody>
              {filteredModes.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="p-8 text-center">
                    <NoDataFound message="No modes found. Create your first mode to get started." />
                  </td>
                </tr>
              ) : (
                filteredModes.map((mode) => (
                  <tr key={mode.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 w-32">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(mode)}
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
                          onClick={() => handleEdit(mode)}
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
                          onClick={() => handleDelete(mode.id)}
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
                    <td className="p-4 font-medium w-1/3 text-center text-gray-600">{mode.name}</td>
                    <td className="p-4 text-gray-600 w-2/3 text-center">{mode.description}</td>
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
        title={editingItem ? "Edit Mode" : "New Mode"}
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
        title="View Mode"
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