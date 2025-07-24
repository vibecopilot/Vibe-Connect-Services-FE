"use client"

import type React from "react"
import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ChevronLeft, ChevronRight, Upload } from "lucide-react"
import { useTravellingAllowanceData } from "../../hooks/useTravellingAllowanceData"

const ReimbursementDisbursementDetail: React.FC = () => {
  const { id } = useParams()
  const { reimbursementDisbursements, updateReimbursementDisbursementStatus } = useTravellingAllowanceData()
  const [transactionDetails, setTransactionDetails] = useState("Select")
  const [paymentDetails, setPaymentDetails] = useState("Auto Fill from system")
  const [scheduledDate, setScheduledDate] = useState("")
  const [loading, setLoading] = useState(false)

  const disbursement = reimbursementDisbursements.find((d) => d.id === id)

  const subTabs = [
    { name: "Advance Reimbursements", path: "/travelling-allowance/advance-reimbursements", active: false },
    { name: "Reimbursement", path: "/travelling-allowance/reimbursement", active: true },
  ]

  const reimbursementSubTabs = [
    { name: "Reimbursement Requests", path: "/travelling-allowance/reimbursement/requests", active: false },
    { name: "Disbursement", path: "/travelling-allowance/reimbursement/disbursement", active: true },
  ]

  const transactionOptions = ["Select", "UPI", "Direct Deposit", "Wallet"]

  const handleApprove = async () => {
    if (disbursement) {
      setLoading(true)
      try {
        updateReimbursementDisbursementStatus(disbursement.id, "Completed")
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
        updateReimbursementDisbursementStatus(disbursement.id, "Failed")
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
            to="/travelling-allowance/reimbursement/disbursement"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Back to Disbursements
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50">
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

      {/* Reimbursement Sub Navigation Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex">
          {reimbursementSubTabs.map((tab) => (
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
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

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
            <p className="text-sm text-gray-600 mb-1">Email: Sejal@work.in</p>
            <p className="text-sm text-gray-600 mb-1">Purpose: Sales Pitch</p>
            <p className="text-sm text-gray-600">Transaction Details: {disbursement.transactionDetails}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Employee Name: {disbursement.employeeName}</p>
            <p className="text-sm text-gray-600 mb-1">Department: {disbursement.department}</p>
            <p className="text-sm text-gray-600 mb-1">Destination: Bangalore</p>
            <p className="text-sm text-gray-600">Payment Details: Transaction ID</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Mobile No: 123456789</p>
            <p className="text-sm text-gray-600 mb-1">Project/Site: Jade Park</p>
            <p className="text-sm text-gray-600 mb-1">
              Total Approved Amount: ₹{disbursement.approvedAmount.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Scheduled Payment Date:</p>
          </div>
        </div>

        {/* Transaction Details Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm text-gray-600 mb-2">Transaction Details:</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={transactionDetails}
              onChange={(e) => setTransactionDetails(e.target.value)}
            >
              {transactionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Payment Details:</label>
            <input
              type="text"
              value={paymentDetails}
              onChange={(e) => setPaymentDetails(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Scheduled Payment Date:</label>
            <input
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Payment Confirmation Proof */}
        <div className="mb-8">
          <label className="block text-sm text-gray-600 mb-2">Payment Confirmation Proof:</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
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

export default ReimbursementDisbursementDetail
