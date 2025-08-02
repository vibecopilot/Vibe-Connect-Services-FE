import { useState } from 'react';
import Tabs from '../components/Tabs';
import PermitType from '../tabs/Permit/PermitType';
import PermitActivity from '../tabs/Permit/PermitActivity';
import PermitSubActivity from '../tabs/Permit/PermitSubActivity';
import PermitHazardCategory from '../tabs/Permit/PermitHazardCategory';
import PermitRisk from '../tabs/Permit/PermitRisk';
import PermitSafetyEquipment from '../tabs/Permit/PermitSafetyEquipment';
import PermitEntity from '../tabs/Permit/PermitEntity';

const Permit = () => {
  const [activeTab, setActiveTab] = useState<string | number>("PermitType");

  const tabLabels = [
    "PermitType",
    "PermitActivity",
    "PermitSubActivity",
    "PermitHazardCategory",
    "PermitRisk",
    "PermitSafetyEquipment",
    "PermitEntity"
  ];

  const formatLabel = (label: string) =>
    label.replace(/([a-z])([A-Z])/g, '$1 $2'); // 👈 Adds space before caps

  const tabItems = tabLabels.map(label => ({
    label: formatLabel(label), // e.g., "PermitType" → "Permit Type"
    key: label
  }));

  const renderTabComponent = (tab: string | number) => {
    switch (tab) {
      case 'PermitType':
        return <PermitType />;
      case 'PermitActivity':
        return <PermitActivity />;
      case 'PermitSubActivity':
        return <PermitSubActivity />;
      case 'PermitHazardCategory':
        return <PermitHazardCategory />;
      case 'PermitRisk':
        return <PermitRisk />;
      case 'PermitSafetyEquipment':
        return <PermitSafetyEquipment />;
      case 'PermitEntity':
        return <PermitEntity />;
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

export default Permit;
