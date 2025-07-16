import React from "react";
import Select from "../components/Select";
import { FiFolder, FiPlusCircle } from "react-icons/fi";

interface DocumentsFormProps {
  form: {
    vendorName: string;
    companyName: string;
    registrationId: string;
    phone: string;
    location?: string;
    website?: string;
  };
}

const LOCATIONS = ["Mumbai", "Delhi", "Bangalore"];
const WEBSITES = ["abcd", "xyz", "example"];

const DocumentsForm: React.FC<DocumentsFormProps> = ({ form }) => (
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
            disabled
          >
            <FiPlusCircle size={18} /> Add
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default DocumentsForm;