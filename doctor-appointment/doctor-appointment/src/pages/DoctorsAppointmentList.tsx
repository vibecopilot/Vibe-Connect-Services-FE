
import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import SearchableTopBar from "../components/SearchableTopBar" // Updated import
import Breadcrumb from "../components/Breadcrumb"
import Pagination from "../components/Pagination"
import Avatar from "../components/Avatar"
import IconButton from "../components/IconButton"
import NoDataFound from "../components/NoDataFound"
import ToggleSwitch from "../components/ToggleSwitch"
import TableHead from "../components/TopHead"
import Tabs from "../components/Tabs"
import TextInput from "../components/TextInput" // Import TextInput for column filters
import type { Doctor } from "../types/Doctor"
import { Eye, Edit, Trash2 } from "lucide-react" // Import Trash2 icon

const DoctorsAppointmentList: React.FC = () => {
  const navigate = useNavigate()
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [showColumnFilters, setShowColumnFilters] = useState(false) // New state for column filters

  // States for individual column filters
  const [nameFilter, setNameFilter] = useState("")
  const [contactFilter, setContactFilter] = useState("")
  const [specialityFilter, setSpecialityFilter] = useState("")
  const [yearsOfExperienceFilter, setYearsOfExperienceFilter] = useState("")
  const [licenseNumberFilter, setLicenseNumberFilter] = useState("")
  const [availabilityFilter, setAvailabilityFilter] = useState("")

  const [activeTab, setActiveTab] = useState<string | number>("registered-doctors")

  // Load doctors from localStorage on component mount
  useEffect(() => {
    const savedDoctors = localStorage.getItem("doctors")
    if (savedDoctors) {
      const parsedDoctors = JSON.parse(savedDoctors)
      setDoctors(parsedDoctors)
    }
  }, [])

  // Filter doctors based on all active filters
  useEffect(() => {
    let currentFilteredDoctors = doctors

    if (nameFilter.trim()) {
      currentFilteredDoctors = currentFilteredDoctors.filter((doctor) =>
        `${doctor.firstName} ${doctor.lastName}`.toLowerCase().includes(nameFilter.toLowerCase()),
      )
    }
    if (contactFilter.trim()) {
      currentFilteredDoctors = currentFilteredDoctors.filter((doctor) => doctor.contactNumber.includes(contactFilter))
    }
    if (specialityFilter.trim()) {
      currentFilteredDoctors = currentFilteredDoctors.filter((doctor) =>
        doctor.speciality.toLowerCase().includes(specialityFilter.toLowerCase()),
      )
    }
    if (yearsOfExperienceFilter.trim()) {
      currentFilteredDoctors = currentFilteredDoctors.filter((doctor) =>
        doctor.yearsOfExperience.includes(yearsOfExperienceFilter),
      )
    }
    if (licenseNumberFilter.trim()) {
      currentFilteredDoctors = currentFilteredDoctors.filter((doctor) =>
        doctor.licenseNumber.toLowerCase().includes(licenseNumberFilter.toLowerCase()),
      )
    }
    if (availabilityFilter.trim()) {
      currentFilteredDoctors = currentFilteredDoctors.filter((doctor) =>
        doctor.availability.toLowerCase().includes(availabilityFilter.toLowerCase()),
      )
    }

    setFilteredDoctors(currentFilteredDoctors)
    setCurrentPage(1) // Reset to first page on filter change
  }, [
    doctors,
    nameFilter,
    contactFilter,
    specialityFilter,
    yearsOfExperienceFilter,
    licenseNumberFilter,
    availabilityFilter,
  ])

  const handleButtonClick = (type: string) => {
    if (type === "Add Doctor") {
      navigate("/doctors-appointment/new")
    }
  }

  const handleEdit = (doctorId: string) => {
    navigate(`/doctors-appointment/${doctorId}/edit`)
  }

  const handleView = (doctorId: string) => {
    navigate(`/doctors-appointment/${doctorId}/view`)
  }

  const handleDelete = (doctorId: string) => {
    const updatedDoctors = doctors.filter((doctor) => doctor.id !== doctorId)
    setDoctors(updatedDoctors)
    localStorage.setItem("doctors", JSON.stringify(updatedDoctors))
  }

  const handleStatusToggle = (doctorId: string, newStatus: boolean) => {
    const updatedDoctors = doctors.map((doctor) =>
      doctor.id === doctorId
        ? { ...doctor, status: newStatus ? "active" : ("inactive" as "active" | "inactive") }
        : doctor,
    )
    setDoctors(updatedDoctors)
    localStorage.setItem("doctors", JSON.stringify(updatedDoctors))
  }

  const breadcrumbItems = [
    { label: "Setup", href: "/setup" },
    { label: "Doctor", href: "/doctors-appointment" },
  ]

  // Define table columns for TableHead component
  const tableColumns = [
    { label: "Action", align: "left" as const },
    { label: "Image", align: "left" as const },
    { label: "Name", align: "left" as const },
    { label: "Contact No.", align: "left" as const },
    { label: "Specialist", align: "left" as const },
    { label: "Years of Exp.", align: "left" as const },
    { label: "License No.", align: "left" as const },
    { label: "Availability", align: "left" as const },
    { label: "Status", align: "left" as const },
  ]

  const tabs = [{ label: "Registered Doctors", key: "registered-doctors" }]

  const renderTabContent = (activeTab: string | number) => {
    if (activeTab === "registered-doctors") {
      return (
        <div>
          {/* Top Bar with Search Toggle and Add Button */}
          <SearchableTopBar
            onButtonClick={handleButtonClick}
            buttons={["Add Doctor"]}
            onSearchToggle={setShowColumnFilters}
          />

          {/* Pagination Info */}
          <div className="flex justify-end mb-4">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredDoctors.length / 10)}
              totalItems={filteredDoctors.length}
              onPageChange={setCurrentPage}
            />
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <TableHead columns={tableColumns} />
              {showColumnFilters && (
                <thead>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-2"></td> {/* For Action column */}
                    <td className="px-4 py-2"></td> {/* For Image column */}
                    <td className="px-4 py-2">
                      <TextInput
                        placeholder="Filter Name"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        className="w-full"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <TextInput
                        placeholder="Filter Contact"
                        value={contactFilter}
                        onChange={(e) => setContactFilter(e.target.value)}
                        className="w-full"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <TextInput
                        placeholder="Filter Specialist"
                        value={specialityFilter}
                        onChange={(e) => setSpecialityFilter(e.target.value)}
                        className="w-full"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <TextInput
                        placeholder="Filter Years"
                        value={yearsOfExperienceFilter}
                        onChange={(e) => setYearsOfExperienceFilter(e.target.value)}
                        className="w-full"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <TextInput
                        placeholder="Filter License"
                        value={licenseNumberFilter}
                        onChange={(e) => setLicenseNumberFilter(e.target.value)}
                        className="w-full"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <TextInput
                        placeholder="Filter Availability"
                        value={availabilityFilter}
                        onChange={(e) => setAvailabilityFilter(e.target.value)}
                        className="w-full"
                      />
                    </td>
                    <td className="px-4 py-2"></td> {/* For Status column */}
                  </tr>
                </thead>
              )}
              <tbody>
                {filteredDoctors.length === 0 ? (
                  <tr>
                    <td colSpan={tableColumns.length} className="px-4 py-8">
                      <NoDataFound message="No doctors found. Click 'Add Doctor' to get started." />
                    </td>
                  </tr>
                ) : (
                  filteredDoctors.map((doctor) => (
                    <tr key={doctor.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <IconButton tooltip="View Doctor" onClick={() => handleView(doctor.id)}>
                            <Eye className="w-4 h-4" />
                          </IconButton>
                          <IconButton tooltip="Edit Doctor" onClick={() => handleEdit(doctor.id)}>
                            <Edit className="w-4 h-4" />
                          </IconButton>
                          <IconButton tooltip="Delete Doctor" onClick={() => handleDelete(doctor.id)}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </IconButton>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Avatar src={doctor.profilePicture} name={`${doctor.firstName} ${doctor.lastName}`} size="md" />
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{`${doctor.firstName} ${doctor.lastName}`}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{doctor.contactNumber}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{doctor.speciality}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{doctor.yearsOfExperience} Years</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{doctor.licenseNumber}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{doctor.availability}</td>
                      <td className="px-4 py-3">
                        <ToggleSwitch
                          checked={doctor.status === "active"}
                          onChange={(checked) => handleStatusToggle(doctor.id, checked)}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen" style={{ fontFamily: "PT Sans, sans-serif" }}>
      {/* Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} current="Doctor" onClick={(item) => navigate(item.href)} />
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} renderContent={renderTabContent} />
    </div>
  )
}

export default DoctorsAppointmentList
