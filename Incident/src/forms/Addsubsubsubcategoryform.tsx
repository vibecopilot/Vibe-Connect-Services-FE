import React, { useState } from "react";
import Select from "../components/Select";
import TextInput from "../components/TextInput";

interface AddSubSubSubCategoryFormProps {
  onSubmit: (
    categoryType: string,
    subCategory: string,
    subSubCategory: string,
    subSubSubCategory: string
  ) => void;
  onCancel: () => void;
}

const categoryOptions = ["Electrical Issues", "Fire"];

const subCategoryOptions: Record<string, string[]> = {
  "Electrical Issues": ["Power Outage", "Short Circuit"],
  Fire: ["Negligent storage of flammables", "Kitchen fire"],
};

const subSubCategoryOptions: Record<string, string[]> = {
  "Power Outage": ["Main switch failure", "Transformer issue"],
  "Short Circuit": ["Wire damage", "Overload"],
  "Negligent storage of flammables": ["Leaky Containers", "Improper sealing"],
  "Kitchen fire": ["Stove unattended", "Oil overheating"],
};

const AddSubSubSubCategoryForm: React.FC<AddSubSubSubCategoryFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [categoryType, setCategoryType] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subSubCategory, setSubSubCategory] = useState("");
  const [subSubSubCategory, setSubSubSubCategory] = useState("");

  const handleSubmit = () => {
    if (
      categoryType &&
      subCategory &&
      subSubCategory &&
      subSubSubCategory.trim()
    ) {
      onSubmit(
        categoryType,
        subCategory,
        subSubCategory,
        subSubSubCategory.trim()
      );
      resetForm();
    }
  };

  const resetForm = () => {
    setCategoryType("");
    setSubCategory("");
    setSubSubCategory("");
    setSubSubSubCategory("");
  };

  return (
    <div className="flex flex-wrap items-center gap-2 w-full mt-2" style={{ fontFamily: "'PT Sans', sans-serif" }}>
      <div className="w-70">
        <Select
          name="categoryType"
          value={categoryType}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setCategoryType(e.target.value);
            setSubCategory("");
            setSubSubCategory("");
          }}
          options={categoryOptions}
        />
      </div>

      <div className="w-70">
        <Select
          name="subCategory"
          value={subCategory}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setSubCategory(e.target.value);
            setSubSubCategory("");
          }}
          options={categoryType ? subCategoryOptions[categoryType] || [] : []}
        />
      </div>

      <div className="w-70">
        <Select
          name="subSubCategory"
          value={subSubCategory}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSubSubCategory(e.target.value)
          }
          options={subCategory ? subSubCategoryOptions[subCategory] || [] : []}
        />
      </div>

      <div className="w-70" style={{ fontFamily: "'PT Sans', sans-serif" }}>
        <TextInput
          // label="Sub Sub Sub Category"
          name="subSubSubCategory"
          value={subSubSubCategory}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSubSubSubCategory(e.target.value)
          }
          placeholder="Enter Sub Sub Sub Category"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white h-10 mb-4 px-6  rounded hover:bg-green-600 text-sm" style={{ fontFamily: "'PT Sans', sans-serif" }}
      >
        Submit
      </button>
      <button
        onClick={onCancel}
        className="bg-red-400 text-white h-10 mb-4 px-6  rounded hover:bg-red-500 text-sm" style={{ fontFamily: "'PT Sans', sans-serif" }}
      >
        Cancel
      </button>
    </div>
  );
};

export default AddSubSubSubCategoryForm;
