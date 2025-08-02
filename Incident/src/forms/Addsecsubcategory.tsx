import React, { useState } from "react";
import TextInput from "../components/TextInput";
import Select from "../components/Select";

interface AddSecondarySubCategoryProps {
  onSubmit: (category: { type: string; subCategory: string }) => void;
  onCancel: () => void;
}

// Simple string array for options
const secondaryCategoryOptions: string[] = [
  "Health & Safety",
  "Utility Failure",
  "Fire",
  "Electrical",
  // Add more if needed
];

const AddSecondarySubCategory: React.FC<AddSecondarySubCategoryProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [selectedType, setSelectedType] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const handleSubmit = () => {
    if (selectedType && subCategory) {
      onSubmit({ type: selectedType, subCategory });
      setSelectedType("");
      setSubCategory("");
    }
  };

  const handleCancel = () => {
    setSelectedType("");
    setSubCategory("");
    onCancel();
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-2 my-4" style={{ fontFamily: "'PT Sans', sans-serif" }}>
      <div className="w-[600px]">
        <Select
          // label="Select Secondary Category"
          name="secondaryCategoryType"
          options={secondaryCategoryOptions}
          value={selectedType}
          onChange={(e: any) => setSelectedType(e.target.value)}
        />
      </div>
      <div className="w-[600px] ">
        <TextInput
          // label="Enter Secondary Sub Category"
          name="secondarySubCategory"
          placeholder="Enter Secondary Sub Category"
          value={subCategory}
          onChange={(e: any) => setSubCategory(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white h-10 mb-4 px-6 rounded hover:bg-green-600"
        >
          Submit
        </button>
        <button
          onClick={handleCancel}
          className="bg-red-400 text-white h-10 mb-4 px-6 rounded hover:bg-red-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddSecondarySubCategory;
