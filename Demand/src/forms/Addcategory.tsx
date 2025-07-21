import React, { useState } from 'react';
import { Card } from '../components/Card';
import NoDataFound from '../components/NoDataFound';
import IconButton from '../components/IconButton';
import Pagination from '../components/Pagination';
import { Trash2 } from 'lucide-react';
import TextInput from '../components/TextInput';
import { FiEdit } from 'react-icons/fi';
import TopHead from '../components/TopHead';

const AddCategory = () => {
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleAdd = () => {
    if (category.trim() && !categories.includes(category.trim())) {
      setCategories([category.trim(), ...categories]);
      setCategory('');
    }
  };

  const handleDelete = (cat: string) => {
    setCategories(categories.filter(c => c !== cat));
  };

  const handleEdit = (idx: number, value: string) => {
    setEditIndex(idx);
    setEditValue(value);
  };

  const handleEditSave = (idx: number) => {
    const updated = [...categories];
    updated[idx] = editValue.trim();
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

  return (
    <Card className="p-4">
      {/* Input with Add button */}
      <div className="flex items-center gap-2 mb-4">
        <div className="relative w-full max-w-xs">
          <TextInput
            label=""
            placeholder="Enter Category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            name="category"
            className="pl-8 pr-2 py-2 w-full border border-gray-300 rounded text-sm focus:outline-none"
          />
        </div>
        <button
          className="bg-gray-200 px-4 py-2 rounded border border-gray-300 hover:bg-blue-500 hover:text-white transition"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <TopHead
          columns={[
            { label: 'Action', align: 'left' },
            { label: 'S.No.', align: 'left' },
            { label: 'Category', align: 'left' },
          ]}
        />
        <table className="min-w-full border text-sm">
          <tbody>
            {paginatedCategories.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-8">
                  <NoDataFound message="" />
                </td>
              </tr>
            ) : (
              paginatedCategories.map((cat, idx) => {
                const globalIdx = (currentPage - 1) * itemsPerPage + idx;
                return (
                  <tr key={`${cat}-${idx}`} className="border-t">
                    <td className="px-4 py-2">
                      <div className="flex gap-2">
                        <IconButton tooltip="Delete" onClick={() => handleDelete(cat)}>
                          <Trash2 size={16} />
                        </IconButton>
                        <IconButton tooltip="Edit" onClick={() => handleEdit(globalIdx, cat)}>
                          <FiEdit size={16} />
                        </IconButton>
                      </div>
                    </td>
                    <td className="px-4 py-2">{globalIdx + 1}.</td>
                    <td className="px-4 py-2">
                      {editIndex === globalIdx ? (
                        <div className="flex gap-2 items-center">
                          <input
                            className="border px-2 py-1 rounded text-sm"
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                            autoFocus
                          />
                          <button
                            className="text-blue-600 text-xs"
                            onClick={() => handleEditSave(globalIdx)}
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

      {/* Pagination */}
      <div className="mt-2 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={categories.length}
          onPageChange={setCurrentPage}
        />
      </div>
    </Card>
  );
};

export default AddCategory;
