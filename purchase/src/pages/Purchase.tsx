import { useState } from 'react';
import Tabs from '../components/Tabs';

import MaterialTypes from '../tabs/Purchase/Master/MaterialTypes';
import MaterialSubTypes from '../tabs/Purchase/Master/MaterialSubTypes';
import MaterialBrands from '../tabs/Purchase/Master/MaterialBrands';
import GenericInfos from '../tabs/Purchase/Master/GenericInfos';
import ColourMaster from '../tabs/Purchase/Master/ColourMaster';
import BudgetTypes from '../tabs/Purchase/Master/BudgetTypes';
import Material from '../tabs/Purchase/Master/Material';
import MajorMaterials from '../tabs/Purchase/Master/MajorMaterials';
import UserMaterialTypeMapping from '../tabs/Purchase/Master/UserMaterialTypeMapping';
import MaterialThreshold from '../tabs/Purchase/Master/MaterialThreshold';

import PurchaseForm from '../tabs/Purchase/Template/PurchaseForm';
import ProcurementTemplate from '../tabs/Purchase/Template/ProcurementTemplate';

import ProcurementSettings from '../tabs/Purchase/Settings/ProcurementSettings';
import MORDynamicFields from '../tabs/Purchase/Settings/MORDynamicFields';

const Purchase = () => {
  const [activeMainTab, setActiveMainTab] = useState<string>('Master');
  const [activeSubTab, setActiveSubTab] = useState<string>('MaterialTypes');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const mainTabs = ['Master', 'Template', 'Settings'];

  const subTabsMap: Record<string, string[]> = {
    Master: [
      'MaterialTypes', 'MaterialSubTypes', 'MaterialBrands', 'GenericInfos',
      'ColourMaster', 'BudgetTypes', 'Material', 'MajorMaterials',
      'UserMaterialTypeMapping', 'MaterialThreshold',
    ],
    Template: ['PurchaseForm', 'ProcurementTemplate'],
    Settings: ['ProcurementSettings', 'MORDynamicFields'],
  };

  const prettyTabLabels: Record<string, string> = {
    MaterialTypes: 'Material<br />Types',
    MaterialSubTypes: 'Material<br />Sub Types',
    MaterialBrands: 'Material<br />Brands',
    GenericInfos: 'Generic<br />Infos',
    ColourMaster: 'Colour<br />Master',
    BudgetTypes: 'Budget<br />Types',
    Material: 'Material',
    MajorMaterials: 'Major<br />Materials',
    UserMaterialTypeMapping: 'User & Manual<br />Type Mapping',
    MaterialThreshold: 'Material<br />Threshold',
    PurchaseForm: 'Purchase<br />Form',
    ProcurementTemplate: 'Procurement<br />Template',
    ProcurementSettings: 'Procurement<br />Settings',
    MORDynamicFields: 'MOR<br />Dynamic Fields',
  };

  const renderSubTabComponent = (tab: string) => {
    switch (tab) {
      case 'MaterialTypes':
        return <MaterialTypes onModalStateChange={setIsModalOpen} />;
      case 'MaterialSubTypes':
        return <MaterialSubTypes onModalStateChange={setIsModalOpen} />;
      case 'MaterialBrands':
        return <MaterialBrands onModalStateChange={setIsModalOpen} />;
      case 'GenericInfos':
        return <GenericInfos onModalStateChange={setIsModalOpen} />;
      case 'ColourMaster':
        return <ColourMaster onModalStateChange={setIsModalOpen} />;
      case 'BudgetTypes':
        return <BudgetTypes onModalStateChange={setIsModalOpen} />;
      case 'Material':
        return <Material onModalStateChange={setIsModalOpen} />;
      case 'MajorMaterials':
        return <MajorMaterials onModalStateChange={setIsModalOpen} />;
      case 'UserMaterialTypeMapping':
        return <UserMaterialTypeMapping onModalStateChange={setIsModalOpen} />;
      case 'MaterialThreshold':
        return <MaterialThreshold onModalStateChange={setIsModalOpen} />;
      case 'PurchaseForm':
        return <PurchaseForm onModalStateChange={setIsModalOpen} />;
      case 'ProcurementTemplate':
        return <ProcurementTemplate onModalStateChange={setIsModalOpen} />;
      case 'ProcurementSettings':
        return <ProcurementSettings onModalStateChange={setIsModalOpen} />;
      case 'MORDynamicFields':
        return <MORDynamicFields onModalStateChange={setIsModalOpen} />;
      default:
        return <div>No content available for {tab}</div>;
    }
  };

  return (
    <div className={`flex flex-col gap-1 w-full ${isModalOpen ? 'blur-sm' : ''}`}>
      {/* Main Tabs */}
      <Tabs
        tabs={mainTabs.map(label => ({ label, key: label }))}
        activeTab={activeMainTab}
        onTabChange={(tab) => {
          setActiveMainTab(tab as string);
          setActiveSubTab(subTabsMap[tab as string][0]);
        }}
        orientation="horizontal"
      />

      {/* Sub Tabs */}
      <Tabs
        tabs={subTabsMap[activeMainTab].map(label => ({
          label: <span dangerouslySetInnerHTML={{ __html: prettyTabLabels[label] || label }} />,
          key: label
        }))}
        activeTab={activeSubTab}
        onTabChange={(tab) => setActiveSubTab(tab as string)}
        renderContent={renderSubTabComponent}
        orientation="horizontal"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
      />
    </div>
  );
};

export default Purchase;