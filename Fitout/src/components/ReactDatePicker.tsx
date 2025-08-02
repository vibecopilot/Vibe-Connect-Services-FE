import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';

interface DatePickerProps {
    label: string;
    required?: boolean;
    disabled?: boolean;
    minDate?: string | Date;
    maxDate?: string | Date;
    value: Date | null;
    onChange: (e: { target: { name: string; value: Date | null } }) => void;
    error?: string;
    name?: string;
    popperContainer?: (props: { children: React.ReactNode }) => React.ReactElement;
}

const DatePickerReact = ({
    label,
    required = false,
    disabled = false,
    minDate,
    maxDate,
    value,
    onChange,
    error,
    name,
    popperContainer
}: DatePickerProps) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative w-full">
                <ReactDatePicker
                    selected={value}
                    onChange={(date: Date | null) => onChange({ target: { name: name ?? "", value: date } })}
                    minDate={minDate ? new Date(minDate) : undefined}
                    maxDate={maxDate ? new Date(maxDate) : undefined}
                    disabled={disabled}
                    placeholderText="Select date"
                    dateFormat="yyyy-MM-dd"
                    wrapperClassName="w-full"
                    className={`w-full px-3 py-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'
                        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    {...(popperContainer ? { popperContainer } : {})}
                />
            </div>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default DatePickerReact;
