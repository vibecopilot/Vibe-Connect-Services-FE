import React, { useState } from 'react';
import { Card } from '../../components/Card';
import NoDataFound from '../../components/NoDataFound';
import IconButton from '../../components/IconButton';
import Pagination from '../../components/Pagination';
import { Trash } from 'lucide-react';
import { FiEdit, FiSearch } from 'react-icons/fi';
import TableHead from '../../components/TopHead';

type CategoryProps = {
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
};

const Category: React.FC<CategoryProps> = ({ categories, setCategories }) => {
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleAdd = () => {
    if (category.trim() && !categories.includes(category.trim())) {
      setCategories([...categories, category.trim()]);
      setCategory('');
    }
  };

  const handleDelete = (cat: string) => {
    setCategories(categories.filter(c => c !== cat));
  };

  const handleEdit = (index: number, value: string) => {
    setEditIndex(index);
    setEditValue(value);
  };

  const handleEditSave = (index: number) => {
    const updated = [...categories];
    updated[index] = editValue.trim();
    setCategories(updated);
    setEditIndex(null);
    setEditValue('');
  };

  const handleEditCancel = () => {
    setEditIndex(null);
    setEditValue('');
  };

  const totalPages = Math.max(1, Math.ceil(categories.length / itemsPerPage));
  const paginatedCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { label: 'Action', align: 'left' as const },
    { label: 'S.No.', align: 'left' as const },
    { label: 'Category', align: 'left' as const },
  ];

  return (
    <Card className="p-4">
      {/* Search input with icon + add + pagination */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full max-w-xs">
            <FiSearch className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Enter Category"
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="pl-8 pr-2 py-2 w-full border border-gray-300 rounded text-sm focus:outline-none"
            />
          </div>
          <button
            className="bg-[#7991BB] px-4 py-2 rounded text-white"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>

        <div className="flex justify-end mt-2 md:mt-0">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={categories.length}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <TableHead columns={columns} />
          <tbody>
            {paginatedCategories.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-8">
                  <NoDataFound message="" />
                </td>
              </tr>
            ) : (
              paginatedCategories.map((cat, idx) => {
                const globalIndex = (currentPage - 1) * itemsPerPage + idx;

                return (
                  <tr key={`${cat}-${idx}`} className="border-t">
                    <td className="px-4 py-2">
                      <div className="flex gap-2">
                        <IconButton tooltip="Delete" onClick={() => handleDelete(cat)}>
                          <Trash size={16} />
                        </IconButton>
                        <IconButton tooltip="Edit" onClick={() => handleEdit(globalIndex, cat)}>
                          <FiEdit size={16} />
                        </IconButton>
                      </div>
                    </td>
                    <td className="px-4 py-2">{globalIndex + 1}.</td>
                    <td className="px-4 py-2">
                      {editIndex === globalIndex ? (
                        <div className="flex items-center gap-2">
                          <input
                            className="border px-2 py-1 rounded text-sm"
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                            autoFocus
                          />
                          <button
                            className="text-blue-600 text-xs"
                            onClick={() => handleEditSave(globalIndex)}
                          >
                            Save
                          </button>
                          <button
                            className="text-gray-500 text-xs"
                            onClick={handleEditCancel}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        cat
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default Category;
