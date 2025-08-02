import React from "react";
import TextInput from "../components/TextInput";
import Select from "../components/Select";
import DatePickerReact from "../components/ReactDatePicker";
import ToggleSwitch from "../components/ToggleSwitch";

interface VisitBeatPlansFormProps {
  formData: {
    name: string;
    createdBy: string;
    createdOn: Date | null;
    visits: number;
    assignedTo: string;
    status: boolean;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onDateChange: (date: Date | null) => void;
  onToggleChange: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  errors: {
    name?: string;
    createdBy?: string;
    createdOn?: string;
    visits?: string;
    assignedTo?: string;
  };
  isEditing: boolean;
  isViewMode?: boolean;
  errorMessage: string;
}

const VisitBeatPlansForm: React.FC<VisitBeatPlansFormProps> = ({
  formData,
  onChange,
  onDateChange,
  onToggleChange,
  onSubmit,
  onCancel,
  errors,
  isEditing,
  isViewMode = false,
  errorMessage,
}) => {
  const validDate =
    formData.createdOn instanceof Date &&
    !isNaN(formData.createdOn.getTime())
      ? formData.createdOn
      : null;

  const createdByOptions = [
    "John Doe",
    "Jane Wilson", 
    "Mike Davis",
    "Sarah Johnson",
    "David Brown"
  ];

  const assignedToOptions = [
    "Alice Smith",
    "Bob Johnson",
    "Carol Brown",
    "Tom Wilson",
    "Lisa Davis"
  ];

  const getFormTitle = () => {
    if (isViewMode) return "View Visit Beat Plan";
    if (isEditing) return "Edit Visit Beat Plan";
    return "Add Visit Beat Plan";
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-4 rounded-md shadow-md border border-gray-200"
    >
      <h2 className="text-lg font-semibold mb-4">
        {getFormTitle()}
      </h2>

      {/* Two-column row: Name + Created By */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
          label="Name"
          required={!isViewMode}
          name="name"
          value={formData.name}
          onChange={onChange}
          error={errors.name}
          disabled={isViewMode}
          readOnly={isViewMode}
        />

        <Select
          label="Created By"
          required={!isViewMode}
          name="createdBy"
          value={formData.createdBy}
          onChange={onChange}
          options={createdByOptions}
          placeholder="Select Created By"
          error={errors.createdBy}
          disabled={isViewMode}
        />
      </div>

      {/* Two-column row: Created On + Visits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Created On {!isViewMode && <span className="text-red-500">*</span>}
          </label>
          <DatePickerReact
            value={validDate}
            onChange={(e: { target: { name: string; value: Date | null } }) =>
              onDateChange(e.target.value)
            }
            minDate={new Date("1900-01-01")}
            maxDate={new Date()}
            name="createdOn"
            error={errors.createdOn}
            disabled={isViewMode}
            readOnly={isViewMode}
          />
        </div>

        <TextInput
          label="Visits"
          name="visits"
          type="number"
          value={formData.visits.toString()}
          onChange={onChange}
          error={errors.visits}
          min="0"
          disabled={isViewMode}
          readOnly={isViewMode}
        />
      </div>

      {/* Two-column row: Assigned To + Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Select
          label="Assigned To"
          required={!isViewMode}
          name="assignedTo"
          value={formData.assignedTo}
          onChange={onChange}
          options={assignedToOptions}
          placeholder="Select Assigned To"
          error={errors.assignedTo}
          disabled={isViewMode}
        />

        <div className="gap-3">
          <label
            htmlFor="status"
            className="block text-sm text-gray-700 mb-1.5"
          >
            Status {!isViewMode && <span className="text-red-500">*</span>}
          </label>
          <ToggleSwitch
            checked={formData.status}
            onChange={onToggleChange}
            id="status"
            disabled={isViewMode}
          />
        </div>
      </div>

      {errorMessage && (
        <div className="text-sm text-red-600 mt-2">{errorMessage}</div>
      )}

      <div className="flex justify-end space-x-2 mt-6">
        {!isViewMode && (
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            {isEditing ? "Update" : "Submit"}
          </button>
        )}
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
        >
          {isViewMode ? "Close" : "Cancel"}
        </button>
      </div>
    </form>
  );
};

export default VisitBeatPlansForm;