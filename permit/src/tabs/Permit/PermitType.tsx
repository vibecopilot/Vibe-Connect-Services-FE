import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import TableHead from "../../components/TopHead";
import TopSearch from "../../components/TopSearch";
import IconButton from "../../components/IconButton";
import NoDataFound from "../../components/NoDataFound";
import Pagination from "../../components/Pagination";

interface PermitTypeItem {
  id: number;
  type: string;
}

const permitOptions = ["Hot Work", "Cold Work", "Event", "Height Work"];

const PermitType: React.FC = () => {
  const [search, setSearch] = useState("");
  const [typeSearchTerm, setTypeSearchTerm] = useState("");
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [data, setData] = useState<PermitTypeItem[]>([
    { id: 1, type: "Hot Work" },
    { id: 2, type: "Cold Work" },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newPermitType, setNewPermitType] = useState("");
  const [error, setError] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleAddClick = () => {
    setIsAdding(true);
    setNewPermitType("");
    setError("");
  };

  const handleCancel = () => {
    setIsAdding(false);
    setNewPermitType("");
    setEditId(null);
    setError("");
  };

  const handleSubmit = () => {
    if (!newPermitType.trim()) {
      setError("Please select a permit type.");
      return;
    }

    if (editId !== null) {
      setData((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...item, type: newPermitType.trim() } : item
        )
      );
      setEditId(null);
    } else {
      setData([...data, { id: Date.now(), type: newPermitType.trim() }]);
    }

    setIsAdding(false);
    setNewPermitType("");
    setError("");
  };

  const handleEdit = (item: PermitTypeItem) => {
    setIsAdding(true);
    setNewPermitType(item.type);
    setEditId(item.id);
    setError("");
  };

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredData = data.filter((item) => {
    const matchesGlobalSearch = search === "" || 
      item.type.toLowerCase().includes(search.toLowerCase());
    
    const matchesTypeFilter = typeSearchTerm === "" || 
      item.type.toLowerCase().includes(typeSearchTerm.toLowerCase());

    return matchesGlobalSearch && matchesTypeFilter;
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { label: "Actions", align: "center" },
    { label: "Permit Type" },
  ];

  return (
    <div className="p-4 bg-white">
      <div className="flex justify-between items-center">
        <TopSearch
          onSearch={() => setShowFilterRow((prev) => !prev)}
          onButtonClick={handleAddClick}
          buttons={["New Permit Type"]}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredData.length / itemsPerPage)}
          totalItems={filteredData.length}
          onPageChange={setCurrentPage}
        />
      </div>

      {isAdding && (
        <div className="bg-gray-50 border border-gray-200 rounded p-4 my-4">
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            {/* Permit Type Dropdown */}
            <select
              value={newPermitType}
              onChange={(e) => setNewPermitType(e.target.value)}
              className="flex-1 min-w-[150px] px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Permit Type --</option>
              {permitOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {editId !== null ? "Update" : "Submit"}
            </button>

            {/* Cancel Button */}
            <button
              onClick={handleCancel}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>

          {/* Validation Error Below */}
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>
      )}

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto">
          <TableHead columns={columns} />
          <tbody>
            {showFilterRow && (
              <tr>
                <td className="p-2 border-b border-gray-400 text-center" />
                <td className="p-2 border-b border-gray-400">
                  <input
                    value={typeSearchTerm}
                    onChange={(e) => setTypeSearchTerm(e.target.value)}
                    placeholder="Search Permit Type"
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  />
                </td>
              </tr>
            )}

            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b border-gray-400 text-center space-x-3">
                    <IconButton
                      tooltip="Edit"
                      className="hover:text-green-600"
                      onClick={() => handleEdit(item)}
                    >
                      <FiEdit />
                    </IconButton>
                    <IconButton
                      tooltip="Delete"
                      className="hover:text-red-600"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FiTrash2 />
                    </IconButton>
                  </td>
                  <td className="p-3 border-b border-gray-400">{item.type}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-4 text-gray-500">
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

export default PermitType;