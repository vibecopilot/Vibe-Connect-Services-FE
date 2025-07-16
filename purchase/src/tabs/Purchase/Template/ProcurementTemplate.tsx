import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import TableHead from "../../../components/TopHead";
import TopSearch from "../../../components/TopSearch";
import IconButton from "../../../components/IconButton";
import NoDataFound from "../../../components/NoDataFound";
import Pagination from "../../../components/Pagination";
import ProcurementTemplateForm from "../../../forms/ProcurementTemplateForm";
import FormModal from "../../../components/FormModal";

interface ProcurementItem {
  id: number;
  paymentId: string;
  materialCode: string;
  qty: string;
  uom: string;
  requiredBy: Date | null;
  supplier: Date | null;
  priority: string;
  status: boolean;
}

interface ProcurementTemplateProps {
  onModalStateChange?: (isOpen: boolean) => void;
}

const ProcurementTemplate: React.FC<ProcurementTemplateProps> = ({onModalStateChange}) => {
  const [searchFilters, setSearchFilters] = useState<Record<string, string>>({});
  const [data, setData] = useState<ProcurementItem[]>([]);
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Omit<ProcurementItem, "id">>({
    paymentId: "",
    materialCode: "",
    qty: "",
    uom: "",
    requiredBy: null,
    supplier: null,
    priority: "",
    status: false,
  });
  const [errors, setErrors] = useState<{
    paymentId?: string;
    materialCode?: string;
    qty?: string;
    uom?: string;
    requiredBy?: string;
    supplier?: string;
    priority?: string;
  }>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setData([
      {
        id: 1,
        paymentId: "PID123",
        materialCode: "MAT001",
        qty: "100",
        uom: "Kg",
        requiredBy: new Date(),
        supplier: new Date(),
        priority: "High",
        status: true,
      },
    ]);
  }, []);

    // Notify parent component when modal state changes
  useEffect(() => {
    if (onModalStateChange) {
      onModalStateChange(showForm);
    }
  }, [showForm, onModalStateChange]);

  const handleAddClick = () => {
    setFormData({
      paymentId: "",
      materialCode: "",
      qty: "",
      uom: "",
      requiredBy: null,
      supplier: null,
      priority: "",
      status: false,
    });
    setEditId(null);
    setShowForm(true);
    setErrors({});
    setErrorMessage("");
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditId(null);
    setErrors({});
    setErrorMessage("");
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    const { paymentId, materialCode, qty, uom, requiredBy, supplier, priority } = formData;

    if (!paymentId.trim()) newErrors.paymentId = "Payment ID is required";
    if (!materialCode.trim()) newErrors.materialCode = "Material Code is required";
    if (!qty.trim()) newErrors.qty = "Quantity is required";
    if (!uom.trim()) newErrors.uom = "UOM is required";
    if (!requiredBy) newErrors.requiredBy = "Required By date is required";
    if (!supplier) newErrors.supplier = "Supplier date is required";
    if (!priority.trim()) newErrors.priority = "Priority is required";

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    
    if (!isValid) {
      setErrorMessage("All fields are mandatory.");
    } else {
      setErrorMessage("");
    }
    
    return isValid;
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (editId !== null) {
      setData((prev) =>
        prev.map((item) => (item.id === editId ? { ...item, ...formData } : item))
      );
    } else {
      setData([...data, { id: Date.now(), ...formData }]);
    }

    handleFormCancel();
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: undefined });
      setErrorMessage("");
    }
  };

  const handleDateChange = (fieldName: string, date: Date | null) => {
    setFormData({ ...formData, [fieldName]: date });
    
    // Clear error for this field
    if (errors[fieldName as keyof typeof errors]) {
      setErrors({ ...errors, [fieldName]: undefined });
      setErrorMessage("");
    }
  };

  const handleToggleChange = () => {
    setFormData({ ...formData, status: !formData.status });
  };

  const handleEdit = (item: ProcurementItem) => {
    const { id, ...rest } = item;
    setFormData(rest);
    setEditId(id);
    setShowForm(true);
    setErrors({});
    setErrorMessage("");
  };

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredData = data.filter((item) => {
    return Object.entries(searchFilters).every(([key, value]) => {
      if (!value) return true;
      const val = (item as any)[key];
      if (val instanceof Date) {
        return val.toLocaleDateString().includes(value);
      }
      return String(val).toLowerCase().includes(value.toLowerCase());
    });
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { label: "Actions", align: "center" },
    { label: "Payment ID", key: "paymentId" },
    { label: "Material Code", key: "materialCode" },
    { label: "Qty", key: "qty" },
    { label: "UOM", key: "uom" },
    { label: "Required By", key: "requiredBy" },
    { label: "Supplier", key: "supplier" },
    { label: "Priority", key: "priority" },
    { label: "Status", key: "status", align: "center" },
  ];

  const CustomToggle = ({
    checked,
    onChange,
    disabled = false,
  }: {
    checked: boolean;
    onChange: () => void;
    disabled?: boolean;
  }) => (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="sr-only peer"
      />
      <div
        className={`w-11 h-6 rounded-full relative transition duration-300 ${
          checked ? "bg-green-500" : "bg-gray-400"
        } ${disabled ? "opacity-70 cursor-not-allowed" : ""}`}
      >
        <div
          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </div>
    </label>
  );



  return (
    <>
      <div className="p-4 bg-white ">
      <div className="flex justify-between items-center">
        <TopSearch
          onSearch={() => setShowFilterRow((prev) => !prev)}
          onButtonClick={handleAddClick}
          buttons={["New Procurement"]}
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
              <tr className=" text-sm">
                {columns.map((col, index) => (
                  <td key={index} className="p-2 border-b border-gray-400">
                    {index === 0 ? null : (
                      <input
                        type="text"
                        value={searchFilters[col.key || ""] || ""}
                        onChange={(e) =>
                          setSearchFilters({
                            ...searchFilters,
                            [col.key || ""]: e.target.value,
                          })
                        }
                        placeholder={`Search ${col.label}`}
                        className="w-full px-2 py-1 border rounded"
                      />
                    )}
                  </td>
                ))}
              </tr>
            )}

            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 text-sm">
                  <td className="p-3 border-b border-gray-400 text-center space-x-3">
                    <IconButton tooltip="Edit" className="hover:text-green-600" onClick={() => handleEdit(item)}>
                      <FiEdit />
                    </IconButton>
                    <IconButton tooltip="Delete" className="hover:text-red-600" onClick={() => handleDelete(item.id)}>
                      <FiTrash2 />
                    </IconButton>
                  </td>
                  <td className="p-3 border-b border-gray-400">{item.paymentId}</td>
                  <td className="p-3 border-b border-gray-400">{item.materialCode}</td>
                  <td className="p-3 border-b border-gray-400">{item.qty}</td>
                  <td className="p-3 border-b border-gray-400">{item.uom}</td>
                  <td className="p-3 border-b border-gray-400">{item.requiredBy?.toLocaleDateString()}</td>
                  <td className="p-3 border-b border-gray-400">{item.supplier?.toLocaleDateString()}</td>
                  <td className="p-3 border-b border-gray-400">{item.priority}</td>
                  <td className="p-3 border-b border-gray-400 text-center">
                    <CustomToggle checked={item.status} onChange={() => {}} disabled />
                  </td>
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
      <FormModal isOpen={showForm} onClose={handleFormCancel}>
        <ProcurementTemplateForm
          formData={formData}
          onChange={handleFormChange}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          errors={errors}
          errorMessage={errorMessage}
          isEditing={editId !== null}
          onDateChange={handleDateChange}
          onToggleChange={handleToggleChange}
        />
      </FormModal>
    </>
  );
};

export default ProcurementTemplate;