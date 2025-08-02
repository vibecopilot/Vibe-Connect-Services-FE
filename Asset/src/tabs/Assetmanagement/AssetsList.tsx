import React, { useState } from 'react';
import { FiSearch, FiEdit, FiTrash2, FiEye } from 'react-icons/fi';
import NoDataFound from '../../components/NoDataFound';
import TableHead from '../../components/TopHead';
import Pagination from '../../components/Pagination';
import AddAssetForm from '../../forms/AddAssetForm';
import IconButton from '../../components/IconButton';
import { useNavigate } from 'react-router-dom';

const PAGE_SIZE = 10;

const AssetsTab: React.FC = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [editingAsset, setEditingAsset] = useState<any | null>(null);
  const navigate = useNavigate();

  // Example data (replace with your real data source)
  const [data] = useState<any[]>([
    {
      assets: 'Anurag',
      building: 'Digi',
      floor: '1st Floor',
      unit: '-',
      assetsno: '-',
      equipmentid: '-',
      oemname: '-',
      serialnumber: '374520',
    },
  ]);

  const columns = [
    'Action',
    'Assets',
    'Building',
    'Floor',
    'Unit',
    'Assets No.',
    'Equipment ID',
    'OEM Name',
    'Serial Number',
  ];

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const paginatedData = filteredData.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className="p-4 bg-white rounded-md shadow-md" style={{ fontFamily: "'PT Sans', sans-serif" }}>
      {editingAsset ? (
        <div className="mb-4">
          <AddAssetForm
            initialData={editingAsset}
            onClose={() => setEditingAsset(null)}
          />
        </div>
      ) : (
        <>
          {/* Top Buttons */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="flex gap-2 items-center">
              <button
                aria-label="Search"
                className="text-xl"
                onClick={() => setSearchActive(!searchActive)}
              >
                <FiSearch />
              </button>
              <button
                className="bg-[#7991BB] text-white px-3 py-1 rounded transition"
                onClick={() => navigate('/addasset')}
              >
                + Add Assets
              </button>
              <button className="bg-gray-100 px-3 py-1 rounded border">QR Code</button>
              <button className="bg-gray-100 px-3 py-1 rounded border">Hide Columns</button>
              <button className="bg-gray-100 px-3 py-1 rounded border">Import</button>
            </div>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              totalItems={filteredData.length}
              onPageChange={setPage}
              showControls={true}
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200">
              <TableHead columns={columns.map((label) => ({ label }))} />
              <thead>
                {searchActive && (
                  <tr>
                    {columns.map((col, idx) => (
                      <td key={col} className="border px-2 py-1">
                        {idx === columns.length - 1 ? (
                          <button className="bg-gray-200 text-sm px-2 py-1 rounded" disabled>
                            Go
                          </button>
                        ) : (
                          <input
                            type="text"
                            className="w-full border rounded px-1 py-0.5 text-sm"
                            placeholder={`Search ${col}`}
                            onChange={(e) => setSearchValue(e.target.value)}
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                )}
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      {columns.map((col, colIdx) => (
                        <td key={colIdx} className="p-2 border-b">
                          {col === 'Action' ? (
                            <span className="inline-flex items-center gap-2">
                              <IconButton tooltip="Edit" onClick={() => setEditingAsset(item)}>
                                <FiEdit />
                              </IconButton>
                              <IconButton tooltip="Delete" onClick={() => {/* handle delete */}}>
                                <FiTrash2 />
                              </IconButton>
                              <IconButton tooltip="View" onClick={() => {/* handle view */}}>
                                <FiEye />
                              </IconButton>
                            </span>
                          ) : (
                            item[col.toLowerCase().replace(/\s/g, '')] || '-'
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length} className="text-center py-6 text-gray-500">
                      <NoDataFound />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AssetsTab;
