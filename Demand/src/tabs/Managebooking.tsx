import React, { useState, useMemo } from 'react';
import { FiEdit, FiTrash, FiEye } from 'react-icons/fi';
import TopSearch from '../components/TopSearch';
import TableHead from '../components/TopHead';
import Pagination from '../components/Pagination';
import NoDataFound from '../components/NoDataFound';
import Addschedule from '../forms/Addschedule';
import Modal from '../components/Modal'; // Make sure this import is correct

const INITIAL_BOOKINGS = [
  {
    id: 1241,
    schedule: '21/04/2025\n10:00 to 15:00',
    amountPaid: 0,
    paymentStatus: 'Payment Pending',
    createdBy: 'Deepak Gupta',
    createdOn: '19/04/2025',
  },
];

const PAGE_SIZE = 5;

const columns = [
  { label: 'Action', align: 'left' as const },
  { label: 'ID', align: 'left' as const },
  { label: 'Schedule', align: 'left' as const },
  { label: 'Amount Paid', align: 'left' as const },
  { label: 'Payment Status', align: 'left' as const },
  { label: 'Created By', align: 'left' as const },
  { label: 'Created On', align: 'left' as const },
];

const ManageBooking: React.FC = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddSchedule, setShowAddSchedule] = useState(false);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [columnSearch, setColumnSearch] = useState({
    id: '',
    schedule: '',
    amountPaid: '',
    paymentStatus: '',
    createdBy: '',
    createdOn: '',
  });

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      return (
        (columnSearch.id === '' || b.id.toString().includes(columnSearch.id)) &&
        (columnSearch.schedule === '' || b.schedule.toLowerCase().includes(columnSearch.schedule.toLowerCase())) &&
        (columnSearch.amountPaid === '' || b.amountPaid.toString().includes(columnSearch.amountPaid)) &&
        (columnSearch.paymentStatus === '' || b.paymentStatus.toLowerCase().includes(columnSearch.paymentStatus.toLowerCase())) &&
        (columnSearch.createdBy === '' || b.createdBy.toLowerCase().includes(columnSearch.createdBy.toLowerCase())) &&
        (columnSearch.createdOn === '' || b.createdOn.toLowerCase().includes(columnSearch.createdOn.toLowerCase()))
      );
    });
  }, [columnSearch, bookings]);

  const totalPages = Math.ceil(filteredBookings.length / PAGE_SIZE) || 1;

  const paginatedBookings = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredBookings.slice(start, start + PAGE_SIZE);
  }, [filteredBookings, currentPage]);

  const handleButtonClick = (type: string) => {
    if (type === 'Add') {
      setShowAddSchedule(true);
    }
  };

  const handleCloseAddSchedule = () => setShowAddSchedule(false);

  const handleSubmitAddSchedule = (data: {
    privacy: string;
    category: string;
    subCategory: string;
    date: string;
    payment: string;
  }) => {
    const newId = bookings.length > 0 ? Math.max(...bookings.map((b) => b.id)) + 1 : 1;
    const today = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const createdOn = `${pad(today.getDate())}/${pad(today.getMonth() + 1)}/${today.getFullYear()}`;
    const newBooking = {
      id: newId,
      schedule: data.date ? `${data.date}\n10:00 to 15:00` : '',
      amountPaid: 0,
      paymentStatus: 'Payment Pending',
      createdBy: 'Deepak Gupta',
      createdOn,
    };
    setBookings([newBooking, ...bookings]);
    setShowAddSchedule(false);
  };

  const handleColumnSearch = (field: string, value: string) => {
    setColumnSearch((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="p-2">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <TopSearch
          onSearch={() => setSearchVisible((prev) => !prev)}
          onButtonClick={handleButtonClick}
          buttons={['Add']}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredBookings.length}
          onPageChange={setCurrentPage}
        />
      </div>

      <div className="overflow-x-auto  border-gray">
        <table className="min-w-full text-sm border-gray">
          <TableHead columns={columns} />
          {searchVisible && (
            <tr>
              <td></td>
              <td>
                <input
                  className="border border-gray-300 bg-white px-2 py-1 text-sm w-full"
                  style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }}
                  placeholder="Search ID"
                  value={columnSearch.id}
                  onChange={e => handleColumnSearch('id', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="border border-gray-300 bg-white px-2 py-1 text-sm w-full"
                  style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }}
                  placeholder="Search Schedule"
                  value={columnSearch.schedule}
                  onChange={e => handleColumnSearch('schedule', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="border border-gray-300 bg-white px-2 py-1 text-sm w-full"
                  style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }}
                  placeholder="Search Amount"
                  value={columnSearch.amountPaid}
                  onChange={e => handleColumnSearch('amountPaid', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="border border-gray-300 bg-white px-2 py-1 text-sm w-full"
                  style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }}
                  placeholder="Search Status"
                  value={columnSearch.paymentStatus}
                  onChange={e => handleColumnSearch('paymentStatus', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="border border-gray-300 bg-white px-2 py-1 text-sm w-full"
                  style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }}
                  placeholder="Search By"
                  value={columnSearch.createdBy}
                  onChange={e => handleColumnSearch('createdBy', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="border border-gray-300 bg-white px-2 py-1 text-sm w-full"
                  style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }}
                  placeholder="Search Date"
                  value={columnSearch.createdOn}
                  onChange={e => handleColumnSearch('createdOn', e.target.value)}
                />
              </td>
            </tr>
          )}
          <tbody>
            {paginatedBookings.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <NoDataFound message="No bookings found." />
                </td>
              </tr>
            ) : (
              paginatedBookings.map((b) => (
                <tr className="border-t" key={b.id}>
                  <td className="px-4 py-2 flex items-center gap-2">
                    <FiEdit className="cursor-pointer" />
                    <FiTrash className="cursor-pointer" />
                    <FiEye className="cursor-pointer" />
                  </td>
                  <td className="px-4 py-2">{b.id}</td>
                  <td className="px-4 py-2 whitespace-pre-line">{b.schedule}</td>
                  <td className="px-4 py-2">{b.amountPaid}</td>
                  <td className="px-4 py-2">{b.paymentStatus}</td>
                  <td className="px-4 py-2">{b.createdBy}</td>
                  <td className="px-4 py-2">{b.createdOn}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal with blurred background */}
      {showAddSchedule && (
       <Modal isOpen={showAddSchedule} onClose={handleCloseAddSchedule}>
  <Addschedule onClose={handleCloseAddSchedule} onSubmit={handleSubmitAddSchedule} />
</Modal>
      )}
    </div>
  );
};

export default ManageBooking;
