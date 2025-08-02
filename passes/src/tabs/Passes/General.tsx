import React, { useRef, useState, useEffect } from "react";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import TableHead from "../../components/TopHead";
import TopBar from "../../components/TopBar";
import IconButton from "../../components/IconButton";
import Modal from "../../components/Modal";
import Pagination from "../../components/Pagination";
import NoDataFound from "../../components/NoDataFound";
import Tabs from "../../components/Tabs";
import type { GeneralFormHandle } from "../../forms/GeneralForm";
import GeneralForm from "../../forms/GeneralForm";
import ToggleSwitch from "../../components/ToggleSwitch";
import TextInput from "../../components/TextInput";

interface Item {
  id: number;
  purpose: string;
  status: string;
  workType?: string;
}

const General: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [lastClickedButton, setLastClickedButton] = useState("");
  const [activeSubTab, setActiveSubTab] = useState<string>("Visitor Type");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    purpose: "",
    workType: "",
  });

  const generalFormRef = useRef<GeneralFormHandle>(null);

  const [visitorTypes, setVisitorTypes] = useState<Item[]>([
    { id: 1, purpose: "Sales Represntative", status: "Inactive" },
    { id: 2, purpose: "Guest", status: "Inactive" },
    { id: 3, purpose: "Members", status: "Inactive" }
  ]);

  const [staffTypes, setStaffTypes] = useState<Item[]>([
    { id: 1, purpose: "Other", status: "Inactive", workType: "Other" },
    { id: 2, purpose: "Site Visit", status: "Inactive", workType: "Site Visit" },
    { id: 3, purpose: "Meeting", status: "Inactive", workType: "Meeting" }
  ]);

  const [purposes, setPurposes] = useState<Item[]>([
    { id: 1, purpose: "Meeting", status: "Inactive" },
    { id: 2, purpose: "Delivery", status: "Inactive" },
    { id: 3, purpose: "Personal", status: "Inactive" }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const subTabs = ["Visitor Type", "Staff Type", "Purpose"];

  useEffect(() => {
    setFilters({ purpose: "", workType: "" });
    setShowFilters(false);
  }, [activeSubTab]);

  const getButtonText = () => {
    switch (activeSubTab) {
      case "Visitor Type": return "Add Visitor Type";
      case "Staff Type": return "Add Staff Type";
      case "Purpose": return "Add Purpose";
      default: return `Add ${activeSubTab}`;
    }
  };

  const getFieldLabel = () => {
    switch (activeSubTab) {
      case "Visitor Type": return "Enter Visitor Type";
      case "Staff Type": return "Enter Staff Type";
      case "Purpose": return "Enter Purpose";
      default: return "Enter Name";
    }
  };

  const getTabData = () => {
    switch (activeSubTab) {
      case "Visitor Type": return { data: visitorTypes, setData: setVisitorTypes };
      case "Staff Type": return { data: staffTypes, setData: setStaffTypes };
      case "Purpose": return { data: purposes, setData: setPurposes };
      default: return { data: [], setData: () => {} };
    }
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const filteredData = getTabData().data.filter((item) => {
    const matchesSearch = Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchValue.toLowerCase())
    );
    const matchesPurpose = filters.purpose
      ? item.purpose.toLowerCase().includes(filters.purpose.toLowerCase())
      : true;
    const matchesWorkType =
      activeSubTab === "Staff Type" && filters.workType
        ? item.workType?.toLowerCase().includes(filters.workType.toLowerCase())
        : true;
    return matchesSearch && matchesPurpose && matchesWorkType;
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleStatusToggle = (id: number, currentStatus: string) => {
    const { data, setData } = getTabData();
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, status: currentStatus === "Active" ? "Inactive" : "Active" } : item
    );
    setData(updatedData);
  };

  return (
    <div>
      <Tabs
        tabs={subTabs.map((label) => ({ label, key: label }))}
        activeTab={activeSubTab}
        onTabChange={setActiveSubTab}
        renderContent={() => (
          <>
            <div className="flex items-center justify-between mb-2">
              <TopBar
                onSearch={setSearchValue}
                onButtonClick={(text) => { setLastClickedButton(text); setIsModalOpen(true); }}
                buttons={[getButtonText()]}
                onSearchIconClick={() => setShowFilters(prev => !prev)}
              />
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              onPageChange={setCurrentPage}
              showControls={true}
            />

            <div className="overflow-x-auto">
              <table className="table-fixed min-w-full border border-gray-200 text-[#5E5E5E]">
                <TableHead
                  columns={[
                    { label: "Actions", align: "center", className: "w-[10px]"},
                    { label: activeSubTab, align: "center", className: "w-[344px]" },
                    ...(activeSubTab === "Staff Type"
                      ? [{ label: "Work Type", align: "center", className: "w-[344px]" }]
                      : []),
                    { label: "Status", align: "center", className: "w-[40px]" },
                  ]}
                />
                <tbody>
                  {showFilters && (
                    <tr>
                      <td className="px-2 border-b border-gray-200 text-center"></td>
                      <td className="px-2 py-1 border-b border-gray-200 text-center">
                        <TextInput
                          label=""
                          name="purposeFilter"
                          value={filters.purpose}
                          onChange={(e) => handleFilterChange("purpose", e.target.value)}
                          placeholder=""
                          className="bg-gray-50 max-w-[160px] mx-auto text-[#5E5E5E]"
                        />
                      </td>
                      {activeSubTab === "Staff Type" && (
                        <td className="px-2 py-1 border-b border-gray-200 text-center">
                          <TextInput
                            label=""
                            name="workTypeFilter"
                            value={filters.workType}
                            onChange={(e) => handleFilterChange("workType", e.target.value)}
                            placeholder=""
                            className="bg-gray-50 max-w-[160px] mx-auto text-[#5E5E5E]"
                          />
                        </td>
                      )}
                      <td className="px-2 py-1 border-b border-gray-200"></td>
                    </tr>
                  )}

                  {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="p-3 border-b border-gray-200 text-center space-x-3">
                          <IconButton tooltip="Edit" onClick={() => { setEditingItem(item); setLastClickedButton("Edit Item"); setIsModalOpen(true); }}>
                            <FiEdit />
                          </IconButton>
                          <IconButton tooltip="Delete" onClick={() => console.log("Delete")}> <FiTrash2 /> </IconButton>
                          <IconButton tooltip="View" onClick={() => console.log("View")}> <FiEye /> </IconButton>
                        </td>
                        <td className="p-3 text-center border-b border-gray-200 text-[#5E5E5E]">{item.purpose}</td>
                        {activeSubTab === "Staff Type" && (
                          <td className="p-3 border-b border-gray-200 text-center text-[#5E5E5E]">{item.workType}</td>
                        )}
                        <td className="p-3 border-b border-gray-200 flex justify-center items-center">
                          <ToggleSwitch
                            isOn={item.status === "Active"}
                            handleToggle={() => handleStatusToggle(item.id, item.status)}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={activeSubTab === "Staff Type" ? 4 : 3} className="text-center py-4 text-[#5E5E5E]">
                        <NoDataFound />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
        orientation="horizontal"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={<span className="font-normal text-[#5E5E5E]">{lastClickedButton || "Modal"}</span>}
        content={["Add Visitor Type", "Add Staff Type", "Add Purpose", "Edit Item"].includes(lastClickedButton)
          ? <GeneralForm ref={generalFormRef} showWorkTypeSelect={activeSubTab === "Staff Type"} fieldLabel={getFieldLabel()} />
          : null}
        onConfirm={() => {
          const { data, setData } = getTabData();
          if (generalFormRef.current) {
            const payload = generalFormRef.current.getPayload();
            if (!payload) return;

            const normalizedPayload: Item = {
              purpose: payload.purpose || payload.name || "Untitled",
              status: payload.status || "Active",
              ...(activeSubTab === "Staff Type" && { workType: payload.workType || "" }),
              id: editingItem ? editingItem.id : Date.now(),
            };

            if (lastClickedButton === "Edit Item" && editingItem) {
              const updatedData = data.map((item) =>
                item.id === editingItem.id ? { ...item, ...normalizedPayload } : item
              );
              setData(updatedData);
            } else {
              setData([...data, normalizedPayload]);
            }

            setIsModalOpen(false);
            setEditingItem(null);
            setLastClickedButton("");
          }
        }}
        confirmButtonClassName="w-full bg-[#7991BB] text-white rounded hover:bg-[#6a82b0] py-2"
        confirmText="Submit"
        width="max-w-sm"
      />
    </div>
  );
};

export default General;
