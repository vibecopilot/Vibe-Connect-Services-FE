// src/tabs/Category/CategoryTab.tsx
import React, { useState } from "react";
import Tabs from "../../components/Tabs";
import CategoryType from "./Categorytype";
import SubCategory from "./SubCategory";
import SubSubCategory from "./Subsubcategory";
import SubSubSubCategory from "./Subsubsubcategory";

const CategoryTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Category Type");

  const subTabs = [
    { label: "Category Type", key: "Category Type" },
    { label: "Sub Category", key: "Sub Category" },
    { label: "Sub Sub Category", key: "Sub Sub Category" },
    { label: "Sub Sub Sub Category", key: "Sub Sub Sub Category" },
  ];

  const renderContent = (tab: string | number) => {
    switch (tab) {
      case "Category Type":
        return <CategoryType />;
      case "Sub Category":
        return <SubCategory />;
      case "Sub Sub Category":
        return <SubSubCategory />;
      case "Sub Sub Sub Category":
        return <SubSubSubCategory />;
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

export default CategoryTab;
