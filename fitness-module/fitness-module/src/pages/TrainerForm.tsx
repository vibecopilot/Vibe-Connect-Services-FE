import type React from "react"
import { useState, useEffect } from "react"
import { Card } from "../components/Card"
import TextInput from "../components/TextInput"
import Select from "../components/Select"
import Breadcrumb from "../components/Breadcrumb"
import Modal from "../components/Modal"
import DayTimePicker from "../components/DayTimePicker"
import ProfilePictureUpload from "../components/ProfilePictureUpload" // Import ProfilePictureUpload
import PhoneInput from "../components/PhoneInput" // Import PhoneInput

interface Trainer {
  id?: string
  firstName: string
  lastName: string
  email: string
  contactNumber: string
  password: string
  speciality: string
  gender: string
  yearsOfExperience: string
  languagesSpoken: string
  modeOfAppointment: string
  availability: string
  affiliatedOrganization: string
  branch: string
  profileImage?: string
  status: boolean
}

interface TrainerFormProps {
  trainer?: Trainer
  onSave: (trainerData: Trainer) => void
  onCancel: () => void
  isEdit?: boolean
  isView?: boolean
}

const TrainerForm: React.FC<TrainerFormProps> = ({
  trainer, 
  onSave, 
  onCancel, 
  isEdit = false, 
  isView = false
}) => {
  const [formData, setFormData] = useState<Trainer>({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    password: "",
    speciality: "",
    gender: "",
    yearsOfExperience: "",
    languagesSpoken: "",
    modeOfAppointment: "",
    availability: "",
    affiliatedOrganization: "",
    branch: "",
    profileImage: "",
    status: true,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false)
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")

  // Load trainer data for editing/viewing
  useEffect(() => {
    if (trainer) {
      setFormData(trainer)
      // Parse availability if it exists
      if (trainer.availability) {
        const parts = trainer.availability.split(", ")
        if (parts.length >= 2) {
          const days = parts[0].split("-")
          setSelectedDays(days)
          const times = parts[1]?.split("-")
          if (times && times.length === 2) {
            setStartTime(times[0])
            setEndTime(times[1])
          }
        }
      }
    }
  }, [trainer])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (isView) return // Prevent editing in view mode

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

  const handlePhoneInputChange = (e: { target: { name: string; value: string } }) => {
    if (isView) return // Prevent editing in view mode

    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleProfileImageUpload = (files: FileList | null) => {
    if (isView) return // Prevent file upload in view mode

    if (files && files.length > 0) {
      const file = files[0]
      const imageUrl = URL.createObjectURL(file)
      setFormData((prev) => ({
        ...prev,
        profileImage: imageUrl,
      }))
    }
  }

  const handleRemoveProfilePicture = () => {
    if (isView) return // Prevent removal in view mode
    setFormData((prev) => ({
      ...prev,
      profileImage: undefined,
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.contactNumber.trim()) newErrors.contactNumber = "Contact number is required"
    if (!formData.password.trim()) newErrors.password = "Password is required"
    if (!formData.speciality.trim()) newErrors.speciality = "Speciality is required"
    if (!formData.yearsOfExperience.trim()) newErrors.yearsOfExperience = "Years of experience is required"
    if (!formData.gender) newErrors.gender = "Gender is required"
    if (!formData.modeOfAppointment) newErrors.modeOfAppointment = "Mode of appointment is required"
    if (!formData.affiliatedOrganization.trim()) newErrors.affiliatedOrganization = "Affiliated organization is required"
    if (!formData.branch) newErrors.branch = "Branch is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isView) return // Prevent submission in view mode

    if (!validateForm()) {
      return
    }

    onSave(formData)
  }

  const breadcrumbItems = [
    { label: "Setup", href: "/setup" },
    { label: "Fitness", href: "/fitness" },
  ]

  const genderOptions = ["Male", "Female", "Others"]
  const modeOptions = ["Online", "Offline", "Both"]
  const organizationOptions = ["Envisage", "Vibe Copilot"]
  const branchOptions = [
    "Envisage, Jogeshwari, Mumbai, Maharashtra, 400102",
    "Vibe Copilot, Malad Mumbai, Maharashtra, 400064",
  ]

  const getFormTitle = () => {
    if (isView) return "Trainer Details"
    if (isEdit) return "Edit Trainer's Form"
    return "Trainer's Form"
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen" style={{ fontFamily: "PT Sans, sans-serif" }}>
      {/* Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} current="Fitness" />
      </div>

      {/* Form Header */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">{getFormTitle()}</h1>
        <div>
          {!isView && (
            <ProfilePictureUpload
              profilePicture={formData.profileImage}
              firstName={formData.firstName}
              lastName={formData.lastName}
              onFileUpload={handleProfileImageUpload}
              onRemovePicture={handleRemoveProfilePicture}
            />
          )}
          {isView && formData.profileImage && (
            <img
              src={formData.profileImage || "/placeholder.svg"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />
          )}
        </div>
      </div>

      {/* Centered Form */}
      <div className="flex justify-center">
        <Card className="w-full max-w-5xl">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextInput
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                disabled={isView}
                error={errors.firstName}
                placeholder="Add First Name"
              />

              <TextInput
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                disabled={isView}
                error={errors.lastName}
                placeholder="Add Last Name"
              />

              <TextInput
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isView}
                error={errors.email}
                placeholder="Add Email"
              />

              <PhoneInput
                label="Contact Number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handlePhoneInputChange}
                required
                disabled={isView}
                error={errors.contactNumber}
              />

              <TextInput
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={isView}
                error={errors.password}
                placeholder="Add Password"
              />

              <TextInput
                label="Speciality"
                name="speciality"
                value={formData.speciality}
                onChange={handleInputChange}
                required
                disabled={isView}
                error={errors.speciality}
                placeholder="Add Speciality"
              />

              <Select
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                options={genderOptions}
                required
                disabled={isView}
                error={errors.gender}
                placeholder="Select Gender"
              />

              <TextInput
                label="Years of Experience"
                name="yearsOfExperience"
                type="number"
                value={formData.yearsOfExperience}
                onChange={handleInputChange}
                required
                disabled={isView}
                error={errors.yearsOfExperience}
                placeholder="Add Years of Experience"
              />

              <TextInput
                label="Languages Spoken"
                name="languagesSpoken"
                value={formData.languagesSpoken}
                onChange={handleInputChange}
                disabled={isView}
                placeholder="Add Language Spoken"
              />

              <Select
                label="Mode of Appointment"
                name="modeOfAppointment"
                value={formData.modeOfAppointment}
                onChange={handleInputChange}
                options={modeOptions}
                required
                disabled={isView}
                error={errors.modeOfAppointment}
                placeholder="Select Mode of Appointment"
              />

              <div className="relative">
                <TextInput
                  label="Availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  disabled={isView}
                  placeholder={isView ? "" : "Add Availability"}
                />
                {!isView && (
                  <button
                    type="button"
                    onClick={() => setShowAvailabilityModal(true)}
                    className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                  >
                    📅
                  </button>
                )}
              </div>

              <Select
                label="Affiliated Organization"
                name="affiliatedOrganization"
                value={formData.affiliatedOrganization}
                onChange={handleInputChange}
                options={organizationOptions}
                required
                disabled={isView}
                error={errors.affiliatedOrganization}
                placeholder="Select Affiliated Organization"
              />

              <Select
                label="Branch"
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                options={branchOptions}
                required
                disabled={isView}
                error={errors.branch}
                placeholder="Select Branch"
              />
            </div>

            {/* Form Actions - positioned to match image */}
            <div className="flex justify-start gap-4 mt-8">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                {isView ? "Back" : "Cancel"}
              </button>
              {!isView && (
                <button
                  type="submit"
                  className="px-6 py-2 text-white rounded-md hover:opacity-90"
                  style={{ backgroundColor: "#7991BB" }}
                >
                  {isEdit ? "Update" : "Save"}
                </button>
              )}
            </div>
          </form>
        </Card>
      </div>

      {!isView && (
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
                const availabilityText = `${selectedDays.join("-")}, ${startTime}-${endTime}`
                setFormData((prev) => ({
                  ...prev,
                  availability: availabilityText,
                }))
                setShowAvailabilityModal(false)
              }}
            />
          }
        />
      )}
    </div>
  )
}

export default TrainerForm