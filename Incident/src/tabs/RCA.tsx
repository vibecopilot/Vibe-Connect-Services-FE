// src/pages/RCACategory.tsx
import React, { useState } from 'react';
import { FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';

import TableHead from '../components/TopHead';
import IconButton from '../components/IconButton';
import NoDataFound from '../components/NoDataFound';
import Pagination from '../components/Pagination';
import TopSearch from '../components/TopSearch';
import AddRCACategory from '../forms/Addrcacategory';

interface RCAEntry {
  id: number;
  category: string;
}

const PAGE_SIZE = 10;

const initialData: RCAEntry[] = [
  { id: 1, category: 'Unsafe Act/ Human Error' },
  { id: 2, category: 'Material Quality' },
];

const RCACategory: React.FC = () => {
  const [page, setPage] = useState(1);
  const [isSearchShown, setSearch] = useState(false);
  const [searchValues, setSearchValues] = useState({ category: '' });
  const [rows, setRows] = useState<RCAEntry[]>(initialData);
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredRows = rows.filter((row) =>
    row.category.toLowerCase().includes(searchValues.category.toLowerCase())
  );
  const totalPages = Math.ceil(filteredRows.length / PAGE_SIZE) || 1;
  const pageRows = filteredRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearchToggle = () => setSearch(!isSearchShown);

  const handleAddSubmit = (category: string) => {
    setRows(prev => [
      ...prev,
      { id: prev.length ? prev[prev.length - 1].id + 1 : 1, category }
    ]);
    setShowAddForm(false);
  };

  const handleDelete = (id: number) => {
    setRows(prev => prev.filter(row => row.id !== id));
  };

  const handleTopButton = (btn: string) => {
    if (btn === 'Add') {
      setShowAddForm(true);
    }
  };

  const columns = [
    { label: 'Action', align: 'center' as const },
    { label: 'RCA Category', align: 'center' as const },
  ];

  return (
    <div className="p-5 text-gray-600" style={{ fontFamily: "'PT Sans', sans-serif" }}>
      <TopSearch
        searchActive={isSearchShown}
        onSearchToggle={handleSearchToggle}
        onButtonClick={handleTopButton}
        buttons={['Add']}
      /> 
       <div>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={filteredRows.length}
          onPageChange={setPage}
        />
      </div>

      {showAddForm && (
        <AddRCACategory
          onSubmit={handleAddSubmit}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <div className="overflow-x-auto rounded border border-gray-200 mt-4">
        <table
          className="w-full table-fixed text-center"
          style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }}
        >
          <TableHead columns={columns} />

          {isSearchShown && (
            <thead>
              <tr className="bg-gray-50">
                <th className="p-2 text-center"></th>
                <th className="p-2 text-center">
                  <input
                    type="text"
                    placeholder="Search RCA Category"
                    value={searchValues.category}
                    onChange={(e) =>
                      setSearchValues({ category: e.target.value })
                    }
                    className="w-full text-sm border rounded px-2 py-1 text-center"
                    style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }}
                  />
                </th>
              </tr>
            </thead>
          )}

          <tbody>
            {pageRows.length ? (
              pageRows.map((row) => (
                <tr key={row.id} className="border-b text-center">
                  <td className="whitespace-nowrap border-r px-4 py-3 text-center">
                    <div className="flex justify-center items-center gap-3">
                      <IconButton tooltip="View" onClick={() => {}}>
                        <FiEye />
                      </IconButton>
                      <IconButton tooltip="Edit" onClick={() => {}}>
                        <FiEdit />
                      </IconButton>
                      <IconButton tooltip="Delete" onClick={() => handleDelete(row.id)}>
                        <FiTrash2 />
                      </IconButton>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">{row.category}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="py-8 text-center">
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

export default RCACategory;
