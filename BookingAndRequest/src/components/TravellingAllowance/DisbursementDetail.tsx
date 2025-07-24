"use client"

import type React from "react"
import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Upload } from "lucide-react"
import { useTravellingAllowanceData } from "../../hooks/useTravellingAllowanceData"

const DisbursementDetail: React.FC = () => {
  const { id } = useParams()
  const { disbursements, updateDisbursementStatus } = useTravellingAllowanceData()
  const [paymentDetails, setPaymentDetails] = useState("Auto Fill from system")
  const [scheduledDate, setScheduledDate] = useState("")
  const [loading, setLoading] = useState(false)

  const disbursement = disbursements.find((d) => d.id === id)

  const subTabs = [
    { name: "Advance Reimbursements", path: "/travelling-allowance/advance-reimbursements", active: true },
    { name: "Reimbursement", path: "/travelling-allowance/reimbursement", active: false },
  ]

  const advanceSubTabs = [
    { name: "Advance Reimbursement Requests", path: "/travelling-allowance/advance-reimbursements", active: false },
    { name: "Disbursement", path: "/travelling-allowance/disbursement", active: true },
    { name: "Expense Submission & Reconciliation", path: "/travelling-allowance/expense-submission", active: false },
  ]

  const paymentOptions = ["Select and enter", "UPI", "Direct Deposit", "Wallet"]

  const handleApprove = async () => {
    if (disbursement) {
      setLoading(true)
      try {
        updateDisbursementStatus(disbursement.id, "Completed")
        alert("Disbursement approved successfully!")
      } catch (error) {
        console.error("Error approving disbursement:", error)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleReject = async () => {
    if (disbursement) {
      setLoading(true)
      try {
        updateDisbursementStatus(disbursement.id, "Failed")
        alert("Disbursement rejected!")
      } catch (error) {
        console.error("Error rejecting disbursement:", error)
      } finally {
        setLoading(false)
      }
    }
  }

  if (!disbursement) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Disbursement Not Found</h2>
          <p className="text-gray-600 mb-4">The requested disbursement could not be found.</p>
          <Link
            to="/travelling-allowance/disbursement"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Back to Disbursements
          </Link>
        </div>
      </div>
    )
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
      {/* <div className="flex justify-end items-center px-6 py-2 text-sm text-gray-600 border-b border-gray-200">
      <span className="mr-4">1-1 of 1</span>
      <button className="p-1 hover:bg-gray-100 rounded">
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button className="p-1 hover:bg-gray-100 rounded">
        <ChevronRight className="w-4 h-4" />
      </button>
    </div> */}

      {/* Detail Content */}
      <div className="p-6">
        {/* Header */}
        <div className="bg-gray-100 px-4 py-2 mb-6">
          <h2 className="text-lg font-medium text-center">Disbursement Request</h2>
        </div>

        {/* Request Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <p className="text-sm text-gray-600 mb-1">Request ID: {disbursement.requestId}</p>
            <p className="text-sm text-gray-600 mb-1">Employee Name: {disbursement.employeeName}</p>
            <p className="text-sm text-gray-600 mb-1">Department: {disbursement.department}</p>
            <p className="text-sm text-gray-600">Transaction Details:</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">
              Approved Amount: ₹{disbursement.approvedAmount.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 mb-1">Disbursement Mode: {disbursement.disbursementMode}</p>
            <p className="text-sm text-gray-600 mb-1">Payment Status: {disbursement.paymentStatus}</p>
            <p className="text-sm text-gray-600">Payment Details:</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">
              Scheduled Payment Date: {disbursement.scheduledPaymentDate || "Not set"}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Transaction ID: {disbursement.transactionId || "Not generated"}
            </p>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="mb-8">
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-2">Transaction Details:</label>
            <select
              className="w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={paymentDetails}
              onChange={(e) => setPaymentDetails(e.target.value)}
            >
              {paymentOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-2">Payment Details:</label>
            <select className="w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Auto Fill from system</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-2">Scheduled Payment Date:</label>
            <div className="relative w-48">
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Payment Confirmation Proof */}
        <div className="mb-8">
          <label className="block text-sm text-gray-600 mb-2">Payment Confirmation Proof:</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="w-8 h-8 text-[#5E5E5E] mx-auto mb-2" />
            <p className="text-sm text-gray-500">Upload</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
            onClick={handleApprove}
            disabled={loading}
          >
            {loading ? "Processing..." : "Approve"}
          </button>
          <button
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50"
            onClick={handleReject}
            disabled={loading}
          >
            {loading ? "Processing..." : "Reject"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DisbursementDetail
