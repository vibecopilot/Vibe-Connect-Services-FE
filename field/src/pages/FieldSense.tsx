import { useState } from 'react';
import Tabs from '../components/Tabs';

import AttendanceMe from '../tabs/MyTask/Attendance/Me';
import AttendanceMyTeam from '../tabs/MyTask/Attendance/MyTeam';
import Leave from '../tabs/MyTask/Leave';

import VisitsMe from '../tabs/Activities/Visits/Me';
import VisitsMyTeam from '../tabs/Activities/Visits/MyTeam';
import VisitBeatPlans from '../tabs/Activities/VisitBeatPlans';
import Clients from '../tabs/Activities/Clients';

import Forms from '../tabs/Forms';

import EmployeeMaster from '../tabs/Settings/Workforce/EmployeeMaster';
import Workdays from '../tabs/Settings/WorkSchedule/Workdays';
import Shifts from '../tabs/Settings/WorkSchedule/Shifts';
import Holidays from '../tabs/Settings/WorkSchedule/Holidays';
import Users from '../tabs/Settings/Admin/Users';

import Dashboard from '../tabs/Dashboard';

const FieldSense = () => {
  const [activeMainTab, setActiveMainTab] = useState<string>('MyTask');
  const [activeSubTab, setActiveSubTab] = useState<string>('Attendance');
  const [activeNestedTab, setActiveNestedTab] = useState<string>('Me');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 

  const mainTabs = ['Dashboard', 'MyTask', 'Activities', 'Forms', 'Settings'];

  const subTabsMap: Record<string, string[]> = {
    Dashboard: [], // Dashboard has no sub-tabs
    MyTask: ['Attendance', 'Leave'],
    Activities: ['Visits', 'Visit Beat Plans', 'Clients'],
    Settings: ['Workforce', 'Work Schedule', 'Admin']
  };

  const nestedSubTabsMap: Record<string, string[]> = {
    Attendance: ['Me', 'My Team'],
    Visits: ['Me', 'My Team'],
    Workforce: ['Employee Master'],
    'Work Schedule': ['Work Days', 'Shifts', 'Holidays'],
    Admin: ['Users']
  };

  const renderCurrentContent = () => {
    // Render content for main tabs without sub-tabs
    if (activeMainTab === 'Dashboard') {
      return <Dashboard />;
    }
    if (activeMainTab === 'Forms') {
      return <Forms />;
    }

    // Render content for sub-tabs that do not have nested tabs
    if (subTabsMap[activeMainTab]?.includes(activeSubTab) && (!nestedSubTabsMap[activeSubTab] || nestedSubTabsMap[activeSubTab].length === 0)) {
      switch (activeSubTab) {
        case 'Leave':
          return <Leave onModalStateChange={setIsModalOpen} />;
        case 'Visit Beat Plans':
          return <VisitBeatPlans onModalStateChange={setIsModalOpen}/>;
        case 'Clients':
          return <Clients />;
        // For Settings sub-tabs, they might directly map to components
        case 'Employee Master': // This will be hit if 'Workforce' is the activeSubTab, and 'Employee Master' is the first nested tab
          return <EmployeeMaster  />;
        case 'Work Days':
          return <Workdays />;
        case 'Shifts':
          return <Shifts />;
        case 'Holidays':
          return <Holidays />;
        case 'Users':
          return <Users />;
        default:
          return <div>No content available for {activeSubTab}</div>;
      }
    }

    // Render content for nested sub-tabs
    if (nestedSubTabsMap[activeSubTab] && nestedSubTabsMap[activeSubTab].length > 0) {
      switch (activeNestedTab) {
        case 'Me':
          if (activeSubTab === 'Attendance') return <AttendanceMe onModalStateChange={setIsModalOpen} />;
          if (activeSubTab === 'Visits') return <VisitsMe onModalStateChange={setIsModalOpen}  />;
          break;
        case 'My Team':
          if (activeSubTab === 'Attendance') return <AttendanceMyTeam onModalStateChange={setIsModalOpen} />;
          if (activeSubTab === 'Visits') return <VisitsMyTeam onModalStateChange={setIsModalOpen} />;
          break;
        case 'Employee Master':
          if (activeSubTab === 'Workforce') return <EmployeeMaster onModalStateChange={setIsModalOpen} />;
          break;
        case 'Work Days':
          return <Workdays />;
        case 'Shifts':
          return <Shifts />;
        case 'Holidays':
          return <Holidays />;
        case 'Users':
          return <Users onModalStateChange={setIsModalOpen} />;
        default:
          return <div>No content available for {activeNestedTab}</div>;
      }
    }

    return <div>Select a tab to view content.</div>;
  };

  return (
    <div className={`flex flex-col gap-0 w-full ${isModalOpen ? 'blur-sm' : ''}` }>
      {/* Main Tabs */}
      <Tabs
        tabs={mainTabs.map(label => ({ label, key: label }))}
        activeTab={activeMainTab}
        onTabChange={(tab) => {
          setActiveMainTab(tab as string);
          const subTabs = subTabsMap[tab as string] || [];
          setActiveSubTab(subTabs[0] || ''); // Set the first sub-tab as active
          setActiveNestedTab(nestedSubTabsMap[subTabs[0]]?.[0] || ''); // Set the first nested tab of the first sub-tab
        }}
        orientation="horizontal"
      />

      {/* Sub Tabs */}
      {subTabsMap[activeMainTab] && subTabsMap[activeMainTab].length > 0 && (
        <div className="w-full -mb-4 -mt-4">
          <Tabs
            tabs={subTabsMap[activeMainTab].map(label => ({ label, key: label }))}
            activeTab={activeSubTab}
            onTabChange={(tab) => {
              setActiveSubTab(tab as string);
              setActiveNestedTab(nestedSubTabsMap[tab]?.[0] || ''); // Set the first nested tab if exists
            }}
            orientation="horizontal"
          />
        </div>
      )}

      {/* Nested Sub Tabs (if applicable) */}
      {activeSubTab && nestedSubTabsMap[activeSubTab] && nestedSubTabsMap[activeSubTab].length > 0 && (
        <div className="w-full">
          <Tabs
            tabs={nestedSubTabsMap[activeSubTab].map(label => ({ label, key: label }))}
            activeTab={activeNestedTab}
            onTabChange={(tab) => setActiveNestedTab(tab as string)}
            orientation="horizontal"
          />
        </div>
      )}

      {/* Content Area */}
      <div className="-mt-5">
        {renderCurrentContent()}
      </div>
    </div>
  );
};

export default FieldSense;