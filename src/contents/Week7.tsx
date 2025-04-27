import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Modal from "@/components/Modal";

// Define the possible prompt values
const dailyPrompts = [
  "Place",
  "Bible Character",
  "Mythical Creature",
  "Drink",
  "Animal",
  "Song",
  "Movie",
] as const;

// Derive the Prompt type from dailyPrompts
type Prompt = (typeof dailyPrompts)[number];

// Define the getDailyPrompt function with return type
const getDailyPrompt = (): Prompt => {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const dayOfYear = Math.floor(
    (today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
  );
  return dailyPrompts[dayOfYear % dailyPrompts.length];
};

// Define the shape of promptStyles
interface PromptStyle {
  cardClass: string;
  textClass: string;
  variants: Variants;
  icon: React.ReactElement;
}

// Define promptStyles with explicit typing
const promptStyles: Record<Prompt, PromptStyle> = {
  Place: {
    cardClass:
      "bg-gradient-to-r from-blue-500/80 to-green-500/80 p-10 rounded-2xl shadow-2xl max-w-xl w-full backdrop-blur-md border-4 border-blue-300/50 hover:shadow-blue-500/50 transition-shadow duration-300 h-[200px] flex flex-col items-center justify-center",
    textClass: "text-2xl font-semibold text-white text-center",
    variants: {
      initial: { scale: 0.8, opacity: 0, rotate: -10 },
      animate: {
        scale: 1,
        opacity: 1,
        rotate: [0, 2, -2, 0],
        transition: { rotate: { repeat: Infinity, duration: 4 } },
      },
    },
    icon: (
      <motion.svg
        className="w-10 h-10 text-blue-200 mb-2"
        fill="currentColor"
        viewBox="0 0 24 24"
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, 360] }}
        transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
        aria-hidden="true"
      >
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </motion.svg>
    ),
  },
  "Bible Character": {
    cardClass:
      "bg-gradient-to-r from-amber-200/80 to-yellow-600/80 p-10 rounded-2xl shadow-2xl max-w-xl w-full backdrop-blur-md border-4 border-yellow-800/50 hover:shadow-yellow-600/50 transition-shadow duration-300 h-[200px] flex flex-col items-center justify-center",
    textClass: "text-2xl font-semibold text-amber-900 text-center",
    variants: {
      initial: { scale: 0.8, opacity: 0, rotate: -10 },
      animate: { scale: 1, opacity: 1, rotate: 0 },
    },
    icon: (
      <motion.svg
        className="w-10 h-10 text-amber-800 mb-2"
        fill="currentColor"
        viewBox="0 0 24 24"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
        aria-hidden="true"
      >
        <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v2H8V8zm0 4h8v2H8v-2zm0 4h8v2H8v-2z" />
      </motion.svg>
    ),
  },
  "Mythical Creature": {
    cardClass:
      "bg-gradient-to-r from-purple-700/80 to-pink-500/80 p-10 rounded-2xl shadow-2xl max-w-xl w-full backdrop-blur-md border-4 border-pink-300/50 hover:shadow-pink-500/50 transition-shadow duration-300 h-[200px] flex flex-col items-center justify-center",
    textClass: "text-2xl font-semibold text-pink-200 text-center",
    variants: {
      initial: { scale: 0.8, opacity: 0, rotate: -10 },
      animate: {
        scale: [1, 1.05, 1],
        opacity: 1,
        rotate: 0,
        transition: { scale: { repeat: Infinity, duration: 2 } },
      },
    },
    icon: (
      <motion.svg
        className="w-10 h-10 text-pink-300 mb-2"
        fill="currentColor"
        viewBox="0 0 24 24"
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, 360] }}
        transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
        aria-hidden="true"
      >
        <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-3-3 1.41-1.41L10 14.17l5.59-5.59L17 10l-7 7z" />
      </motion.svg>
    ),
  },
  Drink: {
    cardClass:
      "bg-gradient-to-r from-cyan-400/80 to-orange-400/80 p-10 rounded-2xl shadow-2xl max-w-xl w-full backdrop-blur-md border-4 border-cyan-200/50 hover:shadow-cyan-400/50 transition-shadow duration-300 h-[200px] flex flex-col items-center justify-center",
    textClass: "text-2xl font-semibold text-orange-100 text-center",
    variants: {
      initial: { scale: 0.8, opacity: 0, rotate: -10 },
      animate: {
        scale: [1, 1.1, 1],
        opacity: 1,
        rotate: 0,
        transition: { scale: { type: "spring", stiffness: 300, damping: 10 } },
      },
    },
    icon: (
      <motion.svg
        className="w-10 h-10 text-orange-200 mb-2"
        fill="currentColor"
        viewBox="0 0 24 24"
        initial={{ scale: 0 }}
        animate={{ scale: 1, y: [-5, 5, -5] }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 10,
          delay: 0.2,
          y: { repeat: Infinity, duration: 1.5 },
        }}
        aria-hidden="true"
      >
        <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3z" />
      </motion.svg>
    ),
  },
  Animal: {
    cardClass:
      "bg-gradient-to-r from-green-600/80 to-brown-600/80 p-10 rounded-2xl shadow-2xl max-w-xl w-full backdrop-blur-md border-4 border-green-300/50 hover:shadow-green-600/50 transition-shadow duration-300 h-[200px] flex flex-col items-center justify-center",
    textClass: "text-2xl font-semibold text-green-100 text-center",
    variants: {
      initial: { scale: 0.8, opacity: 0, rotate: -10 },
      animate: {
        scale: [1, 1.08, 1],
        opacity: 1,
        rotate: 0,
        transition: { scale: { type: "spring", stiffness: 200, damping: 15 } },
      },
    },
    icon: (
      <motion.svg
        className="w-10 h-10 text-green-200 mb-2"
        fill="currentColor"
        viewBox="0 0 24 24"
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 10,
          delay: 0.2,
          rotate: { repeat: Infinity, duration: 2 },
        }}
        aria-hidden="true"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
      </motion.svg>
    ),
  },
  Song: {
    cardClass:
      "bg-gradient-to-r from-pink-500/80 to-blue-500/80 p-10 rounded-2xl shadow-2xl max-w-xl w-full backdrop-blur-md border-4 border-blue-200/50 hover:shadow-blue-500/50 transition-shadow duration-300 h-[200px] flex flex-col items-center justify-center",
    textClass: "text-2xl font-semibold text-blue-100 text-center",
    variants: {
      initial: { scale: 0.8, opacity: 0, rotate: -10 },
      animate: {
        scale: [1, 1.06, 1],
        opacity: 1,
        rotate: 0,
        transition: { scale: { repeat: Infinity, duration: 1.5 } },
      },
    },
    icon: (
      <motion.svg
        className="w-10 h-10 text-blue-200 mb-2"
        fill="currentColor"
        viewBox="0 0 24 24"
        initial={{ scale: 0 }}
        animate={{ scale: 1, y: [-5, 5, -5] }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 10,
          delay: 0.2,
          y: { repeat: Infinity, duration: 1 },
        }}
        aria-hidden="true"
      >
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
      </motion.svg>
    ),
  },
  Movie: {
    cardClass:
      "bg-gradient-to-r from-red-600/80 to-black/80 p-10 rounded-2xl shadow-2xl max-w-xl w-full backdrop-blur-md border-4 border-red-300/50 hover:shadow-red-600/50 transition-shadow duration-300 h-[200px] flex flex-col items-center justify-center",
    textClass: "text-2xl font-semibold text-red-100 text-center",
    variants: {
      initial: { scale: 0.8, opacity: 0, rotate: -10 },
      animate: {
        scale: 1,
        opacity: 1,
        rotate: 0,
        transition: { type: "spring", stiffness: 200, damping: 20 },
      },
    },
    icon: (
      <motion.svg
        className="w-10 h-10 text-red-200 mb-2"
        fill="currentColor"
        viewBox="0 0 24 24"
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, 360] }}
        transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
        aria-hidden="true"
      >
        <path d="M4 3h16v18H4V3zm2 2v14h12V5H6zM8 7h8v2H8V7zm0 4h8v2H8v-2zm0 4h8v2H8v-2z" />
      </motion.svg>
    ),
  },
};

const Week7 = () => {
  const [showContent, setShowContent] = useState(false);
  const [showInstruction, setShowInstruction] = useState(true);
  const currentPrompt = getDailyPrompt();
  const { cardClass, textClass, icon } = promptStyles[
    currentPrompt
  ] || {
    cardClass:
      "bg-gradient-to-r from-indigo-500/80 to-purple-600/80 p-10 rounded-2xl shadow-2xl max-w-xl w-full backdrop-blur-md hover:shadow-xl transition-shadow duration-300 h-[200px] flex flex-col items-center justify-center",
    textClass: "text-2xl font-semibold text-yellow-200 text-center",
    variants: {
      initial: { scale: 0.8, opacity: 0, rotate: -10 },
      animate: { scale: 1, opacity: 1, rotate: 0 },
    },
    icon: (
      <motion.svg
        className="w-10 h-10 text-yellow-200 mb-2"
        fill="currentColor"
        viewBox="0 0 24 24"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
        aria-hidden="true"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      </motion.svg>
    ),
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Modal date="2025-04-28" redirectTo="/" />
      {showInstruction && (
        <motion.div
          className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-green-500 text-white p-4 rounded-lg shadow-lg max-w-[90%] w-full flex items-center justify-between z-50"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <motion.svg
            className="w-6 h-6 text-white mr-2"
            fill="currentColor"
            viewBox="0 0 24 24"
            initial={{ scale: 0 }}
            animate={{ scale: 1, y: [-3, 3, -3] }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 10,
              delay: 0.2,
              y: { repeat: Infinity, duration: 1.5 },
            }}
            aria-hidden="true"
          >
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </motion.svg>
          <p className="text-lg font-semibold text-center flex-1" role="alert">
            Check this page daily and send the image that you think of me in
            Messenger.
          </p>
          <button
            onClick={() => setShowInstruction(false)}
            className="ml-4 text-white hover treas:text-gray-200 focus:outline-none"
            aria-label="Close toast"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </motion.div>
      )}
      {showContent && (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
          <motion.div
            className={cardClass}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {icon}
            <motion.p
              className={textClass}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Today's Prompt: {currentPrompt}
            </motion.p>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Week7;
