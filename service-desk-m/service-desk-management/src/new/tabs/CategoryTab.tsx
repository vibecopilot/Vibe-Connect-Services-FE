import type React from "react"

import { useState } from "react"
import { Card } from "../components/Card"
import Modal from "../components/Modal"
import TextInput from "../components/TextInput"
import TextArea from "../components/TextArea"
import Select from "../components/Select"
import NotificationToaster from "../components/NotificationToaster"
import NoDataFound from "../components/NoDataFound"
import TableHead from "../components/TopHead"
import SearchableTopBar from "../components/SearchableTopBar" // Using the modified SearchableTopBar

interface Category {
  id: string
  name: string
  description: string
  technician: string
}

interface CategoryTabProps {
  searchQuery: string
}

export default function CategoryTab({ searchQuery }: CategoryTabProps) {
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Hardware", description: "Hardware related issues", technician: "Rohan" },
    { id: "2", name: "Software", description: "Software related issues", technician: "Rajwant" },
  ])

  const [showModal, setShowModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [modalType, setModalType] = useState<"category" | "subcategory" | "item">("category")
  const [editingItem, setEditingItem] = useState<Category | null>(null)
  const [viewingItem, setViewingItem] = useState<Category | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    technician: "",
  })
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [searchVisible, setSearchVisible] = useState(false)
  const [searchFilters, setSearchFilters] = useState({
    name: "",
    description: "",
    technician: "",
  })

  const technicians = ["Rohan", "Rahul", "Mohit", "Suraj"]

  // TopBar button configuration
  const topBarButtons = ["New Category", "New Sub Category", "New Item", "Tree View"]

  // Table columns configuration
  const tableColumns = [
    { label: "Actions", align: "left" as const },
    { label: "Name", align: "center" as const },
    { label: "Description", align: "center" as const },
    { label: "Technician", align: "center" as const },
  ]

  const filteredCategories = categories.filter((category) => {
    const matchesName = category.name.toLowerCase().includes(searchFilters.name.toLowerCase())
    const matchesDescription = category.description.toLowerCase().includes(searchFilters.description.toLowerCase())
    const matchesTechnician = category.technician.toLowerCase().includes(searchFilters.technician.toLowerCase())

    return matchesName && matchesDescription && matchesTechnician
  })

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
      setSearchFilters({ name: "", description: "", technician: "" })
    }
  }

  const handleButtonClick = (buttonType: string) => {
    switch (buttonType) {
      case "New Category":
        openModal("category")
        break
      case "New Sub Category":
        openModal("subcategory")
        break
      case "New Item":
        openModal("item")
        break
      case "Tree View":
        console.log("Tree View clicked")
        break
      default:
        break
    }
  }

  const handleSave = () => {
    if (!formData.name.trim()) return

    if (editingItem) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingItem.id
            ? { ...cat, name: formData.name, description: formData.description, technician: formData.technician }
            : cat,
        ),
      )
      setToastMessage("Category updated successfully!")
    } else {
      const newCategory: Category = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        technician: formData.technician,
      }
      setCategories((prev) => [...prev, newCategory])
      setToastMessage(`${modalType} created successfully!`)
    }

    setFormData({ name: "", description: "", technician: "" })
    setEditingItem(null)
    setShowModal(false)
    setShowToast(true)
  }

  const handleSaveAndAdd = () => {
    if (!formData.name.trim()) return

    const newCategory: Category = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      technician: formData.technician,
    }
    setCategories((prev) => [...prev, newCategory])
    setToastMessage(`${modalType} created successfully!`)

    setFormData({ name: "", description: "", technician: "" })
    setShowToast(true)
  }

  const handleView = (category: Category) => {
    setViewingItem(category)
    setShowViewModal(true)
  }

  const handleEdit = (category: Category) => {
    setEditingItem(category)
    setFormData({
      name: category.name,
      description: category.description,
      technician: category.technician,
    })
    setModalType("category")
    setShowModal(true)
  }

  const handleDelete = (categoryId: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== categoryId))
    setToastMessage("Category deleted successfully!")
    setShowToast(true)
  }

  const openModal = (type: "category" | "subcategory" | "item") => {
    setModalType(type)
    setEditingItem(null)
    setFormData({ name: "", description: "", technician: "" })
    setShowModal(true)
  }

  const modalContent = (
    <div className="space-y-4" style={{ fontFamily: "PT Sans, sans-serif" }}>
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

      <div className="text-left">
        <Select
          label="Assign to Technician"
          name="technician"
          value={formData.technician}
          onChange={handleInputChange}
          options={technicians}
          placeholder="Select Technician"
        />
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Technician</label>
        <p className="text-gray-600">{viewingItem.technician}</p>
      </div>
    </div>
  ) : null

  const shouldShowSaveAndAdd = (modalType === "category" || modalType === "subcategory") && !editingItem

  return (
    <div className="space-y-6" style={{ fontFamily: "PT Sans, sans-serif" }}>
      {/* SearchableTopBar with Search and Action Buttons */}
      <SearchableTopBar onButtonClick={handleButtonClick} buttons={topBarButtons} onSearchToggle={handleSearchToggle} />

      {/* Categories Table */}
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
                <td className="p-2 border-r border-gray-300">
                  <TextInput
                    label=""
                    name="technicianSearch"
                    value={searchFilters.technician}
                    onChange={(e) => handleSearchFilterChange("technician", e.target.value)}
                    className="text-sm"
                    placeholder="Search Technician..."
                  />
                </td>
              </tr>
            )}
            <tbody>
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={tableColumns.length} className="p-8 text-center">
                    <NoDataFound message="No categories found. Create your first category to get started." />
                  </td>
                </tr>
              ) : (
                filteredCategories.map((category) => (
                  <tr key={category.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 w-32 border-r border-gray-300">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(category)}
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
                          onClick={() => handleEdit(category)}
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
                          onClick={() => handleDelete(category.id)}
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
                      {category.name}
                    </td>
                    <td className="p-4 text-gray-600 w-2/4 text-center border-r border-gray-300">
                      {category.description}
                    </td>
                    <td className="p-4 w-1/4 text-center text-gray-600 border-r border-gray-300">
                      {category.technician}
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
        title={editingItem ? `Edit ${modalType}` : `New ${modalType.charAt(0).toUpperCase() + modalType.slice(1)}`}
        content={modalContent}
        showFooter={true}
        confirmText="Save"
        cancelText="Cancel"
        onConfirm={handleSave}
        onCancel={() => setShowModal(false)}
        confirmButtonClassName="bg-[#7991BB] text-white hover:bg-[#6a82a8]"
        cancelButtonClassName="text-gray-700 border border-gray-300 hover:bg-gray-100"
        showSaveAndAddButton={shouldShowSaveAndAdd}
        onSaveAndAdd={handleSaveAndAdd}
        saveAndAddText={modalType === "category" ? "Save and Add Sub Category" : "Save and Add Item"}
      />

      {/* View Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="View Category"
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
