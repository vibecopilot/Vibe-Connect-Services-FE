import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import TableHead from "../../../components/TopHead";
import TopSearch from "../../../components/TopSearch";
import IconButton from "../../../components/IconButton";
import NoDataFound from "../../../components/NoDataFound";
import Pagination from "../../../components/Pagination";
import MaterialBrandsForm from "../../../forms/MaterialBrandsForm";
import FormModal from "../../../components/FormModal";

const materialOptions = ["Steel", "Plastic", "Wood"];

interface MaterialBrandItem {
  id: number;
  brandName: string;
  material: string;
  brandLogo: File | null;
  description: string;
}

interface MaterialBrandsProps{
  onModalStateChange?: (isOpen: boolean) => void;
}

const MaterialBrands: React.FC<MaterialBrandsProps> = ({onModalStateChange}) => {
  const [data, setData] = useState<MaterialBrandItem[]>([]);
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    brandName: "",
    material: "",
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState<Omit<MaterialBrandItem, "id">>({
    brandName: "",
    material: "",
    brandLogo: null,
    description: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<Omit<MaterialBrandItem, "id">>>({});
  const [editId, setEditId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setData([
      {
        id: 1,
        brandName: "TATA Steel",
        material: "Steel",
        brandLogo: null,
        description: "Leading steel brand in India",
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
    setFormData({ brandName: "", material: "", brandLogo: null, description: "" });
    setEditId(null);
    setFormErrors({});
    setIsFormVisible(true);
  };

  const handleEdit = (item: MaterialBrandItem) => {
    setFormData({
      brandName: item.brandName,
      material: item.material,
      brandLogo: item.brandLogo,
      description: item.description,
    });
    setEditId(item.id);
    setFormErrors({});
    setIsFormVisible(true);
  };

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setFormErrors({});
    setEditId(null);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (files: FileList | null) => {
    setFormData((prev) => ({ ...prev, brandLogo: files ? files[0] : null }));
  };

  const validateForm = () => {
    const errors: Partial<Omit<MaterialBrandItem, "id">> = {};
    if (!formData.brandName.trim()) errors.brandName = "Brand Name is required.";
    if (!formData.material.trim()) errors.material = "Material is required.";
    return errors;
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (editId !== null) {
      setData((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...item, ...formData } : item
        )
      );
    } else {
      setData((prev) => [...prev, { id: Date.now(), ...formData }]);
    }

    setFormData({ brandName: "", material: "", brandLogo: null, description: "" });
    setEditId(null);
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
    { label: "Brand Name" },
    { label: "Material" },
    { label: "Brand Logo" },
    { label: "Brand Description" },
  ];

  return (
    <>
      <div className="p-4 bg-white rounded-md shadow-md">
      <div className="flex justify-between items-center">
        <TopSearch
          onSearch={() => setShowFilterRow((prev) => !prev)}
          onButtonClick={handleAddClick}
          buttons={["New Brand"]}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredData.length / itemsPerPage)}
          totalItems={filteredData.length}
          onPageChange={setCurrentPage}
        />
      </div>

      

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto ">
          <TableHead columns={columns} />
          <tbody>
            {showFilterRow && (
              <tr>
                <td className="p-2 border-b border-gray-400 text-center" />
                <td className="p-2 border-b border-gray-400">
                  <input
                    value={searchFilters.brandName}
                    onChange={(e) => handleFilterChange("brandName", e.target.value)}
                    placeholder="Search Brand Name"
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  />
                </td>
                <td className="p-2 border-b border-gray-400">
                  <select
                    value={searchFilters.material}
                    onChange={(e) => handleFilterChange("material", e.target.value)}
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  >
                    <option value="">All Materials</option>
                    {materialOptions.map((mat) => (
                      <option key={mat} value={mat}>
                        {mat}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-2 border-b border-gray-400" colSpan={2} />
              </tr>
            )}

            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b border-gray-400 text-center space-x-3">
                    <IconButton
                      tooltip="Edit"
                      className="hover:text-green-600"
                      onClick={() => handleEdit(item)}
                    >
                      <FiEdit />
                    </IconButton>
                    <IconButton
                      tooltip="Delete"
                      className="hover:text-red-600"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FiTrash2 />
                    </IconButton>
                  </td>
                  <td className="p-3 border-b border-gray-400">{item.brandName}</td>
                  <td className="p-3 border-b border-gray-400">{item.material}</td>
                  <td className="p-3 border-b border-gray-400">
                    {item.brandLogo ? item.brandLogo.name : "No File"}
                  </td>
                  <td className="p-3 border-b border-gray-400">{item.description}</td>
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
      <MaterialBrandsForm
          formData={formData}
          onChange={handleFormChange}
          onFileChange={handleFileChange}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          errors={formErrors}
          isEditing={editId !== null}
        />
    </FormModal>
    </>
  );
};

export default MaterialBrands;