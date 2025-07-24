"use client"

import { useState, useMemo } from "react"
import type {
  AdvanceReimbursementRequest,
  DisbursementRequest,
  ExpenseSubmission,
  ReimbursementRequest,
  ReimbursementDisbursement,
  FilterStatus,
} from "../types/travellingAllowance"

// Mock data for Advance Reimbursements
const mockAdvanceRequests: AdvanceReimbursementRequest[] = [
  {
    id: "003",
    employeeName: "Mohit",
    mobileNo: "123456789",
    email: "mohit@gmail.com",
    department: "Operations",
    projectSite: "Vista One",
    destination: "Dubai",
    purpose: "App Implementation",
    expenseCategory: "Overall Trip Amount",
    requestedAmount: 100000,
    status: "Pending",
    submittedDate: "2024-01-15",
    adhocRequest: false,
    documents: {
      estimatedBudget: "budget_sheet.pdf",
      travelItinerary: "itinerary.pdf",
      otherDocuments: ["approval_letter.pdf"],
    },
  },
  {
    id: "004",
    employeeName: "Priya",
    mobileNo: "987654321",
    email: "priya@gmail.com",
    department: "Sales",
    projectSite: "Tech Park",
    destination: "Mumbai",
    purpose: "Client Meeting",
    expenseCategory: "Business Travel",
    requestedAmount: 50000,
    status: "Approved",
    submittedDate: "2024-01-10",
    adhocRequest: true,
    approvedAmount: 45000,
    documents: {
      estimatedBudget: "budget_sheet.pdf",
      travelItinerary: "itinerary.pdf",
    },
  },
]

const mockDisbursements: DisbursementRequest[] = [
  {
    id: "003",
    employeeName: "Mohit",
    department: "Operations",
    approvedAmount: 100000,
    disbursementMode: "UPI",
    scheduledPaymentDate: "2024-06-15",
    paymentStatus: "Pending",
    requestId: "003",
  },
  {
    id: "004",
    employeeName: "Priya",
    department: "Sales",
    approvedAmount: 45000,
    disbursementMode: "Direct Deposit",
    scheduledPaymentDate: "2024-06-20",
    paymentStatus: "Completed",
    requestId: "004",
  },
]

const mockExpenseSubmissions: ExpenseSubmission[] = [
  {
    id: "001",
    employeeName: "Sejal",
    department: "Sales",
    requestId: "001",
    totalAmount: 10000,
    status: "Pending",
    submittedDate: "2024-01-20",
    expenses: [
      {
        type: "Accommodation",
        date: "2024-01-07",
        amount: 5000,
        receipts: ["hotel_invoice.pdf"],
      },
      {
        type: "Transport",
        date: "2024-01-07",
        amount: 3000,
        receipts: ["uber_invoice.pdf", "train_tickets.pdf"],
      },
      {
        type: "Food",
        date: "2024-01-07",
        amount: 2000,
        receipts: ["food_bills_day1.pdf", "food_bills_day2.pdf"],
      },
    ],
  },
]

// Mock data for Reimbursements
const mockReimbursementRequests: ReimbursementRequest[] = [
  {
    id: "001",
    employeeName: "Sejal",
    mobileNo: "123456789",
    email: "xyz@gmail.com",
    department: "Sales",
    projectSite: "Jade Park",
    destination: "Bangalore",
    purpose: "Sales Pitch",
    totalRequestedAmount: 10000,
    status: "Pending",
    submittedDate: "2024-01-20",
    expenses: [
      {
        id: "exp1",
        type: "Accommodation",
        date: "7th - 9th June",
        amount: 5000,
        receipts: ["Hotel Invoice"],
        description: "Hotel stay for 3 days",
      },
      {
        id: "exp2",
        type: "Transport",
        date: "7th - 9th June",
        amount: 3000,
        receipts: ["Uber Invoice", "Train Tickets", "Bus Ticket"],
        description: "Transportation expenses",
      },
      {
        id: "exp3",
        type: "Food",
        date: "7th - 9th June",
        amount: 2000,
        receipts: ["Food Bills Day 1", "Food Bills Day 2", "Food Bills Day 3"],
        description: "Meal expenses",
      },
    ],
    auditFindings: {
      expenseAmountExceeded: true,
      duplicateExpenseDetected: true,
      restrictedItemFound: false,
      amountWithinPolicyLimits: false,
      duplicateExpensesFound: true,
      noIssuesDetected: false,
    },
  },
]

const mockReimbursementDisbursements: ReimbursementDisbursement[] = [
  {
    id: "001",
    requestId: "001",
    employeeName: "Sejal",
    department: "Sales",
    approvedAmount: 10000,
    transactionDetails: "UPI",
    scheduledPaymentDate: "2024-06-25",
    paymentStatus: "Pending",
  },
]

export const useTravellingAllowanceData = () => {
  const [advanceRequests, setAdvanceRequests] = useState<AdvanceReimbursementRequest[]>(mockAdvanceRequests)
  const [disbursements, setDisbursements] = useState<DisbursementRequest[]>(mockDisbursements)
  const [expenseSubmissions, setExpenseSubmissions] = useState<ExpenseSubmission[]>(mockExpenseSubmissions)
  const [reimbursementRequests, setReimbursementRequests] = useState<ReimbursementRequest[]>(mockReimbursementRequests)
  const [reimbursementDisbursements, setReimbursementDisbursements] =
    useState<ReimbursementDisbursement[]>(mockReimbursementDisbursements)
  const [loading] = useState(false)

  const updateAdvanceRequestStatus = (
    id: string,
    status: AdvanceReimbursementRequest["status"],
    approvedAmount?: number,
    rejectionReason?: string,
  ) => {
    setAdvanceRequests((prev) =>
      prev.map((request) => (request.id === id ? { ...request, status, approvedAmount, rejectionReason } : request)),
    )
    
  }

  const updateDisbursementStatus = (
    id: string,
    status: DisbursementRequest["paymentStatus"],
    transactionId?: string,
  ) => {
    setDisbursements((prev) =>
      prev.map((disbursement) =>
        disbursement.id === id ? { ...disbursement, paymentStatus: status, transactionId } : disbursement,
      ),
    )
  }

  const updateExpenseSubmissionStatus = (id: string, status: ExpenseSubmission["status"]) => {
    setExpenseSubmissions((prev) =>
      prev.map((submission) => (submission.id === id ? { ...submission, status } : submission)),
    )
  }

  const updateReimbursementRequestStatus = (
    id: string,
    status: ReimbursementRequest["status"],
    finalApprovedAmount?: number,
    adminRemarks?: string,
  ) => {
    setReimbursementRequests((prev) =>
      prev.map((request) => (request.id === id ? { ...request, status, finalApprovedAmount, adminRemarks } : request)),
    )
  }

  const updateReimbursementDisbursementStatus = (
    id: string,
    status: ReimbursementDisbursement["paymentStatus"],
    transactionId?: string,
  ) => {
    setReimbursementDisbursements((prev) =>
      prev.map((disbursement) =>
        disbursement.id === id ? { ...disbursement, paymentStatus: status, transactionId } : disbursement,
      ),
    )
  }

  return {
    advanceRequests,
    disbursements,
    expenseSubmissions,
    reimbursementRequests,
    reimbursementDisbursements,
    loading,
    updateAdvanceRequestStatus,
    updateDisbursementStatus,
    updateExpenseSubmissionStatus,
    updateReimbursementRequestStatus,
    updateReimbursementDisbursementStatus,
  }
}

export const useFilteredData = <T extends { status: string; employeeName: string }>(
  data: T[],
  searchTerm: string,
  filterStatus: FilterStatus,
) => {
  return useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = searchTerm === "" || item.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterStatus === "All" || item.status === filterStatus
      return matchesSearch && matchesFilter
    })
  }, [data, searchTerm, filterStatus])
}
