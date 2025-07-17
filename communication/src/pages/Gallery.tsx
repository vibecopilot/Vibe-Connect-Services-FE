import { useState } from "react";
import Tabs from "../components/Tabs";
import All from "../tabs/Gallery/All";
import Breadcrumb, { type BreadcrumbItem } from "../components/Breadcrumb"; 

const Gallery = () => {
  const [activeTab, setActiveTab] = useState<string | number>("All"); // Fixed default

  // Breadcrumb configuration
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Setup", href: "#" },
    { label: "Gallery", href: "#" }
  ];

  const tabLabels = ["All", "Images", "Videos"];

  const tabItems = tabLabels.map(label => ({
    label,
    key: label
  }));

  const renderTabComponent = (tab: string | number) => {
    switch (tab) {
      case 'All':
        return <All />;
      // Add other cases when components are available
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
        current="Gallery" 
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

export default Gallery;