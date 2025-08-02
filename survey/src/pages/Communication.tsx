import { useState } from "react";
import Tabs from '../components/Tabs';
import Broadcast from "../tabs/Communication/Broadcast";
import Events from "../tabs/Communication/Events";
import Forum from "../tabs/Communication/Forum";
import Groups from "../tabs/Communication/Groups";
import Survey from "../tabs/Communication/Survey";

const Communication = () => {
  const [activeTab, setActiveTab] = useState<string | number>("Events");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const tabLabels = [
    'Broadcast',
    'Events',
    'Forum',
    'Groups',
    'Survey/Polls'
  ]
  const formatLabel = (label: string) =>
    label.replace(/([a-z])([A-Z])/g, '$1 $2');

  const tabItems = tabLabels.map(label => ({
    label: formatLabel(label), 
    key: label
  }));

  const renderTabComponent = (tab: string | number) => {
    switch (tab) {
        case 'Broadcast':
            return <Broadcast />;
        case 'Events':
            return <Events />;
        case 'Forum':
            return <Forum />;
        case 'Groups':
            return <Groups />;
        case 'Survey/Polls':
            return <Survey onModalStateChange={setIsModalOpen} />;
        default:
            return <div>No content available for {tab}</div>;
    }
  }

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

export default Communication;