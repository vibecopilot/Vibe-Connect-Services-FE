import React, { useState } from 'react';
import TextInput from '../components/TextInput';
import DropdownMenu from '../components/DropdownMenu';

interface Props {
  onSubmit: (entry: { type: string; subCategory: string; subSubCategory: string }) => void;
  onCancel: () => void;
}

const AddSecondarySubSubCategory: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [type, setType] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [subSubCategory, setSubSubCategory] = useState('');
  const [typeOpen, setTypeOpen] = useState(false);
  const [subCategoryOpen, setSubCategoryOpen] = useState(false);

  // Example options, replace with your real data as needed
  const typeOptions = [
    { label: 'Health & Safety', value: 'Health & Safety' },
    { label: 'Utility Failure', value: 'Utility Failure' },
  ];
  const subCategoryOptions = [
    { label: 'Injury/Illness', value: 'Injury/Illness' },
    { label: 'Gas Supply', value: 'Gas Supply' },
  ];

  const handleSubmit = () => {
    if (type && subCategory && subSubCategory) {
      onSubmit({ type, subCategory, subSubCategory });
      setType('');
      setSubCategory('');
      setSubSubCategory('');
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 mb-4" style={{ fontFamily: "'PT Sans', sans-serif" }} >
      <DropdownMenu
        items={typeOptions.map(opt => ({
          label: opt.label,
          onClick: () => setType(opt.value)
        }))}
        trigger={
          <div className="w-80 h-10 flex items-center border rounded px-3 bg-white justify-between cursor-pointer" style={{ minWidth: '200px' }}>
            <span className={type ? 'text-gray-800' : 'text-gray-400'}>{type || 'Select Secondary Category'}</span>
            <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </div>
        }
        open={typeOpen}
        onToggle={setTypeOpen}
        className="w-80"
      />
      <DropdownMenu
        items={subCategoryOptions.map(opt => ({
          label: opt.label,
          onClick: () => setSubCategory(opt.value)
        }))}
        trigger={
          <div className="w-80 h-10 flex items-center border rounded px-3 bg-white justify-between cursor-pointer" style={{ minWidth: '200px' }}>
            <span className={subCategory ? 'text-gray-800' : 'text-gray-400'}>{subCategory || 'Select Secondary Sub Category'}</span>
            <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </div>
        }
        open={subCategoryOpen}
        onToggle={setSubCategoryOpen}
        className="w-80"
      />
      <TextInput
        // label="Secondary Sub Sub Category"
        name="subSubCategory"
        placeholder="Enter Sub Sub Category"
        value={subSubCategory}
        onChange={(e) => setSubSubCategory(e.target.value)}
        className="w-80 h-10 px-3 border rounded bg-white text-gray-800"
      />
      <button
        onClick={handleSubmit}
        className="h-10 mb-4 px-6 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Submit
      </button>
      <button
        onClick={onCancel}
        className="h-10 mb-4 px-6 bg-red-400 text-white rounded hover:bg-red-500"
      >
        Cancel
      </button>
    </div>
  );
};

export default AddSecondarySubSubCategory;
