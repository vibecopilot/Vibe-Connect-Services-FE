interface DatePickerProps {
  label: string;
  name?:string;
  required?: boolean;
  disabled?: boolean;
  type?: 'date' | 'datetime-local' | 'month' | 'time';
  minDate?: string | Date;
  maxDate?: string | Date;
  value: string | Date;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?:string;
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
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <input
        type={type}
        name={name}
        min={minDate?.toString()}
        max={maxDate?.toString()}
        value={value.toString()}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-md ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
      />
       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default DatePicker;