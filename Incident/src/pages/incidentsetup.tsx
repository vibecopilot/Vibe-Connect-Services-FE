import React, { useState } from 'react';
import Tabs from '../components/Tabs';
import CategoryTab from '../tabs/Category/CategoryTab';
import Incidencestatus from '../tabs/Incidencestatus';
import Incidencelevel from '../tabs/Incidencelevel';
import Escalations from '../tabs/Esacalations';
import Approval from '../tabs/Approval';
import Secondary from '../tabs/Secondary/Secondary';
import Injured from '../tabs/Injured';
import PropertyDamage from '../tabs/PropertyDamage';
import RCA from '../tabs/RCA';
import CAPA from '../tabs/CAPA';

const IncidentSetup = () => {
  const [activeTab, setActiveTab] = useState('Category');

  const mainTabs = [
    { label: 'Category', key: 'Category' },
    { label: 'Incidence status', key: 'Incidence status' },
    { label: 'Incidence level', key: 'Incidence level' },
    { label: 'Escalations', key: 'Escalations' },
    { label: 'Approval setup', key: 'Approval setup' },
    { label: 'Secondary Category', key: 'Secondary Category' },
    { label: 'Who got injured', key: 'Who got injured' },
    { label: 'Property Damage Category', key: 'Property Damage Category' },
    { label: 'RCA Category', key: 'RCA Category' },
    { label: 'CAPA', key: 'CAPA' },
  ];

  const handleMainTabChange = (key: string | number) => {
    if (typeof key === 'string') {
      setActiveTab(key);
    }
  };

  const renderMainTabContent = (tab: string | number) => {
    if (typeof tab !== 'string') return null;

    switch (tab) {
      case 'Category':
        return <CategoryTab />;
      case 'Incidence status':
        return <Incidencestatus />;
      case 'Incidence level':
        return <Incidencelevel />;
      case 'Escalations':
        return <Escalations />;
      case 'Approval setup':
        return <Approval />;
      case 'Secondary Category':
        return <Secondary />;
      case 'Who got injured':
        return <Injured />;
      case 'Property Damage Category':
        return <PropertyDamage />;
      case 'RCA Category':
        return <RCA />;
      case 'CAPA':
        return <CAPA />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 mt-10 w-330 ml-30"  style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }}>
      <Tabs
        tabs={mainTabs}
        activeTab={activeTab}
        onTabChange={handleMainTabChange}
        renderContent={renderMainTabContent}
        orientation="horizontal"
      />
    </div>
  );
};

export default IncidentSetup;
