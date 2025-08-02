import React, { useState } from "react";
import TableHead from "../../components/TopHead";
import TopBar from "../../components/TopBar";
import IconButton from "../../components/IconButton";
import NoDataFound from "../../components/NoDataFound";
import Select from "../../components/Select";
import DatePicker from "../../components/DatePicker";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Pagination from "../../components/Pagination";
import DocumentsForm from "../../forms/DocumentsForm";
import TopSearch from "../../components/TopSearch";
import TextInput from "../../components/TextInput";

// Type definition for a vendor empanelled item
interface VendorEmpanelledItem {
  id: number;
  registrationId: string;
  companyName: string;
  vendorName: string;
  phone: string;
  kycStatus: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: string;
  maritalStatus?: string;
  aadharNo?: string;
  mobileNo2?: string;
  location?: string;
  website?: string;
  vendorCode?: string;
  joiningDate?: string;
  vendorType?: string;
  branchLocation?: string;
  department?: string;
}

// Initial data for the table
const INITIAL_DATA: VendorEmpanelledItem[] = [
  {
    id: 1,
    registrationId: "2334",
    companyName: "Test",
    vendorName: "Test1",
    phone: "8123456891",
    kycStatus: "Uploaded",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    maritalStatus: "",
    aadharNo: "",
    mobileNo2: "",
    location: "",
    website: "",
    vendorCode: "",
    joiningDate: "",
    vendorType: "",
    branchLocation: "",
    department: "",
  },
];

// Dropdown options for select fields
const LOCATIONS = ["Mumbai", "Delhi", "Bangalore"];
const WEBSITES = ["abcd", "xyz", "example"];
const VENDOR_TYPES = ["Type A", "Type B", "Type C"];
const BRANCH_LOCATIONS = ["Branch 1", "Branch 2", "Branch 3"];
const MARITAL_STATUS_OPTIONS = [
  "Single",
  "Married",
  "Divorced",
  "Widowed",
  "Separated",
];

// Edit form for vendor empanelled item, with tab navigation
const EditVendorEmpanelledForm: React.FC<{
  initialData: VendorEmpanelledItem;
  onCancel: () => void;
  onSubmit: (data: VendorEmpanelledItem) => void;
}> = ({ initialData, onCancel, onSubmit }) => {
  const [form, setForm] = useState<VendorEmpanelledItem>(initialData);
  const [activeTab, setActiveTab] = useState<"personal" | "vendorship" | "documents">("personal");

  // Handle input changes for text and select fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle select field changes
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle date picker changes
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, joiningDate: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="flex gap-8" style={{ fontFamily: "'PT Sans', sans-serif" }}>
      {/* Sidebar with profile image and tab buttons */}
      <div className="w-1/4 flex flex-col items-center">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Profile"
          className="rounded-lg w-32 h-32 object-cover mb-4"
        />
        <div className="w-full">
          <button
            className={`w-full text-left px-4 py-2 rounded mb-2 ${activeTab === "personal" ? "bg-[#eaf3e0] font-semibold text-[#19376D]" : "hover:bg-gray-100 text-[#19376D]"}`}
            onClick={() => setActiveTab("personal")}
          >
            Personal Information
          </button>
          <button
            className={`w-full text-left px-4 py-2 rounded mb-2 ${activeTab === "vendorship" ? "bg-[#b6c7e0] font-semibold text-[#19376D]" : "hover:bg-gray-100 text-[#19376D]"}`}
            onClick={() => setActiveTab("vendorship")}
          >
            Vendor-ship
          </button>
          <button
            className={`w-full text-left px-4 py-2 rounded ${activeTab === "documents" ? "bg-[#eaf3e0] font-semibold text-[#19376D]" : "hover:bg-gray-100 text-[#19376D]"}`}
            onClick={() => setActiveTab("documents")}
          >
            Documents
          </button>
        </div>
      </div>
      {/* Main content area for the active tab */}
      <div className="w-3/4">
        {/* Personal Information tab */}
        {activeTab === "personal" && (
          <form onSubmit={handleSubmit} className="bg-white rounded p-6 border">
            <div className="grid grid-cols-2 gap-6 mb-4">
              {/* Basic info fields */}
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
                  name="registrationId"
                  value={form.registrationId}
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
                  value={form.location || ""}
                  onChange={handleSelectChange}
                  options={LOCATIONS}
                  placeholder="Location"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Website URL:</label>
                <Select
                  name="website"
                  value={form.website || ""}
                  onChange={handleSelectChange}
                  options={WEBSITES}
                  placeholder="Search Website URL"
                />
              </div>
            </div>
            <hr className="my-4" />
            <div className="grid grid-cols-2 gap-6 mb-4">
              {/* Additional personal info fields */}
              <div>
                <label className="block mb-1 text-sm">First Name:</label>
                <input
                  name="firstName"
                  value={form.firstName || ""}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Last Name:</label>
                <input
                  name="lastName"
                  value={form.lastName || ""}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Email:</label>
                <input
                  name="email"
                  value={form.email || ""}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                  type="email"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Mobile No:</label>
                <input
                  name="mobileNo2"
                  value={form.mobileNo2 || ""}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Gender:</label>
                <input
                  name="gender"
                  value={form.gender || ""}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Aadhar No:</label>
                <input
                  name="aadharNo"
                  value={form.aadharNo || ""}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Marital Status:</label>
                <Select
                  name="maritalStatus"
                  value={form.maritalStatus || ""}
                  onChange={handleSelectChange}
                  options={MARITAL_STATUS_OPTIONS}
                  placeholder="Select Associated Unit"
                />
              </div>
            </div>
            {/* Form action buttons */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-[#7991BB] text-white px-6 py-2 rounded hover:bg-[#5a6e99] transition"
              >
                Save
              </button>
              <button
                type="button"
                className="ml-4 bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-100 transition"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        {/* Vendor-ship tab */}
        {activeTab === "vendorship" && (
          <form onSubmit={handleSubmit} className="bg-white rounded p-6 border">
            <div className="grid grid-cols-2 gap-6 mb-4">
              {/* Vendorship info fields */}
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
                  name="registrationId"
                  value={form.registrationId}
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
                  value={form.location || ""}
                  onChange={handleSelectChange}
                  options={LOCATIONS}
                  placeholder="Location"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Website URL:</label>
                <Select
                  name="website"
                  value={form.website || ""}
                  onChange={handleSelectChange}
                  options={WEBSITES}
                  placeholder="Search Website URL"
                />
              </div>
            </div>
            <hr className="my-4" />
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block mb-1 text-sm">Vendor Code:</label>
                <input
                  name="vendorCode"
                  value={form.vendorCode || ""}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Joining Date:</label>
                <DatePicker
                  label=""
                  name="joiningDate"
                  value={form.joiningDate || ""}
                  onChange={handleDateChange}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Vendor Type:</label>
                <Select
                  name="vendorType"
                  value={form.vendorType || ""}
                  onChange={handleSelectChange}
                  options={VENDOR_TYPES}
                  placeholder="Select Vendor Type"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Branch Location:</label>
                <Select
                  name="branchLocation"
                  value={form.branchLocation || ""}
                  onChange={handleSelectChange}
                  options={BRANCH_LOCATIONS}
                  placeholder="Select Branch Location"
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-1 text-sm">Department:</label>
                <input
                  name="department"
                  value={form.department || ""}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
            </div>
            {/* Form action buttons */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-[#7991BB] text-white px-6 py-2 rounded hover:bg-[#5a6e99] transition"
              >
                Save
              </button>
              <button
                type="button"
                className="ml-4 bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-100 transition"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        {/* Documents tab */}
        {activeTab === "documents" && (
          <DocumentsForm
            form={{
              vendorName: form.vendorName,
              companyName: form.companyName,
              registrationId: form.registrationId,
              phone: form.phone,
              location: form.location,
              website: form.website,
            }}
          />
        )}
      </div>
    </div>
  );
};

const PAGE_SIZE = 10;

// Main component for Vendor Empanelled table and edit form
const Vendorempanelled: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState<VendorEmpanelledItem[]>(INITIAL_DATA);
  const [editingItem, setEditingItem] = useState<VendorEmpanelledItem | null>(null);
  const [page, setPage] = useState(1);
  // Column-wise search state
  const [filterRowVisible, setFilterRowVisible] = useState(false);
  const [columnFilters, setColumnFilters] = useState({
    registrationId: "",
    companyName: "",
    vendorName: "",
    phone: "",
    kycStatus: "",
  });

  // Filter data based on search value and column filters
  const filteredData = data.filter((item) => {
    const matchesGlobal =
      item.registrationId.includes(searchValue) ||
      item.companyName.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.vendorName.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.phone.includes(searchValue) ||
      item.kycStatus.toLowerCase().includes(searchValue.toLowerCase());
    const matchesColumns =
      item.registrationId.toLowerCase().includes(columnFilters.registrationId.toLowerCase()) &&
      item.companyName.toLowerCase().includes(columnFilters.companyName.toLowerCase()) &&
      item.vendorName.toLowerCase().includes(columnFilters.vendorName.toLowerCase()) &&
      item.phone.toLowerCase().includes(columnFilters.phone.toLowerCase()) &&
      item.kycStatus.toLowerCase().includes(columnFilters.kycStatus.toLowerCase());
    return matchesGlobal && matchesColumns;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const paginatedData = filteredData.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // Handle edit action
  const handleEdit = (item: VendorEmpanelledItem) => {
    setEditingItem(item);
  };

  // Handle form submit for editing
  const handleFormSubmit = (updated: VendorEmpanelledItem) => {
    setData((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
    setEditingItem(null);
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      {/* Show table or edit form based on editingItem state */}
      {!editingItem ? (
        <>
          {/* Top bar with search and pagination */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-1">
            <div className="flex flex-1 items-center gap-4">
              <TopSearch
                onSearch={() => setFilterRowVisible((v) => !v)}
                onButtonClick={() => {}}
                buttons={[]}
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
          {/* Vendor empanelled table */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200">
              <TableHead
                columns={[
                  { label: "Action" },
                  { label: "Registration ID" },
                  { label: "Company Name" },
                  { label: "Vendor Name" },
                  { label: "Phone No" },
                  { label: "KYC Document Status" },
                  { label: "" },
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
                        name="registrationId"
                        value={columnFilters.registrationId}
                        onChange={(e) => setColumnFilters((prev) => ({ ...prev, registrationId: e.target.value }))}
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
                        name="kycStatus"
                        value={columnFilters.kycStatus}
                        onChange={(e) => setColumnFilters((prev) => ({ ...prev, kycStatus: e.target.value }))}
                        type="search"
                      />
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              )}
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="p-3 border-b">
                        <span className="inline-flex items-center gap-2">
                          <IconButton tooltip="Edit" onClick={() => handleEdit(item)}>
                            <FiEdit />
                          </IconButton>
                          <IconButton tooltip="Delete">
                            <FiTrash2 />
                          </IconButton>
                        </span>
                      </td>
                      <td className="p-3 border-b">{item.registrationId}</td>
                      <td className="p-3 border-b">{item.companyName}</td>
                      <td className="p-3 border-b">{item.vendorName}</td>
                      <td className="p-3 border-b">{item.phone}</td>
                      <td className="p-3 border-b">{item.kycStatus}</td>
                      <td className="p-3 border-b">
                        <button className="bg-[#7991BB] text-white px-5 py-1 rounded hover:bg-[#5a6e99] transition">
                          Send
                        </button>
                      </td>
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
      ) : (
        // Show edit form when editingItem is set
        <EditVendorEmpanelledForm
          initialData={editingItem}
          onCancel={() => setEditingItem(null)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default Vendorempanelled;