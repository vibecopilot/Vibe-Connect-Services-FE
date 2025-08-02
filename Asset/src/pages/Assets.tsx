import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Tabs from "../components/Tabs";
import AssetsTab from "../tabs/Assetmanagement/AssetsList";

import AMCTab from "../tabs/Assetmanagement/Amctab";
import ChecklistTab from "../tabs/Assetmanagement/Checklist";
import PPMTab from "../tabs/Assetmanagement/PPM/Ppm";
import StockItemsTab from "../tabs/Assetmanagement/Stock/Stockitems";

type TabType = "Assets" | "AMC" | "Checklist" | "PPM" | "Stock Items";

const Assets = () => {
   const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("Assets");

  const tabLabels: TabType[] = ["Assets", "AMC", "Checklist", "PPM", "Stock Items"];

  const tabItems = tabLabels.map((label) => ({
    label,
    key: label,
  }));


  
  // 🌐 Handle tab based on URL query or hash
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get("tab");
    if (tabParam && tabLabels.includes(tabParam as TabType)) {
      setActiveTab(tabParam as TabType);
    }
  }, [location.search]);
  // Wrap setActiveTab to accept string|number and narrow it
  const handleTabChange = (key: string | number) => {
    if (typeof key === "string" && tabLabels.includes(key as TabType)) {
      setActiveTab(key as TabType);
    } else {
      console.warn("Invalid tab key:", key);
    }
  };

  // renderContent must accept string|number and narrow it internally
  const renderTabComponent = (tab: string | number) => {
    if (typeof tab !== "string" || !tabLabels.includes(tab as TabType)) {
      return <div>No content available for {tab}</div>;
    }

    switch (tab as TabType) {
      case "Assets":
        return <AssetsTab />;
      case "AMC":
        return <AMCTab />;
      case "Checklist":
        return <ChecklistTab />;
      case "PPM":
        return <PPMTab />;
      case "Stock Items":
        return <StockItemsTab />;
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

export default Assets;
