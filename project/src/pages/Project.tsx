import { useState } from 'react';
import Tabs from '../components/Tabs';
import Overview from '../tabs/Project/Overview';
import Gantt from '../tabs/Project/Gantt';
import Calendar from '../tabs/Project/Calendar';
import List from '../tabs/Project/List'; 

const Project = () => {
  const [activeTab, setActiveTab] = useState<string | number>("Overview");
  const [showListTab, setShowListTab] = useState(false);

  // Base tabs that are always available
  const baseTabs = [
    "Overview",
    "Gantt",
    "Calendar"
  ];

  // Dynamic tab labels based on whether List tab should be shown
  const tabLabels = showListTab ? [...baseTabs, "List"] : baseTabs;

  const formatLabel = (label: string) =>
    label.replace(/([a-z])([A-Z])/g, '$1 $2');

  const tabItems = tabLabels.map(label => ({
    label: formatLabel(label),
    key: label
  }));

  // Function to handle adding List tab - call this from Overview component
  const handleAddListTab = () => {
    setShowListTab(true);
    setActiveTab("List");
  };

  const renderTabComponent = (tab: string | number) => {
    switch (tab) {
      case 'Overview':
        return <Overview onAddListTab={handleAddListTab} />;
      case 'Gantt':
        return <Gantt />;
      case 'Calendar':
        return <Calendar />;
      case 'List':
        return <List />;
      default:
        return <div>No content available for {tab}</div>;
    }
  };

  return (
    <>
      <Tabs
        tabs={tabItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        renderContent={renderTabComponent}
        orientation="horizontal"
      />
    </>
  );
};

export default Project;