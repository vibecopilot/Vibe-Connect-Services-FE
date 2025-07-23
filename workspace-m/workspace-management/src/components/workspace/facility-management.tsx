import { useState, createContext, useContext } from "react"
import { Eye, Edit, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import IconButton from "../IconButton"
import { Pagination } from "../index"
import NoDataFound from "../NoDataFound"
import Breadcrumb from "../Breadcrumb"
import ToggleSwitch from "../ToggleSwitch"
import TableHead from "../TopHead"
import TextInput from "../TextInput"

interface FacilityData {
  id: number
  name: string
  active: boolean
  bookingType: string
  createdOn: string
}

// Create context for facility data
const FacilityContext = createContext<{
  facilities: FacilityData[]
  setFacilities: (facilities: FacilityData[]) => void
  addFacility: (facility: Omit<FacilityData, "id">) => void
  updateFacility: (id: number, facility: Partial<FacilityData>) => void
  getFacilityById: (id: number) => FacilityData | undefined
}>({
  facilities: [],
  setFacilities: () => {},
  addFacility: () => {},
  updateFacility: () => {},
  getFacilityById: () => undefined,
})

export const useFacilityContext = () => useContext(FacilityContext)

export default function FacilityManagement() {
  // State for facilities data
  const [facilities, setFacilities] = useState<FacilityData[]>([
    { id: 32, name: "Conference Room 1", active: false, bookingType: "Bookable", createdOn: "2023-05-15" },
    { id: 50, name: "Conference Room 2", active: false, bookingType: "Request", createdOn: "2023-05-16" },
  ])

  // State for active tab
  const [activeTab, setActiveTab] = useState("Facility")

  // State for search
  const [showSearch, setShowSearch] = useState(false)
  const [searchFilters, setSearchFilters] = useState({
    name: "",
    id: "",
    bookingType: "",
  })

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Setup", href: "/workspace" },
    { label: "Workspace", href: "/workspace-management/facility" },
  ]

  const navigate = useNavigate()

  // Context functions
  const addFacility = (facilityData: Omit<FacilityData, "id">) => {
    const newId = Math.max(...facilities.map((f) => f.id), 0) + 1
    const newFacility = { ...facilityData, id: newId }
    setFacilities([...facilities, newFacility])
  }

  const updateFacility = (id: number, facilityData: Partial<FacilityData>) => {
    setFacilities(facilities.map((f) => (f.id === id ? { ...f, ...facilityData } : f)))
  }

  const getFacilityById = (id: number) => {
    return facilities.find((facility) => facility.id === id)
  }

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

  // Handle search toggle
  const handleSearchToggle = () => {
    setShowSearch(!showSearch)
    if (showSearch) {
      // Reset search filters when hiding search
      setSearchFilters({ name: "", id: "", bookingType: "" })
    }
  }

  // Handle search filter change
  const handleSearchFilterChange = (field: string, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [field]: value }))
  }

  // Handle view button click
  const handleViewClick = (facility: FacilityData) => {
    navigate(`/workspace-management/facility/view/${facility.id}`)
  }

  // Handle edit button click
  const handleEditClick = (facility: FacilityData) => {
    navigate(`/workspace-management/facility/edit/${facility.id}`)
  }

  // Handle delete button click - Direct deletion without modal
  const handleDeleteClick = (id: number) => {
    setFacilities(facilities.filter((facility) => facility.id !== id))
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
  const filteredFacilities = facilities.filter((facility) => {
    const nameMatch = facility.name.toLowerCase().includes(searchFilters.name.toLowerCase())
    const idMatch = facility.id.toString().includes(searchFilters.id)
    const bookingTypeMatch = facility.bookingType.toLowerCase().includes(searchFilters.bookingType.toLowerCase())

    return nameMatch && idMatch && bookingTypeMatch
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredFacilities.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentFacilities = filteredFacilities.slice(startIndex, endIndex)

  const contextValue = {
    facilities,
    setFacilities,
    addFacility,
    updateFacility,
    getFacilityById,
  }

  return (
    <FacilityContext.Provider value={contextValue}>
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
              onClick={() => handleTabClick("Facility")}
            >
              Facility
            </button>
            <button
              className={`px-4 py-2 text-sm relative ${
                activeTab === "Seat"
                  ? "text-blue-600 font-medium border-b-2 border-blue-600"
                  : "text-gray-500 font-medium"
              }`}
              onClick={() => handleTabClick("Seat")}
            >
              Seat
            </button>
          </div>
        </div>

        {/* Top Bar with search and buttons */}
        <div className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button onClick={handleSearchToggle} className="p-2 text-gray-600 hover:text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleButtonClick("Add")}
                className="bg-white text-[#5E5E5E] px-3 py-2 rounded-md border border-[#9E9E9E] transition cursor-pointer"
              >
                Add
              </button>
              <button
                onClick={() => handleButtonClick("Export")}
                className="bg-white text-[#5E5E5E] px-3 py-2 rounded-md border border-[#9E9E9E] transition cursor-pointer"
              >
                Export
              </button>
            </div>
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
          <table className="w-full">
            <TableHead
              columns={[
                { label: "Action", align: "left" },
                { label: "ID", align: "left" },
                { label: "Name", align: "left" },
                { label: "Active", align: "left" },
                { label: "Booking Type", align: "left" },
                { label: "Created On", align: "left" },
              ]}
            />

            {/* Search filters row */}
            {showSearch && (
              <tr className="bg-gray-50">
                <td className="p-2"></td>
                <td className="p-2">
                  <TextInput
                    label=""
                    name="idSearch"
                    value={searchFilters.id}
                    onChange={(e) => handleSearchFilterChange("id", e.target.value)}
                    placeholder="Search ID..."
                  />
                </td>
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
                    name="bookingTypeSearch"
                    value={searchFilters.bookingType}
                    onChange={(e) => handleSearchFilterChange("bookingType", e.target.value)}
                    placeholder="Search Booking Type..."
                  />
                </td>
                <td className="p-2"></td>
              </tr>
            )}

            <tbody>
              {currentFacilities.length > 0 ? (
                currentFacilities.map((facility) => (
                  <tr key={facility.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
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
                    </td>
                    <td className="p-4 text-gray-700 text-sm">{facility.id}</td>
                    <td className="p-4 text-gray-700 text-sm">{facility.name}</td>
                    <td className="p-4">
                      <ToggleSwitch
                        checked={facility.active}
                        onChange={(checked) => handleToggleChange(facility.id, checked)}
                      />
                    </td>
                    <td className="p-4 text-gray-700 text-sm">{facility.bookingType}</td>
                    <td className="p-4 text-gray-700 text-sm">{facility.createdOn}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-4 text-center">
                    <NoDataFound message="No facilities found." />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </FacilityContext.Provider>
  )
}
