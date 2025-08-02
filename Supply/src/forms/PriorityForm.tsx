import React, { useState, useEffect } from "react";

interface PriorityItem {
  id: number;
  name: string;
  description: string;
  color: string;
}

interface PriorityFormProps {
  initialData: PriorityItem | null;
  onConfirm: (item: PriorityItem) => void;
  onCancel: () => void;
}

const PriorityForm: React.FC<PriorityFormProps> = ({
  initialData,
  onConfirm,
  onCancel,
}) => {
  const [formData, setFormData] = useState<PriorityItem>({
    id: initialData?.id || 0,
    name: initialData?.name || "",
    description: initialData?.description || "",
    color: initialData?.color || "#000000",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onConfirm(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" style={{ fontFamily: "'PT Sans', sans-serif" }}>
      <div>
        <label className="block text-sm font-medium text-white mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-white mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-white mb-1">Color</label>
        <input
          type="color"
          name="color"
          value={formData.color}
          onChange={handleChange}
          className="h-10 w-20 p-1 rounded cursor-pointer"
        />
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded border border-gray-300 text-white hover:bg-gray-100 hover:text-black"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default PriorityForm;
