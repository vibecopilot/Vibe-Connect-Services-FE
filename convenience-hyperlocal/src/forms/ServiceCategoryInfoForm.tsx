import React from "react";
import TextInput from "../components/TextInput";
import Select from "../components/Select";

interface ServiceCategoryInfoFormProps {
  formData: {
    serviceCategory: string;
    subCategory: string;
    serviceTypeName: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  errors: {
    serviceCategory?: string;
    subCategory?: string;
    serviceTypeName?: string;
  };
  isViewMode: boolean;
}

const ServiceCategoryInfoForm: React.FC<ServiceCategoryInfoFormProps> = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  errors,
  isViewMode,
}) => {
  const serviceCategories = ["IT Services", "Consulting", "Support", "Maintenance"];
  const subCategories = ["Software Development", "Hardware Support", "Training", "Documentation"];

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-4 rounded-md shadow-md border border-gray-200"
    >
      <h2 className="text-lg font-semibold mb-4 text-center">
        {isViewMode ? "View Service Category Info" : "Add Service Category Info"}
      </h2>
      <hr className="text-gray-500 mb-2" />

      <div className="grid grid-cols-3 gap-4">
        <Select
          label="Service Category"
          name="serviceCategory"
          value={formData.serviceCategory}
          onChange={onChange}
          options={serviceCategories}
          required
          error={errors.serviceCategory}
          placeholder="Select Service Category"
          disabled={isViewMode}
        />

        <Select
          label="Sub Category"
          name="subCategory"
          value={formData.subCategory}
          onChange={onChange}
          options={subCategories}
          required
          error={errors.subCategory}
          placeholder="Select Sub Category"
          disabled={isViewMode}
        />

        <TextInput
          label="Service Type Name"
          name="serviceTypeName"
          value={formData.serviceTypeName}
          onChange={onChange}
          required
          error={errors.serviceTypeName}
          minimum_length={2}
          maximum_length={100}
          placeholder="Enter Service Type Name"
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

export default ServiceCategoryInfoForm;