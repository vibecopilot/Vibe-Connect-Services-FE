"use client"

import type React from "react"
import { useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight, Upload } from "lucide-react"

const AdvanceReimbursementForm: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [formData, setFormData] = useState({
    employeeName: "",
    mobileNo: "",
    email: "",
    department: "",
    projectSite: "",
    destination: "",
    purpose: "",
    dateOfTravel: "",
    adhocRequest: "No",
    requestedAmount: "",
    estimatedBudget: null as File | null,
    travelItinerary: null as File | null,
    otherDocuments: null as File | null,
  })

  const [declarations, setDeclarations] = useState([false, false, false])

  const subTabs = [
    { name: "Advance Reimbursements", path: "/travelling-allowance/advance-reimbursements", active: true },
    { name: "Reimbursement", path: "/travelling-allowance/reimbursement", active: false },
  ]

  const advanceSubTabs = [
    { name: "Advance Reimbursement Requests", path: "/travelling-allowance/advance-reimbursements", active: true },
    { name: "Disbursement", path: "/travelling-allowance/disbursement", active: false },
    { name: "Expense Submission & Reconciliation", path: "/travelling-allowance/expense-submission", active: false },
  ]

  const declarationTexts = [
    "I hereby declare that the advance requested is for official purposes only and will be used as per the estimated breakdown submitted.",
    "I confirm that I will submit all original bills and receipts within the required timeline after completion of the travel/activity.",
    "I understand that any unutilized amount must be returned to the company or adjusted in future claims.",
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({
      ...prev,
      [fieldName]: file,
    }))
  }

  const handleDeclarationChange = (index: number) => {
    setDeclarations((prev) => {
      const newDeclarations = [...prev]
      newDeclarations[index] = !newDeclarations[index]
      return newDeclarations
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    navigate("/travelling-allowance/advance-reimbursements")
  }

  return (
    <div className="bg-white">
      {/* Sub Navigation Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex">
          {subTabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                tab.active
                  ? "border-blue-500 text-blue-600 bg-blue-50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Advance Sub Navigation Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex">
          {advanceSubTabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                tab.active
                  ? "border-blue-500 text-blue-600 bg-blue-50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center px-6 py-2 text-sm text-gray-600 border-b border-gray-200">
        <span className="mr-4">1-1 of 1</span>
        <button className="p-1 hover:bg-gray-100 rounded">
          <ChevronLeft className="w-4 h-4 text-[#5E5E5E]" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <ChevronRight className="w-4 h-4 text-[#5E5E5E]" />
        </button>
      </div>

      {/* Form Content */}
      <div className="p-6">
        <div className="bg-gray-100 px-4 py-2 mb-6">
          <h2 className="text-lg font-medium text-center">
            {isEdit ? "Edit Advance Reimbursement Request" : "Add Advance Reimbursement Request"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employee Name</label>
              <input
                type="text"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile No</label>
              <input
                type="tel"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project/Site</label>
              <input
                type="text"
                name="projectSite"
                value={formData.projectSite}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Purpose</label>
              <input
                type="text"
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Travel</label>
              <input
                type="date"
                name="dateOfTravel"
                value={formData.dateOfTravel}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Requested Amount</label>
              <input
                type="text"
                name="requestedAmount"
                value={formData.requestedAmount}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Supporting Documents */}
          <div>
            <div className="bg-gray-100 px-4 py-2 mb-4">
              <h3 className="text-lg font-medium text-center">Supporting Documents</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Budget Sheet</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "estimatedBudget")}
                    className="hidden"
                    id="estimatedBudget"
                  />
                  <label htmlFor="estimatedBudget" className="cursor-pointer">
                    <Upload className="w-6 h-6 text-[#5E5E5E] mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Upload</p>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tentative Travel Itinerary</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "travelItinerary")}
                    className="hidden"
                    id="travelItinerary"
                  />
                  <label htmlFor="travelItinerary" className="cursor-pointer">
                    <Upload className="w-6 h-6 text-[#5E5E5E] mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Upload</p>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Other Supporting Documents</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "otherDocuments")}
                    className="hidden"
                    id="otherDocuments"
                  />
                  <label htmlFor="otherDocuments" className="cursor-pointer">
                    <Upload className="w-6 h-6 text-[#5E5E5E] mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Upload</p>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Employee Declaration */}
          <div>
            <div className="bg-gray-100 px-4 py-2 mb-4">
              <h3 className="text-lg font-medium text-center">Employee Declaration</h3>
            </div>

            <div className="space-y-4">
              {declarationTexts.map((text, index) => (
                <div key={index} className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id={`declaration-${index}`}
                    checked={declarations[index]}
                    onChange={() => handleDeclarationChange(index)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                  />
                  <label htmlFor={`declaration-${index}`} className="text-sm text-gray-700 flex-1">
                    {text}
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Signature</label>
              <input
                type="text"
                name="signature"
                className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 justify-center pt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              {isEdit ? "Update" : "Submit"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/travelling-allowance/advance-reimbursements")}
              className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdvanceReimbursementForm
