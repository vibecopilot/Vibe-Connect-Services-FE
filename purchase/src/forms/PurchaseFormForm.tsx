import React from "react";
import  TextInput  from "../components/TextInput";
import Select from "../components/Select";

interface PurchaseFormFormProps {
  formData: {
    requestId: string;
    requestedBy: string;
    materialCode: string;
    supplierName: string;
    estimatedCost: string;
    priority: string;
    status: boolean;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  errors: {
    requestId?: string;
    requestedBy?: string;
    materialCode?: string;
    supplierName?: string;
    estimatedCost?: string;
    priority?: string;
  };
  isEditing: boolean;
}

const PurchaseFormForm: React.FC<PurchaseFormFormProps> = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  errors,
  isEditing,
}) => {
  const priorities = ["High", "Medium", "Low"];

  const CustomToggle = ({
    checked,
    onChange,
    disabled = false,
  }: {
    checked: boolean;
    onChange: () => void;
    disabled?: boolean;
  }) => (
    <label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" checked={checked} disabled={disabled} onChange={onChange} className="sr-only peer" />
      <div
        className={`w-11 h-6 rounded-full relative transition duration-300 ${
          checked ? "bg-green-500" : "bg-gray-400"
        } ${disabled ? "opacity-70 cursor-not-allowed" : ""}`}
      >
        <div
          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </div>
    </label>
  );

  const handleStatusChange = () => {
    const syntheticEvent = {
      target: {
        name: 'status',
        value: !formData.status
      }
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(syntheticEvent);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-4 rounded-md shadow-md border border-gray-200"
    >
      <h2 className="text-lg font-semibold mb-4">
        {isEditing ? "Edit Purchase" : "Add Purchase"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          label="Request ID"
          name="requestId"
          value={formData.requestId}
          onChange={onChange}
          required
          error={errors.requestId}
          maximum_length={50}
          placeholder="Enter Request ID"
        />

        <TextInput
          label="Requested By"
          name="requestedBy"
          value={formData.requestedBy}
          onChange={onChange}
          required
          error={errors.requestedBy}
          maximum_length={100}
          placeholder="Enter Requested By"
        />

        <TextInput
          label="Material Code"
          name="materialCode"
          value={formData.materialCode}
          onChange={onChange}
          required
          error={errors.materialCode}
          maximum_length={50}
          placeholder="Enter Material Code"
        />

        <TextInput
          label="Supplier Name"
          name="supplierName"
          value={formData.supplierName}
          onChange={onChange}
          required
          error={errors.supplierName}
          maximum_length={100}
          placeholder="Enter Supplier Name"
        />

        <TextInput
          label="Estimated Cost"
          name="estimatedCost"
          value={formData.estimatedCost}
          onChange={onChange}
          required
          error={errors.estimatedCost}
          placeholder="Enter Estimated Cost"
        />

        <Select
          label="Priority"
          name="priority"
          value={formData.priority}
          onChange={onChange}
          options={priorities}
          required
          error={errors.priority}
          placeholder="Select Priority"
        />
      </div>

      <div className="flex items-center mt-4">
        <label className="mr-2 text-sm font-medium">Status</label>
        <CustomToggle
          checked={formData.status}
          onChange={handleStatusChange}
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

export default PurchaseFormForm;