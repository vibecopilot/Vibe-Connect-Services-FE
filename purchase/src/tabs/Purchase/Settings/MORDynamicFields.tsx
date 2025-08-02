import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import TableHead from "../../../components/TopHead";
import TopSearch from "../../../components/TopSearch";
import IconButton from "../../../components/IconButton";
import NoDataFound from "../../../components/NoDataFound";
import Pagination from "../../../components/Pagination";
import MORDynamicFieldsForm from "../../../forms/MORDynamicFieldsForm";
import FormModal from "../../../components/FormModal";

interface FieldItem {
  id: number;
  fieldHeader: string;
  mappedFields: string;
}

interface DynamicFieldsFormData {
  materialSubType: string;
  selectedFields: string[];
}

interface MORDynamicFieldsProps {
  onModalStateChange?: (isOpen: boolean) => void;
}

const MORDynamicFields: React.FC<MORDynamicFieldsProps> = ({onModalStateChange}) => {
  const [searchFilters, setSearchFilters] = useState({
    fieldHeader: "",
    mappedFields: "",
  });
  const [data, setData] = useState<FieldItem[]>([]);
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fieldHeader: "",
    mappedFields: "",
  });
  const [errors, setErrors] = useState<{
    fieldHeader?: string;
    mappedFields?: string;
  }>({});
  const [editId, setEditId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setData([
      { id: 1, fieldHeader: "Header 1", mappedFields: "Field A, Field B" },
    ]);
  }, []);

    // Notify parent component when modal state changes
  useEffect(() => {
    if (onModalStateChange) {
      onModalStateChange(showForm);
    }
  }, [showForm, onModalStateChange]);

  const handleAddClick = () => {
    setFormData({ fieldHeader: "", mappedFields: "" });
    setEditId(null);
    setShowForm(true);
    setErrors({});
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditId(null);
    setErrors({});
    setFormData({ fieldHeader: "", mappedFields: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for the field being edited
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: { fieldHeader?: string; mappedFields?: string } = {};
    
    if (!formData.fieldHeader.trim()) {
      newErrors.fieldHeader = "Fields Header is required.";
    }
    
    if (!formData.mappedFields.trim()) {
      newErrors.mappedFields = "Mapped Fields is required.";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (editId !== null) {
      setData((prev) =>
        prev.map((item) => (item.id === editId ? { ...item, ...formData } : item))
      );
    } else {
      setData(prev => [...prev, { id: Date.now(), ...formData }]);
    }

    setShowForm(false);
    setFormData({ fieldHeader: "", mappedFields: "" });
    setEditId(null);
    setErrors({});
  };

  const handleEdit = (item: FieldItem) => {
    const { id, ...rest } = item;
    setFormData(rest);
    setEditId(id);
    setShowForm(true);
    setErrors({});
  };

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  // Handle dynamic fields form submission
  const handleDynamicFieldsSubmit = (dynamicFormData: DynamicFieldsFormData) => {
    const fieldHeaderString = dynamicFormData.selectedFields.join(', ');
    
    if (editId !== null) {
      // Update existing item
      setData(prev =>
        prev.map(item =>
          item.id === editId
            ? {
                ...item,
                fieldHeader: fieldHeaderString,
                mappedFields: dynamicFormData.materialSubType
              }
            : item
        )
      );
    } else {
      // Add new item
      const newEntry = {
        id: Date.now(),
        fieldHeader: fieldHeaderString,
        mappedFields: dynamicFormData.materialSubType
      };
      setData(prev => [...prev, newEntry]);
    }
    
    setShowForm(false);
    setEditId(null);
    setFormData({ fieldHeader: "", mappedFields: "" });
  };

  const filteredData = data.filter((item) =>
    Object.entries(searchFilters).every(([key, value]) =>
      item[key as keyof FieldItem].toString().toLowerCase().includes(value.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { label: "Actions", align: "center" },
    { label: "Fields Header" },
    { label: "Mapped Fields" },
  ];

  

  return (
    <>
      <div className="p-4 bg-white ">
      <div className="flex justify-between items-center">
        <TopSearch
          onSearch={() => setShowFilterRow((prev) => !prev)}
          onButtonClick={handleAddClick}
          buttons={["New Field"]}
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
                <td className="p-2 border-b border-gray-400">
                  <input
                    value={searchFilters.fieldHeader}
                    onChange={(e) =>
                      setSearchFilters({ ...searchFilters, fieldHeader: e.target.value })
                    }
                    placeholder="Search Fields Header"
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  />
                </td>
                <td className="p-2 border-b border-gray-400">
                  <input
                    value={searchFilters.mappedFields}
                    onChange={(e) =>
                      setSearchFilters({ ...searchFilters, mappedFields: e.target.value })
                    }
                    placeholder="Search Mapped Fields"
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
                  <td className="p-3 border-b border-gray-400">{item.fieldHeader}</td>
                  <td className="p-3 border-b border-gray-400">{item.mappedFields}</td>
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
      <div className="p-4">
        <MORDynamicFieldsForm
          formData={formData}
          onChange={handleChange }
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          onDynamicSubmit={handleDynamicFieldsSubmit}
          errors={errors}
          isEditing={editId !== null}
        />
      </div>
    </FormModal>
    </>
  );
};

export default MORDynamicFields;