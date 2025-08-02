import { useState } from 'react';
import Tabs from '../components/Tabs';
import General from '../tabs/Passes/General';
import Parking from '../tabs/Passes/Parking';
import Goods from '../tabs/Passes/Goods';
import Patrolling from '../tabs/Passes/Patrolling';
import SupportStaff from '../tabs/Passes/SupportStaff';
import Breadcrumb, { type BreadcrumbItem } from '../components/Breadcrumb'; // Added

const Passes = () => {
  const [activeTab, setActiveTab] = useState<string | number>("General"); // Fixed default

  // Breadcrumb configuration
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Setup", href: "#" },
    { label: "Passes", href: "#" }
  ];

  const tabLabels = [
    "General", "Parking", "Support Staff", "Patrolling", "Goods IN/OUT"
  ];

  const tabItems = tabLabels.map(label => ({
    label,
    key: label
  }));

  const renderTabComponent = (tab: string | number) => {
    switch (tab) {
      case 'General':
        return <General />;
      case 'Parking':
        return <Parking />;
      case 'Goods IN/OUT':
        return <Goods />;
      case 'Patrolling':
        return <Patrolling />;
      case 'Support Staff':
        return <SupportStaff />;
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
        current="Passes" 
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

export default Passes;