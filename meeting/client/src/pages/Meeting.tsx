import { useState } from "react";
import Tabs from "../components/Tabs";
import Mymeetings from "../tabs/Meetings/Mymeetings";
import Allmeetings from "../tabs/Meetings/Allmeetings";
import Playlist from "../tabs/Meetings/Playlist";
import Breadcrumb, { type BreadcrumbItem } from "../components/Breadcrumb";

const Meeting = () => {
  const [activeTab, setActiveTab] = useState<string | number>("My Meetings");

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Setup", href: "#" },
    { label: "Meetings", href: "#" }
  ];

  const tabLabels = ["My Meetings", "All Meetings", "Playlist"];

  const tabItems = tabLabels.map(label => ({
    label,
    key: label
  }));

  const renderTabComponent = (tab: string | number) => {
    switch(tab) {
      case 'My Meetings':
        return <Mymeetings />;
      case 'All Meetings':
        return <Allmeetings />;
      case 'Playlist':
        return <Playlist />;
      default:
        return <div>No content available for {tab}</div>;
    }
  };

  const handleBreadcrumbClick = (item: BreadcrumbItem) => {
    console.log("Navigating to:", item.href);
  };

  return (
    <div className="flex flex-col p-4">
      <Breadcrumb 
        items={breadcrumbItems} 
        current="Meetings" 
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

export default Meeting;