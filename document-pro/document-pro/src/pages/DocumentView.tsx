import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, FileText, Folder } from "lucide-react"
import Breadcrumb from "../components/Breadcrumb"
import mobileImage from '../images/mobile.png'

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

const DocumentView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [document, setDocument] = useState<FileItem | null>(null)

  useEffect(() => {
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
  }, [id])

  const breadcrumbItems = [
    { label: "Setup", href: "/setup" },
    { label: "Document Pro", href: "/document-pro" },
    { label: "Document Management", href: "/document-management" },
    { label: "View Document", href: "#" },
  ]

  const handleBreadcrumbClick = (item: any) => {
    if (item.href === "/document-management") {
      navigate("/document-management")
    }
  }

  const handleBack = () => {
    navigate("/document-management")
  }

  if (!document) {
    return <div className="min-h-screen bg-gray-50 p-6" style={{ fontFamily: "'PT Sans', sans-serif" }}>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6" style={{ fontFamily: "'PT Sans', sans-serif" }}>
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} onClick={handleBreadcrumbClick} className="text-sm text-gray-600" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleBack} 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            style={{ fontFamily: "'PT Sans', sans-serif" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Documents
          </button>
        </div>
      </div>

      {/* Document Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'PT Sans', sans-serif" }}>
          Vibe Copilot
        </h1>
      </div>

      {/* Mobile Image Display */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-center">
          <img 
            src={mobileImage} 
            alt="Vibe Connect Mobile App" 
            className="max-w-full h-auto rounded-lg"
            style={{ 
              maxWidth: '400px',
              height: 'auto'
            }} 
          />
        </div>
      </div>
    </div>
  )
}

export default DocumentView