import React from "react";
import  TextInput  from "../components/TextInput";
import ToggleSwitch from "../components/ToggleSwitch";

interface MaterialThresholdFormProps {
  formData: {
    materialCode: string;
    materialName: string;
    thresholdType: string;
    thresholdValue: string;
    status: boolean;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onToggleChange: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  errors: {
    materialCode?: string;
    materialName?: string;
    thresholdType?: string;
    thresholdValue?: string;
  };
  isEditing: boolean;
  errorMessage: string;
}

const MaterialThresholdForm: React.FC<MaterialThresholdFormProps> = ({
  formData,
  onChange,
  onToggleChange,
  onSubmit,
  onCancel,
  errors,
  isEditing,
  errorMessage,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-4 rounded-md shadow-md border border-gray-200"
    >
      <h2 className="text-lg font-semibold mb-4">
        {isEditing ? "Edit Material Threshold" : "Add Material Threshold"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
        label="Material Code"
        required
        name="materialCode"
        value={formData.materialCode}
        onChange={onChange}
        error={errors.materialCode}
      />

      <TextInput
        label="Material Name"
        required
        name="materialName"
        value={formData.materialName}
        onChange={onChange}
        error={errors.materialName}
      />

      <TextInput
        label="Threshold Type"
        required
        name="thresholdType"
        value={formData.thresholdType}
        onChange={onChange}
        error={errors.thresholdType}
      />

      <TextInput
        label="Threshold Value"
        required
        name="thresholdValue"
        value={formData.thresholdValue}
        onChange={onChange}
        error={errors.thresholdValue}
      />

      <div className="mt-4 flex items-center space-x-3">
        <label htmlFor="status" className="block text-sm text-gray-700">
          Status <span className="text-red-500">*</span>
        </label>
        <ToggleSwitch
          checked={formData.status}
          onChange={onToggleChange}
          id="status"
        />
      </div>
      </div>

      {errorMessage && (
        <div className="text-sm text-red-600 mt-2">{errorMessage}</div>
      )}

      <div className="flex justify-end space-x-2 mt-6">
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

export default MaterialThresholdForm;
