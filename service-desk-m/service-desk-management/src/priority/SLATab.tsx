import type React from "react"

import { useState } from "react"
import { Card } from "../components/Card"
import Modal from "../components/Modal"
import TextInput from "../components/TextInput"
import TextArea from "../components/TextArea"
import ToggleSwitch from "../components/ToggleSwitch"
import NotificationToaster from "../components/NotificationToaster"
import NoDataFound from "../components/NoDataFound"
import TableHead from "../components/TopHead"
import { Edit, Trash2, Eye } from "lucide-react"
import TopBar from "../components/TopBar" // Using the modified TopBar

interface SLA {
  id: string
  name: string
  description: string
  responseTime: string
  resolutionTime: string
  status: boolean
  selected: boolean
}

interface SLATabProps {
  searchQuery: string
}

export default function SLATab({ searchQuery }: SLATabProps) {
  const [slas, setSlas] = useState<SLA[]>([
    {
      id: "1",
      name: "High SLA",
      description: "Default SLA for priority High",
      responseTime: "0 Days - 0 Hours - 0 Minutes",
      resolutionTime: "0 Days - 1 Hours - 0 Minutes",
      status: true,
      selected: false,
    },
    {
      id: "2",
      name: "Medium SLA",
      description: "Default SLA for priority Medium",
      responseTime: "0 Days - 0 Hours - 0 Minutes",
      resolutionTime: "0 Days - 2 Hours - 0 Minutes",
      status: true,
      selected: false,
    },
    {
      id: "3",
      name: "Normal SLA",
      description: "Default SLA for priority Normal",
      responseTime: "0 Days - 0 Hours - 0 Minutes",
      resolutionTime: "0 Days - 4 Hours - 0 Minutes",
      status: true,
      selected: false,
    },
    {
      id: "4",
      name: "Low SLA",
      description: "Default SLA for priority Low",
      responseTime: "0 Days - 0 Hours - 0 Minutes",
      resolutionTime: "0 Days - 8 Hours - 0 Minutes",
      status: true,
      selected: false,
    },
    {
      id: "5",
      name: "electrical",
      description: "electrical",
      responseTime: "0 Days - 0 Hours - 5 Minutes",
      resolutionTime: "0 Days - 4 Hours - 0 Minutes",
      status: true,
      selected: false,
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [editingSLA, setEditingSLA] = useState<SLA | null>(null)
  const [viewingSLA, setViewingSLA] = useState<SLA | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    responseTime: "",
    resolutionTime: "",
  })
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    responseTime: "",
    resolutionTime: "",
  })
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [searchVisible, setSearchVisible] = useState(false)
  const [searchFilters, setSearchFilters] = useState({
    name: "",
    description: "",
  })

  const filteredSLAs = slas.filter(
    (sla) =>
      sla.name.toLowerCase().includes(searchFilters.name.toLowerCase()) &&
      sla.description.toLowerCase().includes(searchFilters.description.toLowerCase()),
  )

  const selectedCount = slas.filter((sla) => sla.selected).length
  const totalCount = slas.length

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSearchFilterChange = (field: keyof typeof searchFilters, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [field]: value }))
  }

  const handleStatusToggle = (id: string, status: boolean) => {
    setSlas((prev) => prev.map((sla) => (sla.id === id ? { ...sla, status } : sla)))
    setToastMessage("SLA status updated successfully!")
    setShowToast(true)
  }

  const handleSave = () => {
    if (!formData.name.trim()) return

    const newSLA: SLA = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      responseTime: formData.responseTime,
      resolutionTime: formData.resolutionTime,
      status: true,
      selected: false,
    }

    setSlas((prev) => [...prev, newSLA])
    setFormData({ name: "", description: "", responseTime: "", resolutionTime: "" })
    setShowModal(false)
    setToastMessage("SLA created successfully!")
    setShowToast(true)
  }

  const handleView = (sla: SLA) => {
    setViewingSLA(sla)
    setShowViewModal(true)
  }

  const handleEdit = (sla: SLA) => {
    setEditingSLA(sla)
    setEditFormData({
      name: sla.name,
      description: sla.description,
      responseTime: sla.responseTime,
      resolutionTime: sla.resolutionTime,
    })
    setShowEditModal(true)
  }

  const handleEditSave = () => {
    if (!editFormData.name.trim() || !editingSLA) return

    setSlas((prev) =>
      prev.map((sla) =>
        sla.id === editingSLA.id
          ? {
              ...sla,
              name: editFormData.name,
              description: editFormData.description,
              responseTime: editFormData.responseTime,
              resolutionTime: editFormData.resolutionTime,
            }
          : sla,
      ),
    )

    setShowEditModal(false)
    setEditingSLA(null)
    setEditFormData({ name: "", description: "", responseTime: "", resolutionTime: "" })
    setToastMessage("SLA updated successfully!")
    setShowToast(true)
  }

  const handleDeleteSingle = (id: string) => {
    setSlas((prev) => prev.filter((sla) => sla.id !== id))
    setToastMessage("SLA deleted successfully!")
    setShowToast(true)
  }

  const handleSearchToggle = (isVisible: boolean) => {
    setSearchVisible(isVisible)
    if (!isVisible) {
      setSearchFilters({ name: "", description: "" })
    }
  }

  const tableColumns = [
    {
      key: "actions",
      label: "Actions",
      width: "w-1/6",
    },
    {
      key: "name",
      label: "Name",
      width: "w-1/4",
    },
    {
      key: "responseTime",
      label: "Response Time",
      width: "w-1/4",
    },
    {
      key: "resolutionTime",
      label: "Resolution Time",
      width: "w-1/4",
    },
    {
      key: "status",
      label: "Status",
      width: "w-1/6",
    },
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
      <TextInput label="Response Time" name="responseTime" value={formData.responseTime} onChange={handleInputChange} />
      <TextInput
        label="Resolution Time"
        name="resolutionTime"
        value={formData.resolutionTime}
        onChange={handleInputChange}
      />
    </div>
  )

  const editModalContent = (
    <div className="space-y-4 text-left" style={{ fontFamily: "PT Sans, sans-serif" }}>
      <TextInput label="Name" name="name" value={editFormData.name} onChange={handleEditInputChange} required />
      <TextArea
        label="Description"
        name="description"
        value={editFormData.description}
        onChange={handleEditInputChange}
        rows={4}
      />
      <TextInput
        label="Response Time"
        name="responseTime"
        value={editFormData.responseTime}
        onChange={handleEditInputChange}
      />
      <TextInput
        label="Resolution Time"
        name="resolutionTime"
        value={editFormData.resolutionTime}
        onChange={handleEditInputChange}
      />
    </div>
  )

  const viewModalContent = viewingSLA ? (
    <div className="space-y-4" style={{ fontFamily: "PT Sans, sans-serif" }}>
      <TextInput 
        label="Name" 
        name="name" 
        value={viewingSLA.name} 
        onChange={() => {}} 
        readOnly 
        className="bg-gray-50"
      />
      <TextArea
        label="Description"
        name="description"
        value={viewingSLA.description}
        onChange={() => {}}
        rows={4}
        readOnly
        className="bg-gray-50"
      />
      <TextInput 
        label="Response Time" 
        name="responseTime" 
        value={viewingSLA.responseTime} 
        onChange={() => {}} 
        readOnly 
        className="bg-gray-50"
      />
      <TextInput 
        label="Resolution Time" 
        name="resolutionTime" 
        value={viewingSLA.resolutionTime} 
        onChange={() => {}} 
        readOnly 
        className="bg-gray-50"
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            viewingSLA.status 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {viewingSLA.status ? "Active" : "Inactive"}
          </span>
        </div>
      </div>
    </div>
  ) : null

  return (
    <div className="space-y-6" style={{ fontFamily: "PT Sans, sans-serif" }}>
      {/* Action Buttons */}
      <TopBar onSearchToggle={handleSearchToggle} onButtonClick={() => setShowModal(true)} buttons={["New SLA"]} />

      {/* SLA Table */}
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
                <td className="p-2 border-r border-gray-300">{/* Empty cell for Response Time */}</td>
                <td className="p-2 border-r border-gray-300">{/* Empty cell for Resolution Time */}</td>
                <td className="p-2 border-r border-gray-300">{/* Empty cell for Status */}</td>
              </tr>
            )}
            <tbody>
              {filteredSLAs.length === 0 ? (
                <tr>
                  <td colSpan={tableColumns.length} className="p-8 text-center">
                    <NoDataFound message="No SLAs found. Create your first SLA to get started." />
                  </td>
                </tr>
              ) : (
                filteredSLAs.map((sla) => (
                  <tr key={sla.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 w-1/6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(sla)}
                          className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
                          title="View"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(sla)}
                          className="p-1 text-gray-600 hover:text-green-600 transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteSingle(sla.id)}
                          className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                    <td className="p-4 w-1/4">
                      <div className="text-center">
                        <div className="font-medium text-gray-600">{sla.name}</div>
                        <div className="text-sm text-gray-600">{sla.description}</div>
                      </div>
                    </td>
                    <td className="p-4 w-1/4 text-gray-600">{sla.responseTime}</td>
                    <td className="p-4 w-1/4 text-gray-600">{sla.resolutionTime}</td>
                    <td className="p-4 w-1/6">
                      <ToggleSwitch checked={sla.status} onChange={(checked) => handleStatusToggle(sla.id, checked)} />
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

      {/* New SLA Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="New SLA"
        content={modalContent}
        showFooter={true}
        confirmText="Save"
        cancelText="Cancel"
        onConfirm={handleSave}
        onCancel={() => setShowModal(false)}
        confirmButtonClassName="bg-[#7991BB] text-white hover:bg-[#6a82a8]"
      />

      {/* Edit SLA Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit SLA"
        content={editModalContent}
        showFooter={true}
        confirmText="Update"
        cancelText="Cancel"
        onConfirm={handleEditSave}
        onCancel={() => {
          setShowEditModal(false)
          setEditingSLA(null)
          setEditFormData({ name: "", description: "", responseTime: "", resolutionTime: "" })
        }}
        confirmButtonClassName="bg-[#7991BB] text-white hover:bg-[#6a82a8]"
      />

      {/* View SLA Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="View SLA"
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