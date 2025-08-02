import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import TableHead from "../../../components/TopHead";
import TopSearch from "../../../components/TopSearch";
import IconButton from "../../../components/IconButton";
import NoDataFound from "../../../components/NoDataFound";
import Pagination from "../../../components/Pagination";
import UserMaterialTypeMappingForm from "../../../forms/UserMaterialTypeMappingForm";
import FormModal from "../../../components/FormModal";

const userOptions = ["Alice", "Bob", "Charlie"];
const materialTypeOptions = ["Steel", "Plastic", "Rubber"];

interface MappingItem {
  id: number;
  userName: string;
  designation: string;
  department: string;
  materialType: string;
}

interface UserMaterialTypeMappingProps {
  onModalStateChange?: (isOpen: boolean) => void;
}

const UserMaterialTypeMapping: React.FC<UserMaterialTypeMappingProps> = ({onModalStateChange}) => {
  const [data, setData] = useState<MappingItem[]>([]);
  const [searchFilters, setSearchFilters] = useState({
    userName: "",
    designation: "",
    department: "",
    materialType: "",
  });
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState<Omit<MappingItem, "id">>({
    userName: "",
    designation: "",
    department: "",
    materialType: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<Omit<MappingItem, "id">>>({});
  const [editId, setEditId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setData([
      { id: 1, userName: "Alice", designation: "Manager", department: "HR", materialType: "Steel" },
    ]);
  }, []);

  // Notify parent component when modal state changes
  useEffect(() => {
    if (onModalStateChange) {
      onModalStateChange(isFormVisible);
    }
  }, [isFormVisible, onModalStateChange]);

  const handleAddClick = () => {
    setFormData({ userName: "", designation: "", department: "", materialType: "" });
    setEditId(null);
    setFormErrors({});
    setIsFormVisible(true);
  };

  const handleEdit = (item: MappingItem) => {
    setFormData({
      userName: item.userName,
      designation: item.designation,
      department: item.department,
      materialType: item.materialType,
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors: Partial<Omit<MappingItem, "id">> = {};
    if (!formData.userName.trim()) errors.userName = "User Name is required.";
    if (!formData.designation.trim()) errors.designation = "Designation is required.";
    if (!formData.department.trim()) errors.department = "Department is required.";
    if (!formData.materialType.trim()) errors.materialType = "Material Type is required.";
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

    setFormData({ userName: "", designation: "", department: "", materialType: "" });
    setEditId(null);
    setFormErrors({});
    setIsFormVisible(false);
  };

  const handleFilterChange = (key: keyof typeof searchFilters, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredData = data.filter((item) =>
    Object.entries(searchFilters).every(([key, value]) =>
      item[key as keyof MappingItem].toString().toLowerCase().includes(value.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { label: "Actions", align: "center" },
    { label: "Name of the User" },
    { label: "Designation" },
    { label: "Department" },
    { label: "Material Type" },
  ];

  return (
    <>
      <div className="p-4 bg-white ">
      <div className="flex justify-between items-center">
        <TopSearch
          onSearch={() => setShowFilterRow((prev) => !prev)}
          onButtonClick={handleAddClick}
          buttons={["New Mapping"]}
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
              <tr >
                <td className="p-2 border-b border-gray-400 text-center" />
                <td className="p-2 border-b border-gray-400">
                  <select
                    value={searchFilters.userName}
                    onChange={(e) => handleFilterChange("userName", e.target.value)}
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  >
                    <option value="">Select User</option>
                    {userOptions.map((user) => (
                      <option key={user} value={user}>{user}</option>
                    ))}
                  </select>
                </td>
                <td className="p-2 border-b border-gray-400">
                  <input
                    value={searchFilters.designation}
                    onChange={(e) => handleFilterChange("designation", e.target.value)}
                    placeholder="Search Designation"
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  />
                </td>
                <td className="p-2 border-b border-gray-400">
                  <input
                    value={searchFilters.department}
                    onChange={(e) => handleFilterChange("department", e.target.value)}
                    placeholder="Search Department"
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  />
                </td>
                <td className="p-2 border-b border-gray-400">
                  <select
                    value={searchFilters.materialType}
                    onChange={(e) => handleFilterChange("materialType", e.target.value)}
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  >
                    <option value="">Select Material Type</option>
                    {materialTypeOptions.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </td>
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
                  <td className="p-3 border-b border-gray-400">{item.userName}</td>
                  <td className="p-3 border-b border-gray-400">{item.designation}</td>
                  <td className="p-3 border-b border-gray-400">{item.department}</td>
                  <td className="p-3 border-b border-gray-400">{item.materialType}</td>
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
      <UserMaterialTypeMappingForm
          formData={formData}
          onChange={handleFormChange}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          errors={formErrors}
          isEditing={editId !== null}
        />
    </FormModal>
    </>
  );
};

export default UserMaterialTypeMapping;