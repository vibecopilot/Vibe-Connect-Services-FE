import React, { useState } from "react";
import TableHead from "../components/TopHead";
import TopBar from "../components/TopBar";
import IconButton from "../components/IconButton";
import NoDataFound from "../components/NoDataFound";
import Select from "../components/Select";
import DatePicker from "../components/DatePicker";
import { FiEdit, FiTrash2, FiFolder, FiPlusCircle } from "react-icons/fi";
import DocumentsForm from "../forms/DocumentsForm";

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

const LOCATIONS = ["Mumbai", "Delhi", "Bangalore"];
const WEBSITES = ["abcd", "xyz", "example"];
const VENDOR_TYPES = ["Type A", "Type B", "Type C"];
const BRANCH_LOCATIONS = ["Branch 1", "Branch 2", "Branch 3"];

const VendorDocuments: React.FC<{ form: VendorEmpanelledItem }> = ({ form }) => (
  <div className="w-full bg-white rounded p-6 border" style={{ fontFamily: "'PT Sans', sans-serif" }}>
    <div className="grid grid-cols-2 gap-6 mb-4">
      <div>
        <label className="block mb-1 text-sm">Vendor Name:</label>
        <input
          name="vendorName"
          value={form.vendorName}
          className="w-full border rounded px-2 py-1"
          disabled
        />
      </div>
      <div>
        <label className="block mb-1 text-sm">Company Name:</label>
        <input
          name="companyName"
          value={form.companyName}
          className="w-full border rounded px-2 py-1"
          disabled
        />
      </div>
      <div>
        <label className="block mb-1 text-sm">Vendor ID:</label>
        <input
          name="registrationId"
          value={form.registrationId}
          className="w-full border rounded px-2 py-1"
          disabled
        />
      </div>
      <div>
        <label className="block mb-1 text-sm">Mobile No:</label>
        <input
          name="phone"
          value={form.phone}
          className="w-full border rounded px-2 py-1"
          disabled
        />
      </div>
      <div>
        <label className="block mb-1 text-sm">Location:</label>
        <Select
          name="location"
          value={form.location || ""}
          options={LOCATIONS}
          placeholder="Location"
          disabled
          onChange={() => {}}
        />
      </div>
      <div>
        <label className="block mb-1 text-sm">Website URL:</label>
        <Select
          name="website"
          value={form.website || ""}
          options={WEBSITES}
          placeholder="Search Website URL"
          disabled
          onChange={() => {}}
        />
      </div>
    </div>
    <hr className="my-4" />
    <div>
      <label className="block mb-2 text-sm font-semibold">Vendor Documents</label>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex flex-col items-center">
          <FiFolder size={40} className="text-yellow-500" />
          <span className="text-xs mt-1">Doc 1</span>
        </div>
        <div className="flex flex-col items-center">
          <FiFolder size={40} className="text-yellow-500" />
          <span className="text-xs mt-1">Doc 2</span>
        </div>
        <div className="flex-1 flex justify-end">
          <button
            type="button"
            className="flex items-center gap-1 px-6 py-2 border rounded text-[#7991BB] border-[#7991BB] hover:bg-[#eaf3e0] transition"
          >
            <FiPlusCircle size={18} /> Add
          </button>
        </div>
      </div>
    </div>
  </div>
);

const EditVendorEmpanelledForm: React.FC<{
  initialData: VendorEmpanelledItem;
  onCancel: () => void;
  onSubmit: (data: VendorEmpanelledItem) => void;
}> = ({ initialData, onCancel, onSubmit }) => {
  const [form, setForm] = useState<VendorEmpanelledItem>(initialData);
  const [activeTab, setActiveTab] = useState<"personal" | "vendorship" | "documents">("personal");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, joiningDate: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="flex gap-8">
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
            className={`w-full text-left px-4 py-2 rounded mb-2 ${activeTab === "vendorship" ? "bg-[#eaf3e0] font-semibold text-[#19376D]" : "hover:bg-gray-100 text-[#19376D]"}`}
            onClick={() => setActiveTab("vendorship")}
          >
            Vendor-ship
          </button>
          <button
            className={`w-full text-left px-4 py-2 rounded ${activeTab === "documents" ? "bg-[#7991BB] text-white font-semibold" : "hover:bg-gray-100 text-[#19376D]"}`}
            onClick={() => setActiveTab("documents")}
          >
            Documents
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="w-3/4">
        {activeTab === "personal" && (
          // ...existing personal info form...
          <div className="bg-white rounded p-6 border">Personal Info Form</div>
        )}
        {activeTab === "vendorship" && (
          // ...existing vendorship form...
          <div className="bg-white rounded p-6 border">Vendorship Form</div>
        )}
        {activeTab === "documents" && (
  <DocumentsForm form={form} />
)}
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
    </div>
  );
};

const Vendorempanelled: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState<VendorEmpanelledItem[]>(INITIAL_DATA);
  const [editingItem, setEditingItem] = useState<VendorEmpanelledItem | null>(null);

  const filteredData = data.filter(
    (item) =>
      item.registrationId.includes(searchValue) ||
      item.companyName.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.vendorName.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.phone.includes(searchValue) ||
      item.kycStatus.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleEdit = (item: VendorEmpanelledItem) => {
    setEditingItem(item);
  };

  const handleFormSubmit = (updated: VendorEmpanelledItem) => {
    setData((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
    setEditingItem(null);
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      {!editingItem ? (
        <>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-1">
            <TopBar onSearch={setSearchValue} onButtonClick={() => {}} buttons={[]} />
          </div>
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
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
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