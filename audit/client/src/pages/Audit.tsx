import { useState } from "react";
import Tabs from "../components/Tabs";
import Operational from "../tabs/Audit/Operational";
import Vendor from "../tabs/Audit/Vendor";
import Breadcrumb, { type BreadcrumbItem } from "../components/Breadcrumb"; // Added import

const Audit = () => {
  const [activeTab, setActiveTab] = useState<string | number>("Operational");

  // Breadcrumb configuration
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Setup", href: "#" },
    { label: "Audit", href: "#" }
  ];

  const tabLabels = ["Operational", "Vendor"];

  const tabItems = tabLabels.map(label => ({
    label,
    key: label
  }));

  const renderTabComponent = (tab: string | number) => {
    switch (tab) {
      case "Operational":
        return <Operational />;
      case "Vendor":
        return <Vendor />;
      default:
        return <div>No content available for {tab}</div>;
    }
  };

  // Added click handler
  const handleBreadcrumbClick = (item: BreadcrumbItem) => {
    console.log("Navigating to:", item.href);
    // Add actual navigation logic here
  };

  return (
    <div className="flex flex-col p-4"> {/* Added container styling */}
      <Breadcrumb 
        items={breadcrumbItems} 
        current="Audit" 
        onClick={handleBreadcrumbClick} 
      />
      
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

export default Audit;