import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import TopBar from "../components/TopBar"
import Breadcrumb from "../components/Breadcrumb"
import Pagination from "../components/Pagination"
import Avatar from "../components/Avatar"
import IconButton from "../components/IconButton"
import NoDataFound from "../components/NoDataFound"
import ToggleSwitch from "../components/ToggleSwitch"
import TableHead from "../components/TopHead"
import Tabs from "../components/Tabs"
import type { Doctor } from "../types/Doctor"
import { Eye, Edit } from "lucide-react"

const DoctorsAppointmentList: React.FC = () => {
  const navigate = useNavigate()
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  // FIX 1: Change activeTab to string | number to match Tabs component
  const [activeTab, setActiveTab] = useState<string | number>("registered-doctors")

  // Load doctors from localStorage on component mount
  useEffect(() => {
    const savedDoctors = localStorage.getItem("doctors")
    if (savedDoctors) {
      const parsedDoctors = JSON.parse(savedDoctors)
      setDoctors(parsedDoctors)
      setFilteredDoctors(parsedDoctors)
    }
  }, [])

  // Filter doctors based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredDoctors(doctors)
    } else {
      const filtered = doctors.filter(
        (doctor) =>
          doctor.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.speciality.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.contactNumber.includes(searchQuery),
      )
      setFilteredDoctors(filtered)
    }
    setCurrentPage(1)
  }, [searchQuery, doctors])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

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
          {/* Top Bar with Search and Add Button */}
          <TopBar onSearch={handleSearch} onButtonClick={handleButtonClick} buttons={["Add Doctor"]} />

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
              <tbody>
                {filteredDoctors.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-8">
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