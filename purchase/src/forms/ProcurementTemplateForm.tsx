import React, { useState } from "react";
import TextInput from "../components/TextInput";
import Select from "../components/Select";
import { Plus, Edit2, Trash2 } from "lucide-react";

interface ProcurementTemplateFormProps {
  formData: {
    templateName: string;
    departmentName: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  errors: {
    templateName?: string;
    departmentName?: string;
  };
  errorMessage: string;
}

interface CustomField {
  id: string;
  name: string;
  isEditing: boolean;
  isActive: boolean;
}

const ProcurementTemplateForm: React.FC<ProcurementTemplateFormProps> = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  errors,
  errorMessage,
}) => {
  const [showAddColumn, setShowAddColumn] = useState(false);
  const [customFields, setCustomFields] = useState<CustomField[]>([
    { id: '1', name: 'Warranty Clause', isEditing: false, isActive: false },
    { id: '2', name: 'Payment Terms', isEditing: false, isActive: false },
    { id: '3', name: 'Loading/Unloading', isEditing: false, isActive: false }
  ]);
  const [newFieldName, setNewFieldName] = useState("");

  const departments = ["Engineering", "HR", "Finance", "Operations", "IT"];

  const defaultColumns = [
    "Sr.No",
    "Material Name", 
    "Material Type",
    "Material Sub Type",
    "Quantity Requested",
    "Creator Attachment"
  ];

  const handleAddColumn = () => {
    setShowAddColumn(true);
  };

  const handleAddField = () => {
    if (newFieldName.trim()) {
      const newField: CustomField = {
        id: Date.now().toString(),
        name: newFieldName.trim(),
        isEditing: false,
        isActive: true
      };
      setCustomFields([...customFields, newField]);
      setNewFieldName("");
    }
  };

  const handleEditField = (id: string) => {
    setCustomFields(customFields.map(field => 
      field.id === id ? { ...field, isEditing: true } : field
    ));
  };

  const handleSaveField = (id: string, newName: string) => {
    setCustomFields(customFields.map(field => 
      field.id === id ? { ...field, name: newName, isEditing: false, isActive: true } : field
    ));
  };

  const handleDeleteField = (id: string) => {
    setCustomFields(customFields.filter(field => field.id !== id));
  };

  const allColumns = [...defaultColumns, ...customFields.filter(field => field.isActive).map(field => field.name)];

  return (
    <div className="bg-white p-6 rounded-md shadow-md border border-gray-200 max-w-6xl mx-auto">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-center mb-6">Create Template</h1>

      <form onSubmit={onSubmit}>
        {/* Template Name and Department Name Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <TextInput
            label="Template Name"
            required
            name="templateName"
            value={formData.templateName}
            onChange={onChange}
            error={errors.templateName}
            placeholder="Enter Template Name"
          />

          <Select
            label="Department Name"
            name="departmentName"
            value={formData.departmentName}
            onChange={onChange}
            options={departments}
            required
            error={errors.departmentName}
            
          />
        </div>

        {/* Add Column Button */}
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={handleAddColumn}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Plus size={16} />
            Add Column for Bid Material
          </button>
        </div>

        {/* Table */}
        <div className="border border-gray-300 rounded-md overflow-hidden mb-4">
          <div 
            className="overflow-x-hidden" 
            style={{ maxHeight: '400px' }}
            id="table-container"
          >
            <table className="w-full" style={{ minWidth: `${allColumns.length * 150}px` }}>
              <thead className="bg-blue-900 text-white sticky top-0">
                <tr>
                  {allColumns.map((column, index) => (
                    <th 
                      key={index}
                      className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap border-r border-white last:border-r-0"
                      style={{ minWidth: '150px' }}
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-50">
                  {allColumns.map((_, index) => (
                    <td 
                      key={index}
                      className="px-4 py-3 border-b border-gray-200 whitespace-nowrap"
                      style={{ minWidth: '150px' }}
                    >
                      {/* Empty cells for template */}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Custom Horizontal Scroll Bar */}
          <div className="relative h-4 bg-gray-100 border-t-gray-200">
            <div 
              className="h-full bg-blue-900 rounded-full cursor-pointer transition-all duration-200 hover:bg-blue-800 flex items-center justify-center absolute"
              style={{ 
                width: '60px',
                left: '0px'
              }}
              onMouseDown={(e) => {
                const scrollContainer = document.getElementById('table-container') as HTMLElement;
                const scrollBar = e.currentTarget.parentElement as HTMLElement;
                const thumb = e.currentTarget as HTMLElement;
                
                if (scrollContainer && scrollBar) {
                  const startX = e.clientX;
                  const startLeft = parseInt(thumb.style.left) || 0;
                  const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
                  const scrollBarWidth = scrollBar.clientWidth;
                  const thumbWidth = 60;
                  const maxThumbPosition = scrollBarWidth - thumbWidth;
                  
                  const handleMouseMove = (moveEvent: MouseEvent) => {
                    const diff = moveEvent.clientX - startX;
                    const newLeft = Math.max(0, Math.min(maxThumbPosition, startLeft + diff));
                    
                    // Update thumb position
                    thumb.style.left = `${newLeft}px`;
                    
                    // Update scroll position
                    const scrollRatio = newLeft / maxThumbPosition;
                    scrollContainer.scrollLeft = scrollRatio * maxScroll;
                  };
                  
                  const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                  };
                  
                  document.addEventListener('mousemove', handleMouseMove);
                  document.addEventListener('mouseup', handleMouseUp);
                }
              }}
            >
              <div className="w-6 h-1 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Add Column Section */}
        {showAddColumn && (
          <div className="mb-6">
            
            
            {/* Pre-written Fields Box */}
            <div className="flex justify-end mb-4">
              <div className="bg-white border border-gray-300 rounded-md shadow-md overflow-hidden w-80">
                {customFields.slice(0, 3).map((field) => (
                  <PrewrittenFieldItem
                    key={field.id}
                    field={field}
                    onEdit={() => handleEditField(field.id)}
                    onSave={(newName) => handleSaveField(field.id, newName)}
                    onDelete={() => handleDeleteField(field.id)}
                  />
                ))}
              </div>
            </div>
            
            
          </div>
        )}

        {errorMessage && (
          <div className="text-sm text-red-600 mb-4">{errorMessage}</div>
        )}

        {/* Form Actions */}
        <div className="flex justify-end space-x-2">
          
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// Pre-written Field Item Component (for the special box)
interface PrewrittenFieldItemProps {
  field: CustomField;
  onEdit: () => void;
  onSave: (newName: string) => void;
  onDelete: () => void;
}

const PrewrittenFieldItem: React.FC<PrewrittenFieldItemProps> = ({
  field,
  onEdit,
  onSave,
  onDelete
}) => {
  const [editValue, setEditValue] = useState(field.name);

  const handleSave = () => {
    if (editValue.trim()) {
      onSave(editValue.trim());
    }
  };

  const handleCancel = () => {
    setEditValue(field.name);
    onEdit(); // This will set isEditing to false through the parent
  };

  if (field.isEditing) {
    return (
      <div className="flex items-center gap-2 p-3 bg-blue-900 text-white">
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="flex-1 px-2 py-1 text-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSave();
            }
            if (e.key === 'Escape') {
              handleCancel();
            }
          }}
          autoFocus
        />
        <button
          type="button"
          onClick={handleSave}
          className="text-white hover:text-green-200 p-1"
        >
          ✓
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="text-white hover:text-red-200 p-1"
        >
          <Trash2 size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-3 bg-blue-900 text-white border-b border-blue-800 last:border-b-0">
      <span className="font-medium">{field.name}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onEdit}
          className="text-white hover:text-blue-200 p-1"
        >
          <Edit2 size={16} />
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="text-white hover:text-red-200 p-1"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};


export default ProcurementTemplateForm;