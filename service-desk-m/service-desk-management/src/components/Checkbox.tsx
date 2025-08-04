import { ChangeEvent } from 'react';

interface CheckboxProps {
  label: string;
  required?: boolean;
  disabled?: boolean;
  checked: boolean;
  onChange: (checked: boolean) => void; // Changed to accept boolean
  name: string;
  error?: boolean;
}

const Checkbox = ({
  label,
  required = false,
  disabled = false,
  checked,
  onChange,
  name,
  error
}: CheckboxProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked); // Pass only the boolean value
  };

  return (
    <>
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={handleChange} // Use the wrapper function
          disabled={disabled}
          className={`h-4 w-4 border-gray-300 rounded ${
            disabled ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
          style={{
            accentColor: '#7991BB',
            '--tw-ring-color': '#7991BB'
          } as React.CSSProperties}
        />
        <label htmlFor={name} className="ml-2 block text-sm text-gray-900">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      </div>
             
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </>
  );
};

export default Checkbox;