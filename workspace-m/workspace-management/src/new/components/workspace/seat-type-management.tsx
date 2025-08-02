
import type React from "react"
import { useState, useRef } from "react"
import { X, Edit, ChevronUp, ChevronDown, Clock } from "lucide-react"
import { useLocation } from "react-router-dom"
import Breadcrumb from "../Breadcrumb"
import Select from "../Select"
import TimePickerModal from "../TimePickerModal"

export default function SeatTypeManagement() {
  const location = useLocation()

  // Determine if the page is in view mode based on the URL
  const isViewMode = location.pathname.includes("/view")

  // State for location and floor
  const [location_state, setLocation_state] = useState("")
  const [floor, setFloor] = useState("")

  // State for seat types data
  const [seatTypes] = useState([
    { type: "Fixed Seats", totalSeats: "150", reservedSeats: "" },
    { type: "Hot Desks", totalSeats: "350", reservedSeats: "" },
    { type: "Workstation Seats", totalSeats: "500", reservedSeats: "" },
  ])

  // State for common seats
  const [commonSeats, setCommonSeats] = useState([
    "S1",
    "S2",
    "S3",
    "S4",
    "S5",
    "S6",
    "S7",
    "S8",
    "S9",
    "S10",
    "S11",
    "S12",
    "S13",
    "S14",
    "S15",
    "S16",
    "S17",
    "S18",
    "S19",
  ])

  // State for reserved seats
  const [reservedSeats, setReservedSeats] = useState(["S1", "S2", "S4", "S4", "S5", "S6", "S7", "S8", "S9", "S10"])

  // State for input values
  const [commonSeatInput, setCommonSeatInput] = useState("")
  const [reservedSeatInput, setReservedSeatInput] = useState("")

  // State for editing
  const [editingCommonSeat, setEditingCommonSeat] = useState<{ index: number; value: string } | null>(null)
  const [editingReservedSeat, setEditingReservedSeat] = useState<{ index: number; value: string } | null>(null)

  // State for terms and policies
  const [termsAndConditions, setTermsAndConditions] = useState("")
  const [cancellationPolicy, setCancellationPolicy] = useState("")

  // State for rules description
  const [rulesDescription, setRulesDescription] = useState([
    {
      id: 1,
      description:
        "If user cancels the booking selected hours/days prior to schedule, the given percentage of amount will be deducted",
      time: "00:00",
      deduction: "0",
    },
    {
      id: 2,
      description:
        "If user cancels the booking selected hours/days prior to schedule, the given percentage of amount will be deducted",
      time: "00:00",
      deduction: "0",
    },
    {
      id: 3,
      description:
        "If user cancels the booking selected hours/days prior to schedule, the given percentage of amount will be deducted",
      time: "00:00",
      deduction: "0",
    },
  ])

  // State for block days
  const [blockDays, setBlockDays] = useState({
    date: "",
    entireDay: "Entire Day",
    blockReason: "",
  })

  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Setup", href: "/setup" },
    { label: "Seat Setup", href: "/seat-setup" },
  ]

  const [uploadedFileName, setUploadedFileName] = useState("")
  const [timePickerOpen, setTimePickerOpen] = useState<string | null>(null)
  const [seatCount, setSeatCount] = useState(0)

  // Handle location change
  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation_state(e.target.value)
  }

  // Handle floor change
  const handleFloorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFloor(e.target.value)
  }

  // Handle file upload button click
  const handleFileUploadClick = () => {
    if (!isViewMode) {
      fileInputRef.current?.click()
    }
  }

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      setUploadedFileName(files[0].name)
    }
  }

  // Handle add common seat
  const handleAddCommonSeat = () => {
    if (!isViewMode && commonSeatInput.trim()) {
      setCommonSeats([...commonSeats, commonSeatInput.trim()])
      setCommonSeatInput("")
    }
  }

  // Handle add reserved seat
  const handleAddReservedSeat = () => {
    if (!isViewMode && reservedSeatInput.trim()) {
      setReservedSeats([...reservedSeats, reservedSeatInput.trim()])
      setReservedSeatInput("")
    }
  }

  // Handle seat removal
  const handleRemoveSeat = (index: number, type: "common" | "reserved") => {
    if (!isViewMode) {
      if (type === "common") {
        setCommonSeats(commonSeats.filter((_, i) => i !== index))
      } else {
        setReservedSeats(reservedSeats.filter((_, i) => i !== index))
      }
    }
  }

  // Handle edit seat
  const handleEditSeat = (index: number, type: "common" | "reserved") => {
    if (!isViewMode) {
      if (type === "common") {
        setEditingCommonSeat({ index, value: commonSeats[index] })
      } else {
        setEditingReservedSeat({ index, value: reservedSeats[index] })
      }
    }
  }

  // Handle save edit
  const handleSaveEdit = (type: "common" | "reserved") => {
    if (!isViewMode) {
      if (type === "common" && editingCommonSeat) {
        const newSeats = [...commonSeats]
        newSeats[editingCommonSeat.index] = editingCommonSeat.value
        setCommonSeats(newSeats)
        setEditingCommonSeat(null)
      } else if (type === "reserved" && editingReservedSeat) {
        const newSeats = [...reservedSeats]
        newSeats[editingReservedSeat.index] = editingReservedSeat.value
        setReservedSeats(newSeats)
        setEditingReservedSeat(null)
      }
    }
  }

  // Handle cancel edit
  const handleCancelEdit = (type: "common" | "reserved") => {
    if (type === "common") {
      setEditingCommonSeat(null)
    } else {
      setEditingReservedSeat(null)
    }
  }

  // Handle process
  const handleProcess = () => {
    if (!isViewMode) {
      console.log("Process clicked")
    }
  }

  // Handle cancel
  const handleCancel = () => {
    if (!isViewMode) {
      console.log("Cancel clicked")
    }
  }

  // Handle terms and conditions change
  const handleTermsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isViewMode) {
      setTermsAndConditions(e.target.value)
    }
  }

  // Handle cancellation policy change
  const handleCancellationPolicyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isViewMode) {
      setCancellationPolicy(e.target.value)
    }
  }

  // Handle block days change
  const handleBlockDaysChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!isViewMode) {
      const { name, value } = e.target
      setBlockDays((prev) => ({ ...prev, [name]: value }))
    }
  }

  // Handle rules description change
  const handleRulesDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>, id: number, field: string) => {
    if (!isViewMode) {
      const { value } = e.target
      setRulesDescription((prev) => prev.map((rule) => (rule.id === id ? { ...rule, [field]: value } : rule)))
    }
  }

  // Handle add rule
  const handleAddRule = () => {
    if (!isViewMode) {
      console.log("Add rule clicked")
    }
  }

  // Handle time picker
  const handleTimeClick = (field: string) => {
    if (!isViewMode) {
      setTimePickerOpen(field)
    }
  }

  const handleTimeConfirm = (time: string) => {
    if (timePickerOpen?.startsWith("rule")) {
      const ruleId = Number.parseInt(timePickerOpen.replace("rule", ""))
      setRulesDescription((prev) => prev.map((rule) => (rule.id === ruleId ? { ...rule, time } : rule)))
    }
    setTimePickerOpen(null)
  }

  // Add deduction change handler
  const handleDeductionChange = (id: number, increment: boolean) => {
    if (!isViewMode) {
      setRulesDescription((prev) =>
        prev.map((rule) => {
          if (rule.id === id) {
            const currentValue = Number.parseInt(rule.deduction) || 0
            const newValue = increment ? currentValue + 1 : Math.max(0, currentValue - 1)
            return { ...rule, deduction: newValue.toString() }
          }
          return rule
        }),
      )
    }
  }

  return (
    <div className="bg-white min-h-screen p-4 font-['PT_Sans']">
      {/* Breadcrumb */}
      <div className="mb-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Location and Floor Selection */}
      <div className="grid grid-cols-2 gap-4 mb-6 max-w-md">
        <div>
          <label className="block text-sm mb-1">Location</label>
          <Select
            name="location"
            value={location_state}
            onChange={handleLocationChange}
            options={["Location 1", "Location 2", "Location 3"]}
            placeholder="Select Location"
            disabled={isViewMode}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Floor</label>
          <Select
            name="floor"
            value={floor}
            onChange={handleFloorChange}
            options={["Floor 1", "Floor 2", "Floor 3"]}
            placeholder="Select Floor"
            disabled={isViewMode}
          />
        </div>
      </div>

      {/* Seat Type Table */}
      <div className="mb-6">
        <table className="border-collapse border border-gray-300 max-w-2xl">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 p-3 text-left text-sm font-medium">Seat Type</th>
              <th className="border border-gray-300 p-3 text-center text-sm font-medium">Total No. of Seats</th>
              <th className="border border-gray-300 p-3 text-center text-sm font-medium">Reserved Seats</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {seatTypes.map((seat, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-3 text-sm">{seat.type}</td>
                <td className="border border-gray-300 p-3 text-sm text-center">{seat.totalSeats}</td>
                <td className="border border-gray-300 p-3 text-sm text-center">{seat.reservedSeats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Floor Map */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Floor Map</h3>
        <div className="max-w-xs">
          <div className="flex items-center">
            <button
              onClick={handleFileUploadClick}
              className={`bg-gray-200 text-gray-700 px-3 py-1 rounded border border-gray-300 text-sm mr-2 ${
                isViewMode ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              }`}
              disabled={isViewMode}
            >
              Choose File
            </button>
            <span className="text-sm text-gray-500">{uploadedFileName || "No File Chosen"}</span>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              accept="image/*,.pdf"
              disabled={isViewMode}
            />
          </div>
        </div>
      </div>

      {/* Linear WS */}
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2">Linear WS</h3>
      </div>

      {/* Common Seat */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Common Seat</h3>
        <div className="border-b border-gray-300 mb-4"></div>

        {/* First row S1-S9 */}
        <div className="flex flex-wrap gap-2 mb-2">
          {commonSeats.slice(0, 9).map((seat, index) => (
            <div key={index} className="flex items-center bg-gray-100 rounded px-2 py-1">
              {editingCommonSeat?.index === index && !isViewMode ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={editingCommonSeat.value}
                    onChange={(e) => setEditingCommonSeat({ ...editingCommonSeat, value: e.target.value })}
                    className="text-sm w-12 px-1 border rounded mr-1"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") handleSaveEdit("common")
                      if (e.key === "Escape") handleCancelEdit("common")
                    }}
                    autoFocus
                  />
                  <button onClick={() => handleSaveEdit("common")} className="text-green-600 hover:text-green-800 mr-1">
                    ✓
                  </button>
                  <button onClick={() => handleCancelEdit("common")} className="text-red-600 hover:text-red-800">
                    ✕
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
                  <span className="text-sm mr-1">{seat}</span>
                  {!isViewMode && (
                    <>
                      <button
                        onClick={() => handleEditSeat(index, "common")}
                        className="text-gray-500 hover:text-blue-500 mr-1"
                      >
                        <Edit className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleRemoveSeat(index, "common")}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Second row S10-S19 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {commonSeats.slice(9).map((seat, index) => (
            <div key={index + 9} className="flex items-center bg-gray-100 rounded px-2 py-1">
              {editingCommonSeat?.index === index + 9 && !isViewMode ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={editingCommonSeat.value}
                    onChange={(e) => setEditingCommonSeat({ ...editingCommonSeat, value: e.target.value })}
                    className="text-sm w-12 px-1 border rounded mr-1"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") handleSaveEdit("common")
                      if (e.key === "Escape") handleCancelEdit("common")
                    }}
                    autoFocus
                  />
                  <button onClick={() => handleSaveEdit("common")} className="text-green-600 hover:text-green-800 mr-1">
                    ✓
                  </button>
                  <button onClick={() => handleCancelEdit("common")} className="text-red-600 hover:text-red-800">
                    ✕
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
                  <span className="text-sm mr-1">{seat}</span>
                  {!isViewMode && (
                    <>
                      <button
                        onClick={() => handleEditSeat(index + 9, "common")}
                        className="text-gray-500 hover:text-blue-500 mr-1"
                      >
                        <Edit className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleRemoveSeat(index + 9, "common")}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Seat count input with increment/decrement */}
        {!isViewMode && (
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center border rounded">
              <button
                onClick={() => setSeatCount((prev) => Math.max(0, prev - 1))}
                className="px-2 py-1 hover:bg-gray-100"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <input
                type="number"
                value={seatCount}
                onChange={(e) => setSeatCount(Number(e.target.value))}
                placeholder="Enter No Of Seats"
                className="w-40 text-center py-1 border-0 focus:outline-none"
              />
              <button onClick={() => setSeatCount((prev) => prev + 1)} className="px-2 py-1 hover:bg-gray-100">
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
            <button onClick={handleAddCommonSeat} className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm">
              Add
            </button>
          </div>
        )}
      </div>

      {/* Reserved Seats */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Reserved Seats</h3>
        <div className="border-b border-gray-300 mb-4"></div>

        <div className="flex flex-wrap gap-2 mb-4">
          {reservedSeats.map((seat, index) => (
            <div key={index} className="flex items-center bg-gray-100 rounded px-2 py-1">
              {editingReservedSeat?.index === index && !isViewMode ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={editingReservedSeat.value}
                    onChange={(e) => setEditingReservedSeat({ ...editingReservedSeat, value: e.target.value })}
                    className="text-sm w-12 px-1 border rounded mr-1"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") handleSaveEdit("reserved")
                      if (e.key === "Escape") handleCancelEdit("reserved")
                    }}
                    autoFocus
                  />
                  <button
                    onClick={() => handleSaveEdit("reserved")}
                    className="text-green-600 hover:text-green-800 mr-1"
                  >
                    ✓
                  </button>
                  <button onClick={() => handleCancelEdit("reserved")} className="text-red-600 hover:text-red-800">
                    ✕
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
                  <span className="text-sm mr-1">{seat}</span>
                  {!isViewMode && (
                    <>
                      <button
                        onClick={() => handleEditSeat(index, "reserved")}
                        className="text-gray-500 hover:text-blue-500 mr-1"
                      >
                        <Edit className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleRemoveSeat(index, "reserved")}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {!isViewMode && (
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter No Of Reserved Seats"
              value={reservedSeatInput}
              onChange={(e) => setReservedSeatInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleAddReservedSeat()
              }}
              className="px-3 py-1 border rounded text-sm w-48"
            />
            <button onClick={handleAddReservedSeat} className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm">
              Add Reserved
            </button>
          </div>
        )}
      </div>

      {/* Proceed and Cancel Buttons */}
      {!isViewMode && (
        <div className="flex justify-center gap-4 mb-6">
          <button onClick={handleProcess} className="bg-[#7991BB] text-white px-6 py-2 rounded">
            Proceed
          </button>
          <button onClick={handleCancel} className="bg-[#7991BB] text-white px-6 py-2 rounded">
            Cancel
          </button>
        </div>
      )}

      {/* Terms & Conditions and Cancellation Policy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Terms & Conditions</h3>
          <textarea
            value={termsAndConditions}
            onChange={handleTermsChange}
            className="w-full px-3 py-2 border rounded text-sm h-24"
            placeholder="Enter terms and conditions..."
            disabled={isViewMode}
          />
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">Cancellation Policy</h3>
          <textarea
            value={cancellationPolicy}
            onChange={handleCancellationPolicyChange}
            className="w-full px-3 py-2 border rounded text-sm h-24"
            placeholder="Enter cancellation policy..."
            disabled={isViewMode}
          />
        </div>
      </div>

      {/* Rules Description */}
      <div className="mb-6">
        <div className="grid grid-cols-3 gap-4 mb-2 pb-2 border-b border-gray-300">
          <div>
            <h3 className="text-sm font-medium">Rules Description</h3>
          </div>
          <div className="text-center">
            <h3 className="text-sm font-medium">Time</h3>
          </div>
          <div className="text-center">
            <h3 className="text-sm font-medium">Deduction</h3>
          </div>
        </div>

        {rulesDescription.map((rule) => (
          <div key={rule.id} className="grid grid-cols-3 gap-4 mb-2 items-center">
            <div>
              <p className="text-sm text-gray-600">{rule.description}</p>
            </div>
            <div>
              <div className="relative">
                <input
                  type="text"
                  value={rule.time}
                  onClick={() => handleTimeClick(`rule${rule.id}`)}
                  readOnly
                  className={`w-full px-3 py-2 border border-gray-300 rounded text-sm ${
                    isViewMode ? "cursor-default" : "cursor-pointer"
                  }`}
                  placeholder="00:00"
                  disabled={isViewMode}
                />
                <Clock className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="flex items-center border rounded">
                <button
                  onClick={() => handleDeductionChange(rule.id, false)}
                  className="px-2 py-1 hover:bg-gray-100"
                  disabled={isViewMode}
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  value={rule.deduction}
                  readOnly
                  className="w-16 text-center py-1 border-0 focus:outline-none"
                  disabled={isViewMode}
                />
                <button
                  onClick={() => handleDeductionChange(rule.id, true)}
                  className="px-2 py-1 hover:bg-gray-100"
                  disabled={isViewMode}
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
              </div>
              <span className="text-gray-400">%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Block Days */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Block Days</h3>
        <div className="grid grid-cols-3 gap-4 max-w-2xl">
          <div>
            <input
              type="text"
              name="date"
              value={blockDays.date}
              onChange={handleBlockDaysChange}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              placeholder="Select date"
              disabled={isViewMode}
            />
          </div>
          <div>
            <select
              name="entireDay"
              value={blockDays.entireDay}
              onChange={handleBlockDaysChange}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              disabled={isViewMode}
            >
              <option value="Entire Day">Entire Day</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              name="blockReason"
              value={blockDays.blockReason}
              onChange={handleBlockDaysChange}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              placeholder="Block Reason"
              disabled={isViewMode}
            />
          </div>
        </div>
      </div>

      {/* Add Rule Button */}
      {!isViewMode && (
        <div className="flex justify-center">
          <button onClick={handleAddRule} className="bg-[#7991BB] text-white px-6 py-2 rounded">
            Add Rule
          </button>
        </div>
      )}

      {/* Time Picker Modal */}
      <TimePickerModal
        isOpen={timePickerOpen !== null && !isViewMode}
        onClose={() => setTimePickerOpen(null)}
        onConfirm={handleTimeConfirm}
      />
    </div>
  )
}
