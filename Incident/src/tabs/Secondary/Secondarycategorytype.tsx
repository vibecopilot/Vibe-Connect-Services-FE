import React, { useState, useEffect } from 'react';
import { FiEye, FiEdit,FiTrash2 } from 'react-icons/fi';

import TableHead from '../../components/TopHead';
import Pagination from '../../components/Pagination';
import IconButton from '../../components/IconButton';
import NoDataFound from '../../components/NoDataFound';
import TopSearch from '../../components/TopSearch';
import AddSecondaryCategory from '../../forms/Addsecondarycategory';

const PAGE_SIZE = 5;

const initialData = [
  { id: 1, name: 'Health & Safety' },
  { id: 2, name: 'Utility Failure' },
  { id: 3, name: 'Fire Alarm' },
  { id: 4, name: 'Parking Issue' },
  { id: 5, name: 'Security Breach' },
];

const SecondaryCategoryType: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [page, setPage] = useState(1);
  const [isSearchShown, setSearch] = useState(false);
  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({ name: '' });

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const paginatedData = filteredData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    const result = data.filter((item) =>
      item.name.toLowerCase().includes(filterValues.name.toLowerCase())
    );
    setFilteredData(result);
    setPage(1);
  }, [filterValues, data]);

  const handleFormSubmit = (categoryName: string) => {
    const exists = data.some(
      (d) => d.name.toLowerCase() === categoryName.toLowerCase()
    );
    if (exists) {
      alert('Secondary category already exists!');
      return;
    }

    const newItem = {
      id: data.length + 1,
      name: categoryName,
    };
    setData((prev) => [...prev, newItem]);
    setShowAddForm(false);
    setFilterValues({ name: '' });
  };

  const handleTopButtonClick = (btn: string) => {
    if (btn === 'Add Secondary Category') {
      setShowAddForm(true);
    }
  };

  const handleSearchToggle = () => {
    setSearch(!isSearchShown);
  };

  const columns = [
    { label: 'Action', key: 'action' },
    { label: 'Secondary Category Type', key: 'name' },
  ]; 
  const handleDelete = (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (!confirmed) return;
  
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };
  

  return (
    <div className="p-4 bg-white rounded-md shadow-sm font-sans text-gray-600" style={{ fontFamily: "'PT Sans', sans-serif" }}>
      <TopSearch
        searchActive={isSearchShown}
        onSearchToggle={handleSearchToggle}
        onButtonClick={handleTopButtonClick}
        buttons={['Add Secondary Category']}
      />
      <div>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={filteredData.length}
          onPageChange={setPage}
        />
      </div>

      {showAddForm && (
        <AddSecondaryCategory
          onSubmit={handleFormSubmit}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto border text-base border-collapse border-gray-300 font-sans text-gray-600">
          <TableHead columns={columns} />
          {isSearchShown && (
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="px-2 py-1 border-b">
                    {col.key === 'name' && (
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
                        className="h-10 px-3 text-base rounded border border-gray-300 w-full"
                        placeholder={`Search ${col.label}`}
                      />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 text-center">
                  <td className="border px-2 py-1 flex justify-center gap-2">
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
                  <td className="border px-2 py-1">{item.name}</td>
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

export default SecondaryCategoryType;
