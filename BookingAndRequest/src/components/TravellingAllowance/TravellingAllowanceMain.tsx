import type React from "react"
import { Link, useLocation } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"

const TravellingAllowanceMain: React.FC = () => {
  const location = useLocation()

  const subTabs = [
    { name: "Advance Reimbursements", path: "/travelling-allowance/advance-reimbursements", active: true },
    { name: "Reimbursement", path: "/travelling-allowance/reimbursement", active: false },
  ]

  const getCurrentSubTab = () => {
    if (location.pathname.includes("/advance-reimbursements")) return "/travelling-allowance/advance-reimbursements"
    if (location.pathname.includes("/reimbursement")) return "/travelling-allowance/reimbursement"
    return "/travelling-allowance/advance-reimbursements"
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
                getCurrentSubTab() === tab.path
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

      {/* Default redirect to advance reimbursements */}
      <div className="p-6">
        <div className="text-center text-gray-500">
          <p>Please select a tab above to continue</p>
        </div>
      </div>
    </div>
  )
}

export default TravellingAllowanceMain
