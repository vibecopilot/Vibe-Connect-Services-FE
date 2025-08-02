import React, { useState, useEffect } from "react";
import { FiEdit, FiSearch, FiPlus } from "react-icons/fi";
import { GrSort } from "react-icons/gr";
import TableHead from "../../components/TopHead";
import IconButton from "../../components/IconButton";
import NoDataFound from "../../components/NoDataFound";
import Pagination from "../../components/Pagination";
import MOMListForm from "../../forms/MOMListForm";

interface MOMItem {
  id: number;
  title: string;
  dateOfMeeting: Date;
  tag: string;
  tasks: string;
  raisedBy: string;
  attendees: string[];
  addedOn?: Date;
  modifiedOn?: Date;
}

interface MOMListProps {
  onModalStateChange?: (isOpen: boolean) => void;
}

const MOMList: React.FC<MOMListProps> = () => {
  const [searchFilters, setSearchFilters] = useState({
    title: "",
    tag: "",
    tasks: "",
    raisedBy: "",
    attendees: "",
    dateOfMeeting: "",
  });

  const [data, setData] = useState<MOMItem[]>([]);
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [showSortCard, setShowSortCard] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState<Omit<MOMItem, "id">>({
    title: "",
    dateOfMeeting: null,
    tag: "",
    tasks: "",
    raisedBy: "",
    attendees: [],
  });
  const [formErrors, setFormErrors] = useState<Partial<Omit<MOMItem, "id">>>({});
  const [editId, setEditId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [sortFilters, setSortFilters] = useState({
    recent: {
      added: false,
      modified: false,
    },
    tag: {
      high: false,
      medium: false,
      low: false,
    },
  });
  const itemsPerPage = 5;

  useEffect(() => {
    setData([
      {
        id: 1,
        title: "Project Kickoff Meeting",
        dateOfMeeting: new Date("2025-07-04"),
        tag: "High",
        tasks: "Setup development environment, Define project scope",
        raisedBy: "John Smith",
        attendees: ["Alice Johnson", "Bob Wilson", "Carol Davis"],
        addedOn: new Date("2025-07-01"),
        modifiedOn: new Date("2025-07-02"),
      },
      {
        id: 2,
        title: "Weekly Sprint Review",
        dateOfMeeting: new Date("2025-07-08"),
        tag: "Medium",
        tasks: "Review completed features, Plan next sprint",
        raisedBy: "Sarah Johnson",
        attendees: ["Mike Brown", "Emma Taylor"],
        addedOn: new Date("2025-07-05"),
        modifiedOn: new Date("2025-07-06"),
      },
      {
        id: 3,
        title: "Client Requirements Discussion",
        dateOfMeeting: new Date("2025-07-12"),
        tag: "High",
        tasks: "Gather client feedback, Update requirements doc",
        raisedBy: "Michael Brown",
        attendees: ["Client Rep 1", "Client Rep 2", "Project Manager"],
        addedOn: new Date("2025-07-09"),
        modifiedOn: new Date("2025-07-10"),
      },
    ]);
  }, []);


  const handleAddClick = () => {
    setFormData({
      title: "",
      dateOfMeeting: null,
      tag: "",
      tasks: "",
      raisedBy: "",
      attendees: [],
    });
    setEditId(null);
    setFormErrors({});
    
    setIsFormVisible(true);
  };

  const handleEdit = (item: MOMItem) => {
  setFormData({
    title: item.title,
    dateOfMeeting: item.dateOfMeeting,
    tag: item.tag,
    tasks: item.tasks,
    raisedBy: item.raisedBy,
    attendees: item.attendees,
  });
  setEditId(item.id);
  setFormErrors({});
  
  setIsFormVisible(true);
};

  const handleCancel = () => {
    setIsFormVisible(false);
    setFormErrors({});
    setEditId(null);
    
  };

  const handleFormChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { target: { name: string; value: any } }
) => {
  if (e.target.name === 'consolidatedData') {
    // Handle the consolidated data from MOMListForm
    setFormData(prev => ({
      ...prev,
      ...e.target.value
    }));
  } else {
    // Handle individual field changes (for backward compatibility)
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }
};

  const validateForm = () => {
  const errors: Partial<Omit<MOMItem, "id">> = {};
  if (!formData.title.trim()) errors.title = "Title is required.";
  if (!formData.tag.trim()) errors.tag = "Tag is required.";
  if (
    !formData.dateOfMeeting ||
    isNaN(new Date(formData.dateOfMeeting).getTime())
  ) {
    errors.dateOfMeeting = "Date of Meeting is required.";
  }
  return errors;
};

  const handleFormSubmit = (submissionData: any) => {
  const errors = validateForm();
  if (Object.keys(errors).length > 0) {
    setFormErrors(errors);
    return;
  }

  if (editId !== null) {
    // Update existing item
    setData(prev => 
      prev.map(item => 
        item.id === editId ? { 
          ...item, 
          ...submissionData,
          modifiedOn: new Date() 
        } : item
      )
    );
  } else {
    // Add new item
    setData(prev => [...prev, {
      id: Date.now(),
      ...submissionData,
      addedOn: new Date(),
      modifiedOn: new Date()
    }]);
  }

  // Close the form and reset states
  setIsFormVisible(false);
  setEditId(null);
  setFormErrors({});
};

const handleSaveAndCreateNew = (submissionData: any) => {
  const errors = validateForm();
  if (Object.keys(errors).length > 0) {
    setFormErrors(errors);
    return;
  }

  // Add new item
  setData(prev => [...prev, {
    id: Date.now(),
    ...submissionData,
    addedOn: new Date(),
    modifiedOn: new Date()
  }]);

  // Keep the form open but reset errors
  setFormErrors({});
};


  const handleFilterChange = (key: keyof typeof searchFilters, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleDateFilterChange = (date: Date | null) => {
    const dateString = date ? date.toLocaleDateString('en-GB') : '';
    setSearchFilters((prev) => ({ ...prev, dateOfMeeting: dateString }));
  };

  const handleSortFilterChange = (category: string, key: string, checked: boolean) => {
    setSortFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: checked,
      },
    }));
  };

  const getFilteredData = () => {
    let filtered = data.filter((item) => {
      const attendeesString = item.attendees.join(", ");
      const itemDateString = item.dateOfMeeting.toLocaleDateString('en-GB');
      
      return (
        item.title.toLowerCase().includes(searchFilters.title.toLowerCase()) &&
        item.tag.toLowerCase().includes(searchFilters.tag.toLowerCase()) &&
        item.tasks.toLowerCase().includes(searchFilters.tasks.toLowerCase()) &&
        item.raisedBy.toLowerCase().includes(searchFilters.raisedBy.toLowerCase()) &&
        attendeesString.toLowerCase().includes(searchFilters.attendees.toLowerCase()) &&
        itemDateString.includes(searchFilters.dateOfMeeting)
      );
    });

    // Apply sort filters
    if (sortFilters.tag.high) {
      filtered = filtered.filter(item => item.tag === "High");
    }
    if (sortFilters.tag.medium) {
      filtered = filtered.filter(item => item.tag === "Medium");
    }
    if (sortFilters.tag.low) {
      filtered = filtered.filter(item => item.tag === "Low");
    }

    // Sort by recent if selected
    if (sortFilters.recent.added || sortFilters.recent.modified) {
      filtered = filtered.sort((a, b) => {
        if (sortFilters.recent.added && a.addedOn && b.addedOn) {
          return b.addedOn.getTime() - a.addedOn.getTime();
        }
        if (sortFilters.recent.modified && a.modifiedOn && b.modifiedOn) {
          return b.modifiedOn.getTime() - a.modifiedOn.getTime();
        }
        return 0;
      });
    }

    return filtered;
  };

  const filteredData = getFilteredData();

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { label: "Action", align: "center" },
    { label: "Title" },
    { label: "Date of Meeting" },
    { label: "Tag" },
    { label: "Tasks", align: "center" },
    { label: "Raised By" },
    { label: "Attendees", align: "center" },
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (isFormVisible) {
  return (
    <MOMListForm
      formData={editId !== null ? 
        // For editing, pass the existing data
        data.find(item => item.id === editId) || formData : 
        // For new entries, pass the empty form data
        formData
      }
      onChange={handleFormChange}
      onSubmit={handleFormSubmit}
      onCancel={handleCancel}
      onSaveAndCreateNew={handleSaveAndCreateNew}
      errors={formErrors}
      isEditing={editId !== null}
    />
  );
}

  return (
    <div className="p-4 bg-white">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            {/* Search Icon */}
            <button
              onClick={() => setShowFilterRow((prev) => !prev)}
              className="p-2 text-gray-600 hover:text-blue-600"
            >
              <FiSearch size={25} />
            </button>

            {/* Sort Icon */}
            <IconButton
              tooltip="Sort"
              className="hover:text-blue-600 relative mr-2 text-xl text-gray-400 cursor-pointer"
              onClick={() => setShowSortCard((prev) => !prev)}
            >
              <GrSort size={20} />
            </IconButton>

            {/* Add Button */}
            <button
              onClick={handleAddClick}
              className="bg-white text-[#5E5E5E] px-3 py-2 rounded-md border border-[#9E9E9E] transition cursor-pointer flex items-center space-x-2"
            >
              <FiPlus size={18} />
              <span>Add</span>
            </button>
          </div>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredData.length / itemsPerPage)}
          totalItems={filteredData.length}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Sort Card */}
      {showSortCard && (
        <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg p-4 w-64">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">Recent</h3>
            <hr className="border-gray-200 mb-3" />
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={sortFilters.recent.added}
                  onChange={(e) => handleSortFilterChange('recent', 'added', e.target.checked)}
                  className="mr-2"
                />
                Added
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={sortFilters.recent.modified}
                  onChange={(e) => handleSortFilterChange('recent', 'modified', e.target.checked)}
                  className="mr-2"
                />
                Modified
              </label>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">Tag</h3>
            <hr className="border-gray-200 mb-3" />
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={sortFilters.tag.high}
                  onChange={(e) => handleSortFilterChange('tag', 'high', e.target.checked)}
                  className="mr-2"
                />
                High
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={sortFilters.tag.medium}
                  onChange={(e) => handleSortFilterChange('tag', 'medium', e.target.checked)}
                  className="mr-2"
                />
                Medium
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={sortFilters.tag.low}
                  onChange={(e) => handleSortFilterChange('tag', 'low', e.target.checked)}
                  className="mr-2"
                />
                Low
              </label>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto">
          <TableHead columns={columns} />
          <tbody>
            {showFilterRow && (
              <tr>
                <td className="p-2 border-b border-gray-400 text-center" />
                <td className="p-2 border-b border-gray-400">
                  <input
                    value={searchFilters.title}
                    onChange={(e) => handleFilterChange('title', e.target.value)}
                    placeholder="Search title"
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  />
                </td>
                <td className="p-2 border-b border-gray-400">
                  <input
                    type="date"
                    value={searchFilters.dateOfMeeting ? new Date(searchFilters.dateOfMeeting.split('/').reverse().join('-')).toISOString().split('T')[0] : ''}
                    onChange={(e) => {
                      const date = e.target.value ? new Date(e.target.value) : null;
                      handleDateFilterChange(date);
                    }}
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  />
                </td>
                <td className="p-2 border-b border-gray-400">
                  <input
                    value={searchFilters.tag}
                    onChange={(e) => handleFilterChange('tag', e.target.value)}
                    placeholder="Search tag"
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  />
                </td>
                <td className="p-2 border-b border-gray-400">
                  <input
                    value={searchFilters.tasks}
                    onChange={(e) => handleFilterChange('tasks', e.target.value)}
                    placeholder="Search tasks"
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  />
                </td>
                <td className="p-2 border-b border-gray-400">
                  <input
                    value={searchFilters.raisedBy}
                    onChange={(e) => handleFilterChange('raisedBy', e.target.value)}
                    placeholder="Search raised by"
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  />
                </td>
                <td className="p-2 border-b border-gray-400">
                  <input
                    value={searchFilters.attendees}
                    onChange={(e) => handleFilterChange('attendees', e.target.value)}
                    placeholder="Search attendees"
                    className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                  />
                </td>
              </tr>
            )}

            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b border-gray-400 text-center">
                    <IconButton tooltip="Edit" className="hover:text-green-600" onClick={() => handleEdit(item)}>
                      <FiEdit />
                    </IconButton>
                  </td>
                  <td className="p-3 border-b border-gray-400 text-[#5e5e5e]">{item.title}</td>
                  <td className="p-3 border-b border-gray-400 text-[#5e5e5e]">{formatDate(item.dateOfMeeting)}</td>
                  <td className="p-3 border-b border-gray-400 text-[#5e5e5e]">{item.tag}</td>
                  <td className="p-3 border-b border-gray-400 text-[#5e5e5e]">{item.tasks}</td>
                  <td className="p-3 border-b border-gray-400 text-[#5e5e5e]">{item.raisedBy}</td>
                  <td className="p-3 border-b border-gray-400 text-[#5e5e5e]">{item.attendees.join(", ")}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-4 text-gray-500">
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

export default MOMList;