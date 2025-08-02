import React, { useState, useEffect } from "react";
import { FiEye, FiEdit,FiTrash2 } from "react-icons/fi";

import TableHead from "../../components/TopHead";
import Pagination from "../../components/Pagination";
import IconButton from "../../components/IconButton";
import NoDataFound from "../../components/NoDataFound";
import TopSearch from "../../components/TopSearch";
import AddSubCategoryForm from "../../forms/Addsubcategoryform";
import { useCategoryContext } from "../../context/Categorycontext";

const PAGE_SIZE = 5;

const initialData = [
  { id: 1, categoryType: "Electrical Issues", subCategory: "Power Outage" },
  { id: 2, categoryType: "Fire", subCategory: "Negligent storage of flammables" },
];

const SubCategory: React.FC = () => {
  const { categories } = useCategoryContext();
  const [subCategories, setSubCategories] = useState<
    { id: number; categoryType: string; subCategory: string }[]
  >([]);
  const [filteredData, setFilteredData] = useState(initialData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [page, setPage] = useState(1);
  const [isSearchShown, setSearch] = useState(false);

  const [filterValues, setFilterValues] = useState({
    categoryType: "",
    subCategory: "",
  });

  const handleDelete = (categoryType: string, subCategory: string) => {
    const updated = subCategories.filter(
      (item) =>
        !(item.categoryType === categoryType && item.subCategory === subCategory)
    );
    setSubCategories(updated);
  };

  useEffect(() => {
    const result = subCategories.filter(
      (item) =>
        item.categoryType.toLowerCase().includes(filterValues.categoryType.toLowerCase()) &&
        item.subCategory.toLowerCase().includes(filterValues.subCategory.toLowerCase())
    );
    setFilteredData(result);
    setPage(1);
  }, [filterValues, subCategories]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const paginated = filteredData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleAddSubmit = (categoryType: string, subCategory: string) => {
    const exists = subCategories.some(
      (item) =>
        item.categoryType.toLowerCase() === categoryType.toLowerCase() &&
        item.subCategory.toLowerCase() === subCategory.toLowerCase()
    );
    if (exists) {
      alert("Sub Category already exists!");
      return;
    }

    const newItem = {
      id: subCategories.length + 1,
      categoryType,
      subCategory,
    };
    setSubCategories((prev) => [...prev, newItem]);
    setShowAddForm(false);
    setFilterValues({ categoryType: "", subCategory: "" });
  };

  const handleTopButtonClick = (btn: string) => {
    if (btn === "Add") {
      setShowAddForm(true);
    }
  };

  const handleSearchToggle = () => {
    setSearch(!isSearchShown);
  };

  const columns = [
    { label: "Action", key: "action" },
    { label: "Category Type", key: "categoryType" },
    { label: "Sub Category", key: "subCategory" },
  ];

  // Build a map: categoryType -> [subcategories]
  const subCatMap = subCategories.reduce((acc, curr) => {
    if (!acc[curr.categoryType]) acc[curr.categoryType] = [];
    acc[curr.categoryType].push(curr.subCategory);
    return acc;
  }, {} as Record<string, string[]>);

  // For table rows:
  const rows = categories.flatMap((cat) => {
    const subs = subCatMap[cat.type] || [];
    if (subs.length === 0) {
      // No subcategories: show row with empty subcategory
      return [{
        categoryType: cat.type,
        subCategory: "",
      }];
    }
    // One row per subcategory
    return subs.map((sub) => ({
      categoryType: cat.type,
      subCategory: sub,
    }));
  });

  return (
    <div
      className="p-4 bg-white rounded-md shadow-sm text-gray-600 font-sans"
      style={{ fontFamily: "'PT Sans', sans-serif" }}
    >
      {/* Top controls with Pagination on right */}
      <div className="flex justify-between items-center mb-2">
        <TopSearch
          searchActive={isSearchShown}
          onSearchToggle={handleSearchToggle}
          onButtonClick={handleTopButtonClick}
          buttons={["Add"]}
        />
        <div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={filteredData.length}
            onPageChange={setPage}
          />
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <AddSubCategoryForm
          onSubmit={handleAddSubmit}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Table */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto border border-collapse border-gray-300 text-base text-gray-600 font-sans">
          <TableHead columns={columns} />
          <thead>
            {isSearchShown && (
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="px-2 py-1 border-b">
                    {col.key === "categoryType" || col.key === "subCategory" ? (
                      <input
                        type="text"
                        name={col.key}
                        value={filterValues[col.key as keyof typeof filterValues] || ""}
                        onChange={(e) =>
                          setFilterValues((prev) => ({
                            ...prev,
                            [col.key]: e.target.value,
                          }))
                        }
                        placeholder={`Search ${col.label}`}
                        className="h-10 px-3 text-base rounded border border-gray-300 w-full text-gray-600"
                        style={{ fontFamily: "'PT Sans', sans-serif" }}
                      />
                    ) : null}
                  </th>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((item, idx) => (
                <tr key={item.categoryType + item.subCategory + idx} className="hover:bg-gray-50 text-center">
                  <td className="border px-2 py-1 flex justify-center gap-2">
                    <IconButton tooltip="View"><FiEye /></IconButton>
                    <IconButton tooltip="Edit"><FiEdit /></IconButton>
                    <IconButton
    tooltip="Delete"
    onClick={() => handleDelete(item.categoryType, item.subCategory)}
  >
    <FiTrash2 />
  </IconButton>
                  </td>
                  <td className="border px-2 py-1">{item.categoryType}</td>
                  <td className="border px-2 py-1">{item.subCategory || <i>No Subcategory</i>}</td>
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

export default SubCategory;
