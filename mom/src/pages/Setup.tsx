import { useState } from 'react';
import Tabs from '../components/Tabs';
import MOMList from '../tabs/Setup/MOMList';

const Setup = () => {
  const [activeTab, setActiveTab] = useState<string | number>("MOM List");

  const tabLabels = ["MOM List"];

  const formatLabel = (label: string) =>
    label.replace(/([a-z])([A-Z])/g, '$1 $2'); // e.g., MOMList → MOM List

  const tabItems = tabLabels.map(label => ({
    label: formatLabel(label),
    key: label
  }));

  const renderTabComponent = (tab: string | number) => {
    switch (tab) {
      case 'MOM List':
        return <MOMList />;
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

export default Setup;
