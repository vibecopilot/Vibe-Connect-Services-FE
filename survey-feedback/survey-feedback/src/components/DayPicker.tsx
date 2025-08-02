
import type React from "react"
import { useState } from "react"

interface DayPickerProps {
  selectedDays: string[]
  onDaysChange: (days: string[]) => void
  onCancel?: () => void
  onSet?: () => void
}

const DayPicker: React.FC<DayPickerProps> = ({ selectedDays, onDaysChange, onCancel, onSet }) => {
  const [showDaySelection, setShowDaySelection] = useState(false)
  const days = [
    { short: "M", full: "Monday" },
    { short: "T", full: "Tuesday" },
    { short: "W", full: "Wednesday" },
    { short: "T", full: "Thursday" },
    { short: "F", full: "Friday" },
    { short: "S", full: "Saturday" },
    { short: "S", full: "Sunday" },
  ]

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      onDaysChange(selectedDays.filter((d) => d !== day))
    } else {
      onDaysChange([...selectedDays, day])
    }
  }

  const handleSelectDays = () => {
    setShowDaySelection(true)
  }

  const handleCancel = () => {
    setShowDaySelection(false)
    onCancel?.()
  }

  const handleSet = () => {
    setShowDaySelection(false)
    onSet?.()
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium mb-4">Day</h3>

      <button
        onClick={handleSelectDays}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
      >
        Select Days
      </button>

      {showDaySelection && (
        <div className="border rounded p-4 bg-white">
          <div className="flex gap-2 mb-4 justify-center">
            {days.map((day, index) => (
              <button
                key={`${day.short}-${index}`}
                onClick={() => toggleDay(day.full)}
                className={`w-8 h-8 rounded-full text-sm font-medium ${
                  selectedDays.includes(day.full)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {day.short}
              </button>
            ))}
          </div>

          <div className="flex gap-2 justify-center">
            <button onClick={handleCancel} className="px-4 py-1 text-gray-600 hover:text-gray-800">
              Cancel
            </button>
            <button onClick={handleSet} className="px-4 py-1 text-blue-600 hover:text-blue-800">
              Set
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DayPicker
