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

interface RequestType {
  id: string
  name: string
  description: string
}

interface RequestTypeTabProps {
  searchQuery: string
}

export default function RequestTypeTab({ searchQuery: initialSearchQuery }: RequestTypeTabProps) {
  const [requestTypes, setRequestTypes] = useState<RequestType[]>([
    { id: "1", name: "Service Request", description: "Regular Service Requests" },
    { id: "2", name: "Incident", description: "Faults and error" },
    { id: "3", name: "Major Incident", description: "Critical issue or error needing immediate attention" },
    { id: "4", name: "Request for Information", description: "Help, How To's" },
  ])

  const [showModal, setShowModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [editingItem, setEditingItem] = useState<RequestType | null>(null)
  const [viewingItem, setViewingItem] = useState<RequestType | null>(null)
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

  const columns = [
    { label: "Action", align: "center" as const },
    { label: "Name", align: "center" as const },
    { label: "Description", align: "center" as const },
  ]

  const buttons = ["New Request Type"]

  const filteredRequestTypes = requestTypes.filter(
    (type) =>
      type.name.toLowerCase().includes(searchFilters.name.toLowerCase()) &&
      type.description.toLowerCase().includes(searchFilters.description.toLowerCase()),
  )

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
    if (type === "New Request Type") {
      setEditingItem(null) // Clear editing item for new request
      setFormData({ name: "", description: "" }) // Clear form data
      setShowModal(true)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    if (!formData.name.trim()) return

    if (editingItem) {
      setRequestTypes((prev) =>
        prev.map((type) =>
          type.id === editingItem.id ? { ...type, name: formData.name, description: formData.description } : type,
        ),
      )
      setToastMessage("Request type updated successfully!")
    } else {
      const newRequestType: RequestType = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
      }
      setRequestTypes((prev) => [...prev, newRequestType])
      setToastMessage("Request type created successfully!")
    }

    setFormData({ name: "", description: "" })
    setEditingItem(null)
    setShowModal(false)
    setShowToast(true)
  }

  const handleView = (requestType: RequestType) => {
    setViewingItem(requestType)
    setShowViewModal(true)
  }

  const handleEdit = (requestType: RequestType) => {
    setEditingItem(requestType)
    setFormData({
      name: requestType.name,
      description: requestType.description,
    })
    setShowModal(true)
  }

  const handleDelete = (requestTypeId: string) => {
    setRequestTypes((prev) => prev.filter((type) => type.id !== requestTypeId))
    setToastMessage("Request type deleted successfully!")
    setShowToast(true)
  }

 const modalContent = (
  <div className="space-y-4 text-left" style={{ fontFamily: "PT Sans, sans-serif" }}>
    <TextInput 
      label="Name" 
      name="name" 
      value={formData.name} 
      onChange={handleInputChange} 
      required 
      className="text-left"
      // labelClassName="text-left"
    />
    <TextArea
      label="Description"
      name="description"
      value={formData.description}
      onChange={handleInputChange}
      rows={4}
      className="text-left"
      // labelClassName="text-left"
    />
  </div>
)

const viewModalContent = viewingItem ? (
  <div className="space-y-4 text-left" style={{ fontFamily: "PT Sans, sans-serif" }}>
    <TextInput 
      label="Name" 
      name="viewName" 
      value={viewingItem.name} 
      onChange={() => {}} 
      readOnly
      className="bg-gray-50 text-left"
      // labelClassName="text-left"
    />
    <TextArea
      label="Description"
      name="viewDescription"
      value={viewingItem.description}
      onChange={() => {}} 
      rows={4}
      readOnly
      className="bg-gray-50 text-left"
      // labelClassName="text-left"
    />
  </div>
) : null


  return (
    <div className="space-y-6" style={{ fontFamily: "PT Sans, sans-serif" }}>
      {/* Search and Button aligned to the left */}
      <TopBar onSearchToggle={handleSearchToggle} onButtonClick={handleButtonClick} buttons={buttons} />

      {/* Request Types Table */}
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
              {filteredRequestTypes.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="p-8 text-center">
                    <NoDataFound message="No request types found. Create your first request type to get started." />
                  </td>
                </tr>
              ) : (
                filteredRequestTypes.map((type) => (
                  <tr key={type.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 w-32">
                      <div className="flex gap-2 justify-center">
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
                    <td className="p-3 font-medium text-gray-600">{type.name}</td>
                    <td className="p-3 text-gray-600">{type.description}</td>
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
        title={editingItem ? "Edit Request Type" : "New Request Type"}
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
        title="View Request Type"
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