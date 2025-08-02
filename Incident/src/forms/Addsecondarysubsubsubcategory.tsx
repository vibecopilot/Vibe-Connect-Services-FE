import React, { useState } from 'react';
import DropdownMenu from '../components/DropdownMenu';

interface Props {
  onSubmit: (entry: {
    type: string;
    subCategory: string;
    subSubCategory: string;
    subSubSubCategory: string;
  }) => void;
  onCancel: () => void;
}

const AddSecondarySubSubSubCategory: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [type, setType] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [subSubCategory, setSubSubCategory] = useState('');
  const [subSubSubCategory, setSubSubSubCategory] = useState('');
  const [typeOpen, setTypeOpen] = useState(false);
  const [subCategoryOpen, setSubCategoryOpen] = useState(false);
  const [subSubCategoryOpen, setSubSubCategoryOpen] = useState(false);
  const [subSubSubCategoryOpen, setSubSubSubCategoryOpen] = useState(false);

  // Example options, replace with your real data as needed
  const typeOptions = [
    { label: 'Health & Safety', value: 'Health & Safety' },
    { label: 'Utility Failure', value: 'Utility Failure' },
  ];
  const subCategoryOptions = [
    { label: 'Injury/Illness', value: 'Injury/Illness' },
    { label: 'Gas Supply', value: 'Gas Supply' },
  ];
  const subSubCategoryOptions = [
    { label: 'First Aid-Injury', value: 'First Aid-Injury' },
    { label: 'Gas Leak', value: 'Gas Leak' },
  ];
  const subSubSubCategoryOptions = [
    { label: 'Leg Scratch', value: 'Leg Scratch' },
    { label: 'Improper Installation', value: 'Improper Installation' },
  ];

  const handleSubmit = () => {
    if (type && subCategory && subSubCategory && subSubSubCategory) {
      onSubmit({ type, subCategory, subSubCategory, subSubSubCategory });
      setType('');
      setSubCategory('');
      setSubSubCategory('');
      setSubSubSubCategory('');
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 mb-4" style={{ fontFamily: "'PT Sans', sans-serif" }}>
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
      <DropdownMenu
        items={subSubCategoryOptions.map(opt => ({
          label: opt.label,
          onClick: () => setSubSubCategory(opt.value)
        }))}
        trigger={
          <div className="w-80 h-10 flex items-center border rounded px-3 bg-white justify-between cursor-pointer" style={{ minWidth: '200px' }}>
            <span className={subSubCategory ? 'text-gray-800' : 'text-gray-400'}>{subSubCategory || 'Select Secondary Sub Sub Category'}</span>
            <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </div>
        }
        open={subSubCategoryOpen}
        onToggle={setSubSubCategoryOpen}
        className="w-80"
      />
      <DropdownMenu
        items={subSubSubCategoryOptions.map(opt => ({
          label: opt.label,
          onClick: () => setSubSubSubCategory(opt.value)
        }))}
        trigger={
          <div className="w-70 h-10 flex items-center border rounded px-3 bg-white justify-between cursor-pointer" style={{ minWidth: '200px' }}>
            <span className={subSubSubCategory ? 'text-gray-800' : 'text-gray-400'}>{subSubSubCategory || 'Select Sec Sub Sub Sub Cat'}</span>
            <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </div>
        }
        open={subSubSubCategoryOpen}
        onToggle={setSubSubSubCategoryOpen}
        className="w-80"
      />
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Submit
      </button>
      <button
        onClick={onCancel}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Cancel
      </button>
    </div>
  );
};

export default AddSecondarySubSubSubCategory;
