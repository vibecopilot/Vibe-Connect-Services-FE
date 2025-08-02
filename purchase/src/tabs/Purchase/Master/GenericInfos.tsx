import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import TableHead from "../../../components/TopHead";
import TopSearch from "../../../components/TopSearch";
import IconButton from "../../../components/IconButton";
import NoDataFound from "../../../components/NoDataFound";
import Pagination from "../../../components/Pagination";
import GenericInfosForm from "../../../forms/GenericInfosForm";
import FormModal from "../../../components/FormModal";

interface GenericInfoItem {
  id: number;
  material: string;
  genericInfo: string;
}

interface GenericInfosProps {
  onModalStateChange?: (isOpen: boolean) => void;
}

const GenericInfos: React.FC<GenericInfosProps> = ({onModalStateChange}) => {
  const [searchFilters, setSearchFilters] = useState({ material: "", genericInfo: "" });
  const [data, setData] = useState<GenericInfoItem[]>([]);
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Form state for controlled inputs
  const [formData, setFormData] = useState({ material: "", genericInfo: "" });
  const [errors, setErrors] = useState<{ material?: string; genericInfo?: string }>({});

  useEffect(() => {
    // Initialize with sample data
    setData([
      { id: 1, material: "Iron", genericInfo: "Strong and heavy" },
      { id: 2, material: "Copper", genericInfo: "Conducts electricity well" },
    ]);
  }, []);

  // When opening form for edit, populate formData
  useEffect(() => {
    if (editId !== null) {
      const item = data.find((d) => d.id === editId);
      if (item) {
        setFormData({ material: item.material, genericInfo: item.genericInfo });
      }
    } else {
      // reset form for add
      setFormData({ material: "", genericInfo: "" });
      setErrors({});
    }
  }, [editId, data]);

  // Notify parent component when modal state changes
    useEffect(() => {
      if (onModalStateChange) {
        onModalStateChange(showForm);
      }
    }, [showForm, onModalStateChange]);

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!formData.material) newErrors.material = "Material is required.";
    if (!formData.genericInfo) {
      newErrors.genericInfo = "Generic Info is required.";
    } else if (formData.genericInfo.length < 5) {
      newErrors.genericInfo = "Generic Info must be at least 5 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddClick = () => {
    setEditId(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditId(null);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editId !== null) {
      // Update existing item
      setData((prev) =>
        prev.map((item) =>
          item.id === editId ? { id: editId, material: formData.material, genericInfo: formData.genericInfo } : item
        )
      );
    } else {
      // Add new item
      setData((prev) => [...prev, { id: Date.now(), ...formData }]);
    }
    setShowForm(false);
    setEditId(null);
  };

  const handleEdit = (item: GenericInfoItem) => {
    setEditId(item.id);
    setShowForm(true);
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
    { label: "Generic Info" },
  ];

  // Controlled form input change handler
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="p-4 bg-white ">
      <div className="flex justify-between items-center">
        <TopSearch
          onSearch={() => setShowFilterRow((prev) => !prev)}
          onButtonClick={handleAddClick}
          buttons={["New Generic Info"]}
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
              <tr border-gray-400>
                <td className="p-2 border-b border-gray-400 text-center" />
                <td className="p-2 border-b border-gray-400">
                  <select
                    value={searchFilters.material}
                    onChange={(e) => handleFilterChange("material", e.target.value)}
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  >
                    <option value="">All Materials</option>
                    {["Iron", "Copper", "Steel", "Aluminum"].map((material) => (
                      <option key={material} value={material}>
                        {material}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-2 border-b border-gray-400">
                  <input
                    value={searchFilters.genericInfo}
                    onChange={(e) => handleFilterChange("genericInfo", e.target.value)}
                    placeholder="Search Generic Info"
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
                  <td className="p-3 border-b border-gray-400">{item.material}</td>
                  <td className="p-3 border-b border-gray-400">{item.genericInfo}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>
                  <NoDataFound message="No Generic Info found." />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    <FormModal isOpen={showForm} onClose={handleCancel}>
      <GenericInfosForm
          formData={formData}
          onChange={handleFormChange}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          errors={errors}
          isEditing={editId !== null}
        />
    </FormModal>
    </>
  );
};

export default GenericInfos;
