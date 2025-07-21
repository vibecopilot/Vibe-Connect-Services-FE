import React from 'react';

interface SelectProps {
  required?: boolean;
  label?: string;
  disabled?: boolean;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  placeholder?: string;
  error?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const Select: React.FC<SelectProps> = ({
  required = false,
  label,
  disabled = false,
  options,
  value,
  onChange,
  name,
  placeholder = "Select an option",
  error,
  onClick
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    onChange(e);
  };

  return (
    <>
      <div className="mb-4">
        {label && (
          <label className="block text-sm mb-1">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <div className="flex-1">
          <select
            name={name}
            id={name}
            required={required}
            disabled={disabled}
            value={value}
            onChange={handleChange}
            onClick={handleClick}
            onMouseDown={(e) => e.stopPropagation()}
            className={`w-full px-3 py-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'}  ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((opt) => (
              <option value={opt} key={opt} className="text-black">
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

export default Select;
