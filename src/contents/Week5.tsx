import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "@/components/Modal";

// Placeholder images (local assets)
const images = [
  "jajan/jajan2.jpg",
  "jajan/jajan3.jpg",
  "jajan/jajan4.jpg",
  "jajan/jajan5.jpg",
  "jajan/jajan6.jpg",
  "jajan/jajan1.jpg",
  "jajan/jajan7.jpg",
  "jajan/jajan8.jpg",
];

// Define TypeScript types
type Answer = "Yes" | "No";
interface AnswerRecord {
  question: string;
  answer: Answer;
}

const questions = [
  "Do you feel comfy we’re together? 😊",
  "Would you love to watch a sunset with me?",
  "Is your heart smiling right now?",
  "Could we be the cutest couple ever?",
  "Would you let me be the man of your life?",
  "Do you think we’d make great memories together?",
  "Could u see us dancing under the stars?",
  "Would you say yes if I ask u to go somewhere far away with me?",
  "Do you believe we could be something special? 💕",
  "Do you want to be my girlfriend? 💖",
] as const;

const noFollowUps = [
  "Are you sure? I see a spark in your eyes! 😌",
  "Really? My heart’s still beating for you! 😉",
  "Aw, final na? We’d have so much fun together! 😊",
  "Is that a maybe in disguise? 🥺",
] as const;

const Week5: React.FC = () => {
  const [showContent, setShowContent] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [lastAnswerWasNo, setLastAnswerWasNo] = useState<boolean>(false);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const [finalAnswer, setFinalAnswer] = useState<Answer | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleAnswer = (answer: Answer): void => {
    const isFinalQuestion: boolean = currentQuestion === questions.length - 1;
    const currentQ: string = lastAnswerWasNo
      ? noFollowUps[(currentQuestion - 1) % noFollowUps.length]
      : questions[currentQuestion];
    setAnswers([...answers, { question: currentQ, answer }]);

    if (isFinalQuestion && !lastAnswerWasNo) {
      // Final question answered
      setFinalAnswer(answer);
      setShowResultModal(true);
      return;
    }

    if (answer === "Yes") {
      if (lastAnswerWasNo) {
        // Move to next main question after "Yes" to follow-up
        setCurrentQuestion((prev) => prev + 1);
        setLastAnswerWasNo(false);
      } else {
        // Move to next question
        setCurrentQuestion((prev) => prev + 1);
        setLastAnswerWasNo(false);
      }
    } else {
      // "No" answer: show follow-up
      if (lastAnswerWasNo) {
        // If already on follow-up, move to next main question
        setCurrentQuestion((prev) => prev + 1);
        setLastAnswerWasNo(false);
      } else {
        setLastAnswerWasNo(true);
      }
    }
  };

  const handleReset = (): void => {
    setCurrentQuestion(0);
    setAnswers([]);
    setLastAnswerWasNo(false);
    setShowResultModal(false);
    setFinalAnswer(null);
  };

  // Determine current question text
  const displayQuestion: string = lastAnswerWasNo
    ? noFollowUps[currentQuestion % noFollowUps.length]
    : questions[currentQuestion];

  return (
    <>
      <Modal date="2025-04-14" redirectTo="/" />
      {showContent && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-200 to-purple-200 ">
          {/* Result Modal */}
          {showResultModal && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            >
              <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center">
                <h2 className="text-2xl font-bold text-pink-800 mb-4">
                  {finalAnswer === "Yes" ? "Yay! 💖" : "Aww... 😔"}
                </h2>
                <p className="text-lg text-gray-800 mb-6">
                  {finalAnswer === "Yes"
                    ? "Alam ko naman. Kaso I know it's my bad kaya di natin madream come true chz. Pero nahihirapan nga akong tumaas ng kamay pag may nagtanong kung sino ang in a relationship daw. Thank u, hope with me na maging ok na ang lahat at magrun smooth para masagot mo na ko hehe. I am really hopeful to call u my girlfriend!"
                    : "Gets. Okay lang. Mahal pa rin kita. Paalam chz. Gets ko naman, hoping pa rin ako na mangyari nang maayos ang mga bagay at bigyan ako ng Diyos ng courage to reconcile. I really want to be your official boyfriend hahah"}
                </p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleReset}
                  className="px-6 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600"
                >
                  Try Again? ✨
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Main Content */}
          {!showResultModal && (
            <>
              {/* Animated Header */}
              <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl font-bold text-pink-800 mb-8 px-5"
              >
                A Journey to Your Heart... 💘
              </motion.h1>

              {/* Image with Animation */}
              <motion.img
                key={currentQuestion + (lastAnswerWasNo ? "no" : "yes")}
                src={images[currentQuestion % images.length]}
                alt="Romantic scene"
                className="w-64 h-64 object-cover rounded-full mb-6 shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />

              {/* Question Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion + (lastAnswerWasNo ? "no" : "yes")}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center"
                >
                  <p className="text-xl text-gray-800 mb-6 font-semibold">
                    {displayQuestion}
                  </p>
                  <div className="flex justify-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleAnswer("Yes")}
                      className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600"
                    >
                      Yes 😍
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleAnswer("No")}
                      className="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      No 😔
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Fun Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mt-8 text-gray-700 text-center"
              >
                <p className="text-lg">
                  {currentQuestion === questions.length - 1 && !lastAnswerWasNo
                    ? "Here’s the big moment! 💖"
                    : "Getting closer to the magic... 💌"}
                </p>
                <p>Every answer brings us nearer! ✨</p>
              </motion.div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Week5;