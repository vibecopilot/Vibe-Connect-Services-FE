import React, { useState, useEffect } from 'react';
import TextInput from '../components/TextInput';
import Pagination from '../components/Pagination';
import TableHead from '../components/TopHead';
import IconButton from '../components/IconButton';
import SearchIcon from '../components/SearchIcon';
import NoDataFound from '../components/NoDataFound';
import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi';
import AddWhoGotInjured from '../forms/Addwhogotinjured';

interface InjuryRecord {
  id: number;
  name: string;
  injuryType: string;
  reportedBy: string;
}

const PAGE_SIZE = 10;

const initialInjuries: InjuryRecord[] = [
  { id: 1, name: 'Ravi', injuryType: 'Leg Fracture', reportedBy: 'Supervisor A' },
  { id: 2, name: 'Sunita', injuryType: 'Head Injury', reportedBy: 'Supervisor B' },
];

const WhoGotInjured: React.FC = () => {
  const [rows, setRows] = useState<InjuryRecord[]>(initialInjuries);
  const [showSearch, setShowSearch] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchValues, setSearchValues] = useState({
    name: '',
    injuryType: '',
    reportedBy: '',
  });
  const [page, setPage] = useState(1);

  const filtered = rows.filter((row) =>
    row.name.toLowerCase().includes(searchValues.name.toLowerCase())
  );

  useEffect(() => setPage(1), [searchValues]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const columns = [
    { label: 'Action', align: 'center' as const },
    { label: 'Name', align: 'center' as const },
  ];

  const handleAddSubmit = (name: string) => {
    setRows(prev => [
      ...prev,
      {
        id: prev.length ? prev[prev.length - 1].id + 1 : 1,
        name,
        injuryType: '',
        reportedBy: '',
      },
    ]);
    setShowAddForm(false);
  };

  const handleDelete = (id: number) => {
    setRows(prev => prev.filter(row => row.id !== id));
  };

  return (
    <div className="p-5 text-gray-600" style={{ fontFamily: "'PT Sans', sans-serif" }}>
      {/* Top control row */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <SearchIcon
          onClick={() => {
            if (showSearch) setSearchValues({ name: '', injuryType: '', reportedBy: '' });
            setShowSearch((prev) => !prev);
          }}
        />

        {/* Add Button */}
        <button
          className="flex items-center gap-1 rounded border  bg-white px-4 py-2 text-sm font-medium text-gray-700 "
          onClick={() => setShowAddForm(true)}
        >
          Add Injury Record
        </button>

        <div className="ml-auto">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={filtered.length}
            onPageChange={setPage}
          />
        </div>
      </div>

      {/* AddWhoGotInjured Form */}
      {showAddForm && (
        <AddWhoGotInjured
          onSubmit={handleAddSubmit}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Injury Table */}
      <div className="overflow-x-auto rounded border border-gray-200 mt-4">
        <table className="w-full table-fixed text-center" style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }}>
          <TableHead columns={columns} />
          {showSearch && (
            <thead>
              <tr>
                <th className="p-2 text-center"></th>
                <th className="p-2 text-center">
                  <TextInput
                    placeholder="Search Name"
                    value={searchValues.name}
                    onChange={(e) => setSearchValues((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full text-sm border rounded px-2 py-1 text-center"
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

export default WhoGotInjured;
