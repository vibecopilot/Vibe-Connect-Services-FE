import React, { useState } from 'react';
import Pagination from '../../components/Pagination';
import TableHead from '../../components/TopHead';


interface ChecklistItem {
  id: number;
  name: string;
  status: string;
  category: string;
  subcategory: string;
  associations: string;
  questions: string;
}

const FitoutChecklists: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = 1; 
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const checklistData: ChecklistItem[] = [
    {
      id: 1,
      name: 'Fit Out Bounds/Checklist',
      status: '',
      category: 'Fitout',
      subcategory: 'Fit Out Bounds',
      associations: '',
      questions: ''
    }
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Add Checklist
          </button>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            onPageChange={setCurrentPage}
            showControls={true}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <TableHead
            columns={[
              { label: "Actions", align: "center" },
              { label: "Name" },
              { label: "Status" },
              { label: "Category" },
              { label: "Subcategory" },
              { label: "Associations" },
              { label: "No.Of Q", align: "center" }
            ]}
          />
          <tbody>
            {checklistData.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="text-center py-3">
                  <div className="flex justify-center">
                    <button className="p-1 rounded hover:bg-gray-200">
                    </button>
                  </div>
                </td>
                <td className="py-3 px-4">{item.name}</td>
                <td className="py-3 px-4">{item.status}</td>
                <td className="py-3 px-4">{item.category}</td>
                <td className="py-3 px-4">{item.subcategory}</td>
                <td className="py-3 px-4">{item.associations}</td>
                <td className="text-center py-3 px-4">{item.questions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FitoutChecklists;