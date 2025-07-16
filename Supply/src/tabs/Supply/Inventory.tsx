import React, { useState } from "react";
import TopBar from "../../components/TopBar";
import TableHead from "../../components/TopHead";
import IconButton from "../../components/IconButton";
import Select from "../../components/Select";
import NoDataFound from "../../components/NoDataFound";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Pagination from "../../components/Pagination";
import TopSearch from "../../components/TopSearch";
import TextInput from "../../components/TextInput";

// Inventory item type definition
interface InventoryItem {
  id: number;
  productName: string;
  price: string;
  quantity: string;
  unit: string;
  location: string;
  category: string;
}

// Options for select dropdowns
const UNIT_OPTIONS = ["Units", "Kg", "Liters"];
const LOCATION_OPTIONS = ["Warehouse 1", "Warehouse 2", "Main Store"];
const CATEGORY_OPTIONS = ["Electronics", "Furniture", "Stationery"];
const PAGE_SIZE = 5;

// Initial data for the inventory table
const INITIAL_DATA: InventoryItem[] = [
  {
    id: 1,
    productName: "Headphones",
    price: "Rs 2,500",
    quantity: "2",
    unit: "Units",
    location: "Warehouse 1",
    category: "Electronics",
  },
  {
    id: 2,
    productName: "Office Chair",
    price: "Rs 13,000",
    quantity: "25",
    unit: "Units",
    location: "Warehouse 2",
    category: "Furniture",
  },
];

// Inventory form component for adding a new inventory item
const InventoryForm: React.FC<{
  onCancel: () => void;
  onSubmit: (item: InventoryItem) => void;
}> = ({ onCancel, onSubmit }) => {
  const [form, setForm] = useState<Partial<InventoryItem>>({});

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      form.productName &&
      form.price &&
      form.quantity &&
      form.unit &&
      form.location &&
      form.category
    ) {
      onSubmit({
        id: Date.now(),
        productName: form.productName,
        price: form.price,
        quantity: form.quantity,
        unit: form.unit,
        location: form.location,
        category: form.category,
      });
    }
  };

  return (
    <div className="p-6" style={{ fontFamily: "'PT Sans', sans-serif" }}>
      <h2 className="text-2xl font-semibold mb-6">Add Inventory</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded border p-8 max-w-5xl"
      >
        {/* Inventory form fields */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="block mb-2 text-sm">Product Name:</label>
            <input
              name="productName"
              value={form.productName || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">Inventory Location:</label>
            <Select
              name="location"
              value={form.location || ""}
              onChange={handleChange}
              options={LOCATION_OPTIONS}
              placeholder="Location"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">Available Quantity :</label>
            <input
              name="quantity"
              value={form.quantity || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">Category / Tag:</label>
            <Select
              name="category"
              value={form.category || ""}
              onChange={handleChange}
              options={CATEGORY_OPTIONS}
              placeholder="Category"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">Unit Measure:</label>
            <Select
              name="unit"
              value={form.unit || ""}
              onChange={handleChange}
              options={UNIT_OPTIONS}
              placeholder="Unit"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">Price:</label>
            <input
              name="price"
              value={form.price || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
        </div>
        {/* Form action buttons */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-[#7991BB] text-white px-6 py-2 rounded hover:bg-[#5a6e99] transition"
          >
            Create Inventory
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

// Main Inventory component
const Inventory: React.FC = () => {
  const [data, setData] = useState<InventoryItem[]>(INITIAL_DATA);
  const [showForm, setShowForm] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  // Column-wise search state
  const [filterRowVisible, setFilterRowVisible] = useState(false);
  const [columnFilters, setColumnFilters] = useState({
    productName: "",
    price: "",
    quantity: "",
    category: "",
  });

  // Filter data based on search value and column filters
  const filteredData = data.filter((item) => {
    const matchesGlobal =
      item.productName.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.category.toLowerCase().includes(searchValue.toLowerCase());
    const matchesColumns =
      item.productName.toLowerCase().includes(columnFilters.productName.toLowerCase()) &&
      item.price.toLowerCase().includes(columnFilters.price.toLowerCase()) &&
      item.quantity.toLowerCase().includes(columnFilters.quantity.toLowerCase()) &&
      item.category.toLowerCase().includes(columnFilters.category.toLowerCase());
    return matchesGlobal && matchesColumns;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const paginatedData = filteredData.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // Add a new inventory item to the table
  const handleAdd = (item: InventoryItem) => {
    setData((prev) => [...prev, item]);
    setShowForm(false);
  };

  // Delete an inventory item from the table
  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      {/* Show table or form based on showForm state */}
      {!showForm ? (
        <>
          {/* Top bar with search and add button */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <div className="flex flex-1 items-center gap-4">
              <TopSearch
                onSearch={() => setFilterRowVisible((v) => !v)}
                onButtonClick={() => setShowForm(true)}
                buttons={["Add Inventory"]}
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
          {/* Inventory table */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200">
              <TableHead
                columns={[
                  { label: "Action" },
                  { label: "Product Name" },
                  { label: "Price" },
                  { label: "Available Quantity" },
                  { label: "Category /Tags" },
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
                        name="productName"
                        value={columnFilters.productName}
                        onChange={(e) => setColumnFilters((prev) => ({ ...prev, productName: e.target.value }))}
                        type="search"
                      />
                    </td>
                    <td>
                      <TextInput
                        label=""
                        name="price"
                        value={columnFilters.price}
                        onChange={(e) => setColumnFilters((prev) => ({ ...prev, price: e.target.value }))}
                        type="search"
                      />
                    </td>
                    <td>
                      <TextInput
                        label=""
                        name="quantity"
                        value={columnFilters.quantity}
                        onChange={(e) => setColumnFilters((prev) => ({ ...prev, quantity: e.target.value }))}
                        type="search"
                      />
                    </td>
                    <td>
                      <TextInput
                        label=""
                        name="category"
                        value={columnFilters.category}
                        onChange={(e) => setColumnFilters((prev) => ({ ...prev, category: e.target.value }))}
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
                          <IconButton tooltip="Delete" onClick={() => handleDelete(item.id)}>
                            <FiTrash2 />
                          </IconButton>
                        </span>
                      </td>
                      <td className="p-3 border-b">{item.productName}</td>
                      <td className="p-3 border-b">{item.price}</td>
                      <td className="p-3 border-b">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="p-3 border-b">{item.category}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">
                      <NoDataFound />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        // Show inventory form when adding a new item
        <InventoryForm onCancel={() => setShowForm(false)} onSubmit={handleAdd} />
      )}
    </div>
  );
};

export default Inventory;