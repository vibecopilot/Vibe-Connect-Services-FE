import React, { useState } from 'react';
import { Card } from '../../components/Card';
import TopHead from '../../components/TopHead';
import IconButton from '../../components/IconButton';
import Pagination from '../../components/Pagination';
import { FiEdit, FiTrash } from 'react-icons/fi';

const Status = () => {
  const [status, setStatus] = useState('');
  const [color, setColor] = useState('#00C853');
  const [order, setOrder] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleAdd = () => {
    if (status && order) {
      setData([
        ...data,
        {
          status,
          color,
          order,
          secondVisit: false,
          canCancel: false,
        },
      ]);
      setStatus('');
      setColor('#00C853');
      setOrder('');
    }
  };

  const handleDelete = (idx: number) => {
    setData(data.filter((_, i) => i !== idx));
  };

  const columns = [
    { label: 'Action', align: 'left' as const },
    { label: 'Order', align: 'left' as const },
    { label: 'Status', align: 'left' as const },
    { label: 'Second Visit', align: 'left' as const },
    { label: 'Can Cancel', align: 'left' as const },
    { label: 'Color', align: 'left' as const },
  ];

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Card className="p-4 bg-transparent border-none shadow-none">
      {/* Input Row */}
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        {/* Status Dropdown */}
        <select
          className="border rounded px-2 py-1 text-sm w-44"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="">Enter Status</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
        </select>

        {/* Color Input + Picker */}
        <div className="relative flex items-center">
          <input
            type="text"
            className="border rounded-l px-2 py-1 text-sm w-44"
            placeholder="Enter color hex"
            value={color}
            onChange={e => setColor(e.target.value)}
          />
          <input
            type="color"
            value={color}
            onChange={e => setColor(e.target.value)}
            className="h-[36px] w-10 border border-l-0 border-gray-300 rounded-r cursor-pointer"
          />
        </div>

        {/* Order Input */}
        <input
          className="border rounded px-2 py-1 text-sm w-44"
          placeholder="Enter Status Order"
          value={order}
          onChange={e => setOrder(e.target.value)}
        />

        {/* Add Button */}
        <button
          className="bg-[#7991BB] px-4 py-2 text-white rounded"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-gray text-sm">
          <TopHead columns={columns} />
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-8">
                  No Data Found
                </td>
              </tr>
            ) : (
              paginatedData.map((row, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-2 py-1 flex gap-2">
                    <IconButton tooltip="Edit">
                      <FiEdit size={16} />
                    </IconButton>
                    <IconButton
                      tooltip="Delete"
                      onClick={() => handleDelete((currentPage - 1) * itemsPerPage + idx)}
                    >
                      <FiTrash size={16} />
                    </IconButton>
                  </td>
                  <td className="px-2 py-1">{row.order}</td>
                  <td className="px-2 py-1">{row.status}</td>
                  <td className="px-2 py-1 text-center">
                    <input type="checkbox" checked={row.secondVisit} readOnly />
                  </td>
                  <td className="px-2 py-1 text-center">
                    <input type="checkbox" checked={row.canCancel} readOnly />
                  </td>
                  <td className="px-2 py-1 flex items-center gap-2">
                    <span>{row.color}</span>
                    <span
                      style={{
                        background: row.color,
                        width: 16,
                        height: 16,
                        display: 'inline-block',
                        borderRadius: 3,
                        border: '1px solid #ccc',
                      }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-2 flex justify-end">
        {/* <Pagination
          currentPage={currentPage}
          totalPages={Math.max(1, Math.ceil(data.length / itemsPerPage))}
          totalItems={data.length}
          onPageChange={setCurrentPage}
        /> */}
      </div>
    </Card>
  );
};

export default Status;
