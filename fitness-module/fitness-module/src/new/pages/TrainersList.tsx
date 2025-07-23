import type React from "react"
import { useState } from "react"
import { Eye, Edit, Search, Trash2 } from "lucide-react" // Import Trash2
import Breadcrumb from "../components/Breadcrumb"
import Avatar from "../components/Avatar"
import Pagination from "../components/Pagination"
import NoDataFound from "../components/NoDataFound"
import Tabs from "../components/Tabs"
import TableHead from "../components/TopHead" // Import TableHead
import TextInput from "../components/TextInput" // Import TextInput for column search

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
  onDeleteTrainer: (id: string) => void // Add onDeleteTrainer prop
}

const TrainersList: React.FC<TrainersListProps> = ({
  trainers,
  onAddTrainer,
  onViewTrainer,
  onEditTrainer,
  onDeleteTrainer,
}) => {
  const [searchQuery, setSearchQuery] = useState("") // Keep for potential global search if needed later, though not used directly now
  const [currentPage, setCurrentPage] = useState(1)
  const [showColumnSearch, setShowColumnSearch] = useState(false)
  
  const [columnSearches, setColumnSearches] = useState({
    name: "",
    contact: "",
    specialist: "",
    experience: "",
    availability: "",
  })
  const [activeTab, setActiveTab] = useState<string | number>("registered") // Fix TypeScript error here
  const itemsPerPage = 10

  const breadcrumbItems = [
    { label: "Setup", href: "/setup" },
    { label: "Fitness", href: "/fitness" },
  ]
  
  const tabs = [{ label: "Registered Trainers", key: "registered" }]
  
  const filteredTrainers = trainers.filter((trainer) => {
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

  const toggleColumnSearch = () => {
    setShowColumnSearch(!showColumnSearch)
    if (!showColumnSearch) {
      // Reset column searches when hiding
      setColumnSearches({
        name: "",
        contact: "",
        specialist: "",
        experience: "",
        availability: "",
      })
    }
  }

  const tableColumns = [
    { label: "Action", align: "left" },
    { label: "Image", align: "left" },
    { label: "Name", align: "left" },
    { label: "Contact No.", align: "left" },
    { label: "Specialist", align: "left" },
    { label: "Years of Exp.", align: "left" },
    { label: "Availability", align: "left" },
    { label: "Status", align: "left" },
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen" style={{ fontFamily: "PT Sans, sans-serif" }}>
      {/* Breadcrumb */}
      <div className="mb-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Page Title with Tabs */}
      <div className="mb-6">
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} renderContent={() => null} />
      </div>

      {/* Top section with Search and Add Trainer Button */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={toggleColumnSearch} className="p-2 text-gray-600 hover:text-blue-600">
            <Search size={20} />
          </button>
          <button
            onClick={() => onAddTrainer()}
            className="bg-white text-[#5E5E5E] px-3 py-2 rounded-md border border-[#9E9E9E] transition cursor-pointer"
          >
            Add Trainer
          </button>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredTrainers.length}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <TableHead columns={tableColumns} /> {/* Using TableHead component */}
            {showColumnSearch && (
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3"></th> {/* For Action column */}
                  <th className="px-6 py-3"></th> {/* For Image column */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <TextInput
                      type="text"
                      value={columnSearches.name}
                      onChange={(e) => handleColumnSearch("name", e.target.value)}
                      placeholder="Search name..."
                      className="w-full"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <TextInput
                      type="text"
                      value={columnSearches.contact}
                      onChange={(e) => handleColumnSearch("contact", e.target.value)}
                      placeholder="Search contact..."
                      className="w-full"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <TextInput
                      type="text"
                      value={columnSearches.specialist}
                      onChange={(e) => handleColumnSearch("specialist", e.target.value)}
                      placeholder="Search specialist..."
                      className="w-full"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <TextInput
                      type="text"
                      value={columnSearches.experience}
                      onChange={(e) => handleColumnSearch("experience", e.target.value)}
                      placeholder="Search experience..."
                      className="w-full"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <TextInput
                      type="text"
                      value={columnSearches.availability}
                      onChange={(e) => handleColumnSearch("availability", e.target.value)}
                      placeholder="Search availability..."
                      className="w-full"
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
                          className="p-1 text-gray-600 hover:text-red-600 transition-colors border border-gray-300 rounded"
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
                      <div
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          trainer.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {trainer.status ? "Active" : "Inactive"}
                      </div>
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