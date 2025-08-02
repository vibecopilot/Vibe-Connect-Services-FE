import React, { useState } from 'react';
import TextInput from '../components/TextInput';

interface AddCategoryFormProps {
  onSubmit: (categoryType: string) => void;
  onCancel: () => void;
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({ onSubmit, onCancel }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    const trimmed = inputValue.trim();
    if (trimmed) {
      onSubmit(trimmed);
      setInputValue('');
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
  name="categoryType"
  type="text"
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
  placeholder="Enter Category Type"
  className="h-10 px-3 text-base rounded border border-gray-300   w-full"
/>

      </div>
      <button
        onClick={handleSubmit}
        className="h-10 mb-4 px-6  text-base rounded bg-green-500 text-white hover:bg-green-600 "
         style={{ fontFamily: "'PT Sans', sans-serif" }}
      >
        Submit
      </button>
      <button
        onClick={onCancel}
        className="h-10 mb-4 px-6 text-base rounded bg-red-400 text-white hover:bg-red-500 "
        style={{ fontFamily: "'PT Sans', sans-serif" }}
      >
        Cancel
      </button>
    </div>
  );
};

export default AddCategoryForm;
