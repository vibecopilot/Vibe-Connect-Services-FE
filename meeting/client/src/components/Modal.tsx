import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  type?: "spinner" | "dots";
  content: React.ReactNode;
  showFooter?: boolean;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmButtonClassName?: string;
  cancelButtonClassName?: string;
  width?: string;
  contentHeight?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
  showFooter = true,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  confirmButtonClassName = "bg-blue-600 text-white hover:bg-blue-700",
  cancelButtonClassName = "text-gray-700 border border-gray-300 hover:bg-gray-100",
  width = "max-w-lg",
  contentHeight = "",
}) => {
  if (!isOpen) return null;

  const handleCancel = () => {
    if (onCancel) onCancel();
    else onClose();
  };

  const contentClasses = `p-6 text-black ${
    contentHeight ? `${contentHeight} overflow-y-auto` : ""
  }`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleCancel}
      data-testid="modal-backdrop"
    >
      {/* White blurred background */}
      <div className="fixed inset-0 bg-white/10 backdrop-blur-sm"></div>

      <div
        className={`bg-white rounded-md shadow-lg w-full relative z-50 ${width}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {title && (
          <div className="px-6 py-4 flex justify-between items-center border-b">
            {/* Invisible spacer to balance the close button */}
            <div className="invisible w-6">&#x2715;</div>
            
            <h2 
              className="text-black font-semibold text-xl flex-grow text-center" 
              id="modal-title"
            >
              {title}
            </h2>
            
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="text-gray-500 hover:text-gray-800 text-2xl w-6"
            >
              &#x2715;
            </button>
          </div>
        )}

        <div className={contentClasses}>{content}</div>

        {showFooter && (
          <div className="px-6 py-4 flex justify-end gap-3 bg-gray-50 rounded-b-md">
            {onCancel && (
              <button
                onClick={handleCancel}
                className={`px-4 py-2 rounded-md text-sm font-medium ${cancelButtonClassName} cursor-pointer transition-colors`}
              >
                {cancelText}
              </button>
            )}
            <button
              onClick={onConfirm}
              className={`px-4 py-2 rounded-md text-sm font-medium ${confirmButtonClassName} cursor-pointer transition-colors`}
            >
              {confirmText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;