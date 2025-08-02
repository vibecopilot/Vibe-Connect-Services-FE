import React, { useState, useEffect } from 'react';
import TextInput from '../components/TextInput';
import { FiEye } from 'react-icons/fi';
import Pagination from '../components/Pagination';
import TableHead from '../components/TopHead';
import NoDataFound from '../components/NoDataFound';
import TopSearch from '../components/TopSearch';

const Task = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [filterValues, setFilterValues] = useState({
    serviceName: '',
    checklistName: '',
    status: '',
    assignedTo: '',
    startDate: '',
  });

  const allTasks = [
    { id: 1, serviceName: 'Cobweb', checklistName: 'Checklist', status: 'Pending', assignedTo: 'Akshat Shrawat', startDate: '26/11/2024, 22:13:16' },
    { id: 2, serviceName: 'Cobweb', checklistName: 'Checklist', status: 'Pending', assignedTo: 'Akshat Shrawat', startDate: '15/10/2024, 20:35:00' },
    { id: 3, serviceName: 'Cobweb', checklistName: 'Checklist', status: 'Pending', assignedTo: 'Akshat Shrawat', startDate: '11/10/2024, 23:50:52' },
    { id: 4, serviceName: 'Another Service', checklistName: 'Another Checklist', status: 'Completed', assignedTo: 'John Doe', startDate: '10/11/2024, 10:00:00' },
    { id: 5, serviceName: 'Yet Another', checklistName: 'Some Checklist', status: 'Overdue', assignedTo: 'Jane Smith', startDate: '01/11/2024, 09:00:00' },
  ];

  const [filteredTasks, setFilteredTasks] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(allTasks.length / itemsPerPage);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleFilterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterValues(prev => ({ ...prev, [name]: value }));
  };

  const filterTasks = () => {
    let tasksToFilter = allTasks;

    if (filter !== 'All') {
      tasksToFilter = tasksToFilter.filter(task => task.status === filter);
    }

    tasksToFilter = tasksToFilter.filter(task => {
      return (
        task.serviceName.toLowerCase().includes(filterValues.serviceName.toLowerCase()) &&
        task.checklistName.toLowerCase().includes(filterValues.checklistName.toLowerCase()) &&
        task.status.toLowerCase().includes(filterValues.status.toLowerCase()) &&
        task.assignedTo.toLowerCase().includes(filterValues.assignedTo.toLowerCase()) &&
        task.startDate.toLowerCase().includes(filterValues.startDate.toLowerCase())
      );
    });

    if (searchTerm.trim() !== '') {
      tasksToFilter = tasksToFilter.filter(task =>
        Object.values(task).join(' ').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTasks(tasksToFilter);
  };

  useEffect(() => {
    filterTasks();
  }, [filter, filterValues, searchTerm]);

  const columns = [
    'Action',
    'Service Name',
    'Checklist Name',
    'Status',
    'Assigned to',
    'Start Date',
  ];

  return (
    <div className="w-full px-6 py-4" style={{ fontFamily: "'PT Sans', sans-serif",color: 'gray' }}>
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center h-[40px] mb-[-10px]">
            <TopSearch
              searchActive={showFilterRow}
              onSearchToggle={() => setShowFilterRow(prev => !prev)}
              onButtonClick={() => {}}
              buttons={[]}
            />
          </div>
          <div className="flex items-center space-x-4 border border-gray-300 rounded-md p-2">
            {['All', 'Pending', 'Completed', 'Overdue'].map((status) => (
              <label key={status} className="inline-flex items-center">
                <input
                  type="radio"
                  name="task-filter"
                  value={status}
                  checked={filter === status}
                  onChange={handleFilterChange}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-sm text-gray-700">{status}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Right side: Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={allTasks.length}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <TableHead columns={columns.map(label => ({ label }))} />
          <tbody>
            {showFilterRow && (
              <tr className="bg-gray-50 text-sm">
                <td></td>
                <td><TextInput label="" value={filterValues.serviceName} onChange={handleFilterInputChange} name="serviceName" placeholder="Service Name" /></td>
                <td><TextInput label="" value={filterValues.checklistName} onChange={handleFilterInputChange} name="checklistName" placeholder="Checklist Name" /></td>
                <td><TextInput label="" value={filterValues.status} onChange={handleFilterInputChange} name="status" placeholder="Status" /></td>
                <td><TextInput label="" value={filterValues.assignedTo} onChange={handleFilterInputChange} name="assignedTo" placeholder="Assigned To" /></td>
                <td><TextInput label="" value={filterValues.startDate} onChange={handleFilterInputChange} name="startDate" placeholder="Start Date" /></td>
              </tr>
            )}
            {filteredTasks.length > 0 ? (
              filteredTasks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(task => (
                <tr key={task.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-2 text-left"><FiEye className="cursor-pointer" size={18} title="View" /></td>
                  <td className="p-2 text-left">{task.serviceName}</td>
                  <td className="p-2 text-left">{task.checklistName}</td>
                  <td className="p-2 text-left">{task.status}</td>
                  <td className="p-2 text-left">{task.assignedTo}</td>
                  <td className="p-2 text-left">{task.startDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-6 text-gray-500">
                  <NoDataFound />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Task;
