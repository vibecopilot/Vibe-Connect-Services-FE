// src/tabs/Secondary/Secondary.tsx
import React, { useState } from "react";
import Tabs from "../../components/Tabs";
import SecondaryCategoryType from "./Secondarycategorytype";
import SecSubCategoryType from "./Secsubcategory";
import SecSubSubCategoryType from "./Secsubsubcategory";
import SecSubSubSubCategory from "./Secsubsubsubcategory";

const Secondary: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Secondary Category Type");

  const subTabs = [
    { label: "Secondary Category Type", key: "Secondary Category Type" },
    { label: "Sec Sub Category Type", key: "Sec Sub Category Type" },
    { label: "Sec Sub Sub Category Type", key: "Sec Sub Sub Category Type" },
    { label: "Sec Sub Sub Sub Category", key: "Sec Sub Sub Sub Category" },
  ];

  const renderContent = (tab: string | number) => {
    switch (tab) {
      case "Secondary Category Type":
        return <SecondaryCategoryType />;
      case "Sec Sub Category Type":
        return <SecSubCategoryType />;
      case "Sec Sub Sub Category Type":
        return <SecSubSubCategoryType />;
      case "Sec Sub Sub Sub Category":
        return <SecSubSubSubCategory />;
      default:
        return null;
    }
  };

  return (
    <Tabs
      tabs={subTabs}
      activeTab={activeTab}
      onTabChange={(key) => setActiveTab(key as string)}
      renderContent={renderContent}
      orientation="horizontal"
    />
  );
};

export default Secondary;
