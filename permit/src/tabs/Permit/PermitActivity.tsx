import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import TableHead from "../../components/TopHead";
import TopSearch from "../../components/TopSearch";
import IconButton from "../../components/IconButton";
import NoDataFound from "../../components/NoDataFound";
import Pagination from "../../components/Pagination";

interface PermitActivityItem {
  id: number;
  type: string;
  activity: string;
}

const permitTypes = ["Hot Work", "Cold Work", "Event", "Height Work"];

const permitActivities = [
  "CCTV install",
  "Water supply",
  "Dance",
  "Fashion show",
  "Chiller system work",
];

const PermitActivity: React.FC = () => {
  const [search, setSearch] = useState("");
  const [typeSearchTerm, setTypeSearchTerm] = useState("");
  const [activitySearchTerm, setActivitySearchTerm] = useState("");
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [data, setData] = useState<PermitActivityItem[]>([
    { id: 1, type: "Hot Work", activity: "CCTV install" },
    { id: 2, type: "Cold Work", activity: "Water supply" },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newType, setNewType] = useState("");
  const [newActivity, setNewActivity] = useState("");
  const [error, setError] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleAddClick = () => {
    setIsAdding(true);
    setNewType("");
    setNewActivity("");
    setError("");
  };

  const handleCancel = () => {
    setIsAdding(false);
    setNewType("");
    setNewActivity("");
    setEditId(null);
    setError("");
  };

  const handleSubmit = () => {
    if (!newType || !newActivity) {
      setError("Please select both permit type and activity.");
      return;
    }

    if (editId !== null) {
      setData((prev) =>
        prev.map((item) =>
          item.id === editId
            ? { ...item, type: newType, activity: newActivity }
            : item
        )
      );
      setEditId(null);
    } else {
      setData([
        ...data,
        { id: Date.now(), type: newType.trim(), activity: newActivity.trim() },
      ]);
    }

    setIsAdding(false);
    setNewType("");
    setNewActivity("");
    setError("");
  };

  const handleEdit = (item: PermitActivityItem) => {
    setIsAdding(true);
    setNewType(item.type);
    setNewActivity(item.activity);
    setEditId(item.id);
    setError("");
  };

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredData = data.filter((item) => {
    const matchesGlobalSearch = search === "" || 
      item.activity.toLowerCase().includes(search.toLowerCase()) ||
      item.type.toLowerCase().includes(search.toLowerCase());
    
    const matchesTypeFilter = typeSearchTerm === "" || 
      item.type.toLowerCase().includes(typeSearchTerm.toLowerCase());
    
    const matchesActivityFilter = activitySearchTerm === "" || 
      item.activity.toLowerCase().includes(activitySearchTerm.toLowerCase());

    return matchesGlobalSearch && matchesTypeFilter && matchesActivityFilter;
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { label: "Actions", align: "center" },
    { label: "Permit Type" },
    { label: "Permit Activity" },
  ];

  return (
    <div className="p-4 bg-white">
      <div className="flex justify-between items-center">
        <TopSearch
          onSearch={() => setShowFilterRow((prev) => !prev)}
          onButtonClick={handleAddClick}
          buttons={["New Permit Activity"]}
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
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              className="flex-1 min-w-[150px] px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Permit Type --</option>
              {permitTypes.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            {/* Permit Activity Dropdown */}
            <select
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              className="flex-1 min-w-[150px] px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Permit Activity --</option>
              {permitActivities.map((option) => (
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
        <table className="min-w-full table-autb border-gray-400">
          <TableHead columns={columns} />
          <tbody>
            {showFilterRow && (
              <tr >
                <td className="p-2 border-b border-gray-400 text-center" />
                <td className="p-2 border-b border-gray-400">
                  <input
                    value={typeSearchTerm}
                    onChange={(e) => setTypeSearchTerm(e.target.value)}
                    placeholder="Search Permit Type"
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  />
                </td>
                <td className="p-2 border-b border-gray-400">
                  <input
                    value={activitySearchTerm}
                    onChange={(e) => setActivitySearchTerm(e.target.value)}
                    placeholder="Search Permit Activity"
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
                  <td className="p-3 border-b border-gray-400">{item.activity}</td>
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

export default PermitActivity;