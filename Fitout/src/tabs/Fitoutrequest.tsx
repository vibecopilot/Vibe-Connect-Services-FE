import React, { useEffect, useMemo, useState } from 'react';
import TextInput from '../components/TextInput';
import IconButton from '../components/IconButton';
import TableHead from '../components/TopHead';
import NoDataFound from '../components/NoDataFound';
import Pagination from '../components/Pagination';
import TopSearch from '../components/TopSearch';
import { FiEdit, FiEye } from 'react-icons/fi';
import AddFitoutRequest from '../forms/Addfitoutrequest';
import ViewFitoutRequest from '../forms/Viewfitoutrequest';

interface FitoutRequest {
  id: number;
  description: string;
  tower: string;
  priority: string;
  status: string;
  comments: string;
}

type Tower = 'Tower A' | 'Tower B' | 'Tower C';

const PAGE_SIZE = 10;

const initialData: FitoutRequest[] = [
  {
    id: 1,
    description: 'Partition wall alterations',
    tower: 'Tower A',
    priority: 'High',
    status: 'Open',
    comments: 'Need urgent approval',
  },
];

const FitoutRequest: React.FC = () => {
  const [data] = useState<FitoutRequest[]>(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showViewForm, setShowViewForm] = useState(false);

  const [searchFilters, setSearchFilters] = useState({
    id: '',
    description: '',
    tower: '',
    priority: '',
    status: '',
    comments: '',
  });

  const filtered = useMemo(() => {
    return data.filter((item) => {
      return (
        item.id.toString().includes(searchFilters.id) &&
        item.description.toLowerCase().includes(searchFilters.description.toLowerCase()) &&
        item.tower.toLowerCase().includes(searchFilters.tower.toLowerCase()) &&
        item.priority.toLowerCase().includes(searchFilters.priority.toLowerCase()) &&
        item.status.toLowerCase().includes(searchFilters.status.toLowerCase()) &&
        item.comments.toLowerCase().includes(searchFilters.comments.toLowerCase())
      );
    });
  }, [searchFilters, data]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  useEffect(() => {
    if (currentPage > pageCount) setCurrentPage(1);
  }, [pageCount, currentPage]);

  const handleButtonClick = (type: string) => {
    if (type === 'Add') {
      setShowAddForm(true);
    }
  };

  const renderRow = (req: FitoutRequest) => (
    <tr key={req.id} className="border-b last:border-b-0 text-gray-700">
      <td className="px-2 py-1 whitespace-nowrap">
        <div className="flex gap-2">
          <IconButton tooltip="Edit" onClick={() => {}}>
            <FiEdit />
          </IconButton>
          <IconButton tooltip="View" onClick={() => setShowViewForm(true)}>
            <FiEye />
          </IconButton>
        </div>
      </td>
      <td className="px-2 py-1">{req.id}</td>
      <td className="px-2 py-1">{req.description}</td>
      <td className="px-2 py-1">{req.tower}</td>
      <td className="px-2 py-1">{req.priority}</td>
      <td className="px-2 py-1">{req.status}</td>
      <td className="px-2 py-1">{req.comments}</td>
    </tr>
  );

  return (
    <div className="flex flex-col gap-4 text-gray-700" style={{ fontFamily: "'PT Sans', sans-serif" }}>
      {!showAddForm && !showViewForm && (
        <>
          <div className="flex justify-between items-center flex-wrap gap-4">
            <TopSearch
              onSearch={() => setShowFilterRow((prev) => !prev)}
              onButtonClick={handleButtonClick}
              buttons={['Add']}
            />
            <Pagination
              totalItems={filtered.length}
              currentPage={currentPage}
              totalPages={pageCount}
              onPageChange={setCurrentPage}
            />
          </div>

          <div className="border border-gray-300 rounded-md overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-300">
              <TableHead
                columns={[
                  { label: 'Action' },
                  { label: 'ID' },
                  { label: 'Description' },
                  { label: 'Tower' },
                  { label: 'Priority' },
                  { label: 'Status' },
                  { label: 'Comments' }
                ]}
              />
              {showFilterRow && (
                <thead>
                  <tr className="text-gray-600">
                    <th className="px-2 py-1 border border-gray-300"></th>
                    {(['id', 'description', 'tower', 'priority', 'status', 'comments'] as const).map((key) => (
                      <th key={key} className="px-2 py-1 border border-gray-300">
                        <TextInput
                          label=""
                          name={key}
                          value={searchFilters[key]}
                          onChange={(e) =>
                            setSearchFilters((prev) => ({ ...prev, [key]: e.target.value }))
                          }
                          placeholder="Search"
                          className="w-full"
                        />
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {paged.length ? (
                  paged.map(renderRow)
                ) : (
                  <tr>
                    <td colSpan={7} className="border border-gray-300">
                      <NoDataFound />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {showAddForm && <AddFitoutRequest />}
      {showViewForm && <ViewFitoutRequest />}
    </div>
  );
};

export default FitoutRequest;
