import React, { useState, useEffect } from 'react';
import { FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';

import TableHead from '../../components/TopHead';
import Pagination from '../../components/Pagination';
import IconButton from '../../components/IconButton';
import NoDataFound from '../../components/NoDataFound';
import TopSearch from '../../components/TopSearch';
import AddCategoryForm from '../../forms/Addcategory';

const PAGE_SIZE = 5;

const initialData = [
  { id: 1, type: 'Electrical Issues' },
  { id: 2, type: 'Fire' },
];

const Category: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [page, setPage] = useState(1);
  const [isSearchShown, setSearch] = useState(false);
  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({ type: '' });

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const paginatedData = filteredData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    const result = data.filter((item) =>
      item.type.toLowerCase().includes(filterValues.type.toLowerCase())
    );
    setFilteredData(result);
    setPage(1);
  }, [filterValues, data]);

  const handleFormSubmit = (categoryType: string) => {
    const exists = data.some(
      (d) => d.type.toLowerCase() === categoryType.toLowerCase()
    );
    if (exists) {
      alert('Category already exists!');
      return;
    }

    const newItem = {
      id: data.length + 1,
      type: categoryType,
    };
    setData((prev) => [...prev, newItem]);
    setShowAddForm(false);
    setFilterValues({ type: '' });
  };

  const handleTopButtonClick = (btn: string) => {
    if (btn === 'Add' || btn === 'Add Category') {
      setShowAddForm(true);
    }
  };

  const handleSearchToggle = () => {
    setSearch(!isSearchShown);
  };

  const handleDelete = (id: number) => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  const columns = [
    { label: 'Action', key: 'action', align: 'center' as const },
    { label: 'Category Type', key: 'type', align: 'center' as const },
  ];

  return (
    <div className="p-4 bg-white rounded-md shadow-sm font-sans text-gray-600" style={{ fontFamily: "'PT Sans', sans-serif" }}>
      <div className="flex flex-wrap items-center justify-between mb-4">
        <TopSearch
          searchActive={isSearchShown}
          onSearchToggle={handleSearchToggle}
          onButtonClick={handleTopButtonClick}
          buttons={['Add Category']}
        />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={filteredData.length}
          onPageChange={setPage}
        />
      </div>

      {showAddForm && (
        <AddCategoryForm
          onSubmit={handleFormSubmit}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto border text-base border-collapse border-gray-300 font-sans text-gray-600" style={{ fontFamily: "'PT Sans', sans-serif" }}>
          <TableHead columns={columns} />
          <thead>
            {isSearchShown && (
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="px-2 py-1 border-b text-center font-sans text-gray-600" style={{ fontFamily: "'PT Sans', sans-serif" }}>
                    {col.key === 'type' && (
                      <input
                        type="text"
                        name={col.key}
                        value={filterValues[col.key] || ''}
                        onChange={(e) =>
                          setFilterValues((prev) => ({
                            ...prev,
                            [col.key]: e.target.value,
                          }))
                        }
                        className="h-10 px-3 text-base rounded border border-gray-300 font-sans text-gray-600 w-full text-center"
                        placeholder={`Search ${col.label}`}
                        style={{ fontFamily: "'PT Sans', sans-serif" }}
                      />
                    )}
                  </th>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 text-center font-sans text-gray-600" style={{ fontFamily: "'PT Sans', sans-serif" }}>
                  <td className="border px-2 py-1 flex justify-center gap-2 text-center">
                    <IconButton tooltip="View">
                      <FiEye />
                    </IconButton>
                    <IconButton tooltip="Edit">
                      <FiEdit />
                    </IconButton>
                    <IconButton tooltip="Delete" onClick={() => handleDelete(item.id)}>
                      <FiTrash2 />
                    </IconButton>
                  </td>
                  <td className="border px-2 py-1 text-center">{item.type}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-4">
                  <NoDataFound />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

     
    </div>
  );
};

export default Category;
