// src/forms/UserMaterialTypeMappingForm.tsx
import React from "react";
import TextInput from "../components/TextInput";
import Select from "../components/Select";

interface UserMaterialTypeMappingFormProps {
  formData: {
    userName: string;
    designation: string;
    department: string;
    materialType: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  errors: {
    userName?: string;
    designation?: string;
    department?: string;
    materialType?: string;
  };
  isEditing: boolean;
}

const UserMaterialTypeMappingForm: React.FC<UserMaterialTypeMappingFormProps> = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  errors,
  isEditing,
}) => {
  const userOptions = ["Alice", "Bob", "Charlie"];
  const materialTypeOptions = ["Steel", "Plastic", "Rubber"];

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-4 rounded-md shadow-md border border-gray-200"
    >
      <h2 className="text-lg font-semibold mb-4">
        {isEditing ? "Edit User Material Mapping" : "Add User Material Mapping"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
        label="User Name"
        name="userName"
        value={formData.userName}
        onChange={onChange}
        options={userOptions}
        required
        error={errors.userName}
        placeholder="Select User"
      />

      <TextInput
        label="Designation"
        name="designation"
        value={formData.designation}
        onChange={onChange}
        required
        error={errors.designation}
        minimum_length={2}
        maximum_length={50}
        placeholder="Enter Designation"
      />

      <TextInput
        label="Department"
        name="department"
        value={formData.department}
        onChange={onChange}
        required
        error={errors.department}
        minimum_length={2}
        maximum_length={50}
        placeholder="Enter Department"
      />

      <Select
        label="Material Type"
        name="materialType"
        value={formData.materialType}
        onChange={onChange}
        options={materialTypeOptions}
        required
        error={errors.materialType}
        placeholder="Select Material Type"
      />
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          {isEditing ? "Update" : "Submit"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserMaterialTypeMappingForm;
