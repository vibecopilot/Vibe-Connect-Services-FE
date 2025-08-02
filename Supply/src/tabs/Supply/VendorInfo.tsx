import React, { useState } from "react";
import TableHead from "../../components/TopHead";
import TopBar from "../../components/TopBar";
import IconButton from "../../components/IconButton";
import NoDataFound from "../../components/NoDataFound";
import Modal from "../../components/Modal";
import Select from "../../components/Select";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Pagination from "../../components/Pagination";
import TopSearch from "../../components/TopSearch";
import TextInput from "../../components/TextInput";

// Type definition for a vendor item
interface VendorItem {
  id: number;
  vendorId: string;
  companyName: string;
  vendorName: string;
  phone: string;
  location: string;
  website: string;
}

// Initial data for the vendor table
const INITIAL_DATA: VendorItem[] = [
  {
    id: 1,
    vendorId: "2334",
    companyName: "Test",
    vendorName: "Test1",
    phone: "81234568912",
    location: "Mumbai",
    website: "abcd",
  },
  {
    id: 2,
    vendorId: "5563",
    companyName: "Users",
    vendorName: "Users1",
    phone: "9755735243",
    location: "Mumbai",
    website: "abcd",
  },
];

// Dropdown options for select fields
const LOCATIONS = ["Mumbai", "Delhi", "Bangalore"];
const WEBSITES = ["abcd", "xyz", "example"];

// Vendor form component for adding a new vendor
const VendorForm: React.FC<{ onCancel: () => void; onSubmit: (data: VendorItem) => void }> = ({
  onCancel,
  onSubmit,
}) => {
  const [form, setForm] = useState<Omit<VendorItem, "id">>({
    vendorId: "",
    companyName: "",
    vendorName: "",
    phone: "",
    location: "",
    website: "",
  });

  // Handle input changes for text fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle select field changes
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...form, id: Date.now() });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full" style={{ fontFamily: "'PT Sans', sans-serif" }}>
      <h2 className="text-xl font-semibold mb-4">Add Vendor</h2>
      <div className="bg-white border rounded p-8">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-sm">Vendor Name:</label>
            <input
              name="vendorName"
              value={form.vendorName}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Company Name:</label>
            <input
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Vendor ID:</label>
            <input
              name="vendorId"
              value={form.vendorId}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Mobile No:</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Location:</label>
            <Select
              name="location"
              value={form.location}
              onChange={handleSelectChange}
              options={LOCATIONS}
              placeholder="Location"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Website URL:</label>
            <Select
              name="website"
              value={form.website}
              onChange={handleSelectChange}
              options={WEBSITES}
              placeholder="Search Website URL"
            />
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-[#7991BB] text-white px-6 py-2 rounded hover:bg-[#5a6e99] transition"
          >
            Create User
          </button>
        </div>
      </div>
    </form>
  );
};

const PAGE_SIZE = 10;

// Main VendorInfo component for displaying and managing vendors
const VendorInfo: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState<VendorItem[]>(INITIAL_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  // Column-wise search state
  const [filterRowVisible, setFilterRowVisible] = useState(false);
  const [columnFilters, setColumnFilters] = useState({
    vendorId: "",
    companyName: "",
    vendorName: "",
    phone: "",
    location: "",
    website: "",
  });

  // Filter data based on search value and column filters
  const filteredData = data.filter((item) => {
    const matchesGlobal =
      item.vendorId.includes(searchValue) ||
      item.companyName.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.vendorName.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.phone.includes(searchValue) ||
      item.location.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.website.toLowerCase().includes(searchValue.toLowerCase());
    const matchesColumns =
      item.vendorId.toLowerCase().includes(columnFilters.vendorId.toLowerCase()) &&
      item.companyName.toLowerCase().includes(columnFilters.companyName.toLowerCase()) &&
      item.vendorName.toLowerCase().includes(columnFilters.vendorName.toLowerCase()) &&
      item.phone.toLowerCase().includes(columnFilters.phone.toLowerCase()) &&
      item.location.toLowerCase().includes(columnFilters.location.toLowerCase()) &&
      item.website.toLowerCase().includes(columnFilters.website.toLowerCase());
    return matchesGlobal && matchesColumns;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const paginatedData = filteredData.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // Open the modal to add a new vendor
  const handleAddVendor = () => setIsModalOpen(true);

  // Handle modal form submission to add a new vendor
  const handleModalSubmit = (newVendor: VendorItem) => {
    setData((prev) => [...prev, newVendor]);
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      {/* Show table if modal is not open */}
      {!isModalOpen && (
        <>
          {/* Top bar with search and add vendor button */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-1">
            <div className="flex flex-1 items-center gap-4">
              <TopSearch
                onSearch={() => setFilterRowVisible((v) => !v)}
                onButtonClick={handleAddVendor}
                buttons={["Add Vendor"]}
              />
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                totalItems={filteredData.length}
                onPageChange={setPage}
                showControls={true}
                className="ml-auto"
              />
            </div>
          </div>
          {/* Vendor info table */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200">
              <TableHead
                columns={[
                  { label: "Action" },
                  { label: "Vendor ID" },
                  { label: "Company Name" },
                  { label: "Vendor Name" },
                  { label: "Phone No" },
                  { label: "Location" },
                  { label: "Website URL" },
                ]}
              />
              {/* Filter row for column-wise search */}
              {filterRowVisible && (
                <tbody>
                  <tr>
                    <td></td>
                    <td>
                      <TextInput
                        label=""
                        name="vendorId"
                        value={columnFilters.vendorId}
                        onChange={(e) => setColumnFilters((prev) => ({ ...prev, vendorId: e.target.value }))}
                        type="search"
                      />
                    </td>
                    <td>
                      <TextInput
                        label=""
                        name="companyName"
                        value={columnFilters.companyName}
                        onChange={(e) => setColumnFilters((prev) => ({ ...prev, companyName: e.target.value }))}
                        type="search"
                      />
                    </td>
                    <td>
                      <TextInput
                        label=""
                        name="vendorName"
                        value={columnFilters.vendorName}
                        onChange={(e) => setColumnFilters((prev) => ({ ...prev, vendorName: e.target.value }))}
                        type="search"
                      />
                    </td>
                    <td>
                      <TextInput
                        label=""
                        name="phone"
                        value={columnFilters.phone}
                        onChange={(e) => setColumnFilters((prev) => ({ ...prev, phone: e.target.value }))}
                        type="search"
                      />
                    </td>
                    <td>
                      <TextInput
                        label=""
                        name="location"
                        value={columnFilters.location}
                        onChange={(e) => setColumnFilters((prev) => ({ ...prev, location: e.target.value }))}
                        type="search"
                      />
                    </td>
                    <td>
                      <TextInput
                        label=""
                        name="website"
                        value={columnFilters.website}
                        onChange={(e) => setColumnFilters((prev) => ({ ...prev, website: e.target.value }))}
                        type="search"
                      />
                    </td>
                  </tr>
                </tbody>
              )}
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="p-3 border-b">
                        <span className="inline-flex items-center gap-2">
                          <IconButton tooltip="Edit">
                            <FiEdit />
                          </IconButton>
                          <IconButton tooltip="Delete">
                            <FiTrash2 />
                          </IconButton>
                        </span>
                      </td>
                      <td className="p-3 border-b">{item.vendorId}</td>
                      <td className="p-3 border-b">{item.companyName}</td>
                      <td className="p-3 border-b">{item.vendorName}</td>
                      <td className="p-3 border-b">{item.phone}</td>
                      <td className="p-3 border-b">{item.location}</td>
                      <td className="p-3 border-b">{item.website}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-4 text-gray-500">
                      <NoDataFound />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
      {/* Show vendor form modal if open */}
      {isModalOpen && (
        <div className="max-w-5xl mx-auto mt-6">
          <VendorForm
            onCancel={() => setIsModalOpen(false)}
            onSubmit={handleModalSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default VendorInfo;