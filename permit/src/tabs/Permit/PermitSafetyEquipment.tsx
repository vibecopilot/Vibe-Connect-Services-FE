import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import TableHead from "../../components/TopHead";
import TopSearch from "../../components/TopSearch";
import IconButton from "../../components/IconButton";
import NoDataFound from "../../components/NoDataFound";
import Pagination from "../../components/Pagination";

interface PermitSafetyEquipmentItem {
  id: number;
  type: string;
  activity: string;
  subActivity: string;
  hazardCategory: string;
  safetyEquipment: string;
}

const permitTypes = ["Hot Work", "Cold Work", "Event", "Height Work"];
const permitActivities = ["CCTV install", "Water supply", "Dance", "Fashion show", "Chiller system work"];
const permitSubActivities = ["Cable laying", "Pipe fitting", "Sound check", "Ramp setup", "Valve tightening"];
const hazardCategories = ["Fire", "Electrical", "Mechanical", "Chemical", "Noise"];
const permitSafetyEquipments = ["Helmet", "Gloves", "Safety Shoes", "Goggles", "Harness"];

const PermitSafetyEquipment: React.FC = () => {
  const [search, setSearch] = useState("");
  const [typeSearchTerm, setTypeSearchTerm] = useState("");
  const [activitySearchTerm, setActivitySearchTerm] = useState("");
  const [subActivitySearchTerm, setSubActivitySearchTerm] = useState("");
  const [hazardCategorySearchTerm, setHazardCategorySearchTerm] = useState("");
  const [safetyEquipmentSearchTerm, setSafetyEquipmentSearchTerm] = useState("");
  const [showFilterRow, setShowFilterRow] = useState(false);
  
  const [data, setData] = useState<PermitSafetyEquipmentItem[]>([
    {
      id: 1,
      type: "Hot Work",
      activity: "CCTV install",
      subActivity: "Cable laying",
      hazardCategory: "Fire",
      safetyEquipment: "Gloves",
    },
    {
      id: 2,
      type: "Cold Work",
      activity: "Water supply",
      subActivity: "Pipe fitting",
      hazardCategory: "Mechanical",
      safetyEquipment: "Helmet",
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newType, setNewType] = useState("");
  const [newActivity, setNewActivity] = useState("");
  const [newSubActivity, setNewSubActivity] = useState("");
  const [newHazardCategory, setNewHazardCategory] = useState("");
  const [newSafetyEquipment, setNewSafetyEquipment] = useState("");
  const [error, setError] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleAddClick = () => {
    setIsAdding(true);
    setNewType("");
    setNewActivity("");
    setNewSubActivity("");
    setNewHazardCategory("");
    setNewSafetyEquipment("");
    setError("");
  };

  const handleCancel = () => {
    setIsAdding(false);
    setNewType("");
    setNewActivity("");
    setNewSubActivity("");
    setNewHazardCategory("");
    setNewSafetyEquipment("");
    setEditId(null);
    setError("");
  };

  const handleSubmit = () => {
    if (!newType || !newActivity || !newSubActivity || !newHazardCategory || !newSafetyEquipment) {
      setError("Please select all fields.");
      return;
    }

    if (editId !== null) {
      setData((prev) =>
        prev.map((item) =>
          item.id === editId
            ? {
                ...item,
                type: newType,
                activity: newActivity,
                subActivity: newSubActivity,
                hazardCategory: newHazardCategory,
                safetyEquipment: newSafetyEquipment,
              }
            : item
        )
      );
      setEditId(null);
    } else {
      setData([
        ...data,
        {
          id: Date.now(),
          type: newType.trim(),
          activity: newActivity.trim(),
          subActivity: newSubActivity.trim(),
          hazardCategory: newHazardCategory.trim(),
          safetyEquipment: newSafetyEquipment.trim(),
        },
      ]);
    }

    setIsAdding(false);
    setNewType("");
    setNewActivity("");
    setNewSubActivity("");
    setNewHazardCategory("");
    setNewSafetyEquipment("");
    setError("");
  };

  const handleEdit = (item: PermitSafetyEquipmentItem) => {
    setIsAdding(true);
    setNewType(item.type);
    setNewActivity(item.activity);
    setNewSubActivity(item.subActivity);
    setNewHazardCategory(item.hazardCategory);
    setNewSafetyEquipment(item.safetyEquipment);
    setEditId(item.id);
    setError("");
  };

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredData = data.filter((item) => {
    const matchesGlobalSearch = search === "" || 
      item.activity.toLowerCase().includes(search.toLowerCase()) ||
      item.type.toLowerCase().includes(search.toLowerCase()) ||
      item.subActivity.toLowerCase().includes(search.toLowerCase()) ||
      item.hazardCategory.toLowerCase().includes(search.toLowerCase()) ||
      item.safetyEquipment.toLowerCase().includes(search.toLowerCase());
    
    const matchesTypeFilter = typeSearchTerm === "" || 
      item.type.toLowerCase().includes(typeSearchTerm.toLowerCase());
    
    const matchesActivityFilter = activitySearchTerm === "" || 
      item.activity.toLowerCase().includes(activitySearchTerm.toLowerCase());

    const matchesSubActivityFilter = subActivitySearchTerm === "" || 
      item.subActivity.toLowerCase().includes(subActivitySearchTerm.toLowerCase());

    const matchesHazardCategoryFilter = hazardCategorySearchTerm === "" || 
      item.hazardCategory.toLowerCase().includes(hazardCategorySearchTerm.toLowerCase());

    const matchesSafetyEquipmentFilter = safetyEquipmentSearchTerm === "" || 
      item.safetyEquipment.toLowerCase().includes(safetyEquipmentSearchTerm.toLowerCase());

    return matchesGlobalSearch && matchesTypeFilter && matchesActivityFilter && 
           matchesSubActivityFilter && matchesHazardCategoryFilter && matchesSafetyEquipmentFilter;
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { label: "Actions", align: "center" },
    { label: "Permit Type" },
    { label: "Permit Activity" },
    { label: "Permit Sub Activity" },
    { label: "Permit Hazard Category" },
    { label: "Permit Safety Equipment" },
  ];

  return (
    <div className="p-4 bg-white ">
      <div className="flex justify-between items-center">
        <TopSearch
          onSearch={() => setShowFilterRow((prev) => !prev)}
          onButtonClick={handleAddClick}
          buttons={["New Safety Equipment"]}
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

            {/* Permit Sub Activity Dropdown */}
            <select
              value={newSubActivity}
              onChange={(e) => setNewSubActivity(e.target.value)}
              className="flex-1 min-w-[150px] px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Permit Sub Activity --</option>
              {permitSubActivities.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            {/* Hazard Category Dropdown */}
            <select
              value={newHazardCategory}
              onChange={(e) => setNewHazardCategory(e.target.value)}
              className="flex-1 min-w-[150px] px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Hazard Category --</option>
              {hazardCategories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            {/* Safety Equipment Dropdown */}
            <select
              value={newSafetyEquipment}
              onChange={(e) => setNewSafetyEquipment(e.target.value)}
              className="flex-1 min-w-[150px] px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Safety Equipment --</option>
              {permitSafetyEquipments.map((option) => (
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
        <table className="min-w-full table-auto ">
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
                <td className="p-2 border-b border-gray-400">
                  <input
                    value={subActivitySearchTerm}
                    onChange={(e) => setSubActivitySearchTerm(e.target.value)}
                    placeholder="Search Sub Activity"
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  />
                </td>
                <td className="p-2 border-b border-gray-400">
                  <input
                    value={hazardCategorySearchTerm}
                    onChange={(e) => setHazardCategorySearchTerm(e.target.value)}
                    placeholder="Search Hazard Category"
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  />
                </td>
                <td className="p-2 border-b border-gray-400">
                  <input
                    value={safetyEquipmentSearchTerm}
                    onChange={(e) => setSafetyEquipmentSearchTerm(e.target.value)}
                    placeholder="Search Safety Equipment"
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
                  <td className="p-3 border-b border-gray-400">{item.subActivity}</td>
                  <td className="p-3 border-b border-gray-400">{item.hazardCategory}</td>
                  <td className="p-3 border-b border-gray-400">{item.safetyEquipment}</td>
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

export default PermitSafetyEquipment; 