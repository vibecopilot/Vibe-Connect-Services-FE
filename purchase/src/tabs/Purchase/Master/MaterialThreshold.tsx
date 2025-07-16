import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import TableHead from "../../../components/TopHead";
import TopSearch from "../../../components/TopSearch";
import IconButton from "../../../components/IconButton";
import NoDataFound from "../../../components/NoDataFound";
import Pagination from "../../../components/Pagination";
import ToggleSwitch from "../../../components/ToggleSwitch";
import MaterialThresholdForm from "../../../forms/MaterialThresholdForm";
import FormModal from "../../../components/FormModal";

interface MaterialThresholdItem {
  id: number;
  materialCode: string;
  materialName: string;
  thresholdType: string;
  thresholdValue: string;
  status: boolean;
}

interface MaterialThresholdProps {
  onModalStateChange?: (isOpen: boolean) => void;
}

const MaterialThreshold: React.FC<MaterialThresholdProps> = ({onModalStateChange}) => {
  const [searchFilters, setSearchFilters] = useState({
    materialCode: "",
    materialName: "",
    thresholdType: "",
    thresholdValue: "",
    status: "",
  });

  const [data, setData] = useState<MaterialThresholdItem[]>([]);
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<MaterialThresholdItem, "id">>({
    materialCode: "",
    materialName: "",
    thresholdType: "",
    thresholdValue: "",
    status: false,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({});
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setData([
      {
        id: 1,
        materialCode: "MC001",
        materialName: "Steel Rod",
        thresholdType: "Minimum",
        thresholdValue: "100",
        status: true,
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
    if (!formData.materialCode.trim())
      errs.materialCode = "Material Code is required.";
    if (!formData.materialName.trim())
      errs.materialName = "Material Name is required.";
    if (!formData.thresholdType.trim())
      errs.thresholdType = "Threshold Type is required.";
    if (!formData.thresholdValue.trim())
      errs.thresholdValue = "Threshold Value is required.";
    else if (isNaN(Number(formData.thresholdValue)))
      errs.thresholdValue = "Threshold Value must be a number.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = () => {
    setFormData((prev) => ({ ...prev, status: !prev.status }));
  };

  const handleAddClick = () => {
    setFormData({
      materialCode: "",
      materialName: "",
      thresholdType: "",
      thresholdValue: "",
      status: false,
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

  const handleEdit = (item: MaterialThresholdItem) => {
    const { id, ...rest } = item;
    setFormData(rest);
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

      if (key === "status") {
        if (val === "active") return item.status === true;
        if (val === "inactive") return item.status === false;
        return true;
      }

      const field = item[key as keyof MaterialThresholdItem];
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
    { label: "Material Code" },
    { label: "Material Name" },
    { label: "Threshold Type" },
    { label: "Threshold Value" },
    { label: "Status", align: "center" },
  ];

  return (
    <>
      <div className="p-4 bg-white ">
      <div className="flex justify-between items-center">
        <TopSearch
          onSearch={() => setShowFilterRow((prev) => !prev)}
          onButtonClick={handleAddClick}
          buttons={["New Material Threshold"]}
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
                    name="materialName"
                    value={searchFilters.materialName}
                    onChange={(e) =>
                      handleFilterChange("materialName", e.target.value)
                    }
                    placeholder="Filter Material Name"
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  />
                </td>
                <td className="p-2 border-b border-gray-400">
                  <input
                    name="thresholdType"
                    value={searchFilters.thresholdType}
                    onChange={(e) =>
                      handleFilterChange("thresholdType", e.target.value)
                    }
                    placeholder="Filter Threshold Type"
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  />
                </td>
                <td className="p-2 border-b border-gray-400">
                  <input
                    name="thresholdValue"
                    value={searchFilters.thresholdValue}
                    onChange={(e) =>
                      handleFilterChange("thresholdValue", e.target.value)
                    }
                    placeholder="Filter Threshold Value"
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  />
                </td>
                <td className="p-2 border-b border-gray-400 text-center">
                  <select
                    name="status"
                    value={searchFilters.status}
                    onChange={(e) =>
                      handleFilterChange("status", e.target.value)
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
                <td colSpan={6}>
                  <NoDataFound message="No Material Thresholds found." />
                </td>
              </tr>
          )  : (

            paginatedData.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-100"
                onDoubleClick={() => handleEdit(item)}
              >
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
                <td className="p-2 border-b border-gray-400">{item.materialCode}</td>
                <td className="p-2 border-b border-gray-400">{item.materialName}</td>
                <td className="p-2 border-b border-gray-400">{item.thresholdType}</td>
                <td className="p-2 border-b border-gray-400">{item.thresholdValue}</td>
                <td className="p-2 border-b border-gray-400 text-center">
                  <ToggleSwitch
                    checked={item.status}
                    onChange={() => {
                    }}
                    disabled={true} // Disable toggle in table view
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
          <MaterialThresholdForm
            formData={formData}
            errors={errors}
            errorMessage={errorMessage}
            onChange={handleChange}
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

export default MaterialThreshold;
