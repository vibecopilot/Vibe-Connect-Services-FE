import React, { useState, useEffect } from "react";
import { FiEye, FiTrash2 } from "react-icons/fi";
import TableHead from "../../components/TopHead";
import TopSearch from "../../components/TopSearch";
import IconButton from "../../components/IconButton";
import NoDataFound from "../../components/NoDataFound";
import Pagination from "../../components/Pagination";
import ServiceCategoryInfoForm from "../../forms/ServiceCategoryInfoForm";
import FormModal from "../../components/FormModal";

const serviceCategories = ["IT Services", "Consulting", "Support", "Maintenance"];
const subCategories = ["Software Development", "Hardware Support", "Training", "Documentation"];

interface ServiceCategoryItem {
  id: number;
  serviceCategory: string;
  subCategory: string;
  serviceTypeName: string;
  status: string;
}

interface ServiceCategoryInfoProps {
  onModalStateChange?: (isOpen: boolean) => void;
}

const ServiceCategoryInfo: React.FC<ServiceCategoryInfoProps> = ({ onModalStateChange }) => {
  const [searchFilters, setSearchFilters] = useState({
    serviceCategory: "",
    subCategory: "",
    serviceTypeName: "",
    status: "",
  });

  const [data, setData] = useState<ServiceCategoryItem[]>([]);
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [formData, setFormData] = useState<Omit<ServiceCategoryItem, "id" | "status">>({
    serviceCategory: "",
    subCategory: "",
    serviceTypeName: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<Omit<ServiceCategoryItem, "id" | "status">>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setData([
      {
        id: 1,
        serviceCategory: "IT Services",
        subCategory: "Software Development",
        serviceTypeName: "Web Development",
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
      serviceTypeName: "",
    });
    setIsViewMode(false);
    setFormErrors({});
    setIsFormVisible(true);
  };

  const handleView = (item: ServiceCategoryItem) => {
    setFormData({
      serviceCategory: item.serviceCategory,
      subCategory: item.subCategory,
      serviceTypeName: item.serviceTypeName,
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

  const validateForm = () => {
    const errors: Partial<Omit<ServiceCategoryItem, "id" | "status">> = {};
    if (!formData.serviceCategory.trim()) errors.serviceCategory = "Service Category is required.";
    if (!formData.subCategory.trim()) errors.subCategory = "Sub Category is required.";
    if (!formData.serviceTypeName.trim()) errors.serviceTypeName = "Service Type Name is required.";
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

    setData((prev) => [...prev, { 
      id: Date.now(), 
      ...formData, 
      status: "Active" 
    }]);

    setFormData({
      serviceCategory: "",
      subCategory: "",
      serviceTypeName: "",
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
    { label: "Service Type" },
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
                    <td className="p-3 border-b border-gray-400">{item.serviceTypeName}</td>
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
        <div className="mb-25">
            <ServiceCategoryInfoForm
          formData={formData}
          onChange={handleFormChange}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          errors={formErrors}
          isViewMode={isViewMode}
        />
        </div>
      </FormModal>
    </>
  );
};

export default ServiceCategoryInfo;