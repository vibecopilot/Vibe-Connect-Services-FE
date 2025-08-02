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
  confirmButtonClassName = "bg-red-600 text-white hover:bg-red-700",
  cancelButtonClassName = "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700",
}) => {
  if (!isOpen) return null;

  const handleCancel = () => {
    if (onCancel) onCancel();
    else onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={handleCancel}
      data-testid="modal-backdrop"
    >
      <div
        className="bg-[rgb(245,245,246)] rounded-md shadow-lg max-w-lg w-full relative z-50"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {title && (
          <div className="px-6 py-4 flex justify-between items-center border-b">
            <h2 className="text-lg font-semibold text-gray-700" id="modal-title">
              {title}
            </h2>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="text-gray-400 hover:text-gray-600"
            >
              &#x2715;
            </button>
          </div>
        )}
        <div className="p-6 text-gray-600">{content}</div>
        {showFooter && (
          <div className="px-6 py-4 flex justify-end gap-3 border-t">
            <button
              onClick={handleCancel}
              className={`px-4 py-2 rounded ${cancelButtonClassName} cursor-pointer`}
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 rounded ${confirmButtonClassName} cursor-pointer`}
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
