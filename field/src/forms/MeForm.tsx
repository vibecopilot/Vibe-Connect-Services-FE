import React from "react";
import TextInput from "../components/TextInput";
import Select from "../components/Select";
import DatePickerReact from "../components/ReactDatePicker";

interface MeFormProps {
  formData: {
    date: Date | null;
    punchIn: string;
    punchOut: string;
    workedFor: string;
    shortfall: string;
    attendance: string;
    remark: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { target: { name: string; value: Date | null } }
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  errors: {
    date?: string;
    punchIn?: string;
    punchOut?: string;
    workedFor?: string;
    shortfall?: string;
    attendance?: string;
    remark?: string;
  };
  isEditing: boolean;
  isViewMode?: boolean;
}

const MeForm: React.FC<MeFormProps> = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  errors,
  isEditing,
  isViewMode = false,
}) => {
  const attendanceOptions = ["Present", "Absent"];
  const remarkOptions = ["On Time", "Late Arrival", "Early Departure", "Medical Leave", "Personal Leave", "Overtime", "Holiday Work"];

  const getFormTitle = () => {
    if (isViewMode) return "View Attendance Details";
    return isEditing ? "Edit Attendance" : "Add New Attendance";
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-4 rounded-md shadow-md border border-gray-200 mt-4"
    >
      <h2 className="text-lg font-semibold mb-4">
        {getFormTitle()}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DatePickerReact
          label="Date"
          name="date"
          value={formData.date}
          onChange={onChange}
          required
          error={errors.date}
          disabled={isViewMode}
        />

        <Select
          label="Attendance"
          name="attendance"
          value={formData.attendance}
          onChange={onChange}
          options={attendanceOptions}
          required
          error={errors.attendance}
          placeholder="Select Attendance"
          disabled={isViewMode}
        />

        <TextInput
          label="Punch In"
          name="punchIn"
          value={formData.punchIn}
          onChange={onChange}
          required={formData.attendance === "Present"}
          error={errors.punchIn}
          placeholder="e.g., 9:15 AM"
          disabled={isViewMode || formData.attendance === "Absent"}
        />

        <TextInput
          label="Punch Out"
          name="punchOut"
          value={formData.punchOut}
          onChange={onChange}
          required={formData.attendance === "Present"}
          error={errors.punchOut}
          placeholder="e.g., 7:30 PM"
          disabled={isViewMode || formData.attendance === "Absent"}
        />

        <TextInput
          label="Worked For"
          name="workedFor"
          value={formData.workedFor}
          onChange={onChange}
          required
          error={errors.workedFor}
          placeholder="e.g., 10.00 HRS"
          disabled={isViewMode}
        />

        <TextInput
          label="Shortfall"
          name="shortfall"
          value={formData.shortfall}
          onChange={onChange}
          error={errors.shortfall}
          placeholder="e.g., 0.00 HRS"
          disabled={isViewMode}
        />

        <Select
          label="Remark"
          name="remark"
          value={formData.remark}
          onChange={onChange}
          options={remarkOptions}
          required
          error={errors.remark}
          placeholder="Select Remark"
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

export default MeForm;