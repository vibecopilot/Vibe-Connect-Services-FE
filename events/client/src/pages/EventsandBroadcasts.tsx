import { useState } from "react";
import Tabs from "../components/Tabs";
import Events from "../tabs/EventsandBroadcasts/Events";
import Broadcast from "../tabs/EventsandBroadcasts/Broadcast";
import Groups from "../tabs/EventsandBroadcasts/Groups";
import Breadcrumb, { type BreadcrumbItem } from "../components/Breadcrumb"; 

const EventsandBroadcasts = () => {
  const [activeTab, setActiveTab] = useState<string | number>("Events");

  // Breadcrumb configuration
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Setup", href: "#" },
    { label: "Events & Broadcasts", href: "#" }
  ];

  const tabLabels = [
    "Events", "Broadcasts", "Survey/Polls", "Forum", "Groups"
  ];

  const tabItems = tabLabels.map(label => ({
    label,
    key: label
  }));

  const renderTabComponent = (tab: string | number) => {
    switch (tab) {
      case 'Events':
        return <Events />;
      case 'Broadcasts':
        return <Broadcast />;
      case 'Groups':
        return <Groups />;
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
        current="Events & Broadcasts" 
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

export default EventsandBroadcasts;