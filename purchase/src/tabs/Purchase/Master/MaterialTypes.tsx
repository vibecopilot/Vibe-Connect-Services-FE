import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import TableHead from "../../../components/TopHead";
import TopSearch from "../../../components/TopSearch";
import IconButton from "../../../components/IconButton";
import NoDataFound from "../../../components/NoDataFound";
import Pagination from "../../../components/Pagination";
import MaterialTypesForm from "../../../forms/MaterialTypesForm";
import FormModal from "../../../components/FormModal";

const categories = ["Raw Material", "Finished Good"];
const departments = ["Procurement", "Logistics"];
const budgetTypes = ["CapEx", "OpEx"];

interface MaterialTypeItem {
  id: number;
  name: string;
  code: string;
  description: string;
  category: string;
  department: string;
  budgetType: string;
}

interface MaterialTypesProps {
  onModalStateChange?: (isOpen: boolean) => void;
}

const MaterialTypes: React.FC<MaterialTypesProps> = ({ onModalStateChange }) => {
  const [searchFilters, setSearchFilters] = useState({
    name: "",
    code: "",
    description: "",
    category: "",
    department: "",
    budgetType: "",
  });

  const [data, setData] = useState<MaterialTypeItem[]>([]);
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState<Omit<MaterialTypeItem, "id">>({
    name: "",
    code: "",
    description: "",
    category: "",
    department: "",
    budgetType: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<Omit<MaterialTypeItem, "id">>>({});
  const [editId, setEditId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setData([
      {
        id: 1,
        name: "Steel Material",
        code: "MAT001",
        description: "Used for construction",
        category: "Raw Material",
        department: "Procurement",
        budgetType: "CapEx",
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
    setFormData({
      name: "",
      code: "",
      description: "",
      category: "",
      department: "",
      budgetType: "",
    });
    setEditId(null);
    setFormErrors({});
    setIsFormVisible(true);
  };

  const handleEdit = (item: MaterialTypeItem) => {
    setFormData({
      name: item.name,
      code: item.code,
      description: item.description,
      category: item.category,
      department: item.department,
      budgetType: item.budgetType,
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors: Partial<Omit<MaterialTypeItem, "id">> = {};
    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!formData.category.trim()) errors.category = "Category is required.";
    if (!formData.department.trim()) errors.department = "Department is required.";
    if (!formData.budgetType.trim()) errors.budgetType = "Budget Type is required.";
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

    setFormData({
      name: "",
      code: "",
      description: "",
      category: "",
      department: "",
      budgetType: "",
    });
    setEditId(null);
    setFormErrors({});
    setIsFormVisible(false);
  };

  const handleFilterChange = (key: keyof typeof searchFilters, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredData = data.filter((item) =>
    Object.entries(searchFilters).every(([key, val]) =>
      item[key as keyof typeof searchFilters]?.toLowerCase().includes(val.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { label: "Actions", align: "center" },
    { label: "Material Type Name" },
    { label: "Material Type Code" },
    { label: "Description" },
    { label: "Category" },
    { label: "Department" },
    { label: "Budget Type" },
  ];

  return (
    <>
      <div className="p-4 bg-white ">
        <div className="flex justify-between items-center">
          <TopSearch
            onSearch={() => setShowFilterRow((prev) => !prev)}
            onButtonClick={handleAddClick}
            buttons={["New Material Type"]}
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
                <tr >
                  <td className="p-2 border-b border-gray-400 text-center" />
                  {Object.entries(searchFilters).map(([key, val]) => (
                    <td className="p-2 border-b border-gray-400" key={key}>
                      {["category", "department", "budgetType"].includes(key) ? (
                        <select
                          value={val}
                          onChange={(e) => handleFilterChange(key as keyof typeof searchFilters, e.target.value)}
                          className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                        >
                          <option value="">All</option>
                          {(key === "category" ? categories : key === "department" ? departments : budgetTypes).map((item) => (
                            <option key={item} value={item}>{item}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          value={val}
                          onChange={(e) => handleFilterChange(key as keyof typeof searchFilters, e.target.value)}
                          placeholder={`Search ${key}`}
                          className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                        />
                      )}
                    </td>
                  ))}
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
                    <td className="p-3 border-b border-gray-400">{item.name}</td>
                    <td className="p-3 border-b border-gray-400">{item.code}</td>
                    <td className="p-3 border-b border-gray-400">{item.description}</td>
                    <td className="p-3 border-b border-gray-400">{item.category}</td>
                    <td className="p-3 border-b border-gray-400">{item.department}</td>
                    <td className="p-3 border-b border-gray-400">{item.budgetType}</td>
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

      <FormModal isOpen={isFormVisible} onClose={handleCancel}>
        <MaterialTypesForm
          formData={formData}
          onChange={handleFormChange}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          errors={formErrors}
          isEditing={editId !== null} border-gray-400
        />
      </FormModal>
    </>
  );
};

export default MaterialTypes;