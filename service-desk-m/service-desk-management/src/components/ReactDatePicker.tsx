
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { CalendarDays } from "lucide-react"

interface ReactDatePickerProps {
  label: string
  name: string
  value: Date | null
  onChange: (e: { target: { name: string; value: Date | null } }) => void
  required?: boolean
  className?: string
}

export default function ReactDatePicker({ label, name, value, onChange, required, className }: ReactDatePickerProps) {
  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      <label htmlFor={name} className="font-bold text-gray-900 text-sm">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative w-full">
        <DatePicker
          selected={value}
          onChange={(date: Date | null) => onChange({ target: { name, value: date } })}
          dateFormat="MM/dd/yyyy"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          wrapperClassName="w-full"
          required={required}
        />
        <CalendarDays
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          size={18}
        />
      </div>
    </div>
  )
}
