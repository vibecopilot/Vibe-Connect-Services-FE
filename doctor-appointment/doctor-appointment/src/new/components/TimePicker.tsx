
import type React from "react"
import { useState } from "react"
import { Clock } from "lucide-react"

interface TimePickerProps {
  startTime: string
  endTime: string
  onTimeChange: (startTime: string, endTime: string) => void
}

const TimePicker: React.FC<TimePickerProps> = ({ startTime, endTime, onTimeChange }) => {
  const [selectedHour, setSelectedHour] = useState(7)
  const [selectedMinute, setSelectedMinute] = useState(0)
  const [amPm, setAmPm] = useState("AM")
  const [isSelectingStart, setIsSelectingStart] = useState(true)

  const hours = Array.from({ length: 12 }, (_, i) => i + 1)

  const handleClockClick = (hour: number) => {
    setSelectedHour(hour)
    const timeString = `${hour}:${selectedMinute.toString().padStart(2, "0")} ${amPm}`

    if (isSelectingStart) {
      onTimeChange(timeString, endTime)
    } else {
      onTimeChange(startTime, timeString)
    }
  }

  const formatTime = (time: string) => {
    if (!time) return ""
    return time
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium mb-4">Time</h3>

      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Start Time"
            value={formatTime(startTime)}
            onClick={() => setIsSelectingStart(true)}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10 cursor-pointer"
          />
          <Clock className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>

        <div className="text-center text-gray-500">To</div>

        <div className="relative">
          <input
            type="text"
            placeholder="End Time"
            value={formatTime(endTime)}
            onClick={() => setIsSelectingStart(false)}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10 cursor-pointer"
          />
          <Clock className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>

        {/* Clock Interface */}
        <div className="flex flex-col items-center mt-6">
          <div className="text-center mb-2">
            <span className="text-2xl font-bold">{selectedHour}</span>
            <span className="text-2xl font-bold mx-1">:</span>
            <span className="text-2xl font-bold">{selectedMinute.toString().padStart(2, "0")}</span>
            <span className="text-sm ml-2 text-gray-500">{amPm}</span>
          </div>

          {/* Clock Face */}
          <div className="relative w-32 h-32 border-2 border-gray-300 rounded-full mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>

            {hours.map((hour) => {
              const angle = hour * 30 - 90 // 30 degrees per hour, -90 to start at 12
              const radian = (angle * Math.PI) / 180
              const x = 50 + 35 * Math.cos(radian)
              const y = 50 + 35 * Math.sin(radian)

              return (
                <button
                  key={hour}
                  onClick={() => handleClockClick(hour)}
                  className={`absolute w-6 h-6 text-xs rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 ${
                    selectedHour === hour ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                  }}
                >
                  {hour}
                </button>
              )
            })}

            {/* Clock Hand */}
            <div
              className="absolute w-0.5 bg-blue-500 origin-bottom"
              style={{
                height: "35%",
                left: "50%",
                top: "15%",
                transform: `translateX(-50%) rotate(${selectedHour * 30 - 90}deg)`,
              }}
            />
          </div>

          {/* AM/PM Toggle */}
          <div className="flex border rounded overflow-hidden">
            <button
              onClick={() => setAmPm("AM")}
              className={`px-3 py-1 text-sm ${amPm === "AM" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
            >
              AM
            </button>
            <button
              onClick={() => setAmPm("PM")}
              className={`px-3 py-1 text-sm ${amPm === "PM" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
            >
              PM
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimePicker