import React, { useState } from 'react';
import { FiSearch, FiEye, FiEdit ,FiTrash2 } from 'react-icons/fi';
import NoDataFound from '../../components/NoDataFound';
import AddSecondarySubSubCategory from '../../forms/Addsecondarysubsubcategory';
import TopHead from '../../components/TopHead';

interface SubSubCategoryEntry {
  id: number;
  secondaryCategoryType: string;
  secondarySubCategory: string;
  secondarySubSubCategory: string;
}

const SecondarySubSubCategory: React.FC = () => {
  const [showInput, setShowInput] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValues, setSearchValues] = useState({
    secondaryCategoryType: '',
    secondarySubCategory: '',
    secondarySubSubCategory: '',
  });

  const [entries, setEntries] = useState<SubSubCategoryEntry[]>([
    {
      id: 1,
      secondaryCategoryType: 'Health & Safety',
      secondarySubCategory: 'Injury/Illness',
      secondarySubSubCategory: 'First Aid-Injury',
    },
    {
      id: 2,
      secondaryCategoryType: 'Utility Failure',
      secondarySubCategory: 'Gas Supply',
      secondarySubSubCategory: 'Gas Leak',
    },
  ]);

  const handleAddEntry = (newEntry: {
    type: string;
    subCategory: string;
    subSubCategory: string;
  }) => {
    const newId = entries.length + 1;
    const entry: SubSubCategoryEntry = {
      id: newId,
      secondaryCategoryType: newEntry.type,
      secondarySubCategory: newEntry.subCategory,
      secondarySubSubCategory: newEntry.subSubCategory,
    };
    setEntries([...entries, entry]);
    setShowInput(false);
  }; 
  const handleDelete = (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (!confirmed) return;
  
    const updatedEntries = entries.filter((item) => item.id !== id);
    setEntries(updatedEntries);
  };
  

  const filteredEntries = entries.filter((entry) =>
    entry.secondaryCategoryType.toLowerCase().includes(searchValues.secondaryCategoryType.toLowerCase()) &&
    entry.secondarySubCategory.toLowerCase().includes(searchValues.secondarySubCategory.toLowerCase()) &&
    entry.secondarySubSubCategory.toLowerCase().includes(searchValues.secondarySubSubCategory.toLowerCase())
  );

  const columns = [
    { label: 'Action', align: 'center' as const },
    { label: 'Secondary Category Type', align: 'center' as const },
    { label: 'Secondary Sub Category', align: 'center' as const },
    { label: 'Secondary Sub Sub Category', align: 'center' as const },
  ];

  return (
    <div className="p-4 text-gray-600" style={{ fontFamily: "'PT Sans', sans-serif" }}>
      <div className="flex items-center gap-2 mb-4">
        <FiSearch className="text-gray-600 cursor-pointer" onClick={() => setShowSearch((s) => !s)} />
        <button
          onClick={() => setShowInput(true)}
          className="px-4 py-2 bg-white-200 rounded border"
          style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray', textAlign: 'center' }}
        >
          Add Secondary Sub Sub Category
        </button>
      </div>

      {showInput && (
        <AddSecondarySubSubCategory
          onSubmit={handleAddEntry}
          onCancel={() => setShowInput(false)}
        />
      )}

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
                  <input
                    type="text"
                    placeholder="Search Secondary Category Type"
                    value={searchValues.secondaryCategoryType}
                    onChange={(e) => setSearchValues((prev) => ({ ...prev, secondaryCategoryType: e.target.value }))}
                    className="w-full text-sm border rounded px-2 py-1"
                    style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray', textAlign: 'center' }}
                  />
                </th>
                <th className="p-2 text-center">
                  <input
                    type="text"
                    placeholder="Search Secondary Sub Category"
                    value={searchValues.secondarySubCategory}
                    onChange={(e) => setSearchValues((prev) => ({ ...prev, secondarySubCategory: e.target.value }))}
                    className="w-full text-sm border rounded px-2 py-1"
                    style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray', textAlign: 'center' }}
                  />
                </th>
                <th className="p-2 text-center">
                  <input
                    type="text"
                    placeholder="Search Secondary Sub Sub Category"
                    value={searchValues.secondarySubSubCategory}
                    onChange={(e) => setSearchValues((prev) => ({ ...prev, secondarySubSubCategory: e.target.value }))}
                    className="w-full text-sm border rounded px-2 py-1"
                    style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray', textAlign: 'center' }}
                  />
                </th>
              </tr>
            </thead>
          )}
          <tbody>
            {filteredEntries.map((entry) => (
              <tr key={entry.id} className="border-b border-gray-200 hover:bg-gray-50 text-center" style={{ textAlign: 'center' }}>
                <td className="p-2 flex gap-2 justify-center items-center text-center">
                  <FiEye className="cursor-pointer" title="View" />
                  <FiEdit className="cursor-pointer" title="Edit" />
                  <FiTrash2
    className="cursor-pointer"
    title="Delete"
    onClick={() => handleDelete(entry.id)}
  />
                </td>
                <td className="p-2 text-center">{entry.secondaryCategoryType}</td>
                <td className="p-2 text-center">{entry.secondarySubCategory}</td>
                <td className="p-2 text-center">{entry.secondarySubSubCategory}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SecondarySubSubCategory;
