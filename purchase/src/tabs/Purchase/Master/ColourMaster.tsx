import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import TableHead from "../../../components/TopHead";
import TopSearch from "../../../components/TopSearch";
import IconButton from "../../../components/IconButton";
import NoDataFound from "../../../components/NoDataFound";
import Pagination from "../../../components/Pagination";
import ColourMasterForm from "../../../forms/ColourMasterForm";
import FormModal from "../../../components/FormModal";

interface ColourItem {
  id: number;
  material: string;
  name: string;
  code: string;
}

interface ColourMasterProps{
  onModalStateChange?: (isOpen: boolean) => void;
}

const ColourMaster: React.FC<ColourMasterProps> = ({onModalStateChange}) => {
  const [searchFilters, setSearchFilters] = useState({
    material: "",
    name: "",
    code: "",
  });

  const [data, setData] = useState<ColourItem[]>([]);
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Omit<ColourItem, "id" | "description"> & { description?: string }>({
    material: "",
    name: "",
    code: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});
  const [editId, setEditId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setData([
      { id: 1, material: "Steel", name: "Red", code: "#FF0000" },
      { id: 2, material: "Plastic", name: "Green", code: "#00FF00" },
    ]);
  }, []);

  // Notify parent component when modal state changes
  useEffect(() => {
    if (onModalStateChange) {
      onModalStateChange(showForm);
    }
  }, [showForm, onModalStateChange]);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.material.trim()) newErrors.material = "Material is required.";
    if (!formData.name.trim()) newErrors.name = "Colour Name is required.";
    if (!formData.code.trim()) newErrors.code = "Colour Code is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddClick = () => {
    setFormData({ material: "", name: "", code: "" });
    setEditId(null);
    setShowForm(true);
    setErrors({});
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditId(null);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (editId !== null) {
      setData((prev) =>
        prev.map((item) => (item.id === editId ? { id: editId, description: item.description, ...formData } : item))
      );
    } else {
      setData([...data, { id: Date.now(), description: "", ...formData }]);
    }
    setShowForm(false);
    setFormData({ material: "", name: "", code: "" });
    setEditId(null);
    setErrors({});
  };

  const handleEdit = (item: ColourItem) => {
    setFormData({ material: item.material, name: item.name, code: item.code });
    setEditId(item.id);
    setShowForm(true);
    setErrors({});
  };

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleFilterChange = (key: keyof typeof searchFilters, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredData = data.filter((item) =>
    Object.entries(searchFilters).every(([key, val]) =>
      val === "" || item[key as keyof typeof searchFilters]?.toLowerCase().includes(val.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { label: "Actions", align: "center" },
    { label: "Material" },
    { label: "Colour Name" },
    { label: "Colour Code" },
  ];

  const uniqueMaterials = Array.from(new Set(data.map((item) => item.material)));

  return (
    <>
      <div className="p-4 bg-white">
      <div className="flex justify-between items-center">
        <TopSearch
          onSearch={() => setShowFilterRow((prev) => !prev)}
          onButtonClick={handleAddClick}
          buttons={["New Colour"]}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredData.length / itemsPerPage)}
          totalItems={filteredData.length}
          onPageChange={setCurrentPage}
        />
      </div>


      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto">
          <TableHead columns={columns} />
          <tbody>
            {showFilterRow && (
              <tr>
                <td className="p-2 border-b border-gray-400 text-center" />
                <td className="p-2 border-b border-gray-400">
                  <select
                    value={searchFilters.material}
                    onChange={(e) => handleFilterChange("material", e.target.value)}
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  >
                    <option value="">All Materials</option>
                    {uniqueMaterials.map((mat) => (
                      <option key={mat} value={mat}>
                        {mat}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-2 border-b border-gray-400">
                  <input
                    value={searchFilters.name}
                    onChange={(e) => handleFilterChange("name", e.target.value)}
                    placeholder="Search Colour Name"
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  />
                </td>
                <td className="p-2 border-b border-gray-400">
                  <input
                    value={searchFilters.code}
                    onChange={(e) => handleFilterChange("code", e.target.value)}
                    placeholder="Search Colour Code"
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  />
                </td>
              </tr>
            )}

            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b border-gray-400 text-center space-x-3">
                    <IconButton tooltip="Edit" className="hover:text-green-600" onClick={() => handleEdit(item)}>
                      <FiEdit />
                    </IconButton>
                    <IconButton tooltip="Delete" className="hover:text-red-600" onClick={() => handleDelete(item.id)}>
                      <FiTrash2 />
                    </IconButton>
                  </td>
                  <td className="p-3 border-b border-gray-400">{item.material}</td>
                  <td className="p-3 border-b border-gray-400">{item.name}</td>
                  <td className="p-3 border-b border-gray-400">{item.code}</td>
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
    <FormModal isOpen={showForm} onClose={handleCancel}>
      <div className="my-4">
          <ColourMasterForm
            formData={formData}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            errors={errors}
            isEditing={editId !== null}
          />
        </div>
    </FormModal>
    </>
  );
};

export default ColourMaster;
