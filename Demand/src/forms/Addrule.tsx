import React, { useState } from 'react';

interface AddRuleProps {
  onAddRule: (rule: {
    category: string;
    subCategory: string;
    status: string;
    level: string;
    escalationTo: string;
    hours: string;
  }) => void;
}

const AddRule: React.FC<AddRuleProps> = ({ onAddRule }) => {
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [status, setStatus] = useState('');
  const [level, setLevel] = useState('');
  const [escalationTo, setEscalationTo] = useState('');
  const [hours, setHours] = useState('');

  const handleAdd = () => {
    if (category && subCategory && status && level && escalationTo && hours) {
      onAddRule({
        category,
        subCategory,
        status,
        level,
        escalationTo,
        hours,
      });
      setCategory('');
      setSubCategory('');
      setStatus('');
      setLevel('');
      setEscalationTo('');
      setHours('');
    }
  };

  return (
    <>
      <div className="flex gap-4 mb-3">
        <select
          className="border rounded px-3 py-2 text-sm min-w-[180px] bg-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Pest Control">Pest Control</option>
        </select>
        <select
          className="border rounded px-3 py-2 text-sm min-w-[260px] bg-white"
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
        >
          <option value="">Select Sub Category</option>
          <option value="4D Cockroach Control-3 Service (AMC)">
            4D Cockroach Control-3 Service (AMC)
          </option>
        </select>
        <select
          className="border rounded px-3 py-2 text-sm min-w-[160px] bg-white"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Status</option>
          <option value="Confirmed">Confirmed</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-1">
        <label className="text-xs text-gray-500">Level</label>
        <label className="text-xs text-gray-500">Escalation To</label>
        <label className="text-xs text-gray-500">Hours</label>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <input
          className="border rounded px-3 py-2 text-sm bg-white"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          placeholder="E1"
        />
        <select
          className="border rounded px-3 py-2 text-sm bg-white"
          value={escalationTo}
          onChange={(e) => setEscalationTo(e.target.value)}
        >
          <option value="">Godrej Living</option>
          <option value="Godrej Living">Godrej Living</option>
        </select>
        <input
          className="border rounded px-3 py-2 text-sm bg-white"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          placeholder="Enter hours"
        />
      </div>

      <div className="flex justify-center mb-6">
        <button
          className="bg-[#7991BB] text-white px-8 py-2 rounded font-medium"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
    </>
  );
};

export default AddRule;
