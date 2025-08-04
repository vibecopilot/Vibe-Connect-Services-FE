import type React from "react"

import { useState } from "react"
import { Card } from "../components/Card"
import Modal from "../components/Modal"
import TextInput from "../components/TextInput"
import TextArea from "../components/TextArea"
import NotificationToaster from "../components/NotificationToaster"
import NoDataFound from "../components/NoDataFound"
import TopBar from "../components/TopBar" // Using the modified TopBar
import TableHead from "../components/TopHead"

interface Urgency {
  id: string
  name: string
  description: string
  selected: boolean
}

interface UrgencyTabProps {
  searchQuery: string
}

export default function UrgencyTab({ searchQuery }: UrgencyTabProps) {
  const [urgencies, setUrgencies] = useState<Urgency[]>([
    { id: "1", name: "Critical", description: "Requires immediate attention", selected: false },
    { id: "2", name: "High", description: "High urgency issue", selected: false },
    { id: "3", name: "Medium", description: "Medium urgency issue", selected: false },
    { id: "4", name: "Low", description: "Low urgency issue", selected: false },
  ])

  const [showModal, setShowModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [editingItem, setEditingItem] = useState<Urgency | null>(null)
  const [viewingItem, setViewingItem] = useState<Urgency | null>(null)
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

  const filteredUrgencies = urgencies.filter(
    (urgency) =>
      urgency.name.toLowerCase().includes(searchFilters.name.toLowerCase()) &&
      urgency.description.toLowerCase().includes(searchFilters.description.toLowerCase()),
  )

  const selectedCount = urgencies.filter((urgency) => urgency.selected).length
  const totalCount = urgencies.length

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
      setUrgencies((prev) =>
        prev.map((urgency) =>
          urgency.id === editingItem.id
            ? { ...urgency, name: formData.name, description: formData.description }
            : urgency,
        ),
      )
      setToastMessage("Urgency updated successfully!")
    } else {
      const newUrgency: Urgency = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        selected: false,
      }
      setUrgencies((prev) => [...prev, newUrgency])
      setToastMessage("Urgency created successfully!")
    }

    setFormData({ name: "", description: "" })
    setEditingItem(null)
    setShowModal(false)
    setShowToast(true)
  }

  const handleView = (urgency: Urgency) => {
    setViewingItem(urgency)
    setShowViewModal(true)
  }

  const handleEdit = (urgency: Urgency) => {
    setEditingItem(urgency)
    setFormData({
      name: urgency.name,
      description: urgency.description,
    })
    setShowModal(true)
  }

  const handleDelete = (urgencyId: string) => {
    setUrgencies((prev) => prev.filter((urgency) => urgency.id !== urgencyId))
    setToastMessage("Urgency deleted successfully!")
    setShowToast(true)
  }

  const handleButtonClick = (type: string) => {
    if (type === "New Urgency") {
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
    </div>
  )

  const viewModalContent = viewingItem ? (
    <div className="space-y-4" style={{ fontFamily: "PT Sans, sans-serif" }}>
      <TextInput 
        label="Name" 
        name="viewName" 
        value={viewingItem.name} 
        onChange={() => {}} 
        readOnly 
      />
      <TextArea
        label="Description"
        name="viewDescription"
        value={viewingItem.description}
        onChange={() => {}}
        rows={4}
        readOnly
      />
    </div>
  ) : null

  const tableColumns = [
    { label: "Actions", align: "left" as const },
    { label: "Name", align: "center" as const },
    { label: "Description", align: "center" as const },
  ]

  return (
    <div className="space-y-6" style={{ fontFamily: "PT Sans, sans-serif" }}>
      {/* Search and Button aligned to the left */}
      <TopBar onSearchToggle={handleSearchToggle} onButtonClick={handleButtonClick} buttons={["New Urgency"]} />

      {/* Urgency Table */}
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
              </tr>
            )}
            <tbody>
              {filteredUrgencies.length === 0 ? (
                <tr>
                  <td colSpan={tableColumns.length} className="p-8 text-center">
                    <NoDataFound message="No urgencies found. Create your first urgency to get started." />
                  </td>
                </tr>
              ) : (
                filteredUrgencies.map((urgency) => (
                  <tr key={urgency.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 w-32">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(urgency)}
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
                          onClick={() => handleEdit(urgency)}
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
                          onClick={() => handleDelete(urgency.id)}
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
                    <td className="p-4 font-medium w-1/3 text-gray-600">{urgency.name}</td>
                    <td className="p-4 text-gray-600 w-2/3">{urgency.description}</td>
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
        title={editingItem ? "Edit Urgency" : "New Urgency"}
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
        title="View Urgency"
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