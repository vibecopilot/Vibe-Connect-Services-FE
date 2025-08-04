interface DatePickerProps {
  label: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  type?: 'date' | 'datetime-local' | 'month' | 'time';
  minDate?: string | Date;
  maxDate?: string | Date;
  value: string | Date | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string; 
}

const DatePicker = ({
  label,
  name,
  required = false,
  disabled = false,
  type = 'date',
  minDate,
  maxDate,
  value,
  onChange,
  error
}: DatePickerProps) => {
  // Helper function to convert Date to string format expected by input
  const formatValueForInput = (val: string | Date | null): string => {
    if (!val) return '';
    
    if (val instanceof Date) {
      // Format Date object based on input type
      switch (type) {
        case 'datetime-local':
          return val.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
        case 'month':
          return val.toISOString().slice(0, 7); // YYYY-MM
        case 'time':
          return val.toTimeString().slice(0, 5); // HH:mm
        case 'date':
        default:
          return val.toISOString().slice(0, 10); // YYYY-MM-DD
      }
    }
    
    return val.toString();
  };

  const formatDateForAttribute = (date: string | Date | undefined): string | undefined => {
    if (!date) return undefined;
    if (date instanceof Date) {
      return date.toISOString().slice(0, 10); // Always use YYYY-MM-DD for min/max
    }
    return date.toString();
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <input
        type={type}
        name={name}
        min={formatDateForAttribute(minDate)}
        max={formatDateForAttribute(maxDate)}
        value={formatValueForInput(value)}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-md ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : ''
        }`}
      />
      
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default DatePicker;