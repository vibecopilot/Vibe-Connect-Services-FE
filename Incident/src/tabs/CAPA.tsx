// src/pages/CAPA.tsx
import React, { useState } from 'react';
import { FiEye, FiEdit, FiSearch, FiFlag } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';

import TableHead from '../components/TopHead';
import IconButton from '../components/IconButton';
import NoDataFound from '../components/NoDataFound';
import Pagination from '../components/Pagination';
import Addcapa from '../forms/Addcapa';

interface CapaEntry {
  id: number;
  incidentNo: string;
  date: string;
  department: string;
  raisedBy: string;
  issueSummary?: string;
  correctiveAction: string;
  preventiveAction: string;
  owner: string;
  status: string;
  flag?: boolean;
}

const PAGE_SIZE = 10;

const initialData: CapaEntry[] = [
  {
    id: 1,
    incidentNo: 'INC-2025-01',
    date: '02-05-25',
    department: 'Maintenance',
    raisedBy: 'Aniket',
    correctiveAction: '',
    preventiveAction: 'Monthly pump check',
    owner: 'Neeraj',
    status: 'Closed',
    flag: true,
  },
  {
    id: 2,
    incidentNo: 'INC-2025-02',
    date: '02-05-25',
    department: 'Maintenance',
    raisedBy: 'Anurag',
    issueSummary: 'Gas Leak',
    correctiveAction: 'Valve replaced and area secured',
    preventiveAction: 'Install Gas Leak Sensors',
    owner: 'Ravi',
    status: 'Closed',
  },
];

const CAPA: React.FC = () => {
  const [page, setPage] = useState(1);
  const [isSearchShown, setSearch] = useState(false);
  const [searchValues, setSearchValues] = useState({
    incidentNo: '',
    date: '',
    department: '',
    raisedBy: '',
    issueSummary: '',
    correctiveAction: '',
    preventiveAction: '',
    owner: '',
    status: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const isAddMode = location.state?.mode === 'add';

  const openAddForm = () => {
    navigate('.', { state: { mode: 'add' }, replace: false });
  };

  if (isAddMode) return <Addcapa />;

  const filteredRows = initialData.filter((row) => {
    return (
      row.incidentNo.toLowerCase().includes(searchValues.incidentNo.toLowerCase()) &&
      row.date.toLowerCase().includes(searchValues.date.toLowerCase()) &&
      row.department.toLowerCase().includes(searchValues.department.toLowerCase()) &&
      row.raisedBy.toLowerCase().includes(searchValues.raisedBy.toLowerCase()) &&
      (row.issueSummary || '-').toLowerCase().includes(searchValues.issueSummary.toLowerCase()) &&
      (row.correctiveAction || '-').toLowerCase().includes(searchValues.correctiveAction.toLowerCase()) &&
      row.preventiveAction.toLowerCase().includes(searchValues.preventiveAction.toLowerCase()) &&
      row.owner.toLowerCase().includes(searchValues.owner.toLowerCase()) &&
      row.status.toLowerCase().includes(searchValues.status.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredRows.length / PAGE_SIZE) || 1;
  const pageRows = filteredRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const columns = [
    { label: 'Action', align: 'center' as const },
    { label: 'Incident No', align: 'center' as const },
    { label: 'Date', align: 'center' as const },
    { label: 'Department', align: 'center' as const },
    { label: 'Raised By', align: 'center' as const },
    { label: 'Issue Summary', align: 'center' as const },
    { label: 'Corrective Action', align: 'center' as const },
    { label: 'Preventive Action', align: 'center' as const },
    { label: 'Owner', align: 'center' as const },
    { label: 'Status', align: 'center' as const },
  ];

  return (
    <div className="p-5 text-gray-600" style={{ fontFamily: "'PT Sans', sans-serif" }}>
      {/* Top Bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="rounded p-2 hover:bg-gray-100" onClick={() => setSearch(!isSearchShown)}>
            <FiSearch size={18} />
          </button>

          <button
            className="rounded border border-gray-300 bg-white px-4 py-1.5 text-sm text-gray-800 hover:bg-gray-100"
            onClick={openAddForm}
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

      {/* Table */}
      <div className="overflow-x-auto rounded border border-gray-200">
        <table className="w-full table-fixed text-center" style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }}>
          <TableHead columns={columns} />
          {isSearchShown && (
            <thead>
              <tr className="bg-gray-50">
                <th></th>
                {Object.entries(searchValues).map(([key, value]) => (
                  <th key={key} className="p-2">
                    <input
                      type="text"
                      placeholder={`Search ${key}`}
                      value={value}
                      onChange={(e) => setSearchValues({ ...searchValues, [key]: e.target.value })}
                      className="w-full text-sm border rounded px-2 py-1 text-center"
                      style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }}
                    />
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {pageRows.length ? (
              pageRows.map((row) => (
                <tr key={row.id} className="border-b text-center">
                  <td className="whitespace-nowrap border-r px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <IconButton tooltip="View" onClick={() => {}}>
                        <FiEye />
                      </IconButton>
                      <IconButton tooltip="Edit" onClick={() => {}}>
                        <FiEdit />
                      </IconButton>
                      {row.flag && (
                        <span className="text-red-500">
                          <FiFlag />
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">{row.incidentNo}</td>
                  <td className="px-4 py-3">{row.date}</td>
                  <td className="px-4 py-3">{row.department}</td>
                  <td className="px-4 py-3">{row.raisedBy}</td>
                  <td className="px-4 py-3">{row.issueSummary || '-'}</td>
                  <td className="px-4 py-3">{row.correctiveAction || '-'}</td>
                  <td className="px-4 py-3">{row.preventiveAction}</td>
                  <td className="px-4 py-3">{row.owner}</td>
                  <td className="px-4 py-3">{row.status}</td>
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

export default CAPA;
