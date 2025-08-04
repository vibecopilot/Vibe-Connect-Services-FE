import type React from "react"

import { useState } from "react"
import { Card } from "../components/Card"
import Modal from "../components/Modal"
import TextInput from "../components/TextInput"
import TextArea from "../components/TextArea"
import NotificationToaster from "../components/NotificationToaster"
import NoDataFound from "../components/NoDataFound"
import TableHead from "../components/TopHead"
import SearchableTopBar from "../components/SearchableTopBar" // Using the modified SearchableTopBar
// import Pagination from "../components/Pagination"

interface Level {
  id: string
  name: string
  description: string
}

interface LevelTabProps {
  searchQuery: string
}

export default function LevelTab({ searchQuery }: LevelTabProps) {
  const [levels, setLevels] = useState<Level[]>([
    { id: "1", name: "Level 1", description: "First level support" },
    { id: "2", name: "Level 2", description: "Second level support" },
  ])

  const [showModal, setShowModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [editingItem, setEditingItem] = useState<Level | null>(null)
  const [viewingItem, setViewingItem] = useState<Level | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  })
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [searchVisible, setSearchVisible] = useState(false)
  const [searchFilters, setSearchFilters] = useState({
    name: "",
    description: "",
  })
  const [currentPage, setCurrentPage] = useState(1)

  const filteredLevels = levels.filter((level) => {
    const matchesName = level.name.toLowerCase().includes(searchFilters.name.toLowerCase())
    const matchesDescription = level.description.toLowerCase().includes(searchFilters.description.toLowerCase())
    return matchesName && matchesDescription
  })

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
      setSearchFilters({ name: "", description: "" })
    }
  }

  const handleSave = () => {
    if (!formData.name.trim()) return

    if (editingItem) {
      setLevels((prev) =>
        prev.map((level) =>
          level.id === editingItem.id ? { ...level, name: formData.name, description: formData.description } : level,
        ),
      )
      setToastMessage("Level updated successfully!")
    } else {
      const newLevel: Level = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
      }
      setLevels((prev) => [...prev, newLevel])
      setToastMessage("Level created successfully!")
    }

    setFormData({ name: "", description: "" })
    setEditingItem(null)
    setShowModal(false)
    setShowToast(true)
  }

  const handleView = (level: Level) => {
    setViewingItem(level)
    setShowViewModal(true)
  }

  const handleEdit = (level: Level) => {
    setEditingItem(level)
    setFormData({
      name: level.name,
      description: level.description,
    })
    setShowModal(true)
  }

  const handleDelete = (levelId: string) => {
    setLevels((prev) => prev.filter((level) => level.id !== levelId))
    setToastMessage("Level deleted successfully!")
    setShowToast(true)
  }

  const handleButtonClick = (buttonType: string) => {
    if (buttonType === "New Level") {
      setShowModal(true)
    }
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
    </div>
  )

  const viewModalContent = viewingItem ? (
    <div className="space-y-4 text-left" style={{ fontFamily: "PT Sans, sans-serif" }}>
      <TextInput label="Name" name="name" value={viewingItem.name} onChange={() => {}} disabled />
      <TextArea
        label="Description"
        name="description"
        value={viewingItem.description}
        onChange={() => {}}
        rows={4}
        disabled
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
      <div className="flex items-center gap-4">
        <SearchableTopBar
          onButtonClick={handleButtonClick}
          buttons={["New Level"]}
          onSearchToggle={handleSearchToggle}
        />
      </div>

    

      {/* Levels Table */}
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
              {filteredLevels.length === 0 ? (
                <tr>
                  <td colSpan={tableColumns.length} className="p-8 text-center">
                    <NoDataFound message="No levels found. Create your first level to get started." />
                  </td>
                </tr>
              ) : (
                filteredLevels.map((level) => (
                  <tr key={level.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 w-32 border-r border-gray-300">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(level)}
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
                          onClick={() => handleEdit(level)}
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
                          onClick={() => handleDelete(level.id)}
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
                    <td className="p-4 font-medium w-1/3 text-center text-gray-600 border-r border-gray-300">
                      {level.name}
                    </td>
                    <td className="p-4 text-gray-600 w-2/3 text-center border-r border-gray-300">
                      {level.description}
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
        title={editingItem ? "Edit Level" : "New Level"}
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
        title="View Level"
        content={viewModalContent}
        showFooter={false}
        cancelText="Close"
        onCancel={() => setShowViewModal(false)}
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