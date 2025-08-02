import React, { useState, useEffect } from "react";
import { FiEdit, FiEye } from "react-icons/fi";
import TableHead from "../../../components/TopHead";
import TopSearch from "../../../components/TopSearch";
import IconButton from "../../../components/IconButton";
import NoDataFound from "../../../components/NoDataFound";
import Pagination from "../../../components/Pagination";
import MeForm from "../../../forms/Activities/MeForm";
import FormModal from "../../../components/FormModal";

const locations = ["Office", "Client Site", "Remote", "Field"];
const clientNames = ["ABC Corp", "XYZ Ltd", "Tech Solutions", "Global Inc", "StartupCo"];
const beatPlans = ["Daily Check", "Weekly Review", "Monthly Audit", "Project Visit", "Client Meeting"];
const purposes = ["Meeting", "Training", "Support", "Review", "Consultation"];
const outcomes = ["Completed", "Pending", "Follow-up Required", "Cancelled", "Rescheduled"];
const statusOptions = ["All", "Completed", "In Meeting", "In Office", "Missed", "Punched In", "On Field", "Upcoming", "In Transit"];

interface MeItem {
  id: number;
  employeeName: string;
  location: string;
  punchedIn: string;
  activities: number;
  work: number;
  clientName: string;
  beatPlan: string;
  startTime: string;
  endTime: string;
  purpose: string;
  outcome: string;
  missed: boolean;
  status: string;
}

interface VisitsMeProps{
  onModalStateChange?: (isOpen: boolean) => void;
}

const Me: React.FC<VisitsMeProps> = ({onModalStateChange}) => {
  const [searchFilters, setSearchFilters] = useState({
    employeeName: "",
    location: "",
    punchedIn: "",
    activities: "",
    work: "",
    clientName: "",
    beatPlan: "",
    startTime: "",
    endTime: "",
    purpose: "",
    outcome: "",
    missed: "",
  });

  const [data, setData] = useState<MeItem[]>([]);
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState<Omit<MeItem, "id">>({
    employeeName: "",
    location: "",
    punchedIn: "",
    activities: 0,
    work: 0,
    clientName: "",
    beatPlan: "",
    startTime: "",
    endTime: "",
    purpose: "",
    outcome: "",
    missed: false,
    status: "Upcoming",
  });
  const [formErrors, setFormErrors] = useState<Partial<Omit<MeItem, "id">>>({});
  const [editId, setEditId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isViewMode, setIsViewMode] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const itemsPerPage = 5;

  useEffect(() => {
    setData([
      {
        id: 1,
        employeeName: "John Doe",
        location: "Office",
        punchedIn: "09:00",
        activities: 5,
        work: 8,
        clientName: "ABC Corp",
        beatPlan: "Daily Check",
        startTime: "09:30",
        endTime: "17:30",
        purpose: "Meeting",
        outcome: "Completed",
        missed: false,
        status: "Completed",
      },
      {
        id: 2,
        employeeName: "Jane Smith",
        location: "Client Site",
        punchedIn: "08:45",
        activities: 3,
        work: 6,
        clientName: "XYZ Ltd",
        beatPlan: "Client Meeting",
        startTime: "10:00",
        endTime: "16:00",
        purpose: "Consultation",
        outcome: "Follow-up Required",
        missed: false,
        status: "In Meeting",
      },
      {
        id: 3,
        employeeName: "Mike Johnson",
        location: "Field",
        punchedIn: "07:30",
        activities: 8,
        work: 9,
        clientName: "Tech Solutions",
        beatPlan: "Project Visit",
        startTime: "08:00",
        endTime: "18:00",
        purpose: "Support",
        outcome: "Completed",
        missed: false,
        status: "On Field",
      },
      {
        id: 4,
        employeeName: "Sarah Wilson",
        location: "Remote",
        punchedIn: "09:15",
        activities: 4,
        work: 7,
        clientName: "Global Inc",
        beatPlan: "Weekly Review",
        startTime: "09:30",
        endTime: "16:30",
        purpose: "Review",
        outcome: "Pending",
        missed: false,
        status: "In Office",
      },
      {
        id: 5,
        employeeName: "Tom Brown",
        location: "Office",
        punchedIn: "",
        activities: 0,
        work: 0,
        clientName: "StartupCo",
        beatPlan: "Monthly Audit",
        startTime: "14:00",
        endTime: "16:00",
        purpose: "Training",
        outcome: "",
        missed: true,
        status: "Missed",
      },
      {
        id: 6,
        employeeName: "Lisa Davis",
        location: "Client Site",
        punchedIn: "08:00",
        activities: 2,
        work: 4,
        clientName: "ABC Corp",
        beatPlan: "Client Meeting",
        startTime: "08:30",
        endTime: "12:30",
        purpose: "Meeting",
        outcome: "Rescheduled",
        missed: false,
        status: "Punched In",
      },
      {
        id: 7,
        employeeName: "Robert Taylor",
        location: "Field",
        punchedIn: "",
        activities: 0,
        work: 0,
        clientName: "XYZ Ltd",
        beatPlan: "Project Visit",
        startTime: "15:00",
        endTime: "18:00",
        purpose: "Support",
        outcome: "",
        missed: false,
        status: "Upcoming",
      },
      {
        id: 8,
        employeeName: "Emily Johnson",
        location: "Office",
        punchedIn: "09:30",
        activities: 1,
        work: 2,
        clientName: "Tech Solutions",
        beatPlan: "Daily Check",
        startTime: "10:00",
        endTime: "12:00",
        purpose: "Review",
        outcome: "In Progress",
        missed: false,
        status: "In Transit",
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
      employeeName: "",
      location: "",
      punchedIn: "",
      activities: 0,
      work: 0,
      clientName: "",
      beatPlan: "",
      startTime: "",
      endTime: "",
      purpose: "",
      outcome: "",
      missed: false,
      status: "Upcoming",
    });
    setEditId(null);
    setFormErrors({});
    setIsViewMode(false);
    setIsFormVisible(true);
  };

  const handleView = (item: MeItem) => {
    setFormData({
      employeeName: item.employeeName,
      location: item.location,
      punchedIn: item.punchedIn,
      activities: item.activities,
      work: item.work,
      clientName: item.clientName,
      beatPlan: item.beatPlan,
      startTime: item.startTime,
      endTime: item.endTime,
      purpose: item.purpose,
      outcome: item.outcome,
      missed: item.missed,
      status: item.status,
    });
    setEditId(item.id);
    setFormErrors({});
    setIsViewMode(true);
    setIsFormVisible(true);
  };

  const handleEdit = (item: MeItem) => {
    setFormData({
      employeeName: item.employeeName,
      location: item.location,
      punchedIn: item.punchedIn,
      activities: item.activities,
      work: item.work,
      clientName: item.clientName,
      beatPlan: item.beatPlan,
      startTime: item.startTime,
      endTime: item.endTime,
      purpose: item.purpose,
      outcome: item.outcome,
      missed: item.missed,
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { target: { name: string; value: any } }
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors: Partial<Omit<MeItem, "id">> = {};
    if (!formData.employeeName.trim()) errors.employeeName = "Employee Name is required.";
    if (!formData.location.trim()) errors.location = "Location is required.";
    if (!formData.clientName.trim()) errors.clientName = "Client Name is required.";
    if (!formData.beatPlan.trim()) errors.beatPlan = "Beat Plan is required.";
    if (!formData.startTime.trim()) errors.startTime = "Start Time is required.";
    if (!formData.endTime.trim()) errors.endTime = "End Time is required.";
    if (!formData.purpose.trim()) errors.purpose = "Purpose is required.";
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
      employeeName: "",
      location: "",
      punchedIn: "",
      activities: 0,
      work: 0,
      clientName: "",
      beatPlan: "",
      startTime: "",
      endTime: "",
      purpose: "",
      outcome: "",
      missed: false,
      status: "Upcoming",
    });
    setEditId(null);
    setFormErrors({});
    setIsFormVisible(false);
    setIsViewMode(false);
  };

  const handleFilterChange = (key: keyof typeof searchFilters, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleStatusFilter = (status: string) => {
    setActiveFilter(status);
    setCurrentPage(1);
  };

  const getFilteredData = () => {
    let filtered = data.filter((item) =>
      Object.entries(searchFilters).every(([key, val]) => {
        if (key === "activities" || key === "work") {
          return item[key as keyof MeItem]?.toString().includes(val);
        }
        if (key === "missed") {
          if (val === "") return true;
          return item.missed.toString() === val;
        }
        return item[key as keyof typeof searchFilters]?.toString().toLowerCase().includes(val.toLowerCase());
      })
    );

    if (activeFilter && activeFilter !== "All") {
      filtered = filtered.filter(item => item.status === activeFilter);
    }

    return filtered;
  };

  const filteredData = getFilteredData();

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusCount = (status: string) => {
    if (status === "All") return data.length;
    return data.filter(item => item.status === status).length;
  };

  const columns = [
    { label: "Actions", align: "center" },
    { label: "Employee Name" },
    { label: "Location" },
    { label: "Punched In" },
    { label: "Activities" },
    { label: "Work" },
    { label: "Client Name" },
    { label: "Beat Plan" },
    { label: "Start Time" },
    { label: "End Time" },
    { label: "Purpose" },
    { label: "Outcome" },
    { label: "Missed" },
  ];

  return (
    <>
      <div className="p-4 bg-white ">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            <TopSearch
              onSearch={() => setShowFilterRow((prev) => !prev)}
              onButtonClick={handleAddClick}
              buttons={[]}
            />

            <p className="-mt-4 -ml-5 text-gray-700">Showing</p>
            
            {/* Date Field */}
            <div className="flex items-center gap-2 -mt-4">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Top Performer Button */}
            <button className="flex items-center gap-2 px-4 py-2 -mt-4 border-gray-300 bg-gray-100 rounded-md text-gray-700">
              
              <span className="text-sm font-medium">Top Performer</span>
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                TP
              </div>
            </button>
          </div>
          
          {/* Status Filter Buttons */}
          <div className="flex flex-wrap gap-2 mt-3">
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => handleStatusFilter(status)}
                className={`px-3 py-1 text-sm rounded-md border transition-colors ${
                  activeFilter === status
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                }`}
              >
                {status} ({getStatusCount(status)})
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
                <td className="p-2 border-b border-gray-400 text-center" />
                {Object.entries(searchFilters).map(([key, val]) => (
                  <td className="p-2 border-b border-gray-400" key={key}>
                    {["location", "clientName", "beatPlan", "purpose", "outcome"].includes(key) ? (
                      <select
                        value={val}
                        onChange={(e) => handleFilterChange(key as keyof typeof searchFilters, e.target.value)}
                        className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                      >
                        <option value="">All</option>
                        {(key === "location" ? locations : 
                          key === "clientName" ? clientNames : 
                          key === "beatPlan" ? beatPlans :
                          key === "purpose" ? purposes :
                          outcomes).map((item) => (
                          <option key={item} value={item}>{item}</option>
                        ))}
                      </select>
                    ) : key === "missed" ? (
                      <select
                        value={val}
                        onChange={(e) => handleFilterChange(key as keyof typeof searchFilters, e.target.value)}
                        className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                      >
                        <option value="">All</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    ) : (
                      <input
                        value={val}
                        onChange={(e) => handleFilterChange(key as keyof typeof searchFilters, e.target.value)}
                        placeholder={`Search ${key}`}
                        type={["punchedIn", "startTime", "endTime"].includes(key) ? "time" : 
                              ["activities", "work"].includes(key) ? "number" : "text"}
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
                  <td className="p-3 border-b border-gray-400">{item.employeeName}</td>
                  <td className="p-3 border-b border-gray-400">{item.location}</td>
                  <td className="p-3 border-b border-gray-400">{item.punchedIn || '-'}</td>
                  <td className="p-3 border-b border-gray-400">{item.activities}</td>
                  <td className="p-3 border-b border-gray-400">{item.work}h</td>
                  <td className="p-3 border-b border-gray-400">{item.clientName}</td>
                  <td className="p-3 border-b border-gray-400">{item.beatPlan}</td>
                  <td className="p-3 border-b border-gray-400">{item.startTime}</td>
                  <td className="p-3 border-b border-gray-400">{item.endTime}</td>
                  <td className="p-3 border-b border-gray-400">{item.purpose}</td>
                  <td className="p-3 border-b border-gray-400">{item.outcome}</td>
                  <td className="p-3 border-b border-gray-400">{item.missed ? 'Yes' : 'No'}</td>
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