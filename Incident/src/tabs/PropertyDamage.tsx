import React, { useState } from 'react';
import TableHead from '../components/TopHead';
import IconButton from '../components/IconButton';
import NoDataFound from '../components/NoDataFound';
import Pagination from '../components/Pagination';
import { FiEye, FiEdit, FiSearch, FiTrash2 } from 'react-icons/fi';
import AddPropertyDamage from '../forms/Addpropertydamange'; // <-- import the form

interface PropertyDamage {
  id: number;
  name: string;
}

const PAGE_SIZE = 10;

const initialData: PropertyDamage[] = [
  { id: 1, name: 'Facade' },
  { id: 2, name: 'Roof' },
];

const PropertyDamageCategory: React.FC = () => {
  const [rows, setRows] = useState<PropertyDamage[]>(initialData);
  const [page, setPage] = useState(1);
  const [showSearch, setShowSearch] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchValues, setSearchValues] = useState({ name: '' });

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchValues.name.toLowerCase())
  );
  const totalPages = Math.ceil(filteredRows.length / PAGE_SIZE) || 1;
  const pageRows = filteredRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const columns = [
    { label: 'Action', align: 'center' as const },
    { label: 'Damaged Property Name', align: 'center' as const },
  ];

  // Add handler
  const handleAddSubmit = (name: string) => {
    setRows(prev => [
      ...prev,
      { id: prev.length ? prev[prev.length - 1].id + 1 : 1, name }
    ]);
    setShowAddForm(false);
  };

  const handleDelete = (id: number) => {
    setRows(prev => prev.filter(row => row.id !== id));
  };

  return (
    <div className="p-5 text-gray-600" style={{ fontFamily: "'PT Sans', sans-serif" }}>
      {/* Top controls - Search icon, Add button, Pagination */}
      <div className="mb-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded hover:bg-gray-100" onClick={() => setShowSearch((s) => !s)}>
            <FiSearch size={18} />
          </button>

          <button
            className="rounded border border-gray-300 bg-white px-4 w-20  h-10 py-1.5 text-sm text-gray-800 hover:bg-gray-100"
            onClick={() => setShowAddForm(true)}
          >
            Add
          </button>
        </div>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={filteredRows.length}
          onPageChange={setPage}
        />
      </div>

      {/* AddPropertyDamage Form */}
      {showAddForm && (
        <AddPropertyDamage
          onSubmit={handleAddSubmit}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded border border-gray-200">
        <table className="w-full table-fixed text-center" style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }}>
          <TableHead columns={columns} />
          {showSearch && (
            <thead>
              <tr>
                <th className="p-2 text-center"></th>
                <th className="p-2 text-center">
                  <input
                    type="text"
                    placeholder="Search Damaged Property Name"
                    value={searchValues.name}
                    onChange={(e) => setSearchValues({ name: e.target.value })}
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
                  <td className="px-4 py-3 text-center">{row.name}</td>
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

export default PropertyDamageCategory;
