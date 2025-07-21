// Escalations.tsx
import React, { useState, useEffect } from 'react';
import TextInput from '../components/TextInput';
import Pagination from '../components/Pagination';
import TableHead from '../components/TopHead';
import IconButton from '../components/IconButton';
import SearchIcon from '../components/SearchIcon';
import NoDataFound from '../components/NoDataFound';
import AddEscalation from '../forms/Addescalation';
import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi';

interface EscalationRow {
  id: number;
  level: string;
  days: number;
  user: string;
}

const PAGE_SIZE = 10;

const initialEscalations: EscalationRow[] = [
  { id: 1, level: 'L1', days: 3, user: 'Sameer' },
  { id: 2, level: 'L2', days: 1, user: 'Aniket' },
  { id: 3, level: 'L3', days: 2, user: 'Priya' },
  { id: 4, level: 'L1', days: 4, user: 'Neha' },
];

const Escalations: React.FC = () => {
  const [rows, setRows] = useState<EscalationRow[]>(initialEscalations);
  const [showSearch, setShowSearch] = useState(false);
  const [searchLevel, setSearchLevel] = useState('');
  const [searchDays, setSearchDays] = useState('');
  const [searchUser, setSearchUser] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = rows.filter((row) =>
    row.level.toLowerCase().includes(searchLevel.toLowerCase()) &&
    row.user.toLowerCase().includes(searchUser.toLowerCase()) &&
    (searchDays === '' || row.days.toString().includes(searchDays))
  );

  useEffect(() => setPage(1), [searchLevel, searchUser, searchDays, rows]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const columns = [
    { label: 'Action', align: 'center' as const },
    { label: 'Level', align: 'center' as const },
    { label: 'Escalation In Days', align: 'center' as const },
    { label: 'Users', align: 'center' as const },
  ];

  const handleToggleSearch = () => {
    setShowSearch((prev) => !prev);
    if (showSearch) {
      setSearchLevel('');
      setSearchDays('');
      setSearchUser('');
    }
  };

  const handleDelete = (id: number) => {
    setRows(prev => prev.filter(row => row.id !== id));
  };

  return (
    <div className="p-5" style={{ fontFamily: "'PT Sans', sans-serif" }}>
      {/* Top Control Row */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <SearchIcon onClick={handleToggleSearch} />

        <button
          className="flex items-center gap-1 rounded border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
          onClick={() => setShowAddForm(true)}
        >
          Add Escalations
        </button>

        <div className="ml-auto">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={filtered.length}
            onPageChange={setPage}
            showControls
          />
        </div>
      </div>

      {/* Add Escalation Form */}
      {showAddForm && (
        <AddEscalation
          users={['Sameer', 'Aniket', 'Priya', 'Neha']}
          onSubmit={(newEscalation) => {
            setRows((prev) => [
              ...prev,
              { id: prev.length + 1, ...newEscalation },
            ]);
            setShowAddForm(false);
          }}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Escalation Table */}
      <div className="overflow-x-auto rounded border text-gray-700 border-gray-200 mt-4">
        <table className="w-full table-fixed text-sm">
          {/* Table Headers */}
          <TableHead columns={columns} />

          {/* Column Search Row (without search icons) */}
          {showSearch && (
            <thead>
              <tr className="bg-white">
                <th className="px-4 py-2" />
                <th className="px-4 py-2 text-center">
                  <TextInput
                    name="searchLevel"
                    value={searchLevel}
                    onChange={(e) => setSearchLevel(e.target.value)}
                    placeholder="Search Level"
                    label=""
                    type="search"
                  />
                </th>
                <th className="px-4 py-2 text-center">
                  <TextInput
                    name="searchDays"
                    value={searchDays}
                    onChange={(e) => setSearchDays(e.target.value)}
                    placeholder="Search Days"
                    label=""
                    type="search"
                  />
                </th>
                <th className="px-4 py-2 text-center">
                  <TextInput
                    name="searchUser"
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                    placeholder="Search User"
                    label=""
                    type="search"
                  />
                </th>
              </tr>
            </thead>
          )}

          {/* Table Body */}
          <tbody>
            {pageRows.length ? (
              pageRows.map((row) => (
                <tr key={row.id} className="border-b">
                  <td className="border-r px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
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
                  <td className="px-4 py-3 text-center">{row.level}</td>
                  <td className="px-4 py-3 text-center">{row.days}</td>
                  <td className="px-4 py-3 text-center">{row.user}</td>
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

export default Escalations;
