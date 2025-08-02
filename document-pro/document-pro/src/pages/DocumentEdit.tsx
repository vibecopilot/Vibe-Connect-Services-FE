
import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Save } from "lucide-react"
import Breadcrumb from "../components/Breadcrumb"
import TextInput from "../components/TextInput"
import TextArea from "../components/TextArea"
import Select from "../components/Select"
import NotificationToaster from "../components/NotificationToaster"

interface FileItem {
  id: string
  folderName: string
  fileName: string
  fileType: string
  isFolder: boolean
  createdDate?: string
  size?: string
  description?: string
}

const DocumentEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [document, setDocument] = useState<FileItem | null>(null)
  const [formData, setFormData] = useState({
    fileName: "",
    folderName: "",
    fileType: "",
    description: "",
  })
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success" as "success" | "error" | "warning" | "info",
  })

  const fileTypes = ["PDF", "DOCX", "XLSX", "PPTX", "TXT", "JPG", "PNG"]

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockDocument: FileItem = {
      id: id || "1",
      folderName: "Vibe Copilot",
      fileName: "WhatsApp Image",
      fileType: "PDF",
      isFolder: false,
      createdDate: "2024-01-15",
      size: "2.5 MB",
      description: "Important document for project collaboration",
    }
    setDocument(mockDocument)
    setFormData({
      fileName: mockDocument.fileName,
      folderName: mockDocument.folderName,
      fileType: mockDocument.fileType,
      description: mockDocument.description || "",
    })
  }, [id])

  const breadcrumbItems = [
    { label: "Setup", href: "/setup" },
    { label: "Document Pro", href: "/document-pro" },
    { label: "Document Management", href: "/document-management" },
    { label: "Edit Document", href: "#" },
  ]

  const handleBreadcrumbClick = (item: any) => {
    if (item.href === "/document-management") {
      navigate("/document-management")
    }
  }

  const handleBack = () => {
    navigate(`/document-view/${id}`)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = () => {
    setNotification({
      show: true,
      message: "Document updated successfully!",
      type: "success",
    })

    setTimeout(() => {
      navigate(`/document-view/${id}`)
    }, 1500)
  }

  if (!document) {
    return <div className="min-h-screen bg-gray-50 p-6">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} onClick={handleBreadcrumbClick} className="text-sm text-gray-600" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={handleBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
            <ArrowLeft className="w-4 h-4" />
            Back to View
          </button>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      {/* Edit Form */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit {document.isFolder ? "Folder" : "Document"}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <TextInput
              label={document.isFolder ? "Folder Name" : "File Name"}
              name="fileName"
              value={formData.fileName}
              onChange={handleInputChange}
              required
            />

            {!document.isFolder && (
              <Select
                label="File Type"
                name="fileType"
                value={formData.fileType}
                onChange={handleInputChange}
                options={fileTypes}
                required
              />
            )}

            <TextInput
              label="Parent Folder"
              name="folderName"
              value={formData.folderName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Created Date</label>
              <div className="p-3 bg-gray-100 rounded-md text-gray-600">{document.createdDate} (Read-only)</div>
            </div>

            {!document.isFolder && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">File Size</label>
                <div className="p-3 bg-gray-100 rounded-md text-gray-600">{document.size} (Read-only)</div>
              </div>
            )}

            <TextArea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Enter description..."
            />
          </div>
        </div>
      </div>

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

export default DocumentEdit
