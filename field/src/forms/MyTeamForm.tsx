import React from "react";
import TextInput from "../components/TextInput";
import Select from "../components/Select";
import DatePickerReact from "../components/ReactDatePicker";

interface MyTeamFormProps {
  formData: {
    name: string;
    reportingHead: string;
    request: string;
    date: Date | null;
    originalRequested: string;
    reason: string;
    requestedOn: Date | null;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { target: { name: string; value: Date | null } }
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  errors: {
    name?: string;
    reportingHead?: string;
    request?: string;
    date?: string;
    originalRequested?: string;
    reason?: string;
    requestedOn?: string;
  };
  isEditing: boolean;
  isViewMode?: boolean;
}

const MyTeamForm: React.FC<MyTeamFormProps> = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  errors,
  isEditing,
  isViewMode = false,
}) => {
  const reportingHeads = ["John Smith", "Sarah Johnson", "Michael Brown", "Lisa Davis"];
  const requests = ["Absent", "Half Days", "Lates", "Left Early", "Exceptions"];
  const originalRequestedOptions = ["Original", "Requested"];
  const reasons = ["Sick Leave", "Personal", "Family Emergency", "Medical Appointment", "Other"];

  const getFormTitle = () => {
    if (isViewMode) return "View Request Details";
    return isEditing ? "Edit Request" : "Add New Request";
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
        <TextInput
          label="Name"
          name="name"
          value={formData.name}
          onChange={onChange}
          required
          error={errors.name}
          minimum_length={2}
          maximum_length={100}
          placeholder="Enter employee name"
          disabled={isViewMode}
        />

        <Select
          label="Reporting Head"
          name="reportingHead"
          value={formData.reportingHead}
          onChange={onChange}
          options={reportingHeads}
          required
          error={errors.reportingHead}
          placeholder="Select Reporting Head"
          disabled={isViewMode}
        />

        <Select
          label="Request Type"
          name="request"
          value={formData.request}
          onChange={onChange}
          options={requests}
          required
          error={errors.request}
          placeholder="Select Request Type"
          disabled={isViewMode}
        />

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
          label="Original | Requested"
          name="originalRequested"
          value={formData.originalRequested}
          onChange={onChange}
          options={originalRequestedOptions}
          error={errors.originalRequested}
          placeholder="Select Type"
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

        <DatePickerReact
          label="Requested On"
          name="requestedOn"
          value={formData.requestedOn}
          onChange={onChange}
          required
          error={errors.requestedOn}
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

export default MyTeamForm;