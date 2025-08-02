import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import TableHead from "../../../components/TopHead"; // Corrected relative path
import NoDataFound from "../../../components/NoDataFound"; // Corrected relative path
import Pagination from "../../../components/Pagination"; // Corrected relative path

// Define options for Type dropdown
const shiftTypes = [
  "Regular",
  "Night",
  "Rotating",
  "Flexible",
  "Split",
];

// Define options for Week Start dropdown
const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Interface for a single shift item
interface ShiftItem {
  id: number;
  name: string;
  type: string;
  timing: string;
  hours: string;
  grace: string;
  halfDay: string;
  locations: string;
  departments: string;
  addedOn?: Date;
  modifiedOn?: Date;
}

const Shifts: React.FC = () => {
  // State for search filters
  const [searchFilters, setSearchFilters] = useState({
    name: "",
    type: "",
    timing: "",
    hours: "",
    grace: "",
    halfDay: "",
    locations: "",
    departments: "",
  });

  const [data, setData] = useState<ShiftItem[]>([]); // Current displayed data
  const [originalData, setOriginalData] = useState<ShiftItem[]>([]); // To store all data
  const [showFilterRow, setShowFilterRow] = useState(false); // State to toggle filter row visibility
  const [weekStartsOn, setWeekStartsOn] = useState("Monday"); // State for week start dropdown
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const itemsPerPage = 5; // Number of items to display per page

  // useEffect to populate initial data on component mount
  useEffect(() => {
    const initialShifts: ShiftItem[] = [
      {
        id: 1,
        name: "Morning Shift",
        type: "Regular",
        timing: "9:30 AM - 6:30 PM",
        hours: "9.00 hrs",
        grace: "30 min",
        halfDay: "5.00 hrs",
        locations: "All",
        departments: "To be Assigned",
        addedOn: new Date("2024-05-10T10:00:00Z"),
        modifiedOn: new Date("2024-05-15T11:30:00Z"),
      },
      {
        id: 2,
        name: "Evening Shift",
        type: "Regular",
        timing: "2:00 PM - 11:00 PM",
        hours: "9.00 hrs",
        grace: "15 min",
        halfDay: "5.00 hrs",
        locations: "All",
        departments: "To be Assigned",
        addedOn: new Date("2024-05-12T14:00:00Z"),
        modifiedOn: new Date("2024-05-18T09:15:00Z"),
      },
      {
        id: 3,
        name: "Night Shift",
        type: "Night",
        timing: "11:00 PM - 8:00 AM",
        hours: "9.00 hrs",
        grace: "45 min",
        halfDay: "5.00 hrs",
        locations: "All",
        departments: "To be Assigned",
        addedOn: new Date("2024-05-15T09:00:00Z"),
        modifiedOn: new Date("2024-05-20T16:00:00Z"),
      },
      {
        id: 4,
        name: "Flexible Hours",
        type: "Flexible",
        timing: "10:00 AM - 7:00 PM",
        hours: "9.00 hrs",
        grace: "30 min",
        halfDay: "4.50 hrs",
        locations: "All",
        departments: "To be Assigned",
        addedOn: new Date("2024-05-18T11:00:00Z"),
        modifiedOn: new Date("2024-05-22T10:00:00Z"),
      },
      {
        id: 5,
        name: "Early Bird",
        type: "Regular",
        timing: "7:00 AM - 4:00 PM",
        hours: "9.00 hrs",
        grace: "20 min",
        halfDay: "5.00 hrs",
        locations: "All",
        departments: "To be Assigned",
        addedOn: new Date("2024-05-20T13:00:00Z"),
        modifiedOn: new Date("2024-05-25T14:00:00Z"),
      },
      {
        id: 6,
        name: "Split Shift",
        type: "Split",
        timing: "9:00 AM - 1:00 PM, 5:00 PM - 9:00 PM",
        hours: "8.00 hrs",
        grace: "30 min",
        halfDay: "4.00 hrs",
        locations: "All",
        departments: "To be Assigned",
        addedOn: new Date("2024-05-22T08:00:00Z"),
        modifiedOn: new Date("2024-05-28T10:00:00Z"),
      },
    ];
    setData(initialShifts);
    setOriginalData(initialShifts); // Store the original data
  }, []);

  // Handler for changes in search filter inputs
  const handleFilterChange = (key: keyof typeof searchFilters, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Function to filter data based on search filters
  const getFilteredData = () => {
    return originalData.filter((item) => {
      // Filter by Name
      if (searchFilters.name && !item.name.toLowerCase().includes(searchFilters.name.toLowerCase())) {
        return false;
      }
      // Filter by Type (dropdown)
      if (searchFilters.type && searchFilters.type !== "All" && item.type !== searchFilters.type) {
        return false;
      }
      // Filter by Timing
      if (searchFilters.timing && !item.timing.toLowerCase().includes(searchFilters.timing.toLowerCase())) {
        return false;
      }
      // Filter by Hours
      if (searchFilters.hours && !item.hours.toLowerCase().includes(searchFilters.hours.toLowerCase())) {
        return false;
      }
      // Filter by Grace
      if (searchFilters.grace && !item.grace.toLowerCase().includes(searchFilters.grace.toLowerCase())) {
        return false;
      }
      // Filter by Half Day
      if (searchFilters.halfDay && !item.halfDay.toLowerCase().includes(searchFilters.halfDay.toLowerCase())) {
        return false;
      }
      // Filter by Locations
      if (searchFilters.locations && !item.locations.toLowerCase().includes(searchFilters.locations.toLowerCase())) {
        return false;
      }
      // Filter by Departments
      if (searchFilters.departments && !item.departments.toLowerCase().includes(searchFilters.departments.toLowerCase())) {
        return false;
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
    { label: "Name" },
    { label: "Type" },
    { label: "Timing" },
    { label: "Hours" },
    { label: "Grace" },
    { label: "Half Day" },
    { label: "Locations" },
    { label: "Departments" },
  ];

  return (
    <div className="p-4 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="flex items-center space-x-4 flex-wrap mb-4 md:mb-0">
          {/* Search Icon to toggle filter row */}
          <button
            onClick={() => setShowFilterRow((prev) => !prev)}
            className="p-2 text-gray-600 hover:text-blue-600 rounded-full transition-colors"
            title="Toggle Search Filters"
          >
            <FiSearch size={21} />
          </button>

          {/* Week Starts On Dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700 font-medium">Week Starts on</span>
            <select
              value={weekStartsOn}
              onChange={(e) => setWeekStartsOn(e.target.value)}
              className="px-3 py-2 text-sm border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              {weekDays.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
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
                {/* Type Filter */}
                <td className="p-2">
                  <select
                    value={searchFilters.type}
                    onChange={(e) => handleFilterChange("type", e.target.value)}
                    className="w-full px-2 py-1 text-sm border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All</option>
                    {shiftTypes.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </td>
                {/* Timing Filter */}
                <td className="p-2">
                  <input
                    value={searchFilters.timing}
                    onChange={(e) => handleFilterChange("timing", e.target.value)}
                    placeholder="Search Timing"
                    type="text"
                    className="w-full px-2 py-1 text-sm border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
                {/* Hours Filter */}
                <td className="p-2">
                  <input
                    value={searchFilters.hours}
                    onChange={(e) => handleFilterChange("hours", e.target.value)}
                    placeholder="Search Hours"
                    type="text"
                    className="w-full px-2 py-1 text-sm border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
                {/* Grace Filter */}
                <td className="p-2">
                  <input
                    value={searchFilters.grace}
                    onChange={(e) => handleFilterChange("grace", e.target.value)}
                    placeholder="Search Grace"
                    type="text"
                    className="w-full px-2 py-1 text-sm border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
                {/* Half Day Filter */}
                <td className="p-2">
                  <input
                    value={searchFilters.halfDay}
                    onChange={(e) => handleFilterChange("halfDay", e.target.value)}
                    placeholder="Search Half Day"
                    type="text"
                    className="w-full px-2 py-1 text-sm border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
                {/* Locations Filter */}
                <td className="p-2">
                  <input
                    value={searchFilters.locations}
                    onChange={(e) => handleFilterChange("locations", e.target.value)}
                    placeholder="Search Locations"
                    type="text"
                    className="w-full px-2 py-1 text-sm border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
                {/* Departments Filter */}
                <td className="p-2">
                  <input
                    value={searchFilters.departments}
                    onChange={(e) => handleFilterChange("departments", e.target.value)}
                    placeholder="Search Departments"
                    type="text"
                    className="w-full px-2 py-1 text-sm border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
              </tr>
            )}

            {/* Table Body - Shift Data Rows */}
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 border-b border-gray-200">
                  {/* Data Columns */}
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.type}</td>
                  <td className="p-3">{item.timing}</td>
                  <td className="p-3">{item.hours}</td>
                  <td className="p-3">{item.grace}</td>
                  <td className="p-3">{item.halfDay}</td>
                  <td className="p-3">{item.locations}</td>
                  <td className="p-3">{item.departments}</td>
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
  );
};

export default Shifts;