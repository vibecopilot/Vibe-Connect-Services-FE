import React from "react";
import  TextInput  from "../components/TextInput";
import Select from "../components/Select";

interface ColourMasterFormProps {
  formData: {
    material: string;
    name: string;
    code: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  errors: {
    material?: string;
    name?: string;
    code?: string;
  };
  isEditing: boolean;
}

const ColourMasterForm: React.FC<ColourMasterFormProps> = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  errors,
  isEditing,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-4 rounded-md shadow-md border border-gray-200"
    >
      <h2 className="text-lg font-semibold mb-4">
        {isEditing ? "Edit Colour" : "Add Colour"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
        label="Material"
        name="material"
        value={formData.material}
        onChange={onChange}
        options={["Steel", "Plastic", "Aluminium", "Wood"]}
        required
        error={errors.material}
      />

      <TextInput
        label="Colour Name"
        name="name"
        value={formData.name}
        onChange={onChange}
        required
        error={errors.name}
        placeholder="Enter color name"
      />

      <TextInput
        label="Colour Code"
        name="code"
        value={formData.code}
        onChange={onChange}
        required
        error={errors.code}
        placeholder="Enter color code"
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

export default ColourMasterForm;
