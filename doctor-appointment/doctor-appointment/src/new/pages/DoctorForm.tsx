import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Card } from "../components/Card"
import TextInput from "../components/TextInput"
import Select from "../components/Select"
import Breadcrumb from "../components/Breadcrumb"
import Avatar from "../components/Avatar"
import FileUpload from "../components/FileUpload"
import type { Doctor } from "../types/Doctor"
import { Plus } from "lucide-react"
import Modal from "../components/Modal"
import DayTimePicker from "../components/DayTimePicker"

const DoctorForm: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const [formData, setFormData] = useState<Omit<Doctor, "id">>({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    password: "",
    speciality: "",
    licenseNumber: "",
    yearsOfExperience: "",
    gender: "",
    languagesSpoken: "",
    modeOfAppointment: "",
    availability: "",
    affiliatedOrganization: "",
    branch: "",
    profilePicture: "",
    status: "active",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false)
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")

  // Load doctor data for editing
  useEffect(() => {
    if (isEdit && id) {
      const savedDoctors = localStorage.getItem("doctors")
      if (savedDoctors) {
        const doctors: Doctor[] = JSON.parse(savedDoctors)
        const doctor = doctors.find((d) => d.id === id)
        if (doctor) {
          const { id: doctorId, ...doctorData } = doctor
          setFormData(doctorData)
        }
      }
    }
  }, [isEdit, id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  // FIX 2: Update handleFileUpload to match FileUpload component interface
  const handleFileUpload = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          profilePicture: e.target?.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.contactNumber.trim()) newErrors.contactNumber = "Contact number is required"
    if (!formData.password.trim()) newErrors.password = "Password is required"
    if (!formData.speciality.trim()) newErrors.speciality = "Speciality is required"
    if (!formData.licenseNumber.trim()) newErrors.licenseNumber = "License number is required"
    if (!formData.yearsOfExperience.trim()) newErrors.yearsOfExperience = "Years of experience is required"
    if (!formData.gender) newErrors.gender = "Gender is required"
    if (!formData.modeOfAppointment) newErrors.modeOfAppointment = "Mode of appointment is required"
    if (!formData.affiliatedOrganization.trim())
      newErrors.affiliatedOrganization = "Affiliated organization is required"
    if (!formData.branch) newErrors.branch = "Branch is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const savedDoctors = localStorage.getItem("doctors")
    const doctors: Doctor[] = savedDoctors ? JSON.parse(savedDoctors) : []

    if (isEdit && id) {
      // Update existing doctor
      const updatedDoctors = doctors.map((doctor) => (doctor.id === id ? { ...formData, id } : doctor))
      localStorage.setItem("doctors", JSON.stringify(updatedDoctors))
    } else {
      // Add new doctor
      const newDoctor: Doctor = {
        ...formData,
        id: Date.now().toString(),
      }
      doctors.push(newDoctor)
      localStorage.setItem("doctors", JSON.stringify(doctors))
    }

    navigate("/doctors-appointment")
  }

  const handleCancel = () => {
    navigate("/doctors-appointment")
  }

  const breadcrumbItems = [
    { label: "Setup", href: "/setup" },
    { label: "Doctor", href: "/doctors-appointment" },
  ]

  const genderOptions = ["Male", "Female", "Others"]
  const modeOptions = ["Online", "Offline", "Both"]
  const organizationOptions = ["Envisage", "Vibe Copilot"]
  const branchOptions = [
    "Envisage, Jogeshwari, Mumbai, Maharashtra, 400102",
    "Vibe Copilot, Malad Mumbai, Maharashtra, 400064",
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen" style={{ fontFamily: "PT Sans, sans-serif" }}>
      {/* Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} current="Doctor" onClick={(item) => navigate(item.href)} />
      </div>

      {/* Form Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">{isEdit ? "Edit Doctor's Form" : "Doctor's Form"}</h1>
        <div className="flex items-center gap-4">
          {formData.profilePicture && (
            <Avatar src={formData.profilePicture} name={`${formData.firstName} ${formData.lastName}`} size="lg" />
          )}
          {/* FIX 2: Updated FileUpload props to match component interface */}
          <FileUpload
            label="Upload Doctor's Profile Picture"
            accept="image/*"
            onChange={handleFileUpload}
          />
        </div>
      </div>

      {/* Form */}
      <Card className="max-w-6xl">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              error={errors.firstName}
            />

            <TextInput
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              error={errors.lastName}
            />

            <TextInput
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              error={errors.email}
            />

            <TextInput
              label="Contact Number"
              name="contactNumber"
              type="tel"
              value={formData.contactNumber}
              onChange={handleInputChange}
              required
              error={errors.contactNumber}
            />

            <TextInput
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              error={errors.password}
            />

            <TextInput
              label="Speciality"
              name="speciality"
              value={formData.speciality}
              onChange={handleInputChange}
              required
              error={errors.speciality}
            />

            <TextInput
              label="License Number"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleInputChange}
              required
              error={errors.licenseNumber}
            />

            <TextInput
              label="Years of Experience"
              name="yearsOfExperience"
              type="number"
              value={formData.yearsOfExperience}
              onChange={handleInputChange}
              required
              error={errors.yearsOfExperience}
            />

            <Select
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              options={genderOptions}
              required
              error={errors.gender}
            />

            <TextInput
              label="Languages Spoken"
              name="languagesSpoken"
              value={formData.languagesSpoken}
              onChange={handleInputChange}
            />

            <Select
              label="Mode of Appointment"
              name="modeOfAppointment"
              value={formData.modeOfAppointment}
              onChange={handleInputChange}
              options={modeOptions}
              required
              error={errors.modeOfAppointment}
            />

            <TextInput
              label="Availability"
              name="availability"
              value={formData.availability}
              onClick={() => setShowAvailabilityModal(true)}
              readOnly
              placeholder="Click to set availability"
            />

            <Select
              label="Affiliated Organization"
              name="affiliatedOrganization"
              value={formData.affiliatedOrganization}
              onChange={handleInputChange}
              options={organizationOptions}
              required
              error={errors.affiliatedOrganization}
            />

            <Select
              label="Branch"
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              options={branchOptions}
              required
              error={errors.branch}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              {isEdit ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </Card>

      <Modal
        isOpen={showAvailabilityModal}
        onClose={() => setShowAvailabilityModal(false)}
        title=""
        showFooter={false}
        content={
          <DayTimePicker
            selectedDays={selectedDays}
            startTime={startTime}
            endTime={endTime}
            onDaysChange={setSelectedDays}
            onTimeChange={(start, end) => {
              setStartTime(start)
              setEndTime(end)
            }}
            onCancel={() => setShowAvailabilityModal(false)}
            onSet={() => {
              const availabilityText = `${selectedDays.join(", ")} ${startTime}-${endTime}`
              setFormData((prev) => ({
                ...prev,
                availability: availabilityText,
              }))
              setShowAvailabilityModal(false)
            }}
          />
        }
      />
    </div>
  )
}

export default DoctorForm