"use client"

import type React from "react"
import { useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { ChevronLeft, Check, Download, AlertCircle } from "lucide-react"
import { useTravellingAllowanceData } from "../../hooks/useTravellingAllowanceData"

const AdvanceReimbursementDetail: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { advanceRequests, updateAdvanceRequestStatus } = useTravellingAllowanceData()
  const [showApprovalModal, setShowApprovalModal] = useState(false)
  const [showRejectionModal, setShowRejectionModal] = useState(false)
  const [approvedAmount, setApprovedAmount] = useState("")
  const [rejectionReason, setRejectionReason] = useState("")
  const [loading, setLoading] = useState(false)

  const request = advanceRequests.find((req) => req.id === id)

  if (!request) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Request Not Found</h2>
          <p className="text-gray-600 mb-4">The requested advance reimbursement could not be found.</p>
          <Link
            to="/travelling-allowance/advance-reimbursements"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Back to Requests
          </Link>
        </div>
      </div>
    )
  }

  const declarations = [
    "I hereby declare that the advance requested is for official purposes only and will be used as per the estimated breakdown submitted.",
    "I confirm that I will submit all original bills and receipts within the required timeline after completion of the travel/activity.",
    "I understand that any unutilized amount must be returned to the company or adjusted in future claims.",
  ]

  const subTabs = [
    { name: "Advance Reimbursements", path: "/travelling-allowance/advance-reimbursements", active: true },
    { name: "Reimbursement", path: "/travelling-allowance/reimbursement", active: false },
  ]

  const advanceSubTabs = [
    { name: "Advance Reimbursement Requests", path: "/travelling-allowance/advance-reimbursements", active: true },
    { name: "Disbursement", path: "/travelling-allowance/disbursement", active: false },
    { name: "Expense Submission & Reconciliation", path: "/travelling-allowance/expense-submission", active: false },
  ]

  const handleApprove = async (modifyAmount = false) => {
    setLoading(true)
    try {
      const finalAmount = modifyAmount ? Number.parseFloat(approvedAmount) : request.requestedAmount
      updateAdvanceRequestStatus(request.id, "Approved", finalAmount)
      setShowApprovalModal(false)
      navigate("/travelling-allowance/advance-reimbursements")
    } catch (error) {
      console.error("Error approving request:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert("Please provide a reason for rejection")
      return
    }

    setLoading(true)
    try {
      updateAdvanceRequestStatus(request.id, "Rejected", undefined, rejectionReason)
      setShowRejectionModal(false)
      navigate("/travelling-allowance/advance-reimbursements")
    } catch (error) {
      console.error("Error rejecting request:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAskForMoreInfo = () => {
    updateAdvanceRequestStatus(request.id, "Processing")
    alert("Request sent back to employee for more information")
  }

  const getStatusBadge = (status: string) => {
    const statusColors = {
      Pending: "bg-yellow-100 text-yellow-800",
      Processing: "bg-blue-100 text-blue-800",
      Approved: "bg-green-100 text-green-800",
      Rejected: "bg-red-100 text-red-800",
      Scheduled: "bg-purple-100 text-purple-800",
      Completed: "bg-gray-100 text-gray-800",
    }

    return (
      <span
        className={`px-3 py-1 text-sm font-medium rounded-full ${statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"}`}
      >
        {status}
      </span>
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
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
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
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
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

      {/* Navigation */}
      <div className="flex justify-between items-center px-6 py-2 text-sm text-gray-600 border-b border-gray-200">
        <Link
          to="/travelling-allowance/advance-reimbursements"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Requests
        </Link>
        <div className="flex items-center gap-2">
          <span>Request #{request.id}</span>
          {getStatusBadge(request.status)}
        </div>
      </div>

      {/* Detail Content */}
      <div className="p-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl pl-155 font-semibold text-gray-900">Advance Reimbursement Request</h2>
            <div className="text-sm text-gray-600">
              Submitted: {new Date(request.submittedDate).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Request Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">Request ID</label>
              <p className="text-sm text-gray-900">#{request.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-sm text-gray-900">{request.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Purpose</label>
              <p className="text-sm text-gray-900">{request.purpose}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Date of Travel</label>
              <p className="text-sm text-gray-900">{request.dateOfTravel || "Not specified"}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">Employee Name</label>
              <p className="text-sm text-gray-900">{request.employeeName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Department</label>
              <p className="text-sm text-gray-900">{request.department}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Destination</label>
              <p className="text-sm text-gray-900">{request.destination}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Ad-hoc Request</label>
              <p className="text-sm text-gray-900">{request.adhocRequest ? "Yes" : "No"}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">Mobile No</label>
              <p className="text-sm text-gray-900">{request.mobileNo}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Project/Site</label>
              <p className="text-sm text-gray-900">{request.projectSite}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Requested Amount</label>
              <p className="text-lg font-semibold text-green-600">₹{request.requestedAmount.toLocaleString()}</p>
            </div>
            {request.approvedAmount && (
              <div>
                <label className="text-sm font-medium text-gray-500">Approved Amount</label>
                <p className="text-lg font-semibold text-blue-600">₹{request.approvedAmount.toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>

        {/* Supporting Documents */}
        <div className="mb-8">
          <div className="bg-gray-50 px-4 py-3 rounded-t-lg">
            <h3 className="text-lg font-medium text-gray-900">Supporting Documents</h3>
          </div>
          <div className="border border-gray-200 rounded-b-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {request.documents.estimatedBudget && (
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <span className="text-sm text-gray-700">Estimated Budget Sheet</span>
                  <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Download</span>
                  </button>
                </div>
              )}
              {request.documents.travelItinerary && (
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <span className="text-sm text-gray-700">Travel Itinerary</span>
                  <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Download</span>
                  </button>
                </div>
              )}
              {request.documents.otherDocuments?.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <span className="text-sm text-gray-700">{doc}</span>
                  <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Download</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Employee Declaration */}
        <div className="mb-8">
          <div className="bg-gray-50 px-4 py-3 rounded-t-lg">
            <h3 className="text-lg font-medium text-gray-900">Employee Declaration</h3>
          </div>
          <div className="border border-gray-200 rounded-b-lg p-4">
            <div className="space-y-4">
              {declarations.map((declaration, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 border-2 border-green-500 rounded flex items-center justify-center mt-0.5 bg-green-50">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-700 flex-1">{declaration}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-500">Digital Signature:</label>
                <div className="px-4 py-2 bg-gray-100 rounded text-sm font-medium text-gray-900">
                  {request.employeeName}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        {request.status === "Pending" && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Admin Actions</h3>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setShowApprovalModal(true)}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Modify & Approve
              </button>
              <button
                onClick={() => handleApprove(false)}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
              >
                {loading ? "Processing..." : "Approve"}
              </button>
              <button
                onClick={handleAskForMoreInfo}
                className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium"
              >
                Ask For More Info
              </button>
              <button
                onClick={() => setShowRejectionModal(true)}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Reject
              </button>
            </div>
          </div>
        )}

        {/* Status Information */}
        {request.status !== "Pending" && (
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Request Status</h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-gray-600">Current Status:</span>
              {getStatusBadge(request.status)}
            </div>
            {request.rejectionReason && (
              <div className="mt-3">
                <span className="text-sm font-medium text-red-600">Rejection Reason:</span>
                <p className="text-sm text-gray-700 mt-1">{request.rejectionReason}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Approval Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Modify & Approve Request</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Approved Amount (₹)</label>
              <input
                type="number"
                value={approvedAmount}
                onChange={(e) => setApprovedAmount(e.target.value)}
                placeholder={request.requestedAmount.toString()}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => handleApprove(true)}
                disabled={loading || !approvedAmount}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {loading ? "Processing..." : "Approve"}
              </button>
              <button
                onClick={() => setShowApprovalModal(false)}
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {showRejectionModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Reject Request</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Rejection</label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Please provide a detailed reason for rejection..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleReject}
                disabled={loading || !rejectionReason.trim()}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {loading ? "Processing..." : "Reject"}
              </button>
              <button
                onClick={() => setShowRejectionModal(false)}
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdvanceReimbursementDetail
