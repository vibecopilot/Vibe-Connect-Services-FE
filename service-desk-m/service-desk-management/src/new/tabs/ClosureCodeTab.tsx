
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

interface ClosureCode {
  id: string
  name: string
  description: string
}

interface ClosureCodeTabProps {
  searchQuery: string
}

export default function ClosureCodeTab({ searchQuery }: ClosureCodeTabProps) {
  const [closureCodes, setClosureCodes] = useState<ClosureCode[]>([
    { id: "1", name: "Resolved", description: "Issue has been resolved" },
    { id: "2", name: "Duplicate", description: "Duplicate of another ticket" },
  ])

  const [showModal, setShowModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [editingItem, setEditingItem] = useState<ClosureCode | null>(null)
  const [viewingItem, setViewingItem] = useState<ClosureCode | null>(null)
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

  const filteredClosureCodes = closureCodes.filter(
    (code) =>
      code.name.toLowerCase().includes(searchFilters.name.toLowerCase()) &&
      code.description.toLowerCase().includes(searchFilters.description.toLowerCase()),
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

  const handleButtonClick = (type: string) => {
    if (type === "New Closure Code") {
      setShowModal(true)
    }
  }

  const handleSave = () => {
    if (!formData.name.trim()) return

    if (editingItem) {
      setClosureCodes((prev) =>
        prev.map((code) =>
          code.id === editingItem.id ? { ...code, name: formData.name, description: formData.description } : code,
        ),
      )
      setToastMessage("Closure code updated successfully!")
    } else {
      const newClosureCode: ClosureCode = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
      }
      setClosureCodes((prev) => [...prev, newClosureCode])
      setToastMessage("Closure code created successfully!")
    }

    setFormData({ name: "", description: "" })
    setEditingItem(null)
    setShowModal(false)
    setShowToast(true)
  }

  const handleView = (closureCode: ClosureCode) => {
    setViewingItem(closureCode)
    setShowViewModal(true)
  }

  const handleEdit = (closureCode: ClosureCode) => {
    setEditingItem(closureCode)
    setFormData({
      name: closureCode.name,
      description: closureCode.description,
    })
    setShowModal(true)
  }

  const handleDelete = (closureCodeId: string) => {
    setClosureCodes((prev) => prev.filter((code) => code.id !== closureCodeId))
    setToastMessage("Closure code deleted successfully!")
    setShowToast(true)
  }

  const tableColumns = [
    { label: "Actions", align: "center" as const },
    { label: "Name", align: "left" as const },
    { label: "Description", align: "left" as const },
  ]

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
      <TopBar onSearchToggle={handleSearchToggle} onButtonClick={handleButtonClick} buttons={["New Closure Code"]} />

      {/* Closure Codes Table */}
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
              {filteredClosureCodes.length === 0 ? (
                <tr>
                  <td colSpan={tableColumns.length} className="p-8 text-center">
                    <NoDataFound message="No closure codes found. Create your first closure code to get started." />
                  </td>
                </tr>
              ) : (
                filteredClosureCodes.map((code) => (
                  <tr key={code.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleView(code)}
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
                          onClick={() => handleEdit(code)}
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
                          onClick={() => handleDelete(code.id)}
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
                    <td className="p-4 font-medium text-left text-gray-600">{code.name}</td>
                    <td className="p-4 text-gray-600 text-left">{code.description}</td>
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
        title={editingItem ? "Edit Closure Code" : "New Closure Code"}
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
        title="View Closure Code"
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
