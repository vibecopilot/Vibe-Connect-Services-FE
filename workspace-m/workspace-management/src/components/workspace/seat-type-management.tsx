import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type React from "react"

import { Eye, Edit, Trash2, Search, ChevronLeft, ChevronRight, Upload } from "lucide-react"
import Breadcrumb from "../Breadcrumb"
import TableHead from "../TopHead"
import IconButton from "../IconButton"
import ToggleSwitch from "../ToggleSwitch"
import TextInput from "../TextInput"
import NoDataFound from "../NoDataFound"

interface SeatTypeData {
  id: number
  name: string
  active: boolean
  createdOn: string
  image?: string
}

// Updated Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  type?: "spinner" | "dots";
  content: React.ReactNode;
  showFooter?: boolean;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmButtonClassName?: string;
  cancelButtonClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
  showFooter = true,
  confirmText = "Confirm",
  cancelText,
  onConfirm,
  onCancel,
  confirmButtonClassName = "bg-red-600 text-white hover:bg-red-700",
  cancelButtonClassName = "text-gray-700 border border-gray-300 hover:bg-gray-100",
}) => {
  if (!isOpen) return null;

  const handleCancel = () => {
    if (onCancel) onCancel();
    else onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={handleCancel}
      data-testid="modal-backdrop"
    >
      <div
        className="bg-white rounded-md shadow-lg max-w-md w-full relative z-50"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {title && (
          <div className="px-6 py-4 flex justify-between items-center">
            <h2 className="text-gray-800 font-semibold" id="modal-title">
              {title}
            </h2>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="text-gray-400 hover:text-gray-600"
            >
              &#x2715;
            </button>
          </div>
        )}

        <div className="p-6 text-gray-800">{content}</div>

        {showFooter && (
          <div className="px-6 py-4 flex justify-start gap-3">
            <button
              onClick={onConfirm}
              className={`px-4 py-2 rounded ${confirmButtonClassName} cursor-pointer`}
            >
              {confirmText}
            </button>
            {cancelText !== undefined && (
              <button
                onClick={handleCancel}
                className={`px-4 py-2 rounded ${cancelButtonClassName} cursor-pointer`}
              >
                {cancelText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Custom File Upload Button Component
const FileUploadButton: React.FC<{
  onChange: (files: FileList | null) => void;
  accept?: string;
  label: string;
  disabled?: boolean;
}> = ({ onChange, accept, label, disabled = false }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.files);
  };

  return (
    <div className="relative">
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        disabled={disabled}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className={`flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 cursor-pointer ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <Upload className="w-4 h-4 text-gray-600" />
        <span className="text-gray-700 text-sm">{label}</span>
      </label>
    </div>
  );
};

export default function SeatTypeManagement() {
  const navigate = useNavigate()

  // State for seat types data
  const [seatTypes, setSeatTypes] = useState<SeatTypeData[]>([
    { id: 1, name: "Fixed Seats", active: true, createdOn: "2023-05-15" },
    { id: 2, name: "Hot Desks", active: false, createdOn: "2023-05-16" },
  ])

  // State for active tabs
  const [activeTab, setActiveTab] = useState("Seat")
  const [activeSubTab, setActiveSubTab] = useState("Seat Type")

  // State for search filters - using same structure as facility management
  const [showSearch, setShowSearch] = useState(false)
  const [searchFilters, setSearchFilters] = useState({
    name: "",
    createdOn: "",
  })

  // State for modals
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedSeatType, setSelectedSeatType] = useState<SeatTypeData | null>(null)

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    image: null as FileList | null,
  })

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Setup", href: "/setup" },
    { label: "Workspace", href: "/workspace" },
  ]

  // Handle main tab change
  const handleMainTabChange = (tab: string) => {
    setActiveTab(tab)
    if (tab === "Facility") {
      navigate("/workspace-management/facility")
    } else if (tab === "Seat") {
      // Stay on seat tab, but navigate to default seat type
      navigate("/workspace-management/seat/type")
    }
  }

  // Handle sub tab change
  const handleSubTabChange = (tab: string) => {
    setActiveSubTab(tab)
    if (tab === "Seat Type") {
      navigate("/workspace-management/seat/type")
    } else if (tab === "Seat Setup") {
      navigate("/workspace-management/seat/setup")
    }
  }

  // Handle search toggle
  const handleSearchToggle = () => {
    setShowSearch(!showSearch)
    if (showSearch) {
      // Reset search filters when hiding search
      setSearchFilters({ name: "", createdOn: "" })
    }
  }

  // Handle search filter change
  const handleSearchFilterChange = (field: string, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [field]: value }))
  }

  // Handle toggle change
  const handleToggleChange = (id: number, checked: boolean) => {
    setSeatTypes(seatTypes.map((type) => (type.id === id ? { ...type, active: checked } : type)))
  }

  // Handle view button click
  const handleViewClick = (seatType: SeatTypeData) => {
    setSelectedSeatType(seatType)
    setFormData({ name: seatType.name, image: null })
    setViewModalOpen(true)
  }

  // Handle edit button click
  const handleEditClick = (seatType: SeatTypeData) => {
    setSelectedSeatType(seatType)
    setFormData({ name: seatType.name, image: null })
    setEditModalOpen(true)
  }

  // Handle delete button click - Direct deletion
  const handleDeleteClick = (id: number) => {
    setSeatTypes(seatTypes.filter((type) => type.id !== id))
  }

  // Handle add button click
  const handleAddClick = () => {
    setFormData({ name: "", image: null })
    setCreateModalOpen(true)
  }

  // Handle create type submit
  const handleCreateSubmit = () => {
    if (formData.name.trim()) {
      const newId = Math.max(...seatTypes.map((t) => t.id), 0) + 1
      const newType: SeatTypeData = {
        id: newId,
        name: formData.name.trim(),
        active: true,
        createdOn: new Date().toISOString().split("T")[0],
      }
      setSeatTypes([...seatTypes, newType])
      setCreateModalOpen(false)
      setFormData({ name: "", image: null })
    }
  }

  // Handle edit submit
  const handleEditSubmit = () => {
    if (selectedSeatType && formData.name.trim()) {
      setSeatTypes(
        seatTypes.map((type) => (type.id === selectedSeatType.id ? { ...type, name: formData.name.trim() } : type)),
      )
      setEditModalOpen(false)
      setFormData({ name: "", image: null })
      setSelectedSeatType(null)
    }
  }

  // Handle modal close
  const handleModalClose = () => {
    setCreateModalOpen(false)
    setViewModalOpen(false)
    setEditModalOpen(false)
    setFormData({ name: "", image: null })
    setSelectedSeatType(null)
  }

  // Handle file upload
  const handleFileUpload = (files: FileList | null) => {
    setFormData((prev) => ({ ...prev, image: files }))
  }

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, name: e.target.value }))
  }

  // Filter seat types based on search filters
  const filteredSeatTypes = seatTypes.filter((type) => {
    const nameMatch = type.name.toLowerCase().includes(searchFilters.name.toLowerCase())
    const dateMatch = type.createdOn.includes(searchFilters.createdOn)
    return nameMatch && dateMatch
  })

  return (
    <div className="bg-white min-h-screen font-['PT_Sans']">
      {/* Breadcrumb navigation */}
      <div className="p-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Main tabs */}
      <div className="border-b border-gray-200">
        <div className="flex px-4">
          <button
            className={`px-4 py-2 text-sm relative ${
              activeTab === "Facility"
                ? "text-blue-600 font-medium border-b-2 border-blue-600"
                : "text-gray-500 font-medium"
            }`}
            onClick={() => handleMainTabChange("Facility")}
          >
            Facility
          </button>
          <button
            className={`px-4 py-2 text-sm relative ${
              activeTab === "Seat"
                ? "text-blue-600 font-medium border-b-2 border-blue-600"
                : "text-gray-500 font-medium"
            }`}
            onClick={() => handleMainTabChange("Seat")}
          >
            Seat
          </button>
        </div>
      </div>

      {/* Sub tabs */}
      <div className="border-b border-gray-200">
        <div className="flex px-4">
          <button
            className={`px-4 py-2 text-sm relative ${
              activeSubTab === "Seat Type"
                ? "text-blue-600 font-medium border-b-2 border-blue-600"
                : "text-gray-500 font-medium"
            }`}
            onClick={() => handleSubTabChange("Seat Type")}
          >
            Seat Type
          </button>
          <button
            className={`px-4 py-2 text-sm relative ${
              activeSubTab === "Seat Setup"
                ? "text-blue-600 font-medium border-b-2 border-blue-600"
                : "text-gray-500 font-medium"
            }`}
            onClick={() => handleSubTabChange("Seat Setup")}
          >
            Seat Setup
          </button>
        </div>
      </div>

      {/* Table controls */}
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <button className="mr-2 text-gray-500" onClick={handleSearchToggle}>
            <Search className="w-5 h-5" />
          </button>
          <button
            className="px-4 py-1 border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50 text-sm"
            onClick={handleAddClick}
          >
            Add
          </button>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <span>
            1-{filteredSeatTypes.length} of {filteredSeatTypes.length}
          </span>
          <button className="ml-2 text-gray-400">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="ml-1 text-gray-400">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mx-4">
        <table className="w-full border-collapse">
          <TableHead
            columns={[
              { label: "Action", align: "left" },
              { label: "Name", align: "left" },
              { label: "Active/Inactive", align: "left" },
              { label: "Created On", align: "left" },
            ]}
          />
          
          {/* Search filters row - similar to facility management */}
          {showSearch && (
            <tr className="bg-gray-50">
              <td className="p-2"></td>
              <td className="p-2">
                <TextInput
                  label=""
                  name="nameSearch"
                  value={searchFilters.name}
                  onChange={(e) => handleSearchFilterChange("name", e.target.value)}
                  placeholder="Search Name..."
                />
              </td>
              <td className="p-2"></td>
              <td className="p-2">
                <TextInput
                  label=""
                  name="createdOnSearch"
                  value={searchFilters.createdOn}
                  onChange={(e) => handleSearchFilterChange("createdOn", e.target.value)}
                  placeholder="Search Date..."
                />
              </td>
            </tr>
          )}
          
          <tbody>
            {filteredSeatTypes.length > 0 ? (
              filteredSeatTypes.map((seatType) => (
                <tr key={seatType.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <IconButton tooltip="View" onClick={() => handleViewClick(seatType)}>
                        <Eye className="w-5 h-5" />
                      </IconButton>
                      <IconButton tooltip="Edit" onClick={() => handleEditClick(seatType)}>
                        <Edit className="w-5 h-5" />
                      </IconButton>
                      <IconButton tooltip="Delete" onClick={() => handleDeleteClick(seatType.id)}>
                        <Trash2 className="w-5 h-5" />
                      </IconButton>
                    </div>
                  </td>
                  <td className="p-3 text-sm">{seatType.name}</td>
                  <td className="p-3">
                    <ToggleSwitch
                      checked={seatType.active}
                      onChange={(checked) => handleToggleChange(seatType.id, checked)}
                    />
                  </td>
                  <td className="p-3 text-sm">{seatType.createdOn}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center">
                  <NoDataFound message="No seat types found." />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Create Type Modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={handleModalClose}
        title="Create Type"
        content={
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Type Name :-</label>
              <TextInput
                label=""
                name="typeName"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter Type Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Type image:-</label>
              <FileUploadButton onChange={handleFileUpload} accept="image/*" label="Choose File" />
            </div>
          </div>
        }
        showFooter={true}
        confirmText="Submit"
        cancelText="Cancel"
        onConfirm={handleCreateSubmit}
        onCancel={handleModalClose}
        confirmButtonClassName="bg-[#7991BB] text-white hover:bg-[#6B82A6]"
        cancelButtonClassName="bg-gray-200 text-gray-800 hover:bg-gray-300"
      />

      {/* View Modal */}
      <Modal
        isOpen={viewModalOpen}
        onClose={handleModalClose}
        title="View Type"
        content={
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Type Name :</label>
              <input
                type="text"
                value={formData.name}
                disabled={true}
                className="w-full px-3 py-2 border rounded-md bg-gray-100 text-black"
                placeholder="Enter Type Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Type image:</label>
              <FileUploadButton onChange={() => {}} accept="image/*" label="Choose File" disabled={true} />
            </div>
          </div>
        }
        showFooter={true}
        confirmText="Close"
        onConfirm={handleModalClose}
        confirmButtonClassName="bg-[#7991BB] text-white hover:bg-[#6B82A6]"
        cancelText={undefined}
      />

      {/* Edit Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={handleModalClose}
        title="Edit Type"
        content={
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Type Name :-</label>
              <TextInput
                label=""
                name="typeName"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter Type Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Type image:-</label>
              <FileUploadButton onChange={handleFileUpload} accept="image/*" label="Choose File" />
            </div>
          </div>
        }
        showFooter={true}
        confirmText="Submit"
        cancelText="Cancel"
        onConfirm={handleEditSubmit}
        onCancel={handleModalClose}
        confirmButtonClassName="bg-[#7991BB] text-white hover:bg-[#6B82A6]"
        cancelButtonClassName="bg-[#7991BB] text-white hover:bg-[#6B82A6]"
      />
    </div>
  )
}