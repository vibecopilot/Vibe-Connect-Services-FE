import React, { useState } from 'react';
import TextInput from '../components/TextInput';

interface AddIncidenceLevelProps {
  onSubmit: (value: string) => void;
  onCancel: () => void;
}

const AddIncidenceLevel: React.FC<AddIncidenceLevelProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim()) {
      onSubmit(input.trim());
      setInput('');
    }
  };

  return (
    <div
      className="mb-4 flex flex-wrap items-center gap-3 w-full text-gray-600"
      style={{ fontFamily: "'PT Sans', sans-serif" }}
    >
      {/* Adjusted input width */}
      <div className="w-[1200px]">
        <TextInput
          name="newLevel"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter Level"
          label=""
          className="h-10 px-3 text-base rounded border border-gray-300 w-full"
        />
      </div>

      <button
        className="rounded bg-green-500 h-10 mb-4 px-6 text-sm font-medium text-white hover:bg-green-600"
        onClick={handleSubmit}
        style={{ fontFamily: "'PT Sans', sans-serif" }}
      >
        Submit
      </button>

      <button
        className="rounded bg-red-500 h-10 mb-4 px-6 text-sm font-medium text-white hover:bg-red-600"
        onClick={onCancel}
        style={{ fontFamily: "'PT Sans', sans-serif" }}
      >
        Cancel
      </button>
    </div>
  );
};

export default AddIncidenceLevel;
