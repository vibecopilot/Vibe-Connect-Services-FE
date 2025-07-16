import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Tabs from "../components/Tabs";
import Service from "../tabs/Service";
import Checklist from "../tabs/Checklist";
import Task from "../tabs/Task";
// import AddServiceForm from "../forms/addserviceform";


type TabType = "Service" | "Checklist" | "Task";

const SoftService = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("Service");

  const tabLabels: TabType[] = ["Service", "Checklist", "Task"];

  const tabItems = tabLabels.map((label) => ({
    label,
    key: label,
  }));

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get("tab");
    if (tabParam && tabLabels.includes(tabParam as TabType)) {
      setActiveTab(tabParam as TabType);
    }
  }, [location.search]);

  const handleTabChange = (key: string | number) => {
    if (typeof key === "string" && tabLabels.includes(key as TabType)) {
      setActiveTab(key as TabType);
    } else {
      console.warn("Invalid tab key:", key);
    }
  };

  const renderTabComponent = (tab: string | number) => {
    if (typeof tab !== "string" || !tabLabels.includes(tab as TabType)) {
      return <div>No content available for {tab}</div>;
    }

    switch (tab as TabType) {
      case "Service":
        return <Service />;
      case "Checklist":
        return <Checklist />;
      case "Task":
        return <Task />;
      default:
        return <div>No content available for {tab}</div>;
    }
  };

  return (
    <div style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }} className="mt-10 w-300 ">

    <Tabs
      tabs={tabItems}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      renderContent={renderTabComponent}
      orientation="horizontal"
    />
    </div>
  );
};

export default SoftService;
