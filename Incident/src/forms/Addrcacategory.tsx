import React, { useState } from "react";

type AddRCACategoryProps = {
  onSubmit: (category: string) => void;
  onCancel: () => void;
};

const AddRCACategory: React.FC<AddRCACategoryProps> = ({ onSubmit, onCancel }) => {
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category.trim()) {
      onSubmit(category.trim());
      setCategory("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4">
      <div className="flex gap-2">
      <input
        type="text"
        placeholder="RCA Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="border rounded px-3 py-2 w-200"
        required
      />
        <button type="submit" className="bg-green-500 text-white  px-4 py-1 w-30 rounded">Submit</button>
        <button type="button" onClick={onCancel} className="bg-red-400 text-white px-4 py-1 w-30 rounded">Cancel</button>
      </div>
    </form>
  );
};

export default AddRCACategory;
