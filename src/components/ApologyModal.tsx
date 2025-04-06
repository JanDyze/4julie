// components/ApologyModal.tsx
import { motion } from "framer-motion";
import { useEffect } from "react";

interface ApologyModalProps {
  onClose: () => void;
}

const ApologyModal: React.FC<ApologyModalProps> = ({ onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <h2 className="text-2xl font-bold mb-4">Hey Ja</h2>
        <p className="text-gray-700 text-sm mb-6 text-justify">
          Sorry I failed last week, I was planning to do an April Fools but got
          overwhelmed by everything. I try my best to do better naman e. I
          understand that I often disappoint but I'll keep on until u can handle
          the disappointments ho ho. Regardless, I made jokes na baka dumagdag
          na naman sa disappointments mo HAHAHA pero I made most of them.
          Sabihin mo pag may di ka nuggets.
        </p>
        <button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-full transition-all"
        >
          I want to laugh now 😂
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ApologyModal;
