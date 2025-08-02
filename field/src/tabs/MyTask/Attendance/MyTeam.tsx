import React, { useState, useEffect } from "react";
import { FiEdit, FiEye } from "react-icons/fi";
import TableHead from "../../../components/TopHead";
import TopSearch from "../../../components/TopSearch";
import IconButton from "../../../components/IconButton";
import NoDataFound from "../../../components/NoDataFound";
import Pagination from "../../../components/Pagination";
import MyTeamForm from "../../../forms/MyTeamForm"; 
import FormModal from "../../../components/FormModal";

const reportingHeads = ["John Smith", "Sarah Johnson", "Michael Brown", "Lisa Davis"];
const requests = ["Absent", "Half Days", "Lates", "Left Early", "Exceptions"];
const reasons = ["Sick Leave", "Personal", "Family Emergency", "Medical Appointment", "Other"];

interface MyTeamItem { 
  id: number;
  name: string;
  reportingHead: string;
  request: string;
  date: Date | null;
  originalRequested: string;
  reason: string;
  requestedOn: Date | null;
}

interface AttendanceMyTeamProps{
  onModalStateChange?: (isOpen: boolean) => void;
}

const MyTeam: React.FC<AttendanceMyTeamProps> = ({onModalStateChange}) => { 
  const [searchFilters, setSearchFilters] = useState({
    name: "",
    reportingHead: "",
    request: "",
    date: "",
    originalRequested: "",
    reason: "",
    requestedOn: "",
  });

  const [data, setData] = useState<MyTeamItem[]>([]); 
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState<Omit<MyTeamItem, "id">>({ 
    name: "",
    reportingHead: "",
    request: "",
    date: null,
    originalRequested: "",
    reason: "",
    requestedOn: null,
  });
  const [formErrors, setFormErrors] = useState<Partial<Omit<MyTeamItem, "id">>>({}); 
  const [editId, setEditId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isViewMode, setIsViewMode] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("");
  const itemsPerPage = 5;

  useEffect(() => {
    setData([
      {
        id: 1,
        name: "John Doe",
        reportingHead: "John Smith",
        request: "Absent",
        date: new Date("2024-06-10"),
        originalRequested: "Original",
        reason: "Sick Leave",
        requestedOn: new Date("2024-06-08"),
      },
      {
        id: 2,
        name: "Jane Smith",
        reportingHead: "Sarah Johnson",
        request: "Half Days",
        date: new Date("2024-06-09"),
        originalRequested: "Requested",
        reason: "Medical Appointment",
        requestedOn: new Date("2024-06-07"),
      },
      {
        id: 3,
        name: "Mike Johnson",
        reportingHead: "Michael Brown",
        request: "Lates",
        date: new Date("2024-06-08"),
        originalRequested: "Original",
        reason: "Traffic",
        requestedOn: new Date("2024-06-08"),
      },
      {
        id: 4,
        name: "Sarah Wilson",
        reportingHead: "Lisa Davis",
        request: "Left Early",
        date: new Date("2024-06-07"),
        originalRequested: "Requested",
        reason: "Family Emergency",
        requestedOn: new Date("2024-06-06"),
      },
      {
        id: 5,
        name: "Tom Brown",
        reportingHead: "John Smith",
        request: "Exceptions",
        date: new Date("2024-06-06"),
        originalRequested: "Original",
        reason: "Other",
        requestedOn: new Date("2024-06-05"),
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
      reportingHead: "",
      request: "",
      date: null,
      originalRequested: "",
      reason: "",
      requestedOn: null,
    });
    setEditId(null);
    setFormErrors({});
    setIsViewMode(false);
    setIsFormVisible(true);
  };

  const handleView = (item: MyTeamItem) => { 
    setFormData({
      name: item.name,
      reportingHead: item.reportingHead,
      request: item.request,
      date: item.date,
      originalRequested: item.originalRequested,
      reason: item.reason,
      requestedOn: item.requestedOn,
    });
    setEditId(item.id);
    setFormErrors({});
    setIsViewMode(true);
    setIsFormVisible(true);
  };

  const handleEdit = (item: MyTeamItem) => { 
    setFormData({
      name: item.name,
      reportingHead: item.reportingHead,
      request: item.request,
      date: item.date,
      originalRequested: item.originalRequested,
      reason: item.reason,
      requestedOn: item.requestedOn,
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { target: { name: string; value: Date | null } }
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors: Partial<Omit<MyTeamItem, "id">> = {}; 
    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!formData.reportingHead.trim()) errors.reportingHead = "Reporting Head is required.";
    if (!formData.request.trim()) errors.request = "Request is required.";
    if (!formData.date) errors.date = "Date is required.";
    if (!formData.reason.trim()) errors.reason = "Reason is required.";
    if (!formData.requestedOn) errors.requestedOn = "Requested On is required.";
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
      reportingHead: "",
      request: "",
      date: null,
      originalRequested: "",
      reason: "",
      requestedOn: null,
    });
    setEditId(null);
    setFormErrors({});
    setIsFormVisible(false);
    setIsViewMode(false);
  };

  const handleFilterChange = (key: keyof typeof searchFilters, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleRequestFilter = (requestType: string) => {
    setActiveFilter(activeFilter === requestType ? "" : requestType);
    setCurrentPage(1);
  };

  const getFilteredData = () => {
    let filtered = data.filter((item) =>
      Object.entries(searchFilters).every(([key, val]) => {
        if (key === "date" || key === "requestedOn") {
          // Handle date filtering - convert Date to string for comparison
          const itemValue = item[key as keyof MyTeamItem]; 
          if (itemValue instanceof Date) {
            return itemValue.toISOString().split('T')[0].includes(val.toLowerCase());
          }
          return true;
        }
        return item[key as keyof typeof searchFilters]?.toString().toLowerCase().includes(val.toLowerCase());
      })
    );

    if (activeFilter) {
      filtered = filtered.filter(item => item.request === activeFilter);
    }

    return filtered;
  };

  const filteredData = getFilteredData();

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getRequestCount = (requestType: string) => {
    return data.filter(item => item.request === requestType).length;
  };

  const columns = [
    { label: "Actions", align: "center" },
    { label: "Name" },
    { label: "Reporting Head" },
    { label: "Request" },
    { label: "Date" },
    { label: "Original | Requested" },
    { label: "Reason" },
    { label: "Requested On" },
  ];

  return (
    <>
      <div className="p-4 bg-white">
      <div className="flex justify-between items-center">
        <div className="flex flex-row">
          <TopSearch
            onSearch={() => setShowFilterRow((prev) => !prev)}
            onButtonClick={handleAddClick}
            buttons={[]}
          />
          
          {/* Request Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {requests.map((request) => (
              <button
                key={request}
                onClick={() => handleRequestFilter(request)}
                className={`px-3 h-10 py-1 text-sm rounded-md border transition-colors ${
                  activeFilter === request
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                }`}
              >
                {request} ({getRequestCount(request)})
              </button>
            ))}
          </div>
        </div>
        
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
                <td className="p-2 border-b text-center" />
                {Object.entries(searchFilters).map(([key, val]) => (
                  <td className="p-2 border-b border-gray-400" key={key}>
                    {["reportingHead", "request", "reason", "originalRequested"].includes(key) ? (
                      <select
                        value={val}
                        onChange={(e) => handleFilterChange(key as keyof typeof searchFilters, e.target.value)}
                        className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                      >
                        <option value="">All</option>
                        {(key === "reportingHead" ? reportingHeads : 
                          key === "request" ? requests : 
                          key === "reason" ? reasons :
                          ["Original", "Requested"]).map((item) => (
                          <option key={item} value={item}>{item}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        value={val}
                        onChange={(e) => handleFilterChange(key as keyof typeof searchFilters, e.target.value)}
                        placeholder={`Search ${key}`}
                        type={key.includes("date") || key.includes("On") ? "date" : "text"}
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
                  <td className="p-3 border-b border-gray-400">{item.name}</td>
                  <td className="p-3 border-b border-gray-400">{item.reportingHead}</td>
                  <td className="p-3 border-b border-gray-400">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.request === "Absent" ? "bg-red-100 text-red-800" :
                      item.request === "Half Days" ? "bg-yellow-100 text-yellow-800" :
                      item.request === "Lates" ? "bg-orange-100 text-orange-800" :
                      item.request === "Left Early" ? "bg-purple-100 text-purple-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {item.request}
                    </span>
                  </td>
                  <td className="p-3 border-b border-gray-400">{item.date ? item.date.toLocaleDateString() : ''}</td>
                  <td className="p-3 border-b border-gray-400">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.originalRequested === "Original" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                    }`}>
                      {item.originalRequested}
                    </span>
                  </td>
                  <td className="p-3 border-b border-gray-400">{item.reason}</td>
                  <td className="p-3 border-b border-gray-400">{item.requestedOn ? item.requestedOn.toLocaleDateString() : ''}</td>
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
      <MyTeamForm 
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

export default MyTeam; 