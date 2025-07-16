import React from "react";
import  TextInput  from "../components/TextInput";
import Select from "../components/Select";

interface GenericInfosFormProps {
  formData: {
    material: string;
    genericInfo: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  errors: {
    material?: string;
    genericInfo?: string;
  };
  isEditing: boolean;
}

const GenericInfosForm: React.FC<GenericInfosFormProps> = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  errors,
  isEditing,
}) => {
  const materialOptions = ["Iron", "Copper", "Steel", "Aluminum"];

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-4 rounded-md shadow-md border border-gray-200"
    >
      <h2 className="text-lg font-semibold mb-4">
        {isEditing ? "Edit Generic Info" : "Add Generic Info"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
        label="Material"
        name="material"
        value={formData.material}
        onChange={onChange}
        options={materialOptions}
        required
        error={errors.material}
        placeholder="Select Material"
      />

      <TextInput
        label="Generic Info"
        name="genericInfo"
        value={formData.genericInfo}
        onChange={onChange}
        required
        error={errors.genericInfo}
        minimum_length={5}
        maximum_length={200}
        placeholder="Enter Generic Info"
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

export default GenericInfosForm;
