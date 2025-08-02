import React, { useState, useEffect } from "react";
import TableHead from "../../../components/TopHead"; // Corrected relative path
import NoDataFound from "../../../components/NoDataFound"; // Corrected relative path
import Pagination from "../../../components/Pagination"; // Corrected relative path

// Define options for dropdowns
const daysOfWeek = [
  "Monday",
  "Tuesday", 
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

const weekStartOptions = [
  "Monday",
  "Tuesday",
  "Wednesday", 
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

// Interface for a single work day item
interface WorkDayItem {
  id: number;
  days: string;
  weeks: string;
  locations: string;
  department: string;
  selected: boolean; // For checkbox selection
  addedOn?: Date;
  modifiedOn?: Date;
}

const WorkDays: React.FC = () => {
  // State for week start selection
  const [weekStartsOn, setWeekStartsOn] = useState<string>("Monday");

  // State for search filters
  const [searchFilters, setSearchFilters] = useState({
    days: "",
    weeks: "",
    locations: "",
    department: "",
  });

  const [data, setData] = useState<WorkDayItem[]>([]); // Current displayed data
  const [originalData, setOriginalData] = useState<WorkDayItem[]>([]); // To store all data
  const [showFilterRow, setShowFilterRow] = useState(false); // State to toggle filter row visibility
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const itemsPerPage = 5; // Number of items to display per page

  // useEffect to populate initial data on component mount
  useEffect(() => {
    const initialWorkDays: WorkDayItem[] = [
      {
        id: 1,
        days: "Monday",
        weeks: "All",
        locations: "All",
        department: "All",
        selected: true,
        addedOn: new Date("2024-05-10T10:00:00Z"),
        modifiedOn: new Date("2024-05-15T11:30:00Z"),
      },
      {
        id: 2,
        days: "Tuesday",
        weeks: "All",
        locations: "All",
        department: "All",
        selected: true,
        addedOn: new Date("2024-05-12T14:00:00Z"),
        modifiedOn: new Date("2024-05-18T09:15:00Z"),
      },
      {
        id: 3,
        days: "Wednesday",
        weeks: "All",
        locations: "All",
        department: "All",
        selected: true,
        addedOn: new Date("2024-05-15T09:00:00Z"),
        modifiedOn: new Date("2024-05-20T16:00:00Z"),
      },
      {
        id: 4,
        days: "Thursday",
        weeks: "All",
        locations: "All",
        department: "All",
        selected: true,
        addedOn: new Date("2024-05-18T11:00:00Z"),
        modifiedOn: new Date("2024-05-22T10:00:00Z"),
      },
      {
        id: 5,
        days: "Friday",
        weeks: "All",
        locations: "All",
        department: "All",
        selected: true,
        addedOn: new Date("2024-05-20T13:00:00Z"),
        modifiedOn: new Date("2024-05-25T14:00:00Z"),
      },
      {
        id: 6,
        days: "Saturday",
        weeks: "All",
        locations: "All",
        department: "All",
        selected: true,
        addedOn: new Date("2024-05-22T08:00:00Z"),
        modifiedOn: new Date("2024-05-28T10:00:00Z"),
      },
      {
        id: 7,
        days: "Sunday",
        weeks: "All",
        locations: "All",
        department: "All",
        selected: true,
        addedOn: new Date("2024-05-24T08:00:00Z"),
        modifiedOn: new Date("2024-05-30T10:00:00Z"),
      },
    ];
    setData(initialWorkDays);
    setOriginalData(initialWorkDays); // Store the original data
  }, []);

  // Handler for checkbox selection
  const handleCheckboxChange = (id: number) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected, modifiedOn: new Date() } : item
      )
    );
    setOriginalData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected, modifiedOn: new Date() } : item
      )
    );
  };

  // Handler for changes in search filter inputs
  const handleFilterChange = (key: keyof typeof searchFilters, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Function to filter data based on search filters
  const getFilteredData = () => {
    return originalData.filter((item) => {
      // Filter by Days
      if (searchFilters.days && !item.days.toLowerCase().includes(searchFilters.days.toLowerCase())) {
        return false;
      }
      // Filter by Weeks
      if (searchFilters.weeks && !item.weeks.toLowerCase().includes(searchFilters.weeks.toLowerCase())) {
        return false;
      }
      // Filter by Locations
      if (searchFilters.locations && !item.locations.toLowerCase().includes(searchFilters.locations.toLowerCase())) {
        return false;
      }
      // Filter by Department
      if (searchFilters.department && !item.department.toLowerCase().includes(searchFilters.department.toLowerCase())) {
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
    { label: "", align: "center" }, // Empty column for checkbox
    { label: "Days" },
    { label: "Weeks" },
    { label: "Locations" },
    { label: "Department" },
  ];

  return (
    <div className="p-4 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="flex items-center space-x-2 flex-wrap mb-4 md:mb-0">
          {/* Week Starts On dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Week Starts on</span>
            <select
              value={weekStartsOn}
              onChange={(e) => setWeekStartsOn(e.target.value)}
              className="px-3 py-2 text-sm border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            >
              {weekStartOptions.map((day) => (
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
            {/* Table Body - Work Days Data Rows */}
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 border-b border-gray-200">
                  {/* Checkbox Column */}
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => handleCheckboxChange(item.id)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                  </td>
                  {/* Data Columns */}
                  <td className="p-3">{item.days}</td>
                  <td className="p-3">{item.weeks}</td>
                  <td className="p-3">{item.locations}</td>
                  <td className="p-3">{item.department}</td>
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

export default WorkDays;