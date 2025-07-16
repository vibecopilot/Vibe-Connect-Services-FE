import React, { useState, useEffect } from "react";
import { FiEdit, FiEye } from "react-icons/fi";
import TableHead from "../../components/TopHead";
import TopSearch from "../../components/TopSearch";
import IconButton from "../../components/IconButton";
import NoDataFound from "../../components/NoDataFound";
import Pagination from "../../components/Pagination";
import ToggleSwitch from "../../components/ToggleSwitch";
import VisitBeatPlansForm from "../../forms/VisitBeatPlansForm";
import FormModal from "../../components/FormModal";

interface VisitBeatPlanItem {
  id: number;
  name: string;
  createdBy: string;
  createdOn: Date | null;
  visits: number;
  assignedTo: string;
  status: boolean;
}

interface VisitBeatsPlanProps{
  onModalStateChange?: (isOpen: boolean) => void;
}

const VisitBeatPlans: React.FC<VisitBeatsPlanProps> = ({onModalStateChange}) => {
  const [searchFilters, setSearchFilters] = useState({
    name: "",
    createdBy: "",
    createdOn: "",
    visits: "",
    assignedTo: "",
    status: "",
  });

  const [data, setData] = useState<VisitBeatPlanItem[]>([]);
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Omit<VisitBeatPlanItem, "id">>({
    name: "",
    createdBy: "",
    createdOn: null,
    visits: 0,
    assignedTo: "",
    status: false,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({});
  const [errorMessage, setErrorMessage] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState("All");
  const [checkboxes, setCheckboxes] = useState({
    createBeatPlan: false,
    logMeeting: false,
  });
  const itemsPerPage = 5;

  useEffect(() => {
    setData([
      {
        id: 1,
        name: "Q1 Sales Beat Plan",
        createdBy: "John Doe",
        createdOn: new Date("2024-11-15"),
        visits: 25,
        assignedTo: "Alice Smith",
        status: true,
      },
      {
        id: 2,
        name: "Regional Coverage Plan",
        createdBy: "Jane Wilson",
        createdOn: new Date("2024-10-20"),
        visits: 18,
        assignedTo: "Bob Johnson",
        status: false,
      },
      {
        id: 3,
        name: "Customer Outreach Plan",
        createdBy: "Mike Davis",
        createdOn: new Date("2024-12-01"),
        visits: 32,
        assignedTo: "Carol Brown",
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

  const validateForm = () => {
    const errs: Partial<Record<keyof typeof formData, string>> = {};
    if (!formData.name.trim())
      errs.name = "Name is required.";
    if (!formData.createdBy.trim())
      errs.createdBy = "Created By is required.";
    if (!formData.createdOn)
      errs.createdOn = "Created On date is required.";
    if (!formData.assignedTo.trim())
      errs.assignedTo = "Assigned To is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({ ...prev, createdOn: date }));
  };

  const handleToggleChange = () => {
    setFormData((prev) => ({ ...prev, status: !prev.status }));
  };

  const handleAddClick = () => {
    setFormData({
      name: "",
      createdBy: "",
      createdOn: null,
      visits: 0,
      assignedTo: "",
      status: false,
    });
    setEditId(null);
    setIsViewMode(false);
    setShowForm(true);
    setErrors({});
    setErrorMessage("");
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditId(null);
    setIsViewMode(false);
    setErrors({});
    setErrorMessage("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If in view mode, don't process the form
    if (isViewMode) {
      handleCancel();
      return;
    }

    if (!validateForm()) {
      return;
    }

    if (editId !== null) {
      setData((prev) =>
        prev.map((item) =>
          item.id === editId ? { id: editId, ...formData } : item
        )
      );
    } else {
      setData((prev) => [...prev, { id: Date.now(), ...formData }]);
    }

    handleCancel();
  };

  const handleEdit = (item: VisitBeatPlanItem) => {
    const { id, ...rest } = item;
    setFormData({
      ...rest,
      createdOn: rest.createdOn
        ? new Date(rest.createdOn)
        : null,
    });
    setEditId(id);
    setIsViewMode(false);
    setShowForm(true);
    setErrors({});
    setErrorMessage("");
  };

  const handleView = (item: VisitBeatPlanItem) => {
    const { id, ...rest } = item;
    setFormData({
      ...rest,
      createdOn: rest.createdOn
        ? new Date(rest.createdOn)
        : null,
    });
    setEditId(id);
    setIsViewMode(true);
    setShowForm(true);
    setErrors({});
    setErrorMessage("");
  };

  const handleFilterChange = (
    key: keyof typeof searchFilters,
    value: string
  ) => {
    setSearchFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOption(value);
    
    // Toggle checkbox when option is selected
    if (value === "Create a beat plan") {
      setCheckboxes((prev) => ({
        ...prev,
        createBeatPlan: !prev.createBeatPlan,
      }));
    } else if (value === "Log a Meeting") {
      setCheckboxes((prev) => ({
        ...prev,
        logMeeting: !prev.logMeeting,
      }));
    }
  };

  const handleExport = () => {
    // Handle export functionality here
    console.log("Exporting data...");
  };

  const filteredData = data.filter((item) =>
    Object.entries(searchFilters).every(([key, val]) => {
      if (!val) return true;

      if (key === "createdOn" && item.createdOn) {
        const formattedDate = item.createdOn.toISOString().slice(0, 10);
        return formattedDate === val;
      }

      if (key === "status") {
        if (val === "active") return item.status === true;
        if (val === "inactive") return item.status === false;
        return true;
      }

      const field = item[key as keyof VisitBeatPlanItem];
      if (field === null || field === undefined) return false;
      return field.toString().toLowerCase().includes(val.toLowerCase());
    })
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { label: "Actions", align: "center" },
    { label: "Name" },
    { label: "Created By" },
    { label: "Created On" },
    { label: "Visits" },
    { label: "Assigned to" },
    { label: "Status", align: "center" },
  ];

  return (
    <>
      <div className="p-4 bg-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <TopSearch
            onSearch={() => setShowFilterRow((prev) => !prev)}
            onButtonClick={handleAddClick}
            buttons={[]}
          />
          
          <select
            value={selectedOption}
            onChange={handleSelectChange}
            className="h-10 px-3 py-2 -mt-4 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Create a beat plan">
              <span className="inline-flex items-center">
                <input 
                  type="checkbox" 
                  checked={checkboxes.createBeatPlan} 
                  className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" 
                  readOnly 
                />
                Create a beat plan
              </span>
            </option>
            <option value="Log a Meeting">
              <span className="inline-flex items-center">
                <input 
                  type="checkbox" 
                  checked={checkboxes.logMeeting} 
                  className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" 
                  readOnly 
                />
                Log a Meeting
              </span>
            </option>
          </select>

          <button
            onClick={handleExport}
            className="h-10 px-4 py-2 -mt-4 border-2 border-blue-800 rounded-md text-sm cursor-pointer transition-all duration-200 text-blue-800 hover:bg-blue-50 hover:border-blue-700 hover:text-blue-800"
          >
            Export
          </button>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredData.length / itemsPerPage) || 1}
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
                <td className="p-2 border-b border-gray-400">
                  <input
                    name="name"
                    value={searchFilters.name}
                    onChange={(e) =>
                      handleFilterChange("name", e.target.value)
                    }
                    placeholder="Filter Name"
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  />
                </td>
                <td className="p-2 border-b border-gray-400">
                  <input
                    name="createdBy"
                    value={searchFilters.createdBy}
                    onChange={(e) =>
                      handleFilterChange("createdBy", e.target.value)
                    }
                    placeholder="Filter Created By"
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  />
                </td>
                <td className="p-2 border-b border-gray-400">
                  <input
                    name="createdOn"
                    type="date"
                    value={searchFilters.createdOn}
                    onChange={(e) =>
                      handleFilterChange("createdOn", e.target.value)
                    }
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  />
                </td>
                <td className="p-2 border-b border-gray-400">
                  <input
                    name="visits"
                    value={searchFilters.visits}
                    onChange={(e) =>
                      handleFilterChange("visits", e.target.value)
                    }
                    placeholder="Filter Visits"
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  />
                </td>
                <td className="p-2 border-b border-gray-400">
                  <input
                    name="assignedTo"
                    value={searchFilters.assignedTo}
                    onChange={(e) =>
                      handleFilterChange("assignedTo", e.target.value)
                    }
                    placeholder="Filter Assigned To"
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  />
                </td>
                <td className="p-2 border-b border-gray-400 text-center">
                  <select
                    name="status"
                    value={searchFilters.status}
                    onChange={(e) =>
                      handleFilterChange("status", e.target.value)
                    }
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  >
                    <option value="">All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </td>
              </tr>
            )}

            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <NoDataFound />
                </td>
              </tr>
            ) : (
              paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="p-3 border-b border-gray-400 text-center space-x-3">
                    <IconButton
                      tooltip="View"
                      className="hover:text-blue-600"
                      onClick={() => handleView(item)}
                    >
                      <FiEye />
                    </IconButton>
                    <IconButton
                      tooltip="Edit"
                      className="hover:text-green-600"
                      onClick={() => handleEdit(item)}
                    >
                      <FiEdit />
                    </IconButton>
                  </td>
                  <td className="p-2 border-b border-gray-400">{item.name}</td>
                  <td className="p-2 border-b border-gray-400">{item.createdBy}</td>
                  <td className="p-2 border-b border-gray-400">
                    {item.createdOn
                      ? item.createdOn.toLocaleDateString("en-US")
                      : "-"}
                  </td>
                  <td className="p-2 border-b border-gray-400">{item.visits}</td>
                  <td className="p-2 border-b border-gray-400">{item.assignedTo}</td>
                  <td className="p-2 border-b border-gray-400 text-center">
                    <ToggleSwitch
                      checked={item.status}
                      onChange={() => {}}
                      disabled={true}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
    <FormModal isOpen={showForm} onClose={handleCancel}>
      <div className="my-4">
          <VisitBeatPlansForm
            formData={formData}
            errors={errors}
            errorMessage={errorMessage}
            onChange={handleChange}
            onDateChange={handleDateChange}
            onToggleChange={handleToggleChange}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isEditing={editId !== null && !isViewMode}
            isViewMode={isViewMode}
          />
        </div>
    </FormModal>
    </>
  );
};

export default VisitBeatPlans;