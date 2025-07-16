import React from "react";
import TextInput from "../components/TextInput";
import Select from "../components/Select";
import TextArea from "../components/TextArea";

interface MaterialsFormProps {
  formData: {
    materialCategory: string;
    materialType: string;
    materialName: string;
    materialCode: string;
    leadTime: number;
    urgentLeadTime: number;
    veryUrgentLeadTime: number;
    materialImage: File | null;
    manufactureTolerance: string;
    breakageTolerance: string;
    wastageTolerance: string;
    hsnCode: string;
    mtcRequired: string;
    perishable: string;
    perishablePeriod: string;
    warrantyPeriod: string;
    warrantyRemarks: string;
    remarks: string;
    qcApplicable: string;
    wbsType: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  errors: {
    materialCategory?: string;
    materialType?: string;
    materialName?: string;
    materialCode?: string;
    leadTime?: string;
    urgentLeadTime?: string;
  };
  isEditing: boolean;
}

const MaterialsForm: React.FC<MaterialsFormProps> = ({
  formData,
  onChange,
  onFileChange,
  onSubmit,
  onCancel,
  errors,
  isEditing,
}) => {
  const materialCategoryOptions = [
    "Raw Material",
    "Finished Goods",
    "Consumables",
    "Packaging Material",
  ];

  const materialTypeOptions = ["Steel", "Plastic", "Rubber", "Glass"];

  const hsnCodeOptions = [
    "72", "73", "74", "76", "78", "79", "80", "81", "82", "83"
  ];

  const yesNoOptions = ["Yes", "No"];

  const perishablePeriodOptions = [
    "24 hours", "48 hours", "72 hours", "1 week", "2 weeks", "1 month", "3 months", "6 months"
  ];

  const warrantyPeriodOptions = [
    "No Warranty", "1 month", "3 months", "6 months", "1 year", "2 years", "3 years", "5 years"
  ];

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-4 rounded-md shadow-md border border-gray-200"
    >
      <h2 className="text-lg font-semibold mb-4 text-center">
        {isEditing ? "Edit Material" : "Add Material"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Select
          label="Material Category"
          name="materialCategory"
          value={formData.materialCategory}
          onChange={onChange}
          options={materialCategoryOptions}
          required
          error={errors.materialCategory}
          placeholder="Select Material Category"
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

        <TextInput
          label="Material Name"
          name="materialName"
          value={formData.materialName}
          onChange={onChange}
          required
          error={errors.materialName}
          minimum_length={2}
          maximum_length={100}
          placeholder="Enter Material Name"
        />

        <TextInput
          label="Material Code"
          name="materialCode"
          value={formData.materialCode}
          onChange={onChange}
          required
          error={errors.materialCode}
          minimum_length={2}
          maximum_length={20}
          placeholder="Enter Material Code"
        />

        <TextInput
          label="Lead Time"
          name="leadTime"
          type="number"
          value={formData.leadTime?.toString() || ""}
          onChange={onChange}
          required
          error={errors.leadTime}
          placeholder="Enter Lead Time"
        />

        <TextInput
          label="Urgent Lead Time"
          name="urgentLeadTime"
          type="number"
          value={formData.urgentLeadTime?.toString() || ""}
          onChange={onChange}
          required
          error={errors.urgentLeadTime}
          placeholder="Enter Urgent Lead Time"
        />

        <TextInput
          label="Very Urgent Lead Time"
          name="veryUrgentLeadTime"
          type="number"
          value={formData.veryUrgentLeadTime?.toString() || ""}
          onChange={onChange}
          placeholder="Enter Very Urgent Lead Time"
        />

        <div className="mb-4">
          <label className="block text-sm mb-1">
            Image of the Material
          </label>
          <input
            type="file"
            name="materialImage"
            onChange={onFileChange}
            accept="image/*"
            className="w-full px-3 py-2 border rounded-md border-gray-300"
          />
        </div>

        <TextInput
          label="Manufacture Tolerance Allowed"
          name="manufactureTolerance"
          value={formData.manufactureTolerance}
          onChange={onChange}
          placeholder="Enter Manufacture Tolerance"
        />

        <TextInput
          label="Breakage Tolerance Allowed"
          name="breakageTolerance"
          value={formData.breakageTolerance}
          onChange={onChange}
          placeholder="Enter Breakage Tolerance"
        />

        <TextInput
          label="Wastage Tolerance Allowed"
          name="wastageTolerance"
          value={formData.wastageTolerance}
          onChange={onChange}
          placeholder="Enter Wastage Tolerance"
        />

        <Select
          label="HSN Code"
          name="hsnCode"
          value={formData.hsnCode}
          onChange={onChange}
          options={hsnCodeOptions}
          placeholder="Select HSN Code"
        />

        <Select
          label="MTC Required"
          name="mtcRequired"
          value={formData.mtcRequired}
          onChange={onChange}
          options={yesNoOptions}
          placeholder="Select MTC Required"
        />

        <Select
          label="Perishable"
          name="perishable"
          value={formData.perishable}
          onChange={onChange}
          options={yesNoOptions}
          placeholder="Select Perishable"
        />

        <Select
          label="Perishable Period"
          name="perishablePeriod"
          value={formData.perishablePeriod}
          onChange={onChange}
          options={perishablePeriodOptions}
          placeholder="Select Perishable Period"
        />

        <Select
          label="Typical Warranty Period"
          name="warrantyPeriod"
          value={formData.warrantyPeriod}
          onChange={onChange}
          options={warrantyPeriodOptions}
          placeholder="Select Warranty Period"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <TextArea
          label="Warranty Remarks"
          name="warrantyRemarks"
          value={formData.warrantyRemarks}
          onChange={onChange}
          rows={4}
          placeholder="Enter warranty remarks..."
        />

        <TextArea
          label="Remarks"
          name="remarks"
          value={formData.remarks}
          onChange={onChange}
          rows={4}
          placeholder="Enter remarks..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        <Select
          label="QC Applicable"
          name="qcApplicable"
          value={formData.qcApplicable}
          onChange={onChange}
          options={yesNoOptions}
          placeholder="Select QC Applicable"
        />

        <div className="mb-4 md:col-span-3">
          <label className="block text-sm mb-2">WBS Type</label>
          <div className="flex space-x-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="wbsType"
                value="WBS"
                checked={formData.wbsType === "WBS"}
                onChange={onChange}
                className="mr-2"
              />
              WBS
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="wbsType"
                value="Non-WBS"
                checked={formData.wbsType === "Non-WBS"}
                onChange={onChange}
                className="mr-2"
              />
              Non-WBS
            </label>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-md font-medium mb-4">Terms & Conditions</h3>
        <div className="bg-gray-100 p-4 rounded-md">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="font-medium text-sm">Condition Category</div>
            <div className="font-medium text-sm">Condition</div>
            <div className="font-medium text-sm">Condition Remarks</div>
            <div className="font-medium text-sm">Action</div>
          </div>
        </div>
      </div>

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

export default MaterialsForm;