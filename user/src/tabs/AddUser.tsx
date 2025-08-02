"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { FiChevronLeft, FiChevronRight, FiChevronDown, FiChevronUp } from "react-icons/fi"

interface UserFormData {
  userCourtesy: string
  firstName: string
  lastName: string
  email: string
  mobileNumber: string
  password: string
  associatedSite: string
  userType: string
  building: string
  userCategory: string
  userAddress: string
  userPhase: string
  userStatus: string
  residentType: string
  membershipType: string
  liveHere: string
  allowFitout: string
  // Additional Information fields
  birthDate: string
  anniversary: string
  spouseBirthDate: string
  primaryEmail: string
  alternateEmail: string
  landlineNumber: string
  intercomNumber: string
  gstNumber: string
  panNumber: string
  vendor: string
  exConnection: string
  noOfAdults: string
  noOfChildrens: string
  noOfPets: string
  differentlyAbled: string
}

interface AddUserProps {
  editingUser?: any
  onBack: () => void
  onSave: () => void
}

const AddUser: React.FC<AddUserProps> = ({ editingUser, onBack, onSave }) => {
  const [formData, setFormData] = useState<UserFormData>({
    userCourtesy: "",
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
    associatedSite: "",
    userType: "",
    building: "",
    userCategory: "",
    userAddress: "",
    userPhase: "",
    userStatus: "",
    residentType: "",
    membershipType: "",
    liveHere: "",
    allowFitout: "",
    // Additional Information
    birthDate: "",
    anniversary: "",
    spouseBirthDate: "",
    primaryEmail: "",
    alternateEmail: "",
    landlineNumber: "",
    intercomNumber: "",
    gstNumber: "",
    panNumber: "",
    vendor: "",
    exConnection: "",
    noOfAdults: "",
    noOfChildrens: "",
    noOfPets: "",
    differentlyAbled: "",
  })

  const [errors, setErrors] = useState<any>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false)

  useEffect(() => {
    if (editingUser) {
      setFormData({
        ...formData,
        firstName: editingUser.firstName || "",
        lastName: editingUser.lastName || "",
        email: editingUser.email || "",
        mobileNumber: editingUser.mobileNumber || "",
        userType: editingUser.type || "",
        building: editingUser.unit || "",
      })
    }
  }, [editingUser])

  const validateForm = (): boolean => {
    const newErrors: any = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required"
    }

    if (!editingUser && !formData.password.trim()) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof UserFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("User data submitted:", formData)
      onSave()
    } catch (error) {
      console.error("Error submitting user:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center text-sm nav-text mb-6 pt-6">
        <button onClick={onBack} className="flex items-center hover:text-gray-800">
          <FiChevronLeft className="mr-1" />
          Setup
        </button>
        <FiChevronRight className="mx-2" />
        <button onClick={onBack} className="hover:text-gray-800">
          Manage User
        </button>
        <FiChevronRight className="mx-2" />
        <span className="text-gray-800 font-medium">{editingUser ? "Edit" : "Add"}</span>
      </div>

      {/* Form Container */}
      <div className={`${showAdditionalInfo ? "form-expanded" : "form-collapsed"} mx-auto p-8`}>
        <form onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="form-row-three">
            <div className="form-column">
              <div className="form-group">
                <label className="form-label">User Courtesy:</label>
                <select
                  value={formData.userCourtesy}
                  onChange={(e) => handleInputChange("userCourtesy", e.target.value)}
                  className="form-select px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                  <option value="Dr">Dr</option>
                </select>
              </div>
            </div>

            <div className="form-column">
              <div className="form-group">
                <label className="form-label">First Name:</label>
                <div>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className={`form-input px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      errors.firstName ? "border-red-500" : ""
                    }`}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
              </div>
            </div>

            <div className="form-column">
              <div className="form-group">
                <label className="form-label">Last Name:</label>
                <div>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className={`form-input px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      errors.lastName ? "border-red-500" : ""
                    }`}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="form-row-three">
            <div className="form-column">
              <div className="form-group">
                <label className="form-label">Email:</label>
                <div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`form-input px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>
            </div>

            <div className="form-column">
              <div className="form-group">
                <label className="form-label">Mobile No:</label>
                <div>
                  <input
                    type="tel"
                    value={formData.mobileNumber}
                    onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                    className={`form-input px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      errors.mobileNumber ? "border-red-500" : ""
                    }`}
                  />
                  {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>}
                </div>
              </div>
            </div>

            <div className="form-column">
              <div className="form-group">
                <label className="form-label">Password:</label>
                <div>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`form-input px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div className="form-row-three">
            <div className="form-column">
              <div className="form-group">
                <label className="form-label">Associated site:</label>
                <select
                  value={formData.associatedSite}
                  onChange={(e) => handleInputChange("associatedSite", e.target.value)}
                  className="form-select px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select Associated site</option>
                  <option value="Site 1">Site 1</option>
                  <option value="Site 2">Site 2</option>
                </select>
              </div>
            </div>

            <div className="form-column">
              <div className="form-group">
                <label className="form-label">User Type:</label>
                <select
                  value={formData.userType}
                  onChange={(e) => handleInputChange("userType", e.target.value)}
                  className="form-select px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select User type</option>
                  <option value="Owner">Owner</option>
                  <option value="Tenant">Tenant</option>
                  <option value="Unit_Resident">Unit Resident</option>
                </select>
              </div>
            </div>

            <div className="form-column">
              <div className="form-group">
                <label className="form-label">Building:</label>
                <select
                  value={formData.building}
                  onChange={(e) => handleInputChange("building", e.target.value)}
                  className="form-select px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select Building</option>
                  <option value="A">Building A</option>
                  <option value="B">Building B</option>
                  <option value="C">Building C</option>
                </select>
              </div>
            </div>
          </div>

          {/* Row 4 */}
          <div className="form-row-three">
            <div className="form-column">
              <div className="form-group">
                <label className="form-label">User Category:</label>
                <select
                  value={formData.userCategory}
                  onChange={(e) => handleInputChange("userCategory", e.target.value)}
                  className="form-select px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select User Category</option>
                  <option value="Category 1">Category 1</option>
                  <option value="Category 2">Category 2</option>
                </select>
              </div>
            </div>

            <div className="form-column">
              <div className="form-group">
                <label className="form-label">User address:</label>
                <select
                  value={formData.userAddress}
                  onChange={(e) => handleInputChange("userAddress", e.target.value)}
                  className="form-select px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select User type</option>
                  <option value="Address 1">Address 1</option>
                  <option value="Address 2">Address 2</option>
                </select>
              </div>
            </div>

            <div className="form-column">
              <div className="form-group">
                <label className="form-label">User Phase:</label>
                <select
                  value={formData.userPhase}
                  onChange={(e) => handleInputChange("userPhase", e.target.value)}
                  className="form-select px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select Building</option>
                  <option value="Phase 1">Phase 1</option>
                  <option value="Phase 2">Phase 2</option>
                </select>
              </div>
            </div>
          </div>

          {/* Row 5 - User Status, Resident Type, Membership Type */}
          <div className="radio-row-alignment">
            <div className="radio-column-1">
              <div className="form-group">
                <label className="form-label">User Status:</label>
                <select
                  value={formData.userStatus}
                  onChange={(e) => handleInputChange("userStatus", e.target.value)}
                  className="form-select px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select User Category</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="radio-column-2">
              <div className="radio-button-group">
                <label className="form-label">Resident Type:</label>
                <div className="radio-options">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="residentType"
                      value="Tenant"
                      checked={formData.residentType === "Tenant"}
                      onChange={(e) => handleInputChange("residentType", e.target.value)}
                      className="mr-2"
                    />
                    <span style={{ color: "#5E5E5E" }}>Tenant</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="residentType"
                      value="Owner"
                      checked={formData.residentType === "Owner"}
                      onChange={(e) => handleInputChange("residentType", e.target.value)}
                      className="mr-2"
                    />
                    <span style={{ color: "#5E5E5E" }}>Owner</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="radio-column-3">
              <div className="radio-button-group">
                <label className="form-label">Membership Type:</label>
                <div className="radio-options">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="membershipType"
                      value="Tenant"
                      checked={formData.membershipType === "Tenant"}
                      onChange={(e) => handleInputChange("membershipType", e.target.value)}
                      className="mr-2"
                    />
                    <span style={{ color: "#5E5E5E" }}>Tenant</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="membershipType"
                      value="Owner"
                      checked={formData.membershipType === "Owner"}
                      onChange={(e) => handleInputChange("membershipType", e.target.value)}
                      className="mr-2"
                    />
                    <span style={{ color: "#5E5E5E" }}>Owner</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Row 6 - Live Here and Allow Fitout */}
          <div className="second-row-radio">
            <div className="radio-column-1">
              <div className="radio-button-group">
                <label className="form-label">Live Here:</label>
                <div className="radio-options">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="liveHere"
                      value="Yes"
                      checked={formData.liveHere === "Yes"}
                      onChange={(e) => handleInputChange("liveHere", e.target.value)}
                      className="mr-2"
                    />
                    <span style={{ color: "#5E5E5E" }}>Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="liveHere"
                      value="Now"
                      checked={formData.liveHere === "Now"}
                      onChange={(e) => handleInputChange("liveHere", e.target.value)}
                      className="mr-2"
                    />
                    <span style={{ color: "#5E5E5E" }}>Now</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="radio-column-2">
              <div className="radio-button-group">
                <label className="form-label">Allow Fitout:</label>
                <div className="radio-options">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="allowFitout"
                      value="Yes"
                      checked={formData.allowFitout === "Yes"}
                      onChange={(e) => handleInputChange("allowFitout", e.target.value)}
                      className="mr-2"
                    />
                    <span style={{ color: "#5E5E5E" }}>Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="allowFitout"
                      value="Now"
                      checked={formData.allowFitout === "Now"}
                      onChange={(e) => handleInputChange("allowFitout", e.target.value)}
                      className="mr-2"
                    />
                    <span style={{ color: "#5E5E5E" }}>Now</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="radio-column-3">{/* Empty third column for alignment */}</div>
          </div>

          {/* Additional Information Section */}
          <div className="mb-6 additional-info-container">
            <button
              type="button"
              onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
              className="additional-info-header hover:opacity-90 transition-opacity"
            >
              <span>Additional Information</span>
              <span className="absolute right-4">
                {showAdditionalInfo ? <FiChevronUp className="w-5 h-5" /> : <FiChevronDown className="w-5 h-5" />}
              </span>
            </button>

            {showAdditionalInfo && (
              <div className="mt-4">
                {/* Additional Info Row 1 */}
                <div className="form-row-three">
                  <div className="form-column">
                    <div className="form-group">
                      <label className="form-label">Birth Date:</label>
                      <input
                        type="text"
                        value={formData.birthDate}
                        onChange={(e) => handleInputChange("birthDate", e.target.value)}
                        placeholder="dd-mm-yyyy"
                        className="form-input px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="form-column">
                    <div className="form-group">
                      <label className="form-label">Anniversary:</label>
                      <input
                        type="text"
                        value={formData.anniversary}
                        onChange={(e) => handleInputChange("anniversary", e.target.value)}
                        placeholder="dd-mm-yyyy"
                        className="form-input px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="form-column">
                    <div className="form-group">
                      <label className="form-label">Spouse birth date:</label>
                      <input
                        type="text"
                        value={formData.spouseBirthDate}
                        onChange={(e) => handleInputChange("spouseBirthDate", e.target.value)}
                        placeholder="dd-mm-yyyy"
                        className="form-input px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Info Row 2 */}
                <div className="form-row-three">
                  <div className="form-column">
                    <div className="form-group">
                      <label className="form-label">Primary Email:</label>
                      <input
                        type="email"
                        value={formData.primaryEmail}
                        onChange={(e) => handleInputChange("primaryEmail", e.target.value)}
                        className="form-input px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="form-column">
                    <div className="form-group">
                      <label className="form-label">Alternate Email:</label>
                      <input
                        type="email"
                        value={formData.alternateEmail}
                        onChange={(e) => handleInputChange("alternateEmail", e.target.value)}
                        className="form-input px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="form-column">
                    <div className="form-group">
                      <label className="form-label">Landline Number:</label>
                      <input
                        type="tel"
                        value={formData.landlineNumber}
                        onChange={(e) => handleInputChange("landlineNumber", e.target.value)}
                        className="form-input px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Info Row 3 */}
                <div className="form-row-three">
                  <div className="form-column">
                    <div className="form-group">
                      <label className="form-label">Intercom Number:</label>
                      <input
                        type="tel"
                        value={formData.intercomNumber}
                        onChange={(e) => handleInputChange("intercomNumber", e.target.value)}
                        className="form-input px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="form-column">
                    <div className="form-group">
                      <label className="form-label">Gst Number:</label>
                      <input
                        type="text"
                        value={formData.gstNumber}
                        onChange={(e) => handleInputChange("gstNumber", e.target.value)}
                        className="form-input px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="form-column">
                    <div className="form-group">
                      <label className="form-label">Pan Number:</label>
                      <input
                        type="text"
                        value={formData.panNumber}
                        onChange={(e) => handleInputChange("panNumber", e.target.value)}
                        className="form-input px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Info Row 4 */}
                <div className="form-row-three">
                  <div className="form-column">
                    <div className="form-group">
                      <label className="form-label">Vendor:</label>
                      <select
                        value={formData.vendor}
                        onChange={(e) => handleInputChange("vendor", e.target.value)}
                        className="form-select px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="">Select Vendor</option>
                        <option value="Vendor 1">Vendor 1</option>
                        <option value="Vendor 2">Vendor 2</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-column">
                    <div className="form-group">
                      <label className="form-label">Ex Connection:</label>
                      <select
                        value={formData.exConnection}
                        onChange={(e) => handleInputChange("exConnection", e.target.value)}
                        className="form-select px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="">Select</option>
                        <option value="Connection 1">Connection 1</option>
                        <option value="Connection 2">Connection 2</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-column">
                    <div className="form-group">
                      <label className="form-label">No of adults:</label>
                      <input
                        type="number"
                        value={formData.noOfAdults}
                        onChange={(e) => handleInputChange("noOfAdults", e.target.value)}
                        className="form-input px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Info Row 5 */}
                <div className="form-row-three">
                  <div className="form-column">
                    <div className="form-group">
                      <label className="form-label">No of Childrens:</label>
                      <input
                        type="number"
                        value={formData.noOfChildrens}
                        onChange={(e) => handleInputChange("noOfChildrens", e.target.value)}
                        className="form-input px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="form-column">
                    <div className="form-group">
                      <label className="form-label">No of pets:</label>
                      <input
                        type="number"
                        value={formData.noOfPets}
                        onChange={(e) => handleInputChange("noOfPets", e.target.value)}
                        className="form-input px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="form-column">
                    <div className="radio-button-group">
                      <label className="form-label">Differently Abled:</label>
                      <div className="radio-options">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="differentlyAbled"
                            value="Yes"
                            checked={formData.differentlyAbled === "Yes"}
                            onChange={(e) => handleInputChange("differentlyAbled", e.target.value)}
                            className="mr-2"
                          />
                          <span style={{ color: "#5E5E5E" }}>Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="differentlyAbled"
                            value="No"
                            checked={formData.differentlyAbled === "No"}
                            onChange={(e) => handleInputChange("differentlyAbled", e.target.value)}
                            className="mr-2"
                          />
                          <span style={{ color: "#5E5E5E" }}>No</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button - Inside form border */}
          <div className="flex justify-center mb-4 mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`create-user-btn font-medium transition-colors ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
              }`}
            >
              {isSubmitting ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddUser
