import React, { useState } from 'react';
import { Card } from '../components/Card';
import TopHead from '../components/TopHead';
import IconButton from '../components/IconButton';
import { FiEdit } from 'react-icons/fi';

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

type ScheduleProps = {
  categories: string[];
  subCategories: string[];
};

const Schedule: React.FC<ScheduleProps> = ({ categories, subCategories }) => {
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [flatType, setFlatType] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 1, 1, 1, 1, 1, 0]);
  const [data, setData] = useState<any[]>([]);

  const handleDayToggle = (idx: number) => {
    setSelectedDays(prev =>
      prev.map((val, i) => (i === idx ? (val ? 0 : 1) : val))
    );
  };

  const handleAdd = () => {
    if (category && subCategory && flatType && startTime && endTime) {
      setData([
        ...data,
        {
          flatType,
          category,
          subCategory,
          startTime,
          endTime,
          days: [...selectedDays],
        },
      ]);
      setCategory('');
      setSubCategory('');
      setFlatType('');
      setStartTime('');
      setEndTime('');
      setSelectedDays([1, 1, 1, 1, 1, 1, 0]);
    }
  };

  const columns = [
    { label: 'Action', align: 'left' as const },
    { label: 'Flat Type', align: 'left' as const },
    { label: 'Category', align: 'left' as const },
    { label: 'Sub Category', align: 'left' as const },
    { label: 'Start Time', align: 'left' as const },
    { label: 'End Time', align: 'left' as const },
    ...days.map(day => ({ label: day, align: 'left' as const })),
  ];

  return (
    <Card className="p-4">
      {/* Input Row */}
      <div className="flex gap-2 mb-2">
        <select
          className="border rounded px-2 py-1 text-sm"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={subCategory}
          onChange={e => setSubCategory(e.target.value)}
        >
          <option value="">Select Sub Category</option>
          {subCategories.map(sub => (
            <option key={sub} value={sub}>{sub}</option>
          ))}
        </select>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={flatType}
          onChange={e => setFlatType(e.target.value)}
        >
          <option value="">Select Flat Type</option>
          <option value="1BHK">1BHK</option>
          {/* Add more options as needed */}
        </select>
        <button
          className="bg-[#7991BB] px-4 py-2 rounded text-white"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
      {/* Time and Days Row */}
      <div className="flex gap-2 mb-2">
        <input
          className="border rounded px-2 py-1 text-sm"
          placeholder="Start Time"
          value={startTime}
          onChange={e => setStartTime(e.target.value)}
        />
        <input
          className="border rounded px-2 py-1 text-sm"
          placeholder="End Time"
          value={endTime}
          onChange={e => setEndTime(e.target.value)}
        />
        {days.map((day, idx) => (
          <button
            key={day + idx}
            className={`w-8 h-8 rounded border ${selectedDays[idx] ? 'bg-gray-200' : 'bg-white'} ${day === 'S' && idx >= 5 ? 'text-red-500' : ''}`}
            onClick={() => handleDayToggle(idx)}
            type="button"
          >
            {day}
          </button>
        ))}
        <button
          className="bg-gray-200 px-2 py-1 rounded border border-gray-300 hover:bg-blue-500 hover:text-white transition"
          // This "+" button can be used for additional logic if needed
        >
          +
        </button>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-gray text-sm">
          <TopHead columns={columns} />
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-8">
                  No Data Found
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-2 py-1">
                    <IconButton tooltip="Edit">
                      <FiEdit size={16} />
                    </IconButton>
                  </td>
                  <td className="px-2 py-1">{row.flatType}</td>
                  <td className="px-2 py-1">{row.category}</td>
                  <td className="px-2 py-1">{row.subCategory}</td>
                  <td className="px-2 py-1">{row.startTime}</td>
                  <td className="px-2 py-1">{row.endTime}</td>
                  {row.days.map((val: number, i: number) => (
                    <td key={i} className={`px-2 py-1 ${days[i] === 'S' && i >= 5 ? 'text-red-500' : ''}`}>
                      {val}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default Schedule;
