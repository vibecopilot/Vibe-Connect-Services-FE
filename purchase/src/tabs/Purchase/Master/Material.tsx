import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import TableHead from "../../../components/TopHead";
import TopSearch from "../../../components/TopSearch";
import IconButton from "../../../components/IconButton";
import NoDataFound from "../../../components/NoDataFound";
import Pagination from "../../../components/Pagination";
import MaterialsForm from "../../../forms/MaterialsForm";
import FormModal from "../../../components/FormModal";

interface MaterialItem {
  id: number;
  materialCategory: string;
  materialType: string;
  materialName: string;
  materialCode: string;
  leadTime: number;
  urgentLeadTime: number;
}

interface MaterialProps {
  onModalStateChange?: (isOpen: boolean) => void;
}

const Materials: React.FC<MaterialProps> = ({ onModalStateChange }) => {
  const [data, setData] = useState<MaterialItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    materialCategory: "",
    materialType: "",
    materialName: "",
    materialCode: "",
    leadTime: "",
    urgentLeadTime: "",
  });

  const [formData, setFormData] = useState({
    materialCategory: "",
    materialType: "",
    materialName: "",
    materialCode: "",
    leadTime: 0,
    urgentLeadTime: 0,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const itemsPerPage = 5;

  useEffect(() => {
    // Example initial data
    setData([
      {
        id: 1,
        materialCategory: "Raw Material",
        materialType: "Steel",
        materialName: "Steel Rod",
        materialCode: "MAT001",
        leadTime: 3,
        urgentLeadTime: 1,
      },
      {
        id: 2,
        materialCategory: "Finished Goods",
        materialType: "Plastic",
        materialName: "Plastic Sheet",
        materialCode: "MAT002",
        leadTime: 5,
        urgentLeadTime: 2,
      },
      {
        id: 3,
        materialCategory: "Raw Material",
        materialType: "Plastic",
        materialName: "Plastic Pellet",
        materialCode: "MAT003",
        leadTime: 4,
        urgentLeadTime: 1,
      },
    ]);
  }, []);

  useEffect(() => {
    if (editId !== null) {
      const item = data.find((d) => d.id === editId);
      if (item) setFormData(item);
    } else {
      setFormData({
        materialCategory: "",
        materialType: "",
        materialName: "",
        materialCode: "",
        leadTime: 0,
        urgentLeadTime: 0,
      });
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
    if (!formData.materialCategory)
      newErrors.materialCategory = "Material Category is required.";
    if (!formData.materialType)
      newErrors.materialType = "Material Type is required.";
    if (!formData.materialName)
      newErrors.materialName = "Material Name is required.";
    if (!formData.materialCode)
      newErrors.materialCode = "Material Code is required.";
    if (formData.leadTime <= 0)
      newErrors.leadTime = "Lead Time must be greater than 0.";
    if (formData.urgentLeadTime <= 0)
      newErrors.urgentLeadTime = "Urgent Lead Time must be greater than 0.";
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
      setData((prev) =>
        prev.map((item) =>
          item.id === editId ? { id: editId, ...formData } : item
        )
      );
    } else {
      setData((prev) => [...prev, { id: Date.now(), ...formData }]);
    }

    setShowForm(false);
    setEditId(null);
  };

  const handleEdit = (item: MaterialItem) => {
    setEditId(item.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleFilterChange = (
    key: keyof typeof searchFilters,
    value: string
  ) => {
    setSearchFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // reset to first page on filter change
  };

  // Get unique values for dropdown filters from current data
  const uniqueMaterialCategories = Array.from(
    new Set(data.map((d) => d.materialCategory))
  );
  const uniqueMaterialTypes = Array.from(
    new Set(data.map((d) => d.materialType))
  );

  const filteredData = data.filter((item) =>
    Object.entries(searchFilters).every(([key, val]) => {
      if (val === "") return true;
      const field = item[key as keyof typeof item];
      return field?.toString().toLowerCase().includes(val.toLowerCase());
    })
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { label: "Actions", align: "center" },
    { label: "Material Category" },
    { label: "Material Type" },
    { label: "Material Name" },
    { label: "Material Code" },
    { label: "Lead Time" },
    { label: "Urgent Lead Time" },
  ];

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "leadTime" || name === "urgentLeadTime"
          ? Number(value)
          : value,
    }));
  };

  return (
    <>
      <div className="p-4 bg-white">
        {/* Top bar with Search and Add button */}
        <div className="flex justify-between items-center">
          <TopSearch
            onSearch={() => setShowFilterRow((prev) => !prev)}
            onButtonClick={handleAddClick}
            buttons={["New Material"]}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredData.length / itemsPerPage)}
            totalItems={filteredData.length}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Table with filters */}
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full table-auto">
            <TableHead columns={columns} />

            {showFilterRow && (
              <tbody>
                <tr >
                  <td className="p-2 border-b border-gray-400 text-center" />

                  {/* Material Category filter dropdown */}
                  <td className="p-2 border-b border-gray-400"> 
                    <select
                      className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                      value={searchFilters.materialCategory}
                      onChange={(e) =>
                        handleFilterChange("materialCategory", e.target.value)
                      }
                    >
                      <option value="">All Categories</option>
                      {uniqueMaterialCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Material Type filter dropdown */}
                  <td className="p-2 border-b border-gray-400">
                    <select
                      className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                      value={searchFilters.materialType}
                      onChange={(e) =>
                        handleFilterChange("materialType", e.target.value)
                      }
                    >
                      <option value="">All Types</option>
                      {uniqueMaterialTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Material Name text input */}
                  <td className="p-2 border-b border-gray-400">
                    <input
                      type="text"
                      value={searchFilters.materialName}
                      onChange={(e) =>
                        handleFilterChange("materialName", e.target.value)
                      }
                      className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                      placeholder="Search..."
                    />
                  </td>

                  {/* Material Code text input */}
                  <td className="p-2 border-b border-gray-400">
                    <input
                      type="text"
                      value={searchFilters.materialCode}
                      onChange={(e) =>
                        handleFilterChange("materialCode", e.target.value)
                      }
                      className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                      placeholder="Search..."
                    />
                  </td>

                  {/* Lead Time text input */}
                  <td className="p-2 border-b border-gray-400">
                    <input
                      type="text"
                      value={searchFilters.leadTime}
                      onChange={(e) =>
                        handleFilterChange("leadTime", e.target.value)
                      }
                      className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                      placeholder="Search..."
                    />
                  </td>

                  {/* Urgent Lead Time text input */}
                  <td className="p-2 border-b border-gray-400">
                    <input
                      type="text"
                      value={searchFilters.urgentLeadTime}
                      onChange={(e) =>
                        handleFilterChange("urgentLeadTime", e.target.value)
                      }
                      className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                      placeholder="Search..."
                    />
                  </td>
                </tr>
              </tbody>
            )}

            <tbody>
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
                    <td className="p-3 border-b border-gray-400">{item.materialCategory}</td>
                    <td className="p-3 border-b border-gray-400">{item.materialType}</td>
                    <td className="p-3 border-b border-gray-400">{item.materialName}</td>
                    <td className="p-3 border-b border-gray-400">{item.materialCode}</td>
                    <td className="p-3 border-b border-gray-400">{item.leadTime}</td>
                    <td className="p-3 border-b border-gray-400">{item.urgentLeadTime}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>
                    <NoDataFound message="No Materials found." />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <FormModal isOpen={showForm} onClose={handleCancel}>
        <MaterialsForm
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

export default Materials;
