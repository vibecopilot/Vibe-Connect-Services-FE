import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"

import Pagination from "../components/Pagination"
import TableHead from "../components/TopHead"
import NoDataFound from "../components/NoDataFound"
import Breadcrumb from "../components/Breadcrumb"
import Checkbox from "../components/Checkbox"
import TextInput from "../components/TextInput"
import DropdownMenu from "../components/DropdownMenu"

// Define types
interface Survey {
  id: string
  action: string
  name: string
  startDate: string
  endDate: string
  responses: number
  status: string
}

interface StatusFilters {
  selectAll: boolean
  open: boolean
  closeShared: boolean
  draftYou: boolean
}

interface OwnerFilters {
  selectAll: boolean
  youOwn: boolean
  youOwnShared: boolean
  sharedWith: boolean
}

type StatusFilterKey = keyof StatusFilters
type OwnerFilterKey = keyof OwnerFilters

const SurveyManagement = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false)
  const [ownerDropdownOpen, setOwnerDropdownOpen] = useState(false)

  const [statusFilters, setStatusFilters] = useState<StatusFilters>({
    selectAll: true,
    open: false,
    closeShared: false,
    draftYou: false,
  })

  const [ownerFilters, setOwnerFilters] = useState<OwnerFilters>({
    selectAll: true,
    youOwn: false,
    youOwnShared: false,
    sharedWith: false,
  })

  // Mock data - in real app this would come from props or API
  const surveys: Survey[] = []

  const handleStatusFilterChange = (filterKey: StatusFilterKey) => {
    if (filterKey === "selectAll") {
      const newSelectAll = !statusFilters.selectAll
      setStatusFilters({
        selectAll: newSelectAll,
        open: newSelectAll,
        closeShared: newSelectAll,
        draftYou: newSelectAll,
      })
    } else {
      const newFilters = {
        ...statusFilters,
        [filterKey]: !statusFilters[filterKey],
      }

      // Update selectAll based on other filters
      const otherFilters = (Object.keys(newFilters) as StatusFilterKey[]).filter((key) => key !== "selectAll")
      const allSelected = otherFilters.every((key) => newFilters[key])

      newFilters.selectAll = allSelected

      setStatusFilters(newFilters)
    }
  }

  const handleOwnerFilterChange = (filterKey: OwnerFilterKey) => {
    if (filterKey === "selectAll") {
      const newSelectAll = !ownerFilters.selectAll
      setOwnerFilters({
        selectAll: newSelectAll,
        youOwn: newSelectAll,
        youOwnShared: newSelectAll,
        sharedWith: newSelectAll,
      })
    } else {
      const newFilters = {
        ...ownerFilters,
        [filterKey]: !ownerFilters[filterKey],
      }

      // Update selectAll based on other filters
      const otherFilters = (Object.keys(newFilters) as OwnerFilterKey[]).filter((key) => key !== "selectAll")
      const allSelected = otherFilters.every((key) => newFilters[key])

      newFilters.selectAll = allSelected

      setOwnerFilters(newFilters)
    }
  }

  // Checkbox change handlers for the imported Checkbox component
  const handleStatusCheckboxChange = (e: { target: { name: string; value: boolean } }) => {
    handleStatusFilterChange(e.target.name as StatusFilterKey)
  }

  const handleOwnerCheckboxChange = (e: { target: { name: string; value: boolean } }) => {
    handleOwnerFilterChange(e.target.name as OwnerFilterKey)
  }

  // Handle Add button click to navigate to Create Survey page
  const handleAddClick = () => {
    navigate("/create-survey")
  }

  // Status dropdown items with checkboxes
  const statusDropdownItems = [
    {
      label: "Select all",
      onClick: () => handleStatusFilterChange("selectAll"),
      content: (
        <div className="flex items-center px-2 py-1">
          <Checkbox
            label="Select all"
            checked={statusFilters.selectAll}
            onChange={handleStatusCheckboxChange}
            name="selectAll"
          />
        </div>
      ),
    },
    {
      label: "Open",
      onClick: () => handleStatusFilterChange("open"),
      content: (
        <div className="flex items-center px-2 py-1">
          <Checkbox label="Open" checked={statusFilters.open} onChange={handleStatusCheckboxChange} name="open" />
        </div>
      ),
    },
    {
      label: "Close Shared",
      onClick: () => handleStatusFilterChange("closeShared"),
      content: (
        <div className="flex items-center px-2 py-1">
          <Checkbox
            label="Close Shared"
            checked={statusFilters.closeShared}
            onChange={handleStatusCheckboxChange}
            name="closeShared"
          />
        </div>
      ),
    },
    {
      label: "Draft You",
      onClick: () => handleStatusFilterChange("draftYou"),
      content: (
        <div className="flex items-center px-2 py-1">
          <Checkbox
            label="Draft You"
            checked={statusFilters.draftYou}
            onChange={handleStatusCheckboxChange}
            name="draftYou"
          />
        </div>
      ),
    },
  ]

  // Owner dropdown items with checkboxes
  const ownerDropdownItems = [
    {
      label: "Select all",
      onClick: () => handleOwnerFilterChange("selectAll"),
      content: (
        <div className="flex items-center px-2 py-1">
          <Checkbox
            label="Select all"
            checked={ownerFilters.selectAll}
            onChange={handleOwnerCheckboxChange}
            name="selectAll"
          />
        </div>
      ),
    },
    {
      label: "You Own",
      onClick: () => handleOwnerFilterChange("youOwn"),
      content: (
        <div className="flex items-center px-2 py-1">
          <Checkbox label="You Own" checked={ownerFilters.youOwn} onChange={handleOwnerCheckboxChange} name="youOwn" />
        </div>
      ),
    },
    {
      label: "You Own Shared",
      onClick: () => handleOwnerFilterChange("youOwnShared"),
      content: (
        <div className="flex items-center px-2 py-1">
          <Checkbox
            label="You Own Shared"
            checked={ownerFilters.youOwnShared}
            onChange={handleOwnerCheckboxChange}
            name="youOwnShared"
          />
        </div>
      ),
    },
    {
      label: "Shared With",
      onClick: () => handleOwnerFilterChange("sharedWith"),
      content: (
        <div className="flex items-center px-2 py-1">
          <Checkbox
            label="Shared With"
            checked={ownerFilters.sharedWith}
            onChange={handleOwnerCheckboxChange}
            name="sharedWith"
          />
        </div>
      ),
    },
  ]

  // Table columns
  const tableColumns = [
    { label: "Action", align: "left" as const },
    { label: "Survey Name", align: "left" as const },
    { label: "Start Date", align: "left" as const },
    { label: "End Date", align: "left" as const },
    { label: "No Of Response", align: "left" as const },
    { label: "Status", align: "left" as const },
  ]

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Setup", href: "#" },
    { label: "Survey Feedback", href: "#" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Search and Filters Row */}
        <div className="flex items-center justify-between mb-6">
          {/* Left side - Search Input */}
          <div className="flex items-center">
            <TextInput
              placeholder="Search By Survey Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 mb-0"
            />
          </div>

          {/* Right side - Filters and Add Button */}
          <div className="flex items-center space-x-4">
            {/* Status Dropdown */}
            <DropdownMenu
              items={statusDropdownItems}
              trigger={
                <button className="flex items-center justify-between w-32 px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <span className="text-gray-700">Status</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              }
              position="bottom-right"
              open={statusDropdownOpen}
              onToggle={setStatusDropdownOpen}
              className="w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
            />

            {/* Owner Dropdown */}
            <DropdownMenu
              items={ownerDropdownItems}
              trigger={
                <button className="flex items-center justify-between w-32 px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <span className="text-gray-700">Owner</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              }
              position="bottom-right"
              open={ownerDropdownOpen}
              onToggle={setOwnerDropdownOpen}
              className="w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
            />

            {/* Add Button */}
            <button
              onClick={handleAddClick}
              className="px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ backgroundColor: '#7991BB', borderColor: '#7991BB' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#6B7FA3'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#7991BB'}
            >
              Add
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <TableHead columns={tableColumns} />
            <tbody>
              {surveys.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center">
                    <NoDataFound message="No surveys found. Create your first survey to get started." />
                  </td>
                </tr>
              ) : (
                surveys.map((survey, index) => (
                  <tr key={survey.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4">{survey.action}</td>
                    <td className="px-6 py-4">{survey.name}</td>
                    <td className="px-6 py-4">{survey.startDate}</td>
                    <td className="px-6 py-4">{survey.endDate}</td>
                    <td className="px-6 py-4">{survey.responses}</td>
                    <td className="px-6 py-4">{survey.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {surveys.length > 0 && (
          <div className="mt-6">
            <Pagination
              currentPage={1}
              totalPages={1}
              totalItems={surveys.length}
              onPageChange={(page: number) => console.log(`Page changed to: ${page}`)}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default SurveyManagement