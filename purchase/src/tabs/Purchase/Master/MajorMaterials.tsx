import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import TableHead from "../../../components/TopHead";
import TopSearch from "../../../components/TopSearch";
import IconButton from "../../../components/IconButton";
import NoDataFound from "../../../components/NoDataFound";
import Pagination from "../../../components/Pagination";
import ToggleSwitch from "../../../components/ToggleSwitch";
import MajorMaterialsForm from "../../../forms/MajorMaterialsForm";
import FormModal from "../../../components/FormModal";

interface MajorMaterialItem {
  id: number;
  materialCategory: string;
  materialCode: string;
  lastPurchaseDate: Date | null;
  materialStatus: boolean;
}

interface MajorMaterialProps {
  onModalStateChange?: (isOpen: boolean) => void;
}

const MajorMaterials: React.FC<MajorMaterialProps> = ({onModalStateChange}) => {
  const [searchFilters, setSearchFilters] = useState({
    materialCategory: "",
    materialCode: "",
    lastPurchaseDate: "",
    materialStatus: "",
  });

  const [data, setData] = useState<MajorMaterialItem[]>([]);
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Omit<MajorMaterialItem, "id">>({
    materialCategory: "",
    materialCode: "",
    lastPurchaseDate: null,
    materialStatus: false,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({});
  const [errorMessage, setErrorMessage] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setData([
      {
        id: 1,
        materialCategory: "Raw Material",
        materialCode: "RM001",
        lastPurchaseDate: new Date("2024-11-15"),
        materialStatus: true,
      },
      {
        id: 2,
        materialCategory: "Component",
        materialCode: "CP002",
        lastPurchaseDate: new Date("2024-05-20"),
        materialStatus: false,
      },
    ]);
  }, []);

  // Notify parent component when modal state changes
  useEffect(() => {
    if (onModalStateChange) {
      onModalStateChange(showForm);
    }
  }, [showForm, onModalStateChange]);

  const validateForm = () => {
    const errs: Partial<Record<keyof typeof formData, string>> = {};
    if (!formData.materialCategory.trim())
      errs.materialCategory = "Material Category is required.";
    if (!formData.materialCode.trim())
      errs.materialCode = "Material Code is required.";
    if (!formData.lastPurchaseDate)
      errs.lastPurchaseDate = "Last Purchase Date is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({ ...prev, lastPurchaseDate: date }));
  };

  const handleToggleChange = () => {
    setFormData((prev) => ({ ...prev, materialStatus: !prev.materialStatus }));
  };

  const handleAddClick = () => {
    setFormData({
      materialCategory: "",
      materialCode: "",
      lastPurchaseDate: null,
      materialStatus: false,
    });
    setEditId(null);
    setShowForm(true);
    setErrors({});
    setErrorMessage("");
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditId(null);
    setErrors({});
    setErrorMessage("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    if (editId !== null) {
      setData((prev) =>
        prev.map((item) =>
          item.id === editId ? { id: editId, ...formData } : item
        )
      );
    } else {
      setData((prev) => [...prev, { id: Date.now(), ...formData }]);
    }

    handleCancel();
  };

  const handleEdit = (item: MajorMaterialItem) => {
    const { id, ...rest } = item;
    setFormData({
      ...rest,
      lastPurchaseDate: rest.lastPurchaseDate
        ? new Date(rest.lastPurchaseDate)
        : null,
    });
    setEditId(id);
    setShowForm(true);
    setErrors({});
    setErrorMessage("");
  };

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleFilterChange = (
    key: keyof typeof searchFilters,
    value: string
  ) => {
    setSearchFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredData = data.filter((item) =>
    Object.entries(searchFilters).every(([key, val]) => {
      if (!val) return true;

      if (key === "lastPurchaseDate" && item.lastPurchaseDate) {
        const formattedDate = item.lastPurchaseDate.toISOString().slice(0, 10);
        return formattedDate === val;
      }

      if (key === "materialStatus") {
        if (val === "active") return item.materialStatus === true;
        if (val === "inactive") return item.materialStatus === false;
        return true;
      }

      const field = item[key as keyof MajorMaterialItem];
      if (field === null || field === undefined) return false;
      return field.toString().toLowerCase().includes(val.toLowerCase());
    })
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { label: "Actions", align: "center" },
    { label: "Material Category" },
    { label: "Material Code" },
    { label: "Last Purchase Date" },
    { label: "Material Status", align: "center" },
  ];

  return (
    <>
      <div className="p-4 bg-white">
      <div className="flex justify-between items-center">
        <TopSearch
          onSearch={() => setShowFilterRow((prev) => !prev)}
          onButtonClick={handleAddClick}
          buttons={["New Major Material"]}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredData.length / itemsPerPage) || 1}
          totalItems={filteredData.length}
          onPageChange={setCurrentPage}
        />
      </div>

      

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto">
          <TableHead columns={columns} />
          <tbody>
            {showFilterRow && (
              <tr >
                <td className="p-2 border-b border-gray-400 text-center" />
                <td className="p-2 border-b border-gray-400">
                  <input
                    name="materialCategory"
                    value={searchFilters.materialCategory}
                    onChange={(e) =>
                      handleFilterChange("materialCategory", e.target.value)
                    }
                    placeholder="Filter Material Category"
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  />
                </td>
                <td className="p-2 border-b border-gray-400">
                  <input
                    name="materialCode"
                    value={searchFilters.materialCode}
                    onChange={(e) =>
                      handleFilterChange("materialCode", e.target.value)
                    }
                    placeholder="Filter Material Code"
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  />
                </td>
                <td className="p-2 border-b border-gray-400">
                  <input
                    name="lastPurchaseDate"
                    type="date"
                    value={searchFilters.lastPurchaseDate}
                    onChange={(e) =>
                      handleFilterChange("lastPurchaseDate", e.target.value)
                    }
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  />
                </td>
                <td className="p-2 border-b border-gray-400 text-center">
                  <select
                    name="materialStatus"
                    value={searchFilters.materialStatus}
                    onChange={(e) =>
                      handleFilterChange("materialStatus", e.target.value)
                    }
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  >
                    <option value="">All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </td>
              </tr>
            )}

            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <NoDataFound />
                </td>
              </tr>
            ) : (
              paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
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
                  <td className="p-2 border-b border-gray-400">{item.materialCategory}</td>
                  <td className="p-2 border-b border-gray-400">{item.materialCode}</td>
                  <td className="p-2 border-b border-gray-400">
                    {item.lastPurchaseDate
                      ? item.lastPurchaseDate.toLocaleDateString("en-US")
                      : "-"}
                  </td>

                  <td className="p-2 border-b border-gray-400 text-center">
                    <ToggleSwitch
                      checked={item.materialStatus}
                      onChange={() => {}}
                      disabled={true}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
    <FormModal isOpen={showForm} onClose={handleCancel}>
      <div className="my-4">
          <MajorMaterialsForm
            formData={formData}
            errors={errors}
            errorMessage={errorMessage}
            onChange={handleChange}
            onDateChange={handleDateChange}
            onToggleChange={handleToggleChange}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isEditing={editId !== null}
          />
        </div>
    </FormModal>
    </>
  );
};

export default MajorMaterials;
