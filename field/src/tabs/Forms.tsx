import React, { useState } from "react";
import { Search, Plus, Eye, Edit } from "lucide-react";
import TableHead from "../components/TopHead";

// Types
interface FormField {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  mandatory: boolean;
  editable: boolean;
}

interface FormData {
  fieldName: string;
  relatedTo: string;
  assignDepartments: string;
  whereToFill: string;
  submitButtonCaption: string;
  active: boolean;
  mobileOnly: boolean;
  activateFormSummary: boolean;
  mandatoryForm: boolean;
}

interface FilterData {
  users: string;
  department: string;
  date: Date | null;
  forms: string;
}

interface SearchResult {
  id: string;
  name: string;
}

const Forms: React.FC = () => {
  const [currentView, setCurrentView] = useState<'search' | 'create' | 'addComponent'>('search');
  const [filterData, setFilterData] = useState<FilterData>({
    users: '',
    department: '',
    date: null,
    forms: ''
  });
  
  const [formData, setFormData] = useState<FormData>({
    fieldName: '',
    relatedTo: '',
    assignDepartments: '',
    whereToFill: '',
    submitButtonCaption: '',
    active: false,
    mobileOnly: false,
    activateFormSummary: false,
    mandatoryForm: false
  });

  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [editingFieldIndex, setEditingFieldIndex] = useState<number | null>(null);
  
  // Component state for adding new field
  const [newField, setNewField] = useState({
    label: '',
    type: '',
    placeholder: '',
    mandatory: 'No',
    editable: 'Yes'
  });

  // Sample data
  const usersOptions = ["John Doe", "Jane Wilson", "Mike Davis", "Sarah Johnson", "David Brown"];
  const departmentOptions = ["HR", "Finance", "IT", "Marketing", "Operations"];
  const formsOptions = ["Employee Feedback", "Leave Request", "Expense Report", "Performance Review"];
  const relatedToOptions = ["User", "Department", "Project", "Task"];
  const fieldTypeOptions = ["Text", "Number", "Email", "Date", "Dropdown", "Checkbox", "Radio"];

  // Handlers
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilterData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    setFilterData(prev => ({ ...prev, date }));
  };

  const handleCancelFilter = () => {
    setFilterData({
      users: '',
      department: '',
      date: null,
      forms: ''
    });
    setSearchResults([]);
  };

  const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleCheckboxChange = (name: keyof FormData) => {
    setFormData(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSubmitFilter = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock search results
    setSearchResults([
      { id: '1', name: 'Employee Onboarding Form' },
      { id: '2', name: 'Leave Application Form' },
      { id: '3', name: 'Performance Evaluation Form' }
    ]);
  };

  const handleNewFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewField(prev => ({ ...prev, [name]: value }));
  };

  const handleAddField = () => {
    if (newField.label && newField.type) {
      const field: FormField = {
        id: Date.now().toString(),
        label: newField.label,
        type: newField.type,
        placeholder: newField.placeholder,
        mandatory: newField.mandatory === 'Yes',
        editable: newField.editable === 'Yes'
      };
      setFormFields(prev => [...prev, field]);
      setNewField({ label: '', type: '', placeholder: '', mandatory: 'No', editable: 'Yes' });
      setCurrentView('create');
    }
  };

  const handleEditField = (index: number) => {
    setEditingFieldIndex(index);
  };

  const handleSaveEdit = (index: number, field: string, value: string | boolean) => {
    setFormFields(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
    setEditingFieldIndex(null);
  };

  const tableColumns = [
    { label: 'Actions', align: 'center' as const },
    { label: 'Label' },
    { label: 'Type' },
    { label: 'Mandatory', align: 'center' as const }
  ];

  // Search View
  if (currentView === 'search') {
    return (
      <div className="p-6 w-full mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <Search className="w-5 h-5 text-gray-600" />
          <h1 className="text-2xl font-semibold text-gray-800">Form</h1>
        </div>

        {/* Filter Form */}
        <form onSubmit={handleSubmitFilter} className="bg-white p-6 rounded-md shadow-md border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Users */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Users</label>
              <select
                name="users"
                value={filterData.users}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select User</option>
                {usersOptions.map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Department</label>
              <select
                name="department"
                value={filterData.department}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Department</option>
                {departmentOptions.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={filterData.date ? filterData.date.toISOString().split('T')[0] : ''}
                onChange={(e) => handleDateChange(e.target.value ? new Date(e.target.value) : null)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Forms */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Forms</label>
              <select
                name="forms"
                value={filterData.forms}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Form</option>
                {formsOptions.map(form => (
                  <option key={form} value={form}>{form}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleCancelFilter}
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-4 mb-6">
            {searchResults.map(result => (
              <div key={result.id} className="bg-white p-4 rounded-md shadow-md border border-gray-200 flex items-center justify-between">
                <span className="text-gray-800">{result.name}</span>
                <Eye className="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-600" />
              </div>
            ))}
          </div>
        )}

        {/* Bottom Card */}
        <div className="bg-white p-6 rounded-md shadow-md border border-gray-200 flex items-center justify-between">
          <span className="text-gray-700">Select the data you would like to see using the above filters</span>
          <button
            onClick={() => setCurrentView('create')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Form
          </button>
        </div>
      </div>
    );
  }

  // Add Component View
  if (currentView === 'addComponent') {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-md shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Add Component</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Label */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Label</label>
              <input
                type="text"
                name="label"
                value={newField.label}
                onChange={handleNewFieldChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Type</label>
              <select
                name="type"
                value={newField.type}
                onChange={handleNewFieldChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Type</option>
                {fieldTypeOptions.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Placeholder */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Placeholder</label>
              <input
                type="text"
                name="placeholder"
                value={newField.placeholder}
                onChange={handleNewFieldChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Mandatory */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Mandatory</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="mandatory"
                    value="Yes"
                    checked={newField.mandatory === 'Yes'}
                    onChange={handleNewFieldChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="mandatory"
                    value="No"
                    checked={newField.mandatory === 'No'}
                    onChange={handleNewFieldChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            {/* Editable */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Editable</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="editable"
                    value="Yes"
                    checked={newField.editable === 'Yes'}
                    onChange={handleNewFieldChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="editable"
                    value="No"
                    checked={newField.editable === 'No'}
                    onChange={handleNewFieldChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <button
              onClick={handleAddField}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
            <button
              onClick={() => setCurrentView('create')}
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Create Form View
  return (
    <div className="p-6 w-full mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Form Details</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Template
        </button>
      </div>

      <div className="bg-white p-6 rounded-md shadow-md border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Field Name */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Field Name</label>
            <input
              type="text"
              name="fieldName"
              value={formData.fieldName}
              onChange={handleFormDataChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Related To */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Related To</label>
            <select
              name="relatedTo"
              value={formData.relatedTo}
              onChange={handleFormDataChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Related To</option>
              {relatedToOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Assign Departments */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Assign Departments</label>
            <select
              name="assignDepartments"
              value={formData.assignDepartments}
              onChange={handleFormDataChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Department</option>
              {departmentOptions.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Where to be filled by User */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Where to be filled by User</label>
            <select
              name="whereToFill"
              value={formData.whereToFill}
              onChange={handleFormDataChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Form</option>
              {formsOptions.map(form => (
                <option key={form} value={form}>{form}</option>
              ))}
            </select>
          </div>

          {/* Submit Button Caption */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-700 mb-1">Submit Button Caption</label>
            <input
              type="text"
              name="submitButtonCaption"
              value={formData.submitButtonCaption}
              onChange={handleFormDataChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.active}
              onChange={() => handleCheckboxChange('active')}
              className="mr-2"
            />
            Active
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.mobileOnly}
              onChange={() => handleCheckboxChange('mobileOnly')}
              className="mr-2"
            />
            Mobile Only
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.activateFormSummary}
              onChange={() => handleCheckboxChange('activateFormSummary')}
              className="mr-2"
            />
            Activate Form Summary on email
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.mandatoryForm}
              onChange={() => handleCheckboxChange('mandatoryForm')}
              className="mr-2"
            />
            Mandatory Form
          </label>
        </div>

        {/* Add Components Button */}
        <div className="mt-6">
          <button
            onClick={() => setCurrentView('addComponent')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Components
          </button>
        </div>

        {/* Form Fields Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Form Fields</h3>
          
          {formFields.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <TableHead columns={tableColumns} />
                <tbody>
                  {formFields.map((field, index) => (
                    <tr key={field.id} className="hover:bg-gray-50">
                      <td className="p-3 border-b text-center">
                        <div className="flex justify-center gap-2">
                          <Eye className="w-4 h-4 text-gray-700 cursor-pointer hover:text-blue-500 transition-colors" />
                          <Edit 
                            className="w-4 h-4 text-gray-700 cursor-pointer hover:text-green-500 transition-colors"
                            onClick={() => handleEditField(index)}
                          />
                        </div>
                      </td>
                      <td className="p-3 border-b">
                        {editingFieldIndex === index ? (
                          <input
                            type="text"
                            defaultValue={field.label}
                            onBlur={(e) => handleSaveEdit(index, 'label', e.target.value)}
                            autoFocus
                            className="w-full p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          field.label
                        )}
                      </td>
                      <td className="p-3 border-b">
                        {editingFieldIndex === index ? (
                          <select
                            defaultValue={field.type}
                            onBlur={(e) => handleSaveEdit(index, 'type', e.target.value)}
                            className="w-full p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            {fieldTypeOptions.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        ) : (
                          field.type
                        )}
                      </td>
                      <td className="p-3 border-b text-center">
                        {editingFieldIndex === index ? (
                          <select
                            defaultValue={field.mandatory ? 'Yes' : 'No'}
                            onBlur={(e) => handleSaveEdit(index, 'mandatory', e.target.value === 'Yes')}
                            className="w-full p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        ) : (
                          field.mandatory ? 'Yes' : 'No'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Save/Cancel Buttons */}
        <div className="flex justify-end space-x-2 mt-6">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Save
          </button>
          <button 
            onClick={() => setCurrentView('search')}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forms;