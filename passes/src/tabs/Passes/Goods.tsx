// Goods.tsx
import React, { useRef, useState } from "react";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import TableHead from "../../components/TopHead";
import TopBar from "../../components/TopBar";
import IconButton from "../../components/IconButton";
import Modal from "../../components/Modal";
import Pagination from "../../components/Pagination";
import NoDataFound from "../../components/NoDataFound";
import Tabs from "../../components/Tabs";
import GoodsInForm from "../../forms/GoodsInForm";
import GoodsOutForm from "../../forms/GoodsOutForm";
import PackageDeliveryForm from "../../forms/PackageDeliveryForm";
import PackageDropOffForm from "../../forms/PackageDropOffForm";
import { type GoodsInFormHandle } from "../../forms/GoodsInForm";
import { type GoodsOutFormHandle } from "../../forms/GoodsOutForm";
import { type PackageDeliveryFormHandle } from "../../forms/PackageDeliveryForm";
import { type PackageDropOffFormHandle } from "../../forms/PackageDropOffForm";

interface GoodsInItem {
  id: number;
  visitorName: string;
  visitorContact: string;
  quantity: number;
  description: string;
  securityStatus: string;
  unitOwnerName: string;
  createdOn: string;
  createdBy: string;
  active: string;
  status: string;
}

interface GoodsOutItem {
  id: number;
  ownerName: string;
  ownerContact: string;
  quantity: number;
  status: string;
  createdOn: string;
  createdBy: string;
  active: string;
}

interface DeliveryPackageItem {
  id: number;
  partnerName: string;
  partnerContact: string;
  lockerNumber: string;
  status: string;
  createdOn: string;
  createdBy: string;
  active: string;
  packageType: "delivery" | "dropoff";
}

const Goods: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [activeSubTab, setActiveSubTab] = useState("Goods In");
  const [deliverySubTab, setDeliverySubTab] = useState("Package Delivery");

  const [goodsInData, setGoodsInData] = useState<GoodsInItem[]>([
    {
      id: 1,
      visitorName: "John Doe",
      visitorContact: "john@example.com",
      quantity: 5,
      description: "Office supplies",
      securityStatus: "Pending",
      unitOwnerName: "Jane Smith",
      createdOn: "22-may-2025",
      createdBy: "Joe",
      active: "active",
      status: "Pending",
    },
  ]);

  const [goodsOutData, setGoodsOutData] = useState<GoodsOutItem[]>([
    {
      id: 1,
      ownerName: "Michael Brown",
      ownerContact: "michael@example.com",
      quantity: 10,
      status: "Approved",
      createdOn: "22-may-2025",
      createdBy: "Joe",
      active: "active",
    },
  ]);

  const [deliveryPackageData, setDeliveryPackageData] = useState<DeliveryPackageItem[]>([
    {
      id: 1,
      partnerName: "UPS",
      partnerContact: "1-800-742-5877",
      lockerNumber: "A12",
      status: "In Transit",
      createdOn: "22-may-2025",
      createdBy: "Joe",
      active: "active",
      packageType: "delivery",
    },
    {
      id: 2,
      partnerName: "FedEx",
      partnerContact: "1-800-463-3339",
      lockerNumber: "B7",
      status: "Ready",
      createdOn: "22-may-2025",
      createdBy: "Joe",
      active: "inactive",
      packageType: "dropoff",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = goodsInData.length + goodsOutData.length + deliveryPackageData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goodsInFormRef = useRef<GoodsInFormHandle>(null);
  const goodsOutFormRef = useRef<GoodsOutFormHandle>(null);
  const packageDeliveryFormRef = useRef<PackageDeliveryFormHandle>(null);
  const packageDropOffFormRef = useRef<PackageDropOffFormHandle>(null);

  const subTabs = ["Goods In", "Goods Out", "Delivery Package"];
  const topBarButtons =
    activeSubTab === "Delivery Package" && deliverySubTab === "Package Drop-Off for Collection"
      ? ["Add", "Raised Tickets"]
      : ["Add"];

  const handleSearch = (query: string) => setSearchValue(query);
  const handleButtonClick = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const getCurrentData = () => {
    switch (activeSubTab) {
      case "Goods In":
        return goodsInData;
      case "Goods Out":
        return goodsOutData;
      case "Delivery Package":
        return deliveryPackageData.filter((item) =>
          deliverySubTab === "Package Delivery" ? item.packageType === "delivery" : item.packageType === "dropoff"
        );
      default:
        return [];
    }
  };

  const filteredData = getCurrentData().filter((item) =>
    Object.values(item).some((v) => String(v).toLowerCase().includes(searchValue.toLowerCase()))
  );

  const handleSubmit = () => {
    if (activeSubTab === "Goods In" && goodsInFormRef.current) {
      const payload = goodsInFormRef.current.getPayload();
      
      if (editingItem) {
        setGoodsInData(prev =>
          prev.map(item =>
            item.id === editingItem.id
              ? {
                  ...item,
                  ...payload,
                  quantity: Number(payload.quantity),
                  status: payload.securityStatus,
                }
              : item
          )
        );
      } else {
        const newItem: GoodsInItem = {
          id: Math.max(0, ...goodsInData.map(item => item.id)) + 1,
          ...payload,
          quantity: Number(payload.quantity),
          createdOn: new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          createdBy: "Admin",
          active: "active",
          status: payload.securityStatus,
        };
        setGoodsInData(prev => [...prev, newItem]);
      }
    } else if (activeSubTab === "Goods Out" && goodsOutFormRef.current) {
      const payload = goodsOutFormRef.current.getPayload();
      
      if (editingItem) {
        setGoodsOutData(prev =>
          prev.map(item =>
            item.id === editingItem.id
              ? {
                  ...item,
                  ...payload,
                  quantity: Number(payload.quantity),
                }
              : item
          )
        );
      } else {
        const newItem: GoodsOutItem = {
          id: Math.max(0, ...goodsOutData.map(item => item.id)) + 1,
          ...payload,
          quantity: Number(payload.quantity),
          createdOn: new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          createdBy: "Admin",
          active: "active",
        };
        setGoodsOutData(prev => [...prev, newItem]);
      }
    } else if (activeSubTab === "Delivery Package" && deliverySubTab === "Package Delivery" && packageDeliveryFormRef.current) {
      const payload = packageDeliveryFormRef.current.getPayload();
      
      if (editingItem) {
        setDeliveryPackageData(prev =>
          prev.map(item =>
            item.id === editingItem.id
              ? {
                  ...item,
                  ...payload,
                }
              : item
          )
        );
      } else {
        const newItem: DeliveryPackageItem = {
          id: Math.max(0, ...deliveryPackageData.map(item => item.id)) + 1,
          ...payload,
          createdOn: new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          createdBy: "Admin",
          active: "active",
          packageType: "delivery",
        };
        setDeliveryPackageData(prev => [...prev, newItem]);
      }
    } else if (activeSubTab === "Delivery Package" && deliverySubTab === "Package Drop-Off for Collection" && packageDropOffFormRef.current) {
      const payload = packageDropOffFormRef.current.getPayload();
      
      if (editingItem) {
        setDeliveryPackageData(prev =>
          prev.map(item =>
            item.id === editingItem.id
              ? {
                  ...item,
                  ...payload,
                }
              : item
          )
        );
      } else {
        const newItem: DeliveryPackageItem = {
          id: Math.max(0, ...deliveryPackageData.map(item => item.id)) + 1,
          ...payload,
          createdOn: new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          createdBy: "Admin",
          active: "active",
          packageType: "dropoff",
        };
        setDeliveryPackageData(prev => [...prev, newItem]);
      }
    }
    
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="text-[#5E5E5E]">
      <Tabs
        tabs={subTabs.map((label) => ({ label, key: label }))}
        activeTab={activeSubTab}
        onTabChange={(tab) => { setActiveSubTab(tab); setDeliverySubTab("Package Delivery"); }}
        orientation="horizontal"
        renderContent={() => (
          <>
            {activeSubTab === "Delivery Package" && (
              <Tabs
                tabs={[
                  { label: "Package Delivery", key: "Package Delivery" },
                  { label: "Package Drop-Off for Collection", key: "Package Drop-Off for Collection" },
                ]}
                activeTab={deliverySubTab}
                onTabChange={setDeliverySubTab}
              />
            )}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-1 mt-1">
              <TopBar onSearch={handleSearch} onButtonClick={handleButtonClick} buttons={topBarButtons} />
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                totalItems={totalItems} 
                onPageChange={setCurrentPage} 
                showControls 
              />
            </div>

            {/* Table Implementation */}
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-200 text-[#5E5E5E]">
                <TableHead
                  columns={
                    activeSubTab === "Goods In"
                      ? [
                          { label: "Actions", align: "center" },
                          { label: "Visitor Name", align: "center" },
                          { label: "Visitor Contact", align: "center" },
                          { label: "Quantity", align: "center" },
                          { label: "Status", align: "center" },
                        ]
                      : activeSubTab === "Goods Out"
                      ? [
                          { label: "Actions", align: "center" },
                          { label: "Owner Name", align: "center" },
                          { label: "Owner Contact", align: "center" },
                          { label: "Quantity", align: "center" },
                          { label: "Status", align: "center" },
                        ]
                      : [
                          { label: "Actions", align: "center" },
                          { label: "Delivery Partner Name", align: "center" },
                          { label: "Delivery Partner Contact", align: "center" },
                          { label: "Locker Number", align: "center" },
                          { label: "Status", align: "center" },
                        ]
                  }
                />
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="p-3 border-b border-gray-200 text-center space-x-3">
                          <IconButton tooltip="Edit" onClick={() => { setEditingItem(item); setIsModalOpen(true); }}><FiEdit /></IconButton>
                          <IconButton tooltip="Delete" onClick={() => console.log("Delete clicked")}><FiTrash2 /></IconButton>
                          <IconButton tooltip="View" onClick={() => console.log("View")}> <FiEye /> </IconButton>
                        </td>

                        {/* Goods In Data */}
                        {activeSubTab === "Goods In" && (
                          <>
                            <td className="p-3 border-b border-gray-200 text-center">{(item as GoodsInItem).visitorName}</td>
                            <td className="p-3 border-b border-gray-200 text-center">{(item as GoodsInItem).visitorContact}</td>
                            <td className="p-3 border-b border-gray-200 text-center">{(item as GoodsInItem).quantity}</td>
                            <td className="p-3 border-b border-gray-200 text-center">{(item as GoodsInItem).status}</td>
                          </>
                        )}

                        {/* Goods Out Data */}
                        {activeSubTab === "Goods Out" && (
                          <>
                            <td className="p-3 border-b border-gray-200 text-center">{(item as GoodsOutItem).ownerName}</td>
                            <td className="p-3 border-b border-gray-200 text-center">{(item as GoodsOutItem).ownerContact}</td>
                            <td className="p-3 border-b border-gray-200 text-center">{(item as GoodsOutItem).quantity}</td>
                            <td className="p-3 border-b border-gray-200 text-center">{(item as GoodsOutItem).status}</td>
                          </>
                        )}

                        {/* Delivery Package Data */}
                        {activeSubTab === "Delivery Package" && (
                          <>
                            <td className="p-3 border-b border-gray-200 text-center">{(item as DeliveryPackageItem).partnerName}</td>
                            <td className="p-3 border-b border-gray-200 text-center">{(item as DeliveryPackageItem).partnerContact}</td>
                            <td className="p-3 border-b border-gray-200 text-center">{(item as DeliveryPackageItem).lockerNumber}</td>
                            <td className="p-3 border-b border-gray-200 text-center">{(item as DeliveryPackageItem).status}</td>
                          </>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-4">
                        <NoDataFound />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        content={
          activeSubTab === "Goods In" ? (
            <GoodsInForm 
              ref={goodsInFormRef} 
              initialValues={editingItem}
            />
          ) : activeSubTab === "Goods Out" ? (
            <GoodsOutForm 
              ref={goodsOutFormRef} 
              initialValues={editingItem}
            />
          ) : activeSubTab === "Delivery Package" && deliverySubTab === "Package Delivery" ? (
            <PackageDeliveryForm 
              ref={packageDeliveryFormRef} 
              initialValues={editingItem}
            />
          ) : activeSubTab === "Delivery Package" && deliverySubTab === "Package Drop-Off for Collection" ? (
            <PackageDropOffForm 
              ref={packageDropOffFormRef} 
              initialValues={editingItem}
            />
          ) : null
        }
        onConfirm={handleSubmit}
        confirmText="Submit"
        confirmButtonClassName="bg-[#7991BB] text-center text-white rounded hover:bg-[#6a82b0] py-2"
        width="max-w-4xl"
        showDivider={false}
      />
    </div>
  );
};

export default Goods;