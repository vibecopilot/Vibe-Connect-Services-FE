import React, { useState } from 'react';
import { FiEye, FiEdit, FiSearch , FiTrash2  } from 'react-icons/fi';
import NoDataFound from '../../components/NoDataFound';
import AddSecondarySubSubSubCategory from '../../forms/Addsecondarysubsubsubcategory';
import TextInput from '../../components/TextInput';
import TopHead from '../../components/TopHead';

interface SubSubSubCategoryEntry {
  id: number;
  type: string;
  subCategory: string;
  subSubCategory: string;
  subSubSubCategory: string;
}

const SecondarySubSubSubCategory: React.FC = () => {
  const [entries, setEntries] = useState<SubSubSubCategoryEntry[]>([
    {
      id: 1,
      type: 'Health & Safety',
      subCategory: 'Injury/Illness',
      subSubCategory: 'First Aid-Injury',
      subSubSubCategory: 'Leg Scratch',
    },
    {
      id: 2,
      type: 'Utility Failure',
      subCategory: 'Gas Supply',
      subSubCategory: 'Gas Leak',
      subSubSubCategory: 'Improper Installation',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValues, setSearchValues] = useState({
    type: '',
    subCategory: '',
    subSubCategory: '',
    subSubSubCategory: '',
  });

  const handleAddEntry = (newEntry: Omit<SubSubSubCategoryEntry, 'id'>) => {
    const newId = entries.length + 1;
    setEntries([...entries, { id: newId, ...newEntry }]);
    setShowForm(false);
  }; 
  const handleDelete = (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (!confirmed) return;
  
    const updatedEntries = entries.filter((item) => item.id !== id);
    setEntries(updatedEntries);
  };
  

  const filteredEntries = entries.filter((entry) =>
    entry.type.toLowerCase().includes(searchValues.type.toLowerCase()) &&
    entry.subCategory.toLowerCase().includes(searchValues.subCategory.toLowerCase()) &&
    entry.subSubCategory.toLowerCase().includes(searchValues.subSubCategory.toLowerCase()) &&
    entry.subSubSubCategory.toLowerCase().includes(searchValues.subSubSubCategory.toLowerCase())
  );

  const columns = [
    { label: 'Action', align: 'center' as const },
    { label: 'Secondary Category Type', align: 'center' as const },
    { label: 'Secondary Sub Category', align: 'center' as const },
    { label: 'Secondary Sub Sub Category', align: 'center' as const },
    { label: 'Secondary Sub Sub Sub Category', align: 'center' as const },
  ];

  return (
    <div className="p-4 text-gray-600" style={{ fontFamily: "'PT Sans', sans-serif" }}>
      {/* Top Bar */}
      <div className="flex items-center gap-3 mb-4">
        <FiSearch className="text-gray-600 cursor-pointer" onClick={() => setShowSearch((s) => !s)} />
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-white rounded border"
          style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray', textAlign: 'center' }}
        >
          Add Secondary Sub Sub Sub Category
        </button>
      </div>

      {/* Form Section */}
      {showForm && (
        <AddSecondarySubSubSubCategory
          onSubmit={handleAddEntry}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Table */}
      {filteredEntries.length === 0 ? (
        <NoDataFound />
      ) : (
        <table className="w-full border-t border-gray-300 text-center" style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }}>
          <TopHead columns={columns} />
          {showSearch && (
            <thead>
              <tr>
                <th className="p-2 text-center"></th>
                <th className="p-2 text-center">
                  <TextInput
                    placeholder="Search Secondary Category Type"
                    value={searchValues.type}
                    onChange={(e) => setSearchValues((prev) => ({ ...prev, type: e.target.value }))}
                    className="w-full text-sm border rounded px-2 py-1 text-center"
                  />
                </th>
                <th className="p-2 text-center">
                  <TextInput
                    placeholder="Search Secondary Sub Category"
                    value={searchValues.subCategory}
                    onChange={(e) => setSearchValues((prev) => ({ ...prev, subCategory: e.target.value }))}
                    className="w-full text-sm border rounded px-2 py-1 text-center"
                  />
                </th>
                <th className="p-2 text-center">
                  <TextInput
                    placeholder="Search Secondary Sub Sub Category"
                    value={searchValues.subSubCategory}
                    onChange={(e) => setSearchValues((prev) => ({ ...prev, subSubCategory: e.target.value }))}
                    className="w-full text-sm border rounded px-2 py-1 text-center"
                  />
                </th>
                <th className="p-2 text-center">
                  <TextInput
                    placeholder="Search Secondary Sub Sub Sub Category"
                    value={searchValues.subSubSubCategory}
                    onChange={(e) => setSearchValues((prev) => ({ ...prev, subSubSubCategory: e.target.value }))}
                    className="w-full text-sm border rounded px-2 py-1 text-center"
                  />
                </th>
              </tr>
            </thead>
          )}
          <tbody>
            {filteredEntries.map((entry) => (
              <tr key={entry.id} className="border-b hover:bg-gray-50 text-center" style={{ textAlign: 'center' }}>
                <td className="p-2 flex gap-2 justify-center items-center text-center">
                  <FiEye className="cursor-pointer" />
                  <FiEdit className="cursor-pointer" /> 
                  <FiTrash2
    className="cursor-pointer"
    title="Delete"
    onClick={() => handleDelete(entry.id)}
  />
                </td>
                <td className="p-2 text-center">{entry.type}</td>
                <td className="p-2 text-center">{entry.subCategory}</td>
                <td className="p-2 text-center">{entry.subSubCategory}</td>
                <td className="p-2 text-center">{entry.subSubSubCategory}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SecondarySubSubSubCategory;
