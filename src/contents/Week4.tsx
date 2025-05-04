import Modal from "@/components/Modal";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSound from "use-sound";
import { CheckCircle } from "lucide-react";
import ApologyModal from "@/components/ApologyModal";

interface Joke {
  front: string;
  back: string;
  image: string;
}

const jokes: Joke[] = [
  {
    front: "Sinong disciple ang mahilig mag-hang out?",
    back: "Si Judas 💀",
    image: "/jokes/judas.jpg",
  },
  {
    front:
      "Kung SCF batch 2019-2020 si Noah, ano'ng matatanggap nyang award sakin?",
    back: "Best in Ark-itechture 😎",
    image: "/jokes/arki.jpg",
  },
  {
    front: "Did you know that Jesus is Divine?",
    back: "And we are the branches 🍇",
    image: "/jokes/branches.jpg",
  },
  {
    front: "Ano ang similarity namin ni Samson? clue: 💪",
    back: "Mahaba ang buhok",
    image: "/jokes/samson.jpg",
  },
  {
    front: "Ano ang tawag sa taong 12.5% lang ng bible ang pinaniniwalaan?",
    back: "an 8th-theist 🔬",
    image: "jokes/atheist.jpg",
  },
  {
    front: "Anong sports ang di natutuwa si Moses?",
    back: "Basket-ball 🏀",
    image: "jokes/sports.jpg",
  },
  {
    front: "What would be a cute nickname ni Lot?",
    back: "Pepper 🧂",
    image: "jokes/salt.jpg",
  },
  {
    front: "What's Isaacs Fav food?",
    back: "Isaw 🍡",
    image: "jokes/isaw.jpg",
  },
  {
    front: "Bat mas mayaman ang OT kesa sa NT?",
    back: "Mas madami silang Profit 🤑",
    image: "jokes/profit.jpg",
  },
  {
    front: "May blue na bato na itinapon sa red sea, what happens to the stone?",
    back: "Nabasa 😞",
    image: "jokes/redsea.jpg",
  },
  {
    front: "Ano ang ginawa ni Cain sa kapatid nya?",
    back: "He dis-abel-ed him 🔪",
    image: "jokes/blood.jpg",
  },
  {
    front: "Whos's the youngest character to say foul language?",
    back: "Job, because he cursed the day he was born 🤬",
    image: "jokes/curse.jpg",
  },
  {
    front: "Pano nasisigurado ni Eve na di nambababae si Adan?",
    back: "Binibilang nya yung ribs ni Adan 🦴",
    image: "jokes/ribs.jpg",
  },
  {
    front: "What did Jeremiah named his French candy store?",
    back: "La Ments 🍬",
    image: "jokes/candies.jpg",
  },
  {
    front: "What does me and Jericho have alike?",
    back: "Pareho kaming walang pader 🧱",
    image: "jokes/march.jpg",
  },
  {
    front: "Where is Solomon's temple located?",
    back: "Sa pagitan ng mata at tenga 👀👂",
    image: "jokes/temple.jpg",
  },
  {
    front: "Bat pumalakpak si Jesus?",
    back: "Kasi Siya ay Messiah 😊",
    image: "jokes/happy.jpg",
  },
  {
    front: "Paano mo nasabing mananalo sa race ang UEC pag holy week?",
    back: "They fast 😋",
    image: "jokes/run.jpg",
  },
  {
    front: "Ano ang weakness ni Simon Peter? ",
    back: "Papel 👊",
    image: "jokes/weakness.jpg",
  },
  {
    front: "Sino ang pinakana-disappoint nung umuwi yung Prodigal Son?",
    back: "Yung pinatabang guya 🐄",
    image: "jokes/disappointed.jpg",
  },
];

const Week4: React.FC = () => {
  const [showJokes, setShowJokes] = useState<boolean>(false);
  const [selectedJoke, setSelectedJoke] = useState<Joke | null>(null);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [startPosition, setStartPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [viewedJokes, setViewedJokes] = useState<Set<number>>(() => {
    const saved = localStorage.getItem("viewedJokes");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const soundPaths = [
    "/jokes/sound1.mp3",
    "/jokes/sound2.mp3",
    "/jokes/sound3.mp3",
    "/jokes/sound4.mp3",
  ];

  const getRandomSound = () =>
    soundPaths[Math.floor(Math.random() * soundPaths.length)];
  const [playSound] = useSound(getRandomSound(), { volume: 0.5 });

  useEffect(() => {
    const timer = setTimeout(() => setShowJokes(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "viewedJokes",
      JSON.stringify(Array.from(viewedJokes))
    );
  }, [viewedJokes]);

  const handleImageClick = (index: number): void => {
    const imageElement = imageRefs.current[index];
    if (imageElement) {
      const rect = imageElement.getBoundingClientRect();
      setStartPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
    setSelectedJoke(jokes[index % jokes.length]);
    setIsFlipped(false);
  };

  const handleCardClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    const nextFlipState = !isFlipped;
    setIsFlipped(nextFlipState);

    if (nextFlipState && selectedJoke) {
      playSound();
      const jokeIndex = jokes.findIndex((j) => j.back === selectedJoke.back);
      if (jokeIndex !== -1) {
        setViewedJokes((prev) => new Set(prev).add(jokeIndex));
      }
    }
  };

  const handleOverlayClick = (): void => {
    setSelectedJoke(null);
    setIsFlipped(false);
    setStartPosition(null);
  };

  const cardVariants = {
    hidden: {
      scale: 0.1,
      x: startPosition ? startPosition.x - window.innerWidth / 2 : 0,
      y: startPosition ? startPosition.y - window.innerHeight / 2 : 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      scale: 0.1,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const [showApology, setShowApology] = useState(true);

  return (
    
    <div className="min-h-screen bg-gray-100 p-4">
     {showApology && <ApologyModal onClose={() => setShowApology(false)} />}

      <Modal date="2025-04-07" redirectTo="/" />

      {showJokes && (
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {jokes.map((joke: Joke, index: number) => (
              <div
                key={index}
                ref={(el) => {
                  imageRefs.current[index] = el;
                }}
                className="relative cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={`${joke.image}?w=400&h=300&fit=crop`}
                  alt={`Bible joke ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
                {viewedJokes.has(index) && (
                  <div className="absolute inset-0 bg-green-500/10 rounded-lg backdrop-blur-xs flex items-center justify-center">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <AnimatePresence>
            {selectedJoke && (
              <motion.div
                className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleOverlayClick}
              > 
                <motion.div
                  className="relative w-80 h-48 perspective-1000"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={handleCardClick}
                >
                  <motion.div
                    className="relative w-full h-full"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div
                      className="absolute w-full h-full bg-white rounded-lg shadow-xl p-6 flex items-center justify-center"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <p className="text-lg text-center font-medium text-gray-800">
                        {selectedJoke.front}
                      </p>
                    </div>
                    <div
                      className="absolute w-full h-full bg-blue-500 rounded-lg shadow-xl p-6 flex items-center justify-center"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <p className="text-lg text-center font-medium text-white">
                        {selectedJoke.back}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Week4;
