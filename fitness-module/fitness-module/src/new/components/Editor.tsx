
import type React from "react"

import { useState } from "react"
import type { SerializedEditorState } from "lexical"

// Mock editor component since we can't install the actual shadcn editor
interface EditorProps {
  editorSerializedState?: SerializedEditorState
  onSerializedChange?: (value: SerializedEditorState) => void
  placeholder?: string
}

const Editor: React.FC<EditorProps> = ({
  editorSerializedState,
  onSerializedChange,
  placeholder = "Enter description...",
}) => {
  const [content, setContent] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
    // Mock serialized change
    if (onSerializedChange) {
      onSerializedChange({} as SerializedEditorState)
    }
  }

  return (
    <div className="border border-gray-300 rounded-md">
      {/* Toolbar */}
      <div className="border-b border-gray-300 p-2 flex items-center gap-2 bg-gray-50">
        <button className="px-2 py-1 text-sm font-bold border rounded hover:bg-gray-200">B</button>
        <button className="px-2 py-1 text-sm italic border rounded hover:bg-gray-200">I</button>
        <button className="px-2 py-1 text-sm underline border rounded hover:bg-gray-200">U</button>
        <button className="px-2 py-1 text-sm line-through border rounded hover:bg-gray-200">S</button>
        <select className="px-2 py-1 text-sm border rounded">
          <option>PT Sans</option>
        </select>
        <select className="px-2 py-1 text-sm border rounded">
          <option>10</option>
        </select>
      </div>

      {/* Editor Area */}
      <textarea
        value={content}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full h-32 p-3 resize-none focus:outline-none"
      />
    </div>
  )
}

export default Editor
