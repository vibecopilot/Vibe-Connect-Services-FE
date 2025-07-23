import React from 'react';

interface CheckboxProps {
  label: string;
  required?: boolean;
  disabled?: boolean;
  checked: boolean;
  onChange: (e: { target: { name: string; value: boolean } }) => void;
  name: string;
  error?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  required = false,
  disabled = false,
  checked,
  onChange,
  name,
  error
}) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={(e) => onChange({ target: { name, value: e.target.checked } })}
        disabled={disabled}
        className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : ''
        }`}
      />
      <label
        htmlFor={name}
        className={`ml-2 text-sm text-gray-700 ${
          disabled ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer'
        }`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {error && (
        <div className="text-red-500 text-sm mt-1">
          {error}
        </div>
      )}
    </div>
  );
};

export default Checkbox;