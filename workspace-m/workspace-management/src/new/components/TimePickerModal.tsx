
import { useState } from "react"

interface TimePickerModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (time: string) => void
  initialTime?: string
}

export default function TimePickerModal({ isOpen, onClose, onConfirm, initialTime = "07:00" }: TimePickerModalProps) {
  const [selectedHour, setSelectedHour] = useState(7)
  const [selectedMinute, setSelectedMinute] = useState(0)
  const [isPM, setIsPM] = useState(false)

  if (!isOpen) return null

  const hours = Array.from({ length: 12 }, (_, i) => i + 1)
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5)

  const handleConfirm = () => {
    const hour24 = isPM ? (selectedHour === 12 ? 12 : selectedHour + 12) : selectedHour === 12 ? 0 : selectedHour
    const timeString = `${hour24.toString().padStart(2, "0")}:${selectedMinute.toString().padStart(2, "0")}`
    onConfirm(timeString)
    onClose()
  }

  const getClockPosition = (value: number, max: number, radius: number) => {
    const angle = (value * 360) / max - 90
    const radian = (angle * Math.PI) / 180
    return {
      x: radius + radius * 0.8 * Math.cos(radian),
      y: radius + radius * 0.8 * Math.sin(radian),
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center font-['PT_Sans']">
      <div className="bg-white rounded-lg p-6 w-80">
        <div className="text-center mb-4">
          <h3 className="text-sm text-gray-500 mb-2">SELECT TIME</h3>
          <div className="flex items-center justify-center space-x-2 text-3xl font-light">
            <span className="bg-blue-100 px-3 py-1 rounded">{selectedHour}</span>
            <span>:</span>
            <span className="bg-gray-100 px-3 py-1 rounded">{selectedMinute.toString().padStart(2, "0")}</span>
            <div className="ml-4">
              <button
                onClick={() => setIsPM(false)}
                className={`block px-2 py-1 text-sm ${!isPM ? "bg-blue-500 text-white" : "text-gray-500"} rounded`}
              >
                AM
              </button>
              <button
                onClick={() => setIsPM(true)}
                className={`block px-2 py-1 text-sm ${isPM ? "bg-blue-500 text-white" : "text-gray-500"} rounded mt-1`}
              >
                PM
              </button>
            </div>
          </div>
        </div>

        <div className="relative w-48 h-48 mx-auto mb-6">
          <svg className="w-full h-full">
            <circle cx="96" cy="96" r="90" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="2" />

            {/* Hour markers */}
            {hours.map((hour) => {
              const pos = getClockPosition(hour, 12, 96)
              return (
                <g key={hour}>
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="16"
                    fill={selectedHour === hour ? "#3b82f6" : "transparent"}
                    className="cursor-pointer"
                    onClick={() => setSelectedHour(hour)}
                  />
                  <text
                    x={pos.x}
                    y={pos.y + 4}
                    textAnchor="middle"
                    className={`text-sm cursor-pointer ${selectedHour === hour ? "fill-white" : "fill-gray-700"}`}
                    onClick={() => setSelectedHour(hour)}
                  >
                    {hour}
                  </text>
                </g>
              )
            })}

            {/* Clock hand */}
            <line
              x1="96"
              y1="96"
              x2={getClockPosition(selectedHour, 12, 96).x}
              y2={getClockPosition(selectedHour, 12, 96).y}
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <circle cx="96" cy="96" r="4" fill="#3b82f6" />
          </svg>
        </div>

        <div className="flex justify-between">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            CANCEL
          </button>
          <button onClick={handleConfirm} className="text-blue-500 hover:text-blue-700 font-medium">
            OK
          </button>
        </div>
      </div>
    </div>
  )
}
