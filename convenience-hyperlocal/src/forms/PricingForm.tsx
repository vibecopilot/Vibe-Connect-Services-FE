import React from "react";
import TextInput from "../components/TextInput";

interface PricingFormProps {
  formData: {
    serviceCategory: string;
    subCategory: string;
    unitType: string;
    basePrice: string;
    addOnCharges?: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  errors: {
    serviceCategory?: string;
    subCategory?: string;
    unitType?: string;
    basePrice?: string;
  };
  isViewMode: boolean;
}

const PricingForm: React.FC<PricingFormProps> = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  errors,
  isViewMode,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-4 rounded-md shadow-md border border-gray-200"
    >
      <h2 className="text-lg font-semibold mb-4 text-center">
        Pricing Details
      </h2>
      <hr className="text-gray-500 mb-2" />

      <div className="grid grid-cols-3 gap-4">
        <TextInput
          label="Pricing Type"
          name="serviceCategory"
          value={formData.serviceCategory}
          onChange={onChange}
          required
          error={errors.serviceCategory}
          minimum_length={2}
          maximum_length={100}
          placeholder="Enter Pricing Type"
          disabled={isViewMode}
        />

        <TextInput
          label="Base Price"
          name="basePrice"
          value={formData.basePrice}
          onChange={onChange}
          required
          error={errors.basePrice}
          minimum_length={1}
          maximum_length={20}
          placeholder="Enter Base Price"
          disabled={isViewMode}
        />

        <TextInput
          label="Discount"
          name="subCategory"
          value={formData.subCategory}
          onChange={onChange}
          error={errors.subCategory}
          minimum_length={0}
          maximum_length={20}
          placeholder="Enter Discount (Optional)"
          disabled={isViewMode}
        />

        <TextInput
          label="Final Amount"
          name="unitType"
          value={formData.unitType}
          onChange={onChange}
          required
          error={errors.unitType}
          minimum_length={1}
          maximum_length={20}
          placeholder="Enter Final Amount"
          disabled={isViewMode}
        />

        <TextInput
          label="Add On Charges"
          name="addOnCharges"
          value={formData.addOnCharges || ""}
          onChange={onChange}
          minimum_length={0}
          maximum_length={20}
          placeholder="Enter Add On Charges"
          disabled={isViewMode}
        />
      </div>

      <div className="flex justify-center space-x-2 mt-10">
        {!isViewMode && (
          <button
            type="submit"
            className="bg-[#7991BB] hover:bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        )}
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

export default PricingForm;