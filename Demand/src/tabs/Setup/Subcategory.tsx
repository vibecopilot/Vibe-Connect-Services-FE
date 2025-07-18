import React, { useState } from 'react';
import { Card } from '../../components/Card';
import TopHead from '../../components/TopHead';
import IconButton from '../../components/IconButton';
import Pagination from '../../components/Pagination';
import { FiEdit, FiTrash } from 'react-icons/fi';

type SubCategoryProps = {
  categories: string[];
  subCategories: string[];
  setSubCategories: React.Dispatch<React.SetStateAction<string[]>>;
};
const SubCategory: React.FC<SubCategoryProps> = ({
  categories,
  subCategories,
  setSubCategories,
}) => {
  const [subCategory, setSubCategory] = useState('');
  const [description, setDescription] = useState('');
  const [prices, setPrices] = useState({
    '1 BHK': '',
    '2 BHK': '',
    '1 BHK RK': '',
    '2 BHK RK': '',
    '2 BHK Terrace BHK': '',
    '1 Price': '',
  });
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [selectedCategory, setSelectedCategory] = useState('');

  const handlePriceChange = (key: string, value: string) => {
    setPrices(prev => ({ ...prev, [key]: value }));
  };

  const handleAdd = () => {
    if (selectedCategory && subCategory) {
      setData([
        ...data,
        {
          category: selectedCategory,
          subCategory,
          description,
          ...prices,
        },
      ]);
      setSelectedCategory(''); // Reset after add
      setSubCategory('');
      setDescription('');
      setPrices({
        '1 BHK': '',
        '2 BHK': '',
        '1 BHK RK': '',
        '2 BHK RK': '',
        '2 BHK Terrace BHK': '',
        '1 Price': '',
      });
    }
  };

  const handleDelete = (idx: number) => {
    setData(data.filter((_, i) => i !== idx));
  };

  const columns = [
    { label: 'Action', align: 'left' as const },
    { label: 'S.No.', align: 'left' as const },
    { label: 'Category', align: 'left' as const },
    { label: 'Sub Category', align: 'left' as const },
    { label: '1 BHK (INR)', align: 'left' as const },
    { label: '2 BHK (INR)', align: 'left' as const },
    { label: '1 BHK RK (INR)', align: 'left' as const },
    { label: '2 BHK RK (INR)', align: 'left' as const },
    { label: '1 (INR)', align: 'left' as const },
  ];

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Card className="p-4">
      {/* Input Row */}
      <div className="flex gap-2 mb-2">
        <select
          className="border rounded px-2 py-1 text-sm"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          className="border rounded px-2 py-1 text-sm"
          placeholder="Enter Sub Category"
          value={subCategory}
          onChange={e => setSubCategory(e.target.value)}
        />
        <input
          className="border rounded px-2 py-1 text-sm"
          placeholder="Enter Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button
          className="bg-[#7991BB] px-4 py-2  text-white"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
      {/* Price Inputs */}
      <div className="grid grid-cols-3 gap-2 mb-2">
        <input
          className="border rounded px-2 py-1 text-sm"
          placeholder="1 BHK Price"
          value={prices['1 BHK']}
          onChange={e => handlePriceChange('1 BHK', e.target.value)}
        />
        <input
          className="border rounded px-2 py-1 text-sm"
          placeholder="2 BHK Price"
          value={prices['2 BHK']}
          onChange={e => handlePriceChange('2 BHK', e.target.value)}
        />
        <input
          className="border rounded px-2 py-1 text-sm"
          placeholder="1 BHK RK Price"
          value={prices['1 BHK RK']}
          onChange={e => handlePriceChange('1 BHK RK', e.target.value)}
        />
        <input
          className="border rounded px-2 py-1 text-sm"
          placeholder="2 BHK RK Price"
          value={prices['2 BHK RK']}
          onChange={e => handlePriceChange('2 BHK RK', e.target.value)}
        />
        <input
          className="border rounded px-2 py-1 text-sm"
          placeholder="2 BHK Terrace BHK Price"
          value={prices['2 BHK Terrace BHK']}
          onChange={e => handlePriceChange('2 BHK Terrace BHK', e.target.value)}
        />
        <input
          className="border rounded px-2 py-1 text-sm"
          placeholder="1 Price"
          value={prices['1 Price']}
          onChange={e => handlePriceChange('1 Price', e.target.value)}
        />
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-gray text-sm">
          <TopHead columns={columns} />
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-8">
                  No Data Found
                </td>
              </tr>
            ) : (
              paginatedData.map((row, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-2 py-1 flex gap-2">
                    <IconButton tooltip="Edit">
                      <FiEdit size={16} />
                    </IconButton>
                    <IconButton tooltip="Delete" onClick={() => handleDelete((currentPage - 1) * itemsPerPage + idx)}>
                      <FiTrash size={16} />
                    </IconButton>
                  </td>
                  <td className="px-2 py-1">{(currentPage - 1) * itemsPerPage + idx + 1}.</td>
                  <td className="px-2 py-1">{row.category}</td>
                  <td className="px-2 py-1">{row.subCategory}</td>
                  <td className="px-2 py-1">{row['1 BHK']}</td>
                  <td className="px-2 py-1">{row['2 BHK']}</td>
                  <td className="px-2 py-1">{row['1 BHK RK']}</td>
                  <td className="px-2 py-1">{row['2 BHK RK']}</td>
                  <td className="px-2 py-1">{row['1 Price']}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="mt-2 flex justify-end">
        {/* <Pagination
          currentPage={currentPage}
          totalPages={Math.max(1, Math.ceil(data.length / itemsPerPage))}
          totalItems={data.length}
          onPageChange={setCurrentPage}
        /> */}
      </div>
    </Card>
  );
};

export default SubCategory;
