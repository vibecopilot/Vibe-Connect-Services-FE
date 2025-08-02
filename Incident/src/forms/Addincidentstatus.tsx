import React, { useState } from 'react';
import TextInput from '../components/TextInput';

interface AddIncidentStatusProps {
  onSubmit: (value: string) => void;
  onCancel: () => void;
}

const AddIncidentStatus: React.FC<AddIncidentStatusProps> = ({ onSubmit, onCancel }) => {
  const [status, setStatus] = useState('');

  const handleSubmit = () => {
    const trimmed = status.trim();
    if (trimmed) {
      onSubmit(trimmed);
      setStatus('');
    }
  };

  return (
    <div
      className="flex flex-wrap items-center gap-2 w-full mt-2 text-gray-600"
      style={{ fontFamily: "'PT Sans', sans-serif" }}
    >
      <div className="flex-grow">
        <TextInput
          label=""
          name="incident-status"
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="Enter Status"
          className="h-10 px-3 text-base rounded border border-gray-300 w-full"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="h-10 mb-4 px-6 text-base rounded bg-green-500 text-white hover:bg-green-600"
        style={{ fontFamily: "'PT Sans', sans-serif" }}
        disabled={!status.trim()}
      >
        Submit
      </button>

      <button
        onClick={onCancel}
        className="h-10 mb-4 px-6 text-base rounded bg-red-400 text-white hover:bg-red-500"
        style={{ fontFamily: "'PT Sans', sans-serif" }}
      >
        Cancel
      </button>
    </div>
  );
};

export default AddIncidentStatus;
