import React from "react";
import  TextInput  from "../components/TextInput";
import Select from "../components/Select";
import TextArea from "../components/TextArea";
import FileUpload from "../components/FileUpload";

interface MaterialBrandsFormProps {
  formData: {
    brandName: string;
    material: string;
    brandLogo: File | null;
    description: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onFileChange: (files: FileList | null) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  errors: {
    brandName?: string;
    material?: string;
    brandLogo?: string;
    description?: string;
  };
  isEditing: boolean;
}

const MaterialBrandsForm: React.FC<MaterialBrandsFormProps> = ({
  formData,
  onChange,
  onFileChange,
  onSubmit,
  onCancel,
  errors,
  isEditing,
}) => {
  const materialOptions = ["Steel", "Plastic", "Wood"];

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-4 rounded-md shadow-md border border-gray-200"
    >
      <h2 className="text-lg font-semibold mb-4">
        {isEditing ? "Edit Brand" : "Add Brand"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          label="Brand Name"
          name="brandName"
          value={formData.brandName}
          onChange={onChange}
          required
          error={errors.brandName}
          minimum_length={2}
          maximum_length={100}
          placeholder="Enter Brand Name"
        />

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

        <div className="col-span-1">
          <FileUpload
            label="Upload Brand Logo"
            onChange={onFileChange}
            accept="image/*"
            fileSize="5MB"
          />
          {errors.brandLogo && (
            <div className="text-sm text-red-600 mt-1">{errors.brandLogo}</div>
          )}
        </div>

        <div className="col-span-1">
          <TextArea
            label="Brand Description"
            name="description"
            value={formData.description}
            onChange={onChange}
            error={errors.description}
            maximum_length={300}
            placeholder="Enter Brand Description (optional)"
            rows={3}
          />
        </div>
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

export default MaterialBrandsForm;