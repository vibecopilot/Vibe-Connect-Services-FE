import React from "react";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  required = false,
  name = "",
}) => {
  const handleClick = () => {
    if (!disabled) {
      const newValue = !checked;
      onChange(newValue);
      console.log("Toggle switched:", newValue);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        aria-pressed={checked}
        aria-required={required}
        name={name}
        className="focus:outline-none"
      >
        <div
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
            ${checked 
              ? "bg-green-600" 
              : "bg-gray-300"
            }
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200
              ${checked ? "translate-x-6" : "translate-x-1"}
            `}
          />
        </div>
      </button>
    </div>
  );
};

export default ToggleSwitch;