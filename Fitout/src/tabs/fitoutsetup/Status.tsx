import React, { useState, useMemo } from 'react';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import Select from '../../components/Select';
import TopSearch from '../../components/TopSearch';
import AddStatus from '../../forms/Addstatus';
import TableHead from '../../components/TopHead';

interface StatusRow {
  order: number;
  status: string;
  fixedStatus: string;
  colour: string;
}

const Status: React.FC = () => {
  const [status, setStatus] = useState('');
  const [fixedState, setFixedState] = useState('');
  const [color, setColor] = useState('#d4af37');
  const [order, setOrder] = useState<number | string>(0);
  const [showFilters, setShowFilters] = useState(false);

  const [statusList, setStatusList] = useState<StatusRow[]>([
    { order: 0, status: 'Pending', fixedStatus: 'Closed', colour: '#d4af37' }
  ]);

  const [filters, setFilters] = useState({
    order: '',
    status: '',
    fixedStatus: '',
    colour: ''
  });

  const handleAddStatus = () => {
    if (status.trim() && fixedState && order !== '') {
      const newStatus: StatusRow = {
        status,
        fixedStatus: fixedState,
        colour: color,
        order: Number(order),
      };
      setStatusList([...statusList, newStatus].sort((a, b) => a.order - b.order));
      setStatus('');
      setFixedState('');
      setColor('#d4af37');
      setOrder(0);
    }
  };

  const handleUpdateRow = (index: number, field: keyof StatusRow, value: string | number) => {
    const updatedList = [...statusList];
    (updatedList[index] as any)[field] = value;
    setStatusList(updatedList);
  };

  const handleDeleteRow = (index: number) => {
    const updatedList = statusList.filter((_, i) => i !== index);
    setStatusList(updatedList);
  };

  const columns = [
    { label: 'Action', align: 'center' as const },
    { label: 'Order', align: 'center' as const },
    { label: 'Status', align: 'center' as const },
    { label: 'Fixed Status', align: 'center' as const },
    { label: 'Colour', align: 'center' as const }
  ];

  const filteredList = useMemo(() => {
    return statusList.filter((row) =>
      Object.entries(filters).every(([key, value]) => {
        if (!value.trim()) return true;
        return row[key as keyof StatusRow]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      })
    );
  }, [filters, statusList]);

  return (
    <div
      className="flex flex-col gap-4 text-gray-700"
      style={{ fontFamily: "'PT Sans', sans-serif" }}
    >
      {/* TopSearch + Form Row */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <TopSearch
          onSearch={() => setShowFilters((prev) => !prev)}
          buttons={[]}
          onButtonClick={() => {}}
        />

        <TextInput
          label=""
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="Enter Status"
          className="h-10"
        />
        <Select
          label=""
          name="fixedState"
          value={fixedState}
          onChange={(e) => setFixedState(e.target.value)}
          options={['Open', 'Closed', 'Pending']}
          placeholder="Select Fixed State"
          className="h-10"
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-12 h-10 mb-4 border rounded"
        />
        <TextInput
          label=""
          name="order"
          type="number"
          value={String(order)}
          onChange={(e) => setOrder(e.target.value === '' ? '' : Number(e.target.value))}
          placeholder="Order"
          className="h-10"
        />
        <Button className='mb-4 h-10' label="Add" variant="gray-outline" onClick={handleAddStatus} />

        {/* Count display aligned right */}
        <div className="ml-auto text-sm text-gray-500 px-2">
          1–{filteredList.length} of {filteredList.length}
        </div>
      </div>
                           
    
<div className="overflow-x-auto">
  <table className="w-full text-sm text-center">
    {/* Table Head */}
    <TableHead columns={columns} />

    {/* Filter Row */}
    {showFilters && (
      <thead>
        <tr className="bg-gray-50">
          <td className="px-2 py-1" />
          {Object.entries(filters).map(([key, value]) => (
            <td key={key} className="px-2 py-1">
              <TextInput
                name={key}
                label=""
                value={value}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }))
                }
                placeholder="Search"
                className="w-full"
              />
            </td>
          ))}
        </tr>
      </thead>
    )}

    {/* Table Body */}
    <tbody className="bg-white">
      {filteredList.length > 0 ? (
        filteredList.map((row, index) => (
          <AddStatus
            key={index}
            rowData={row}
            onUpdate={(field, value) => handleUpdateRow(index, field, value)}
            onDelete={() => handleDeleteRow(index)}
          />
        ))
      ) : (
        <tr>
          <td colSpan={columns.length} className="py-4 text-gray-400">
            No status found
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
</div>
  );
};

export default Status;
