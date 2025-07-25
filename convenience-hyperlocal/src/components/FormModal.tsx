import React from "react";
import { createPortal } from "react-dom";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const FormModal: React.FC<FormModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 z-40  bg-opacity-50"
        onClick={onClose}
      />
      {/* Modal content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </>,
    document.body
  );
};

export default FormModal;