import { useState, forwardRef } from 'react';
import { Eye, EyeOff, Search } from 'lucide-react';

interface TextInputProps {
  label?: string;
  required?: boolean;
  disabled?: boolean;
  type?: 'text' | 'email' | 'password' | 'url' | 'search' | 'file' | 'number' | 'tel';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  name?: string;
  minimum_length?: number;
  maximum_length?: number;
  regex?: string;
  searchIcon?: boolean;
  error?: string;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
  accept?: string; // For file inputs
  hidden?: boolean; // For hidden file inputs
  id?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({
  label,
  required = false,
  disabled = false,
  type = 'text',
  value = '',
  onChange,
  onClick,
  name,
  minimum_length,
  maximum_length,
  regex,
  searchIcon,
  error,
  placeholder,
  className = "",
  readOnly = false,
  accept,
  hidden = false,
  id
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => setShowPassword(!showPassword);

  // Special styling for search inputs
  const isSearchInput = type === 'search';
  const isFileInput = type === 'file';
  
  const getInputStyle = () => {
    if (isSearchInput) {
      return "w-40 px-8 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
    }
    
    if (isFileInput && hidden) {
      return "hidden";
    }
    
    const baseStyle = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
    const errorStyle = error ? 'border-red-500' : 'border-gray-300';
    const disabledStyle = disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white';
    const readOnlyStyle = readOnly ? 'cursor-pointer hover:bg-gray-50' : '';
    
    return `${baseStyle} ${errorStyle} ${disabledStyle} ${readOnlyStyle}`;
  };

  // Don't render label for hidden file inputs
  const shouldShowLabel = label && !isSearchInput && !(isFileInput && hidden);

  return (
    <div className={`${isSearchInput ? '' : 'mb-4'} ${className}`}>
      {shouldShowLabel && (
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={id}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
             
      <div className="relative">
        <input
          ref={ref}
          id={id}
          name={name}
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          value={type === 'file' ? undefined : value}
          onChange={onChange}
          onClick={onClick}
          disabled={disabled}
          readOnly={readOnly}
          minLength={minimum_length}
          maxLength={maximum_length}
          pattern={regex}
          placeholder={placeholder}
          accept={accept}
          className={getInputStyle()}
        />
        
        {error && !isSearchInput && !(isFileInput && hidden) && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )}
                 
        {type === 'password' && (
          <button
            type="button"
            onClick={handleToggle}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
                 
        {(type === 'search' || searchIcon) && (
          <Search className={`absolute ${isSearchInput ? 'left-2' : 'right-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={18} />
        )}
      </div>
    </div>
  );
});

TextInput.displayName = 'TextInput';

export default TextInput;