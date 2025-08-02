import React, { useState, useEffect } from 'react';
import TextInput from '../components/TextInput';
import Pagination from '../components/Pagination';
import TopHead from '../components/TopHead';
import IconButton from '../components/IconButton';
import SearchIcon from '../components/SearchIcon';
import NoDataFound from '../components/NoDataFound';
import AddIncidenceLevel from '../forms/Addincidencelevel';
import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi';

interface IncidenceLevelRow {
  id: number;
  type: string;
}

const PAGE_SIZE = 10;

const initialData: IncidenceLevelRow[] = [
  { id: 1, type: 'Pending' },
  { id: 2, type: 'Completed' },
  { id: 3, type: 'On Hold' },
  { id: 4, type: 'In Active' },
];

const IncidenceLevel: React.FC = () => {
  const [levels, setLevels] = useState<IncidenceLevelRow[]>(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = levels.filter((lvl) =>
    lvl.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => setPage(1), [searchTerm, levels]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const addLevel = (value: string) => {
    setLevels((prev) => [
      ...prev,
      { id: prev.length ? prev[prev.length - 1].id + 1 : 1, type: value },
    ]);
    setShowAddForm(false);
  };

  const handleToggleSearch = () => {
    setShowSearch((prev) => !prev);
    if (showSearch) setSearchTerm('');
  };

  const handleDelete = (id: number) => {
    setLevels(prev => prev.filter(row => row.id !== id));
  };

  return (
    <div className="p-5 text-gray-700" style={{ fontFamily: "'PT Sans', sans-serif" }}>
      {/* Top Controls */}
      <div className="mb-4 flex items-center gap-4">
        <SearchIcon onClick={handleToggleSearch} />
        <button
          className="flex items-center rounded border border-gray-400 px-3 py-2 text-sm font-medium hover:bg-gray-100"
          onClick={() => setShowAddForm(true)}
        >
          + Add Status
        </button>
        <div className="ml-auto text-sm text-gray-600">
          {filtered.length > 0 && (
            <>
              {pageRows.length > 0 &&
                `${(page - 1) * PAGE_SIZE + 1}-${(page - 1) * PAGE_SIZE + pageRows.length} of ${filtered.length}`}
            </>
          )}
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <AddIncidenceLevel
          onSubmit={addLevel}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded border border-gray-300">
        <table className="w-full table-fixed text-sm">
          {/* Table Header using TopHead */}
          <TopHead
            columns={[
              { label: 'Action', align: 'center' },
              { label: 'Status' },
            ]}
          />

          {/* Column search row only if showSearch is true */}
          {showSearch && (
            <thead>
              <tr className="bg-white">
                <th className="px-4 py-2" />
                <th className="px-4 py-2">
                  <TextInput
                    name="searchStatus"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search Status"
                    label=""
                    type="search"
                    searchIcon
                  />
                </th>
              </tr>
            </thead>
          )}

          {/* Table Body */}
          <tbody>
            {pageRows.length ? (
              pageRows.map((row) => (
                <tr key={row.id} className="border-t">
                  <td className="px-4 py-3 border-r text-center">
                    <div className="flex items-center justify-center gap-3">
                      <IconButton tooltip="View" onClick={() => console.log('View', row.id)}>
                        <FiEye />
                      </IconButton>
                      <IconButton tooltip="Edit" onClick={() => console.log('Edit', row.id)}>
                        <FiEdit />
                      </IconButton>
                      <IconButton tooltip="Delete" onClick={() => handleDelete(row.id)}>
                        <FiTrash2 />
                      </IconButton>
                    </div>
                  </td>
                  <td className="px-4 py-3">{row.type}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="py-8 text-center">
                  <NoDataFound />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination at bottom */}
      <div className="mt-4">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={filtered.length}
          onPageChange={setPage}
          showControls
        />
      </div>
    </div>
  );
};

export default IncidenceLevel;
