
import type React from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  type?: "spinner" | "dots"
  content: React.ReactNode
  showFooter?: boolean
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
  confirmButtonClassName?: string
  cancelButtonClassName?: string
  showSaveAndAddButton?: boolean
  onSaveAndAdd?: () => void
  saveAndAddText?: string
  style?: React.CSSProperties

  // ✅ New optional props
  width?: string
  height?: string
  enableScrolling?: boolean
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
  showFooter = true,
  confirmText = "Save",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  confirmButtonClassName = "bg-purple-600 text-white hover:bg-purple-700",
  cancelButtonClassName = "text-gray-700 border border-gray-300 hover:bg-gray-100",
  showSaveAndAddButton = false,
  onSaveAndAdd,
  saveAndAddText = "Save and Add Sub Category",
  style,
}) => {
  if (!isOpen) return null

  const handleCancel = () => {
    if (onCancel) onCancel()
    else onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={handleCancel}
      data-testid="modal-backdrop"
    >
      <div
        className="bg-white rounded-md shadow-lg max-w-lg w-full relative z-50"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {title && (
          <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200">
            <h2 className="text-gray-800 font-semibold" id="modal-title">
              {title}
            </h2>
            <button onClick={onClose} aria-label="Close modal" className="text-gray-500 hover:text-gray-700">
              &#x2715;
            </button>
          </div>
        )}
        <div className="p-6 text-gray-800">{content}</div>
        {showFooter && (
          <div className="px-6 py-4 flex justify-between items-center border-t border-gray-200">
            <button
              onClick={onConfirm}
              className={`px-4 py-2 rounded cursor-pointer ${
                style?.backgroundColor ? "text-white" : confirmButtonClassName
              }`}
              style={style?.backgroundColor ? { backgroundColor: style.backgroundColor } : {}}
            >
              {confirmText}
            </button>
            {showSaveAndAddButton && (
              <button
                onClick={onSaveAndAdd}
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
              >
                {saveAndAddText}
              </button>
            )}
            <button onClick={handleCancel} className={`px-4 py-2 rounded ${cancelButtonClassName} cursor-pointer`}>
              {cancelText}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
