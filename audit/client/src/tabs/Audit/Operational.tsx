import React, { useState, useRef, useEffect } from 'react';
import Pagination from '../../components/Pagination';
import TableHead from '../../components/TopHead';
import IconButton from '../../components/IconButton';
import { FiTrash2, FiEdit, FiFileText } from "react-icons/fi";
import Tabs from '../../components/Tabs';
import TopBar from '../../components/TopBar'; 
import ScheduledVendorForm from '../../forms/ScheduledVendorForm';
import type { ScheduledVendorFormHandle } from '../../forms/ScheduledVendorForm';
import RadioButton from '../../components/RadioButton';
import MasterChecklistForm from '../../forms/MasterChecklistForm';
import type { MasterChecklistFormHandle, MasterChecklistFormData } from '../../forms/MasterChecklistForm';

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
  auditName: string;
  startDateTime: string;
  conductedBy: string;
  site: string;
  duration: string;
  percentage: number;
}

interface MasterChecklistItem {
  id: number;
  activityName: string;
  numQuestions: number;
  status: string; 
}

const Operational: React.FC = () => {
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
      auditName: '',
      startDateTime: '',
      conductedBy: '',
      site: '',
      duration: '',
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
      auditName: '',
      startDateTime: '',
      conductedBy: '',
      site: '',
      duration: '',
      percentage: 0
    }
  ]);

  const [conductedItems, setConductedItems] = useState<Item[]>([
    {
      id: 1,
      activityName: 'Plumbing Check',
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
      auditName: 'Plumbing Safety Audit',
      startDateTime: '2023-08-10 10:30 AM',
      conductedBy: 'Michael Brown',
      site: 'Building A',
      duration: '2 hours',
      percentage: 95
    },
    {
      id: 2,
      activityName: 'Electrical Safety Audit',
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
      auditName: 'Electrical System Check',
      startDateTime: '2023-08-12 02:15 PM',
      conductedBy: 'Emily Davis',
      site: 'Building B',
      duration: '3.5 hours',
      percentage: 87
    }
  ]);

  const [masterChecklistItems, setMasterChecklistItems] = useState<MasterChecklistItem[]>([
    {
      id: 1,
      activityName: 'Safety Audit',
      numQuestions: 25,
      status: 'Open'
    },
    {
      id: 2,
      activityName: 'Quality Check',
      numQuestions: 18,
      status: 'Completed'
    },
    {
      id: 3,
      activityName: 'Equipment Inspection',
      numQuestions: 32,
      status: 'Pending'
    },
    {
      id: 4,
      activityName: 'Hygiene Inspection',
      numQuestions: 22,
      status: 'Closed'
    },
    {
      id: 5,
      activityName: 'Fire Safety Check',
      numQuestions: 15,
      status: 'Open'
    },
    {
      id: 6,
      activityName: 'Compliance Review',
      numQuestions: 28,
      status: 'Completed'
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('scheduled');
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [statusFilter, setStatusFilter] = useState('All'); 
  const [showMasterForm, setShowMasterForm] = useState(false);
  const [editingMasterItem, setEditingMasterItem] = useState<MasterChecklistItem | null>(null);
  
  const formRef = useRef<ScheduledVendorFormHandle>(null);
  const masterFormRef = useRef<MasterChecklistFormHandle>(null);

  useEffect(() => {
    setEditingItem(null);
    setCurrentPage(1);
    setShowMasterForm(false);
    setEditingMasterItem(null);
    
    if (formRef.current) {
      formRef.current.resetForm();
    }
    if (masterFormRef.current) {
      masterFormRef.current.resetForm();
    }
  }, [activeTab]);

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
        auditName: '',
        startDateTime: '',
        conductedBy: '',
        site: '',
        duration: '',
        percentage: 0
      };
      setScheduledItems([...scheduledItems, newItem]);
    }
    setEditingItem(null);
    if (formRef.current) {
      formRef.current.resetForm();
    }
  };

  const handleMasterFormSubmit = (formData: MasterChecklistFormData) => {
    if (editingMasterItem) {
      const updatedItems = masterChecklistItems.map(item => 
        item.id === editingMasterItem.id ? { 
          ...item, 
          ...formData,
          id: item.id,
          numQuestions: item.numQuestions,
          status: item.status
        } : item
      );
      setMasterChecklistItems(updatedItems);
    } else {
      const newItem: MasterChecklistItem = {
        id: Date.now(),
        activityName: formData.activityName,
        numQuestions: 0, // Initialize with 0 questions
        status: 'Open' // Default status
      };
      setMasterChecklistItems([...masterChecklistItems, newItem]);
    }
    setShowMasterForm(false);
    setEditingMasterItem(null);
  };

  const handleDelete = (id: number) => {
    setConductedItems(conductedItems.filter(item => item.id !== id));
  };

  const handleMasterDelete = (id: number) => {
    setMasterChecklistItems(masterChecklistItems.filter(item => item.id !== id));
  };

  const handleCancelForm = () => {
    setEditingItem(null);
    if (formRef.current) {
      formRef.current.resetForm();
    }
  };

  const handleDeleteForm = () => {
    if (editingItem) {
      setScheduledItems(scheduledItems.filter(item => item.id !== editingItem.id));
      setEditingItem(null);
      if (formRef.current) {
        formRef.current.resetForm();
      }
    }
  };

  const handleButtonClick = (type: string) => {
    switch(type) {
      case 'Add':
        setShowMasterForm(true);
        setEditingMasterItem(null);
        break;
      case 'Export':
        console.log('Exporting data');
        break;
      default:
        break;
    }
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
      (item.auditName && item.auditName.toLowerCase().includes(searchLower)) ||
      (item.conductedBy && item.conductedBy.toLowerCase().includes(searchLower)) ||
      (item.site && item.site.toLowerCase().includes(searchLower))
    );
  };

  const matchesMasterSearchTerm = (item: MasterChecklistItem) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = (
      item.activityName.toLowerCase().includes(searchLower) ||
      item.id.toString().includes(searchTerm) ||
      item.numQuestions.toString().includes(searchTerm)
    );
    
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  };

  const filteredConducted = conductedItems.filter(matchesSearchTerm);
  const filteredMaster = masterChecklistItems.filter(matchesMasterSearchTerm);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const currentConducted = filteredConducted.slice(indexOfFirstItem, indexOfLastItem);
  const currentMaster = filteredMaster.slice(indexOfFirstItem, indexOfLastItem);
  
  const conductedTotalPages = Math.ceil(filteredConducted.length / itemsPerPage);
  const masterTotalPages = Math.ceil(filteredMaster.length / itemsPerPage);

  const tabs = [
    { label: 'Scheduled', key: 'scheduled' },
    { label: 'Conducted', key: 'conducted' },
    { label: 'Master Checklist', key: 'master-checklist' }
  ];

  return (
    <div>
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        orientation="horizontal"
      />

      {activeTab === 'scheduled' ? (
        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
          <ScheduledVendorForm 
            ref={formRef}
            initialData={editingItem || undefined}
            onSubmit={handleFormSubmit}
            onCancel={handleCancelForm}
            onDelete={editingItem ? handleDeleteForm : undefined}
          />
        </div>
      ) : activeTab === 'master-checklist' && showMasterForm ? (
        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
          <MasterChecklistForm 
            ref={masterFormRef}
            initialData={editingMasterItem || undefined}
            onSubmit={handleMasterFormSubmit}
            onCancel={() => setShowMasterForm(false)}
            onDelete={editingMasterItem ? () => handleMasterDelete(editingMasterItem.id) : undefined}
          />
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <TopBar 
              onSearch={setSearchTerm}
              onButtonClick={handleButtonClick}
              buttons={activeTab === 'conducted'
                ? ['Export']
                : ['Add', 'Export']}
            />
            {activeTab === 'master-checklist' && (
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
              {activeTab === 'conducted' && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={conductedTotalPages}
                  totalItems={filteredConducted.length}
                  onPageChange={setCurrentPage}
                  showControls={true}
                />
              )}
              {activeTab === 'master-checklist' && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={masterTotalPages}
                  totalItems={filteredMaster.length}
                  onPageChange={setCurrentPage}
                  showControls={true}
                />
              )}
            </div>
          </div>

          {activeTab === 'conducted' && (
            <div className="mt-4">
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border border-gray-200">
                  <TableHead 
                    columns={[
                      { label: 'Report', align: 'center' },
                      { label: 'Id', align: 'center' },
                      { label: 'Audit Name' },
                      { label: 'Start Date & Time' },
                      { label: 'Conducted By' },
                      { label: 'Status' },
                      { label: 'Site' },
                      { label: 'Duration', align: 'center' },
                      { label: '%', align: 'center' }
                    ]}
                  />
                  <tbody>
                    {currentConducted.length > 0 ? (
                      currentConducted.map((item) => (
                        <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="text-center py-3">
                            <div className="flex justify-center space-x-2">
                              <IconButton 
                                onClick={() => console.log('View report', item.id)}
                                tooltip="View Report"
                              >
                                <FiFileText className="text-blue-600" />
                              </IconButton>
                              <IconButton 
                                onClick={() => handleDelete(item.id)}
                                tooltip="Delete Report"
                              >
                                <FiTrash2 className="text-red-600" />
                              </IconButton>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center">{item.id}</td>
                          <td className="py-3 px-4 font-medium">{item.auditName}</td>
                          <td className="py-3 px-4">{item.startDateTime}</td>
                          <td className="py-3 px-4">{item.conductedBy}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">{item.site}</td>
                          <td className="py-3 px-4 text-center">{item.duration}</td>
                          <td className="py-3 px-4 text-center">
                            <span className="text-sm font-medium">{item.percentage}%</span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={9} className="py-8 text-center">
                          No conducted activities found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'master-checklist' && !showMasterForm && (
            <div className="mt-4">
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border border-gray-200">
                  <TableHead 
                    columns={[
                      { label: 'Actions', align: 'center' },
                      { label: 'ID', align: 'center' },
                      { label: 'Activity Name' },
                      { label: 'No.of Questions', align: 'center' },
                      { label: 'Status', align: 'center' }
                    ]}
                  />
                  <tbody>
                    {currentMaster.length > 0 ? (
                      currentMaster.map((item) => (
                        <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="text-center py-3">
                            <div className="flex justify-center space-x-2">
                              <IconButton 
                                onClick={() => {
                                  setEditingMasterItem(item);
                                  setShowMasterForm(true);
                                }}
                                tooltip="Edit"
                              >
                                <FiEdit className="text-blue-600" />
                              </IconButton>
                              <IconButton 
                                onClick={() => handleMasterDelete(item.id)}
                                tooltip="Delete"
                              >
                                <FiTrash2 className="text-red-600" />
                              </IconButton>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center">{item.id}</td>
                          <td className="py-3 px-4 font-medium">{item.activityName}</td>
                          <td className="py-3 px-4 text-center">{item.numQuestions}</td>
                          <td className="py-3 px-4 text-center">{item.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-8 text-center">
                          No master checklist items found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Operational;