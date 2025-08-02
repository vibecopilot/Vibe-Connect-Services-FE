import React from 'react'

interface FileUploadProps {
    required?: boolean;
    label?: string;
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
    onChange: (files: FileList | null) => void;
    name?: string;
    fileSize?: string;
    // Optional: Support for the old callback pattern (backward compatibility)
    onFileSelect?: (file: File | null) => void;
    icon?: React.ReactNode;
}

const FileUpload: React.FC<FileUploadProps> = ({
  required = false,
  label,
  accept,
  multiple = false,
  disabled = false,
  onChange,
  onFileSelect, // Backward compatibility
  name = "file",
  fileSize,
  icon,
}) => {
  const handleChange = (files: FileList | null) => {
    // Call the main onChange handler
    onChange(files);
        
    // For backward compatibility, also call onFileSelect if provided
    if (onFileSelect) {
      onFileSelect(files && files.length > 0 ? files[0] : null);
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        name={name}
        accept={accept}
        multiple={multiple}
        required={required}
        disabled={disabled}
        onChange={(e) => handleChange(e.target.files)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        id={`file-upload-${name}`}
      />
      <label
        htmlFor={`file-upload-${name}`}
        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer transition-colors duration-200 text-sm font-medium text-gray-700"
      >
        {icon && <span className="text-gray-500">{icon}</span>}
        {label}
      </label>
      {/* Display maximum file size if specified */}
      {fileSize && (
        <p className="text-xs text-gray-500 mt-1">Maximum file size: {fileSize}</p>
      )}
    </div>
  );
};

export default FileUpload;