import React from "react";
import  TextInput  from "../components/TextInput";
import Select from "../components/Select";
import TextArea from "../components/TextArea";

interface MaterialTypesFormProps {
  formData: {
    name: string;
    code: string;
    description: string;
    category: string;
    department: string;
    budgetType: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  errors: {
    name?: string;
    code?: string;
    description?: string;
    category?: string;
    department?: string;
    budgetType?: string;
  };
  isEditing: boolean;
}

const MaterialTypesForm: React.FC<MaterialTypesFormProps> = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  errors,
  isEditing,
}) => {
  const categories = ["Raw Material", "Finished Good"];
  const departments = ["Procurement", "Logistics"];
  const budgetTypes = ["CapEx", "OpEx"];

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-4 rounded-md shadow-md border border-gray-200"
    >
      <h2 className="text-lg font-semibold mb-4">
        {isEditing ? "Edit Material Type" : "Add Material Type"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
        label="Material Type Name"
        name="name"
        value={formData.name}
        onChange={onChange}
        required
        error={errors.name}
        minimum_length={2}
        maximum_length={100}
        placeholder="Enter Material Type Name"
      />

      <TextInput
        label="Material Type Code"
        name="code"
        value={formData.code}
        onChange={onChange}
        error={errors.code}
        maximum_length={20}
        placeholder="Enter Code (optional)"
      />

      <TextArea
        label="Description"
        name="description"
        value={formData.description}
        onChange={onChange}
        error={errors.description}
        maximum_length={300}
        placeholder="Enter Description (optional)"
        rows={3}
      />

      <Select
        label="Category"
        name="category"
        value={formData.category}
        onChange={onChange}
        options={categories}
        required
        error={errors.category}
        placeholder="Select Category"
      />

      <Select
        label="Department"
        name="department"
        value={formData.department}
        onChange={onChange}
        options={departments}
        required
        error={errors.department}
        placeholder="Select Department"
      />

      <Select
        label="Budget Type"
        name="budgetType"
        value={formData.budgetType}
        onChange={onChange}
        options={budgetTypes}
        required
        error={errors.budgetType}
        placeholder="Select Budget Type"
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

export default MaterialTypesForm;
