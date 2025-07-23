import { useState } from 'react';
import { Eye, EyeOff, Search } from 'lucide-react';

interface TextInputProps {
  label: string;
  required?: boolean;
  disabled?: boolean;
  type?: 'text' | 'email' | 'password' | 'url' | 'search';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  minimum_length?: number;
  maximum_length?: number;
  regex?: string;
  searchIcon?: boolean;
  error?: string;
}

const TextInput = ({
  label,
  required = false,
  disabled = false,
  type = 'text',
  value,
  onChange,
  name,
  minimum_length,
  maximum_length,
  regex,
  searchIcon,
  error
}: TextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => setShowPassword(!showPassword);

  return (
    <div className="mb-4">
      <label className="block text-sm  mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="relative">
        <input
          name={name}
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          minLength={minimum_length}
          maxLength={maximum_length}
          pattern={regex}
          className={`w-full px-3 py-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'}  ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        
        {type === 'password' && (
          <button
            type="button"
            onClick={handleToggle}
            className="absolute right-3 top-3"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
        
        {type === 'search' && searchIcon && (
          <Search className="absolute right-3 top-3 text-gray-400" size={18} />
        )}
      </div>
    </div>
  );
};

export default TextInput;