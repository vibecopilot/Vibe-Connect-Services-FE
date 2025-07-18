import React, { useState } from 'react';
import Tabs from '../components/Tabs';
import FitoutRequest from '../tabs/Fitoutrequest';
import FitoutSetup from '../tabs/fitoutsetup/Fitoutsetup';
import FitoutChecklist from '../tabs/Fitoutchecklist';
import FitoutDeviation from '../tabs/Fitoutdeviation';
import FitoutReport from '../tabs/Fitoutreport';

const fitoutTabs = [
  { label: 'Fitout Requests', key: 'requests' },
  { label: 'Fitout Setup',    key: 'setup' },
  { label: 'Fitout Checklists', key: 'checklists' },
  { label: 'Fitout Deviations', key: 'deviations' },
  { label: 'Fitout Report',     key: 'report' },
];

const Fitout: React.FC = () => {
  // Allow both string | number because Tab keys do
  const [activeTab, setActiveTab] = useState<string | number>('requests');

  // Narrower wrapper matches the prop's exact signature
  const handleTabChange = (key: string | number) => {
    setActiveTab(key);
  };

  const renderTabContent = (key: string | number) => {
    switch (key) {
      case 'requests':   return <FitoutRequest />;
      case 'setup':      return <FitoutSetup />;
      case 'checklists': return <FitoutChecklist />;
      case 'deviations': return <FitoutDeviation id={1} />;
      case 'report':     return <FitoutReport/>;
      default:           return null;
    }
  };

  return (
    <div className='mt-15 w-310 ml-29'  style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }}>
      <Tabs
        tabs={fitoutTabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}  
        renderContent={renderTabContent}
      />
    </div>
  );
};

export default Fitout;
