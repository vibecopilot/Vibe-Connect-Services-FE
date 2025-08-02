import React from "react";
import  TextInput  from "../components/TextInput";
import DatePickerReact from "../components/ReactDatePicker";
import ToggleSwitch from "../components/ToggleSwitch";

interface MajorMaterialsFormProps {
  formData: {
    materialCategory: string;
    materialCode: string;
    lastPurchaseDate: Date | null;
    materialStatus: boolean;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onDateChange: (date: Date | null) => void;
  onToggleChange: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  errors: {
    materialCategory?: string;
    materialCode?: string;
    lastPurchaseDate?: string;
  };
  isEditing: boolean;
  errorMessage: string;
}

const MajorMaterialsForm: React.FC<MajorMaterialsFormProps> = ({
  formData,
  onChange,
  onDateChange,
  onToggleChange,
  onSubmit,
  onCancel,
  errors,
  isEditing,
  errorMessage,
}) => {
  const validDate =
    formData.lastPurchaseDate instanceof Date &&
    !isNaN(formData.lastPurchaseDate.getTime())
      ? formData.lastPurchaseDate
      : null;

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-4 rounded-md shadow-md border border-gray-200"
    >
      <h2 className="text-lg font-semibold mb-4">
        {isEditing ? "Edit Major Material" : "Add Major Material"}
      </h2>

      {/* Two-column row: Material Category + Material Code */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
          label="Material Category"
          required
          name="materialCategory"
          value={formData.materialCategory}
          onChange={onChange}
          error={errors.materialCategory}
        />

        <TextInput
          label="Material Code"
          required
          name="materialCode"
          value={formData.materialCode}
          onChange={onChange}
          error={errors.materialCode}
        />
      </div>

      {/* Two-column row: Last Purchase Date + Material Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Last Purchase Date <span className="text-red-500">*</span>
          </label>
          <DatePickerReact
            value={validDate}
            onChange={(e: { target: { name: string; value: Date | null } }) =>
              onDateChange(e.target.value)
            }
            minDate={new Date("1900-01-01")}
            maxDate={new Date()}
            name="lastPurchaseDate"
            error={errors.lastPurchaseDate}
          />
        </div>

        <div className="gap-3">
          <label
            htmlFor="materialStatus"
            className="block text-sm text-gray-700 mb-1.5"
          >
            Material Status <span className="text-red-500">*</span>
          </label>
          <ToggleSwitch
            checked={formData.materialStatus}
            onChange={onToggleChange}
            id="materialStatus"
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

export default MajorMaterialsForm;
