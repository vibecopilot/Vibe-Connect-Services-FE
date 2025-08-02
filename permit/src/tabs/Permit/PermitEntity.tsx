import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import TableHead from "../../components/TopHead";
import TopSearch from "../../components/TopSearch";
import IconButton from "../../components/IconButton";
import NoDataFound from "../../components/NoDataFound";
import Pagination from "../../components/Pagination";

interface PermitEntityItem {
  id: number;
  entityName: string;
  permitId: string;
  siteId: string;
  status: string;
}

const permitOptions = ["Hot Work", "Cold Work", "Event", "Height Work"];

const statusOptions = ["Active", "Inactive"];

const PermitEntity: React.FC = () => {
  const [search, setSearch] = useState("");
  const [entityNameSearchTerm, setEntityNameSearchTerm] = useState("");
  const [permitIdSearchTerm, setPermitIdSearchTerm] = useState("");
  const [siteIdSearchTerm, setSiteIdSearchTerm] = useState("");
  const [statusSearchTerm, setStatusSearchTerm] = useState("");
  const [newPermitType, setNewPermitType] = useState("");
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [data, setData] = useState<PermitEntityItem[]>([
    { id: 1, entityName: "Entity A", permitId: "P001", siteId: "S001", status: "Active" },
    { id: 2, entityName: "Entity B", permitId: "P002", siteId: "S002", status: "Inactive" },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newEntity, setNewEntity] = useState<Partial<PermitEntityItem>>({});
  const [error, setError] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleAddClick = () => {
    setIsAdding(true);
    setNewEntity({});
    setEditId(null);
    setError("");
  };

  const handleCancel = () => {
    setIsAdding(false);
    setNewEntity({});
    setEditId(null);
    setError("");
  };

  const handleSubmit = () => {
    if (!newPermitType.trim()) {
      setError("Entity Name is required.");
      return;
    }

    const payload = {
      entityName: newPermitType.trim(),
      permitId: newEntity.permitId?.trim() || "",
      siteId: newEntity.siteId?.trim() || "",
      status: newEntity.status || "Active",
    };

    if (editId !== null) {
      setData((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...item, ...payload } : item
        )
      );
      setEditId(null);
    } else {
      setData([...data, { id: Date.now(), ...payload } as PermitEntityItem]);
    }

    setIsAdding(false);
    setNewEntity({});
    setError("");
  };

  const handleEdit = (item: PermitEntityItem) => {
    setIsAdding(true);
    setNewEntity(item);
    setEditId(item.id);
    setError("");
  };

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredData = data.filter((item) => {
    const matchesGlobalSearch = search === "" || 
      item.entityName.toLowerCase().includes(search.toLowerCase()) ||
      item.permitId.toLowerCase().includes(search.toLowerCase()) ||
      item.siteId.toLowerCase().includes(search.toLowerCase()) ||
      item.status.toLowerCase().includes(search.toLowerCase());
    
    const matchesEntityNameFilter = entityNameSearchTerm === "" || 
      item.entityName.toLowerCase().includes(entityNameSearchTerm.toLowerCase());
    
    const matchesPermitIdFilter = permitIdSearchTerm === "" || 
      item.permitId.toLowerCase().includes(permitIdSearchTerm.toLowerCase());

    const matchesSiteIdFilter = siteIdSearchTerm === "" || 
      item.siteId.toLowerCase().includes(siteIdSearchTerm.toLowerCase());

    // Fixed status filtering - use exact match instead of includes
    const matchesStatusFilter = statusSearchTerm === "" || 
      item.status.toLowerCase() === statusSearchTerm.toLowerCase();

    return matchesGlobalSearch && matchesEntityNameFilter && matchesPermitIdFilter && matchesSiteIdFilter && matchesStatusFilter;
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { label: "Actions", align: "center" },
    { label: "Entity Name" },
    { label: "Permit ID" },
    { label: "Site ID" },
    { label: "Status" },
  ];

  return (
    <div className="p-4 bg-white">
      <div className="flex justify-between items-center">
        <TopSearch
          onSearch={() => setShowFilterRow((prev) => !prev)}
          onButtonClick={handleAddClick}
          buttons={["Add Entity"]}
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
            
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {editId !== null ? "Update" : "Submit"}
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cancel
            </button>
            
          </div>
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          
          
        </div>
      )}

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto">
          <TableHead columns={columns} />
          <tbody>
            {showFilterRow && (
              <tr >
                <td className="p-2 border-b border-gray-400 text-center" />
                <td className="p-2 border-b border-gray-400">
                  <input
                    value={entityNameSearchTerm}
                    onChange={(e) => setEntityNameSearchTerm(e.target.value)}
                    placeholder="Search Permit Type"
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  />
                </td>
                <td className="p-2 border-b border-gray-400">
                  <input
                    value={permitIdSearchTerm}
                    onChange={(e) => setPermitIdSearchTerm(e.target.value)}
                    placeholder="Search Permit ID"
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  />
                </td>
                <td className="p-2 border-b border-gray-400">
                  <input
                    value={siteIdSearchTerm}
                    onChange={(e) => setSiteIdSearchTerm(e.target.value)}
                    placeholder="Search Site ID"
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  />
                </td>
                <td className="p-2 border-b border-gray-400">
                  <select
                    value={statusSearchTerm}
                    onChange={(e) => setStatusSearchTerm(e.target.value)}
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  >
                    <option value="">All Status</option>
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
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
                  <td className="p-3 border-b border-gray-400">{item.entityName}</td>
                  <td className="p-3 border-b border-gray-400">{item.permitId}</td>
                  <td className="p-3 border-b border-gray-400">{item.siteId}</td>
                  <td className="p-3 border-b border-gray-400">{item.status}</td>
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

export default PermitEntity;