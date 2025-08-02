import React, { useState } from 'react';
import { FiEye, FiTrash2, FiDownload, FiX, FiEdit, FiPaperclip,  } from 'react-icons/fi';
import TopSearch from '../../components/TopSearch';
import TableHead from '../../components/TopHead';
import TextInput from '../../components/TextInput';
import NoDataFound from '../../components/NoDataFound';

interface FileData {
  id: string;
  name: string;
  size: string;
  modified: string;
  uploadedBy: {
    name: string;
    avatar: string;
  };
}

interface FormData {
  fileName: string;
  file: File | null;
}

interface FormErrors {
  fileName: string;
  file: string;
}

const Files: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'view' | 'edit'>('add');
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [formData, setFormData] = useState<FormData>({
    fileName: '',
    file: null
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    fileName: '',
    file: ''
  });

  const [files, setFiles] = useState<FileData[]>([
    {
      id: '1',
      name: 'Project Report.pdf',
      size: '2.4 MB',
      modified: '24 July, 2025',
      uploadedBy: {
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
      }
    },
    {
      id: '2',
      name: 'Data Analysis.xlsx',
      size: '5.7 MB',
      modified: '23 July, 2025',
      uploadedBy: {
        name: 'Jane Smith',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c716?w=32&h=32&fit=crop&crop=face'
      }
    },
    {
      id: '3',
      name: 'Design Mockups.zip',
      size: '12.3 MB',
      modified: '22 July, 2025',
      uploadedBy: {
        name: 'Mike Johnson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
      }
    }
  ]);

  const tableColumns = [
    { label: 'Action', align: 'center' as const },
    { label: 'Name', align: 'left' as const },
    { label: 'File Size', align: 'left' as const },
    { label: 'Modified', align: 'left' as const },
    { label: 'Uploaded By', align: 'left' as const },
    { label: 'Options', align: 'center' as const }
  ];

  const handleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleButtonClick = (type: string) => {
    if (type === 'Add') {
      setModalMode('add');
      setFormData({ fileName: '', file: null });
      setFormErrors({ fileName: '', file: '' });
      setIsModalOpen(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, file }));
    
    // Clear file error when user selects a file
    if (formErrors.file) {
      setFormErrors(prev => ({ ...prev, file: '' }));
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = { fileName: '', file: '' };
    let isValid = true;

    if (!formData.fileName.trim()) {
      errors.fileName = 'File name is required';
      isValid = false;
    }

    if (!formData.file && modalMode === 'add') {
      errors.file = 'Please select a file';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    if (modalMode === 'add') {
      const newFile: FileData = {
        id: Date.now().toString(),
        name: formData.fileName,
        size: formData.file ? `${(formData.file.size / (1024 * 1024)).toFixed(1)} MB` : '0 MB',
        modified: new Date().toLocaleDateString('en-GB', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric' 
        }),
        uploadedBy: {
          name: 'Current User',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face'
        }
      };
      setFiles(prev => [...prev, newFile]);
    } else if (modalMode === 'edit' && selectedFile) {
      setFiles(prev => prev.map(file => 
        file.id === selectedFile.id 
          ? { ...file, name: formData.fileName }
          : file
      ));
    }

    setIsModalOpen(false);
    setFormData({ fileName: '', file: null });
    setSelectedFile(null);
  };

  const handleView = (file: FileData) => {
    setSelectedFile(file);
    setFormData({ fileName: file.name, file: null });
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleEdit = (file: FileData) => {
    setSelectedFile(file);
    setFormData({ fileName: file.name, file: null });
    setFormErrors({ fileName: '', file: '' });
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDelete = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const handleDownload = (file: FileData) => {
    // Simulate download
    console.log(`Downloading ${file.name}`);
  };

  const handleCopyLink = (file: FileData) => {
    // Simulate copy link
    navigator.clipboard.writeText(`https://example.com/files/${file.id}`);
    console.log(`Link copied for ${file.name}`);
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <TopSearch
        onSearch={handleSearch}
        onButtonClick={handleButtonClick}
        buttons={['Add']}
        isSearchOpen={isSearchOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placehoder='Search files...'
      />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <TableHead columns={tableColumns} />
          {filteredFiles.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={tableColumns.length}>
                  <NoDataFound message="No files found." className="py-12" />
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {filteredFiles.map((file) => (
                <tr key={file.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b border-gray-400 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleView(file)}
                        className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                        title="View"
                      >
                        <FiEye size={16} />
                      </button>
                      <button
                        onClick={() => handleEdit(file)}
                        className="p-1 text-green-600 hover:text-green-800 transition-colors"
                        title="Edit"
                      >
                        <FiEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(file.id)}
                        className="p-1 text-red-600 hover:text-red-800 transition-colors"
                        title="Delete"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="p-3 border-b border-gray-400 text-gray-600">{file.name}</td>
                  <td className="p-3 border-b border-gray-400 text-gray-600">{file.size}</td>
                  <td className="p-3 border-b border-gray-400 text-gray-600">{file.modified}</td>
                  <td className="p-3 border-b border-gray-400 text-gray-600">
                    <div className="flex items-center gap-2">
                      <img
                        src={file.uploadedBy.avatar}
                        alt={file.uploadedBy.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm">{file.uploadedBy.name}</span>
                    </div>
                  </td>
                  <td className="p-3 border-b border-gray-400 text-gray-600 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleDownload(file)}
                        className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
                        title="Download"
                      >
                        <FiDownload size={16} />
                      </button>
                      <button
                        onClick={() => handleCopyLink(file)}
                        className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
                        title="Copy Link"
                      >
                        <FiPaperclip size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {modalMode === 'add' ? 'Add File' : modalMode === 'view' ? 'View File' : 'Edit File'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <TextInput
                  label="File Name"
                  name="fileName"
                  value={formData.fileName}
                  onChange={handleInputChange}
                  required
                  disabled={modalMode === 'view'}
                  style={{
                    borderColor: formErrors.fileName ? '#ef4444' : '#d1d5db'
                  }}
                />
                {formErrors.fileName && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.fileName}</p>
                )}
              </div>

              {modalMode !== 'view' && (
                <div>
                  <label className="block text-sm mb-1">
                    Choose File
                    {modalMode === 'add' && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className={`w-full p-2 border rounded-md file:bg-blue-500 file:text-white file:rounded-md file:px-4 file:py-2 file:border-none file:cursor-pointer
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formErrors.file ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.file && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.file}</p>
                  )}
                </div>
              )}
            </div>

            {modalMode !== 'view' && (
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Files;