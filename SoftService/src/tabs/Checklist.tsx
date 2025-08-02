import React, { useState, useEffect } from 'react';
import {  FiEdit, FiEye, FiPlus, FiDownload } from 'react-icons/fi';
import { TbQrcode } from 'react-icons/tb';
import NoDataFound from '../components/NoDataFound';
import TableHead from '../components/TopHead';

import IconButton from '../components/IconButton';
import { useNavigate } from 'react-router-dom';
import AssociationForm from '../forms/associationform';
import TextInput from '../components/TextInput';
import TopSearch from '../components/TopSearch';
import EditFormChecklist from '../forms/editformchecklist';
import ViewFormChecklist from '../forms/viewformchecklist';

const PAGE_SIZE = 10;

const checklistData = [
  {
    name: 'Checklist',
    startDate: '26/11/2024',
    endDate: '26/11/2024',
    group: 2,
    frequency: 'Daily',
    priorityLevel: 'High',
    associations: 'Associations',
    id: 1,
  },
  {
    name: 'User',
    startDate: '15/10/2024',
    endDate: '15/10/2024',
    group: 2,
    frequency: 'Half Yearly',
    priorityLevel: 'Medium',
    associations: 'Associations',
    id: 2,
  },
  {
    name: 'Test',
    startDate: '11/10/2024',
    endDate: '11/10/2024',
    group: 2,
    frequency: 'Daily',
    priorityLevel: 'Akshat Shrawat',
    associations: 'Associations',
    id: 3,
  },
];

const Checklist = () => {
  const navigate = useNavigate();
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [filterValues, setFilterValues] = useState({
    name: '',
    startDate: '',
    endDate: '',
    group: '',
    frequency: '',
    priorityLevel: '',
  });
  const [page, setPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAssociateView, setShowAssociateView] = useState(false);
  const [filteredData, setFilteredData] = useState(checklistData);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewChecklistId, setViewChecklistId] = useState<number | null>(null);
  const [editChecklistId, setEditChecklistId] = useState<number | null>(null);

  const columns = [
    'Action',
    'Name',
    'Start Date',
    'End Date',
    'No. Of Group',
    'Frequency',
    'Priority Level',
    'Associations',
  ];

  const handleSearchClick = () => {
    setShowFilterRow(prev => !prev);
  };

  const handleFilterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filterChecklists = () => {
    let checklistsToFilter = checklistData;

    // Apply column filters
    checklistsToFilter = checklistsToFilter.filter(checklist => {
      return (
        checklist.name.toLowerCase().includes(filterValues.name.toLowerCase()) &&
        checklist.startDate.toLowerCase().includes(filterValues.startDate.toLowerCase()) &&
        checklist.endDate.toLowerCase().includes(filterValues.endDate.toLowerCase()) &&
        String(checklist.group).toLowerCase().includes(filterValues.group.toLowerCase()) &&
        checklist.frequency.toLowerCase().includes(filterValues.frequency.toLowerCase()) &&
        checklist.priorityLevel.toLowerCase().includes(filterValues.priorityLevel.toLowerCase())
      );
    });

    // Apply global search
    if (searchTerm.trim() !== '') {
      checklistsToFilter = checklistsToFilter.filter(checklist =>
        Object.values(checklist)
          .join(' ')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(checklistsToFilter);
  };

  useEffect(() => {
    filterChecklists();
  }, [filterValues, searchTerm]);

  const handleGoClick = () => {
    filterChecklists();
  };

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const paginatedData = filteredData.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className="w-full px-6 py-4 " style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }}>
      {showAssociateView ? (
        <AssociationForm />
      ) : (
        <div>
          <TopSearch 
          
            searchActive={showFilterRow}
            onSearchToggle={() => setShowFilterRow((prev) => !prev)}
            onButtonClick={(type) => {
              if (type === "0") navigate('/checklistform');
              // '1' is QR Code, '2' is Export
            }}
            buttons={[
              <span key="add"><FiPlus className="inline mr-1" /> Add</span>,
              <span key="qrcode"><TbQrcode className="inline mr-1" /> QR Code</span>,
              <span key="export"><FiDownload className="inline mr-1" /> Export</span>
            ]}
          />

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <TableHead columns={columns.map((label) => ({ label }))} />
              <tbody>
                {showFilterRow && (
                  <tr className="bg-gray-50 text-sm">
                    <td></td>
                    <td>
                      <TextInput label="" value={filterValues.name} onChange={handleFilterInputChange} name="name" placeholder="Name" />
                    </td>
                    <td>
                      <TextInput label="" value={filterValues.startDate} onChange={handleFilterInputChange} name="startDate" placeholder="Start Date" />
                    </td>
                    <td>
                      <TextInput label="" value={filterValues.endDate} onChange={handleFilterInputChange} name="endDate" placeholder="End Date" />
                    </td>
                    <td>
                      <TextInput label="" value={filterValues.group} onChange={handleFilterInputChange} name="group" placeholder="Group" />
                    </td>
                    <td>
                      <TextInput label="" value={filterValues.frequency} onChange={handleFilterInputChange} name="frequency" placeholder="Frequency" />
                    </td>
                    <td>
                      <TextInput label="" value={filterValues.priorityLevel} onChange={handleFilterInputChange} name="priorityLevel" placeholder="Priority Level" />
                    </td>
                    <td></td>
                  </tr>
                )}
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                      {columns.map((col, colIdx) => (
                        <td key={colIdx} className="p-2 border-x-0 text-left">
                          {col === 'Action' ? (
                            <span className="inline-flex items-center gap-2">
                              <IconButton tooltip="View" onClick={() => navigate(`/checklist/view/${item.id}`)}>
                                <FiEye />
                              </IconButton>
                              <IconButton tooltip="Edit" onClick={() => navigate(`/checklist/edit/${item.id}`)}>
                                <FiEdit />
                              </IconButton>
                            </span>
                          ) : col === 'Name' ? (
                            item.name
                          ) : col === 'Start Date' ? (
                            item.startDate
                          ) : col === 'End Date' ? (
                            item.endDate
                          ) : col === 'No. Of Group' ? (
                            item.group
                          ) : col === 'Frequency' ? (
                            item.frequency
                          ) : col === 'Priority Level' ? (
                            item.priorityLevel
                          ) : col === 'Associations' ? (
                            <button className="bg-blue-200 text-blue-800 px-2 py-0.5 text-xs rounded"
                              onClick={() => setShowAssociateView(true)}
                            >
                              {item.associations}
                            </button>
                          ) : (
                            '-'
                          )}
                        </td>
                      ))}
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

          {viewChecklistId !== null && (
            <div className="my-4 p-4 bg-gray-100 rounded">
              <button onClick={() => setViewChecklistId(null)} className="text-blue-600 underline float-right">Close</button>
              <ViewFormChecklist />
            </div>
          )}

          {editChecklistId !== null && (
            <div className="my-4 p-4 bg-gray-100 rounded">
              <button onClick={() => setEditChecklistId(null)} className="text-blue-600 underline float-right">Close</button>
              <EditFormChecklist />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Checklist;
