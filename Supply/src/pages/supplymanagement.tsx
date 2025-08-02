import { useState } from "react";
import Tabs from "../components/Tabs";
import VendorInfo from "../tabs/Supply/VendorInfo";
import VendorEmpanelled from "../tabs/Supply/Vendorempanelled";
import InventoryProductSetup from "../tabs/Supply/Inventory";
import BillPayment from "../tabs/Supply/Bill";
import VendorPerformance from "../tabs/Supply/Performance";
import CommunicationPreferences from "../tabs/Supply/Communication";

const SupplyManagement = () => {
  const [activeTab, setActiveTab] = useState<string | number>("Vendor Info");

  const tabLabels = [
    "Vendor Info",
    "Vendor Empanelled",
    "Inventory/Product Setup",
    "Bill Payment",
    "Vendor Performance",
    "Communication Preferences",
  ];

  const tabItems = tabLabels.map(label => ({
    label,
    key: label
  }));

  const renderTabComponent = (tab: string | number) => {
    switch (tab) {
      case "Vendor Info":
        return <VendorInfo />;
      case "Vendor Empanelled":
        return <VendorEmpanelled />;
      case "Inventory/Product Setup":
        return <InventoryProductSetup />;
      case "Bill Payment":
        return <BillPayment />;
      case "Vendor Performance":
        return <VendorPerformance />;
      case "Communication Preferences":
        return <CommunicationPreferences />;
      default:
        return <div>No content available for {tab}</div>;
    }
  };

  return (
    <div style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }} className="mt-15 w-330 ml-30">
      <Tabs 
        tabs={tabItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        renderContent={renderTabComponent}
        orientation="horizontal"
      />
    </div>
  );
};

export default SupplyManagement;