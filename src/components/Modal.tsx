import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QRCodeButton from "./QRCodeButton";
type ModalProps = {
  date: string; // Expected format: YYYY-MM-DD
  redirectTo: string; // Route or URL to navigate to
};

const Modal = ({ date, redirectTo }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // React Router navigation

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Current date (YYYY-MM-DD)

    if (today < date) {
      // Show modal if today's date is before the given date
      setIsOpen(true);
    }
  }, [date]);

  if (!isOpen) return null; // Don't render if the modal is closed

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-[9999]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-lg font-bold">Notice</h2>
        <p className="mt-2">This page is not yet available.</p>
        <button
          onClick={() => navigate(redirectTo)} // Redirect to the provided route
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Go to Page
        </button>
        <QRCodeButton></QRCodeButton>
      </div>
    </div>
  );
};

export default Modal;
