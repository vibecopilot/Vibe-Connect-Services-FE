import { useState } from 'react';
import Tabs from '../../components/Tabs';

import ProjectOverview from './ProjectOverview';
import Task from './Task';
import Budget from './Budget';
import Files from './Files';
import Team from './Team';
import Summary from './Summary';

const Overview = () => {
  const [activeTab, setActiveTab] = useState<string | number>('Overview');

  const tabLabels = [
    'Overview',
    'Task',
    'Budget',
    'Files',
    'Team',
    'Summary',
  ];

  const tabItems = tabLabels.map(label => ({
    label,
    key: label,
  }));

  const renderTabComponent = (tab: string | number) => {
    switch (tab) {
      case 'Overview':
        return <ProjectOverview />;
      case 'Task':
        return <Task />;
      case 'Budget':
        return <Budget />;
      case 'Files':
        return <Files />;
      case 'Team':
        return <Team />;
      case 'Summary':
        return <Summary />;
      default:
        return <div>No content available for {tab}</div>;
    }
  };

  return (
    <Tabs
      tabs={tabItems}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      renderContent={renderTabComponent}
      orientation="horizontal"
    />
  );
};

export default Overview;
