import React from "react";
import TextInput from "../../components/TextInput";
import Select from "../../components/Select";

interface MyTeamFormProps {
  formData: {
    employeeName: string;
    location: string;
    punchedIn: string;
    activities: number;
    work: number;
    clientName: string;
    beatPlan: string;
    startTime: string;
    endTime: string;
    purpose: string;
    outcome: string;
    missed: boolean;
    status: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { target: { name: string; value: any } }
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  errors: {
    employeeName?: string;
    location?: string;
    punchedIn?: string;
    activities?: string;
    work?: string;
    clientName?: string;
    beatPlan?: string;
    startTime?: string;
    endTime?: string;
    purpose?: string;
    outcome?: string;
    missed?: string;
    status?: string;
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
  const locations = ["Office", "Client Site", "Remote", "Field"];
  const clientNames = ["ABC Corp", "XYZ Ltd", "Tech Solutions", "Global Inc", "StartupCo"];
  const beatPlans = ["Daily Check", "Weekly Review", "Monthly Audit", "Project Visit", "Client Meeting"];
  const purposes = ["Meeting", "Training", "Support", "Review", "Consultation"];
  const outcomes = ["Completed", "Pending", "Follow-up Required", "Cancelled", "Rescheduled"];
  const statusOptions = ["Completed", "In Meeting", "In Office", "Missed", "Punched In", "On Field", "Upcoming", "In Transit"];

  const getFormTitle = () => {
    if (isViewMode) return "View Entry Details";
    return isEditing ? "Edit Entry" : "Add New Entry";
  };

  const handleNumberChange = (name: string, value: string) => {
    const numValue = value === "" ? 0 : parseInt(value) || 0;
    onChange({ target: { name, value: numValue } });
  };

  const handleBooleanChange = (name: string, value: string) => {
    onChange({ target: { name, value: value === "true" } });
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
        <TextInput
          label="Employee Name"
          name="employeeName"
          value={formData.employeeName}
          onChange={onChange}
          required
          error={errors.employeeName}
          minimum_length={2}
          maximum_length={100}
          placeholder="Enter employee name"
          disabled={isViewMode}
        />

        <Select
          label="Location"
          name="location"
          value={formData.location}
          onChange={onChange}
          options={locations}
          required
          error={errors.location}
          placeholder="Select Location"
          disabled={isViewMode}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Punched In
          </label>
          <input
            type="time"
            name="punchedIn"
            value={formData.punchedIn}
            onChange={onChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.punchedIn ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isViewMode}
          />
          {errors.punchedIn && (
            <p className="text-red-500 text-xs mt-1">{errors.punchedIn}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Activities Count
          </label>
          <input
            type="number"
            name="activities"
            value={formData.activities}
            onChange={(e) => handleNumberChange("activities", e.target.value)}
            min="0"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.activities ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter activity count"
            disabled={isViewMode}
          />
          {errors.activities && (
            <p className="text-red-500 text-xs mt-1">{errors.activities}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Work Hours
          </label>
          <input
            type="number"
            name="work"
            value={formData.work}
            onChange={(e) => handleNumberChange("work", e.target.value)}
            min="0"
            max="24"
            step="0.5"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.work ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter work hours"
            disabled={isViewMode}
          />
          {errors.work && (
            <p className="text-red-500 text-xs mt-1">{errors.work}</p>
          )}
        </div>

        <Select
          label="Client Name"
          name="clientName"
          value={formData.clientName}
          onChange={onChange}
          options={clientNames}
          required
          error={errors.clientName}
          placeholder="Select Client"
          disabled={isViewMode}
        />

        <Select
          label="Beat Plan"
          name="beatPlan"
          value={formData.beatPlan}
          onChange={onChange}
          options={beatPlans}
          required
          error={errors.beatPlan}
          placeholder="Select Beat Plan"
          disabled={isViewMode}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Time <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={onChange}
            required
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.startTime ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isViewMode}
          />
          {errors.startTime && (
            <p className="text-red-500 text-xs mt-1">{errors.startTime}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Time <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={onChange}
            required
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.endTime ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isViewMode}
          />
          {errors.endTime && (
            <p className="text-red-500 text-xs mt-1">{errors.endTime}</p>
          )}
        </div>

        <Select
          label="Purpose"
          name="purpose"
          value={formData.purpose}
          onChange={onChange}
          options={purposes}
          required
          error={errors.purpose}
          placeholder="Select Purpose"
          disabled={isViewMode}
        />

        <Select
          label="Outcome"
          name="outcome"
          value={formData.outcome}
          onChange={onChange}
          options={outcomes}
          error={errors.outcome}
          placeholder="Select Outcome"
          disabled={isViewMode}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Missed
          </label>
          <select
            name="missed"
            value={formData.missed.toString()}
            onChange={(e) => handleBooleanChange("missed", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.missed ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isViewMode}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
          {errors.missed && (
            <p className="text-red-500 text-xs mt-1">{errors.missed}</p>
          )}
        </div>

        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={onChange}
          options={statusOptions}
          error={errors.status}
          placeholder="Select Status"
          disabled={isViewMode}
        />
      </div>

      <div className="flex justify-end space-x-2 mt-6">
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