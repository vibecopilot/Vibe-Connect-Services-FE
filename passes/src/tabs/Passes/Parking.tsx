import React, { useState, useEffect } from "react";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import TableHead from "../../components/TopHead";
import TopBar from "../../components/TopBar";
import IconButton from "../../components/IconButton";
import Modal from "../../components/Modal";
import Pagination from "../../components/Pagination";
import NoDataFound from "../../components/NoDataFound";
import ToggleSwitch from "../../components/ToggleSwitch";
import TextInput from "../../components/TextInput";
import Select from "../../components/Select";
import Checkbox from "../../components/Checkbox";

interface Item {
  id: number;
  slot_number: string;
  type: string;
  status: string;
  createdOn: string;
  createdBy: string;
  active: string;
}

const Parking: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [lastClickedButton, setLastClickedButton] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [data, setData] = useState<Item[]>([
    {
      id: 1,
      slot_number: "Slot A1",
      type: "Car",
      status: "Occupied",
      createdOn: "22-may-2025",
      createdBy: "Joe",
      active: "inactive",
    },
    {
      id: 2,
      slot_number: "Slot B2",
      type: "Motorcycle",
      status: "Available",
      createdOn: "22-may-2025",
      createdBy: "Joe",
      active: "inactive",
    },
  ]);

  const [slotNumber, setSlotNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [activeStatus, setActiveStatus] = useState(true);

  const [filters, setFilters] = useState({
    slot_number: "",
    type: "",
    status: "",
    createdBy: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const vehicleOptions = [
    { value: "Car", label: "Car" },
    { value: "Motorcycle", label: "Motorcycle" },
    { value: "Truck", label: "Truck" },
    { value: "Van", label: "Van" },
    { value: "Bus", label: "Bus" },
  ];

  useEffect(() => {
    if (editingItem) {
      setSlotNumber(editingItem.slot_number);
      setVehicleType(editingItem.type);
      setActiveStatus(editingItem.active === "active");
    } else {
      setSlotNumber("");
      setVehicleType("");
      setActiveStatus(true);
    }
  }, [editingItem]);

  const handleEditClick = (item: Item) => {
    setEditingItem(item);
    setLastClickedButton("Edit Item");
    setIsModalOpen(true);
  };

  const handleDeleteClick = () => {
    console.log("Delete clicked!");
  };

  const handleViewClick = (item: Item) => {
    console.log("View clicked:", item);
  };

  const handleSearchIconClick = () => {
    setShowFilters(!showFilters);
  };

  const handleButtonClick = (type: string) => {
    setLastClickedButton(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setLastClickedButton("");
    setEditingItem(null);
  };

  const topBarButtons = ["Visitor", "Staff", "Member"];

  const handleToggleActive = (id: number) => {
    const updatedData = data.map((item) =>
      item.id === id
        ? { ...item, active: item.active === "active" ? "inactive" : "active" }
        : item
    );
    setData(updatedData);
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleModalConfirm = () => {
    const newItem: Item = {
      id: editingItem?.id || Date.now(),
      slot_number: slotNumber,
      type: vehicleType,
      status: "Pending",
      createdOn:
        editingItem?.createdOn || new Date().toLocaleDateString("en-GB"),
      createdBy: editingItem?.createdBy || "System",
      active: activeStatus ? "active" : "inactive",
    };

    if (editingItem) {
      setData(
        data.map((item) => (item.id === editingItem.id ? newItem : item))
      );
    } else {
      setData([...data, newItem]);
    }

    setIsModalOpen(false);
    setEditingItem(null);
    setLastClickedButton("");
  };

  const getModalTitle = () => {
    return editingItem ? "Edit Slot" : "Create Slot";
  };

  const filteredData = data.filter((item) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      const itemValue = String(item[key as keyof Item]).toLowerCase();
      return itemValue.includes(value.toLowerCase());
    });
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-1">
        <TopBar
          onButtonClick={handleButtonClick}
          buttons={topBarButtons}
          onSearchIconClick={handleSearchIconClick}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          onPageChange={setCurrentPage}
          showControls={true}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200 text-[#5E5E5E]">
          <TableHead
            columns={[
              { label: "Actions", align: "center"},
              { label: "Slot Number", align: "center"},
              { label: "Type", align: "center"},
              { label: "Status", align: "center"},
              { label: "Created On", align: "center"},
              { label: "Created By", align: "center"},
              { label: "Active", align: "center"}
            ]}
          />
          <tbody>
            {showFilters && (
              <tr>
                <td className="px-3 border-b border-gray-200 text-center"></td>
                <td className="px-2 py-1 border-b border-gray-200 text-center">
                  <TextInput
                    label=""
                    name="slot_number"
                    value={filters.slot_number}
                    onChange={(e) =>
                      handleFilterChange("slot_number", e.target.value)
                    }
                    placeholder=""
                    className="bg-gray-50 max-w-[160px] mx-auto text-[#5E5E5E]"
                  />
                </td>
                <td className="px-2 py-1 border-b border-gray-200 text-center">
                  <TextInput
                    label=""
                    name="type"
                    value={filters.type}
                    onChange={(e) =>
                      handleFilterChange("type", e.target.value)
                    }
                    placeholder=""
                    className="bg-gray-50 max-w-[160px] mx-auto text-[#5E5E5E]"
                  />
                </td>
                <td className="px-2 py-1 border-b border-gray-200 text-center">
                  <TextInput
                    label=""
                    name="status"
                    value={filters.status}
                    onChange={(e) =>
                      handleFilterChange("status", e.target.value)
                    }
                    placeholder=""
                    className="bg-gray-50 max-w-[160px] mx-auto text-[#5E5E5E]"
                  />
                </td>
                <td className="p-3 border-b border-gray-200"></td>
                <td className="px-2 py-1 border-b border-gray-200 text-center">
                  <TextInput
                    label=""
                    name="createdBy"
                    value={filters.createdBy}
                    onChange={(e) =>
                      handleFilterChange("createdBy", e.target.value)
                    }
                    placeholder=""
                    className="bg-gray-50 max-w-[160px] mx-auto text-[#5E5E5E]"
                  />
                </td>
                <td className="p-3 border-b border-gray-200"></td>
              </tr>
            )}

            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 text-[#5E5E5E]">
                  <td className="p-3 border-b border-gray-200">
                    <div className="flex items-center justify-center space-x-3">
                      <IconButton
                        tooltip="Edit"
                        onClick={() => handleEditClick(item)}
                      >
                        <FiEdit />
                      </IconButton>
                      <IconButton
                        tooltip="Delete"
                        onClick={handleDeleteClick}
                      >
                        <FiTrash2 />
                      </IconButton>
                      <IconButton tooltip="View" onClick={() => handleViewClick(item)}>
                        <FiEye />
                      </IconButton>
                    </div>
                  </td>
                  <td className="p-3 border-b border-gray-200 text-center text-[#5E5E5E]">{item.slot_number}</td>
                  <td className="p-3 border-b border-gray-200 text-center text-[#5E5E5E]">{item.type}</td>
                  <td className="p-3 border-b border-gray-200 text-center text-[#5E5E5E]">{item.status}</td>
                  <td className="p-3 border-b border-gray-200 text-center text-[#5E5E5E]">{item.createdOn}</td>
                  <td className="p-3 border-b border-gray-200 text-center text-[#5E5E5E]">{item.createdBy}</td>
                  <td className="p-3 border-b border-gray-200 flex justify-center items-center">
                    <ToggleSwitch
                      isOn={item.active === "active"}
                      handleToggle={() => handleToggleActive(item.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4 text-[#5E5E5E]">
                  <NoDataFound />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={<span className="font-normal text-[#5E5E5E]">{getModalTitle()}</span>}
        content={
          <div className="space-y-4 text-[#5E5E5E]">
            <TextInput
              label="Enter Slot No:"
              required={true}
              value={slotNumber}
              onChange={(e) => setSlotNumber(e.target.value)}
              name="slotNumber"
              placeholder="e.g., A-101"
            />
            <Select
              label="Select Vehicle type:"
              required={true}
              options={vehicleOptions}
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              name="vehicleType"
              placeholder="Select a vehicle type"
            />
            <Checkbox
              label="Active"
              checked={activeStatus}
              onChange={({ target }) => setActiveStatus(target.checked)}
              name="activeStatus"
            />
          </div>
        }
        onConfirm={handleModalConfirm}
        confirmButtonClassName="w-full bg-[#7991BB] text-white rounded hover:bg-[#6a82b0] py-2"
        confirmText="Submit"
      />
    </div>
  );
};

export default Parking;
