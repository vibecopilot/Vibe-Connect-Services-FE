import React, { useState, useEffect } from 'react';
import { FiEye, FiEdit,FiTrash2 } from 'react-icons/fi';
import TableHead from '../../components/TopHead';
import Pagination from '../../components/Pagination';
import IconButton from '../../components/IconButton';
import NoDataFound from '../../components/NoDataFound';
import TopSearch from '../../components/TopSearch';
import AddSubSubSubCategoryForm from '../../forms/Addsubsubsubcategoryform';
import TextInput from '../../components/TextInput';

const PAGE_SIZE = 5;

const initialData = [
  {
    id: 1,
    categoryType: 'Electrical Issues',
    subCategory: 'Power Outage',
    subSubCategory: 'Main switch failure',
    subSubSubCategory: 'Power Overload',
  },
  {
    id: 2,
    categoryType: 'Fire',
    subCategory: 'Negligent storage of flammables',
    subSubCategory: 'Leaky Containers',
    subSubSubCategory: 'Overfilling with flammables',
  },
];

const SubSubSubCategory: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [page, setPage] = useState(1);
  const [isSearchShown, setSearch] = useState(false);

  const [filters, setFilters] = useState({
    categoryType: '',
    subCategory: '',
    subSubCategory: '',
    subSubSubCategory: '',
  });

  useEffect(() => {
    const result = data.filter((item) =>
      item.categoryType.toLowerCase().includes(filters.categoryType.toLowerCase()) &&
      item.subCategory.toLowerCase().includes(filters.subCategory.toLowerCase()) &&
      item.subSubCategory.toLowerCase().includes(filters.subSubCategory.toLowerCase()) &&
      item.subSubSubCategory.toLowerCase().includes(filters.subSubSubCategory.toLowerCase())
    );
    setFilteredData(result);
    setPage(1);
  }, [filters, data]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const paginatedData = filteredData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const handleDelete = (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (!confirmed) return;
  
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };
  

  const columns = [
    { label: 'Action', align: 'center' as const },
    { label: 'Category Type', align: 'center' as const },
    { label: 'Sub Category', align: 'center' as const },
    { label: 'Sub Sub Category', align: 'center' as const },
    { label: 'Sub Sub Sub Category', align: 'center' as const },
  ];

  const handleTopButtonClick = (btn: string) => {
    if (btn === 'Add') setShowAddForm(true);
  };

  const handleSearchToggle = () => setSearch(!isSearchShown);

  const handleFormSubmit = (
    categoryType: string,
    subCategory: string,
    subSubCategory: string,
    subSubSubCategory: string
  ) => {
    const newItem = {
      id: data.length + 1,
      categoryType,
      subCategory,
      subSubCategory,
      subSubSubCategory,
    };
    setData((prev) => [...prev, newItem]);
    setShowAddForm(false);
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-sm text-gray-600" style={{ fontFamily: "'PT Sans', sans-serif" }}>
      <div className="flex justify-between items-center mb-2">
        <TopSearch
          searchActive={isSearchShown}
          onSearchToggle={handleSearchToggle}
          onButtonClick={handleTopButtonClick}
          buttons={['Add']}
        />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={filteredData.length}
          onPageChange={setPage}
        />
      </div>

      {showAddForm && (
        <AddSubSubSubCategoryForm
          onSubmit={handleFormSubmit}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto border border-collapse border-gray-300 text-sm">
          <TableHead columns={columns} />
          {isSearchShown && (
            <thead>
              <tr className="text-center">
                {columns.map((col, index) => (
                  <th key={index} className="border px-2 py-1">
                    {col.label !== 'Action' && (
                      <TextInput
                        name={col.label}
                        value={filters[col.label.replace(/\s/g, '') as keyof typeof filters] || ''}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            [col.label.replace(/\s/g, '')]: e.target.value,
                          }))
                        }
                        label=""
                        placeholder={`Search ${col.label}`}
                      />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 text-center">
                  <td className="border px-2 py-1 flex justify-center gap-2">
                    <IconButton tooltip="View">
                      <FiEye />
                    </IconButton>
                    <IconButton tooltip="Edit">
                      <FiEdit />
                    </IconButton>
                    <IconButton tooltip="Delete" onClick={() => handleDelete(item.id)}>
    <FiTrash2 />
  </IconButton>
                  </td>
                  <td className="border px-2 py-1">{item.categoryType}</td>
                  <td className="border px-2 py-1">{item.subCategory}</td>
                  <td className="border px-2 py-1">{item.subSubCategory}</td>
                  <td className="border px-2 py-1">{item.subSubSubCategory}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-4">
                  <NoDataFound />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubSubSubCategory;
