import React, { useState } from 'react';
import TextInput from '../components/TextInput';
import DropdownMenu from '../components/DropdownMenu';

interface Props {
  onSubmit: (data: { level: string; days: number; user: string }) => void;
  onCancel: () => void;
  users: string[];
}

const AddEscalation: React.FC<Props> = ({ onSubmit, onCancel, users }) => {
  const [level, setLevel] = useState('');
  const [user, setUser] = useState('');
  const [days, setDays] = useState('');
  const [levelMenuOpen, setLevelMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleSubmit = () => {
    if (level && days && user) {
      onSubmit({ level, days: parseInt(days), user });
    } else {
      alert('Please fill all fields.');
    }
  };

  const levelOptions = ['L1', 'L2', 'L3'].map((lvl) => ({
    label: lvl,
    onClick: () => setLevel(lvl),
  }));

  const userOptions = users.map((u) => ({
    label: u,
    onClick: () => setUser(u),
  }));

  return (
    <div className=" flex flex-wrap items-center gap-4  p-4 rounded  text-gray-700 bg-gray-50" style={{ fontFamily: "'PT Sans', sans-serif" }}>
      {/* Level Dropdown */}
      <div>
        {/* <label className="block text-sm mb-1">Level</label> */}
        <DropdownMenu
          items={levelOptions}
          trigger={
            <div className="w-[350px] border border-gray-300 rounded px-3 py-2">
              {level || 'Select Level'}
            </div>
          }
          open={levelMenuOpen}
          onToggle={setLevelMenuOpen}
        />
      </div>

      {/* Escalation In Days (TextInput) */}
      <div className="w-[350px] mt-3" >
        <TextInput
          name="days"
          type="text"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          placeholder="Enter number"
          
        />
      </div>

      {/* User Dropdown */}
      <div>
        {/* <label className="block text-sm mb-1">User</label> */}
        <DropdownMenu
          items={userOptions}
          trigger={
            <div className="border border-gray-300 rounded w-[350px] px-3 py-2">
              {user || 'Select User'}
            </div>
          }
          open={userMenuOpen}
          onToggle={setUserMenuOpen}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-4 sm:mt-0">
        <button
          className="bg-green-500 text-white px-4  py-2 rounded hover:bg-green-600"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddEscalation;
