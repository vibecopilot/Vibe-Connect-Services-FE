import React from "react";
import TextInput from "../components/TextInput"; // Corrected relative path
import Select from "../components/Select"; // Corrected relative path

// Define the interface for the form data, matching the UserItem structure
interface UsersFormData {
  employeeCode: string;
  name: string;
  email: string;
  mobile: string;
  department: string;
  territory: string;
  active: boolean;
}

// Define the props for the UsersForm component
interface UsersFormProps {
  formData: UsersFormData;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
      | { target: { name: string; value: string | boolean } }
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  errors: Partial<UsersFormData>; // Errors object, keys match formData keys
  isEditing: boolean;
  isViewMode?: boolean;
}

const UsersForm: React.FC<UsersFormProps> = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  errors,
  isEditing,
  isViewMode = false,
}) => {
  // Options for Department dropdown
  const departments = [
    "Unknown",
    "Engineering",
    "Human Resources",
    "Sales",
    "Marketing",
    "Finance",
    "Operations",
  ];
  // Options for Territory dropdown
  const territories = [
    "Unknown",
    "North",
    "South",
    "East",
    "West",
    "Central",
  ];

  // Function to determine the form title based on mode
  const getFormTitle = () => {
    if (isViewMode) return "View User Details";
    return isEditing ? "Edit User" : "Add New User";
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-6 rounded-md shadow-md border border-gray-200 mt-4"
    >
      <h2 className="text-lg font-semibold mb-6 text-gray-900">
        {getFormTitle()}
      </h2>

      <div className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Employee Code Input */}
          <TextInput
            label="Employee Code"
            name="employeeCode"
            value={formData.employeeCode}
            onChange={onChange}
            required
            error={errors.employeeCode}
            placeholder="Enter employee code"
            disabled={isViewMode}
          />

          {/* Name Input */}
          <TextInput
            label="Name"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
            error={errors.name}
            placeholder="Enter user name"
            disabled={isViewMode}
          />

          {/* Email Input */}
          <TextInput
            label="Email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
            error={errors.email}
            type="email"
            placeholder="Enter email address"
            disabled={isViewMode}
          />

          {/* Mobile Input */}
          <TextInput
            label="Mobile"
            name="mobile"
            value={formData.mobile}
            onChange={onChange}
            required
            error={errors.mobile}
            type="tel"
            placeholder="Enter mobile number"
            disabled={isViewMode}
          />

          {/* Department Select */}
          <Select
            label="Department"
            name="department"
            value={formData.department}
            onChange={onChange}
            options={departments}
            required
            error={errors.department}
            placeholder="Select Department"
            disabled={isViewMode}
          />

          {/* Territory Select */}
          <Select
            label="Territory"
            name="territory"
            value={formData.territory}
            onChange={onChange}
            options={territories}
            required
            error={errors.territory}
            placeholder="Select Territory"
            disabled={isViewMode}
          />

          {/* Active Checkbox */}
          <div className="flex items-center mt-2">
            <label className="block text-sm font-medium text-gray-700">
              Active:
            </label>
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={(e) => onChange({ target: { name: "active", value: e.target.checked } })}
              className="ml-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              disabled={isViewMode}
            />
          </div>
        </div>
      </div>

      {/* Form Action Buttons */}
      <div className="flex justify-end space-x-3 mt-8 pt-4 border-t border-gray-200">
        {!isViewMode && (
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors font-medium"
          >
            {isEditing ? "Update User" : "Add User"}
          </button>
        )}
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-md transition-colors font-medium"
        >
          {isViewMode ? "Close" : "Cancel"}
        </button>
      </div>
    </form>
  );
};

export default UsersForm;
