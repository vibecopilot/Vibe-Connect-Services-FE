import React, { useState, useEffect } from 'react';
import { FiEdit, FiEye, FiDownload, FiPlus } from 'react-icons/fi';
import NoDataFound from '../components/NoDataFound';
import TableHead from '../components/TopHead';
import Pagination from '../components/Pagination';
import IconButton from '../components/IconButton';
import AddServiceForm from '../forms/addserviceform';
import TextInput from '../components/TextInput';
import SearchIcon from '../components/SearchIcon';

const PAGE_SIZE = 10;

const services = [
  {
    name: 'Washroom',
    building: 'Digi',
    floor: '2nd Floor',
    unit: 'Vibe Workforce',
    createdBy: 'Akshat Shrawat',
    createdOn: '26/11/2024, 22:13:16',
  },
  {
    name: 'Cabin - Anurag',
    building: 'Digi',
    floor: '2nd Floor',
    unit: 'Vibe Workforce',
    createdBy: 'Akshat Shrawat',
    createdOn: '15/10/2024, 20:35:00',
  },
  {
    name: 'Mopping',
    building: 'Digi',
    floor: '2nd Floor',
    unit: 'Vibe Workforce',
    createdBy: 'Akshat Shrawat',
    createdOn: '11/10/2024, 23:50:52',
  },
];

const Service = () => {
  const [filterValues, setFilterValues] = useState({
    name: '',
    building: '',
    floor: '',
    unit: '',
    createdBy: '',
    createdOn: '',
  });
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [page, setPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filteredData, setFilteredData] = useState(services);

  const columns = [
    'Action',
    'Service Name',
    'Building',
    'Floor',
    'Unit',
    'Created by',
    'Create on',
  ];

  const handleFilterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filterServices = () => {
    let servicesToFilter = services;
    servicesToFilter = servicesToFilter.filter((service) => {
      return (
        service.name.toLowerCase().includes(filterValues.name.toLowerCase()) &&
        service.building.toLowerCase().includes(filterValues.building.toLowerCase()) &&
        service.floor.toLowerCase().includes(filterValues.floor.toLowerCase()) &&
        service.unit.toLowerCase().includes(filterValues.unit.toLowerCase()) &&
        service.createdBy.toLowerCase().includes(filterValues.createdBy.toLowerCase()) &&
        service.createdOn.toLowerCase().includes(filterValues.createdOn.toLowerCase())
      );
    });
    setFilteredData(servicesToFilter);
  };

  useEffect(() => {
    filterServices();
  }, [filterValues]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const paginatedData = filteredData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="px-6 py-6" style={{ fontFamily: "'PT Sans', sans-serif",  color: 'gray'}}>
      {showAddForm ? (
        <div className="bg-white rounded-md shadow-md p-4 min-h-[500px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Add Service</h2>
          </div>
          <AddServiceForm onClose={() => setShowAddForm(false)} />
        </div>
      ) : (
        <div >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex flex-wrap gap-2 items-center">
              <SearchIcon onClick={() => setShowFilterRow((prev) => !prev)} />
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-100"
              >
                <FiPlus /> Add
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-100">
                <FiDownload /> QR Code
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-100">
                <FiDownload /> Export
              </button>
            </div>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              totalItems={filteredData.length}
              onPageChange={setPage}
              showControls={true}
            />
          </div>

          <div className="overflow-x-auto mt-5">
            <table className="min-w-full table-auto border-collapse">
              <TableHead columns={columns.map((label) => ({ label, center: true }))} />
              <tbody>
                {showFilterRow && (
                  <tr className="bg-gray-50 text-sm">
                    <td></td>
                    <td>
                      <TextInput
                        label=""
                        value={filterValues.name}
                        onChange={handleFilterInputChange}
                        name="name"
                        placeholder="Service Name"
                      />
                    </td>
                    <td>
                      <TextInput
                        label=""
                        value={filterValues.building}
                        onChange={handleFilterInputChange}
                        name="building"
                        placeholder="Building"
                      />
                    </td>
                    <td>
                      <TextInput
                        label=""
                        value={filterValues.floor}
                        onChange={handleFilterInputChange}
                        name="floor"
                        placeholder="Floor"
                      />
                    </td>
                    <td>
                      <TextInput
                        label=""
                        value={filterValues.unit}
                        onChange={handleFilterInputChange}
                        name="unit"
                        placeholder="Unit"
                      />
                    </td>
                    <td>
                      <TextInput
                        label=""
                        value={filterValues.createdBy}
                        onChange={handleFilterInputChange}
                        name="createdBy"
                        placeholder="Created By"
                      />
                    </td>
                    <td>
                      <TextInput
                        label=""
                        value={filterValues.createdOn}
                        onChange={handleFilterInputChange}
                        name="createdOn"
                        placeholder="Created On"
                      />
                    </td>
                  </tr>
                )}

                {paginatedData.length > 0 ? (
                  paginatedData.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-2 text-left">
                        <span className="inline-flex items-center gap-2">
                          <IconButton tooltip="View" onClick={() => {}}>
                            <FiEye />
                          </IconButton>
                          <IconButton tooltip="Edit" onClick={() => {}}>
                            <FiEdit />
                          </IconButton>
                        </span>
                      </td>
                      <td className="p-2 text-left">{item.name}</td>
                      <td className="p-2 text-left">{item.building}</td>
                      <td className="p-2 text-left">{item.floor}</td>
                      <td className="p-2 text-left">{item.unit}</td>
                      <td className="p-2 text-left">{item.createdBy}</td>
                      <td className="p-2 text-left">{item.createdOn}</td>
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
      )}
    </div>
  );
};

export default Service;
