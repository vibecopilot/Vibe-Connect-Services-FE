import React, { useState, useEffect } from "react";
import { FiEdit, FiEye } from "react-icons/fi";
import { GrSort } from "react-icons/gr";
import TableHead from "../../components/TopHead";
import TopSearch from "../../components/TopSearch";
import IconButton from "../../components/IconButton";
import NoDataFound from "../../components/NoDataFound";
import Pagination from "../../components/Pagination";
import ClientForm from "../../forms/ClientForm";

const industries = ["Unknown", "IT", "Healthcare", "Finance", "Manufacturing", "Retail", "Education"];
const territories = ["Unknown", "North", "South", "East", "West", "Central"];

interface ClientItem {
  id: number;
  clientName: string;
  phone: string;
  email: string;
  industry: string;
  territory: string;
  addImage?: File | null;
  businessCard?: File | null;
  locationIdentifier: string;
  officeBuilding: string;
  addedOn?: Date;
  modifiedOn?: Date;
}

const Clients: React.FC = () => {
  const [searchFilters, setSearchFilters] = useState({
    clientName: "",
    phone: "",
    email: "",
    industry: "",
    territory: "",
  });

  const [data, setData] = useState<ClientItem[]>([]);
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [showSortCard, setShowSortCard] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState<Omit<ClientItem, "id">>({
    clientName: "",
    phone: "",
    email: "",
    industry: "",
    territory: "",
    addImage: null,
    businessCard: null,
    locationIdentifier: "",
    officeBuilding: "Interactive Map",
  });
  const [formErrors, setFormErrors] = useState<Partial<Omit<ClientItem, "id">>>({});
  const [editId, setEditId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isViewMode, setIsViewMode] = useState(false);
  const [sortFilters, setSortFilters] = useState({
    recent: {
      added: false,
      modified: false,
    },
    territory: {
      unknown: false,
    },
    industry: {
      unknown: false,
      it: false,
    },
  });
  const itemsPerPage = 5;

  useEffect(() => {
    setData([
      {
        id: 1,
        clientName: "Tech Solutions Inc",
        phone: "+1-555-0123",
        email: "contact@techsolutions.com",
        industry: "IT",
        territory: "North",
        locationIdentifier: "123 Tech Street, Silicon Valley, CA",
        officeBuilding: "Interactive Map",
        addedOn: new Date("2024-06-01"),
        modifiedOn: new Date("2024-06-05"),
      },
      {
        id: 2,
        clientName: "Healthcare Partners",
        phone: "+1-555-0456",
        email: "info@healthcarepartners.com",
        industry: "Healthcare",
        territory: "South",
        locationIdentifier: "456 Medical Center Dr, Houston, TX",
        officeBuilding: "Interactive Map",
        addedOn: new Date("2024-06-02"),
        modifiedOn: new Date("2024-06-06"),
      },
      {
        id: 3,
        clientName: "Finance Corp",
        phone: "+1-555-0789",
        email: "support@financecorp.com",
        industry: "Finance",
        territory: "East",
        locationIdentifier: "789 Wall Street, New York, NY",
        officeBuilding: "Interactive Map",
        addedOn: new Date("2024-06-03"),
        modifiedOn: new Date("2024-06-07"),
      },
      {
        id: 4,
        clientName: "Unknown Industries",
        phone: "+1-555-0321",
        email: "contact@unknown.com",
        industry: "Unknown",
        territory: "Unknown",
        locationIdentifier: "321 Mystery Lane, Unknown City",
        officeBuilding: "Interactive Map",
        addedOn: new Date("2024-06-04"),
        modifiedOn: new Date("2024-06-08"),
      },
      {
        id: 5,
        clientName: "Retail Giants",
        phone: "+1-555-0654",
        email: "hello@retailgiants.com",
        industry: "Retail",
        territory: "West",
        locationIdentifier: "654 Shopping Blvd, Los Angeles, CA",
        officeBuilding: "Interactive Map",
        addedOn: new Date("2024-06-05"),
        modifiedOn: new Date("2024-06-09"),
      },
    ]);
  }, []);

  const handleAddClick = () => {
    setFormData({
      clientName: "",
      phone: "",
      email: "",
      industry: "",
      territory: "",
      addImage: null,
      businessCard: null,
      locationIdentifier: "",
      officeBuilding: "Interactive Map",
    });
    setEditId(null);
    setFormErrors({});
    setIsViewMode(false);
    setIsFormVisible(true);
  };

  const handleView = (item: ClientItem) => {
    setFormData({
      clientName: item.clientName,
      phone: item.phone,
      email: item.email,
      industry: item.industry,
      territory: item.territory,
      addImage: item.addImage || null,
      businessCard: item.businessCard || null,
      locationIdentifier: item.locationIdentifier,
      officeBuilding: item.officeBuilding,
    });
    setEditId(item.id);
    setFormErrors({});
    setIsViewMode(true);
    setIsFormVisible(true);
  };

  const handleEdit = (item: ClientItem) => {
    setFormData({
      clientName: item.clientName,
      phone: item.phone,
      email: item.email,
      industry: item.industry,
      territory: item.territory,
      addImage: item.addImage || null,
      businessCard: item.businessCard || null,
      locationIdentifier: item.locationIdentifier,
      officeBuilding: item.officeBuilding,
    });
    setEditId(item.id);
    setFormErrors({});
    setIsViewMode(false);
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setFormErrors({});
    setEditId(null);
    setIsViewMode(false);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { target: { name: string; value: string | File | null } }
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (name: string, files: FileList | null) => {
    const file = files && files.length > 0 ? files[0] : null;
    setFormData((prev) => ({ ...prev, [name]: file }));
  };

  const validateForm = () => {
    const errors: Partial<Omit<ClientItem, "id">> = {};
    if (!formData.clientName.trim()) errors.clientName = "Client name is required.";
    if (!formData.phone.trim()) errors.phone = "Phone is required.";
    if (!formData.email.trim()) errors.email = "Email is required.";
    if (!formData.industry.trim()) errors.industry = "Industry is required.";
    if (!formData.territory.trim()) errors.territory = "Territory is required.";
    if (!formData.locationIdentifier.trim()) errors.locationIdentifier = "Location identifier is required.";
    return errors;
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (editId !== null) {
      setData((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...item, ...formData, modifiedOn: new Date() } : item
        )
      );
    } else {
      setData((prev) => [...prev, { 
        id: Date.now(), 
        ...formData, 
        addedOn: new Date(),
        modifiedOn: new Date()
      }]);
    }

    setFormData({
      clientName: "",
      phone: "",
      email: "",
      industry: "",
      territory: "",
      addImage: null,
      businessCard: null,
      locationIdentifier: "",
      officeBuilding: "Interactive Map",
    });
    setEditId(null);
    setFormErrors({});
    setIsFormVisible(false);
    setIsViewMode(false);
  };

  const handleFilterChange = (key: keyof typeof searchFilters, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [key]: value }));
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
    let filtered = data.filter((item) =>
      Object.entries(searchFilters).every(([key, val]) => {
        return item[key as keyof typeof searchFilters]?.toString().toLowerCase().includes(val.toLowerCase());
      })
    );

    // Apply sort filters
    if (sortFilters.territory.unknown) {
      filtered = filtered.filter(item => item.territory === "Unknown");
    }

    if (sortFilters.industry.unknown) {
      filtered = filtered.filter(item => item.industry === "Unknown");
    }

    if (sortFilters.industry.it) {
      filtered = filtered.filter(item => item.industry === "IT");
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
    { label: "Actions", align: "center" },
    { label: "Client Name" },
    { label: "Phone" },
    { label: "Email" },
    { label: "Industry" },
    { label: "Territory" },
  ];

  const handleHeatMapClick = () => {
    // Heat map functionality to be implemented
    console.log("Heat Map clicked");
  };

  // If form is visible, show only the form (new page effect)
  if (isFormVisible) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <ClientForm
          formData={formData}
          onChange={handleFormChange}
          onFileChange={handleFileChange}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          errors={formErrors}
          isEditing={editId !== null && !isViewMode}
          isViewMode={isViewMode}
        />
      </div>
    );
  }

  return (
    <div className="p-4 bg-white">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            {/* TopSearch without buttons */}
            <TopSearch
              onSearch={() => setShowFilterRow((prev) => !prev)}
              onButtonClick={() => {}} // Empty function since we're not using buttons
              buttons={[]} // Empty array for no buttons
            />
            
            {/* Sort Icon next to search */}
            <IconButton 
              tooltip="Sort" 
              className="hover:text-blue-600 relative text-2xl text-gray-400 cursor-pointer -ml-5 -mt-4" 
              onClick={() => setShowSortCard((prev) => !prev)}
            >
              <GrSort />
            </IconButton>
            
            {/* Separate Add Client Button */}
            <button
              onClick={handleAddClick}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200 -mt-4"
            >
              Add Clients
            </button>
            
            {/* Heat Map Button */}
            <button
              onClick={handleHeatMapClick}
              className="bg-white text-[#5E5E5E] px-3 py-2 rounded-md border border-[#9E9E9E] transition cursor-pointer -mt-4"
            >
              Heat Map
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
            <h3 className="font-semibold text-gray-800 mb-2">Territory</h3>
            <hr className="border-gray-200 mb-3" />
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={sortFilters.territory.unknown}
                onChange={(e) => handleSortFilterChange('territory', 'unknown', e.target.checked)}
                className="mr-2"
              />
              Unknown
            </label>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">Industry</h3>
            <hr className="border-gray-200 mb-3" />
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={sortFilters.industry.unknown}
                  onChange={(e) => handleSortFilterChange('industry', 'unknown', e.target.checked)}
                  className="mr-2"
                />
                Unknown
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={sortFilters.industry.it}
                  onChange={(e) => handleSortFilterChange('industry', 'it', e.target.checked)}
                  className="mr-2"
                />
                IT
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
                {Object.entries(searchFilters).map(([key, val]) => (
                  <td className="p-2 border-b border-gray-400" key={key}>
                    {["industry", "territory"].includes(key) ? (
                      <select
                        value={val}
                        onChange={(e) => handleFilterChange(key as keyof typeof searchFilters, e.target.value)}
                        className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                      >
                        <option value="">All</option>
                        {(key === "industry" ? industries : territories).map((item) => (
                          <option key={item} value={item}>{item}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        value={val}
                        onChange={(e) => handleFilterChange(key as keyof typeof searchFilters, e.target.value)}
                        placeholder={`Search ${key}`}
                        type={key === "email" ? "email" : "text"}
                        className="w-full px-2 py-1 text-sm border rounded border-gray-300"
                      />
                    )}
                  </td>
                ))}
              </tr>
            )}

            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b border-gray-400 text-center space-x-3">
                    <IconButton tooltip="View" className="hover:text-blue-600" onClick={() => handleView(item)}>
                      <FiEye />
                    </IconButton>
                    <IconButton tooltip="Edit" className="hover:text-green-600" onClick={() => handleEdit(item)}>
                      <FiEdit />
                    </IconButton>
                  </td>
                  <td className="p-3 border-b border-gray-400">{item.clientName}</td>
                  <td className="p-3 border-b border-gray-400">{item.phone}</td>
                  <td className="p-3 border-b border-gray-400 text-blue-600">{item.email}</td>
                  <td className="p-3 border-b border-gray-400">{item.industry}</td>
                  <td className="p-3 border-b border-gray-400">{item.territory}</td>
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

export default Clients;