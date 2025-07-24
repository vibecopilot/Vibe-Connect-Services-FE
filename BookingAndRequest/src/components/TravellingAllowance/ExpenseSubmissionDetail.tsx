"use client"

import type React from "react"
import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTravellingAllowanceData } from "../../hooks/useTravellingAllowanceData"

const ExpenseSubmissionDetail: React.FC = () => {
  const { id } = useParams()
  const { expenseSubmissions, updateExpenseSubmissionStatus, reimbursementRequests } = useTravellingAllowanceData()
  const [loading, setLoading] = useState(false)

  const expenseSubmission = expenseSubmissions.find((submission) => submission.id === id)

  const subTabs = [
    { name: "Advance Reimbursements", path: "/travelling-allowance/advance-reimbursements", active: true },
    { name: "Reimbursement", path: "/travelling-allowance/reimbursement", active: false },
  ]

  const advanceSubTabs = [
    { name: "Advance Reimbursement Requests", path: "/travelling-allowance/advance-reimbursements", active: false },
    { name: "Disbursement", path: "/travelling-allowance/disbursement", active: false },
    { name: "Expense Submission & Reconciliation", path: "/travelling-allowance/expense-submission", active: true },
  ]

  const handleApprove = async () => {
    if (expenseSubmission) {
      setLoading(true)
      try {
        updateExpenseSubmissionStatus(expenseSubmission.id, "Approved")
        alert("Expense submission approved!")
      } catch (error) {
        console.error("Error approving expense submission:", error)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleReject = async () => {
    if (expenseSubmission) {
      setLoading(true)
      try {
        updateExpenseSubmissionStatus(expenseSubmission.id, "Rejected")
        alert("Expense submission rejected!")
      } catch (error) {
        console.error("Error rejecting expense submission:", error)
      } finally {
        setLoading(false)
      }
    }
  }

  if (!expenseSubmission) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Expense Submission Not Found</h2>
          <p className="text-gray-600 mb-4">The requested expense submission could not be found.</p>
          <Link
            to="/travelling-allowance/expense-submission"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Back to Expense Submissions
          </Link>
        </div>
      </div>
    )
  }

  // Find matching reimbursement request for extra details
  const reimbursement = reimbursementRequests?.find((r) => r.id === expenseSubmission.requestId)

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

      {/* Detail Content */}
      <div className="p-6">
        {/* Header */}
        <div className="bg-gray-200 px-4 py-2 mb-6">
          <h2 className="text-lg font-medium text-center">Pending Requests</h2>
        </div>

        {/* Request Details - Multi-column as per image */}
        {expenseSubmission && (
          <div className="border p-4 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2 gap-x-8 text-gray-700">
              <div>
                <span className="font-normal">Request ID: </span>
                {expenseSubmission.requestId}
              </div>
              <div>
                <span className="font-normal">Employee Name: </span>
                {expenseSubmission.employeeName}
              </div>
              <div>
                <span className="font-normal">Mobile No: </span>
                {reimbursement?.mobileNo || "-"}
              </div>
              <div>
                <span className="font-normal">Email: </span>
                {reimbursement?.email || "-"}
              </div>
              <div>
                <span className="font-normal">Department: </span>
                {expenseSubmission.department}
              </div>
              <div>
                <span className="font-normal">Project/Site: </span>
                {reimbursement?.projectSite || "-"}
              </div>
              <div>
                <span className="font-normal">Purpose: </span>
                {reimbursement?.purpose || "-"}
              </div>
              <div>
                <span className="font-normal">Destination: </span>
                {reimbursement?.destination || "-"}
              </div>
              <div>
                <span className="font-normal">Total Requested Amount: </span>₹
                {reimbursement?.totalRequestedAmount?.toLocaleString() ||
                  expenseSubmission.totalAmount?.toLocaleString() ||
                  "-"}
                /-
              </div>
            </div>
          </div>
        )}

        {/* Breakdown Of Expenses */}
        <div className="mb-8">
          <div className="bg-gray-100 px-4 py-2 mb-4">
            <h3 className="text-lg font-medium text-center">Breakdown Of Expenses</h3>
          </div>

          {expenseSubmission.expenses.map((expense, index) => (
            <div key={index} className={`mb-6 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} p-4 rounded`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Expense Type: {expense.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date Of Expense: {expense.date}</p>
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

        {/* Admin Actions */}
        {expenseSubmission.status === "Pending" && (
          <div className="bg-gray-50 p-6 rounded-lg">
            {/* <h3 className="text-lg font-medium text-gray-900 mb-4">Admin Actions</h3> */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleApprove}
                disabled={loading}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
              >
                {loading ? "Processing..." : "Approve"}
              </button>
              <button
                onClick={handleReject}
                disabled={loading}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
              >
                {loading ? "Processing..." : "Reject"}
              </button>
            </div>
          </div>
        )}

        {/* Status Information */}
        {expenseSubmission.status !== "Pending" && (
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Submission Status</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Current Status:</span>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  expenseSubmission.status === "Approved"
                    ? "bg-green-100 text-green-800"
                    : expenseSubmission.status === "Rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                }`}
              >
                {expenseSubmission.status}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExpenseSubmissionDetail
