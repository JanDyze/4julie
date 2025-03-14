import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ModalProps = {
  date: string; // Expected format: YYYY-MM-DD
  redirectTo: string; // Route or URL to navigate to
};

const Modal = ({ date, redirectTo }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    if (today < date) {
      setIsOpen(true);
    }
  }, [date]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-[9999]">
      <div
        className="bg-white p-6 rounded-xl shadow-xl w-96 text-center transition-all duration-500 ease-out transform scale-90 opacity-0 animate-fadeInBounce"
      >
        <h2 className="text-xl font-extrabold text-blue-600">🚀 Almost There!</h2>
        <p className="mt-3 text-gray-700">
          Oops! This page isn't ready for you yet. Check back on{" "}
          <b>
            {new Date(date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })}
          </b>
          . 🎉
        </p>
        <p className="mt-1 text-sm text-gray-500">Patience is a virtue, my friend! 😎</p>

        <button
          onClick={() => navigate(redirectTo)}
          className="mt-5 px-5 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300 shadow-md"
        >
          Go back to Homepage! 🚀
        </button>

        {/* Uncomment if needed */}
        {/* <QRCodeButton /> */}
      </div>

      {/* Custom Animation Keyframes */}
      <style>
        {`
          @keyframes fadeInBounce {
            0% {
              opacity: 0;
              transform: scale(0.8);
            }
            60% {
              opacity: 1;
              transform: scale(1.05);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          .animate-fadeInBounce {
            animation: fadeInBounce 0.4s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Modal;
