
import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Card } from "../components/Card"
import Breadcrumb from "../components/Breadcrumb"
import Avatar from "../components/Avatar"
import type { Doctor } from "../types/Doctor"

const DoctorView: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [doctor, setDoctor] = useState<Doctor | null>(null)

  // Load doctor data
  useEffect(() => {
    if (id) {
      const savedDoctors = localStorage.getItem("doctors")
      if (savedDoctors) {
        const doctors: Doctor[] = JSON.parse(savedDoctors)
        const foundDoctor = doctors.find((d) => d.id === id)
        if (foundDoctor) {
          setDoctor(foundDoctor)
        }
      }
    }
  }, [id])

  const handleBack = () => {
    navigate("/doctors-appointment")
  }

  const handleEdit = () => {
    navigate(`/doctors-appointment/${id}/edit`)
  }

  const breadcrumbItems = [
    { label: "Setup", href: "/setup" },
    { label: "Doctor", href: "/doctors-appointment" },
  ]

  if (!doctor) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen" style={{ fontFamily: "PT Sans, sans-serif" }}>
        <div className="text-center">Doctor not found</div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen" style={{ fontFamily: "PT Sans, sans-serif" }}>
      {/* Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} current="Doctor" onClick={(item) => navigate(item.href)} />
      </div>

      {/* Form Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Doctor's Details</h1>
        <div className="flex items-center gap-4">
          {doctor.profilePicture && (
            <Avatar src={doctor.profilePicture} name={`${doctor.firstName} ${doctor.lastName}`} size="lg" />
          )}
        </div>
      </div>

      {/* Details Card */}
      <Card className="max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name:</label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">{doctor.firstName}</div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name:</label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">{doctor.lastName}</div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">{doctor.email}</div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number:</label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">{doctor.contactNumber}</div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password:</label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">••••••••••</div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Speciality:</label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">{doctor.speciality}</div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">License Number:</label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">{doctor.licenseNumber}</div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience:</label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
              {doctor.yearsOfExperience}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender:</label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">{doctor.gender}</div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Languages Spoken:</label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
              {doctor.languagesSpoken}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mode of Appointment:</label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
              {doctor.modeOfAppointment}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Availability:</label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">{doctor.availability}</div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Affiliated Organization:</label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
              {doctor.affiliatedOrganization}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Branch:</label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">{doctor.branch}</div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={handleBack}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleEdit}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Edit
          </button>
        </div>
      </Card>
    </div>
  )
}

export default DoctorView
