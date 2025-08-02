"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { useCardEditor } from "../context/CardEditorContext"

const BackgroundEditor = () => {
  const { editorState, updateBackground } = useCardEditor()
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [customColor, setCustomColor] = useState("#1cd5b7")

  const recommendedColors = ["#1cd5b7", "#000000", "#F97316", "#3B82F6", "#FFFFFF"]
  const logoColors = ["#1cd5b7", "#3B82F6", "#F97316"]
  const defaultColors = [
    "#1cd5b7",
    "#3B82F6",
    "#F97316",
    "#FFFFFF",
    "#EC4899",
    "#F3E8FF",
    "#DC2626",
    "#FCD34D",
    "#A855F7",
    "#10B981",
    "#6366F1",
    "#000000",
    "#7C2D12",
    "#D97706",
    "#06B6D4",
    "#9CA3AF",
    "#6B7280",
    "#14B8A6",
  ]
  const gradientColors = [
    "#1cd5b7",
    "#7C2D12",
    "#1E40AF",
    "#9CA3AF",
    "#EC4899",
    "#F3E8FF",
    "#DC2626",
    "#FCD34D",
    "#A855F7",
    "#10B981",
    "#6366F1",
    "#000000",
  ]

  const handleColorChange = (color: string) => {
    updateBackground({ backgroundColor: color })
  }

  const handleCustomColorChange = (color: string) => {
    setCustomColor(color)
    updateBackground({ backgroundColor: color })
  }

  const handleBackgroundTypeChange = (type: "solid" | "gradient") => {
    updateBackground({ backgroundType: type })
  }

  const ColorSection = ({ title, colors, isRow = false }: { title: string; colors: string[]; isRow?: boolean }) => (
    <div className="mb-2">
      <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
      {isRow ? (
        <div className="flex gap-2">
          {colors.map((color, index) => (
            <button
              key={`${title}-${index}`}
              onClick={() => handleColorChange(color)}
              className={`w-9 h-9 rounded-lg border-2 transition-all hover:scale-105 ${
                editorState.backgroundColor === color
                  ? "border-gray-400 scale-110 ring-2 ring-blue-300"
                  : "border-gray-200"
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      ) : (
        <div className="w-60 grid grid-cols-5 gap-2">
          {colors.map((color, index) => (
            <button
              key={`${title}-${index}`}
              onClick={() => handleColorChange(color)}
              className={`w-9 h-9 rounded-lg border-2 transition-all hover:scale-105 ${
                editorState.backgroundColor === color
                  ? "border-gray-400 scale-110 ring-2 ring-blue-300"
                  : "border-gray-200"
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-4">
      {/* Current Background Preview */}
      <div className="mb-4">
        <h3 className="text-sm text-gray-600 mb-2">Current Background</h3>
        <div
          className="w-full h-12 rounded-lg border-2 border-gray-300"
          style={{
            background:
              editorState.backgroundType === "gradient"
                ? `linear-gradient(135deg, ${editorState.gradientColors.join(", ")})`
                : editorState.backgroundColor,
          }}
        />
        <p className="text-xs text-gray-500 mt-1">
          {editorState.backgroundType === "gradient" ? "Gradient" : "Solid"} - {editorState.backgroundColor}
        </p>
      </div>

      {/* Background Type Selection */}
      <div className="mb-4">
        <h3 className="text-sm text-gray-600 mb-2">Background Type</h3>
        <div className="flex gap-2">
          <button
            onClick={() => handleBackgroundTypeChange("solid")}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              editorState.backgroundType === "solid"
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Solid
          </button>
          <button
            onClick={() => handleBackgroundTypeChange("gradient")}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              editorState.backgroundType === "gradient"
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Gradient
          </button>
        </div>
      </div>

      {/* Custom Color Picker */}
      <div>
        <h3 className="text-sm text-gray-600 mb-3">Custom Color</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="w-12 h-12 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors"
          >
            <Plus className="w-6 h-6 text-gray-400" />
          </button>
          <input
            type="color"
            value={customColor}
            onChange={(e) => handleCustomColorChange(e.target.value)}
            className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={customColor}
            onChange={(e) => handleCustomColorChange(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="#1cd5b7"
          />
        </div>
      </div>

      <ColorSection title="Recommended Colours" colors={recommendedColors} isRow={true} />
      <ColorSection title="Logo Colours" colors={logoColors} isRow={true} />
      <ColorSection title="Default Colours" colors={defaultColors} />
      <ColorSection title="Gradient Colours" colors={gradientColors} />

      {/* Real-time Preview */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Live Preview</h4>
        <div className="grid grid-cols-3 gap-2">
          <div
            className="h-16 rounded-lg border border-gray-200"
            style={{ backgroundColor: editorState.backgroundColor }}
          />
          <div
            className="h-16 rounded-lg border border-gray-200"
            style={{
              background: `linear-gradient(45deg, ${editorState.backgroundColor}, #ffffff)`,
            }}
          />
          <div
            className="h-16 rounded-lg border border-gray-200"
            style={{
              background: `linear-gradient(135deg, ${editorState.backgroundColor}, #000000)`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default BackgroundEditor
