export interface AdvanceReimbursementRequest {
  id: string
  employeeName: string
  mobileNo: string
  email: string
  department: string
  projectSite: string
  destination: string
  purpose: string
  expenseCategory: string
  requestedAmount: number
  status: "Pending" | "Processing" | "Approved" | "Rejected" | "Scheduled" | "Completed"
  dateOfTravel?: string
  adhocRequest: boolean
  submittedDate: string
  approvedAmount?: number
  rejectionReason?: string
  documents: {
    estimatedBudget?: string
    travelItinerary?: string
    otherDocuments?: string[]
  }
}

export interface DisbursementRequest {
  id: string
  employeeName: string
  department: string
  approvedAmount: number
  disbursementMode: "UPI" | "Direct Deposit" | "Wallet" | "Cash"
  scheduledPaymentDate?: string
  paymentStatus: "Pending" | "Processing" | "Scheduled" | "Completed" | "Failed"
  transactionId?: string
  paymentDetails?: string
  requestId: string
}

export interface ExpenseSubmission {
  id: string
  employeeName: string
  department: string
  requestId: string
  totalAmount: number
  status: "Pending" | "Under Review" | "Approved" | "Rejected"
  submittedDate: string
  expenses: ExpenseItem[]
}

export interface ExpenseItem {
  type: string
  date: string
  amount: number
  receipts: string[]
  description?: string
}

// Reimbursement Types
export interface ReimbursementRequest {
  id: string
  employeeName: string
  mobileNo: string
  email: string
  department: string
  projectSite: string
  destination: string
  purpose: string
  totalRequestedAmount: number
  status: "Pending" | "Approved" | "Rejected" | "Under Review"
  submittedDate: string
  expenses: ReimbursementExpenseItem[]
  auditFindings?: AuditFindings
  finalApprovedAmount?: number
  adminRemarks?: string
}

export interface ReimbursementExpenseItem {
  id: string
  type: "Accommodation" | "Transport" | "Food" | "Other"
  date: string
  amount: number
  receipts: string[]
  description?: string
}

export interface AuditFindings {
  expenseAmountExceeded: boolean
  duplicateExpenseDetected: boolean
  restrictedItemFound: boolean
  amountWithinPolicyLimits: boolean
  duplicateExpensesFound: boolean
  noIssuesDetected: boolean
}

export interface ReimbursementDisbursement {
  id: string
  requestId: string
  employeeName: string
  department: string
  approvedAmount: number
  transactionDetails: "UPI" | "Direct Deposit" | "Wallet" | "Cash"
  scheduledPaymentDate?: string
  paymentStatus: "Pending" | "Processing" | "Scheduled" | "Completed" | "Failed"
  transactionId?: string
  paymentDetails?: string
}

export type FilterStatus =
  | "All"
  | "Pending"
  | "Processing"
  | "Approved"
  | "Rejected"
  | "Scheduled"
  | "Completed"
  | "Under Review"
