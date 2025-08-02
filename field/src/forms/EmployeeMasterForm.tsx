import React from "react";
import TextInput from "../components/TextInput";
import Select from "../components/Select";

interface EmployeeMasterFormProps {
  formData: {
    employeeName: string;
    phone: string;
    email: string;
    industry: string;
    territory: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { target: { name: string; value: string } }
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  errors: {
    employeeName?: string;
    phone?: string;
    email?: string;
    industry?: string;
    territory?: string;
  };
  isEditing: boolean;
  isViewMode?: boolean;
}

const EmployeeMasterForm: React.FC<EmployeeMasterFormProps> = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  errors,
  isEditing,
  isViewMode = false,
}) => {
  const industries = ["Unknown", "IT", "Healthcare", "Finance", "Manufacturing", "Retail", "Education"];
  const territories = ["Unknown", "North", "South", "East", "West", "Central"];

  const getFormTitle = () => {
    if (isViewMode) return "View Employee Details";
    return isEditing ? "Edit Employee" : "Add New Employee";
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
          <TextInput
            label="Employee Name"
            name="employeeName"
            value={formData.employeeName}
            onChange={onChange}
            required
            error={errors.employeeName}
            placeholder="Enter employee name"
            disabled={isViewMode}
          />

          <TextInput
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            required
            error={errors.phone}
            type="tel"
            placeholder="Enter phone number"
            disabled={isViewMode}
          />

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

          <Select
            label="Industry"
            name="industry"
            value={formData.industry}
            onChange={onChange}
            options={industries}
            required
            error={errors.industry}
            placeholder="Select Industry"
            disabled={isViewMode}
          />

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
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-8 pt-4 border-t border-gray-200">
        {!isViewMode && (
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors font-medium"
          >
            {isEditing ? "Update Employee" : "Add Employee"}
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

export default EmployeeMasterForm;