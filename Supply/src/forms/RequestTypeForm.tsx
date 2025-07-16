import React, { useState, useEffect } from "react";

interface RequestTypeFormProps {
  initialData?: { name: string; description: string };
  onConfirm: (data: { name: string; description: string }) => void;
  onCancel: () => void;
}

const RequestTypeForm: React.FC<RequestTypeFormProps> = ({
  initialData,
  onConfirm,
  onCancel,
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");

  useEffect(() => {
    setName(initialData?.name || "");
    setDescription(initialData?.description || "");
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({ name, description });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" style={{ fontFamily: "'PT Sans', sans-serif" }}>
      <div>
        <label className="block text-white mb-1">Name:</label>
        <input
          className="w-full px-2 py-1 rounded border border-gray-300 bg-transparent text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
        />
      </div>
      <div>
        <label className="block text-white mb-1">Description</label>
        <input
          className="w-full px-2 py-1 rounded border border-gray-300 bg-transparent text-white"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="flex gap-3 mt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-1 rounded hover:bg-blue-700"
        >
          Save
        </button>
        <button
          type="button"
          className="bg-white text-gray-700 px-5 py-1 rounded border border-gray-300 hover:bg-gray-100"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default RequestTypeForm;