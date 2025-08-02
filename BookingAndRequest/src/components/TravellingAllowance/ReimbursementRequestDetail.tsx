"use client"

import type React from "react"
import { useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTravellingAllowanceData } from "../../hooks/useTravellingAllowanceData"

const ReimbursementRequestDetail: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { reimbursementRequests, updateReimbursementRequestStatus } = useTravellingAllowanceData()
  const [finalApprovedAmount, setFinalApprovedAmount] = useState("")
  const [adminRemarks, setAdminRemarks] = useState("")
  const [loading, setLoading] = useState(false)
  const [showAuditScanning, setShowAuditScanning] = useState(false)
  const [showApprovalModal, setShowApprovalModal] = useState(false)

  const request = reimbursementRequests.find((req) => req.id === id)

  const subTabs = [
    { name: "Advance Reimbursements", path: "/travelling-allowance/advance-reimbursements", active: false },
    { name: "Reimbursement", path: "/travelling-allowance/reimbursement", active: true },
  ]

  const reimbursementSubTabs = [
    { name: "Reimbursement Requests", path: "/travelling-allowance/reimbursement/requests", active: true },
    { name: "Disbursement", path: "/travelling-allowance/reimbursement/disbursement", active: false },
  ]

  const handleSmartAuditScan = () => {
    setShowAuditScanning(true)
    setTimeout(() => {
      setShowAuditScanning(false)
    }, 3000)
  }

  const handleSubmitAudit = () => {
    if (!finalApprovedAmount) {
      alert("Please enter the final approved amount")
      return
    }

    setLoading(true)
    try {
      updateReimbursementRequestStatus(request!.id, "Approved", Number.parseFloat(finalApprovedAmount), adminRemarks)
      alert("Reimbursement request approved successfully!")
      navigate("/travelling-allowance/reimbursement/requests")
    } catch (error) {
      console.error("Error approving request:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleReject = () => {
    if (!adminRemarks.trim()) {
      alert("Please provide remarks for rejection")
      return
    }

    setLoading(true)
    try {
      updateReimbursementRequestStatus(request!.id, "Rejected", undefined, adminRemarks)
      alert("Reimbursement request rejected!")
      navigate("/travelling-allowance/reimbursement/requests")
    } catch (error) {
      console.error("Error rejecting request:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!request) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Request Not Found</h2>
          <p className="text-gray-600 mb-4">The requested reimbursement could not be found.</p>
          <Link
            to="/travelling-allowance/reimbursement/requests"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Back to Requests
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
      <div className="p-6 ml-4 md:ml-8">
        {/* Header */}
        <div className="bg-gray-100 px-4 py-2 mb-6">
          <h2 className="text-lg font-medium text-center">Pending Requests</h2>
        </div>

       
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Request ID: {request.id}</p>
              <p className="text-sm text-gray-600">Email: {request.email}</p>
              <p className="text-sm text-gray-600">Purpose: {request.purpose}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Employee Name: {request.employeeName}</p>
              <p className="text-sm text-gray-600">Department: {request.department}</p>
              <p className="text-sm text-gray-600">Destination: {request.destination}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Mobile No: {request.mobileNo}</p>
              <p className="text-sm text-gray-600">Project/Site: {request.projectSite}</p>
              <p className="text-sm text-gray-600">
                Total Requested Amount: ₹{request.totalRequestedAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Breakdown Of Expenses */}
        <div className="mb-8 w-full ml-4 md:ml-8">
          <div className="bg-gray-100 px-4 py-2 mb-4">
            <h3 className="text-lg font-medium text-center">Breakdown Of Expenses</h3>
          </div>

          {request.expenses.map((expense, index) => (
            <div key={expense.id} className="bg-gray-100 p-4 rounded mb-4 relative ml-2 md:ml-4">
              {showAuditScanning && index === 1 && (
                <div className="absolute inset-0 bg-gray-300 bg-opacity-90 flex items-center justify-center rounded">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-700 mb-2">SMART AUDIT</div>
                    <div className="text-lg font-semibold text-gray-700">SCANNING BILLS</div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Expense Type: {expense.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date Of Expense/s: {expense.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Expense Amount: ₹{expense.amount.toLocaleString()}</p>
                </div>
              </div>

              <div className="mb-2">
                <p className="text-sm text-gray-600">Receipts Uploaded:</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {expense.receipts.map((receipt, receiptIndex) => (
                  <div key={receiptIndex} className="border border-gray-300 rounded px-3 py-2 text-sm bg-white">
                    {receipt}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Audit Review Modal */}
        {showAuditScanning && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-0 w-full max-w-2xl shadow-lg">
              <div className="border-b px-8 py-6 bg-gray-50">
                <h2 className="text-2xl font-normal text-center">Audit & Approval Review</h2>
              </div>
              <div className="px-8 py-8">
                <div className="mb-6">
                  <span className="block font-semibold text-lg mb-2">Smart Audit Findings:</span>
                  <div className="mb-4">
                    <div className="mb-4">
                      <span>Expense Amount Exceeded (Requested amount vs. company limit)</span>
                      <div className="flex items-center gap-2 mt-2">
                        <input type="text" className="border rounded px-3 py-2 w-32" placeholder="" />
                        <span className="mx-2">vs</span>
                        <input type="text" className="border rounded px-3 py-2 w-32" placeholder="" />
                      </div>
                    </div>
                    <div className="mb-2">Duplicate Expense Detected - Food Bills - 7th & 8th June</div>
                    <div className="mb-2">Restricted Item Found (Non-reimbursable item detected) - Alcohol</div>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block font-semibold mb-2">Final Amount Approved By the Admin</label>
                  <input type="text" className="border rounded px-3 py-2 w-64" />
                </div>
                <div className="mb-8">
                  <label className="block font-semibold mb-2">Remarks (if Any)</label>
                  <input type="text" className="border rounded px-3 py-2 w-64" />
                </div>
                <div className="flex justify-center">
                  <button className="bg-[#7D8CB7] text-white px-16 py-3 rounded text-lg" onClick={() => setShowAuditScanning(false)}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Approval Review Modal */}
        {showApprovalModal && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-0 w-full max-w-2xl shadow-lg">
              <div className="border-b px-8 py-6 bg-gray-50">
                <h2 className="text-2xl font-normal text-center">Audit & Approval Review</h2>
              </div>
              <div className="px-8 py-8">
                <div className="mb-6">
                  <span className="block font-semibold text-lg mb-2">Smart Audit Findings:</span>
                  <div className="mb-4">
                    <div className="mb-2">No Issues Detected</div>
                    <div className="mb-2">Requested Amount is within Policy Limits</div>
                    <div className="mb-2">No Duplicate Expenses Found</div>
                    <div className="mb-2">No Duplicate Expenses Found</div>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block font-semibold mb-2">Final Amount Approved By the Admin</label>
                  <input type="text" className="border rounded px-3 py-2 w-64" />
                </div>
                <div className="mb-8">
                  <label className="block font-semibold mb-2">Remarks (if Any)</label>
                  <input type="text" className="border rounded px-3 py-2 w-64" />
                </div>
                <div className="flex justify-center">
                  <button className="bg-[#7D8CB7] text-white px-16 py-3 rounded text-lg" onClick={() => setShowApprovalModal(false)}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

 {/* Request Details */}
 <div className="border border-gray-200 mr-100 rounded-lg p-6 mb-6 w-full">
          <div className="flex justify-end mb-4 gap-2">
            <button
              onClick={() => setShowAuditScanning(true)}
              className= "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              AUDIT REVIEW
            </button>
            <button
              onClick={() => setShowApprovalModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              APPROVAL REVIEW
            </button>
          </div>
        {/* Reject Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleReject}
            disabled={loading}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Processing..." : "Reject Request"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReimbursementRequestDetail
