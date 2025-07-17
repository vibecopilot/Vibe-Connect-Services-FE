import React, { useState } from 'react';
import Pagination from '../../components/Pagination';
import TableHead from '../../components/TopHead';
import NoDataFound from '../../components/NoDataFound';


interface ColumnConfig {
  label: string;
  align?: 'left' | 'center' | 'right';
}

const FitoutDeviations: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = 20;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const columns: ColumnConfig[] = [
    { label: "Actions", align: "center" },
    { label: "Tower" },
    { label: "Flat" },
    { label: "Status" }
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-1">
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
          <TableHead columns={columns} />
          <tbody>
              <tr>
                <td colSpan={columns.length} className="text-center py-4 text-gray-500">
                  <NoDataFound />
                </td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FitoutDeviations;