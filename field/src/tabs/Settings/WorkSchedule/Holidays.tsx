import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import TableHead from "../../../components/TopHead"; 
import NoDataFound from "../../../components/NoDataFound"; 
import Pagination from "../../../components/Pagination"; 

// Generate years from 2020 to current year
const generateYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = 2020; year <= currentYear; year++) {
    years.push(year.toString());
  }
  return years;
};

const years = generateYears();

// Interface for a single holiday item
interface HolidayItem {
  id: number;
  date: string;
  day: string;
  name: string;
  all: boolean;
  cognizant: boolean;
  headOffice: boolean;
  weWork: boolean;
  addedOn?: Date;
  modifiedOn?: Date;
}

const Holidays: React.FC = () => {
  
  const [searchFilters, setSearchFilters] = useState({
    date: "",
    day: "",
    name: "",
    all: "",
    cognizant: "",
    headOffice: "",
    weWork: "",
  });

  const [data, setData] = useState<HolidayItem[]>([]); 
  const [originalData, setOriginalData] = useState<HolidayItem[]>([]); 
  const [showFilterRow, setShowFilterRow] = useState(false); 
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString()); 
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 5; 

  useEffect(() => {
    const initialHolidays: HolidayItem[] = [
      {
        id: 1,
        date: "January 1",
        day: "Monday",
        name: "New Year's Day",
        all: true,
        cognizant: true,
        headOffice: true,
        weWork: true,
        addedOn: new Date("2024-05-10T10:00:00Z"),
        modifiedOn: new Date("2024-05-15T11:30:00Z"),
      },
      {
        id: 2,
        date: "January 26",
        day: "Friday",
        name: "Republic Day",
        all: true,
        cognizant: true,
        headOffice: true,
        weWork: true,
        addedOn: new Date("2024-05-12T14:00:00Z"),
        modifiedOn: new Date("2024-05-18T09:15:00Z"),
      },
      {
        id: 3,
        date: "March 8",
        day: "Friday",
        name: "Holi",
        all: true,
        cognizant: true,
        headOffice: true,
        weWork: true,
        addedOn: new Date("2024-05-15T09:00:00Z"),
        modifiedOn: new Date("2024-05-20T16:00:00Z"),
      },
      {
        id: 4,
        date: "August 15",
        day: "Thursday",
        name: "Independence Day",
        all: true,
        cognizant: true,
        headOffice: true,
        weWork: true,
        addedOn: new Date("2024-05-18T11:00:00Z"),
        modifiedOn: new Date("2024-05-22T10:00:00Z"),
      },
      {
        id: 5,
        date: "October 2",
        day: "Wednesday",
        name: "Gandhi Jayanti",
        all: true,
        cognizant: true,
        headOffice: true,
        weWork: true,
        addedOn: new Date("2024-05-20T13:00:00Z"),
        modifiedOn: new Date("2024-05-25T14:00:00Z"),
      },
      {
        id: 6,
        date: "November 1",
        day: "Friday",
        name: "Diwali",
        all: true,
        cognizant: true,
        headOffice: true,
        weWork: true,
        addedOn: new Date("2024-05-22T08:00:00Z"),
        modifiedOn: new Date("2024-05-28T10:00:00Z"),
      },
      {
        id: 7,
        date: "December 25",
        day: "Wednesday",
        name: "Christmas Day",
        all: true,
        cognizant: true,
        headOffice: true,
        weWork: true,
        addedOn: new Date("2024-05-24T12:00:00Z"),
        modifiedOn: new Date("2024-05-30T15:00:00Z"),
      },
    ];
    setData(initialHolidays);
    setOriginalData(initialHolidays); // Store the original data
  }, []);

  // Handler for changes in search filter inputs
  const handleFilterChange = (key: keyof typeof searchFilters, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Function to filter data based on search filters
  const getFilteredData = () => {
    return originalData.filter((item) => {
      // Filter by Date
      if (searchFilters.date && !item.date.toLowerCase().includes(searchFilters.date.toLowerCase())) {
        return false;
      }
      // Filter by Day
      if (searchFilters.day && !item.day.toLowerCase().includes(searchFilters.day.toLowerCase())) {
        return false;
      }
      // Filter by Name
      if (searchFilters.name && !item.name.toLowerCase().includes(searchFilters.name.toLowerCase())) {
        return false;
      }
      // Filter by All (boolean dropdown)
      if (searchFilters.all !== "" && searchFilters.all !== "All") {
        const filterAll = searchFilters.all === "true";
        if (item.all !== filterAll) {
          return false;
        }
      }
      // Filter by Cognizant (boolean dropdown)
      if (searchFilters.cognizant !== "" && searchFilters.cognizant !== "All") {
        const filterCognizant = searchFilters.cognizant === "true";
        if (item.cognizant !== filterCognizant) {
          return false;
        }
      }
      // Filter by Head Office (boolean dropdown)
      if (searchFilters.headOffice !== "" && searchFilters.headOffice !== "All") {
        const filterHeadOffice = searchFilters.headOffice === "true";
        if (item.headOffice !== filterHeadOffice) {
          return false;
        }
      }
      // Filter by We Work (boolean dropdown)
      if (searchFilters.weWork !== "" && searchFilters.weWork !== "All") {
        const filterWeWork = searchFilters.weWork === "true";
        if (item.weWork !== filterWeWork) {
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
    { label: "Date" },
    { label: "Day" },
    { label: "Name" },
    { label: "All", align: "center" },
    { label: "Cognizant", align: "center" },
    { label: "Head Office", align: "center" },
    { label: "We Work", align: "center" },
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

          {/* Year Dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700 font-medium">Year</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-2 text-sm border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
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
                {/* Date Filter */}
                <td className="p-2">
                  <input
                    value={searchFilters.date}
                    onChange={(e) => handleFilterChange("date", e.target.value)}
                    placeholder="Search Date"
                    type="text"
                    className="w-full px-2 py-1 text-sm border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
                {/* Day Filter */}
                <td className="p-2">
                  <input
                    value={searchFilters.day}
                    onChange={(e) => handleFilterChange("day", e.target.value)}
                    placeholder="Search Day"
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
                {/* All Filter */}
                <td className="p-2">
                  <select
                    value={searchFilters.all}
                    onChange={(e) => handleFilterChange("all", e.target.value)}
                    className="w-full px-2 py-1 text-sm border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </td>
                {/* Cognizant Filter */}
                <td className="p-2">
                  <select
                    value={searchFilters.cognizant}
                    onChange={(e) => handleFilterChange("cognizant", e.target.value)}
                    className="w-full px-2 py-1 text-sm border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </td>
                {/* Head Office Filter */}
                <td className="p-2">
                  <select
                    value={searchFilters.headOffice}
                    onChange={(e) => handleFilterChange("headOffice", e.target.value)}
                    className="w-full px-2 py-1 text-sm border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </td>
                {/* We Work Filter */}
                <td className="p-2">
                  <select
                    value={searchFilters.weWork}
                    onChange={(e) => handleFilterChange("weWork", e.target.value)}
                    className="w-full px-2 py-1 text-sm border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </td>
              </tr>
            )}

            {/* Table Body - Holiday Data Rows */}
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 border-b border-gray-200">
                  {/* Data Columns */}
                  <td className="p-3">{item.date}</td>
                  <td className="p-3">{item.day}</td>
                  <td className="p-3">{item.name}</td>
                  {/* All Column with Tick Icon */}
                  <td className="p-3 text-center">
                    {item.all && (
                      <FaCheck className="text-green-500 inline-block" title="Yes" />
                    )}
                  </td>
                  {/* Cognizant Column with Tick Icon */}
                  <td className="p-3 text-center">
                    {item.cognizant && (
                      <FaCheck className="text-green-500 inline-block" title="Yes" />
                    )}
                  </td>
                  {/* Head Office Column with Tick Icon */}
                  <td className="p-3 text-center">
                    {item.headOffice && (
                      <FaCheck className="text-green-500 inline-block" title="Yes" />
                    )}
                  </td>
                  {/* We Work Column with Tick Icon */}
                  <td className="p-3 text-center">
                    {item.weWork && (
                      <FaCheck className="text-green-500 inline-block" title="Yes" />
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
  );
};

export default Holidays;