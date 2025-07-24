"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Undo, Redo, Trash2, Search } from "lucide-react"
import { useTemplate } from "../context/TemplateContext"
import { useCardEditor } from "../context/CardEditorContext"
import {
  EditableSalesMarketingFront,
  EditableSalesMarketingBack,
  EditableModernCorporateFront,
  EditableModernCorporateBack,
  EditableSimpleProfessionalFront,
  EditableSimpleProfessionalBack,
  EditableCreativeDesignFront,
  EditableCreativeDesignBack,
  EditableServiceProfessionalFront,
  EditableServiceProfessionalBack,
} from "./EditableCard"
import TextEditor from "./TextEditor"
import BackgroundEditor from "./BackgroundEditor"
import LogoEditor from "./LogoEditor"

import QREditor from "./QREditor"
import ImageEditor from "./ImageEditor"

type EditorMode = "text" | "background" | "logo" | "qr" | "image"

const CardEditor = () => {
  const navigate = useNavigate()
  const { selectedTemplate } = useTemplate()
  const { editorState, undo, redo, deleteSelected } = useCardEditor()
  const [activeMode, setActiveMode] = useState<EditorMode>("text")

  const handleSave = () => {
    console.log("Saving card...", editorState)
    // Navigate to final card preview page
    navigate("/final-card-preview")
  }

  const handleDownload = () => {
    console.log("Downloading card...", editorState)
    // Implement download functionality
  }

  if (!selectedTemplate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No template selected</p>
          <button onClick={() => navigate("/template-selection")} className="text-blue-600 hover:text-blue-700">
            Go back to template selection
          </button>
        </div>
      </div>
    )
  }

  // Use editable components based on template category
  const renderEditableCard = () => {
    if (selectedTemplate.category === "Sales & Marketing") {
      return (
        <div className="flex gap-12">
          <div className="transform scale-75">
            <EditableSalesMarketingFront />
          </div>
          <div className="transform scale-75">
            <EditableSalesMarketingBack />
          </div>
        </div>
      )
    } else if (selectedTemplate.category === "Simple Professional") {
      return (
        <div className="flex gap-12">
          <div className="transform scale-75">
            <EditableSimpleProfessionalFront />
          </div>
          <div className="transform scale-75">
            <EditableSimpleProfessionalBack />
          </div>
        </div>
      )
    } else if (selectedTemplate.category === "Creative & Design") {
      return (
        <div className="flex gap-12">
          <div className="transform scale-75">
            <EditableCreativeDesignFront />
          </div>
          <div className="transform scale-75">
            <EditableCreativeDesignBack />
          </div>
        </div>
      )
    } else if (selectedTemplate.category === "Service Professionals") {
      return (
        <div className="flex gap-12">
          <div className="transform scale-75">
            <EditableServiceProfessionalFront />
          </div>
          <div className="transform scale-75">
            <EditableServiceProfessionalBack />
          </div>
        </div>
      )
    } else {
      return (
        <div className="flex gap-12">
          <div className="transform scale-75">
            <EditableModernCorporateFront />
          </div>
          <div className="transform scale-75">
            <EditableModernCorporateBack />
          </div>
        </div>
      )
    }
  }

  const renderEditor = () => {
    switch (activeMode) {
      case "text":
        return <TextEditor />
      case "background":
        return <BackgroundEditor />
      case "logo":
        return <LogoEditor />
      case "qr":
        return <QREditor />
      case "image":
        return <ImageEditor />
      default:
        return <TextEditor />
    }
  }

  const getEditorTitle = () => {
    switch (activeMode) {
      case "text":
        return "Edit Text"
      case "background":
        return "Edit Background"
      case "logo":
        return "Edit Logo"
      case "qr":
        return "Edit QR"
      case "image":
        return "Edit Image"
      default:
        return "Edit"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Card Preview - 60-65% */}
      <div className="w-[62%] p-8 flex flex-col">
        {/* Top Toolbar */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={undo}
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Undo className="w-4 h-4" />
            <span className="text-sm">Undo</span>
          </button>
          <button
            onClick={redo}
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Redo className="w-4 h-4" />
            <span className="text-sm">Redo</span>
          </button>
          <button
            onClick={deleteSelected}
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm">Delete</span>
          </button>
        </div>

        {/* Card Preview */}
        <div className="flex-1 flex items-center justify-center">{renderEditableCard()}</div>

        {/* Bottom Controls */}
        <div className="flex items-center justify-between mt-8">
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleDownload}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Download
            </button>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Search className="w-4 h-4" />
            <span className="text-sm">{editorState.zoom}%</span>
          </div>
        </div>
      </div>

      {/* Editor Panel - 35-38% */}
      <div className="w-[38%] bg-white border-l border-gray-200 flex">
        {/* Tool Sidebar */}
        <div className="w-20 bg-gray-100 border-r border-gray-200 flex flex-col items-center py-6 gap-4">
          <button
            onClick={() => setActiveMode("text")}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
              activeMode === "text" ? "bg-blue-500 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="text-lg font-bold">T</div>
          </button>
          <div className="text-xs text-gray-500 text-center">Text</div>

          <button
            onClick={() => setActiveMode("background")}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
              activeMode === "background" ? "bg-blue-500 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="w-6 h-6 bg-gradient-to-br from-gray-400 to-gray-600 rounded"></div>
          </button>
          <div className="text-xs text-gray-500 text-center">Background</div>

          <button
            onClick={() => setActiveMode("logo")}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
              activeMode === "logo" ? "bg-blue-500 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
          </button>
          <div className="text-xs text-gray-500 text-center">Logo</div>

          <button
            onClick={() => setActiveMode("qr")}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
              activeMode === "qr" ? "bg-blue-500 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="grid grid-cols-3 grid-rows-3 gap-0.5 w-6 h-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="bg-gray-600 rounded-sm"></div>
              ))}
            </div>
          </button>
          <div className="text-xs text-gray-500 text-center">QR Code</div>

          <button
            onClick={() => setActiveMode("image")}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
              activeMode === "image" ? "bg-blue-500 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="w-6 h-6 bg-gray-400 rounded border-2 border-gray-500"></div>
          </button>
          <div className="text-xs text-gray-500 text-center">Image</div>
        </div>

        {/* Editor Panel */}
        <div className="flex-1 p-6 pr-0">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">{getEditorTitle()}</h2>
          {renderEditor()}
        </div>
      </div>
    </div>
  )
}

export default CardEditor
