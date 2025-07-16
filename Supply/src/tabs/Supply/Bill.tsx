import React, { useState } from "react";
import TopBar from "../../components/TopBar";
import TableHead from "../../components/TopHead";
import IconButton from "../../components/IconButton";
import NoDataFound from "../../components/NoDataFound";
import ToggleSwitch from "../../components/ToggleSwitch";
import Pagination from "../../components/Pagination";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import TopSearch from "../../components/TopSearch";
import TextInput from "../../components/TextInput";

// Bill item type definition
interface BillItem {
  id: number;
  vendorName: string;
  orderId: string;
  orderDate: string;
  category: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  upiId: string;
  tdsApplicable: boolean;
}

// Initial data for the table
const INITIAL_DATA: BillItem[] = [
  {
    id: 1,
    vendorName: "Vendor 1",
    orderId: "ORD123",
    orderDate: "2024-06-01",
    category: "Electronics",
    bankName: "SBI",
    accountNumber: "678890456728",
    ifscCode: "8647AX2G8T0",
    upiId: "Rajshah@oksbi",
    tdsApplicable: false,
  },
  {
    id: 2,
    vendorName: "Vendor 2",
    orderId: "ORD456",
    orderDate: "2024-06-02",
    category: "Furniture",
    bankName: "Kotak",
    accountNumber: "379470263940",
    ifscCode: "5040GYA4K1NL",
    upiId: "Shamvyas@oksbi",
    tdsApplicable: false,
  },
];

// Number of rows per page
const PAGE_SIZE = 5;

// Bill form component for adding a new bill
const BillForm: React.FC<{
  onCancel: () => void;
  onSubmit: (item: BillItem) => void;
}> = ({ onCancel, onSubmit }) => {
  const [form, setForm] = useState<Partial<BillItem>>({
    tdsApplicable: false,
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle toggle switch for TDS applicability
  const handleToggle = (checked: boolean) => {
    setForm((prev) => ({ ...prev, tdsApplicable: checked }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      form.vendorName &&
      form.orderId &&
      form.orderDate &&
      form.category &&
      form.bankName &&
      form.accountNumber &&
      form.ifscCode &&
      form.upiId
    ) {
      onSubmit({
        id: Date.now(),
        vendorName: form.vendorName,
        orderId: form.orderId,
        orderDate: form.orderDate,
        category: form.category,
        bankName: form.bankName,
        accountNumber: form.accountNumber,
        ifscCode: form.ifscCode,
        upiId: form.upiId,
        tdsApplicable: !!form.tdsApplicable,
      });
    }
  };

  return (
    <div className="p-6" style={{ fontFamily: "'PT Sans', sans-serif" }}>
      <h2 className="text-2xl font-semibold mb-6">Add Bill</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded border p-8 max-w-5xl"
      >
        {/* Bill form fields */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="block mb-2 text-sm">Vendor Name:</label>
            <input
              name="vendorName"
              value={form.vendorName || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">Order ID:</label>
            <input
              name="orderId"
              value={form.orderId || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">Order Date:</label>
            <input
              name="orderDate"
              type="date"
              value={form.orderDate || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">Category / Tag:</label>
            <input
              name="category"
              value={form.category || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">Bank Name:</label>
            <input
              name="bankName"
              value={form.bankName || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">Account Number:</label>
            <input
              name="accountNumber"
              value={form.accountNumber || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">IFSC Code:</label>
            <input
              name="ifscCode"
              value={form.ifscCode || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">UPI ID:</label>
            <input
              name="upiId"
              value={form.upiId || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
        </div>
        {/* TDS Applicability toggle */}
        <div className="flex items-center gap-4 mt-6">
          <label className="block text-sm">TDS/ Applicability:</label>
          <ToggleSwitch
            checked={!!form.tdsApplicable}
            onChange={handleToggle}
            name="tdsApplicable"
          />
        </div>
        {/* Form action buttons */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-[#7991BB] text-white px-6 py-2 rounded hover:bg-[#5a6e99] transition"
          >
            Create Bill
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

// Main Bill component
const Bill: React.FC = () => {
  const [data, setData] = useState<BillItem[]>(INITIAL_DATA);
  const [showForm, setShowForm] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  // Column-wise search state
  const [filterRowVisible, setFilterRowVisible] = useState(false);
  const [columnFilters, setColumnFilters] = useState({
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    upiId: "",
    tdsApplicable: "",
  });

  // Filter data based on search value and column filters
  const filteredData = data.filter((item) => {
    const matchesGlobal =
      item.bankName.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.accountNumber.includes(searchValue) ||
      item.ifscCode.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.upiId.toLowerCase().includes(searchValue.toLowerCase());
    const matchesColumns =
      item.bankName.toLowerCase().includes(columnFilters.bankName.toLowerCase()) &&
      item.accountNumber.toLowerCase().includes(columnFilters.accountNumber.toLowerCase()) &&
      item.ifscCode.toLowerCase().includes(columnFilters.ifscCode.toLowerCase()) &&
      item.upiId.toLowerCase().includes(columnFilters.upiId.toLowerCase()) &&
      (columnFilters.tdsApplicable === "" || (columnFilters.tdsApplicable === "yes" ? item.tdsApplicable : !item.tdsApplicable));
    return matchesGlobal && matchesColumns;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const paginatedData = filteredData.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // Add a new bill to the table
  const handleAdd = (item: BillItem) => {
    setData((prev) => [...prev, item]);
    setShowForm(false);
  };

  // Delete a bill from the table
  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      {/* Show table or form based on showForm state */}
      {!showForm ? (
        <>
          {/* Top bar with search and add button */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="flex flex-1 items-center gap-4">
              <TopSearch
                onSearch={() => setFilterRowVisible((v) => !v)}
                onButtonClick={() => setShowForm(true)}
                buttons={["Add Bill"]}
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
          {/* Bill table */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200">
              <TableHead
                columns={[
                  { label: "Action" },
                  { label: "Bank Name" },
                  { label: "Account Number" },
                  { label: "IFSC Code" },
                  { label: "UPI ID" },
                  { label: "TDS/ Applicability" },
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
                        name="bankName"
                        value={columnFilters.bankName}
                        onChange={(e) => setColumnFilters((prev) => ({ ...prev, bankName: e.target.value }))}
                        type="search"
                      />
                    </td>
                    <td>
                      <TextInput
                        label=""
                        name="accountNumber"
                        value={columnFilters.accountNumber}
                        onChange={(e) => setColumnFilters((prev) => ({ ...prev, accountNumber: e.target.value }))}
                        type="search"
                      />
                    </td>
                    <td>
                      <TextInput
                        label=""
                        name="ifscCode"
                        value={columnFilters.ifscCode}
                        onChange={(e) => setColumnFilters((prev) => ({ ...prev, ifscCode: e.target.value }))}
                        type="search"
                      />
                    </td>
                    <td>
                      <TextInput
                        label=""
                        name="upiId"
                        value={columnFilters.upiId}
                        onChange={(e) => setColumnFilters((prev) => ({ ...prev, upiId: e.target.value }))}
                        type="search"
                      />
                    </td>
                    <td>
                      <select
                        name="tdsApplicable"
                        value={columnFilters.tdsApplicable}
                        onChange={(e) => setColumnFilters((prev) => ({ ...prev, tdsApplicable: e.target.value }))}
                        className="w-full border rounded px-2 py-1"
                      >
                        <option value="">All</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
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
                          <IconButton tooltip="Delete" onClick={() => handleDelete(item.id)}>
                            <FiTrash2 />
                          </IconButton>
                        </span>
                      </td>
                      <td className="p-3 border-b">{item.bankName}</td>
                      <td className="p-3 border-b">{item.accountNumber}</td>
                      <td className="p-3 border-b">{item.ifscCode}</td>
                      <td className="p-3 border-b">{item.upiId}</td>
                      <td className="p-3 border-b">
                        <ToggleSwitch checked={item.tdsApplicable} onChange={() => {}} name="tdsApplicable" disabled />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-500">
                      <NoDataFound />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        // Show bill form when adding a new bill
        <BillForm onCancel={() => setShowForm(false)} onSubmit={handleAdd} />
      )}
    </div>
  );
};

export default Bill;