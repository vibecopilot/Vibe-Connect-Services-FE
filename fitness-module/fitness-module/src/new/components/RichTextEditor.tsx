import { useState } from 'react'
import { Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered, Link, Image, Video, Code, Quote, Maximize, ChevronDown, MoreHorizontal, Type, Palette } from 'lucide-react'

interface RichTextEditorProps {
  label?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function RichTextEditor({ 
  label, 
  value, 
  onChange, 
  placeholder = "Enter text...",
  className = ""
}: RichTextEditorProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleCommand = (command: string) => {
    document.execCommand(command, false, undefined)
  }

  const handleFontChange = (font: string) => {
    document.execCommand('fontName', false, font)
  }

  const handleFontSizeChange = (size: string) => {
    document.execCommand('fontSize', false, size)
  }

  return (
    <div className={`border border-gray-300 rounded-md ${className}`}>
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}
      
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 flex-wrap">
        {/* Text formatting */}
        <button
          onClick={() => handleCommand('bold')}
          className="p-1 hover:bg-gray-200 rounded text-sm font-bold"
          title="Bold"
        >
          B
        </button>
        <button
          onClick={() => handleCommand('italic')}
          className="p-1 hover:bg-gray-200 rounded text-sm italic"
          title="Italic"
        >
          I
        </button>
        <button
          onClick={() => handleCommand('underline')}
          className="p-1 hover:bg-gray-200 rounded text-sm underline"
          title="Underline"
        >
          U
        </button>
        <button
          onClick={() => handleCommand('strikeThrough')}
          className="p-1 hover:bg-gray-200 rounded text-sm line-through"
          title="Strikethrough"
        >
          S
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Font family */}
        <select 
          onChange={(e) => handleFontChange(e.target.value)}
          className="text-sm border-none bg-transparent hover:bg-gray-200 rounded px-2 py-1"
          defaultValue="PT Sans"
        >
          <option value="PT Sans">PT Sans</option>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Helvetica">Helvetica</option>
        </select>

        {/* Font size */}
        <select 
          onChange={(e) => handleFontSizeChange(e.target.value)}
          className="text-sm border-none bg-transparent hover:bg-gray-200 rounded px-2 py-1"
          defaultValue="10"
        >
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="14">14</option>
          <option value="16">16</option>
          <option value="18">18</option>
        </select>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Text color */}
        <button className="p-1 hover:bg-gray-200 rounded" title="Text Color">
          <Type className="w-4 h-4" />
        </button>

        {/* Background color */}
        <button className="p-1 hover:bg-gray-200 rounded" title="Background Color">
          <Palette className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Alignment */}
        <button
          onClick={() => handleCommand('justifyLeft')}
          className="p-1 hover:bg-gray-200 rounded"
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleCommand('justifyCenter')}
          className="p-1 hover:bg-gray-200 rounded"
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleCommand('justifyRight')}
          className="p-1 hover:bg-gray-200 rounded"
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleCommand('justifyFull')}
          className="p-1 hover:bg-gray-200 rounded"
          title="Justify"
        >
          <AlignJustify className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Lists */}
        <button
          onClick={() => handleCommand('insertUnorderedList')}
          className="p-1 hover:bg-gray-200 rounded"
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleCommand('insertOrderedList')}
          className="p-1 hover:bg-gray-200 rounded"
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Indent */}
        <button
          onClick={() => handleCommand('indent')}
          className="p-1 hover:bg-gray-200 rounded text-sm"
          title="Increase Indent"
        >
          →
        </button>
        <button
          onClick={() => handleCommand('outdent')}
          className="p-1 hover:bg-gray-200 rounded text-sm"
          title="Decrease Indent"
        >
          ←
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Insert elements */}
        <button className="p-1 hover:bg-gray-200 rounded" title="Insert Link">
          <Link className="w-4 h-4" />
        </button>
        <button className="p-1 hover:bg-gray-200 rounded" title="Insert Image">
          <Image className="w-4 h-4" />
        </button>
        <button className="p-1 hover:bg-gray-200 rounded" title="Insert Video">
          <Video className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Code and quote */}
        <button
          onClick={() => handleCommand('formatBlock')}
          className="p-1 hover:bg-gray-200 rounded"
          title="Code Block"
        >
          <Code className="w-4 h-4" />
        </button>
        <button className="p-1 hover:bg-gray-200 rounded" title="Quote">
          <Quote className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* More options */}
        <button className="p-1 hover:bg-gray-200 rounded" title="More Options">
          <MoreHorizontal className="w-4 h-4" />
        </button>

        <div className="ml-auto flex items-center gap-1">
          {/* Fullscreen toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1 hover:bg-gray-200 rounded"
            title="Fullscreen"
          >
            <Maximize className="w-4 h-4" />
          </button>
          
          {/* Dropdown arrow */}
          <button className="p-1 hover:bg-gray-200 rounded" title="More">
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor */}
      <div
        contentEditable
        className={`p-3 min-h-[120px] focus:outline-none ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''}`}
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        style={{ minHeight: isFullscreen ? '80vh' : '120px' }}
      />
    </div>
  )
}