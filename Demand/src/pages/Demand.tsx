import React, { useState, useEffect } from 'react';
import Tabs from '../components/Tabs';
import ManageBooking from '../tabs/Managebooking';
import Setup from '../tabs/Setup/Setup';
import Schedule from '../tabs/Schedule';
import AssignAndEscalation from '../tabs/Assignandescalation';
import SetRules from '../tabs/Setrules';

const Demand = () => {
  const [activeTab, setActiveTab] = useState<string | number>('Manage Booking');
  const [categories, setCategories] = useState<string[]>([]);
  const [subCategories, setSubCategories] = useState<string[]>([]);

  // Static data or fetch from API if needed
  useEffect(() => {
    setCategories(['Cleaning', 'Plumbing', 'Electrical']);
    setSubCategories(['Kitchen', 'Bathroom', 'Living Room']);
  }, []);

  const demandTabs = [
    { label: 'Manage Booking', key: 'Manage Booking' },
    { label: 'Setup', key: 'Setup' },
    { label: 'Schedule', key: 'Schedule' },
    { label: 'Assign & Escalation Setup', key: 'Assign & Escalation Setup' },
    { label: 'Set Rules', key: 'Set Rules' },
  ];

  const renderTabContent = (key: string | number): React.ReactNode => {
    if (typeof key !== 'string') return null;

    switch (key) {
      case 'Manage Booking':
        return <ManageBooking />;
      case 'Setup':
        return <Setup />;
      case 'Schedule':
        return (
          <Schedule
            categories={categories}
            subCategories={subCategories}
          />
        );
      case 'Assign & Escalation Setup':
        return <AssignAndEscalation />;
      case 'Set Rules':
        return <SetRules />;
      default:
        return null;
    }
  };

  return (
    <div
      className="p-4 mt-13 w-330 ml-30"
      style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }}
    >
      <Tabs
        tabs={demandTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        renderContent={renderTabContent}
        orientation="horizontal"
      />
    </div>
  );
};

export default Demand;
