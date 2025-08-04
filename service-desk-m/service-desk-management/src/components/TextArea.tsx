interface TextAreaProps {
  required?: boolean;
  minimum_length?: number;
  maximum_length?: number;
  regex?: string;
  label?: string;
  disabled?: boolean;
  readOnly?: boolean; // ✅ Added readOnly prop
  type?: "text" | "email" | "password";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name: string;
  rows?: number;
  placeholder?: string;
  error?: string;
  className?: string; // ✅ Added className prop
}

const TextArea: React.FC<TextAreaProps> = ({
  required,
  minimum_length,
  maximum_length,
  regex,
  label,
  disabled = false,
  readOnly = false, // ✅ Added readOnly with default value
  value,
  onChange,
  name,
  rows = 5,
  placeholder = "Enter your text...",
  error,
  className = '' // ✅ Added className with default value
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
   
      <textarea
        name={name}
        id={name}
        required={required}
        disabled={disabled}
        readOnly={readOnly} // ✅ Added readOnly attribute
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        minLength={minimum_length}
        maxLength={maximum_length}
        className={`w-full px-3 py-2 border rounded-md 
          ${error ? 'border-red-500' : 'border-gray-300'} 
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''} 
          ${readOnly ? 'bg-gray-50 cursor-default' : ''} 
          ${className}`} // ✅ Added custom className support
      ></textarea>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextArea;