import React, { useState } from "react";
import {
  FiSearch,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiEdit,
   FiTrash2
} from "react-icons/fi";

import TextInput from "../components/TextInput";
import IconButton from "../components/IconButton";
import NoDataFound from "../components/NoDataFound";
import AddIncidentStatus from "../forms/Addincidentstatus";
import TopHead from "../components/TopHead";

interface StatusRow {
  id: number;
  label: string;
}

const PAGE_SIZE = 5;
const INITIAL_STATUSES: StatusRow[] = [
  { id: 1, label: "Pending" },
  { id: 2, label: "Completed" },
  { id: 3, label: "On Hold" },
  { id: 4, label: "In Active" },
];

const IncidentStatus: React.FC = () => {
  const [rows, setRows] = useState<StatusRow[]>(INITIAL_STATUSES);
  const [labelFilter, setLabelFilter] = useState("");
  const [page, setPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const filtered = searchOpen
    ? rows.filter((r) =>
        r.label.toLowerCase().includes(labelFilter.trim().toLowerCase())
      )
    : rows;

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const startIdx = (page - 1) * PAGE_SIZE;
  const pageRows = filtered.slice(startIdx, startIdx + PAGE_SIZE);

  const handleAddSubmit = (label: string) => {
    setRows((prev) => [...prev, { id: Date.now(), label }]);
    setShowAddForm(false);
  };
  
  const handleDelete = (id: number) => {
    setRows(prev => prev.filter(row => row.id !== id));
  };

  return (
    <div className="p-4 text-gray-700" style={{ fontFamily: "'PT Sans', sans-serif" }}>
      {/* Top Control Row */}
      <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
        <div className="flex items-center gap-2">
          <IconButton
            tooltip={searchOpen ? "Close search" : "Search"}
            onClick={() => {
              setSearchOpen(!searchOpen);
              if (searchOpen) setLabelFilter("");
            }}
          >
            <FiSearch />
          </IconButton>

          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="border px-4 py-[6px] rounded text-sm bg-white shadow-sm hover:bg-gray-100 transition"
          >
            <FiPlus className="inline-block mr-1" />
            Add Status
          </button>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-2 text-sm ml-auto">
          {`${startIdx + 1}-${startIdx + pageRows.length} of ${filtered.length}`}
          <IconButton
            tooltip="Previous page"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className={page === 1 ? "opacity-40 cursor-not-allowed" : ""}
          >
            <FiChevronLeft />
          </IconButton>
          <IconButton
            tooltip="Next page"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className={page === totalPages ? "opacity-40 cursor-not-allowed" : ""}
          >
            <FiChevronRight />
          </IconButton>
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <AddIncidentStatus
          onSubmit={handleAddSubmit}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Table */}
      <div className="border rounded overflow-x-auto">
        {pageRows.length === 0 ? (
          <NoDataFound message="No incident‑status records found." />
        ) : (
          <table className="w-full table-fixed text-sm border-collapse">
            <TopHead columns={[{ label: "Action", align: "center" }, { label: "Status" }]} />
            
            {searchOpen && (
              <thead>
                <tr className="bg-white">
                  <th className="p-2 border"></th>
                  <th className="p-2 border">
                    <TextInput
                      placeholder="Search Status"
                      value={labelFilter}
                      onChange={(e) => {
                        setLabelFilter(e.target.value);
                        setPage(1);
                      }}
                      className="w-full text-sm"
                      label=""
                    />
                  </th>
                </tr>
              </thead>
            )}

            <tbody>
              {pageRows.map(({ id, label }) => (
                <tr key={id} className="border-b hover:bg-gray-50">
                  <td className="p-2 border text-center">
                    <div className="flex items-center justify-center gap-4">
                      <IconButton tooltip="View" onClick={() => alert(`View ${label}`)}>
                        <FiEye />
                      </IconButton>
                      <IconButton tooltip="Edit" onClick={() => alert(`Edit ${label}`)}>
                        <FiEdit />
                      </IconButton>
                      <IconButton tooltip="Delete" onClick={() => handleDelete(id)}>
                        <FiTrash2 />
                      </IconButton>
                    </div>
                  </td>
                  <td className="p-2 border">{label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default IncidentStatus;
