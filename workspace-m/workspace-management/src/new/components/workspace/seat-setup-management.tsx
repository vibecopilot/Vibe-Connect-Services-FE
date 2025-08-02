
import { useState } from "react"
import { Eye, Edit, ChevronLeft, ChevronRight, Search, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import ToggleSwitch from "../ToggleSwitch"
import Breadcrumb from "../Breadcrumb"
import TableHead from "../TopHead"

interface SeatData {
  id: number
  name: string
  active: boolean
  createdOn: string
}

export default function SeatSetupManagement() {
  // State for seats data
  const [seats, setSeats] = useState<SeatData[]>([
    { id: 1, name: "Seat1", active: false, createdOn: "2023-05-15" },
    { id: 2, name: "Seat2", active: false, createdOn: "2023-05-16" },
  ])

  // State for active tab
  const [activeTab, setActiveTab] = useState("Seat")
  const [activeSubTab, setActiveSubTab] = useState("Seat Setup")

  // State for search
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)

  const navigate = useNavigate()

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Setup", href: "/setup" },
    { label: "Workspace", href: "/workspace" },
  ]

  // Handle tab click
  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
    if (tab === "Facility") {
      navigate("/workspace-management/facility")
    }
  }

  // Handle sub-tab click
  const handleSubTabClick = (tab: string) => {
    setActiveSubTab(tab)
  }

  // Handle toggle change
  const handleToggleChange = (id: number, checked: boolean) => {
    setSeats(seats.map((seat) => (seat.id === id ? { ...seat, active: checked } : seat)))
  }

  // Handle view button click
  const handleViewClick = (seat: SeatData) => {
    navigate(`/workspace-management/seat/view/${seat.id}`)
  }

  // Handle add button click
  const handleAddClick = () => {
    navigate("/workspace-management/seat/type")
  }

  // Handle edit button click
  const handleEditClick = (seat: SeatData) => {
    navigate(`/workspace-management/seat/edit/${seat.id}`)
  }

  // Handle delete button click - Direct deletion without modal
  const handleDeleteClick = (id: number) => {
    setSeats(seats.filter((seat) => seat.id !== id))
  }

  // Filter seats based on search query
  const filteredSeats = seats.filter((seat) => seat.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="bg-white min-h-screen font-['PT_Sans']">
      {/* Breadcrumb navigation */}
      <div className="p-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Main tabs */}
      <div className="border-b border-gray-200">
        <div className="flex">
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

      {/* Sub tabs */}
      <div className="border-b border-gray-200">
        <div className="flex">
          <button
            className={`px-4 py-2 text-sm font-medium relative ${
              activeSubTab === "Seat Type" ? "text-blue-600" : "text-gray-500"
            }`}
            onClick={() => handleSubTabClick("Seat Type")}
          >
            Seat Type
            {activeSubTab === "Seat Type" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>}
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium relative ${
              activeSubTab === "Seat Setup" ? "text-blue-600" : "text-gray-500"
            }`}
            onClick={() => handleSubTabClick("Seat Setup")}
          >
            Seat Setup
            {activeSubTab === "Seat Setup" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </button>
        </div>
      </div>

      {/* Table controls */}
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <button className="mr-2 text-gray-500" onClick={() => setShowSearch(!showSearch)}>
            <Search className="w-5 h-5" />
          </button>
          {showSearch && (
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm mr-2"
            />
          )}
          <button
            className="px-4 py-1 border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50 text-sm"
            onClick={handleAddClick}
          >
            Add
          </button>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <span>
            1-{filteredSeats.length} of {filteredSeats.length}
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
        <TableHead
          columns={[
            { label: "Action", align: "left", width: "15%" },
            { label: "Name", align: "left", width: "35%" },
            { label: "Active/Inactive", align: "left", width: "20%" },
            { label: "Created On", align: "left", width: "30%" },
          ]}
        />

        {showSearch && (
          <div className="bg-white border border-gray-300 shadow-sm">
            <div className="grid grid-cols-4 p-4">
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
            </div>
          </div>
        )}

        <div className=" overflow-hidden">
          {/* Table body */}
          {filteredSeats.map((seat, index) => (
            <div key={seat.id} className="grid grid-cols-4">
              <div className="p-3 flex items-center space-x-2">
                <button className="text-gray-500 hover:text-blue-600" onClick={() => handleViewClick(seat)}>
                  <Eye className="w-5 h-5" />
                </button>
                <button className="text-gray-500 hover:text-blue-600" onClick={() => handleEditClick(seat)}>
                  <Edit className="w-5 h-5" />
                </button>
                <button className="text-gray-500 hover:text-red-600" onClick={() => handleDeleteClick(seat.id)}>
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="p-3 text-sm">{seat.name}</div>
              <div className="p-3">
                <ToggleSwitch checked={seat.active} onChange={(checked) => handleToggleChange(seat.id, checked)} />
              </div>
              <div className="p-3 text-sm">{seat.createdOn}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
