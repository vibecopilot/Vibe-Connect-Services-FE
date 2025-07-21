import React, { useState } from "react";
import TextInput from "../components/TextInput";
import Select from "../components/Select"; // Assuming this is a basic styled dropdown

interface AddSubCategoryFormProps {
  onSubmit: (categoryType: string, subCategory: string) => void;
  onCancel: () => void;
}

const categoryOptions = ["Electrical Issues", "Fire", "Mechanical", "Plumbing"];

const AddSubCategoryForm: React.FC<AddSubCategoryFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [categoryType, setCategoryType] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const handleSubmit = () => {
    const trimmedCat = categoryType.trim();
    const trimmedSub = subCategory.trim();
    if (trimmedCat && trimmedSub) {
      onSubmit(trimmedCat, trimmedSub);
      setCategoryType("");
      setSubCategory("");
    }
  };

  return (
    <div
      className="flex flex-wrap items-center gap-2 w-full mt-2 text-gray-600"
      style={{ fontFamily: "'PT Sans', sans-serif" }}
    >
      <div className="w-140">
        <Select
          name="categoryType"
          value={categoryType}
          onChange={(e) => setCategoryType(e.target.value)}
          options={categoryOptions}
        />
      </div>

      <div className="w-140">
        <TextInput
          name="subCategory"
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          label=""
          placeholder="Enter Sub Category"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="h-10 mb-4 px-6 text-base rounded bg-green-500 text-white hover:bg-green-600 font-sans"
        style={{ fontFamily: "'PT Sans', sans-serif" }}
      >
        Submit
      </button>
      <button
        onClick={onCancel}
        className="h-10 mb-4 px-6 text-base rounded bg-red-400 text-white hover:bg-red-500 font-sans"
        style={{ fontFamily: "'PT Sans', sans-serif" }}
      >
        Cancel
      </button>
    </div>
  );
};

export default AddSubCategoryForm;
