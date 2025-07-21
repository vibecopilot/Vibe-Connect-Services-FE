import React, { useState, useMemo } from 'react';
import TopSearch from '../components/TopSearch';
import ToggleSwitch from '../components/ToggleSwitch';
import { FiEye } from 'react-icons/fi';
import AddChecklist from '../forms/Addchecklist';
import ViewChecklist from '../forms/Viewchecklist';
import TopHead from '../components/TopHead';
import TextInput from '../components/TextInput';

interface ChecklistRow {
  id: number;
  name: string;
  status: boolean;
  category: string;
  subcategory: string;
  associations: string;
  questionCount: number;
}

const FitoutChecklist: React.FC = () => {
  const [checklists, setChecklists] = useState<ChecklistRow[]>([
    {
      id: 1,
      name: 'Demo Checklist',
      status: true,
      category: 'Hand Railing',
      subcategory: 'Hand Railing',
      associations: '-',
      questionCount: 2,
    },
  ]);

  const [filters, setFilters] = useState({
    name: '',
    category: '',
    subcategory: '',
    associations: '',
    questionCount: '',
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [viewChecklist, setViewChecklist] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleToggle = (index: number) => {
    setChecklists((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, status: !item.status } : item
      )
    );
  };

  const filteredList = useMemo(() => {
    return checklists.filter((item) =>
      Object.entries(filters).every(([key, value]) => {
        if (!value.trim()) return true;
        const val = (item as any)[key];
        return val.toString().toLowerCase().includes(value.toLowerCase());
      })
    );
  }, [checklists, filters]);

  if (showAddForm) return (
    <AddChecklist
      onBack={() => setShowAddForm(false)}
      onCreated={() => setShowAddForm(false)}
    />
  );
  if (viewChecklist) return <ViewChecklist />;

  const columns = [
    { label: 'Action', align: 'center' as const, className: 'w-12' },
    { label: 'Name', align: 'left' as const },
    { label: 'Status', align: 'center' as const, className: 'w-20' },
    { label: 'Category', align: 'left' as const },
    { label: 'Subcategory', align: 'left' as const },
    { label: 'Associations', align: 'left' as const },
    { label: 'No. of Q.', align: 'center' as const, className: 'w-16' },
  ];

  const categoryOptions = [
    'Civil',
    'Flooring',
    'Door Shutter & Frame',
    'Window Frames/Glass',
    'Wall Dado Tile',
  ];

  return (
    <div className="p-4 flex flex-col gap-4 text-gray-700" style={{ fontFamily: "'PT Sans', sans-serif" }}>
      {/* TopSearch + Button + Pagination */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <TopSearch
          onSearch={() => setShowFilters(prev => !prev)}
          buttons={['Add']}
          onButtonClick={(label) => {
            if (label === 'Add') setShowAddForm(true);
          }}
        />

        <div className="ml-auto text-sm text-gray-500 px-2">
          1–{filteredList.length} of {filteredList.length}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
  <table className="w-full border-collapse text-sm text-center">
    {/* Table Head */}
    <TopHead columns={columns} />

    {/* Filter Row */}
  {/* Filter Row */}
<thead>
  {showFilters && (
    <tr className="bg-gray-50 border-b">
      <td className="px-2 py-1" />
      <td className="px-2 py-1">
        <TextInput
          label=""
          name="name"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          placeholder="Search"
          className="w-full text-left h-9"
        />
      </td>
      <td className="px-2 py-1" />
      <td className="px-2 py-1">
        <TextInput
          label=""
          name="category"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          placeholder="Search"
          className="w-full text-left h-9"
        />
      </td>
      <td className="px-2 py-1">
        <TextInput
          label=""
          name="subcategory"
          value={filters.subcategory}
          onChange={(e) => setFilters({ ...filters, subcategory: e.target.value })}
          placeholder="Search"
          className="w-full text-left h-9"
        />
      </td>
      <td className="px-2 py-1">
        <TextInput
          label=""
          name="associations"
          value={filters.associations}
          onChange={(e) => setFilters({ ...filters, associations: e.target.value })}
          placeholder="Search"
          className="w-full text-left h-9"
        />
      </td>
      <td className="px-2 py-1">
        <TextInput
          label=""
          name="questionCount"
          value={filters.questionCount}
          onChange={(e) => setFilters({ ...filters, questionCount: e.target.value })}
          placeholder="Search"
          className="w-full text-center h-9"
        />
      </td>
    </tr>
  )}
</thead>

{/* Table Body */}
<tbody className="bg-white">
  {filteredList.length > 0 ? (
    filteredList.map((item, idx) => (
      <tr key={item.id} className="hover:bg-gray-50 border-t">
        <td className="px-2 py-2 text-center w-12">
          <FiEye className="cursor-pointer mx-auto" onClick={() => setViewChecklist(true)} />
        </td>
        <td className="px-2 py-2 text-left">{item.name}</td>
        <td className="px-2 py-2 text-center w-20">
          <ToggleSwitch checked={item.status} onChange={() => handleToggle(idx)} />
        </td>
        <td className="px-2 py-2 text-left">{item.category}</td>
        <td className="px-2 py-2 text-left">{item.subcategory}</td>
        <td className="px-2 py-2 text-left">{item.associations}</td>
        <td className="px-2 py-2 text-center w-16">{item.questionCount}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={columns.length} className="py-4 text-gray-400">
        No checklist found
      </td>
    </tr>
  )}
</tbody>

  </table>
</div>
    </div>
  );
};

export default FitoutChecklist;
