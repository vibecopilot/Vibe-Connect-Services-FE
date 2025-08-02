import React from "react";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  label?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  label,
}) => {
  return (
    <label className="inline-flex items-center cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="sr-only peer"
      />
      <div
        className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${
          checked ? "bg-green-500" : "bg-gray-400"
        } ${disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <div
          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </div>
      {/* {label && <span className="ml-2 text-sm">{label}</span>} */}
    </label>
  );
};

export default ToggleSwitch;