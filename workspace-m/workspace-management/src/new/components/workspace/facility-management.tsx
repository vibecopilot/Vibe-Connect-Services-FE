
import { useState } from "react"
import { Eye, Edit, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import TopBar from "../TopBar"
import IconButton from "../IconButton"
import { Pagination } from "../index"
import NoDataFound from "../NoDataFound"
import Breadcrumb from "../Breadcrumb"
import ToggleSwitch from "../ToggleSwitch"
import Modal from "../Modal" // Import Modal component

interface FacilityData {
  id: number
  name: string
  active: boolean
  bookingType: string
  createdOn: string
}

export default function FacilityManagement() {
  // State for facilities data
  const [facilities, setFacilities] = useState<FacilityData[]>([
    { id: 32, name: "Conference Room 1", active: false, bookingType: "Bookable", createdOn: "2023-05-15" },
    { id: 50, name: "Conference Room 2", active: false, bookingType: "Request", createdOn: "2023-05-16" },
  ])

  // State for active tab
  const [activeTab, setActiveTab] = useState("Facility")

  // State for delete confirmation
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [facilityToDelete, setFacilityToDelete] = useState<number | null>(null)

  // State for search
  const [searchQuery, setSearchQuery] = useState("")

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Setup", href: "/workspace" },
    { label: "Workspace", href: "/workspace-management/facility" },
  ]

  const navigate = useNavigate()

  // Handle button clicks
  const handleButtonClick = (type: string) => {
    if (type === "Add") {
      navigate("/workspace-management/facility/details/new")
    } else if (type === "Export") {
      handleExport()
    }
  }

  // Handle tab click
  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
    if (tab === "Seat") {
      navigate("/workspace-management/seat/setup")
    } else if (tab === "Facility") {
      navigate("/workspace-management/facility")
    }
  }

  // Handle toggle change
  const handleToggleChange = (id: number, checked: boolean) => {
    setFacilities(facilities.map((facility) => (facility.id === id ? { ...facility, active: checked } : facility)))
  }

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  // Handle view button click
  const handleViewClick = (facility: FacilityData) => {
    navigate(`/workspace-management/facility/view/${facility.id}`)
  }

  // Handle edit button click
  const handleEditClick = (facility: FacilityData) => {
    navigate(`/workspace-management/facility/edit/${facility.id}`)
  }

  // Handle delete button click
  const handleDeleteClick = (id: number) => {
    setFacilityToDelete(id)
    setDeleteConfirmOpen(true)
  }

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (facilityToDelete !== null) {
      setFacilities(facilities.filter((facility) => facility.id !== facilityToDelete))
      setDeleteConfirmOpen(false)
      setFacilityToDelete(null)
    }
  }

  // Handle export
  const handleExport = () => {
    console.log("Exporting facilities data...")
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Filter facilities based on search query
  const filteredFacilities = facilities.filter(
    (facility) =>
      facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.id.toString().includes(searchQuery) ||
      facility.bookingType.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredFacilities.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentFacilities = filteredFacilities.slice(startIndex, endIndex)

  return (
    <div className="bg-white min-h-screen" style={{ fontFamily: "PT Sans, sans-serif" }}>
      {/* Breadcrumb navigation */}
      <div className="p-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Main tabs */}
      <div className="border-b border-gray-200">
        <div className="flex px-4">
          <button
            className={`px-4 py-2 text-sm font-medium relative ${
              activeTab === "Facility" ? "text-blue-600" : "text-gray-500"
            }`}
            onClick={() => handleTabClick("Facility")}
          >
            Facility
            {activeTab === "Facility" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>}
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium relative ${
              activeTab === "Seat" ? "text-blue-600" : "text-gray-500"
            }`}
            onClick={() => handleTabClick("Seat")}
          >
            Seat
            {activeTab === "Seat" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>}
          </button>
        </div>
      </div>

      {/* Top Bar with search and buttons */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <TopBar onSearch={handleSearch} onButtonClick={handleButtonClick} buttons={["Add", "Export"]} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredFacilities.length}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Table Header */}
      <div className="mx-4 mb-4">
        <div className="w-full">
          <div className="bg-gray-100 text-gray-700 grid grid-cols-6 gap-0">
            <div className="p-4 text-md font-semibold border-b-2 border-gray-200 text-left">Action</div>
            <div className="p-4 text-md font-semibold border-b-2 border-gray-200 text-left">ID</div>
            <div className="p-4 text-md font-semibold border-b-2 border-gray-200 text-left">Name</div>
            <div className="p-4 text-md font-semibold border-b-2 border-gray-200 text-left">Active</div>
            <div className="p-4 text-md font-semibold border-b-2 border-gray-200 text-left">Booking Type</div>
            <div className="p-4 text-md font-semibold border-b-2 border-gray-200 text-left">Created On</div>
          </div>
        </div>
        {searchQuery && (
          <div className="bg-white border border-gray-300 shadow-sm">
            <div className="grid grid-cols-6 gap-0 p-4">
              <div></div>
              <div></div>
              <div>
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-2 py-1 border rounded text-sm"
                />
              </div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </div>

      {/* Table Content */}
      <div className="mx-4">
        {currentFacilities.length > 0 ? (
          <div className="space-y-0">
            {currentFacilities.map((facility, index) => (
              <div key={facility.id} className="grid grid-cols-6 gap-0 hover:bg-gray-50 transition-colors">
                <div className="p-4 flex items-center space-x-2">
                  <IconButton tooltip="View" onClick={() => handleViewClick(facility)}>
                    <Eye className="w-5 h-5" />
                  </IconButton>
                  <IconButton tooltip="Edit" onClick={() => handleEditClick(facility)}>
                    <Edit className="w-5 h-5" />
                  </IconButton>
                  <IconButton tooltip="Delete" onClick={() => handleDeleteClick(facility.id)}>
                    <Trash2 className="w-5 h-5" />
                  </IconButton>
                </div>
                <div className="p-4 text-gray-700 text-sm flex items-center">{facility.id}</div>
                <div className="p-4 text-gray-700 text-sm flex items-center">{facility.name}</div>
                <div className="p-4 flex items-center">
                  <ToggleSwitch
                    checked={facility.active}
                    onChange={(checked) => handleToggleChange(facility.id, checked)}
                  />
                </div>
                <div className="p-4 text-gray-700 text-sm flex items-center">{facility.bookingType}</div>
                <div className="p-4 text-gray-700 text-sm flex items-center">{facility.createdOn}</div>
              </div>
            ))}
          </div>
        ) : (
          <NoDataFound message="No facilities found." />
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        title="Confirm Delete"
        content={<p>Are you sure you want to delete this facility?</p>}
        showFooter={true}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirmOpen(false)}
        confirmButtonClassName="bg-red-600 text-white hover:bg-red-700"
        cancelButtonClassName="bg-gray-200 text-gray-800 hover:bg-gray-300"
      />
    </div>
  )
}
