"use client"

import type React from "react"
import { useState, useRef } from "react"
import { ChevronDown, Upload, Plus, Minus, Bold } from "lucide-react"
import { useCardEditor } from "../context/CardEditorContext"

const LogoEditor = () => {
  const { editorState, updateLogo } = useCardEditor()
  const [showFontDropdown, setShowFontDropdown] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fonts = ["PT Sans", "Stylish", "Sterling Bc", "Limelight", "Roboto", "Arial", "Helvetica"]
  const logoColors = ["#1cd5b7", "#3B82F6", "#F97316", "#FFFFFF", "#000000"]

  const handleLogoUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        updateLogo({ logoImage: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFontChange = (font: string) => {
    updateLogo({ logoFont: font })
    setShowFontDropdown(false)
  }

  const handleLogoTextChange = (text: string) => {
    updateLogo({ logoText: text })
  }

  const handleColorChange = (color: string) => {
    updateLogo({ logoColor: color })
  }

  const handleFontSizeChange = (increment: boolean) => {
    const newSize = increment ? editorState.logoFontSize + 1 : editorState.logoFontSize - 1
    updateLogo({ logoFontSize: Math.max(8, Math.min(72, newSize)) })
  }

  const handleBoldToggle = () => {
    updateLogo({ logoBold: !editorState.logoBold })
  }

  const removeLogo = () => {
    updateLogo({ logoImage: null })
  }

  return (
    <div className="space-y-6">
      {/* Logo Upload Section */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <button
            onClick={handleLogoUpload}
            className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors"
          >
            <Upload className="w-6 h-6 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">Upload Logo</span>
          </button>
          <p className="text-xs text-gray-500 mt-1 text-center">PNG, JPG, SVG</p>
        </div>
        <div>
          <div className="w-full h-24 bg-black rounded-lg flex items-center justify-center relative overflow-hidden">
            {editorState.logoImage ? (
              <>
                <img
                  src={editorState.logoImage || "/placeholder.svg"}
                  alt="Logo Preview"
                  className="max-w-full max-h-full object-contain"
                />
                <button
                  onClick={removeLogo}
                  className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                >
                  ×
                </button>
              </>
            ) : (
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 via-orange-500 to-pink-500 rounded-full"></div>
            )}
          </div>
          <div className="text-center text-sm text-gray-500 mt-2">Logo Preview</div>
        </div>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

      {/* Logo Colors */}
      <div>
        <h3 className="text-sm text-gray-600 mb-3">Logo Colours</h3>
        <div className="flex gap-2">
          {logoColors.map((color) => (
            <button
              key={color}
              onClick={() => handleColorChange(color)}
              className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 ${
                editorState.logoColor === color ? "border-gray-400 scale-110 ring-2 ring-blue-300" : "border-gray-200"
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Logo Text */}
      <div>
        <label className="block text-sm text-gray-600 mb-2">Logo Text</label>
        <input
          type="text"
          placeholder="Company Name"
          value={editorState.logoText}
          onChange={(e) => handleLogoTextChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Font Selection */}
      <div className="relative">
        <label className="block text-sm text-gray-600 mb-2">Font</label>
        <button
          onClick={() => setShowFontDropdown(!showFontDropdown)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-gray-400 transition-colors"
        >
          <span className={editorState.logoFont ? "text-gray-900" : "text-gray-500"}>
            {editorState.logoFont || "Select Font"}
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

      {/* Font Size Controls */}
      <div>
        <label className="block text-sm text-gray-600 mb-2">Font Size & Style</label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleFontSizeChange(false)}
            className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
          >
            <Minus className="w-4 h-4" />
          </button>
          <input
            type="number"
            value={editorState.logoFontSize}
            onChange={(e) => updateLogo({ logoFontSize: Number.parseInt(e.target.value) || 14 })}
            className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
          />
          <button
            onClick={() => handleFontSizeChange(true)}
            className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={handleBoldToggle}
            className={`w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 ${
              editorState.logoBold ? "bg-gray-200" : ""
            }`}
          >
            <Bold className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Logo Preview */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Live Preview</h4>
        <div className="flex items-center gap-3 p-3 bg-black rounded-lg">
          {editorState.logoImage ? (
            <img src={editorState.logoImage || "/placeholder.svg"} alt="Logo" className="w-8 h-8 object-contain" />
          ) : (
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 via-orange-500 to-pink-500 rounded-full"></div>
          )}
          <div>
            <div
              style={{
                fontFamily: editorState.logoFont,
                fontSize: `${editorState.logoFontSize}px`,
                color: editorState.logoColor,
                fontWeight: editorState.logoBold ? "bold" : "normal",
              }}
            >
              {editorState.logoText || "Company Name"}
            </div>
            <div className="text-xs text-gray-400">Tag Line Goes Here</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogoEditor
