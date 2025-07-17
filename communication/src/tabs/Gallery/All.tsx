import React, { useState, useEffect } from 'react';
import Pagination from '../../components/Pagination';
import TableHead from '../../components/TopHead';
import IconButton from '../../components/IconButton';
import { FiTrash2, FiFileText, FiDownload, FiEye, FiImage, FiVideo, FiFile } from "react-icons/fi";
import Tabs from '../../components/Tabs';
import TopBar from '../../components/TopBar';
import Modal from '../../components/Modal';
import TextInput from '../../components/TextInput';
import FileUpload from '../../components/FileUpload';

interface FileItem {
  id: number;
  fileName: string;
  fileType: string;
  fileSize: string;
  uploadedBy: string;
  sharedBy?: string;
  uploadTime: string;
  access: string;
  previewUrl?: string;
}

const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} month${diffInMonths === 1 ? '' : 's'} ago`;

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears === 1 ? '' : 's'} ago`;
};

const getFileIcon = (fileType: string) => {
  if (fileType.includes('image') || ['Image', 'JPG', 'PNG'].includes(fileType)) return <FiImage />;
  if (fileType.includes('video') || ['Video', 'MP4'].includes(fileType)) return <FiVideo />;
  if (fileType.includes('pdf') || fileType === 'PDF') return <FiFileText />;
  if (fileType.includes('word') || fileType === 'Word' || fileType === 'DOCX') return <FiFileText />;
  if (fileType.includes('excel') || fileType === 'Excel' || fileType === 'XLSX') return <FiFileText />;
  return <FiFile className="text-gray-500" />;
};

const getFileTypeName = (fileType: string) => {
  if (fileType.includes('image') || ['Image', 'JPG', 'PNG'].includes(fileType)) return 'Image';
  if (fileType.includes('video') || ['Video', 'MP4'].includes(fileType)) return 'Video';
  if (fileType.includes('pdf') || fileType === 'PDF') return 'PDF';
  if (fileType.includes('word') || fileType === 'Word' || fileType === 'DOCX') return 'Word';
  if (fileType.includes('excel') || fileType === 'Excel' || fileType === 'XLSX') return 'Excel';
  return fileType;
};

const All: React.FC = () => {
  const [personalFiles, setPersonalFiles] = useState<FileItem[]>([
    {
      id: 1,
      fileName: "womens-day.jpg",
      fileType: 'Image',
      fileSize: '2.4 MB',
      uploadedBy: 'John Smith',
      uploadTime: new Date(Date.now() - 3600000 * 2).toISOString(),
      access: 'Private',
      previewUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=40&h=40&q=60'
    },
    {
      id: 2,
      fileName: "promo-video.mp4",
      fileType: 'Video',
      fileSize: '15.2 MB',
      uploadedBy: 'Sarah Johnson',
      uploadTime: new Date(Date.now() - 3600000 * 5).toISOString(),
      access: 'Shared',
      previewUrl: null
    },
    {
      id: 3,
      fileName: "quarterly-report.pdf",
      fileType: 'PDF',
      fileSize: '4.7 MB',
      uploadedBy: 'Michael Brown',
      uploadTime: new Date(Date.now() - 86400000 * 2).toISOString(),
      access: 'Shared',
      previewUrl: null
    },
    {
      id: 4,
      fileName: "budget.xlsx",
      fileType: 'Excel',
      fileSize: '1.8 MB',
      uploadedBy: 'Emily Davis',
      uploadTime: new Date(Date.now() - 86400000).toISOString(),
      access: 'Private',
      previewUrl: null
    }
  ]);

  const [commonFiles, setCommonFiles] = useState<FileItem[]>([
    {
      id: 5,
      fileName: "company-policy.pdf",
      fileType: 'PDF',
      fileSize: '3.1 MB',
      uploadedBy: 'HR Department',
      uploadTime: new Date(Date.now() - 86400000 * 7).toISOString(),
      access: 'Shared',
      previewUrl: null
    },
    {
      id: 6,
      fileName: "training-manual.docx",
      fileType: 'Word',
      fileSize: '2.5 MB',
      uploadedBy: 'Training Team',
      uploadTime: new Date(Date.now() - 86400000 * 3).toISOString(),
      access: 'Shared',
      previewUrl: null
    },
    {
      id: 7,
      fileName: "office-map.png",
      fileType: 'Image',
      fileSize: '1.2 MB',
      uploadedBy: 'Admin Team',
      uploadTime: new Date(Date.now() - 86400000 * 10).toISOString(),
      access: 'Shared',
      previewUrl: null
    }
  ]);

  const [sharedFiles, setSharedFiles] = useState<FileItem[]>([
    {
      id: 8,
      fileName: "project-plan.docx",
      fileType: 'Word',
      fileSize: '2.1 MB',
      sharedBy: 'Alex Turner',
      uploadedBy: 'Alex Turner',
      uploadTime: new Date(Date.now() - 86400000 * 3).toISOString(),
      access: 'Shared',
      previewUrl: null
    },
    {
      id: 9,
      fileName: "design-specs.pdf",
      fileType: 'PDF',
      fileSize: '5.3 MB',
      sharedBy: 'Lisa Chen',
      uploadedBy: 'Lisa Chen',
      uploadTime: new Date(Date.now() - 86400000 * 1).toISOString(),
      access: 'Shared',
      previewUrl: null
    },
    {
      id: 10,
      fileName: "event-photos.zip",
      fileType: 'ZIP',
      fileSize: '22.4 MB',
      sharedBy: 'Marketing Team',
      uploadedBy: 'Marketing Team',
      uploadTime: new Date(Date.now() - 86400000 * 5).toISOString(),
      access: 'Shared',
      previewUrl: null
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('personal');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastClickedButton, setLastClickedButton] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [newFile, setNewFile] = useState<File | null>(null);
  const [newFilePreview, setNewFilePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [viewingFile, setViewingFile] = useState<FileItem | null>(null);
  const [modalMode, setModalMode] = useState<'upload' | 'view'>('upload');

  useEffect(() => {
    setCurrentPage(1);
    setSearchTerm('');
  }, [activeTab]);

  const handleModalConfirm = () => {
    if (lastClickedButton === 'Add/Upload') {
      if (!newFileName.trim()) return alert('File name is required');
      if (!newFile) return alert('Please select a file to upload');

      const existingFiles = activeTab === 'personal' ? personalFiles : commonFiles;

      if (existingFiles.some(file => file.fileName === newFileName)) {
        alert('A file with this name already exists!');
        return;
      }

      setIsUploading(true);

      const newFileItem: FileItem = {
        id: Date.now(),
        fileName: newFileName,
        fileType: newFile.name.split('.').pop()?.toUpperCase() || 'FILE',
        fileSize: `${(newFile.size / 1024 / 1024).toFixed(1)} MB`,
        uploadedBy: 'You',
        uploadTime: new Date().toISOString(),
        access: 'Private',
        previewUrl: newFilePreview
      };

      if (activeTab === 'personal') {
        setPersonalFiles(prevFiles => [newFileItem, ...prevFiles]);
      } else if (activeTab === 'common') {
        setCommonFiles(prevFiles => [newFileItem, ...prevFiles]);
      }

      setCurrentPage(1);
      setSearchTerm('');
      setIsUploading(false);
      setIsModalOpen(false);
      setNewFileName('');
      setNewFile(null);
      setNewFilePreview(null);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewFileName('');
    setNewFile(null);
    setNewFilePreview(null);
    setViewingFile(null);
  };

  const handleNewFileChange = (files: FileList | null) => {
    if (!files?.length) {
      setNewFile(null);
      setNewFilePreview(null);
      return;
    }

    const selectedFile = files[0];
    setNewFile(selectedFile);
    setNewFilePreview(URL.createObjectURL(selectedFile));
  };

  const handleFileDelete = (id: number) => {
    if (activeTab === 'personal') {
      setPersonalFiles(prev => prev.filter(file => file.id !== id));
    } else if (activeTab === 'common') {
      setCommonFiles(prev => prev.filter(file => file.id !== id));
    }
  };

  const handleButtonClick = (type: string) => {
    setLastClickedButton(type);
    setModalMode('upload');
    setIsModalOpen(true);
  };

  const handleViewClick = (file: FileItem) => {
    setViewingFile(file);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const matchesSearchTerm = (file: FileItem) => {
    const term = searchTerm.toLowerCase();
    return (
      file.fileName.toLowerCase().includes(term) ||
      getFileTypeName(file.fileType).toLowerCase().includes(term) ||
      file.fileSize.toLowerCase().includes(term) ||
      file.uploadedBy.toLowerCase().includes(term) ||
      (activeTab === 'shared' && file.sharedBy?.toLowerCase().includes(term)) ||
      formatRelativeTime(file.uploadTime).toLowerCase().includes(term)
    );
  };

  const filesByTab = activeTab === 'personal' ? personalFiles
                   : activeTab === 'common' ? commonFiles
                   : sharedFiles;

  const filteredFiles = filesByTab.filter(matchesSearchTerm);
  const totalPages = Math.ceil(filteredFiles.length / itemsPerPage);
  const currentFiles = filteredFiles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getTableColumns = () => {
    const baseColumns = [
      { label: 'Actions', align: 'center' },
      { label: 'File Name', align: 'center' },
      { label: 'File Type', align: 'center' },
      { label: 'File Size', align: 'center' },
    ];
    if (activeTab === 'shared') {
      return [...baseColumns, { label: 'Shared By', align: 'center' }, { label: 'Uploaded Time', align: 'center' }];
    }
    return [...baseColumns, { label: 'Uploaded By', align: 'center' }, { label: 'Uploaded Time', align: 'center' }];
  };

  return (
    <div className='text-[#5E5E5E]'>
      <Tabs
        tabs={[
          { label: 'Personal', key: 'personal' },
          { label: 'Common', key: 'common' },
          { label: 'Shared with All', key: 'shared' }
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ">
        {/* Conditionally render TopBar only for personal/common tabs */}
        {activeTab !== 'shared' && (
          <TopBar
            onSearch={setSearchTerm}
            onButtonClick={handleButtonClick}
            buttons={['Add/Upload']}
          />
        )}
        
        {/* Pagination container */}
        <div className={`${activeTab === 'shared' ? 'w-full' : ''} flex justify-end`}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredFiles.length}
            onPageChange={setCurrentPage}
            showControls={true}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <TableHead columns={getTableColumns()} />
          <tbody>
            {currentFiles.length > 0 ? currentFiles.map(file => (
              <tr key={file.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="text-center py-3">
                  <div className="flex justify-center space-x-2">
                    <IconButton onClick={() => handleViewClick(file)}><FiEye /></IconButton>
                    <IconButton onClick={() => console.log('Download', file.id)}><FiDownload /></IconButton>
                    {activeTab !== 'shared' && (
                      <IconButton onClick={() => handleFileDelete(file.id)}><FiTrash2 /></IconButton>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4 flex justify-center items-center">
                  <div className="flex items-center">
                    {file.previewUrl && <img src={file.previewUrl} alt="Preview" className="w-8 h-8 rounded-full object-cover mr-2" />}
                    <div className="mr-2">{getFileIcon(file.fileType)}</div>
                    <span className="font-medium">{file.fileName}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">{getFileTypeName(file.fileType)}</td>
                <td className="py-3 px-4 text-center">{file.fileSize}</td>
                <td className="py-3 px-4 text-center">{activeTab === 'shared' ? file.sharedBy : file.uploadedBy}</td>
                <td className="py-3 px-4 text-center">{formatRelativeTime(file.uploadTime)}</td>
              </tr>
            )) : (
              <tr><td colSpan={6} className="py-8 text-center">No files found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        showDivider={false}
        title={ 
        <div className="flex justify-center text-[#5E5E5E] text-xl font-normal">
        {modalMode === 'upload' ? "Upload Media" : "File Details"}
        </div>}
        content={
          <div className="space-y-4 text-[#5E5E5E]">
            <TextInput
              label="Title"
              required
              value={modalMode === 'upload' ? newFileName : (viewingFile?.fileName || '')}
              onChange={(e) => modalMode === 'upload' && setNewFileName(e.target.value)}
              readOnly={modalMode === 'view'}
              inputClassName={`bg-white border border-gray-300 text-gray-900 ${
                modalMode === 'view' ? 'cursor-not-allowed opacity-75' : ''
              }`}
            />
            <div>
              <label className="block text-sm mb-1 text-[#5E5E5E]">
                {modalMode === 'upload' ? 'Upload Media' : 'File'}
              </label>
              <FileUpload
                onChange={modalMode === 'upload' ? handleNewFileChange : undefined}
                file={modalMode === 'view' && viewingFile ? {
                  name: viewingFile.fileName,
                  size: parseFloat(viewingFile.fileSize) * 1024 * 1024,
                  type: viewingFile.fileType,
                  previewUrl: viewingFile.previewUrl || undefined
                } : undefined}
                readOnly={modalMode === 'view'}
                accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx"
                fileSize="10MB"
              />
            </div>
          </div>
        }
        showFooter={modalMode === 'upload'}
        confirmText={isUploading ? "Uploading..." : "Save"}
        cancelText="Cancel"
        onConfirm={handleModalConfirm}
        onCancel={handleModalClose}
        confirmButtonClassName={`bg-[#7991BB] text-white hover:bg-[#6a81a3] ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        cancelButtonClassName="bg-white text-[#5E5E5E] border border-[#5E5E5E] hover:bg-gray-100"
        width="max-w-2xl"
      />
    </div>
  );
};

export default All;