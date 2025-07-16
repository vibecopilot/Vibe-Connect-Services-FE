import { useState } from "react";
import Tabs from "../components/Tabs";
import FitoutRequest from "../tabs/Fitout/FitoutRequest";
import FitoutDeviations from "../tabs/Fitout/FitoutDeviations";
import FitoutChecklists from "../tabs/Fitout/FitoutChecklists";
import FitoutReports from "../tabs/Fitout/FitoutReports";
import FitoutSetup from "../tabs/Fitout/FitoutSetup";
import Breadcrumb, { type BreadcrumbItem } from "../components/Breadcrumb"; // Added

const Fitout = () => {
  const [activeTab, setActiveTab] = useState<string | number>("Fitout Requests"); // Fixed default

  // Breadcrumb configuration
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Setup", href: "#" },
    { label: "Fitout", href: "#" }
  ];

  const tabLabels = [
    "Fitout Requests", "Fitout Setup", "Fitout Checklists", "Fitout Deviations", "Fitout Reports"
  ];

  const tabItems = tabLabels.map(label => ({
    label,
    key: label
  }));

  const renderTabComponent = (tab: string | number) => {
    switch (tab) {
      case 'Fitout Requests':
        return <FitoutRequest />;
      case 'Fitout Deviations':
        return <FitoutDeviations />;
      case 'Fitout Checklists':
        return <FitoutChecklists />;
      case 'Fitout Reports':
        return <FitoutReports />;
      case 'Fitout Setup':
        return <FitoutSetup />;
      default:
        return <div>No content available for {tab}</div>;
    }
  };

  // Breadcrumb click handler
  const handleBreadcrumbClick = (item: BreadcrumbItem) => {
    console.log("Navigating to:", item.href);
  };

  return (
    <div className="flex flex-col p-4"> {/* Added container styling */}
      <Breadcrumb 
        items={breadcrumbItems} 
        current="Fitout" 
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

export default Fitout;