import React from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  // Don't render if modal is not open
  if (!isOpen) return null;

  // Handle clicking outside the modal to close it
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key press to close modal
  React.useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button
          className="modal-close-button"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
