import React, { useState, useEffect } from "react";
import { FiEdit, FiEye, FiSearch } from "react-icons/fi";
import { GrSort } from "react-icons/gr";
import TableHead from "../../../components/TopHead";
import IconButton from "../../../components/IconButton";
import NoDataFound from "../../../components/NoDataFound";
import Pagination from "../../../components/Pagination";
import EmployeeMasterForm from "../../../forms/EmployeeMasterForm";
import FormModal from "../../../components/FormModal";

const industries = ["Unknown", "IT", "Healthcare", "Finance", "Manufacturing", "Retail", "Education"];
const territories = ["Unknown", "North", "South", "East", "West", "Central"];

interface EmployeeItem {
  id: number;
  employeeName: string;
  phone: string;
  email: string;
  industry: string;
  territory: string;
  addedOn?: Date;
  modifiedOn?: Date;
}

interface EmployeeMasterProps{
  onModalStateChange?: (isOpen: boolean) => void;
}

const EmployeeMaster: React.FC<EmployeeMasterProps> = ({onModalStateChange}) => {
  const [searchFilters, setSearchFilters] = useState({
    employeeName: "",
    phone: "",
    email: "",
    industry: "",
    territory: "",
  });

  const [data, setData] = useState<EmployeeItem[]>([]);
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [showSortCard, setShowSortCard] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState<Omit<EmployeeItem, "id">>({
    employeeName: "",
    phone: "",
    email: "",
    industry: "",
    territory: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<Omit<EmployeeItem, "id">>>({});
  const [editId, setEditId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isViewMode, setIsViewMode] = useState(false);
  const [sortFilters, setSortFilters] = useState({
    recent: {
      added: false,
      modified: false,
    },
    territory: {
      unknown: false,
    },
    industry: {
      unknown: false,
      it: false,
    },
  });
  const itemsPerPage = 5;

  useEffect(() => {
    setData([
      {
        id: 1,
        employeeName: "John Smith",
        phone: "+1-555-0123",
        email: "john.smith@company.com",
        industry: "IT",
        territory: "North",
        addedOn: new Date("2024-06-01"),
        modifiedOn: new Date("2024-06-05"),
      },
      {
        id: 2,
        employeeName: "Sarah Johnson",
        phone: "+1-555-0456",
        email: "sarah.johnson@company.com",
        industry: "Healthcare",
        territory: "South",
        addedOn: new Date("2024-06-02"),
        modifiedOn: new Date("2024-06-06"),
      },
      {
        id: 3,
        employeeName: "Michael Brown",
        phone: "+1-555-0789",
        email: "michael.brown@company.com",
        industry: "Finance",
        territory: "East",
        addedOn: new Date("2024-06-03"),
        modifiedOn: new Date("2024-06-07"),
      },
      {
        id: 4,
        employeeName: "Unknown Employee",
        phone: "+1-555-0321",
        email: "unknown@company.com",
        industry: "Unknown",
        territory: "Unknown",
        addedOn: new Date("2024-06-04"),
        modifiedOn: new Date("2024-06-08"),
      },
      {
        id: 5,
        employeeName: "Emily Davis",
        phone: "+1-555-0654",
        email: "emily.davis@company.com",
        industry: "Retail",
        territory: "West",
        addedOn: new Date("2024-06-05"),
        modifiedOn: new Date("2024-06-09"),
      },
    ]);
  }, []);

  // Notify parent component when modal state changes
  useEffect(() => {
    if (onModalStateChange) {
      onModalStateChange(isFormVisible);
    }
  }, [isFormVisible, onModalStateChange]);

  const handleButtonClick = (buttonName: string) => {
    switch (buttonName) {
      case "Add Employee":
        handleAddClick();
        break;
      case "Import Employee":
        console.log("Import Employee clicked");
        break;
      case "Import Employee Fields":
        console.log("Import Employee Fields clicked");
        break;
      case "Import Contacts":
        console.log("Import Contacts clicked");
        break;
      case "Add Custom Field":
        console.log("Add Custom Field clicked");
        break;
      case "Merge Employee":
        console.log("Merge Employee clicked");
        break;
      case "Export Contacts":
        console.log("Export Contacts clicked");
        break;
      default:
        break;
    }
  };

  const handleAddClick = () => {
    setFormData({
      employeeName: "",
      phone: "",
      email: "",
      industry: "",
      territory: "",
    });
    setEditId(null);
    setFormErrors({});
    setIsViewMode(false);
    setIsFormVisible(true);
  };

  const handleView = (item: EmployeeItem) => {
    setFormData({
      employeeName: item.employeeName,
      phone: item.phone,
      email: item.email,
      industry: item.industry,
      territory: item.territory,
    });
    setEditId(item.id);
    setFormErrors({});
    setIsViewMode(true);
    setIsFormVisible(true);
  };

  const handleEdit = (item: EmployeeItem) => {
    setFormData({
      employeeName: item.employeeName,
      phone: item.phone,
      email: item.email,
      industry: item.industry,
      territory: item.territory,
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors: Partial<Omit<EmployeeItem, "id">> = {};
    if (!formData.employeeName.trim()) errors.employeeName = "Employee name is required.";
    if (!formData.phone.trim()) errors.phone = "Phone is required.";
    if (!formData.email.trim()) errors.email = "Email is required.";
    if (!formData.industry.trim()) errors.industry = "Industry is required.";
    if (!formData.territory.trim()) errors.territory = "Territory is required.";
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
          item.id === editId ? { ...item, ...formData, modifiedOn: new Date() } : item
        )
      );
    } else {
      setData((prev) => [...prev, {
        id: Date.now(),
        ...formData,
        addedOn: new Date(),
        modifiedOn: new Date()
      }]);
    }

    setFormData({
      employeeName: "",
      phone: "",
      email: "",
      industry: "",
      territory: "",
    });
    setEditId(null);
    setFormErrors({});
    setIsFormVisible(false);
    setIsViewMode(false);
  };

  const handleFilterChange = (key: keyof typeof searchFilters, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSortFilterChange = (category: string, key: string, checked: boolean) => {
    setSortFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: checked,
      },
    }));
  };

  const getFilteredData = () => {
    let filtered = data.filter((item) =>
      Object.entries(searchFilters).every(([key, val]) => {
        return item[key as keyof typeof searchFilters]?.toString().toLowerCase().includes(val.toLowerCase());
      })
    );

    // Apply sort filters
    if (sortFilters.territory.unknown) {
      filtered = filtered.filter(item => item.territory === "Unknown");
    }

    if (sortFilters.industry.unknown) {
      filtered = filtered.filter(item => item.industry === "Unknown");
    }

    if (sortFilters.industry.it) {
      filtered = filtered.filter(item => item.industry === "IT");
    }

    // Sort by recent if selected
    if (sortFilters.recent.added || sortFilters.recent.modified) {
      filtered = filtered.sort((a, b) => {
        if (sortFilters.recent.added && a.addedOn && b.addedOn) {
          return b.addedOn.getTime() - a.addedOn.getTime();
        }
        if (sortFilters.recent.modified && a.modifiedOn && b.modifiedOn) {
          return b.modifiedOn.getTime() - a.modifiedOn.getTime();
        }
        return 0;
      });
    }

    return filtered;
  };

  const filteredData = getFilteredData();

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { label: "Actions", align: "center" },
    { label: "Employee Name" },
    { label: "Phone" },
    { label: "Email" },
    { label: "Industry" },
    { label: "Territory" },
  ];

  const buttons = [
    "Add Employee",
    "Import Employee",
    "Import Employee Fields",
    "Import Contacts",
    "Add Custom Field",
    "Merge Employee",
    "Export Contacts"
  ];

  // Separate "Add Employee" button from the rest
  const addEmployeeButton = buttons[0];
  const remainingButtons = buttons.slice(1);


  return (
    <>
      <div className="p-4 bg-white">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            {/* Search Icon */}
            <button
              onClick={() => setShowFilterRow((prev) => !prev)}
              className="p-2 text-gray-600 hover:text-blue-600"
            >
              <FiSearch size={25} /> 
            </button>

            

            {/* Sort Icon */}
            <IconButton
              tooltip="Sort"
              className="hover:text-blue-600 relative mr-2 text-xl text-gray-400 cursor-pointer"
              onClick={() => setShowSortCard((prev) => !prev)}
            >
              <GrSort size={20} />
            </IconButton>

            {/* Add Employee Button */}
            <button
              onClick={() => handleButtonClick(addEmployeeButton)}
              className="bg-white text-[#5E5E5E] px-3 py-2 rounded-md border border-[#9E9E9E] transition cursor-pointer"
            >
              {addEmployeeButton}
            </button>

            {/* Remaining Buttons */}
            <div className="flex flex-wrap gap-4">
              {remainingButtons.map((btn) => (
                <button
                  key={btn}
                  onClick={() => handleButtonClick(btn)}
                  className="bg-white text-[#5E5E5E] px-3 py-2 rounded-md border border-[#9E9E9E] transition cursor-pointer"
                >
                  {btn}
                </button>
              ))}
            </div>

          </div>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredData.length / itemsPerPage)}
          totalItems={filteredData.length}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Sort Card */}
      {showSortCard && (
        <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg p-4 w-64">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">Recent</h3>
            <hr className="border-gray-200 mb-3" />
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={sortFilters.recent.added}
                  onChange={(e) => handleSortFilterChange('recent', 'added', e.target.checked)}
                  className="mr-2"
                />
                Added
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={sortFilters.recent.modified}
                  onChange={(e) => handleSortFilterChange('recent', 'modified', e.target.checked)}
                  className="mr-2"
                />
                Modified
              </label>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">Territory</h3>
            <hr className="border-gray-200 mb-3" />
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={sortFilters.territory.unknown}
                onChange={(e) => handleSortFilterChange('territory', 'unknown', e.target.checked)}
                className="mr-2"
              />
              Unknown
            </label>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">Industry</h3>
            <hr className="border-gray-200 mb-3" />
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={sortFilters.industry.unknown}
                  onChange={(e) => handleSortFilterChange('industry', 'unknown', e.target.checked)}
                  className="mr-2"
                />
                Unknown
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={sortFilters.industry.it}
                  onChange={(e) => handleSortFilterChange('industry', 'it', e.target.checked)}
                  className="mr-2"
                />
                IT
              </label>
            </div>
          </div>
        </div>
      )}

    

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto">
          <TableHead columns={columns} />
          <tbody>
            {showFilterRow && (
              <tr>
                <td className="p-2 border-b border-gray-400 text-center" />
                {Object.entries(searchFilters).map(([key, val]) => (
                  <td className="p-2 border-b border-gray-400" key={key}>
                    {["industry", "territory"].includes(key) ? (
                      <select
                        value={val}
                        onChange={(e) => handleFilterChange(key as keyof typeof searchFilters, e.target.value)}
                        className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                      >
                        <option value="">All</option>
                        {(key === "industry" ? industries : territories).map((item) => (
                          <option key={item} value={item}>{item}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        value={val}
                        onChange={(e) => handleFilterChange(key as keyof typeof searchFilters, e.target.value)}
                        placeholder={`Search ${key}`}
                        type={key === "email" ? "email" : "text"}
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
                  <td className="p-3 border-b border-gray-400">{item.phone}</td>
                  <td className="p-3 border-b border-gray-400 text-blue-600">{item.email}</td>
                  <td className="p-3 border-b border-gray-400">{item.industry}</td>
                  <td className="p-3 border-b border-gray-400">{item.territory}</td>
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
      <EmployeeMasterForm
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

export default EmployeeMaster;