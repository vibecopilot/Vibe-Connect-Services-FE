import React, { useState, useEffect } from "react";
import { FiEdit, FiEye } from "react-icons/fi";
import TableHead from "../../../components/TopHead";
import TopSearch from "../../../components/TopSearch";
import IconButton from "../../../components/IconButton";
import NoDataFound from "../../../components/NoDataFound";
import Pagination from "../../../components/Pagination";
import MeForm from "../../../forms/MeForm";
import FormModal from "../../../components/FormModal";

const attendanceOptions = ["Present", "Absent", "Half Days", "Lates", "Left Early"];
const remarkOptions = ["On Time", "Late Arrival", "Early Departure", "Medical Leave", "Personal Leave", "Overtime", "Holiday Work"];

interface MeItem {
  id: number;
  date: Date | null;
  punchIn: string;
  punchOut: string;
  workedFor: string;
  shortfall: string;
  attendance: string;
  remark: string;
}

interface AttendanceMeProps{
  onModalStateChange?: (isOpen: boolean) => void;
}

const Me: React.FC<AttendanceMeProps> = ({onModalStateChange}) => {
  const [searchFilters, setSearchFilters] = useState({
    date: "",
    punchIn: "",
    punchOut: "",
    workedFor: "",
    shortfall: "",
    attendance: "",
    remark: "",
  });

  const [data, setData] = useState<MeItem[]>([]);
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState<Omit<MeItem, "id">>({
    date: null,
    punchIn: "",
    punchOut: "",
    workedFor: "",
    shortfall: "",
    attendance: "",
    remark: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<Omit<MeItem, "id">>>({});
  const [editId, setEditId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isViewMode, setIsViewMode] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("");
  const itemsPerPage = 5;

  useEffect(() => {
    setData([
      {
        id: 1,
        date: new Date("2025-04-05"),
        punchIn: "9:15 AM",
        punchOut: "7:30 PM",
        workedFor: "10.00 HRS",
        shortfall: "0.00 HRS",
        attendance: "Present",
        remark: "On Time",
      },
      {
        id: 2,
        date: new Date("2025-04-04"),
        punchIn: "9:45 AM",
        punchOut: "6:00 PM",
        workedFor: "8.00 HRS",
        shortfall: "1.00 HRS",
        attendance: "Present",
        remark: "Late Arrival",
      },
      {
        id: 3,
        date: new Date("2025-04-03"),
        punchIn: "9:00 AM",
        punchOut: "5:30 PM",
        workedFor: "8.30 HRS",
        shortfall: "0.30 HRS",
        attendance: "Present",
        remark: "Early Departure",
      },
      {
        id: 4,
        date: new Date("2025-04-02"),
        punchIn: "10:00 AM",
        punchOut: "4:00 PM",
        workedFor: "0.00 HRS",
        shortfall: "8.00 HRS",
        attendance: "Absent",
        remark: "Medical Leave",
      },
      {
        id: 5,
        date: new Date("2025-04-01"),
        punchIn: "9:00 AM",
        punchOut: "8:00 PM",
        workedFor: "11.00 HRS",
        shortfall: "0.00 HRS",
        attendance: "Present",
        remark: "Overtime",
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
      date: null,
      punchIn: "",
      punchOut: "",
      workedFor: "",
      shortfall: "",
      attendance: "",
      remark: "",
    });
    setEditId(null);
    setFormErrors({});
    setIsViewMode(false);
    setIsFormVisible(true);
  };

  const handleView = (item: MeItem) => {
    setFormData({
      date: item.date,
      punchIn: item.punchIn,
      punchOut: item.punchOut,
      workedFor: item.workedFor,
      shortfall: item.shortfall,
      attendance: item.attendance,
      remark: item.remark,
    });
    setEditId(item.id);
    setFormErrors({});
    setIsViewMode(true);
    setIsFormVisible(true);
  };

  const handleEdit = (item: MeItem) => {
    setFormData({
      date: item.date,
      punchIn: item.punchIn,
      punchOut: item.punchOut,
      workedFor: item.workedFor,
      shortfall: item.shortfall,
      attendance: item.attendance,
      remark: item.remark,
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
    const errors: Partial<Omit<MeItem, "id">> = {};
    if (!formData.date) errors.date = "Date is required.";
    if (!formData.attendance.trim()) errors.attendance = "Attendance is required.";
    if (formData.attendance === "Present") {
      if (!formData.punchIn.trim()) errors.punchIn = "Punch In is required for Present attendance.";
      if (!formData.punchOut.trim()) errors.punchOut = "Punch Out is required for Present attendance.";
      if (!formData.workedFor.trim()) errors.workedFor = "Worked For is required.";
    }
    if (!formData.remark.trim()) errors.remark = "Remark is required.";
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
      date: null,
      punchIn: "",
      punchOut: "",
      workedFor: "",
      shortfall: "",
      attendance: "",
      remark: "",
    });
    setEditId(null);
    setFormErrors({});
    setIsFormVisible(false);
    setIsViewMode(false);
  };

  const handleFilterChange = (key: keyof typeof searchFilters, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleAttendanceFilter = (attendanceType: string) => {
    setActiveFilter(activeFilter === attendanceType ? "" : attendanceType);
    setCurrentPage(1);
  };

  const getFilteredData = () => {
    let filtered = data.filter((item) =>
      Object.entries(searchFilters).every(([key, val]) => {
        if (key === "date") {
          // Handle date filtering - convert Date to string for comparison
          const itemValue = item[key as keyof MeItem];
          if (itemValue instanceof Date) {
            return itemValue.toISOString().split('T')[0].includes(val.toLowerCase());
          }
          return true;
        }
        return item[key as keyof typeof searchFilters]?.toString().toLowerCase().includes(val.toLowerCase());
      })
    );

    if (activeFilter) {
      filtered = filtered.filter(item => item.attendance === activeFilter);
    }

    return filtered;
  };

  const filteredData = getFilteredData();

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getAttendanceCount = (attendanceType: string) => {
    return data.filter(item => item.attendance === attendanceType).length;
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const columns = [
    { label: "Actions", align: "center" },
    { label: "Date" },
    { label: "Punch In" },
    { label: "Punch Out" },
    { label: "Worked For" },
    { label: "Shortfall" },
    { label: "Attendance" },
    { label: "Remark" },
  ];

  return (
    <>
      <div className="p-4 bg-white border-gray-400">
      <div className="flex justify-between items-center">
        <div className="flex flex-row">
          <TopSearch
            onSearch={() => setShowFilterRow((prev) => !prev)}
            onButtonClick={handleAddClick}
            buttons={[]}
          />
          
          {/* Attendance Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {attendanceOptions.map((attendance) => (
              <button
                key={attendance}
                onClick={() => handleAttendanceFilter(attendance)}
                className={`px-4 h-10 py-1 text-sm rounded-md border transition-colors ${
                  activeFilter === attendance
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                }`}
              >
                {attendance} ({getAttendanceCount(attendance)})
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
        <table className="min-w-full table-auto ">
          <TableHead columns={columns} />
          <tbody>
            {showFilterRow && (
              <tr >
                <td className="p-2 border-b border-gray-400 text-center" />
                {Object.entries(searchFilters).map(([key, val]) => (
                  <td className="p-2 border-b border-gray-400" key={key}>
                    {["attendance", "remark"].includes(key) ? (
                      <select
                        value={val}
                        onChange={(e) => handleFilterChange(key as keyof typeof searchFilters, e.target.value)}
                        className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                      >
                        <option value="">All</option>
                        {(key === "attendance" ? attendanceOptions : remarkOptions).map((item) => (
                          <option key={item} value={item}>{item}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        value={val}
                        onChange={(e) => handleFilterChange(key as keyof typeof searchFilters, e.target.value)}
                        placeholder={`Search ${key}`}
                        type={key === "date" ? "date" : "text"}
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
                  <td className="p-3 border-b border-gray-400">{formatDate(item.date)}</td>
                  <td className="p-3 border-b border-gray-400">{item.punchIn}</td>
                  <td className="p-3 border-b border-gray-400">{item.punchOut}</td>
                  <td className="p-3 border-b border-gray-400">{item.workedFor}</td>
                  <td className="p-3 border-b border-gray-400">{item.shortfall}</td>
                  <td className="p-3 border-b border-gray-400">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.attendance === "Present" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {item.attendance}
                    </span>
                  </td>
                  <td className="p-3 border-b border-gray-400">{item.remark}</td>
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
      <MeForm
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

export default Me;