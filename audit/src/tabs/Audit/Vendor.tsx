// src/components/Vendor.tsx
import React, { useState, useRef } from 'react';
import Pagination from '../../components/Pagination';
import TableHead from '../../components/TopHead';
import IconButton from '../../components/IconButton';
import { FiTrash2, FiEdit, FiFileText } from "react-icons/fi";
import Tabs from '../../components/Tabs';
import TopBar from '../../components/TopBar'; 
import ScheduledVendorForm from '../../forms/ScheduledVendorForm';
import type { ScheduledVendorFormHandle } from '../../forms/ScheduledVendorForm';
import RadioButton from '../../components/RadioButton';

interface Item {
  id: number;
  activityName: string;
  numAssociations: number;
  task: string;
  taskAssignedTo: string;
  createdOn: string;
  active: boolean;
  scanType: string;
  priority: string;
  planDuration: string;
  emailTriggerRule: string;
  supervisors: string;
  category: string;
  lockOverdueTask: string;
  frequency: string;
  startFrom: string;
  endAt: string;
  selectSupplier: string;
  description: string;
  createdBy: string;
  status: string;
  important: boolean;
  vendorName: string;
  conductedBy: string;
  conductedDateTime: string;
  totalScore: number;
  evaluatedScore: number;
  percentage: number;
}

const Vendor: React.FC = () => {
  const [scheduledItems, setScheduledItems] = useState<Item[]>([
    {
      id: 1,
      activityName: 'Kitchen Inspection',
      numAssociations: 3,
      task: '14',
      taskAssignedTo: 'John Smith',
      createdOn: '2023-08-15',
      active: true,
      scanType: 'Full Scan',
      priority: 'High',
      planDuration: 'Daily',
      emailTriggerRule: 'On Failure',
      supervisors: 'John Doe',
      category: 'Maintenance',
      lockOverdueTask: 'Yes',
      frequency: 'Daily',
      startFrom: '2023-08-15',
      endAt: '2023-08-16',
      selectSupplier: 'Supplier A',
      description: '',
      createdBy: 'Admin',
      status: 'Scheduled',
      important: true,
      vendorName: '',
      conductedBy: '',
      conductedDateTime: '',
      totalScore: 0,
      evaluatedScore: 0,
      percentage: 0
    },
    {
      id: 2,
      activityName: 'Bathroom Verification',
      numAssociations: 2,
      task: '15',
      taskAssignedTo: 'Sarah Johnson',
      createdOn: '2023-08-17',
      active: true,
      scanType: 'Partial Scan',
      priority: 'Medium',
      planDuration: 'Weekly',
      emailTriggerRule: 'On Success',
      supervisors: 'Jane Smith',
      category: 'Inspection',
      lockOverdueTask: 'No',
      frequency: 'Weekly',
      startFrom: '2023-08-17',
      endAt: '2023-08-24',
      selectSupplier: 'Supplier B',
      description: '',
      createdBy: 'Manager',
      status: 'Pending',
      important: false,
      vendorName: '',
      conductedBy: '',
      conductedDateTime: '',
      totalScore: 0,
      evaluatedScore: 0,
      percentage: 0
    }
  ]);

  const [conductedItems, setConductedItems] = useState<Item[]>([
    {
      id: 1,
      activityName: 'Plumbing Safety Audit',
      numAssociations: 4,
      task: '16',
      taskAssignedTo: 'Michael Brown',
      createdOn: '2023-08-10',
      active: false,
      scanType: 'Quick Scan',
      priority: 'Low',
      planDuration: 'Monthly',
      emailTriggerRule: 'Always',
      supervisors: 'Mike Johnson',
      category: 'Safety',
      lockOverdueTask: 'Yes',
      frequency: 'Monthly',
      startFrom: '2023-08-10',
      endAt: '2023-09-10',
      selectSupplier: 'Supplier C',
      description: '',
      createdBy: 'Tech',
      status: 'Completed',
      important: false,
      vendorName: 'Plumbing Solutions Inc.',
      conductedBy: 'Michael Brown',
      conductedDateTime: '2023-08-10 10:30 AM',
      totalScore: 100,
      evaluatedScore: 95,
      percentage: 95
    },
    {
      id: 2,
      activityName: 'Electrical System Audit',
      numAssociations: 5,
      task: '17',
      taskAssignedTo: 'Emily Davis',
      createdOn: '2023-08-12',
      active: false,
      scanType: 'Full Scan',
      priority: 'High',
      planDuration: 'Quarterly',
      emailTriggerRule: 'Never',
      supervisors: 'John Doe',
      category: 'Compliance',
      lockOverdueTask: 'No',
      frequency: 'Quarterly',
      startFrom: '2023-08-12',
      endAt: '2023-11-12',
      selectSupplier: 'Supplier A',
      description: '',
      createdBy: 'Admin',
      status: 'Reviewed',
      important: true,
      vendorName: 'ElectroTech Services',
      conductedBy: 'Emily Davis',
      conductedDateTime: '2023-08-12 02:15 PM',
      totalScore: 120,
      evaluatedScore: 105,
      percentage: 87.5
    },
    {
      id: 3,
      activityName: 'HVAC Maintenance Check',
      numAssociations: 6,
      task: '18',
      taskAssignedTo: 'Robert Wilson',
      createdOn: '2023-08-20',
      active: false,
      scanType: 'Comprehensive Scan',
      priority: 'Medium',
      planDuration: 'Bi-Annual',
      emailTriggerRule: 'On Failure',
      supervisors: 'Sarah Johnson',
      category: 'Maintenance',
      lockOverdueTask: 'Yes',
      frequency: 'Semi-Annual',
      startFrom: '2023-08-20',
      endAt: '2024-02-20',
      selectSupplier: 'Supplier D',
      description: '',
      createdBy: 'Facility Manager',
      status: 'Approved',
      important: false,
      vendorName: 'Climate Control Experts',
      conductedBy: 'Robert Wilson',
      conductedDateTime: '2023-08-20 09:00 AM',
      totalScore: 150,
      evaluatedScore: 142,
      percentage: 94.7
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('scheduled');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const formRef = useRef<ScheduledVendorFormHandle>(null);

  const handleFormSubmit = (formData: Item) => {
    if (editingItem) {
      const updatedItems = scheduledItems.map(item => 
        item.id === editingItem.id ? { 
          ...item, 
          ...formData,
          id: item.id
        } : item
      );
      setScheduledItems(updatedItems);
    } else {
      const newItem: Item = {
        id: Date.now(),
        ...formData,
        createdBy: 'Admin',
        status: 'Scheduled',
        important: false,
        vendorName: '',
        conductedBy: '',
        conductedDateTime: '',
        totalScore: 0,
        evaluatedScore: 0,
        percentage: 0
      };
      setScheduledItems([...scheduledItems, newItem]);
    }
    setShowForm(false);
    setEditingItem(null);
  };

  const handleDelete = (id: number) => {
    if (activeTab === 'scheduled') {
      setScheduledItems(scheduledItems.filter(item => item.id !== id));
    } else {
      setConductedItems(conductedItems.filter(item => item.id !== id));
    }
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const handleDeleteForm = () => {
    if (editingItem) {
      handleDelete(editingItem.id);
      setShowForm(false);
      setEditingItem(null);
    }
  };

  const handleButtonClick = (type: string) => {
    switch(type) {
      case 'Add':
        setActiveTab('scheduled'); // Switch to scheduled tab
        setEditingItem(null);
        setShowForm(true);
        break;
      case 'Export':
        console.log('Exporting data');
        break;
      default:
        break;
    }
  };

  const handleViewReport = (id: number) => {
    console.log('Viewing report for', id);
  };

  const matchesSearchTerm = (item: Item) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.activityName.toLowerCase().includes(searchLower) ||
      item.selectSupplier.toLowerCase().includes(searchLower) ||
      (item.description && item.description.toLowerCase().includes(searchLower)) ||
      item.createdBy.toLowerCase().includes(searchLower) ||
      item.startFrom.includes(searchTerm) ||
      item.endAt.includes(searchTerm) ||
      item.category.toLowerCase().includes(searchLower) ||
      item.status.toLowerCase().includes(searchLower) ||
      (item.vendorName && item.vendorName.toLowerCase().includes(searchLower)) ||
      (item.conductedBy && item.conductedBy.toLowerCase().includes(searchLower)) ||
      (item.conductedDateTime && item.conductedDateTime.toLowerCase().includes(searchLower))
    );
  };

  const filteredScheduled = scheduledItems.filter(matchesSearchTerm);
  const filteredConducted = conductedItems.filter(matchesSearchTerm);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const currentScheduled = filteredScheduled.slice(indexOfFirstItem, indexOfLastItem);
  const currentConducted = filteredConducted.slice(indexOfFirstItem, indexOfLastItem);
  
  const scheduledTotalPages = Math.ceil(filteredScheduled.length / itemsPerPage);
  const conductedTotalPages = Math.ceil(filteredConducted.length / itemsPerPage);

  const tabs = [
    { label: 'Scheduled', key: 'scheduled' },
    { label: 'Conducted', key: 'conducted' }
  ];

  return (
    <div>
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        orientation="horizontal"
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <TopBar 
          onSearch={setSearchTerm}
          onButtonClick={handleButtonClick}
          buttons={activeTab === 'scheduled' 
            ? ['Add', 'Export'] 
            : ['Export']}
        />
        {activeTab === 'conducted' && (
          <div className="ml-4 flex items-center p-3 rounded-md border border-black-200 mt-[-12px]">
            <RadioButton
              label=""
              name="statusFilter"
              options={['All', 'Open', 'Closed', 'Pending', 'Completed']}
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              layout="horizontal"
            />
          </div>
        )}
        <div className="ml-auto">
          <Pagination
            currentPage={currentPage}
            totalPages={activeTab === 'scheduled' ? scheduledTotalPages : conductedTotalPages}
            totalItems={activeTab === 'scheduled' ? filteredScheduled.length : filteredConducted.length}
            onPageChange={setCurrentPage}
            showControls={true}
          />
        </div>
      </div>
      

      {showForm && activeTab === 'scheduled' && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <ScheduledVendorForm 
            ref={formRef}
            initialData={editingItem || undefined}
            onSubmit={handleFormSubmit}
            onCancel={handleCancelForm}
            onDelete={editingItem ? handleDeleteForm : undefined}
          />
        </div>
      )}

      {activeTab === 'scheduled' && !showForm && (
        <div className="mt-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200">
              <TableHead 
                columns={[
                  { label: 'Actions', align: 'center' },
                  { label: 'Id', align: 'center' },
                  { label: 'Activity Name' },
                  { label: 'No. of Associations', align: 'center' },
                  { label: 'Task', align: 'center' },
                  { label: 'Task Assigned To' },
                  { label: 'Created On' }
                ]}
              />
              <tbody>
                {currentScheduled.length > 0 ? (
                  currentScheduled.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="text-center py-3">
                        <div className="flex justify-center space-x-2">
                          <IconButton onClick={() => handleEdit(item)}>
                            <FiEdit className="text-blue-600" />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(item.id)}>
                            <FiTrash2 className="text-red-600" />
                          </IconButton>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">{item.id}</td>
                      <td className="py-3 px-4">{item.activityName}</td>
                      <td className="py-3 px-4 text-center">{item.numAssociations}</td>
                      <td className="py-3 px-4 text-center">{item.task}</td>
                      <td className="py-3 px-4">{item.taskAssignedTo}</td>
                      <td className="py-3 px-4">{item.createdOn}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center">
                      No scheduled activities found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'conducted' && (
        <div className="mt-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200">
              <TableHead 
                columns={[
                  { label: 'Report', align: 'center' },
                  { label: 'Id', align: 'center' },
                  { label: 'Vendor Name' },
                  { label: 'Audit Name' },
                  { label: 'Date & Time' },
                  { label: 'Conducted By' },
                  { label: 'Total Score', align: 'center' },
                  { label: 'Evaluated Score', align: 'center' },
                  { label: '%', align: 'center' }
                ]}
              />
              <tbody>
                {currentConducted.length > 0 ? (
                  currentConducted.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="text-center py-3">
                        <div className="flex justify-center">
                          <IconButton 
                            onClick={() => handleViewReport(item.id)}
                            tooltip="View Report"
                          >
                            <FiFileText className="text-blue-600" />
                          </IconButton>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">{item.id}</td>
                      <td className="py-3 px-4 font-medium">{item.vendorName}</td>
                      <td className="py-3 px-4">{item.activityName}</td>
                      <td className="py-3 px-4">{item.conductedDateTime}</td>
                      <td className="py-3 px-4">{item.conductedBy}</td>
                      <td className="py-3 px-4 text-center">{item.totalScore}</td>
                      <td className="py-3 px-4 text-center">{item.evaluatedScore}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full`}>
                          {item.percentage}%
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="py-8 text-center">
                      No conducted audits found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vendor;