import React, { useState, useEffect } from 'react';
import { FiEye, FiEdit ,FiTrash2 } from 'react-icons/fi';
import TableHead from '../../components/TopHead';
import Pagination from '../../components/Pagination';
import IconButton from '../../components/IconButton';
import NoDataFound from '../../components/NoDataFound';
import AddSubSubCategoryForm from '../../forms/Addsubsubcategoryform';
import TopSearch from '../../components/TopSearch';
import TextInput from '../../components/TextInput';

const PAGE_SIZE = 5;

const initialData = [
  {
    id: 1,
    categoryType: 'Electrical Issues',
    subCategory: 'Power Outage',
    subSubCategory: 'Main switch failure',
  },
  {
    id: 2,
    categoryType: 'Fire',
    subCategory: 'Negligent storage of flammables',
    subSubCategory: 'Leaky Containers',
  },
];

const SubSubCategory: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [page, setPage] = useState(1);
  const [isSearchShown, setSearch] = useState(false);
  const [searchCategoryType, setSearchCategoryType] = useState('');
  const [searchSubCategory, setSearchSubCategory] = useState('');

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const paginatedData = filteredData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const columns = [
    { label: 'Action', align: 'center' as const },
    { label: 'Category Type', align: 'center' as const },
    { label: 'Sub Category', align: 'center' as const },
    { label: 'Sub Sub Category', align: 'center' as const },
  ];

  useEffect(() => {
    const result = data.filter((item) =>
      item.categoryType.toLowerCase().includes(searchCategoryType.toLowerCase()) &&
      item.subCategory.toLowerCase().includes(searchSubCategory.toLowerCase())
    );
    setFilteredData(result);
    setPage(1);
  }, [searchCategoryType, searchSubCategory, data]);

  const handleFormSubmit = (
    categoryType: string,
    subCategory: string,
    subSubCategory: string
  ) => {
    const newItem = {
      id: data.length + 1,
      categoryType,
      subCategory,
      subSubCategory,
    };
    setData((prev) => [...prev, newItem]);
    setShowAddForm(false);
  };

  const handleTopButtonClick = (btn: string) => {
    if (btn === 'Add') {
      setShowAddForm(true);
    }
  };

  const handleSearchToggle = () => {
    setSearch(!isSearchShown);
  };
  const handleDelete = (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (!confirmed) return;
  
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-sm text-gray-600" style={{ fontFamily: "'PT Sans', sans-serif" }}>
      {/* Top row: Search and Add + Pagination */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
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

      {/* Add Form */}
      {showAddForm && (
        <AddSubSubCategoryForm
          onSubmit={handleFormSubmit}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Table */}
      <div className="overflow-x-auto" style={{ fontFamily: "'PT Sans', sans-serif" }}>
        <table className="min-w-full table-auto border text-sm border-collapse border-gray-300">
          <TableHead columns={columns} />
          {isSearchShown && (
            <thead>
              <tr className="text-center">
                <td className="border px-2 py-1" />
                <td className="border px-2 py-1">
                  <TextInput
                    name="categoryTypeSearch"
                    value={searchCategoryType}
                    onChange={(e) => setSearchCategoryType(e.target.value)}
                    label=""
                    placeholder="Search Category Type"
                  />
                </td>
                <td className="border px-2 py-1">
                  <TextInput
                    name="subCategorySearch"
                    value={searchSubCategory}
                    onChange={(e) => setSearchSubCategory(e.target.value)}
                    label=""
                    placeholder="Search Sub Category"
                  />
                </td>
                <td className="border px-2 py-1" />
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

export default SubSubCategory;
