import React from 'react'


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
  return (
    <div className="flex flex-col space-y-2">
      {/* Display label if provided */}
      <label className="text-gray-900">{label}</label>
      {/* file input */}
      <input
        type="file"
        name={name}
        accept={accept}
        multiple={multiple}
        required={required}
        disabled={disabled}
        onChange={(e) => onChange(e.target.files)}
        className="block w-full text-sm text-gray border border-gray-300 rounded-lg cursor-pointer focus:outline-none file:bg-blue-500 file:text-white file:rounded-md file:px-4 file:py-2 file:border-none file:cursor-pointer"
      />
      {/* Display maximum file size if specified */}
      {fileSize && (
        <p className="text-xs text-gray">Maximum file size: {fileSize}</p>
      )}
    </div>
  );
};

export default FileUpload;