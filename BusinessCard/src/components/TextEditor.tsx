"use client"

import { useState } from "react"
import { ChevronDown, Plus, Minus, Bold } from "lucide-react"
import { useCardEditor } from "../context/CardEditorContext"

const TextEditor = () => {
  const { editorState, updateCardContent, updateTextStyling, selectElement } = useCardEditor()
  const [showFontDropdown, setShowFontDropdown] = useState(false)

  const fonts = ["PT Sans", "Stylish", "Sterling Bc", "Limelight", "Roboto", "Arial", "Helvetica", "Times New Roman"]
  const colors = ["#1cd5b7", "#3B82F6", "#F97316", "#EF4444", "#10B981", "#8B5CF6", "#FFFFFF", "#000000"]

  const getSelectedElementText = () => {
    switch (editorState.selectedElement) {
      case "name":
        return editorState.name
      case "position":
        return editorState.position
      case "company":
        return editorState.companyName
      case "phone":
        return editorState.phone
      case "email":
        return editorState.email
      case "address":
        return editorState.address
      case "website":
        return editorState.website
      default:
        return ""
    }
  }

  const getSelectedElementFont = () => {
    switch (editorState.selectedElement) {
      case "name":
        return editorState.nameFont
      case "position":
        return editorState.positionFont
      case "company":
        return editorState.companyFont
      default:
        return editorState.contactFont
    }
  }

  const getSelectedElementFontSize = () => {
    switch (editorState.selectedElement) {
      case "name":
        return editorState.nameFontSize
      case "position":
        return editorState.positionFontSize
      case "company":
        return editorState.companyFontSize
      default:
        return editorState.contactFontSize
    }
  }

  const getSelectedElementColor = () => {
    switch (editorState.selectedElement) {
      case "name":
        return editorState.nameColor
      case "position":
        return editorState.positionColor
      case "company":
        return editorState.companyColor
      default:
        return editorState.contactColor
    }
  }

  const getSelectedElementBold = () => {
    switch (editorState.selectedElement) {
      case "name":
        return editorState.nameBold
      case "position":
        return editorState.positionBold
      case "company":
        return editorState.companyBold
      default:
        return editorState.contactBold
    }
  }

  const handleTextChange = (text: string) => {
    const updates: any = {}
    switch (editorState.selectedElement) {
      case "name":
        updates.name = text
        break
      case "position":
        updates.position = text
        break
      case "company":
        updates.companyName = text
        break
      case "phone":
        updates.phone = text
        break
      case "email":
        updates.email = text
        break
      case "address":
        updates.address = text
        break
      case "website":
        updates.website = text
        break
    }
    updateCardContent(updates)
  }

  const handleFontChange = (font: string) => {
    const updates: any = {}
    switch (editorState.selectedElement) {
      case "name":
        updates.nameFont = font
        break
      case "position":
        updates.positionFont = font
        break
      case "company":
        updates.companyFont = font
        break
      default:
        updates.contactFont = font
        break
    }
    updateTextStyling(updates)
    setShowFontDropdown(false)
  }

  const handleFontSizeChange = (increment: boolean) => {
    const currentSize = getSelectedElementFontSize()
    const newSize = increment ? currentSize + 1 : currentSize - 1
    const clampedSize = Math.max(8, Math.min(72, newSize))

    const updates: any = {}
    switch (editorState.selectedElement) {
      case "name":
        updates.nameFontSize = clampedSize
        break
      case "position":
        updates.positionFontSize = clampedSize
        break
      case "company":
        updates.companyFontSize = clampedSize
        break
      default:
        updates.contactFontSize = clampedSize
        break
    }
    updateTextStyling(updates)
  }

  const handleColorChange = (color: string) => {
    const updates: any = {}
    switch (editorState.selectedElement) {
      case "name":
        updates.nameColor = color
        break
      case "position":
        updates.positionColor = color
        break
      case "company":
        updates.companyColor = color
        break
      default:
        updates.contactColor = color
        break
    }
    updateTextStyling(updates)
  }

  const handleBoldToggle = () => {
    const currentBold = getSelectedElementBold()
    const updates: any = {}
    switch (editorState.selectedElement) {
      case "name":
        updates.nameBold = !currentBold
        break
      case "position":
        updates.positionBold = !currentBold
        break
      case "company":
        updates.companyBold = !currentBold
        break
      default:
        updates.contactBold = !currentBold
        break
    }
    updateTextStyling(updates)
  }

  return (
    <div className="space-y-6">
      {/* Element Selection Info */}
      {!editorState.selectedElement && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-blue-700 text-sm">Click on any text element in the card to start editing</p>
        </div>
      )}

      {editorState.selectedElement && (
        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-green-700 text-sm font-medium">
            Editing: {editorState.selectedElement.charAt(0).toUpperCase() + editorState.selectedElement.slice(1)}
          </p>
        </div>
      )}

      {/* Text Content */}
      <div>
        <textarea
          placeholder="Select Text to Edit"
          value={getSelectedElementText()}
          onChange={(e) => handleTextChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={editorState.selectedElement === "address" ? 3 : 1}
          disabled={!editorState.selectedElement}
        />
      </div>

      {/* Font Selection */}
      <div className="relative">
        <button
          onClick={() => setShowFontDropdown(!showFontDropdown)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-gray-400 transition-colors disabled:opacity-50"
          disabled={!editorState.selectedElement}
        >
          <span className={getSelectedElementFont() ? "text-gray-900" : "text-gray-500"}>
            {getSelectedElementFont() || "Select Font"}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform ${showFontDropdown ? "rotate-180" : ""}`}
          />
        </button>

        {showFontDropdown && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
            <div className="px-4 py-2 text-sm text-gray-500 bg-gray-50 border-b">Select</div>
            {fonts.map((font) => (
              <button
                key={font}
                onClick={() => handleFontChange(font)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                style={{ fontFamily: font }}
              >
                {font}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Color Selection */}
      <div className="flex gap-2 flex-wrap">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => handleColorChange(color)}
            className={`w-8 h-8 rounded-lg border-2 transition-all disabled:opacity-50 ${
              getSelectedElementColor() === color ? "border-gray-400 scale-110" : "border-gray-200"
            }`}
            style={{ backgroundColor: color }}
            disabled={!editorState.selectedElement}
          />
        ))}
      </div>

      {/* Font Size Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleFontSizeChange(false)}
          className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
          disabled={!editorState.selectedElement}
        >
          <Minus className="w-4 h-4" />
        </button>
        <input
          type="number"
          value={getSelectedElementFontSize()}
          onChange={(e) => {
            const size = Number.parseInt(e.target.value) || 12
            const updates: any = {}
            switch (editorState.selectedElement) {
              case "name":
                updates.nameFontSize = size
                break
              case "position":
                updates.positionFontSize = size
                break
              case "company":
                updates.companyFontSize = size
                break
              default:
                updates.contactFontSize = size
                break
            }
            updateTextStyling(updates)
          }}
          className="w-16 px-2 py-1 border border-gray-300 rounded text-center disabled:opacity-50"
          disabled={!editorState.selectedElement}
        />
        <button
          onClick={() => handleFontSizeChange(true)}
          className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
          disabled={!editorState.selectedElement}
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={handleBoldToggle}
          className={`w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 ${
            getSelectedElementBold() ? "bg-gray-200" : ""
          }`}
          disabled={!editorState.selectedElement}
        >
          <Bold className="w-4 h-4" />
        </button>
      </div>

      {/* Spacing and Alignment Controls */}
      <div className="flex flex-col gap-2 mt-2">
        {/* Alignment */}
        <div className="flex items-center gap-1 mb-1">
          {(["left", "center", "right"] as const).map(alignment => (
            <button
              key={alignment}
              onClick={() => {
                const updates: any = {}
                switch (editorState.selectedElement) {
                  case "name": updates.nameAlign = alignment; break
                  case "position": updates.positionAlign = alignment; break
                  case "company": updates.companyAlign = alignment; break
                  default: updates.contactAlign = alignment; break
                }
                updateTextStyling(updates)
              }}
              className={`w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 ${(() => {
                switch (editorState.selectedElement) {
                  case "name": return editorState.nameAlign === alignment ? "bg-blue-200" : ""
                  case "position": return editorState.positionAlign === alignment ? "bg-blue-200" : ""
                  case "company": return editorState.companyAlign === alignment ? "bg-blue-200" : ""
                  default: return editorState.contactAlign === alignment ? "bg-blue-200" : ""
                }
              })()}`}
              disabled={!editorState.selectedElement}
              type="button"
            >
              {alignment === "left" && (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="5" width="14" height="2" rx="1" fill="#888"/><rect x="3" y="9" width="10" height="2" rx="1" fill="#888"/><rect x="3" y="13" width="14" height="2" rx="1" fill="#888"/></svg>
              )}
              {alignment === "center" && (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="5" y="5" width="10" height="2" rx="1" fill="#888"/><rect x="3" y="9" width="14" height="2" rx="1" fill="#888"/><rect x="5" y="13" width="10" height="2" rx="1" fill="#888"/></svg>
              )}
              {alignment === "right" && (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="5" width="14" height="2" rx="1" fill="#888"/><rect x="7" y="9" width="10" height="2" rx="1" fill="#888"/><rect x="3" y="13" width="14" height="2" rx="1" fill="#888"/></svg>
              )}
            </button>
          ))}
        </div>
        {/* Spacing */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Spacing</span>
          <input
            type="range"
            min={0}
            max={40}
            step={1}
            value={(() => {
              switch (editorState.selectedElement) {
                case "name": return editorState.nameSpacing
                case "position": return editorState.positionSpacing
                case "company": return editorState.companySpacing
                default: return editorState.contactSpacing
              }
            })()}
            onChange={e => {
              const value = Number(e.target.value)
              const updates: any = {}
              switch (editorState.selectedElement) {
                case "name": updates.nameSpacing = value; break
                case "position": updates.positionSpacing = value; break
                case "company": updates.companySpacing = value; break
                default: updates.contactSpacing = value; break
              }
              updateTextStyling(updates)
            }}
            className="w-24"
            disabled={!editorState.selectedElement}
          />
          <input
            type="number"
            min={0}
            max={40}
            value={(() => {
              switch (editorState.selectedElement) {
                case "name": return editorState.nameSpacing
                case "position": return editorState.positionSpacing
                case "company": return editorState.companySpacing
                default: return editorState.contactSpacing
              }
            })()}
            onChange={e => {
              const value = Number(e.target.value)
              const updates: any = {}
              switch (editorState.selectedElement) {
                case "name": updates.nameSpacing = value; break
                case "position": updates.positionSpacing = value; break
                case "company": updates.companySpacing = value; break
                default: updates.contactSpacing = value; break
              }
              updateTextStyling(updates)
            }}
            className="w-12 px-1 py-1 border border-gray-300 rounded text-center disabled:opacity-50"
            disabled={!editorState.selectedElement}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700">Quick Select:</h4>
        <div className="flex gap-2 flex-wrap">
          {["name", "position", "company", "phone", "email", "address"].map((element) => (
            <button
              key={element}
              onClick={() => selectElement(element as any)}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                editorState.selectedElement === element
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
              }`}
            >
              {element.charAt(0).toUpperCase() + element.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TextEditor
