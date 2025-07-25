import React, { useState, useEffect } from "react";
import { FiEye, FiTrash2 } from "react-icons/fi";
import TableHead from "../../components/TopHead";
import TopSearch from "../../components/TopSearch";
import IconButton from "../../components/IconButton";
import NoDataFound from "../../components/NoDataFound";
import Pagination from "../../components/Pagination";
import VendorSetupForm from "../../forms/VendorSetupForm";
import FormModal from "../../components/FormModal";

const serviceCategories = ["IT Services", "Consulting", "Support", "Maintenance"];
const subCategories = ["Software Development", "Hardware Support", "Training", "Documentation"];
const serviceTypes = ["Web Development", "Mobile Development", "Desktop Application", "System Integration"];

interface VendorItem {
  id: number;
  serviceCategory: string;
  subCategory: string;
  serviceType: string;
  vendorName: string;
  contactInfo: string;
  alternateContactNo: string;
  emailId: string;
  website: string;
  description: string;
  attachments: string;
  status: string;
}

interface VendorSetupProps {
  onModalStateChange?: (isOpen: boolean) => void;
}

const VendorSetup: React.FC<VendorSetupProps> = ({ onModalStateChange }) => {
  const [searchFilters, setSearchFilters] = useState({
    serviceCategory: "",
    subCategory: "",
    status: "",
  });

  const [data, setData] = useState<VendorItem[]>([]);
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [formData, setFormData] = useState<Omit<VendorItem, "id" | "status">>({
    serviceCategory: "",
    subCategory: "",
    serviceType: "",
    vendorName: "",
    contactInfo: "",
    alternateContactNo: "",
    emailId: "",
    website: "",
    description: "",
    attachments: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<Omit<VendorItem, "id" | "status">>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setData([
      {
        id: 1,
        serviceCategory: "IT Services",
        subCategory: "Software Development",
        serviceType: "Web Development",
        vendorName: "TechCorp Solutions",
        contactInfo: "+1234567890",
        alternateContactNo: "+1234567891",
        emailId: "contact@techcorp.com",
        website: "www.techcorp.com",
        description: "Leading web development company",
        attachments: "contract.pdf",
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
      serviceType: "",
      vendorName: "",
      contactInfo: "",
      alternateContactNo: "",
      emailId: "",
      website: "",
      description: "",
      attachments: "",
    });
    setIsViewMode(false);
    setFormErrors({});
    setIsFormVisible(true);
  };

  const handleView = (item: VendorItem) => {
    setFormData({
      serviceCategory: item.serviceCategory,
      subCategory: item.subCategory,
      serviceType: item.serviceType,
      vendorName: item.vendorName,
      contactInfo: item.contactInfo,
      alternateContactNo: item.alternateContactNo,
      emailId: item.emailId,
      website: item.website,
      description: item.description,
      attachments: item.attachments,
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
    const errors: Partial<Omit<VendorItem, "id" | "status">> = {};
    if (!formData.serviceCategory.trim()) errors.serviceCategory = "Service Category is required.";
    if (!formData.subCategory.trim()) errors.subCategory = "Sub Category is required.";
    if (!formData.serviceType.trim()) errors.serviceType = "Service Type is required.";
    if (!formData.vendorName.trim()) errors.vendorName = "Vendor Name is required.";
    if (!formData.contactInfo.trim()) errors.contactInfo = "Contact Info is required.";
    if (!formData.emailId.trim()) errors.emailId = "Email ID is required.";
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
      serviceType: "",
      vendorName: "",
      contactInfo: "",
      alternateContactNo: "",
      emailId: "",
      website: "",
      description: "",
      attachments: "",
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

          <VendorSetupForm
            formData={formData}
            onChange={handleFormChange}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
            errors={formErrors}
            isViewMode={isViewMode}
          />

      </FormModal>
    </>
  );
};

export default VendorSetup;