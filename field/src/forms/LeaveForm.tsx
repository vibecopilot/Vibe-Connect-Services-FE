import React from "react";
import TextInput from "../components/TextInput";
import Select from "../components/Select";
import DatePickerReact from "../components/ReactDatePicker";

interface LeaveFormProps {
  formData: {
    appliedOn: Date | null;
    from: Date | null;
    to: Date | null;
    days: number;
    type: string;
    firstHalf: string;
    secondHalf: string;
    reason: string;
    status: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { target: { name: string; value: Date | null | number } }
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  errors: {
    appliedOn?: string;
    from?: string;
    to?: string;
    days?: string;
    type?: string;
    firstHalf?: string;
    secondHalf?: string;
    reason?: string;
    status?: string;
  };
  isEditing: boolean;
  isViewMode?: boolean;
}

const LeaveForm: React.FC<LeaveFormProps> = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  errors,
  isEditing,
  isViewMode = false,
}) => {
  const leaveTypes = ["Annual Leave", "Sick Leave", "Maternity Leave", "Paternity Leave", "Emergency Leave", "Compensatory Leave"];
  const halfDayOptions = ["Yes", "No"];
  const reasons = ["Vacation", "Medical", "Family Emergency", "Personal", "Wedding", "Other"];
  const statuses = ["Pending", "Approved", "Rejected"];

  const getFormTitle = () => {
    if (isViewMode) return "View Leave Details";
    return isEditing ? "Edit Leave" : "Add New Leave";
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      target: {
        name,
        value: parseInt(value) || 0,
      },
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-4 rounded-md shadow-md border border-gray-200 mt-4"
    >
      <h2 className="text-lg font-semibold mb-4">
        {getFormTitle()}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <DatePickerReact
          label="Applied On"
          name="appliedOn"
          value={formData.appliedOn}
          onChange={onChange}
          required
          error={errors.appliedOn}
          disabled={isViewMode}
        />

        <DatePickerReact
          label="From"
          name="from"
          value={formData.from}
          onChange={onChange}
          required
          error={errors.from}
          disabled={isViewMode}
        />

        <DatePickerReact
          label="To"
          name="to"
          value={formData.to}
          onChange={onChange}
          required
          error={errors.to}
          disabled={isViewMode}
        />

        <TextInput
          label="Days"
          name="days"
          value={formData.days.toString()}
          onChange={handleNumberChange}
          required
          error={errors.days}
          type="number"
          min="1"
          placeholder="Enter number of days"
          disabled={isViewMode}
        />

        <Select
          label="Leave Type"
          name="type"
          value={formData.type}
          onChange={onChange}
          options={leaveTypes}
          required
          error={errors.type}
          placeholder="Select Leave Type"
          disabled={isViewMode}
        />

        <Select
          label="First Half"
          name="firstHalf"
          value={formData.firstHalf}
          onChange={onChange}
          options={halfDayOptions}
          error={errors.firstHalf}
          placeholder="Select First Half"
          disabled={isViewMode}
        />

        <Select
          label="Second Half"
          name="secondHalf"
          value={formData.secondHalf}
          onChange={onChange}
          options={halfDayOptions}
          error={errors.secondHalf}
          placeholder="Select Second Half"
          disabled={isViewMode}
        />

        <Select
          label="Reason"
          name="reason"
          value={formData.reason}
          onChange={onChange}
          options={reasons}
          required
          error={errors.reason}
          placeholder="Select Reason"
          disabled={isViewMode}
        />

        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={onChange}
          options={statuses}
          required
          error={errors.status}
          placeholder="Select Status"
          disabled={isViewMode}
        />
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        {!isViewMode && (
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            {isEditing ? "Update" : "Submit"}
          </button>
        )}
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md transition-colors"
        >
          {isViewMode ? "Close" : "Cancel"}
        </button>
      </div>
    </form>
  );
};

export default LeaveForm;