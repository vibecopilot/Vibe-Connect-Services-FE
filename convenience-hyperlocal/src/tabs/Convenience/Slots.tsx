import React, { useState, useEffect } from "react";
import { FiEye, FiTrash2 } from "react-icons/fi";
import TableHead from "../../components/TopHead";
import TopSearch from "../../components/TopSearch";
import IconButton from "../../components/IconButton";
import NoDataFound from "../../components/NoDataFound";
import Pagination from "../../components/Pagination";
import SlotsForm from "../../forms/SlotsForm";
import FormModal from "../../components/FormModal";

const serviceCategories = ["IT Services", "Consulting", "Support", "Maintenance"];
const subCategories = ["Software Development", "Hardware Support", "Training", "Documentation"];

interface SlotItem {
  id: number;
  serviceCategory: string;
  subCategory: string;
  startTime: string;
  endTime: string;
  maxBookings: string;
  status: string;
}

interface SlotsProps {
  onModalStateChange?: (isOpen: boolean) => void;
}

const Slots: React.FC<SlotsProps> = ({ onModalStateChange }) => {
  const [searchFilters, setSearchFilters] = useState({
    serviceCategory: "",
    subCategory: "",
    startTime: "",
    endTime: "",
    maxBookings: "",
    status: "",
  });

  const [data, setData] = useState<SlotItem[]>([]);
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [formData, setFormData] = useState<Omit<SlotItem, "id" | "status"> & { active: boolean }>({
    serviceCategory: "",
    subCategory: "",
    startTime: "",
    endTime: "",
    maxBookings: "",
    active: true,
  });
  const [formErrors, setFormErrors] = useState<Partial<Omit<SlotItem, "id" | "status">>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setData([
      {
        id: 1,
        serviceCategory: "IT Services",
        subCategory: "Software Development",
        startTime: "09:00",
        endTime: "17:00",
        maxBookings: "10",
        status: "Active",
      },
    ]);
  }, []);

  // Notify parent component when modal state changes
  useEffect(() => {
    if (onModalStateChange) {
      onModalStateChange(isFormVisible);
    }
  }, [isFormVisible, onModalStateChange]);

  const handleAddClick = () => {
    setFormData({
      serviceCategory: "",
      subCategory: "",
      startTime: "",
      endTime: "",
      maxBookings: "",
      active: true,
    });
    setIsViewMode(false);
    setFormErrors({});
    setIsFormVisible(true);
  };

  const handleView = (item: SlotItem) => {
    setFormData({
      serviceCategory: item.serviceCategory,
      subCategory: item.subCategory,
      startTime: item.startTime,
      endTime: item.endTime,
      maxBookings: item.maxBookings,
      active: item.status === "Active",
    });
    setIsViewMode(true);
    setFormErrors({});
    setIsFormVisible(true);
  };

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setFormErrors({});
    setIsViewMode(false);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = () => {
    setFormData((prev) => ({ ...prev, active: !prev.active }));
  };

  const validateForm = () => {
    const errors: Partial<Omit<SlotItem, "id" | "status">> = {};
    if (!formData.serviceCategory.trim()) errors.serviceCategory = "Service Category is required.";
    if (!formData.subCategory.trim()) errors.subCategory = "Sub Category is required.";
    if (!formData.startTime.trim()) errors.startTime = "Start Time is required.";
    if (!formData.endTime.trim()) errors.endTime = "End Time is required.";
    if (!formData.maxBookings.trim()) errors.maxBookings = "Max Bookings is required.";
    return errors;
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isViewMode) {
      setIsFormVisible(false);
      return;
    }

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const { active, ...restFormData } = formData;
    setData((prev) => [...prev, { 
      id: Date.now(), 
      ...restFormData, 
      status: active ? "Active" : "Inactive" 
    }]);

    setFormData({
      serviceCategory: "",
      subCategory: "",
      startTime: "",
      endTime: "",
      maxBookings: "",
      active: true,
    });
    setFormErrors({});
    setIsFormVisible(false);
  };

  const handleFilterChange = (key: keyof typeof searchFilters, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredData = data.filter((item) =>
    Object.entries(searchFilters).every(([key, val]) =>
      item[key as keyof typeof searchFilters]?.toLowerCase().includes(val.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { label: "Actions", align: "center" },
    { label: "Service Category" },
    { label: "Sub Category" },
    { label: "Start Time" },
    { label: "End Time" },
    { label: "Max Bookings" },
    { label: "Status" },
  ];

  return (
    <>
      <div className="p-4 bg-white -mt-6">
        <div className="flex justify-between items-center">
          <TopSearch
            onSearch={() => setShowFilterRow((prev) => !prev)}
            onButtonClick={handleAddClick}
            buttons={["Add"]}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredData.length / itemsPerPage)}
            totalItems={filteredData.length}
            onPageChange={setCurrentPage}
          />
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="min-w-full table-auto">
            <TableHead columns={columns} />
            <tbody>
              {showFilterRow && (
                <tr>
                  <td className="p-2 border-b border-gray-400 text-center" />
                  {Object.entries(searchFilters).map(([key, val]) => (
                    <td className="p-2 border-b border-gray-400" key={key}>
                      {["serviceCategory", "subCategory"].includes(key) ? (
                        <select
                          value={val}
                          onChange={(e) => handleFilterChange(key as keyof typeof searchFilters, e.target.value)}
                          className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                        >
                          <option value="">All</option>
                          {(key === "serviceCategory" ? serviceCategories : subCategories).map((item) => (
                            <option key={item} value={item}>{item}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          value={val}
                          onChange={(e) => handleFilterChange(key as keyof typeof searchFilters, e.target.value)}
                          placeholder={`Search ${key}`}
                          className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                        />
                      )}
                    </td>
                  ))}
                </tr>
              )}

              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-3 border-b border-gray-400 text-center space-x-3">
                      <IconButton tooltip="View" className="hover:text-blue-600" onClick={() => handleView(item)}>
                        <FiEye />
                      </IconButton>
                      <IconButton tooltip="Delete" className="hover:text-red-600" onClick={() => handleDelete(item.id)}>
                        <FiTrash2 />
                      </IconButton>
                    </td>
                    <td className="p-3 border-b border-gray-400">{item.serviceCategory}</td>
                    <td className="p-3 border-b border-gray-400">{item.subCategory}</td>
                    <td className="p-3 border-b border-gray-400">{item.startTime}</td>
                    <td className="p-3 border-b border-gray-400">{item.endTime}</td>
                    <td className="p-3 border-b border-gray-400">{item.maxBookings}</td>
                    <td className="p-3 border-b border-gray-400">{item.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-center py-4 text-gray-500">
                    <NoDataFound />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <FormModal isOpen={isFormVisible} onClose={handleCancel}>
          <SlotsForm
            formData={formData}
            onChange={handleFormChange}
            onToggleChange={handleToggleChange}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
            errors={formErrors}
            isViewMode={isViewMode}
          />
      </FormModal>
    </>
  );
};

export default Slots;