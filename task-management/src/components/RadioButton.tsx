import type React from "react"

interface RadioButtonProps {
  label: string
  required?: boolean
  disabled?: boolean
  options: string[]
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  name: string
  error?: string
}

const RadioButton = ({
  label,
  required = false,
  disabled = false,
  options,
  value,
  onChange,
  name,
  error,
}: RadioButtonProps) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="space-y-2">
        {options.map((option) => (
          <div key={option} className="flex items-center">
            <input
              type="radio"
              id={`${name}-${option}`}
              name={name}
              value={option}
              checked={value === option}
              onChange={onChange}
              disabled={disabled}
              className="h-4 w-4 border-gray-300 focus:ring-0"
              style={{
                accentColor: '#7991BB'
              }}
            />
            <label htmlFor={`${name}-${option}`} className="ml-2 text-sm text-gray-900">
              {option}
            </label>
          </div>
        ))}
      </div>
      
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

export default RadioButton
