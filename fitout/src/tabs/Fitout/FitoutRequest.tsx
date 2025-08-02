import React, { useState, useRef } from 'react';
import TopBar from '../../components/TopBar';
import Pagination from '../../components/Pagination';
import TableHead from '../../components/TopHead';
import NoDataFound from '../../components/NoDataFound';
import IconButton from '../../components/IconButton';
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Tabs from '../../components/Tabs';
import type { FitoutRequestFormHandle } from '../../forms/FitoutRequestForm';
import FitoutRequestForm from '../../forms/FitoutRequestForm';

interface Item {
  id: number;
  annexure: string;
  description: string;
  tower: string;
  flat: number;
  masterStatus: string;
  createdOn: string;
  createdBy: string;
  totalAmt: number;
  paidAmt: number;
}

const FitoutRequest: React.FC = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const [searchValue, setSearchValue] = useState("");
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<Item[]>([
    {
      id: 1,
      annexure: "NA",
      description: "Kitchen renovation work",
      tower: "A",
      flat: 102,
      masterStatus: "Pending",
      createdOn: "06/04/2022 2:20pm",
      createdBy: "Admin",
      totalAmt: 10000,
      paidAmt: 5000
    },
    {
      id: 2,
      annexure: "A-102",
      description: "Bathroom fittings installation",
      tower: "B",
      flat: 203,
      masterStatus: "Approved",
      createdOn: "07/04/2022 3:45pm",
      createdBy: "Admin",
      totalAmt: 15000,
      paidAmt: 15000
    }
  ]);

  const itemsPerPage = 10;
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const formRef = useRef<FitoutRequestFormHandle>(null);

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchValue.toLowerCase())
  ));

  const handleEditClick = (item: Item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDeleteClick = (item: Item) => {
    const updatedData = data.filter(i => i.id !== item.id);
    setData(updatedData);
  };

  const handleSearch = (query: string) => {
    setSearchValue(query);
  };

  const handleFormSubmit = () => {
    if (formRef.current) {
      const formData = formRef.current.getPayload();
      if (formData) {
        if (editingItem) {
          // Update existing item
          const updatedData = data.map(item => 
            item.id === editingItem.id ? { 
              ...item, 
              ...formData
            } : item
          );
          setData(updatedData);
        } else {
          // Add new item
          const newItem: Item = {
            id: Date.now(),
            ...formData,
            masterStatus: "Pending",
            createdOn: new Date().toLocaleDateString(),
            createdBy: "Admin"
          };
          setData([...data, newItem]);
        }
        setShowForm(false);
        setEditingItem(null);
      }
    }
  };

  const handleButtonClick = (type: string) => {
    if (type === "Add") {
      setEditingItem(null);
      setShowForm(true);
    }
  };

  const tabs = [
    { label: 'Fitout Requests', key: 'requests' }
  ];

  return (
    <div>
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        orientation="horizontal"
      />

      {activeTab === 'requests' && (
        <div className="mt-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <TopBar
              onSearch={handleSearch}
              onButtonClick={handleButtonClick}
              buttons={['Add', 'Filter']}
            />
          </div>

          {showForm ? (
            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
              <h2 className="text-xl font-semibold mb-4">
                Request Info
              </h2>
              <FitoutRequestForm 
                ref={formRef}
                initialData={editingItem || undefined}
              />
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingItem(null);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleFormSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingItem ? "Update" : "Create"}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  onPageChange={setCurrentPage}
                  showControls={true}
                />
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border border-gray-200">
                  <TableHead
                    columns={[
                      { label: "Annexure" },
                      { label: "Description" },
                      { label: "Tower" },
                      { label: "Flat" },
                      { label: "Master Status" },
                      { label: "Created On" },
                      { label: "Created By" },
                      { label: "Total Amt" },
                      { label: "Amt Paid" },
                      { label: "Actions", align: "center" },
                    ]}
                  />
                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="p-3 border-b">{item.annexure}</td>
                          <td className="p-3 border-b">{item.description}</td>
                          <td className="p-3 border-b">{item.tower}</td>
                          <td className="p-3 border-b">{item.flat}</td>
                          <td className="p-3 border-b">{item.masterStatus}</td>
                          <td className="p-3 border-b">{item.createdOn}</td>
                          <td className="p-3 border-b">{item.createdBy}</td>
                          <td className="p-3 border-b">{item.totalAmt}</td>
                          <td className="p-3 border-b">{item.paidAmt}</td>
                          <td className="p-3 border-b text-center space-x-3">
                            <IconButton 
                              tooltip="Edit" 
                              className="hover:text-green-600 transition-colors" 
                              onClick={() => handleEditClick(item)}
                            >
                              <FiEdit />
                            </IconButton>
                            <IconButton
                              tooltip="Delete"
                              className="hover:text-red-600 transition-colors"
                              onClick={() => handleDeleteClick(item)}
                            >
                              <FiTrash2 />
                            </IconButton>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={10} className="text-center py-4 text-gray-500">
                          <NoDataFound />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FitoutRequest;