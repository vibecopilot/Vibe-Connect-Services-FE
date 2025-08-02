import { useState } from "react"
import { Eye, Trash2, ExternalLink, FileText } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Tabs from "../components/Tabs"
import Modal from "../components/Modal"
import TextInput from "../components/TextInput"
import FileUpload from "../components/FileUpload"
import Select from "../components/Select"
import IconButton from "../components/IconButton"
import NotificationToaster from "../components/NotificationToaster"
import Breadcrumb from "../components/Breadcrumb"
import TableHead from "../components/TopHead"

interface FileItem {
  id: string
  folderName: string
  fileName: string
  fileType: string
  isFolder: boolean
}

const DocumentManagement = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<string | number>("personal")
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false)
  const [showUploadFileModal, setShowUploadFileModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showSharedWithMeShareModal, setShowSharedWithMeShareModal] = useState(false)
  const [folderName, setFolderName] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const [selectedUser, setSelectedUser] = useState("")
  const [personalData, setPersonalData] = useState<FileItem[]>([
    {
      id: "1",
      folderName: "Vibe Copilot",
      fileName: "",
      fileType: "",
      isFolder: true,
    },
    {
      id: "2",
      folderName: "Imp Doc",
      fileName: "WhatsApp Image",
      fileType: "PDF",
      isFolder: false,
    },
  ])
  const [commonData, setCommonData] = useState<FileItem[]>([
    {
      id: "3",
      folderName: "Shared Folder",
      fileName: "",
      fileType: "",
      isFolder: true,
    },
  ])
  const [sharedData, setSharedData] = useState<FileItem[]>([
    {
      id: "4",
      folderName: "Received Folder",
      fileName: "Shared Document",
      fileType: "DOCX",
      isFolder: false,
    },
  ])
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success" as "success" | "error" | "warning" | "info",
  })

  const tabs = [
    { label: "Personal", key: "personal" },
    { label: "Common", key: "common" },
    { label: "Shared With Me", key: "shared" },
  ]

  const users = ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson"]

  const breadcrumbItems = [
    { label: "Setup", href: "/setup" },
    { label: "Document Pro", href: "/document-pro" },
  ]

  const tableColumns = [
    { label: "Action", align: "left" as const },
    { label: "Folder Name", align: "left" as const },
    { label: "File Name", align: "left" as const },
    { label: "File Type", align: "left" as const },
    { label: "File", align: "left" as const },
  ]

  const getCurrentData = () => {
    switch (activeTab) {
      case "personal":
        return personalData
      case "common":
        return commonData
      case "shared":
        return sharedData
      default:
        return personalData
    }
  }

  const updateCurrentData = (newData: FileItem[]) => {
    switch (activeTab) {
      case "personal":
        setPersonalData(newData)
        break
      case "common":
        setCommonData(newData)
        break
      case "shared":
        setSharedData(newData)
        break
    }
  }

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      const newFolder: FileItem = {
        id: Date.now().toString(),
        folderName: folderName.trim(),
        fileName: "",
        fileType: "",
        isFolder: true,
      }

      if (activeTab === "personal") {
        setPersonalData([...personalData, newFolder])
      } else if (activeTab === "common") {
        setCommonData([...commonData, newFolder])
      }

      setNotification({ show: true, message: "Folder created successfully!", type: "success" })
      setFolderName("")
      setShowCreateFolderModal(false)
    }
  }

  const handleUploadFile = () => {
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles: FileItem[] = Array.from(selectedFiles).map((file, index) => ({
        id: (Date.now() + index).toString(),
        folderName: "Uploaded Files",
        fileName: file.name,
        fileType: file.name.split(".").pop()?.toUpperCase() || "FILE",
        isFolder: false,
      }))

      if (activeTab === "personal") {
        setPersonalData([...personalData, ...newFiles])
      } else if (activeTab === "common") {
        setCommonData([...commonData, ...newFiles])
      }

      setNotification({ show: true, message: "File uploaded successfully!", type: "success" })
      setSelectedFiles(null)
      setShowUploadFileModal(false)
    }
  }

  const handleShare = () => {
    if (selectedUser) {
      setNotification({ show: true, message: `Files shared with ${selectedUser} successfully!`, type: "success" })
      setSelectedUser("")
      setShowShareModal(false)
    }
  }

  const handleSharedWithMeShare = () => {
    if (selectedUser) {
      setNotification({ show: true, message: `Files shared with ${selectedUser} successfully!`, type: "success" })
      setSelectedUser("")
      setShowSharedWithMeShareModal(false)
    }
  }

  const handleView = (item: FileItem) => {
    navigate(`/document-view/${item.id}`)
  }

  const handleDelete = (item: FileItem) => {
    const currentData = getCurrentData()
    const updatedData = currentData.filter((dataItem) => dataItem.id !== item.id)
    updateCurrentData(updatedData)
    setNotification({
      show: true,
      message: `${item.isFolder ? "Folder" : "File"} deleted successfully!`,
      type: "success",
    })
  }

  const handleShareClick = (item: FileItem) => {
    if (activeTab === "shared") {
      setShowSharedWithMeShareModal(true)
    } else {
      setShowShareModal(true)
    }
  }

  const handleBreadcrumbClick = (item: any) => {
    console.log("Breadcrumb clicked:", item.label)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6" style={{ fontFamily: 'PT Sans, sans-serif' }}>
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} onClick={handleBreadcrumbClick} className="text-sm text-gray-600" />
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          renderContent={(activeTab) => (
            <div>
              {/* Action Buttons */}
              {activeTab !== "shared" && (
                <div className="flex gap-4 mb-6">
                  <button
                    onClick={() => setShowCreateFolderModal(true)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    style={{ fontFamily: 'PT Sans, sans-serif' }}
                  >
                    Create Folder
                  </button>
                  <button
                    onClick={() => setShowUploadFileModal(true)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    style={{ fontFamily: 'PT Sans, sans-serif' }}
                  >
                    Upload File
                  </button>
                </div>
              )}

              {/* Table */}
              <div className="bg-white rounded-lg shadow-sm border">
                <table className="w-full" style={{ fontFamily: 'PT Sans, sans-serif' }}>
                  <TableHead columns={tableColumns} />
                  <tbody className="bg-white">
                    {getCurrentData().map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex gap-2">
                            <IconButton tooltip="View" onClick={() => handleView(item)}>
                              <Eye className="w-4 h-4 text-gray-600" />
                            </IconButton>
                            <IconButton tooltip="Delete" onClick={() => handleDelete(item)}>
                              <Trash2 className="w-4 h-4 text-gray-600" />
                            </IconButton>
                            <IconButton tooltip="Share" onClick={() => handleShareClick(item)}>
                              <ExternalLink className="w-4 h-4 text-gray-600" />
                            </IconButton>
                          </div>
                        </td>
                        <td className="p-4 text-gray-900" style={{ fontFamily: 'PT Sans, sans-serif' }}>{item.folderName}</td>
                        <td className="p-4 text-gray-900" style={{ fontFamily: 'PT Sans, sans-serif' }}>{item.fileName}</td>
                        <td className="p-4 text-gray-900" style={{ fontFamily: 'PT Sans, sans-serif' }}>{item.fileType}</td>
                        <td className="p-4">
                          {item.fileType === "PDF" && <FileText className="w-5 h-5 text-red-500" />}
                          {item.fileType === "DOCX" && <FileText className="w-5 h-5 text-blue-500" />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        />
      </div>

      {/* Create Folder Modal */}
      <Modal
        isOpen={showCreateFolderModal}
        onClose={() => setShowCreateFolderModal(false)}
        title="Create Folder"
        content={
          <div>
            <TextInput
              label="Folder Name"
              name="folderName"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Enter folder name"
              className="text-black"
              // style={{ color: '#000000', fontFamily: 'PT Sans, sans-serif' }}
            />
          </div>
        }
        confirmText="Create Folder"
        cancelText="Close"
        onConfirm={handleCreateFolder}
        onCancel={() => setShowCreateFolderModal(false)}
        confirmButtonClassName="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
        cancelButtonClassName="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
      />

      {/* Upload File Modal */}
      <Modal
        isOpen={showUploadFileModal}
        onClose={() => setShowUploadFileModal(false)}
        title="Upload File"
        content={
          <div>
            <FileUpload onChange={setSelectedFiles} accept="*/*" multiple={true} />
          </div>
        }
        confirmText="Upload File"
        cancelText="Close"
        onConfirm={handleUploadFile}
        onCancel={() => setShowUploadFileModal(false)}
        confirmButtonClassName="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
        cancelButtonClassName="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
      />

      {/* Share Modal for Personal and Common tabs */}
      <Modal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title="Share Folders & Files"
        content={
          <div>
            <Select
              label="Select User"
              name="user"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              options={users}
              placeholder="Select User"
            />
            {selectedUser && (
              <div className="mt-2 p-2 bg-blue-100 rounded text-blue-800" style={{ fontFamily: 'PT Sans, sans-serif' }}>
                Selected: {selectedUser}
              </div>
            )}
          </div>
        }
        confirmText="Share"
        cancelText="Close"
        onConfirm={handleShare}
        onCancel={() => setShowShareModal(false)}
        confirmButtonClassName="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
        cancelButtonClassName="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
      />

      {/* Share Modal for Shared With Me tab */}
      <Modal
        isOpen={showSharedWithMeShareModal}
        onClose={() => setShowSharedWithMeShareModal(false)}
        title="Share Folders & Files"
        content={
          <div>
            <Select
              label="Select User"
              name="user"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              options={users}
              placeholder="Select User"
            />
            {selectedUser && (
              <div className="mt-2 p-2 bg-blue-100 rounded text-blue-800" style={{ fontFamily: 'PT Sans, sans-serif' }}>
                Selected: {selectedUser}
              </div>
            )}
          </div>
        }
        confirmText="Create Folder"
        cancelText="Close"
        onConfirm={handleSharedWithMeShare}
        onCancel={() => setShowSharedWithMeShareModal(false)}
        confirmButtonClassName="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
        cancelButtonClassName="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
      />

      {/* Notification Toaster */}
      <NotificationToaster
        message={notification.message}
        type={notification.type}
        isVisible={notification.show}
        onClose={() => setNotification({ ...notification, show: false })}
        position="top-right"
      />
    </div>
  )
}

export default DocumentManagement