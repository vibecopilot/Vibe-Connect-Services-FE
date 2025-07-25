import { useState } from 'react';
import Tabs from '../components/Tabs';

import ServiceCategoryInfo from '../tabs/Convenience/ServiceCategoryInfo';
import VendorSetup from '../tabs/Convenience/VendorSetup';
import Pricing from '../tabs/Convenience/Pricing';
import Slots from '../tabs/Convenience/Slots';

const Convenience = () => {
  const [activeTab, setActiveTab] = useState<string>('ServiceCategoryInfo');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const tabs = ['ServiceCategoryInfo', 'VendorSetup', 'Pricing', 'Slots'];

  const prettyTabLabels: Record<string, string> = {
    ServiceCategoryInfo: 'Service Category Info',
    VendorSetup: 'Vendor Setup',
    Pricing: 'Pricing',
    Slots: 'Slots',
  };

  const renderTabComponent = (tab: string) => {
    switch (tab) {
      case 'ServiceCategoryInfo':
        return <ServiceCategoryInfo onModalStateChange={setIsModalOpen} />;
      case 'VendorSetup':
        return <VendorSetup onModalStateChange={setIsModalOpen} />;
      case 'Pricing':
        return <Pricing onModalStateChange={setIsModalOpen} />;
      case 'Slots':
        return <Slots onModalStateChange={setIsModalOpen} />;
      default:
        return <div>No content available for {tab}</div>;
    }
  };

  return (
    <div className={`flex flex-col gap-1 w-full ${isModalOpen ? 'blur-sm' : ''}`}>
      <Tabs
        tabs={tabs.map(label => ({
          label: <span dangerouslySetInnerHTML={{ __html: prettyTabLabels[label] || label }} />,
          key: label,
        }))}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as string)}
        renderContent={renderTabComponent}
        orientation="horizontal"
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      />
    </div>
  );
};

export default Convenience;
