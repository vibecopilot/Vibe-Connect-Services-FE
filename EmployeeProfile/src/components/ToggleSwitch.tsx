"use client"

import type React from "react"

interface ToggleSwitchProps {
  isOn: boolean
  onToggle: () => void
  testId?: string
  ariaLabel?: string
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onToggle, testId, ariaLabel }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
        isOn ? "bg-red-500" : "bg-gray-300"
      }`}
      role="switch"
      aria-checked={isOn}
      aria-label={ariaLabel}
      data-testid={testId}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
          isOn ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  )
}

export default ToggleSwitch
