// src/pages/SupportStaff.tsx
import React, { useRef, useState, useEffect } from "react";
import { FiSettings, FiEdit, FiTrash2 } from "react-icons/fi";
import TableHead from "../../components/TopHead";
import TopBar from "../../components/TopBar";
import IconButton from "../../components/IconButton";
import Pagination from "../../components/Pagination";
import NoDataFound from "../../components/NoDataFound";
import Tabs from "../../components/Tabs";
import type { StaffFormHandle, StaffFormData } from "../../forms/StaffForm";
import StaffForm from "../../forms/StaffForm";
import type { CabFormHandle, CabFormData } from "../../forms/CabForm";
import CabForm from "../../forms/CabForm";
import SwiggyLogo from "../../assets/icons/Swiggy_logo.png";
import ZomatoLogo from "../../assets/icons/Zomato_logo.png";
import Blinkit from "../../assets/icons/blinkit_logo.png"; 

interface Item {
  id: number;
  name: string;
  estimated_time: string;
  icons: string;
  createdOn: string;
  createdBy: string;
  type?: string;
  active?: boolean;
}

const SupportStaff: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'Staff Category' | 'Cab/Deliveries'>('Staff Category');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState<number | null>(null);
  const itemsPerPage = 10;
  const staffFormRef = useRef<StaffFormHandle>(null);
  const cabFormRef = useRef<CabFormHandle>(null);

  const iconImages: Record<string, string> = {
    zomato: ZomatoLogo,
    swiggy: SwiggyLogo,
    blinkit: Blinkit 
  };

  const [patrolItems, setPatrolItems] = useState<Item[]>([
    { id: 1, name: "Perimeter Check", estimated_time: "2 hrs", icons: "🚗", createdOn: "01 May 2025", createdBy: "Admin" },
    { id: 2, name: "Equipment Inspection", estimated_time: "1.5 hrs", icons: "👮", createdOn: "28 Apr 2025", createdBy: "Admin" },
  ]);

  const [cabItems, setCabItems] = useState<Item[]>([
    { id: 1, name: "Taxi Service", estimated_time: "30 min", icons: "swiggy", createdOn: "15 May 2025", createdBy: "Admin", type: "Sedan", active: true },
    { id: 2, name: "Delivery Van", estimated_time: "45 min", icons: "zomato", createdOn: "10 May 2025", createdBy: "Admin", type: "Van", active: true },
  ]);

  const subTabs = [
    { label: 'Staff Category', key: 'Staff Category' },
    { label: 'Cab/Deliveries', key: 'Cab/Deliveries' },
  ];

  const columns = [
    { label: "Actions", align: "center" },
    { label: "Name" },
    { label: "Estimated time" },
    { label: "Icons" },
    { label: "Created On" },
    { label: "Created By" },
  ];

  // Reset form when switching tabs
  useEffect(() => {
    setShowForm(false);
    setEditingId(null);
  }, [activeSubTab]);

  // Get data for current tab
  const getTabData = () => {
    switch (activeSubTab) {
      case 'Staff Category': return patrolItems;
      case 'Cab/Deliveries': return cabItems;
      default: return [];
    }
  };

  const filteredData = getTabData().filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchValue.toLowerCase())
  ));

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleButtonClick = () => {
    setShowForm(true);
    setEditingId(null);
  };

  const handleStaffSubmit = (staffData: StaffFormData) => {
    const newItem: Item = {
      id: editingId || Date.now(),
      name: staffData.categoryName,
      estimated_time: `${staffData.hours1 || 0} hrs`,
      icons: staffData.categoryType === "user" ? "👤" : "💼",
      createdOn: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      createdBy: "System",
    };
    
    if (editingId) {
      setPatrolItems(patrolItems.map(p => p.id === editingId ? newItem : p));
    } else {
      setPatrolItems([...patrolItems, newItem]);
    }
    
    setShowForm(false);
    setEditingId(null);
  };

  const handleCabSubmit = (cabData: CabFormData) => {
    const newCab: Item = {
      id: editingId || Date.now(),
      name: cabData.cabName,
      estimated_time: "N/A",
      icons: cabData.icon,  // Store the icon ID instead of an emoji
      createdOn: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      createdBy: "System",
      type: cabData.cabType,
      active: cabData.active
    };
    
    if (editingId) {
      setCabItems(cabItems.map(c => c.id === editingId ? newCab : c));
    } else {
      setCabItems([...cabItems, newCab]);
    }
    
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (id: number) => {
    const item = getTabData().find(i => i.id === id);
    if (item) {
      setEditingId(id);
      setShowForm(true);
    }
  };

  const handleDelete = (id: number) => {
    if (activeSubTab === 'Staff Category') {
      setPatrolItems(patrolItems.filter(item => item.id !== id));
    } else {
      setCabItems(cabItems.filter(c => c.id !== id));
    }
  };

  const getInitialStaffData = () => {
    if (!editingId) return undefined;
    const item = patrolItems.find(p => p.id === editingId);
    return item ? {
      categoryName: item.name,
      day: "",
      hours1: item.estimated_time.split(" ")[0] || "0",
      hours2: "0",
      categoryType: item.icons === "👤" ? "user" : "briefcase"
    } : undefined;
  };

  const getInitialCabData = () => {
    if (!editingId) return undefined;
    const cab = cabItems.find(c => c.id === editingId);
    return cab ? {
      cabName: cab.name,
      cabType: cab.type || "",
      active: cab.active ?? true,
      icon: cab.icons  // Pass the icon ID to the form
    } : undefined;
  };

  return (
    <div>
      <Tabs
        tabs={subTabs}
        activeTab={activeSubTab}
        onTabChange={setActiveSubTab}
        renderContent={() => (
          <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-1">
              <TopBar
                onSearch={setSearchValue}
                onButtonClick={handleButtonClick}
                buttons={["Create"]}
              />
              {!showForm && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  onPageChange={setCurrentPage}
                  showControls={true}
                />
              )}
            </div>

            {showForm && (
              <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                <h2 className="text-xl font-semibold mb-4">
                </h2>
                {activeSubTab === 'Staff Category' ? (
                  <StaffForm
                    ref={staffFormRef}
                    initialData={getInitialStaffData()}
                    onCancel={() => {
                      setShowForm(false);
                      setEditingId(null);
                    }}
                    onSubmit={handleStaffSubmit}
                  />
                ) : (
                  <CabForm
                    ref={cabFormRef}
                    initialData={getInitialCabData()}
                    onCancel={() => {
                      setShowForm(false);
                      setEditingId(null);
                    }}
                    onSubmit={handleCabSubmit}
                  />
                )}
              </div>
            )}

            {!showForm && (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border border-gray-200">
                  <TableHead columns={columns} />
                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map(item => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="p-3 border-b text-center space-x-3">
                            <IconButton tooltip="Settings">
                              <FiSettings />
                            </IconButton>
                            <IconButton 
                              tooltip="Edit" 
                              className="hover:text-green-600"
                              onClick={() => handleEdit(item.id)}
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
                          <td className="p-3 border-b">{item.name}</td>
                          <td className="p-3 border-b">{item.estimated_time}</td>
                          <td className="p-3 border-b">
                            {/* Show actual icons for Cab/Deliveries */}
                            {activeSubTab === 'Cab/Deliveries' && iconImages[item.icons] ? (
                              <img 
                                src={iconImages[item.icons]} 
                                alt={item.icons}
                                className="w-8 h-8 object-contain"
                              />
                            ) : (
                              <span className="text-2xl">{item.icons}</span>
                            )}
                          </td>
                          <td className="p-3 border-b">{item.createdOn}</td>
                          <td className="p-3 border-b">{item.createdBy}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center py-4 text-gray-500">
                          <NoDataFound />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
        orientation="horizontal"
      />
    </div>
  );
};

export default SupportStaff;