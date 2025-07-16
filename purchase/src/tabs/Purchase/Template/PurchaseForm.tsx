import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import TableHead from "../../../components/TopHead";
import TopSearch from "../../../components/TopSearch";
import IconButton from "../../../components/IconButton";
import NoDataFound from "../../../components/NoDataFound";
import Pagination from "../../../components/Pagination";
import PurchaseFormForm from "../../../forms/PurchaseFormForm";
import FormModal from "../../../components/FormModal";

interface PurchaseItem {
  id: number;
  requestId: string;
  requestedBy: string;
  materialCode: string;
  supplierName: string;
  estimatedCost: string;
  priority: string;
  status: boolean;
}

interface PurchaseFormProps {
  onModalStateChange?: (isOpen: boolean) => void;
}

const PurchaseForm: React.FC<PurchaseFormProps> = ({onModalStateChange}) => {
  const [searchFilters, setSearchFilters] = useState({
    requestId: "",
    requestedBy: "",
    materialCode: "",
    supplierName: "",
    estimatedCost: "",
    priority: "",
    status: "",
  });

  const [data, setData] = useState<PurchaseItem[]>([
    {
      id: 1,
      requestId: "REQ-001",
      requestedBy: "Alice",
      materialCode: "MAT-1001",
      supplierName: "ABC Suppliers",
      estimatedCost: "1500",
      priority: "High",
      status: true,
    },
    {
      id: 2,
      requestId: "REQ-002",
      requestedBy: "Bob",
      materialCode: "MAT-1002",
      supplierName: "XYZ Traders",
      estimatedCost: "3200",
      priority: "Medium",
      status: false,
    },
    {
      id: 3,
      requestId: "REQ-003",
      requestedBy: "Charlie",
      materialCode: "MAT-1003",
      supplierName: "QuickMart",
      estimatedCost: "500",
      priority: "Low",
      status: true,
    },
    {
      id: 4,
      requestId: "REQ-004",
      requestedBy: "Diana",
      materialCode: "MAT-1004",
      supplierName: "SuperSuppliers",
      estimatedCost: "2300",
      priority: "High",
      status: true,
    },
    {
      id: 5,
      requestId: "REQ-005",
      requestedBy: "Edward",
      materialCode: "MAT-1005",
      supplierName: "SmartDealers",
      estimatedCost: "950",
      priority: "Low",
      status: false,
    },
    {
      id: 6,
      requestId: "REQ-006",
      requestedBy: "Fiona",
      materialCode: "MAT-1006",
      supplierName: "FastTrack Inc.",
      estimatedCost: "1900",
      priority: "Medium",
      status: true,
    },
  ]);

  

  const [showFilterRow, setShowFilterRow] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Omit<PurchaseItem, "id">>({
    requestId: "",
    requestedBy: "",
    materialCode: "",
    supplierName: "",
    estimatedCost: "",
    priority: "",
    status: false,
  });
  const [errors, setErrors] = useState<{
    requestId?: string;
    requestedBy?: string;
    materialCode?: string;
    supplierName?: string;
    estimatedCost?: string;
    priority?: string;
  }>({});
  const [editId, setEditId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

    // Notify parent component when modal state changes
  useEffect(() => {
    if (onModalStateChange) {
      onModalStateChange(showForm);
    }
  }, [showForm, onModalStateChange]);

  const handleAddClick = () => {
    setFormData({
      requestId: "",
      requestedBy: "",
      materialCode: "",
      supplierName: "",
      estimatedCost: "",
      priority: "",
      status: false,
    });
    setEditId(null);
    setShowForm(true);
    setErrors({});
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditId(null);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    const { requestId, requestedBy, materialCode, supplierName, estimatedCost, priority } = formData;

    if (!requestId.trim()) newErrors.requestId = "Request ID is required";
    if (!requestedBy.trim()) newErrors.requestedBy = "Requested By is required";
    if (!materialCode.trim()) newErrors.materialCode = "Material Code is required";
    if (!supplierName.trim()) newErrors.supplierName = "Supplier Name is required";
    if (!estimatedCost.trim()) newErrors.estimatedCost = "Estimated Cost is required";
    if (!priority.trim()) newErrors.priority = "Priority is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    
    if (name === 'status') {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear error for this field
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleEdit = (item: PurchaseItem) => {
    const { id, ...rest } = item;
    setFormData(rest);
    setEditId(id);
    setShowForm(true);
    setErrors({});
  };

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredData = data.filter((item) =>
    Object.entries(searchFilters).every(([key, value]) => {
      if (!value) return true;
      if (key === "status") {
        return item.status.toString().toLowerCase().includes(value.toLowerCase());
      }
      return item[key as keyof PurchaseItem]?.toString().toLowerCase().includes(value.toLowerCase());
    })
  );

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const columns = [
    { label: "Actions", align: "center" },
    { label: "Request ID" },
    { label: "Requested By" },
    { label: "Material Code" },
    { label: "Supplier Name" },
    { label: "Estimated Cost" },
    { label: "Priority" },
    { label: "Status", align: "center" },
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
      <input type="checkbox" checked={checked} disabled={disabled} onChange={onChange} className="sr-only peer" />
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
          buttons={["New Purchase"]}
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
                <td className="p-2 border-b border-gray-400 text-center" />
                {Object.keys(searchFilters)
                  .filter((key) => key !== "id")
                  .map((key) => (
                    <td key={key} className="p-2 border-b border-gray-400">
                      <input
                        value={searchFilters[key as keyof typeof searchFilters]}
                        onChange={(e) => setSearchFilters({ ...searchFilters, [key]: e.target.value })}
                        placeholder={`Search ${key}`}
                        className="w-full px-2 py-1 border rounded"
                      />
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
                  <td className="p-3 border-b border-gray-400">{item.requestId}</td>
                  <td className="p-3 border-b border-gray-400">{item.requestedBy}</td>
                  <td className="p-3 border-b border-gray-400">{item.materialCode}</td>
                  <td className="p-3 border-b border-gray-400">{item.supplierName}</td>
                  <td className="p-3 border-b border-gray-400">{item.estimatedCost}</td>
                  <td className="p-3 border-b border-gray-400">{item.priority}</td>
                  <td className="p-3 border-b border-gray-400 text-center">
                    <CustomToggle checked={item.status} disabled={true} onChange={() => {}} />
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
      <div className="p-4"> 
        <PurchaseFormForm
          formData={formData}
          onChange={handleFormChange}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          errors={errors}
          isEditing={editId !== null}
        />
      </div>
    </FormModal>
    </>
  );
};

export default PurchaseForm;