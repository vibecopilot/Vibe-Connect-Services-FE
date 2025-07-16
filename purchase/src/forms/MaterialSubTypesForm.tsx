import React from "react";
import  TextInput  from "../components/TextInput";
import Select from "../components/Select";
import TextArea from "../components/TextArea";

interface MaterialSubTypesFormProps {
  formData: {
    name: string;
    code: string;
    parentType: string;
    description: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  errors: {
    name?: string;
    code?: string;
    parentType?: string;
    description?: string;
  };
  isEditing: boolean;
}

const MaterialSubTypesForm: React.FC<MaterialSubTypesFormProps> = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  errors,
  isEditing,
}) => {
  const materialTypes = ["Steel", "Plastic", "Wood"];

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-4 rounded-md shadow-md border border-gray-200"
    >
      <h2 className="text-lg font-semibold mb-4">
        {isEditing ? "Edit Material Sub-Type" : "Add Material Sub-Type"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
        label="Sub-Type Name"
        name="name"
        value={formData.name}
        onChange={onChange}
        required
        error={errors.name}
        minimum_length={2}
        maximum_length={100}
        placeholder="Enter Sub-Type Name"
      />

      <TextInput
        label="Sub-Type Code"
        name="code"
        value={formData.code}
        onChange={onChange}
        error={errors.code}
        maximum_length={20}
        placeholder="Enter Sub-Type Code (optional)"
      />

      <Select
        label="Parental Material Type"
        name="parentType"
        value={formData.parentType}
        onChange={onChange}
        options={materialTypes}
        required
        error={errors.parentType}
        placeholder="Select Material Type"
      />

      <TextArea
        label="Description"
        name="description"
        value={formData.description}
        onChange={onChange}
        error={errors.description}
        maximum_length={300}
        placeholder="Enter Description (optional)"
        rows={4}
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

export default MaterialSubTypesForm;
