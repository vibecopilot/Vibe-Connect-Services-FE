import React, { useState, useEffect } from "react";
import { FiEdit, FiEye } from "react-icons/fi";
import TableHead from "../../components/TopHead";
import TopSearch from "../../components/TopSearch";
import IconButton from "../../components/IconButton";
import NoDataFound from "../../components/NoDataFound";
import Pagination from "../../components/Pagination";
import LeaveForm from "../../forms/LeaveForm";
import FormModal from "../../components/FormModal";

const leaveTypes = ["Annual Leave", "Sick Leave", "Maternity Leave", "Paternity Leave", "Emergency Leave", "Compensatory Leave"];
const statuses = ["Pending", "Approved", "Rejected"];
const halfDayOptions = ["Yes", "No"];
const reasons = ["Vacation", "Medical", "Family Emergency", "Personal", "Wedding", "Other"];

interface LeaveItem {
  id: number;
  appliedOn: Date | null;
  from: Date | null;
  to: Date | null;
  days: number;
  type: string;
  firstHalf: string;
  secondHalf: string;
  reason: string;
  status: string;
}

interface LeaveProps{
  onModalStateChange?: (isOpen: boolean) => void;
}

const Leave: React.FC<LeaveProps> = ({onModalStateChange}) => {
  const [searchFilters, setSearchFilters] = useState({
    appliedOn: "",
    from: "",
    to: "",
    days: "",
    type: "",
    firstHalf: "",
    secondHalf: "",
    reason: "",
    status: "",
  });

  const [data, setData] = useState<LeaveItem[]>([]);
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState<Omit<LeaveItem, "id">>({
    appliedOn: null,
    from: null,
    to: null,
    days: 0,
    type: "",
    firstHalf: "",
    secondHalf: "",
    reason: "",
    status: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<Omit<LeaveItem, "id">>>({});
  const [editId, setEditId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isViewMode, setIsViewMode] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    setData([
      {
        id: 1,
        appliedOn: new Date("2024-06-01"),
        from: new Date("2024-06-10"),
        to: new Date("2024-06-12"),
        days: 3,
        type: "Annual Leave",
        firstHalf: "No",
        secondHalf: "No",
        reason: "Vacation",
        status: "Approved",
      },
      {
        id: 2,
        appliedOn: new Date("2024-06-02"),
        from: new Date("2024-06-15"),
        to: new Date("2024-06-15"),
        days: 1,
        type: "Sick Leave",
        firstHalf: "Yes",
        secondHalf: "No",
        reason: "Medical",
        status: "Pending",
      },
      {
        id: 3,
        appliedOn: new Date("2024-06-03"),
        from: new Date("2024-06-20"),
        to: new Date("2024-06-22"),
        days: 3,
        type: "Emergency Leave",
        firstHalf: "No",
        secondHalf: "No",
        reason: "Family Emergency",
        status: "Approved",
      },
      {
        id: 4,
        appliedOn: new Date("2024-06-04"),
        from: new Date("2024-06-25"),
        to: new Date("2024-06-25"),
        days: 1,
        type: "Personal",
        firstHalf: "No",
        secondHalf: "Yes",
        reason: "Personal",
        status: "Rejected",
      },
      {
        id: 5,
        appliedOn: new Date("2024-06-05"),
        from: new Date("2024-06-28"),
        to: new Date("2024-06-30"),
        days: 3,
        type: "Compensatory Leave",
        firstHalf: "No",
        secondHalf: "No",
        reason: "Wedding",
        status: "Pending",
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
      appliedOn: null,
      from: null,
      to: null,
      days: 0,
      type: "",
      firstHalf: "",
      secondHalf: "",
      reason: "",
      status: "",
    });
    setEditId(null);
    setFormErrors({});
    setIsViewMode(false);
    setIsFormVisible(true);
  };

  const handleView = (item: LeaveItem) => {
    setFormData({
      appliedOn: item.appliedOn,
      from: item.from,
      to: item.to,
      days: item.days,
      type: item.type,
      firstHalf: item.firstHalf,
      secondHalf: item.secondHalf,
      reason: item.reason,
      status: item.status,
    });
    setEditId(item.id);
    setFormErrors({});
    setIsViewMode(true);
    setIsFormVisible(true);
  };

  const handleEdit = (item: LeaveItem) => {
    setFormData({
      appliedOn: item.appliedOn,
      from: item.from,
      to: item.to,
      days: item.days,
      type: item.type,
      firstHalf: item.firstHalf,
      secondHalf: item.secondHalf,
      reason: item.reason,
      status: item.status,
    });
    setEditId(item.id);
    setFormErrors({});
    setIsViewMode(false);
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setFormErrors({});
    setEditId(null);
    setIsViewMode(false);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { target: { name: string; value: Date | null | number } }
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors: Partial<Omit<LeaveItem, "id">> = {};
    if (!formData.appliedOn) errors.appliedOn = "Applied On date is required.";
    if (!formData.from) errors.from = "From date is required.";
    if (!formData.to) errors.to = "To date is required.";
    if (formData.days <= 0) errors.days = "Days must be greater than 0.";
    if (!formData.type.trim()) errors.type = "Leave type is required.";
    if (!formData.reason.trim()) errors.reason = "Reason is required.";
    if (!formData.status.trim()) errors.status = "Status is required.";
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
      appliedOn: null,
      from: null,
      to: null,
      days: 0,
      type: "",
      firstHalf: "",
      secondHalf: "",
      reason: "",
      status: "",
    });
    setEditId(null);
    setFormErrors({});
    setIsFormVisible(false);
    setIsViewMode(false);
  };

  const handleFilterChange = (key: keyof typeof searchFilters, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [key]: value }));
  };

  const getFilteredData = () => {
    return data.filter((item) =>
      Object.entries(searchFilters).every(([key, val]) => {
        if (key === "appliedOn" || key === "from" || key === "to") {
          // Handle date filtering - convert Date to string for comparison
          const itemValue = item[key as keyof LeaveItem];
          if (itemValue instanceof Date) {
            return itemValue.toISOString().split('T')[0].includes(val.toLowerCase());
          }
          return true;
        }
        return item[key as keyof typeof searchFilters]?.toString().toLowerCase().includes(val.toLowerCase());
      })
    );
  };

  const filteredData = getFilteredData();

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { label: "Actions", align: "center" },
    { label: "Applied On" },
    { label: "From" },
    { label: "To" },
    { label: "Days" },
    { label: "Type" },
    { label: "First Half" },
    { label: "Second Half" },
    { label: "Reason" },
    { label: "Status" },
  ];

  return (
    <>
      <div className="p-4 bg-white">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <TopSearch
            onSearch={() => setShowFilterRow((prev) => !prev)}
            onButtonClick={handleAddClick}
            buttons={[]}
          />
        </div>
        
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
              <tr>
                <td className="p-2 border-b border-gray-400 text-center" />
                {Object.entries(searchFilters).map(([key, val]) => (
                  <td className="p-2 border-b border-gray-400" key={key}>
                    {["type", "firstHalf", "secondHalf", "reason", "status"].includes(key) ? (
                      <select
                        value={val}
                        onChange={(e) => handleFilterChange(key as keyof typeof searchFilters, e.target.value)}
                        className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                      >
                        <option value="">All</option>
                        {(key === "type" ? leaveTypes : 
                          key === "firstHalf" || key === "secondHalf" ? halfDayOptions : 
                          key === "reason" ? reasons :
                          statuses).map((item) => (
                          <option key={item} value={item}>{item}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        value={val}
                        onChange={(e) => handleFilterChange(key as keyof typeof searchFilters, e.target.value)}
                        placeholder={`Search ${key}`}
                        type={key.includes("appliedOn") || key.includes("from") || key.includes("to") ? "date" : 
                              key === "days" ? "number" : "text"}
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
                    <IconButton tooltip="View" className="hover:text-blue-600" onClick={() => handleView(item)}>
                      <FiEye />
                    </IconButton>
                    <IconButton tooltip="Edit" className="hover:text-green-600" onClick={() => handleEdit(item)}>
                      <FiEdit />
                    </IconButton>
                  </td>
                  <td className="p-3 border-b border-gray-400">{item.appliedOn ? item.appliedOn.toLocaleDateString() : ''}</td>
                  <td className="p-3 border-b border-gray-400">{item.from ? item.from.toLocaleDateString() : ''}</td>
                  <td className="p-3 border-b border-gray-400">{item.to ? item.to.toLocaleDateString() : ''}</td>
                  <td className="p-3 border-b border-gray-400">{item.days}</td>
                  <td className="p-3 border-b border-gray-400">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.type === "Annual Leave" ? "bg-blue-100 text-blue-800" :
                      item.type === "Sick Leave" ? "bg-red-100 text-red-800" :
                      item.type === "Maternity Leave" ? "bg-pink-100 text-pink-800" :
                      item.type === "Paternity Leave" ? "bg-purple-100 text-purple-800" :
                      item.type === "Emergency Leave" ? "bg-orange-100 text-orange-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="p-3 border-b border-gray-400">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.firstHalf === "Yes" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      {item.firstHalf}
                    </span>
                  </td>
                  <td className="p-3 border-b border-gray-400">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.secondHalf === "Yes" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      {item.secondHalf}
                    </span>
                  </td>
                  <td className="p-3 border-b border-gray-400">{item.reason}</td>
                  <td className="p-3 border-b border-gray-400">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === "Approved" ? "bg-green-100 text-green-800" :
                      item.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {item.status}
                    </span>
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
    <FormModal isOpen={isFormVisible} onClose={handleCancel}>
      <LeaveForm
          formData={formData}
          onChange={handleFormChange}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          errors={formErrors}
          isEditing={editId !== null && !isViewMode}
          isViewMode={isViewMode}
        />
    </FormModal>
    </>
  );
};

export default Leave;