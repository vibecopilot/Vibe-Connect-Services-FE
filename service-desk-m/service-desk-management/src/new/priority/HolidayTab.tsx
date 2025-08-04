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
import TopBar from "../components/TopBar" // Using the modified TopBar

interface HolidayGroup {
  id: string
  name: string
  description: string
  appliesTo: string
  totalHolidays: number
  isDefault: boolean
  selected: boolean
}

interface HolidayTabProps {
  searchQuery: string
}

export default function HolidayTab({ searchQuery }: HolidayTabProps) {
  const [holidayGroups, setHolidayGroups] = useState<HolidayGroup[]>([
    {
      id: "1",
      name: "Default Holiday Group",
      description: "Holiday configuration for all sites and groups",
      appliesTo: "Base Site",
      totalHolidays: 2,
      isDefault: true,
      selected: false,
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [editingGroup, setEditingGroup] = useState<HolidayGroup | null>(null)
  const [viewingGroup, setViewingGroup] = useState<HolidayGroup | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    appliesTo: "",
  })
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    appliesTo: "",
  })
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [searchVisible, setSearchVisible] = useState(false) // State for search input visibility
  const [searchFilters, setSearchFilters] = useState({
    // State for search filters
    name: "",
    appliesTo: "",
    totalHolidays: "",
  })

  const siteOptions = ["Base Site", "DataCenter, FL", "HeadQuarters, NY", "IDC, SA"]

  const tableColumns = [
    {
      key: "actions",
      label: "Actions",
      width: "w-1/6",
      align: "center" as const,
    },
    {
      key: "name",
      label: "Name",
      width: "w-2/5",
      align: "center" as const,
    },
    {
      key: "appliesTo",
      label: "Applies To",
      width: "w-1/4",
      align: "center" as const,
    },
    {
      key: "totalHolidays",
      label: "Total Holidays",
      width: "w-1/6",
      align: "center" as const,
    },
  ]

  const filteredHolidayGroups = holidayGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchFilters.name.toLowerCase()) &&
      group.appliesTo.toLowerCase().includes(searchFilters.appliesTo.toLowerCase()) &&
      group.totalHolidays.toString().includes(searchFilters.totalHolidays),
  )

  const selectedCount = holidayGroups.filter((group) => group.selected).length
  const totalCount = holidayGroups.length

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEditFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSearchFilterChange = (field: keyof typeof searchFilters, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [field]: value }))
  }

  const handleSearchToggle = (isVisible: boolean) => {
    setSearchVisible(isVisible)
    if (!isVisible) {
      setSearchFilters({ name: "", appliesTo: "", totalHolidays: "" }) // Reset filters when hiding search
    }
  }

  const handleView = (group: HolidayGroup) => {
    setViewingGroup(group)
    setShowViewModal(true)
  }

  const handleEdit = (group: HolidayGroup) => {
    setEditingGroup(group)
    setEditFormData({
      name: group.name,
      description: group.description,
      appliesTo: group.appliesTo,
    })
    setShowEditModal(true)
  }

  const handleDelete = (groupId: string) => {
    setHolidayGroups((prev) => prev.filter((group) => group.id !== groupId))
    setToastMessage("Holiday group deleted successfully!")
    setShowToast(true)
  }

  const handleSave = () => {
    if (!formData.name.trim()) return

    const newHolidayGroup: HolidayGroup = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      appliesTo: formData.appliesTo,
      totalHolidays: 0,
      isDefault: false,
      selected: false,
    }

    setHolidayGroups((prev) => [...prev, newHolidayGroup])
    setFormData({ name: "", description: "", appliesTo: "" })
    setShowModal(false)
    setToastMessage("Holiday group created successfully!")
    setShowToast(true)
  }

  const handleEditSave = () => {
    if (!editFormData.name.trim() || !editingGroup) return

    setHolidayGroups((prev) =>
      prev.map((group) =>
        group.id === editingGroup.id
          ? {
              ...group,
              name: editFormData.name,
              description: editFormData.description,
              appliesTo: editFormData.appliesTo,
            }
          : group,
      ),
    )

    setShowEditModal(false)
    setEditingGroup(null)
    setEditFormData({ name: "", description: "", appliesTo: "" })
    setToastMessage("Holiday group updated successfully!")
    setShowToast(true)
  }

  const modalContent = (
    <div className="space-y-4" style={{ fontFamily: "PT Sans, sans-serif" }}>
      <TextInput label="Name*" name="name" value={formData.name} onChange={handleInputChange} required />
      <TextArea
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        rows={4}
      />
      <div>
        <label className="block text-sm font-medium mb-2 text-black-600">Applies to*</label>
        <Select
          name="appliesTo"
          value={formData.appliesTo}
          onChange={handleInputChange}
          options={siteOptions}
          placeholder="Select sites..."
        />
      </div>
    </div>
  )

  const editModalContent = (
    <div className="space-y-4" style={{ fontFamily: "PT Sans, sans-serif" }}>
      <TextInput label="Name*" name="name" value={editFormData.name} onChange={handleEditInputChange} required />
      <TextArea
        label="Description"
        name="description"
        value={editFormData.description}
        onChange={handleEditInputChange}
        rows={4}
      />
      <div>
        <label className="block text-sm font-medium mb-2 text-black-600">Applies to*</label>
        <Select
          name="appliesTo"
          value={editFormData.appliesTo}
          onChange={handleEditInputChange}
          options={siteOptions}
          placeholder="Select sites..."
        />
      </div>
    </div>
  )

  const viewModalContent = viewingGroup ? (
    <div className="space-y-4" style={{ fontFamily: "PT Sans, sans-serif" }}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <p className="text-gray-600">{viewingGroup.name}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <p className="text-gray-600">{viewingGroup.description}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Applies To</label>
        <p className="text-gray-600">{viewingGroup.appliesTo}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Total Holidays</label>
        <p className="text-gray-600">{viewingGroup.totalHolidays}</p>
      </div>
    </div>
  ) : null

  return (
    <div className="space-y-6" style={{ fontFamily: "PT Sans, sans-serif" }}>
      {/* Action Buttons and Search */}
      <TopBar onSearchToggle={handleSearchToggle} onButtonClick={() => setShowModal(true)} buttons={["New Group"]} />

      {/* Holiday Groups Table */}
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
                    name="appliesToSearch"
                    value={searchFilters.appliesTo}
                    onChange={(e) => handleSearchFilterChange("appliesTo", e.target.value)}
                    className="text-sm"
                    placeholder="Search Applies To..."
                  />
                </td>
                <td className="p-2 border-r border-gray-300">
                  <TextInput
                    label=""
                    name="totalHolidaysSearch"
                    value={searchFilters.totalHolidays}
                    onChange={(e) => handleSearchFilterChange("totalHolidays", e.target.value)}
                    className="text-sm"
                    placeholder="Search Total Holidays..."
                  />
                </td>
              </tr>
            )}
            <tbody>
              {filteredHolidayGroups.length === 0 ? (
                <tr>
                  <td colSpan={tableColumns.length} className="p-8 text-center">
                    <NoDataFound message="No holiday groups found. Create your first holiday group to get started." />
                  </td>
                </tr>
              ) : (
                filteredHolidayGroups.map((group) => (
                  <tr key={group.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 w-1/6 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleView(group)}
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
                          onClick={() => handleEdit(group)}
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
                          onClick={() => handleDelete(group.id)}
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
                    <td className="p-4 w-2/5 text-center">
                      <div>
                        <div className="font-medium text-gray-600">{group.name}</div>
                        <div className="text-sm text-gray-600">{group.description}</div>
                      </div>
                    </td>
                    <td className="p-4 w-1/4 text-center text-gray-600">{group.appliesTo}</td>
                    <td className="p-4 w-1/6 text-center text-gray-600">{group.totalHolidays}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Bottom Controls */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {selectedCount} selected • 1-{totalCount} of {totalCount}
        </div>
      </div>

      {/* New Group Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="New Holiday Group"
        content={modalContent}
        showFooter={true}
        confirmText="Save"
        cancelText="Cancel"
        onConfirm={handleSave}
        onCancel={() => setShowModal(false)}
        confirmButtonClassName="bg-[#7991BB] text-white hover:bg-[#6a82a8]"
      />

      {/* Edit Group Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Holiday Group"
        content={editModalContent}
        showFooter={true}
        confirmText="Save"
        cancelText="Cancel"
        onConfirm={handleEditSave}
        onCancel={() => setShowEditModal(false)}
        confirmButtonClassName="bg-[#7991BB] text-white hover:bg-[#6a82a8]"
      />

      {/* View Group Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="View Holiday Group"
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