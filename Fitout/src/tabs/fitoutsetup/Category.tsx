import React, { useState, useMemo } from 'react';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import TopSearch from '../../components/TopSearch';
import { FiEdit } from 'react-icons/fi';
import TopHead from '../../components/TopHead';

interface CategoryRow {
  category: string;
  bhk2: number;
  bhk3: number;
  bhk4: number;
  flatRK: number;
  flat1RK: number;
  bhk2Small: number;
}

const Category: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState<CategoryRow[]>([
    {
      category: 'Fitout',
      bhk2: 75000,
      bhk3: 100000,
      bhk4: 30,
      flatRK: 0,
      flat1RK: 0,
      bhk2Small: 0,
    },
  ]);
  const [filters, setFilters] = useState({
    category: '',
    bhk2: '',
    bhk3: '',
    bhk4: '',
    flatRK: '',
    flat1RK: '',
    bhk2Small: '',
  });
  const [showAddInput, setShowAddInput] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const handleAdd = () => {
    setShowAddInput(true);
  };

  const handleConfirmAdd = () => {
    if (newCategory.trim()) {
      setCategories([
        ...categories,
        {
          category: newCategory,
          bhk2: 0,
          bhk3: 0,
          bhk4: 0,
          flatRK: 0,
          flat1RK: 0,
          bhk2Small: 0,
        },
      ]);
      setNewCategory('');
      setShowAddInput(false);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleConfirmAdd();
    } else if (e.key === 'Escape') {
      setShowAddInput(false);
      setNewCategory('');
    }
  };

  const columns = [
    { label: 'Action', align: 'center' as const },
    { label: 'Category', align: 'center' as const },
    { label: '2BHK', align: 'center' as const },
    { label: '3BHK', align: 'center' as const },
    { label: '4BHK', align: 'center' as const },
    { label: 'Flat RK', align: 'center' as const },
    { label: 'Flat 1 RK', align: 'center' as const },
    { label: '2 BHK Small', align: 'center' as const },
  ];

  const filtered = useMemo(() => {
    return categories.filter((row) =>
      Object.entries(filters).every(([key, value]) => {
        if (!value.trim()) return true;
        return row[key as keyof CategoryRow]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      })
    );
  }, [filters, categories]);

  return (
    <div
      className="flex flex-col gap-4 text-gray-700"
      style={{ fontFamily: "'PT Sans', sans-serif" }}
    >
      {/* TopSearch with Add Input */}
      <TopSearch
        onSearch={() => setShowFilters((prev) => !prev)}
        onButtonClick={(type) => {
          if (type === 'Add') handleAdd();
        }}
        buttons={[]}
      >
        {showAddInput && (
          <div className="flex items-center gap-2 ml-2">
            <TextInput
              name="new-category"
              label=""
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Enter your category name"
              className="w-56"
            />
            <Button label="Add" variant="gray-outline" onClick={handleConfirmAdd} />
          </div>
        )}
        {!showAddInput && (
          <Button label="Add" variant="gray-outline" onClick={handleAdd} className="ml-2" />
        )}
      </TopSearch>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 border-collapse text-sm text-center rounded-md">
          <TopHead columns={columns} />
          <thead className="border border-gray-300 px-2 py-1"
>
            {showFilters && (
              <tr className="bg-gray-50">
                <td className="px-2 py-1" />
                {Object.entries(filters).map(([key, value]) => (
                  <td key={key} className="px-2 py-1">
                    <TextInput
                      name={key}
                      label=""
                      value={value}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      placeholder="Search"
                      className="w-full text-center"
                    />
                  </td>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((row, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2">
                    <FiEdit className="inline text-gray-500" />
                  </td>
                  <td className="px-4 py-2">{row.category}</td>
                  <td className="px-4 py-2">{row.bhk2}</td>
                  <td className="px-4 py-2">{row.bhk3}</td>
                  <td className="px-4 py-2">{row.bhk4}</td>
                  <td className="px-4 py-2">{row.flatRK}</td>
                  <td className="px-4 py-2">{row.flat1RK}</td>
                  <td className="px-4 py-2">{row.bhk2Small}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-4 text-gray-400">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* <div className="mt-4 self-end">
        <Button label="Add Category" variant="gray-outline" onClick={handleAdd} />
      </div> */}
    </div>
  );
};

export default Category;
