
import type React from "react"
import DayPicker from "./DayPicker"
import TimePicker from "./TimePicker"

interface DayTimePickerProps {
  selectedDays: string[]
  startTime: string
  endTime: string
  onDaysChange: (days: string[]) => void
  onTimeChange: (startTime: string, endTime: string) => void
  onCancel: () => void
  onSet: () => void
}

const DayTimePicker: React.FC<DayTimePickerProps> = ({
  selectedDays,
  startTime,
  endTime,
  onDaysChange,
  onTimeChange,
  onCancel,
  onSet,
}) => {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gray-300 text-center py-3 mb-6 rounded">
        <h2 className="text-lg font-medium">Pick Day & Time</h2>
      </div>

      {/* Day and Time Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <DayPicker selectedDays={selectedDays} onDaysChange={onDaysChange} />

        <TimePicker startTime={startTime} endTime={endTime} onTimeChange={onTimeChange} />
      </div>

      {/* Bottom Actions */}
      <div className="flex gap-4">
        <button onClick={onCancel} className="flex-1 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Cancel
        </button>
        <button onClick={onSet} className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Set
        </button>
      </div>
    </div>
  )
}

export default DayTimePicker
