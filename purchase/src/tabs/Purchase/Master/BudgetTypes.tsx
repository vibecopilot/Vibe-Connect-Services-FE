import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import TableHead from "../../../components/TopHead";
import TopSearch from "../../../components/TopSearch";
import IconButton from "../../../components/IconButton";
import NoDataFound from "../../../components/NoDataFound";
import Pagination from "../../../components/Pagination";
import BudgetTypesForm from "../../../forms/BudgetTypesForm";
import FormModal from "../../../components/FormModal";

interface BudgetItem {
  id: number;
  budgetType: string;
}

interface BudgetTypesProps {
  onModalStateChange?: (isOpen: boolean) => void;
}

const BudgetTypes: React.FC<BudgetTypesProps> = ({onModalStateChange}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<BudgetItem[]>([]);
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({ budgetType: "" });
  const [errors, setErrors] = useState<{ budgetType?: string }>({});
  const itemsPerPage = 5;

  useEffect(() => {
    setData([
      { id: 1, budgetType: "Capex" },
      { id: 2, budgetType: "Opex" },
    ]);
  }, []);

  // Notify parent component when modal state changes
  useEffect(() => {
    if (onModalStateChange) {
      onModalStateChange(showForm);
    }
  }, [showForm, onModalStateChange]);

  const handleAddClick = () => {
    setFormData({ budgetType: "" });
    setErrors({});
    setEditId(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({ budgetType: "" });
    setErrors({});
    setEditId(null);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors: { budgetType?: string } = {};

    const trimmed = formData.budgetType.trim();
    if (!trimmed) {
      newErrors.budgetType = "Budget Type is required.";
      isValid = false;
    } else if (trimmed.length < 3) {
      newErrors.budgetType = "Budget Type must be at least 3 characters.";
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(trimmed)) {
      newErrors.budgetType = "Only letters and spaces are allowed.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = { budgetType: formData.budgetType.trim() };

    if (editId !== null) {
      setData((prev) =>
        prev.map((item) => (item.id === editId ? { ...item, ...payload } : item))
      );
    } else {
      setData((prev) => [...prev, { id: Date.now(), ...payload }]);
    }

    handleCancel();
  };

  const handleEdit = (item: BudgetItem) => {
    setFormData({ budgetType: item.budgetType });
    setErrors({});
    setEditId(item.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const filteredData = data.filter((item) =>
    item.budgetType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { label: "Actions", align: "center" },
    { label: "Budget Type" },
  ];

  return (
    <>
      <div className="p-4 bg-white ">
      <div className="flex justify-between items-center">
        <TopSearch
          onSearch={() => setShowFilterRow((prev) => !prev)}
          onButtonClick={handleAddClick}
          buttons={["New Budget Type"]}
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
                  <input border-gray-400
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search Budget Type"
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
    <FormModal isOpen={showForm} onClose={handleCancel}>
      
          <BudgetTypesForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            errors={errors}
            isEditing={editId !== null}
          />
        
    </FormModal>
    </>
  );
};

export default BudgetTypes;
