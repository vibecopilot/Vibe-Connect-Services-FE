import React, { useState } from 'react';
import Tabs from '../../components/Tabs';
import Phase from './Phase'; 
import Category from './Category'
import Status from './Status'
import FitoutGuide from './Fitoutguide'
import Deviation from './Deviation'


const setupTabs = [
  { label: 'Phase', key: 'phase' },
  { label: 'Category', key: 'category' },
  { label: 'Status', key: 'status' },
  { label: 'Fitout Guide', key: 'guide' },
  { label: 'Deviations Status', key: 'deviations' },
];

const FitoutSetup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | number>('phase');

  const renderTabContent = (key: string | number) => {
    switch (key) {
      case 'phase':
        return <Phase />;
      case 'category':
        return <Category />
      case 'status':
        return <Status />
      case 'guide':
        return <FitoutGuide />
      case 'deviations':
        return <Deviation />
      default:
        return null;
    }
  };

  return (
    <Tabs
      tabs={setupTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      renderContent={renderTabContent}
    />
  );
};

export default FitoutSetup;
