
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface DatePickerModalProps {
  onSave: (date: string, time: string) => void
  onCancel: () => void
}

const DatePickerModal = ({ onSave, onCancel }: DatePickerModalProps) => {
  const [selectedDate, setSelectedDate] = useState("5/06/2025")
  const [selectedTime, setSelectedTime] = useState("11:23 AM")
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 5)) // June 2025
  const [selectedDay, setSelectedDay] = useState(5)

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const handleDayClick = (day: number) => {
    setSelectedDay(day)
    const month = currentMonth.getMonth() + 1
    const year = currentMonth.getFullYear()
    setSelectedDate(`${month}/${day.toString().padStart(2, "0")}/${year}`)
  }

  const handleQuickSelect = (option: string) => {
    const today = new Date()
    let newDate = ""

    switch (option) {
      case "Later Today":
        newDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`
        break
      case "Tomorrow":
        const tomorrow = new Date(today)
        tomorrow.setDate(today.getDate() + 1)
        newDate = `${tomorrow.getMonth() + 1}/${tomorrow.getDate()}/${tomorrow.getFullYear()}`
        break
      case "Next Week":
        const nextWeek = new Date(today)
        nextWeek.setDate(today.getDate() + 7)
        newDate = `${nextWeek.getMonth() + 1}/${nextWeek.getDate()}/${nextWeek.getFullYear()}`
        break
      case "Someday":
        newDate = "Someday"
        break
    }
    setSelectedDate(newDate)
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []

    // Previous month's trailing days
    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    const daysInPrevMonth = getDaysInMonth(prevMonth)

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <button key={`prev-${daysInPrevMonth - i}`} className="w-8 h-8 text-gray-400 text-sm" disabled>
          {daysInPrevMonth - i}
        </button>,
      )
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <button
          key={day}
          onClick={() => handleDayClick(day)}
          className={`w-8 h-8 text-sm rounded-full ${
            day === selectedDay ? "bg-blue-500 text-white" : "text-gray-900 hover:bg-gray-100"
          }`}
        >
          {day}
        </button>,
      )
    }

    // Next month's leading days
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7
    const remainingCells = totalCells - (firstDay + daysInMonth)

    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <button key={`next-${day}`} className="w-8 h-8 text-gray-400 text-sm" disabled>
          {day}
        </button>,
      )
    }

    return days
  }

  return (
    <div className="p-6 bg-white">
      {/* Date and Time Inputs */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Date</label>
          <input
            type="text"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Time</label>
          <input
            type="text"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Calendar */}
        <div>
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <div className="flex space-x-2">
              <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded">
                <ChevronLeft size={16} />
              </button>
              <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
        </div>

        {/* Quick Select Options */}
        <div className="space-y-2">
          {["Later Today", "Tomorrow", "Next Week", "Someday"].map((option) => (
            <button
              key={option}
              onClick={() => handleQuickSelect(option)}
              className="w-full px-4 py-2 text-left bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 mt-6 pt-4 border-t">
        <button onClick={onCancel} className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
          Cancel
        </button>
        <button
          onClick={() => onSave(selectedDate, selectedTime)}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Set
        </button>
      </div>
    </div>
  )
}

export default DatePickerModal