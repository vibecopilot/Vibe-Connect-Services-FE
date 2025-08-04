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

interface WorklogType {
  id: string
  name: string
  description: string
}

interface WorklogTypeTabProps {
  searchQuery: string
}

export default function WorklogTypeTab({ searchQuery }: WorklogTypeTabProps) {
  const [worklogTypes, setWorklogTypes] = useState<WorklogType[]>([
    { id: "1", name: "Investigation", description: "Time spent investigating issues" },
    { id: "2", name: "Resolution", description: "Time spent resolving issues" },
  ])

  const [showModal, setShowModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [editingItem, setEditingItem] = useState<WorklogType | null>(null)
  const [viewingItem, setViewingItem] = useState<WorklogType | null>(null)
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

  const filteredWorklogTypes = worklogTypes.filter((type) => {
    const matchesName = type.name.toLowerCase().includes(searchFilters.name.toLowerCase())
    const matchesDescription = type.description.toLowerCase().includes(searchFilters.description.toLowerCase())
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
      setWorklogTypes((prev) =>
        prev.map((type) =>
          type.id === editingItem.id ? { ...type, name: formData.name, description: formData.description } : type,
        ),
      )
      setToastMessage("Worklog type updated successfully!")
    } else {
      const newWorklogType: WorklogType = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
      }
      setWorklogTypes((prev) => [...prev, newWorklogType])
      setToastMessage("Worklog type created successfully!")
    }

    setFormData({ name: "", description: "" })
    setEditingItem(null)
    setShowModal(false)
    setShowToast(true)
  }

  const handleView = (worklogType: WorklogType) => {
    setViewingItem(worklogType)
    setShowViewModal(true)
  }

  const handleEdit = (worklogType: WorklogType) => {
    setEditingItem(worklogType)
    setFormData({
      name: worklogType.name,
      description: worklogType.description,
    })
    setShowModal(true)
  }

  const handleDelete = (worklogTypeId: string) => {
    setWorklogTypes((prev) => prev.filter((type) => type.id !== worklogTypeId))
    setToastMessage("Worklog type deleted successfully!")
    setShowToast(true)
  }

  const handleButtonClick = (type: string) => {
    if (type === "New Worklog Type") {
      setShowModal(true)
    }
  }

  const tableColumns = [
    { label: "Actions", align: "left" as const },
    { label: "Name", align: "center" as const },
    { label: "Description", align: "center" as const },
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

  return (
    <div className="space-y-6" style={{ fontFamily: "PT Sans, sans-serif" }}>
      {/* Search and Button aligned to the left */}
      <div className="flex items-center gap-4">
        <SearchableTopBar
          onButtonClick={handleButtonClick}
          buttons={["New Worklog Type"]}
          onSearchToggle={handleSearchToggle}
        />
      </div>

      {/* Worklog Types Table */}
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
              {filteredWorklogTypes.length === 0 ? (
                <tr>
                  <td colSpan={tableColumns.length} className="p-8 text-center">
                    <NoDataFound message="No worklog types found. Create your first worklog type to get started." />
                  </td>
                </tr>
              ) : (
                filteredWorklogTypes.map((type) => (
                  <tr key={type.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 w-32 border-r border-gray-300">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(type)}
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
                          onClick={() => handleEdit(type)}
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
                          onClick={() => handleDelete(type.id)}
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
                      {type.name}
                    </td>
                    <td className="p-4 text-gray-600 w-2/3 text-center border-r border-gray-300">{type.description}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingItem ? "Edit Worklog Type" : "New Worklog Type"}
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
        title="View Worklog Type"
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
