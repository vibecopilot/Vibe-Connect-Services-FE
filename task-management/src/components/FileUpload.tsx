import React, { useEffect } from 'react'

// props interface for the fileupload component
interface FileUploadProps{
    required?: boolean;
    label?: string;
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
    onChange: (files: FileList | null) => void;
    name?: string
    fileSize?: string
}

// fileupload component function
const FileUpload: React.FC<FileUploadProps> = ({
  required = false,
  label,
  accept,
  multiple = false,
  disabled = false,
  onChange,
  name = "file",
  fileSize,
}) => {
  // Create unique ID for this component instance
  const componentId = React.useId().replace(/:/g, '');

  useEffect(() => {
    // Add styles dynamically
    const styleId = `file-upload-styles-${componentId}`;
    
    // Check if styles already exist
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .file-upload-${componentId} input[type="file"]::file-selector-button {
          background-color: #7991BB;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 8px 16px;
          cursor: pointer;
          margin-right: 8px;
        }
        .file-upload-${componentId} input[type="file"]::-webkit-file-upload-button {
          background-color: #7991BB;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 8px 16px;
          cursor: pointer;
          margin-right: 8px;
        }
        .file-upload-${componentId} input[type="file"]::-ms-browse {
          background-color: #7991BB;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 8px 16px;
          cursor: pointer;
        }
      `;
      document.head.appendChild(style);
    }

    // Cleanup function to remove styles when component unmounts
    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [componentId]);

  return (
    <div className={`file-upload-${componentId} flex flex-col p-10 rounded-lg space-y-2 bg-white border border-gray-300`}>
      {/* Display label if provided */}
      <label className="font-semibold text-gray-900">{label}</label>
      {/* file input */}
      <input
        type="file"
        name={name}
        accept={accept}
        multiple={multiple}
        required={required}
        disabled={disabled}
        onChange={(e) => onChange(e.target.files)}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
      />
      {/* Display maximum file size if specified */}
      {fileSize && (
        <p className="text-xs text-gray-600">Maximum file size: {fileSize}</p>
      )}
    </div>
  );
};

export default FileUpload;