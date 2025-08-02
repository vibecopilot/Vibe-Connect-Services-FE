import { useState } from 'react';
import Tabs from '../components/Tabs';

// Course tabs
import AllCourses from '../tabs/SkillGrow/Courses/AllCourses';
import ApprovedCourses from '../tabs/SkillGrow/Courses/ApprovedCourses';
import PendingCourses from '../tabs/SkillGrow/Courses/PendingCourses';
import RejectedCourses from '../tabs/SkillGrow/Courses/RejectedCourses';

// Project tabs
import AllProject from '../tabs/SkillGrow/Project/AllProject';
import ApprovedProject from '../tabs/SkillGrow/Project/ApprovedProject';
import PendingProject from '../tabs/SkillGrow/Project/PendingProject';
import RejectedProject from '../tabs/SkillGrow/Project/RejectedProject';

// Standalone tabs
import Dashboard from '../tabs/SkillGrow/Dashboard';
import Employee from '../tabs/SkillGrow/Employee';
import Instructor from '../tabs/SkillGrow/Instructor';

const SkillGrow = () => {
  const [activeMainTab, setActiveMainTab] = useState<string>('Courses');
  const [activeSubTab, setActiveSubTab] = useState<string>('AllCourses');

  const mainTabs = ['Courses', 'Project', 'Employee', 'Instructor', 'Dashboard'];

  const subTabsMap: Record<string, string[]> = {
    Courses: ['AllCourses', 'ApprovedCourses', 'PendingCourses', 'RejectedCourses'],
    Project: ['AllProject', 'ApprovedProject', 'PendingProject', 'RejectedProject'],
  };

  const prettyTabLabels: Record<string, string> = {
    AllCourses: 'All Courses',
    ApprovedCourses: 'Approved Courses',
    PendingCourses: 'Pending Courses',
    RejectedCourses: 'Rejected Courses',
    AllProject: 'All Project',
    ApprovedProject: 'Approved Project',
    PendingProject: 'Pending Project',
    RejectedProject: 'Rejected Project',
  };

  const renderSubTabComponent = (tab: string) => {
    switch (tab) {
      case 'AllCourses':
        return <AllCourses />;
      case 'ApprovedCourses':
        return <ApprovedCourses />;
      case 'PendingCourses':
        return <PendingCourses />;
      case 'RejectedCourses':
        return <RejectedCourses />;
      case 'AllProject':
        return <AllProject />;
      case 'ApprovedProject':
        return <ApprovedProject />;
      case 'PendingProject':
        return <PendingProject />;
      case 'RejectedProject':
        return <RejectedProject />;
      default:
        return <div>No content available for {tab}</div>;
    }
  };

  const renderDirectComponent = (tab: string) => {
    switch (tab) {
      case 'Employee':
        return <Employee />;
      case 'Instructor':
        return <Instructor />;
      case 'Dashboard':
        return <Dashboard />;
      default:
        return null;
    }
  };

  const isSingleComponentTab = (tab: string) => ['Employee', 'Instructor', 'Dashboard'].includes(tab);

  return (
    <div className="flex flex-col w-full">
      {/* Main Tabs */}
      <div className='-mb-6'>
        <Tabs
        tabs={mainTabs.map(label => ({ label, key: label }))}
        activeTab={activeMainTab}
        onTabChange={(tab) => {
          setActiveMainTab(tab as string);
          const hasSubTabs = subTabsMap.hasOwnProperty(tab as string);
          if (hasSubTabs) {
            setActiveSubTab(subTabsMap[tab as string][0]);
          }
        }}
        orientation="horizontal"
      />
      </div>

      {/* Sub Tabs + Content */}
      {subTabsMap[activeMainTab] ? (
        <>
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
        </>
      ) : (
        // Direct component rendering for Employee, Instructor, Dashboard
        <div className="mt-4">{renderDirectComponent(activeMainTab)}</div>
      )}
    </div>
  );
};

export default SkillGrow;
