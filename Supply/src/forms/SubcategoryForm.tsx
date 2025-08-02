// src/forms/CategoryForm.tsx

import React from "react";

const SubcategoryForm: React.FC = () => {
  return (
    <form>
      <div className="mb-4" style={{ fontFamily: "'PT Sans', sans-serif" }}>
        <label className="block text-white mb-1">Sub Category Name</label>
        <input
          type="text"
          className="w-full px-3 py-2 rounded bg-white text-black"
          placeholder="Enter sub category name"
        />
      </div>
    </form>
  );
};

export default SubcategoryForm;
