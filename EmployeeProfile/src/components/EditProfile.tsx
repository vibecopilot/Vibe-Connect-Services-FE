"use client"

import type React from "react"
import { useState } from "react"
import { useAppContext } from "../context/AppContext"

interface EditProfileProps {
  onSave: () => void
}

const EditProfile: React.FC<EditProfileProps> = ({ onSave }) => {
  const { currentEmployee, updateEmployee } = useAppContext()
  const [formData, setFormData] = useState(currentEmployee)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev: any) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.contactNumber.trim()) newErrors.contactNumber = "Contact number is required"
    if (!formData.department.trim()) newErrors.department = "Department is required"
    if (!formData.position.trim()) newErrors.position = "Position is required"
    if (!formData.manager.trim()) newErrors.manager = "Manager is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      updateEmployee(formData)
      onSave()
    } catch (error) {
      console.error("Error saving profile:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white" data-testid="edit-profile-container">
      {/* Background band for the title */}
      <div
        className="w-full flex items-center justify-center mx-auto"
        style={{
          height: "50px",
          backgroundColor: "#D9D9D9",
        }}
      >
        <h1
          className="text-[#5E5E5E]"
          style={{ fontFamily: "PT Sans", fontWeight: "normal", fontSize: "26.11px", lineHeight: "100%" }}
          data-testid="edit-profile-title"
        >
          Edit Employee Profile
        </h1>
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-[10px] shadow-sm border border-[#878787] p-8">
          <form onSubmit={handleSubmit} className="space-y-6" data-testid="edit-profile-form" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block font-normal text-[#5E5E5E] mb-2" style={{ fontSize: "23.11px" }}>
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter Name"
                  className={`w-full px-3 py-2 border rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-[#878787]`}
                  style={{
                    height: "54px",
                    fontSize: "22px",
                    borderColor: errors.name ? "red" : "#878787",
                    width: "290px",
                  }}
                  data-testid="name-input"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-600" data-testid="name-error">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-normal text-[#5E5E5E] mb-2" style={{ fontSize: "23.11px" }}>
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  placeholder="Enter Contact No"
                  className={`w-full px-3 py-2 border rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-[#878787]`}
                  style={{
                    height: "54px",
                    fontSize: "22px",
                    borderColor: errors.contactNumber ? "red" : "#878787",
                    width: "290px",
                  }}
                  data-testid="contact-input"
                  aria-invalid={!!errors.contactNumber}
                  aria-describedby={errors.contactNumber ? "contact-error" : undefined}
                />
                {errors.contactNumber && (
                  <p id="contact-error" className="mt-1 text-sm text-red-600" data-testid="contact-error">
                    {errors.contactNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-normal text-[#5E5E5E] mb-2" style={{ fontSize: "23.11px" }}>
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Email"
                  className={`w-full px-3 py-2 border rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-[#878787]`}
                  style={{
                    height: "54px",
                    fontSize: "22px",
                    borderColor: errors.email ? "red" : "#878787",
                    width: "290px",
                  }}
                  data-testid="email-input"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600" data-testid="email-error">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block font-normal text-[#5E5E5E] mb-2" style={{ fontSize: "23.11px" }}>
                  Department <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="Enter Department"
                  className={`w-full px-3 py-2 border rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-[#878787]`}
                  style={{
                    height: "54px",
                    fontSize: "22px",
                    borderColor: errors.department ? "red" : "#878787",
                    width: "290px",
                  }}
                  data-testid="department-input"
                  aria-invalid={!!errors.department}
                  aria-describedby={errors.department ? "department-error" : undefined}
                />
                {errors.department && (
                  <p id="department-error" className="mt-1 text-sm text-red-600" data-testid="department-error">
                    {errors.department}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-normal text-[#5E5E5E] mb-2" style={{ fontSize: "23.11px" }}>
                  Team
                </label>
                <input
                  type="text"
                  name="team"
                  value={formData.team}
                  onChange={handleInputChange}
                  placeholder="Enter Team"
                  className="w-full px-3 py-2 border rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-[#878787]"
                  style={{ height: "54px", fontSize: "22px", borderColor: "#878787", width: "290px" }}
                  data-testid="team-input"
                />
              </div>

              <div>
                <label className="block font-normal text-[#5E5E5E] mb-2" style={{ fontSize: "23.11px" }}>
                  Job Title
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  placeholder="Enter Job Title"
                  className="w-full px-3 py-2 border rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-[#878787]"
                  style={{ height: "54px", fontSize: "22px", borderColor: "#878787", width: "290px" }}
                  data-testid="job-title-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block font-normal text-[#5E5E5E] mb-2" style={{ fontSize: "23.11px" }}>
                  Position <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="Enter Position"
                  className={`w-full px-3 py-2 border rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-[#878787]`}
                  style={{
                    height: "54px",
                    fontSize: "22px",
                    borderColor: errors.position ? "red" : "#878787",
                    width: "290px",
                  }}
                  data-testid="position-input"
                  aria-invalid={!!errors.position}
                  aria-describedby={errors.position ? "position-error" : undefined}
                />
                {errors.position && (
                  <p id="position-error" className="mt-1 text-sm text-red-600" data-testid="position-error">
                    {errors.position}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-normal text-[#5E5E5E] mb-2" style={{ fontSize: "23.11px" }}>
                  Manager <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="manager"
                  value={formData.manager}
                  onChange={handleInputChange}
                  placeholder="Enter Manager Name"
                  className={`w-full px-3 py-2 border rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-[#878787]`}
                  style={{
                    height: "54px",
                    fontSize: "22px",
                    borderColor: errors.manager ? "red" : "#878787",
                    width: "290px",
                  }}
                  data-testid="manager-input"
                  aria-invalid={!!errors.manager}
                  aria-describedby={errors.manager ? "manager-error" : undefined}
                />
                {errors.manager && (
                  <p id="manager-error" className="mt-1 text-sm text-red-600" data-testid="manager-error">
                    {errors.manager}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-normal text-[#5E5E5E] mb-2" style={{ fontSize: "23.11px" }}>
                  Supervisor
                </label>
                <input
                  type="text"
                  name="supervisor"
                  value={formData.supervisor}
                  onChange={handleInputChange}
                  placeholder="Enter Supervisor Name"
                  className="w-full px-3 py-2 border rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-[#878787]"
                  style={{ height: "54px", fontSize: "22px", borderColor: "#878787", width: "290px" }}
                  data-testid="supervisor-input"
                />
              </div>
            </div>

            {/* Bio input now spans all three columns with adjusted width and margin */}
            <div className="col-span-3">
              <label className="block font-normal text-[#5E5E5E] mb-2" style={{ fontSize: "23.11px" }}>
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Enter Bio"
                rows={4}
                className="px-3 py-2 border rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors text-[#878787]"
                style={{
                  borderColor: "#878787",
                  fontSize: "22px",
                  width: "1013px", // Adjusted width (918px - 15px)
                  // marginLeft: "15px", // Added left margin
                }}
                data-testid="bio-input"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-2 text-white rounded-[5px] border border-[#878787] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ width: "186px", height: "54px", backgroundColor: "#7991BB", fontSize: "26.11px" }}
                data-testid="save-button"
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
