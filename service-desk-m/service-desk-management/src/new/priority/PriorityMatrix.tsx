import { useState } from "react"
import { Card } from "../components/Card"
import TableHead from "../components/TopHead"
import DropdownMenu from "../components/DropdownMenu"
import NotificationToaster from "../components/NotificationToaster"
import Tooltip from "../components/Tooltip"

interface PriorityMatrixProps {
  searchQuery: string
}

// Define the matrix key type
type MatrixKey =
  | "Affects Business-High"
  | "Affects Business-Low"
  | "Affects Business-Medium"
  | "Affects Business-Normal"
  | "Affects Business-Urgent"
  | "Affects Department-High"
  | "Affects Department-Low"
  | "Affects Department-Medium"
  | "Affects Department-Normal"
  | "Affects Department-Urgent"
  | "Affects Group-High"
  | "Affects Group-Low"
  | "Affects Group-Medium"
  | "Affects Group-Normal"
  | "Affects Group-Urgent"
  | "Affects User-High"
  | "Affects User-Low"
  | "Affects User-Medium"
  | "Affects User-Normal"
  | "Affects User-Urgent"
  | "High-High"
  | "High-Low"
  | "High-Medium"
  | "High-Normal"
  | "High-Urgent"
  | "Low-High"
  | "Low-Low"
  | "Low-Medium"
  | "Low-Normal"
  | "Low-Urgent"
  | "Medium-High"
  | "Medium-Low"
  | "Medium-Medium"
  | "Medium-Normal"
  | "Medium-Urgent"

// Define the matrix type
type PriorityMatrixType = Record<MatrixKey, string>

export default function PriorityMatrix({ searchQuery }: PriorityMatrixProps) {
  const [matrix, setMatrix] = useState<PriorityMatrixType>({
    "Affects Business-High": "Critical Priority",
    "Affects Business-Low": "selected property",
    "Affects Business-Medium": "selected property",
    "Affects Business-Normal": "selected property",
    "Affects Business-Urgent": "selected property",
    "Affects Department-High": "selected property",
    "Affects Department-Low": "selected property",
    "Affects Department-Medium": "selected property",
    "Affects Department-Normal": "selected property",
    "Affects Department-Urgent": "selected property",
    "Affects Group-High": "selected property",
    "Affects Group-Low": "selected property",
    "Affects Group-Medium": "selected property",
    "Affects Group-Normal": "selected property",
    "Affects Group-Urgent": "selected property",
    "Affects User-High": "selected property",
    "Affects User-Low": "selected property",
    "Affects User-Medium": "selected property",
    "Affects User-Normal": "selected property",
    "Affects User-Urgent": "selected property",
    "High-High": "selected property",
    "High-Low": "selected property",
    "High-Medium": "selected property",
    "High-Normal": "selected property",
    "High-Urgent": "selected property",
    "Low-High": "selected property",
    "Low-Low": "selected property",
    "Low-Medium": "selected property",
    "Low-Normal": "selected property",
    "Low-Urgent": "selected property",
    "Medium-High": "selected property",
    "Medium-Low": "selected property",
    "Medium-Medium": "selected property",
    "Medium-Normal": "selected property",
    "Medium-Urgent": "selected property",
  })

  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [dropdownStates, setDropdownStates] = useState<Record<string, boolean>>({})

  const impacts = [
    "Affects Business",
    "Affects Department",
    "Affects Group",
    "Affects User",
    "High",
    "Low",
    "Medium",
  ] as const
  const urgencies = ["High", "Low", "Medium", "Normal", "Urgent"] as const
  const priorities = ["Critical Priority", "High", "Low", "Medium", "Normal"]

  const handleMatrixChange = (impact: string, urgency: string, priority: string) => {
    const key = `${impact}-${urgency}` as MatrixKey
    setMatrix((prev) => ({ ...prev, [key]: priority }))
    setToastMessage("Priority matrix updated successfully!")
    setShowToast(true)
    setDropdownStates((prev) => ({ ...prev, [key]: false }))
  }

  const handleDropdownToggle = (key: string, open: boolean) => {
    setDropdownStates((prev) => ({ ...prev, [key]: open }))
  }

  const getPriorityBadge = (priority: string) => {
    if (priority === "selected property" || !priority) {
      return <span className="text-gray-400 text-sm">selected property</span>
    }

    const badgeColors: Record<string, string> = {
      "Critical Priority": "bg-red-100 text-red-800",
      High: "bg-orange-100 text-orange-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Low: "bg-green-100 text-green-800",
      Normal: "bg-blue-100 text-blue-800",
    }

    return (
      <span
        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${badgeColors[priority] || "bg-gray-100 text-gray-800"}`}
      >
        {priority}
      </span>
    )
  }

  // Define table columns for TableHead component with custom colors
  const tableColumns = [
    { label: "Impact", align: "left" as const },
    { label: "High", align: "center" as const, className: "bg-yellow-100 text-yellow-800" },
    { label: "Low", align: "center" as const, className: "bg-yellow-100 text-yellow-800" },
    { label: "Medium", align: "center" as const, className: "bg-yellow-100 text-yellow-800" },
    { label: "Normal", align: "center" as const, className: "bg-yellow-100 text-yellow-800" },
    { label: "Urgent", align: "center" as const, className: "bg-yellow-100 text-yellow-800" },
  ]

  return (
    <div className="space-y-6" style={{ fontFamily: "PT Sans, sans-serif" }}>
      {/* No search icon or search bar in this tab */}
      <Card className="p-0 border-0">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <TableHead columns={tableColumns} />
            <tbody>
              {impacts.map((impact) => (
                <tr key={impact} className="hover:bg-gray-50">
                  <td className="p-4 bg-blue-100 font-semibold text-gray-700 border-b border-r border-gray-300">
                    <Tooltip content={`Issues that ${impact.toLowerCase()}`}>{impact}</Tooltip>
                  </td>
                  {urgencies.map((urgency) => {
                    const key = `${impact}-${urgency}` as MatrixKey
                    const currentValue = matrix[key] || ""
                    const dropdownKey = `${impact}-${urgency}`

                    // Create dropdown items for this cell
                    const dropdownItems = priorities.map((priority) => ({
                      label: priority,
                      onClick: () => handleMatrixChange(impact, urgency, priority),
                    }))

                    return (
                      <td key={urgency} className="p-4 text-center border-b border-r border-gray-300 bg-white">
                        <div className="flex flex-col items-center space-y-2 min-h-[80px] justify-center">
                          <DropdownMenu
                            items={dropdownItems}
                            trigger={
                              <button className="w-full max-w-[140px] px-3 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-left flex justify-between items-center">
                                <span
                                  className={`truncate ${currentValue && currentValue !== "selected property" ? "text-black" : "text-gray-500"}`}
                                >
                                  {currentValue && currentValue !== "selected property"
                                    ? currentValue
                                    : "Select Priority"}
                                </span>
                                <span className="ml-2 text-gray-500">▼</span>
                              </button>
                            }
                            open={dropdownStates[dropdownKey] || false}
                            onToggle={(open) => handleDropdownToggle(dropdownKey, open)}
                            position="bottom-left"
                            className="bg-white border border-gray-300 rounded-md shadow-lg z-10 min-w-[140px]"
                          />
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Toast Notification */}
      <NotificationToaster
        message={toastMessage}
        type="success"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        position="top-right"
      />
    </div>
  )
}