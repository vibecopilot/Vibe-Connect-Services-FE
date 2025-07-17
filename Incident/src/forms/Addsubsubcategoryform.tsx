import React, { useState } from "react";
import Select from "../components/Select";
import TextInput from "../components/TextInput";

interface AddSubSubCategoryFormProps {
  onSubmit: (categoryType: string, subCategory: string, subSubCategory: string) => void;
  onCancel: () => void;
}

// Sample dropdown options
const categoryOptions = ["Electrical Issues", "Fire", "Mechanical", "Plumbing"];
const subCategoryOptions = [
  "Power Outage",
  "Negligent storage of flammables",
  "Leakage",
  "Short Circuit",
  "Pipe Burst",
];

const AddSubSubCategoryForm: React.FC<AddSubSubCategoryFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [categoryType, setCategoryType] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subSubCategory, setSubSubCategory] = useState("");

  const handleSubmit = () => {
    if (categoryType && subCategory && subSubCategory.trim()) {
      onSubmit(categoryType, subCategory, subSubCategory.trim());
      setCategoryType("");
      setSubCategory("");
      setSubSubCategory("");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 w-full mt-2" style={{ fontFamily: "'PT Sans', sans-serif" }}>
      <div className="w-90">
        <Select
          name="categoryType"
          value={categoryType}
          onChange={(e) => setCategoryType(e.target.value)}
          options={categoryOptions}
          placeholder="Select Category"
        />
      </div>

      <div className="w-90">
        <Select
          name="subCategory"
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          options={subCategoryOptions}
          placeholder="Select Sub Category"
        />
      </div>

      <div className="w-90">
        <TextInput
          name="subSubCategory"
          value={subSubCategory}
          onChange={(e) => setSubSubCategory(e.target.value)}
          label=""
          placeholder="Enter Sub Sub Category"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white h-10 mb-4 px-6 rounded hover:bg-green-600 text-sm"
      >
        Submit
      </button>
      <button
        onClick={onCancel}
        className="bg-red-400 text-white h-10 mb-4 px-6 rounded hover:bg-red-500 text-sm"
      >
        Cancel
      </button>
    </div>
  );
};

export default AddSubSubCategoryForm;
