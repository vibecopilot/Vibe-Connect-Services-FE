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
    <div className="flex flex-col p-10 rounded-lg space-y-2 bg-[rgb(37,54,84)]">
      {/* Display label if provided */}
      <label className="font-semibold text-white flex items-center gap-2">
        {icon && icon}
        {label}
      </label>
      {/* file input */}
      <input
        type="file"
        name={name}
        accept={accept}
        multiple={multiple}
        required={required}
        disabled={disabled}
        onChange={(e) => handleChange(e.target.files)}
        className="block w-full text-sm text-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none file:bg-blue-500 file:text-white file:rounded-md file:px-4 file:py-2 file:border-none file:cursor-pointer"
      />
      {/* Display maximum file size if specified */}
      {fileSize && (
        <p className="text-xs text-white">Maximum file size: {fileSize}</p>
      )}
    </div>
  );
};

export default FileUpload;