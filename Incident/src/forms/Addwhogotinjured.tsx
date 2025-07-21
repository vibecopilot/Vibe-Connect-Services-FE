import React, { useState } from "react";

type AddWhoGotInjuredProps = {
  onSubmit: (name: string) => void;
  onCancel: () => void;
};

const AddWhoGotInjured: React.FC<AddWhoGotInjuredProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4">
        <div className="flex gap-2">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="border rounded px-3 py-2 w-200"
        required
      />
        <button type="submit" className="bg-green-500 text-white px-4 py-1 w-30 rounded">Submit</button>
        <button type="button" onClick={onCancel} className="bg-red-400 text-white px-4 py-1 w-30 rounded">Cancel</button>
      </div>
    </form>
  );
};

export default AddWhoGotInjured;
