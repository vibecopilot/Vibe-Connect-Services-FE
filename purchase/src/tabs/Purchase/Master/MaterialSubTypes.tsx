import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import TableHead from "../../../components/TopHead";
import TopSearch from "../../../components/TopSearch";
import IconButton from "../../../components/IconButton";
import NoDataFound from "../../../components/NoDataFound";
import Pagination from "../../../components/Pagination";
import MaterialSubTypesForm from "../../../forms/MaterialSubTypesForm";
import FormModal from "../../../components/FormModal";

const materialTypes = ["Steel", "Plastic", "Wood"];

interface MaterialSubTypeItem {
  id: number;
  name: string;
  code: string;
  parentType: string;
  description: string;
}

interface MaterialSubTypesProps {
  onModalStateChange?: (isOpen: boolean) => void;
}

const MaterialSubTypes: React.FC<MaterialSubTypesProps> = ({
  onModalStateChange,
}) => {
  const [searchFilters, setSearchFilters] = useState({
    name: "",
    code: "",
    parentType: "",
    description: "",
  });
  const [data, setData] = useState<MaterialSubTypeItem[]>([]);
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState<Omit<MaterialSubTypeItem, "id">>({
    name: "",
    code: "",
    parentType: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState<
    Partial<Omit<MaterialSubTypeItem, "id">>
  >({});
  const [editId, setEditId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setData([
      {
        id: 1,
        name: "Mild Steel",
        code: "MS001",
        parentType: "Steel",
        description: "Soft steel subtype",
      },
    ]);
  }, []);

  // Notify parent component when modal state changes
  useEffect(() => {
    if (onModalStateChange) {
      onModalStateChange(isFormVisible);
    }
  }, [isFormVisible, onModalStateChange]);

  const handleAddClick = () => {
    setFormData({ name: "", code: "", parentType: "", description: "" });
    setEditId(null);
    setFormErrors({});
    setIsFormVisible(true);
  };

  const handleEdit = (item: MaterialSubTypeItem) => {
    setFormData({
      name: item.name,
      code: item.code,
      parentType: item.parentType,
      description: item.description,
    });
    setEditId(item.id);
    setFormErrors({});
    setIsFormVisible(true);
  };

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setFormErrors({});
    setEditId(null);
  };

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors: Partial<Omit<MaterialSubTypeItem, "id">> = {};
    if (!formData.name.trim()) errors.name = "Sub-Type Name is required.";
    if (!formData.parentType.trim())
      errors.parentType = "Material Type is required.";
    return errors;
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (editId !== null) {
      setData((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...item, ...formData } : item
        )
      );
    } else {
      setData((prev) => [...prev, { id: Date.now(), ...formData }]);
    }

    setFormData({ name: "", code: "", parentType: "", description: "" });
    setEditId(null);
    setFormErrors({});
    setIsFormVisible(false);
  };

  const handleFilterChange = (
    key: keyof typeof searchFilters,
    value: string
  ) => {
    setSearchFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredData = data.filter((item) =>
    Object.entries(searchFilters).every(([key, val]) =>
      item[key as keyof typeof searchFilters]
        ?.toLowerCase()
        .includes(val.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { label: "Actions", align: "center" },
    { label: "Sub-Type Name" },
    { label: "Sub-Type Code" },
    { label: "Parental Material Type" },
    { label: "Description" },
  ];

  return (
    <>
      <div className="p-4 bg-white ">
        <div className="flex justify-between items-center">
          <TopSearch
            onSearch={() => setShowFilterRow((prev) => !prev)}
            onButtonClick={handleAddClick}
            buttons={["New Sub-Type"]}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredData.length / itemsPerPage)}
            totalItems={filteredData.length}
            onPageChange={setCurrentPage}
          />
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="min-w-full table-auto ">
            <TableHead columns={columns} />
            <tbody>
              {showFilterRow && (
                <tr  border-gray-400>
                  <td className="p-2 border-b border-gray-400 text-center" />
                  <td className="p-2 border-b border-gray-400">
                    <input
                      value={searchFilters.name}
                      onChange={(e) =>
                        handleFilterChange("name", e.target.value)
                      }
                      placeholder="Search Name"
                      className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                    />
                  </td>
                  <td className="p-2 border-b border-gray-400">
                    <input
                      value={searchFilters.code}
                      onChange={(e) =>
                        handleFilterChange("code", e.target.value)
                      }
                      placeholder="Search Code"
                      className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                    />
                  </td>
                  <td className="p-2 border-b border-gray-400">
                    <select
                      value={searchFilters.parentType}
                      onChange={(e) =>
                        handleFilterChange("parentType", e.target.value)
                      }
                      className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                    >
                      <option value="">All Material Types</option>
                      {materialTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-2 border-b border-gray-400">
                    <input
                      value={searchFilters.description}
                      onChange={(e) =>
                        handleFilterChange("description", e.target.value)
                      }
                      placeholder="Search Description"
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
                    <td className="p-3 border-b border-gray-400">{item.name}</td>
                    <td className="p-3 border-b border-gray-400">{item.code}</td>
                    <td className="p-3 border-b border-gray-400">{item.parentType}</td>
                    <td className="p-3 border-b border-gray-400">{item.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-4 text-gray-500"
                  >
                    <NoDataFound />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <FormModal isOpen={isFormVisible} onClose={handleCancel}>
        <MaterialSubTypesForm
          formData={formData}
          onChange={handleFormChange}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          errors={formErrors}
          isEditing={editId !== null}
        />
      </FormModal>
    </>
  );
};

export default MaterialSubTypes;
