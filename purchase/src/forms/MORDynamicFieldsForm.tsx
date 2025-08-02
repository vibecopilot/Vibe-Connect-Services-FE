import React, { useState, useEffect } from "react";
import TextInput from "../components/TextInput";

interface MORDynamicFieldsFormProps {
  formData: {
    fieldHeader: string;
    mappedFields: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  onDynamicSubmit?: (data: {
    materialSubType: string;
    selectedFields: string[];
  }) => void;
  errors: {
    fieldHeader?: string;
    mappedFields?: string;
  };
  isEditing: boolean;
}

interface DynamicField {
  id: number;
  name: string;
  enabled: boolean;
}

const MORDynamicFieldsForm: React.FC<MORDynamicFieldsFormProps> = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  onDynamicSubmit,
  errors,
  isEditing,
}) => {
  const [selectedMaterialSubType, setSelectedMaterialSubType] = useState("");
  const [dynamicFields, setDynamicFields] = useState<DynamicField[]>([
    { id: 1, name: "Length", enabled: false },
    { id: 2, name: "Width", enabled: false },
    { id: 3, name: "Height", enabled: false },
    { id: 4, name: "Material Type", enabled: false },
    { id: 5, name: "Color", enabled: false },
    { id: 6, name: "Thickness", enabled: false },
    { id: 7, name: "Weight", enabled: false },
    { id: 8, name: "Brand", enabled: false },
    { id: 9, name: "Finish", enabled: false },
    { id: 10, name: "Grade", enabled: false },
  ]);

  const materialSubTypes = [
    "Wooden Door Frame Shutter",
    "Wooden Door Frame",
    "Wooden Door Shutter",
    "GI Frame And Shutter",
    "Wooden Door",
    "Iron Door",
    "Frame Door",
    "Glass Door"
  ];

  // Pre-populate form when editing
  useEffect(() => {
    if (isEditing && formData.mappedFields) {
      setSelectedMaterialSubType(formData.mappedFields);
      // Enable fields that match the fieldHeader when editing
      if (formData.fieldHeader) {
        const fieldNames = formData.fieldHeader.split(', ');
        setDynamicFields(prev =>
          prev.map(field => ({
            ...field,
            enabled: fieldNames.includes(field.name)
          }))
        );
      }
    }
  }, [isEditing, formData]);

  const handleFieldToggle = (id: number) => {
    setDynamicFields(prev =>
      prev.map(field =>
        field.id === id ? { ...field, enabled: !field.enabled } : field
      )
    );
  };

  const handleFieldNameChange = (id: number, newName: string) => {
    setDynamicFields(prev =>
      prev.map(field =>
        field.id === id ? { ...field, name: newName } : field
      )
    );
  };

  const handleDynamicFormSubmit = () => {
    if (onDynamicSubmit) {
      const selectedFields = dynamicFields
        .filter(field => field.enabled)
        .map(field => field.name);
      
      onDynamicSubmit({
        materialSubType: selectedMaterialSubType,
        selectedFields
      });
    }
  };

  // Always show the new dynamic form layout
  return (
    <div className="bg-white p-6 rounded-md shadow-md border border-gray-200 max-w-6xl mx-auto">
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 12px;
          height: 12px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1e3a8a;
          border-radius: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to right, #1e3a8a 0%, #1e3a8a 35%, white 35%, white 65%, #1e3a8a 65%, #1e3a8a 100%);
          border-radius: 6px;
          border: 1px solid #1e3a8a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to right, #1e40af 0%, #1e40af 35%, white 35%, white 65%, #1e40af 65%, #1e40af 100%);
        }
        .custom-scrollbar::-webkit-scrollbar-corner {
          background: #1e3a8a;
        }
        
        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #1e3a8a #1e3a8a;
        }
        
        /* Alternative approach with box-shadow for better white center */
        .enhanced-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 3px;
        }
        .enhanced-scrollbar::-webkit-scrollbar-track {
          background: #1e3a8a;
          border-radius: 4px;
        }
        .enhanced-scrollbar::-webkit-scrollbar-thumb {
          background: white;
          border-radius: 4px;
          border: 1px solid #1e3a8a;
        }
        .enhanced-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #f8f9fa;
          border: 1px solid #1e40af;
        }
        .enhanced-scrollbar::-webkit-scrollbar-corner {
          background: #1e3a8a;
        }
      `}</style>
      {/* Material Sub Type Heading */}
      <h2 className="text-xl font-semibold mb-4 text-left">Material Sub Type</h2>
      
      {/* Material Sub Type Selection Box */}
      <div className="mb-6">
        <div className="border border-gray-300 rounded-md p-4 bg-gray-50 max-h-40 overflow-y-auto w-fit min-w-80 enhanced-scrollbar">
          <div className="space-y-2">
            {materialSubTypes.map((type, index) => (
              <label key={index} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded">
                <input
                  type="radio"
                  name="materialSubType"
                  value={type}
                  checked={selectedMaterialSubType === type}
                  onChange={(e) => setSelectedMaterialSubType(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm font-medium text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Fields Heading */}
      <h3 className="text-lg font-semibold mb-4 text-left">Dynamic Fields</h3>
      
      {/* Dynamic Fields Table */}
      <div className="mb-6 overflow-x-auto max-h-55 enhanced-scrollbar">
        <table className="min-w-full table-auto border border-gray-200">
          <thead>
            <tr className="bg-blue-900">
              <th className="p-3 border-b border-white text-left font-semibold text-white">Sr.No</th>
              <th className="p-3 border-b border-white text-left font-semibold text-white">Fields Header</th>
              <th className="p-3 border-b border-white text-center font-semibold text-white">Enable/Disable</th>
            </tr>
          </thead>
          <tbody>
            {dynamicFields.map((field, index) => (
              <tr key={field.id} className="hover:bg-gray-50">
                <td className="p-3 border-b border-white text-gray-600">{index + 1}</td>
                <td className="p-3 border-b border-white">
                  <input
                    type="text"
                    value={field.name}
                    onChange={(e) => handleFieldNameChange(field.id, e.target.value)}
                    className="w-full px-2 py-1 text-gray-800 font-medium border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </td>
                <td className="p-3 border-b border-white text-center">
                  <input
                    type="checkbox"
                    checked={field.enabled}
                    onChange={() => handleFieldToggle(field.id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Submit and Cancel Buttons */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={handleDynamicFormSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
        >
          {isEditing ? "Update" : "Submit"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-md font-medium transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default MORDynamicFieldsForm;