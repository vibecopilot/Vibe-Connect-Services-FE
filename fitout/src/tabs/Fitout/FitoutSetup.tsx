import React, { useState } from 'react';
import Pagination from '../../components/Pagination';
import TableHead from '../../components/TopHead';
import IconButton from '../../components/IconButton';
import { FiTrash2, FiEdit, FiPlus } from "react-icons/fi";
import Tabs from '../../components/Tabs';
import TopBar from '../../components/TopBar'; 

interface Item {
  id: number;
  category: string;
  oneBHK: number;
  twoBHK: number;
  oneBHK_RK: number;
  twoBHK_TERRIS: number;
  oneBHK_again: number;
}

interface StatusItem {
  id: number;
  order: number;
  status: string;
  fixedStatus: boolean;
  color: string;
}

const FitoutSetup: React.FC = () => {
  const [items] = useState<Item[]>([
    {
      id: 1,
      category: 'Kitchen renovation',
      oneBHK: 25000,
      twoBHK: 30000,
      oneBHK_RK: 22000,
      twoBHK_TERRIS: 35000,
      oneBHK_again: 24000
    },
    {
      id: 2,
      category: 'NA',
      oneBHK: 0,
      twoBHK: 0,
      oneBHK_RK: 0,
      twoBHK_TERRIS: 0,
      oneBHK_again: 0
    }
  ]);

  const [statusItems, setStatusItems] = useState<StatusItem[]>([
    { id: 1, order: 1, status: 'Draft', fixedStatus: false, color: '#FF5733' },
    { id: 2, order: 2, status: 'Submitted', fixedStatus: true, color: '#33FF57' },
    { id: 3, order: 3, status: 'Approved', fixedStatus: true, color: '#3357FF' },
    { id: 4, order: 4, status: 'Rejected', fixedStatus: false, color: '#F333FF' }
  ]);

  const [newStatus, setNewStatus] = useState('');
  const [newFixedState, setNewFixedState] = useState(false);
  const [newColor, setNewColor] = useState('#000000');
  const [newOrder, setNewOrder] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('category');

  const filteredItems = items.filter(item => 
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStatusItems = statusItems.filter(item => 
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const currentStatusItems = filteredStatusItems.slice(indexOfFirstItem, indexOfLastItem);
  
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const statusTotalPages = Math.ceil(filteredStatusItems.length / itemsPerPage);

  const handleDelete = (id: number) => {
    console.log('Delete item with ID:', id);
  };

  const handleDeleteStatus = (id: number) => {
    setStatusItems(statusItems.filter(item => item.id !== id));
  };

  const handleButtonClick = (type: string) => {
    console.log('Button clicked:', type);
    switch(type) {
      case 'New Category':
        console.log('Creating new fitout category');
        break;
      case 'Export':
        console.log('Exporting fitout categories');
        break;
      default:
        break;
    }
  };

  const handleAddStatus = () => {
    if (!newStatus || !newOrder) return;
    
    const newStatusItem: StatusItem = {
      id: statusItems.length + 1,
      order: newOrder,
      status: newStatus,
      fixedStatus: newFixedState,
      color: newColor
    };
    
    setStatusItems([...statusItems, newStatusItem]);
    setNewStatus('');
    setNewFixedState(false);
    setNewColor('#000000');
    setNewOrder(0);
  };

  const tabs = [
    { label: 'Category', key: 'category' },
    { label: 'Status', key: 'status' },
    { label: 'Fitout Guide', key: 'fitoutGuide' },
    { label: 'Deviation Status', key: 'deviationStatus' },
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
          buttons={activeTab === 'category' 
            ? ['New Category', 'Export'] 
            : []}
        />
      </div>

      {activeTab === 'category' && (
        <div className="mt-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredItems.length}
              onPageChange={setCurrentPage}
              showControls={true}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200">
              <TableHead 
                columns={[
                  { label: 'Actions', align: 'center' },
                  { label: 'Category' },
                  { label: '1 BHK', align: 'right' },
                  { label: '2 BHK', align: 'right' },
                  { label: '1 BHK RK', align: 'right' },
                  { label: '2 BHK TERRIS BHK', align: 'right' },
                  { label: '1 BHK', align: 'right' }
                ]}
              />
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="text-center py-3">
                        <div className="flex justify-center">
                          <IconButton onClick={() => handleDelete(item.id)}>
                            <FiTrash2 className="text-red-600" />
                          </IconButton>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium">{item.category}</td>
                      <td className="py-3 px-4 text-right">₹{item.oneBHK.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">₹{item.twoBHK.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">₹{item.oneBHK_RK.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">₹{item.twoBHK_TERRIS.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">₹{item.oneBHK_again.toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center">
                      No fitout categories found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'status' && (
        <div className="mt-4">
          {/* Status Form */}
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter Status
                </label>
                <input
                  type="text"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Status name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Fixed State
                </label>
                <select
                  value={newFixedState ? 'fixed' : 'notfixed'}
                  onChange={(e) => setNewFixedState(e.target.value === 'fixed')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="notfixed">Not Fixed</option>
                  <option value="fixed">Fixed</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <div className="flex items-center">
                  <input
                    type="color"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <span className="ml-2 text-sm text-gray-500">
                    {newColor}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter Status Order
                </label>
                <input
                  type="number"
                  value={newOrder}
                  onChange={(e) => setNewOrder(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Order"
                  min="1"
                />
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={handleAddStatus}
                  className="flex items-center justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FiPlus className="mr-2" />
                  Add
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <Pagination
              currentPage={currentPage}
              totalPages={statusTotalPages}
              totalItems={filteredStatusItems.length}
              onPageChange={setCurrentPage}
              showControls={true}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200">
              <TableHead
                columns={[
                  { label: 'Actions', align: 'center' },
                  { label: 'Order', align: 'center' },
                  { label: 'Status' },
                  { label: 'Fixed Status', align: 'center' },
                  { label: 'Color', align: 'center' },
                ]}
              />
              <tbody>
                {currentStatusItems.length > 0 ? (
                  currentStatusItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="text-center py-3">
                        <div className="flex justify-center space-x-2">
                          <IconButton onClick={() => console.log('Edit', item.id)}>
                            <FiEdit className="text-blue-600" />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteStatus(item.id)}>
                            <FiTrash2 className="text-red-600" />
                          </IconButton>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">{item.order}</td>
                      <td className="py-3 px-4 font-medium">{item.status}</td>
                      <td className="py-3 px-4 text-center">
                        {item.fixedStatus ? 'Yes' : 'No'}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div 
                          className="w-6 h-6 rounded-full mx-auto border border-gray-300" 
                          style={{ backgroundColor: item.color }}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center">
                      No status items found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'fitoutGuide' && (
        <div className="mt-4">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200">
              <TableHead
                columns={[
                  { label: 'Actions', align: 'center' },
                  { label: 'SR.NO', align: 'center' },
                  { label: 'File Name' },
                ]}
              />
              <tbody>
                <tr>
                  <td className="text-center py-3">
                    <div className="flex justify-center">
                      <IconButton tooltip="Delete" onClick={() => {}}>
                        <FiTrash2 className="text-red-600" />
                      </IconButton>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">1</td>
                  <td className="py-3 px-4">SampleGuide.pdf</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'deviationStatus' && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-semibold mb-4">Deviation Tracking</h3>
          <p>Track and manage deviations from approved fitout plans.</p>
        </div>
      )}
    </div>
  );
};

export default FitoutSetup;