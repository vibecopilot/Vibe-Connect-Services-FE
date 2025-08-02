import React from "react"
import { useState, useEffect } from "react"
import { Eye, Edit, Trash2 } from "lucide-react"
import Breadcrumb from "../components/Breadcrumb"
import Avatar from "../components/Avatar"
import Pagination from "../components/Pagination"
import NoDataFound from "../components/NoDataFound"
import Tabs from "../components/Tabs"
import TableHead from "../components/TopHead"
import TextInput from "../components/TextInput"
import SearchableTopBar from "../components/SearchableTopBar"
import ToggleSwitch from "../components/ToggleSwitch"

interface Trainer {
  id: string
  firstName: string
  lastName: string
  email: string
  contactNumber: string
  speciality: string
  yearsOfExperience: string
  availability: string
  profileImage?: string
  status: boolean
}

interface TrainersListProps {
  trainers: Trainer[]
  onAddTrainer: () => void
  onViewTrainer: (id: string) => void
  onEditTrainer: (id: string) => void
  onDeleteTrainer: (id: string) => void
  onUpdateTrainerStatus?: (id: string, status: boolean) => void
}

const TrainersList: React.FC<TrainersListProps> = ({
  trainers,
  onAddTrainer,
  onViewTrainer,
  onEditTrainer,
  onDeleteTrainer,
  onUpdateTrainerStatus,
}) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [showColumnSearch, setShowColumnSearch] = useState(false)
  const [trainersState, setTrainersState] = useState(trainers)
  
  const [columnSearches, setColumnSearches] = useState({
    name: "",
    contact: "",
    specialist: "",
    experience: "",
    availability: "",
  })
  const [activeTab, setActiveTab] = useState<string | number>("registered")
  const itemsPerPage = 10

  const breadcrumbItems = [
    { label: "Setup", href: "/setup" },
    { label: "Fitness", href: "/fitness" },
  ]
  
  const tabs = [{ label: "Registered Trainers", key: "registered" }]
  
  // Update trainersState when trainers prop changes
  React.useEffect(() => {
    setTrainersState(trainers)
  }, [trainers])

  const filteredTrainers = trainersState.filter((trainer) => {
    const matchesColumnSearch =
      `${trainer.firstName} ${trainer.lastName}`.toLowerCase().includes(columnSearches.name.toLowerCase()) &&
      trainer.contactNumber.toLowerCase().includes(columnSearches.contact.toLowerCase()) &&
      trainer.speciality.toLowerCase().includes(columnSearches.specialist.toLowerCase()) &&
      trainer.yearsOfExperience.toLowerCase().includes(columnSearches.experience.toLowerCase()) &&
      trainer.availability.toLowerCase().includes(columnSearches.availability.toLowerCase())

    return matchesColumnSearch
  })

  const totalPages = Math.ceil(filteredTrainers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTrainers = filteredTrainers.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleColumnSearch = (column: string, value: string) => {
    setColumnSearches((prev) => ({
      ...prev,
      [column]: value,
    }))
    setCurrentPage(1)
  }

  const handleSearchToggle = (isVisible: boolean) => {
    setShowColumnSearch(isVisible)
    if (!isVisible) {
      setColumnSearches({
        name: "",
        contact: "",
        specialist: "",
        experience: "",
        availability: "",
      })
    }
  }

  const handleButtonClick = (type: string) => {
    if (type === "Add Trainer") {
      onAddTrainer()
    }
  }

  const handleToggleStatus = (trainerId: string) => (newStatus: boolean) => {
    // Update local state immediately for UI responsiveness
    setTrainersState(prevTrainers => 
      prevTrainers.map(trainer => 
        trainer.id === trainerId 
          ? { ...trainer, status: newStatus }
          : trainer
      )
    )
    
    // Call parent callback if provided
    if (onUpdateTrainerStatus) {
      onUpdateTrainerStatus(trainerId, newStatus)
    }
  }

  const tableColumns = [
    { label: "Action", align: "left" as const },
    { label: "Image", align: "left" as const },
    { label: "Name", align: "left" as const },
    { label: "Contact No.", align: "left" as const },
    { label: "Specialist", align: "left" as const },
    { label: "Years of Exp.", align: "left" as const },
    { label: "Availability", align: "left" as const },
    { label: "Status", align: "left" as const },
  ]

  return (
    <div className="p-2 bg-gray-50 min-h-screen" style={{ fontFamily: "PT Sans, sans-serif" }}>
      {/* Breadcrumb */}
      <div className="mb-1">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Page Title with Tabs - Reduced margin */}
      <div>
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} renderContent={() => null} />
      </div>

      {/* SearchableTopBar with Pagination in same line - Reduced margin */}
      <div className=" flex justify-between items-center">
        <SearchableTopBar
          onButtonClick={handleButtonClick}
          buttons={["Add Trainer"]}
          onSearchToggle={handleSearchToggle}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredTrainers.length}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Table - Moved up with reduced margin */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <TableHead columns={tableColumns} />
            {showColumnSearch && (
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3"></th> {/* For Action column */}
                  <th className="px-6 py-3"></th> {/* For Image column */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <TextInput
                      type="search"
                      value={columnSearches.name}
                      onChange={(e) => handleColumnSearch("name", e.target.value)}
                      placeholder="Search name..."
                      className="mb-0"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <TextInput
                      type="search"
                      value={columnSearches.contact}
                      onChange={(e) => handleColumnSearch("contact", e.target.value)}
                      placeholder="Search contact..."
                      className="mb-0"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <TextInput
                      type="search"
                      value={columnSearches.specialist}
                      onChange={(e) => handleColumnSearch("specialist", e.target.value)}
                      placeholder="Search specialist..."
                      className="mb-0"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <TextInput
                      type="search"
                      value={columnSearches.experience}
                      onChange={(e) => handleColumnSearch("experience", e.target.value)}
                      placeholder="Search experience..."
                      className="mb-0"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <TextInput
                      type="search"
                      value={columnSearches.availability}
                      onChange={(e) => handleColumnSearch("availability", e.target.value)}
                      placeholder="Search availability..."
                      className="mb-0"
                    />
                  </th>
                  <th className="px-6 py-3"></th> {/* For Status column */}
                </tr>
              </thead>
            )}
            <tbody className="bg-white divide-y divide-gray-200">
              {currentTrainers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12">
                    <NoDataFound message="No trainers found" />
                  </td>
                </tr>
              ) : (
                currentTrainers.map((trainer) => (
                  <tr key={trainer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onViewTrainer(trainer.id)}
                          className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
                          title="View Trainer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEditTrainer(trainer.id)}
                          className="p-1 text-gray-600 hover:text-green-600 transition-colors"
                          title="Edit Trainer"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteTrainer(trainer.id)}
                          className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                          title="Delete Trainer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Avatar
                        src={trainer.profileImage}
                        alt={`${trainer.firstName} ${trainer.lastName}`}
                        name={`${trainer.firstName} ${trainer.lastName}`}
                        size="sm"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {trainer.firstName} {trainer.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trainer.contactNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trainer.speciality}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {trainer.yearsOfExperience} Years
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trainer.availability}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ToggleSwitch
                        checked={trainer.status}
                        onChange={handleToggleStatus(trainer.id)}
                        name={`trainer-status-${trainer.id}`}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TrainersList