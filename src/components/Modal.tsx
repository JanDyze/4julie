import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ModalProps = {
  date: string; // Expected format: YYYY-MM-DD
  redirectTo: string; // Route or URL to navigate to
};

const sweetNames = [
  "Mahal", "Love", "Baby", "Honey", "Sweetheart", "Bebe", "Darling",
  "My Love", "Boo", "Cutie", "My Angel", "My Little Penguin", "Babe", "Beh"
];

const getRandomSweetName = () => {
  return sweetNames[Math.floor(Math.random() * sweetNames.length)];
};

const Modal = ({ date, redirectTo }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sweetName] = useState(getRandomSweetName());

  const navigate = useNavigate();

  useEffect(() => {
    const checkDate = () => {
      const now = new Date();
      now.setHours(now.getHours() + 8); // Convert to Philippine Time (UTC+8)
      const todayFormatted = now.toISOString().split("T")[0];

      setIsOpen(todayFormatted < date);
    };

    checkDate(); // Run immediately
    const interval = setInterval(checkDate, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [date]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-[9999]">
      <div className="bg-white p-6 rounded-xl shadow-xl w-140 text-center transition-all duration-500 ease-out transform scale-90 opacity-0 animate-fadeInBounce">
        <h2 className="text-xl font-extrabold text-pink-600">
          💖 Sandali lang, {sweetName}! 💖
        </h2>
        <p className="mt-3 text-gray-700">
          Pasensya na, hindi mo pa mabubuksan ang page na ito.
          Maghintay ka lang ng konti ha?
          Balik ka ulit sa <b>{new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric" })}</b>
          .
        </p>
        <p className="mt-2 text-gray-500 italic">
          "Para hindi lang ako ang maghihintay sa'yo, ikaw rin may hinihintay haha! 😉💖"
        </p>

        <button
          onClick={() => navigate(redirectTo)}
          className="cursor-pointer mt-5 px-5 py-2 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition duration-300 shadow-md"
        >
          Return to Homepage 💕
        </button>
      </div>

      <style>
        {`
          @keyframes fadeInBounce {
            0% { opacity: 0; transform: scale(0.8); }
            60% { opacity: 1; transform: scale(1.05); }
            100% { opacity: 1; transform: scale(1); }
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
