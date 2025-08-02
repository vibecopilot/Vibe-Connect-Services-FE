import React, { useState, useEffect } from "react";
import { FiEdit, FiEye, FiSearch } from "react-icons/fi";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; 
import TableHead from "../../../components/TopHead"; 
import IconButton from "../../../components/IconButton"; 
import NoDataFound from "../../../components/NoDataFound"; 
import Pagination from "../../../components/Pagination"; 
import UsersForm from "../../../forms/UsersForm"; 
import FormModal from "../../../components/FormModal";

const departments = [
  "Unknown",
  "Engineering",
  "Human Resources",
  "Sales",
  "Marketing",
  "Finance",
  "Operations",
];
const territories = [
  "Unknown",
  "North",
  "South",
  "East",
  "West",
  "Central",
];

// Interface for a single user item, updated as per requirements
interface UserItem {
  id: number;
  employeeCode: string;
  name: string;
  email: string;
  mobile: string;
  department: string;
  territory: string;
  active: boolean; // New field for active status
  addedOn?: Date;
  modifiedOn?: Date;
}

interface UsersProps{
  onModalStateChange?: (isOpen: boolean) => void;
}

const Users: React.FC<UsersProps> = ({onModalStateChange}) => {
  // State for search filters, updated to match UserItem fields
  const [searchFilters, setSearchFilters] = useState({
    employeeCode: "",
    name: "",
    email: "",
    mobile: "",
    department: "",
    territory: "",
    active: "", // Use string for filter dropdown ('true', 'false', '')
  });

  const [data, setData] = useState<UserItem[]>([]); // Current displayed data
  const [originalData, setOriginalData] = useState<UserItem[]>([]); // To store all data for "Show All Users"
  const [showFilterRow, setShowFilterRow] = useState(false); // State to toggle filter row visibility
  const [isFormVisible, setIsFormVisible] = useState(false); // State to control form visibility
  // State for form data, matches UserItem structure (excluding id)
  const [formData, setFormData] = useState<Omit<UserItem, "id">>({
    employeeCode: "",
    name: "",
    email: "",
    mobile: "",
    department: "",
    territory: "",
    active: true, // Default to active for new users
  });
  // State for form validation errors
  const [formErrors, setFormErrors] = useState<Partial<Omit<UserItem, "id">>>({});
  const [editId, setEditId] = useState<number | null>(null); // Stores the ID of the user being edited
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [isViewMode, setIsViewMode] = useState(false); // State for view mode (form disabled)
  const itemsPerPage = 5; // Number of items to display per page

  // useEffect to populate initial data on component mount
  useEffect(() => {
    const initialUsers: UserItem[] = [
      {
        id: 1,
        employeeCode: "EMP001",
        name: "Alice Smith",
        mobile: "123-456-7890",
        email: "alice.s@example.com",
        department: "Engineering",
        territory: "North",
        active: true,
        addedOn: new Date("2024-05-10T10:00:00Z"),
        modifiedOn: new Date("2024-05-15T11:30:00Z"),
      },
      {
        id: 2,
        employeeCode: "EMP002",
        name: "Bob Johnson",
        mobile: "987-654-3210",
        email: "bob.j@example.com",
        department: "Sales",
        territory: "South",
        active: false,
        addedOn: new Date("2024-05-12T14:00:00Z"),
        modifiedOn: new Date("2024-05-18T09:15:00Z"),
      },
      {
        id: 3,
        employeeCode: "EMP003",
        name: "Charlie Brown",
        mobile: "555-123-4567",
        email: "charlie.b@example.com",
        department: "Marketing",
        territory: "East",
        active: true,
        addedOn: new Date("2024-05-15T09:00:00Z"),
        modifiedOn: new Date("2024-05-20T16:00:00Z"),
      },
      {
        id: 4,
        employeeCode: "EMP004",
        name: "Diana Prince",
        mobile: "111-222-3333",
        email: "diana.p@example.com",
        department: "Human Resources",
        territory: "West",
        active: true,
        addedOn: new Date("2024-05-18T11:00:00Z"),
        modifiedOn: new Date("2024-05-22T10:00:00Z"),
      },
      {
        id: 5,
        employeeCode: "EMP005",
        name: "Eve Adams",
        mobile: "444-555-6666",
        email: "eve.a@example.com",
        department: "Finance",
        territory: "Central",
        active: false,
        addedOn: new Date("2024-05-20T13:00:00Z"),
        modifiedOn: new Date("2024-05-25T14:00:00Z"),
      },
      {
        id: 6,
        employeeCode: "EMP006",
        name: "Frank White",
        mobile: "777-888-9999",
        email: "frank.w@example.com",
        department: "Operations",
        territory: "North",
        active: true,
        addedOn: new Date("2024-05-22T08:00:00Z"),
        modifiedOn: new Date("2024-05-28T10:00:00Z"),
      },
    ];
    setData(initialUsers);
    setOriginalData(initialUsers); // Store the original data
  }, []);

  // Notify parent component when modal state changes
  useEffect(() => {
    if (onModalStateChange) {
      onModalStateChange(isFormVisible);
    }
  }, [isFormVisible, onModalStateChange]);

  // Handler for button clicks (Add Users, Export, Import, Show All)
  const handleButtonClick = (buttonName: string) => {
    switch (buttonName) {
      case "Add Users":
        handleAddClick();
        break;
      case "Export Users":
        console.log("Export Users clicked");
        // Implement export logic here
        break;
      case "Import Users":
        console.log("Import Users clicked");
        // Implement import logic here
        break;
      case "Show All Users":
        // Reset filters and display all original data
        setSearchFilters({
          employeeCode: "",
          name: "",
          email: "",
          mobile: "",
          department: "",
          territory: "",
          active: "",
        });
        setData(originalData);
        setCurrentPage(1); // Reset to first page
        setShowFilterRow(false); // Hide filter row when showing all
        console.log("Show All Users clicked");
        break;
      default:
        break;
    }
  };

  // Handler for adding a new user (opens form)
  const handleAddClick = () => {
    setFormData({
      employeeCode: "",
      name: "",
      email: "",
      mobile: "",
      department: "",
      territory: "",
      active: true, // Default new user to active
    });
    setEditId(null);
    setFormErrors({});
    setIsViewMode(false);
    setIsFormVisible(true);
  };

  // Handler for viewing user details (opens form in view mode)
  const handleView = (item: UserItem) => {
    setFormData({
      employeeCode: item.employeeCode,
      name: item.name,
      email: item.email,
      mobile: item.mobile,
      department: item.department,
      territory: item.territory,
      active: item.active,
    });
    setEditId(item.id);
    setFormErrors({});
    setIsViewMode(true);
    setIsFormVisible(true);
  };

  // Handler for editing user details (opens form in edit mode)
  const handleEdit = (item: UserItem) => {
    setFormData({
      employeeCode: item.employeeCode,
      name: item.name,
      email: item.email,
      mobile: item.mobile,
      department: item.department,
      territory: item.territory,
      active: item.active,
    });
    setEditId(item.id);
    setFormErrors({});
    setIsViewMode(false);
    setIsFormVisible(true);
  };

  // Handler for cancelling form operations (closes form)
  const handleCancel = () => {
    setIsFormVisible(false);
    setFormErrors({});
    setEditId(null);
    setIsViewMode(false);
  };

  // Handler for changes within the form inputs
  const handleFormChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
      | { target: { name: string; value: string | boolean } }
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Directly assign value
    }));
  };

  // Function to validate form inputs
  const validateForm = () => {
    const errors: Partial<Omit<UserItem, "id">> = {};
    if (!formData.employeeCode.trim()) errors.employeeCode = "Employee Code is required.";
    if (!formData.name.trim()) errors.name = "User name is required.";
    if (!formData.mobile.trim()) errors.mobile = "Mobile is required.";
    if (!formData.email.trim()) errors.email = "Email is required.";
    if (!formData.department.trim()) errors.department = "Department is required.";
    if (!formData.territory.trim()) errors.territory = "Territory is required.";
    // No specific validation for `active` as it's a boolean controlled by checkbox
    return errors;
  };

  // Handler for submitting the form (add or update user)
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (editId !== null) {
      // Update existing user
      setData((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...item, ...formData, modifiedOn: new Date() } : item
        )
      );
      setOriginalData((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...item, ...formData, modifiedOn: new Date() } : item
        )
      );
    } else {
      // Add new user
      const newUser: UserItem = {
        id: Date.now(), // Simple unique ID
        ...formData,
        addedOn: new Date(),
        modifiedOn: new Date(),
      };
      setData((prev) => [...prev, newUser]);
      setOriginalData((prev) => [...prev, newUser]);
    }

    // Reset form states
    setFormData({
      employeeCode: "",
      name: "",
      email: "",
      mobile: "",
      department: "",
      territory: "",
      active: true,
    });
    setEditId(null);
    setFormErrors({});
    setIsFormVisible(false);
    setIsViewMode(false);
  };

  // Handler for changes in search filter inputs
  const handleFilterChange = (key: keyof typeof searchFilters, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Function to filter data based on search filters
  const getFilteredData = () => {
    return originalData.filter((item) => {
      // Filter by Employee Code
      if (searchFilters.employeeCode && !item.employeeCode.toLowerCase().includes(searchFilters.employeeCode.toLowerCase())) {
        return false;
      }
      // Filter by Name
      if (searchFilters.name && !item.name.toLowerCase().includes(searchFilters.name.toLowerCase())) {
        return false;
      }
      // Filter by Email
      if (searchFilters.email && !item.email.toLowerCase().includes(searchFilters.email.toLowerCase())) {
        return false;
      }
      // Filter by Mobile
      if (searchFilters.mobile && !item.mobile.toLowerCase().includes(searchFilters.mobile.toLowerCase())) {
        return false;
      }
      // Filter by Department (dropdown)
      if (searchFilters.department && searchFilters.department !== "All" && item.department !== searchFilters.department) {
        return false;
      }
      // Filter by Territory (dropdown)
      if (searchFilters.territory && searchFilters.territory !== "All" && item.territory !== searchFilters.territory) {
        return false;
      }
      // Filter by Active status (dropdown: 'true', 'false', 'All')
      if (searchFilters.active !== "" && searchFilters.active !== "All") {
        const filterActive = searchFilters.active === "true";
        if (item.active !== filterActive) {
          return false;
        }
      }
      return true;
    });
  };

  const filteredData = getFilteredData();

  // Apply pagination to the filtered data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Column definitions for the table header
  const columns = [
    { label: "Actions", align: "center" },
    { label: "Employee Code" },
    { label: "Name" },
    { label: "Email" },
    { label: "Mobile" },
    { label: "Department" },
    { label: "Territory" },
    { label: "Active", align: "center" },
  ];

  // Buttons for the header section
  const headerButtons = [
    "Add Users",
    "Export Users",
    "Import Users",
    "Show All Users",
  ];

  return (
    <>
      <div className="p-4 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="flex items-center space-x-2 flex-wrap mb-4 md:mb-0">
          {/* Search Icon to toggle filter row */}
          <button
            onClick={() => setShowFilterRow((prev) => !prev)}
            className="p-2 text-gray-600 hover:text-blue-600 rounded-full transition-colors"
            title="Toggle Search Filters"
          >
            <FiSearch size={21} />
          </button>

          {/* New Buttons: Add Users, Export, Import, Show All */}
          <div className="flex flex-wrap gap-2">
            {headerButtons.map((btn) => (
              <button
                key={btn}
                onClick={() => handleButtonClick(btn)}
                className="bg-white text-[#5E5E5E] px-3 py-2 rounded-md border border-[#9E9E9E] hover:bg-gray-100 transition cursor-pointer text-sm"
              >
                {btn}
              </button>
            ))}
          </div>
        </div>

        {/* Pagination Controls */}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredData.length / itemsPerPage)}
          totalItems={filteredData.length}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Main Table Section */}
      <div className="overflow-x-auto mt-4 rounded-md">
        <table className="min-w-full table-auto">
          <TableHead columns={columns} />
          <tbody>
            {/* Filter Row (conditionally rendered) */}
            {showFilterRow && (
              <tr className="border-b border-gray-200">
                <td className="p-2 text-center" /> {/* Empty for Actions column */}
                {/* Employee Code Filter */}
                <td className="p-2">
                  <input
                    value={searchFilters.employeeCode}
                    onChange={(e) => handleFilterChange("employeeCode", e.target.value)}
                    placeholder="Search Code"
                    type="text"
                    className="w-full px-2 py-1 text-sm border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
                {/* Name Filter */}
                <td className="p-2">
                  <input
                    value={searchFilters.name}
                    onChange={(e) => handleFilterChange("name", e.target.value)}
                    placeholder="Search Name"
                    type="text"
                    className="w-full px-2 py-1 text-sm border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
                {/* Email Filter */}
                <td className="p-2">
                  <input
                    value={searchFilters.email}
                    onChange={(e) => handleFilterChange("email", e.target.value)}
                    placeholder="Search Email"
                    type="email"
                    className="w-full px-2 py-1 text-sm border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
                {/* Mobile Filter */}
                <td className="p-2">
                  <input
                    value={searchFilters.mobile}
                    onChange={(e) => handleFilterChange("mobile", e.target.value)}
                    placeholder="Search Mobile"
                    type="tel"
                    className="w-full px-2 py-1 text-sm border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
                {/* Department Filter */}
                <td className="p-2">
                  <select
                    value={searchFilters.department}
                    onChange={(e) => handleFilterChange("department", e.target.value)}
                    className="w-full px-2 py-1 text-sm border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All</option>
                    {departments.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </td>
                {/* Territory Filter */}
                <td className="p-2">
                  <select
                    value={searchFilters.territory}
                    onChange={(e) => handleFilterChange("territory", e.target.value)}
                    className="w-full px-2 py-1 text-sm border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All</option>
                    {territories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </td>
                {/* Active Filter */}
                <td className="p-2">
                  <select
                    value={searchFilters.active}
                    onChange={(e) => handleFilterChange("active", e.target.value)}
                    className="w-full px-2 py-1 text-sm border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All</option>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </td>
              </tr>
            )}

            {/* Table Body - User Data Rows */}
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 border-b border-gray-200">
                  {/* Actions Column */}
                  <td className="p-3 text-center space-x-3">
                    <IconButton
                      tooltip="View"
                      className="hover:text-blue-600 text-gray-500"
                      onClick={() => handleView(item)}
                    >
                      <FiEye />
                    </IconButton>
                    <IconButton
                      tooltip="Edit"
                      className="hover:text-green-600 text-gray-500"
                      onClick={() => handleEdit(item)}
                    >
                      <FiEdit />
                    </IconButton>
                  </td>
                  {/* Data Columns */}
                  <td className="p-3">{item.employeeCode}</td>
                  <td className="p-3">{item.name}</td>
                  <td className="p-3 text-blue-600">{item.email}</td>
                  <td className="p-3">{item.mobile}</td>
                  <td className="p-3">{item.department}</td>
                  <td className="p-3">{item.territory}</td>
                  {/* Active Status Column with Icons */}
                  <td className="p-3 text-center">
                    {item.active ? (
                      <FaCheckCircle className="text-green-500 inline-block" title="Active" />
                    ) : (
                      <FaTimesCircle className="text-red-500 inline-block" title="Inactive" />
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-8 text-gray-500">
                  <NoDataFound />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    <FormModal isOpen={isFormVisible} onClose={handleCancel}>
      <UsersForm
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

export default Users;
