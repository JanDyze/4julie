import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import p5 from 'p5';
import './Week11.css';

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  twinkleSpeed: number;
}

interface Constellation {
  id: number;
  x: number;
  y: number;
  name: string;
  letter: string;
  message: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  life: number;
  vx: number;
  vy: number;
}

const Week11 = () => {
  const [selectedStar, setSelectedStar] = useState<Constellation | null>(null);
  const [currentStarIndex, setCurrentStarIndex] = useState(0);
  const [chime] = useState(new Audio('/chime.mp3')); // Assumes chime.mp3 in public folder

  // Constellation data with positions scaled for mobile
  const constellations: Constellation[] = [
    { id: 1, x: 0.1 * window.innerWidth, y: 0.2 * window.innerHeight, name: 'Memora', letter: 'Y', message: 'Firstly, I did not forget, I was just occupied' },
    { id: 2, x: 0.2 * window.innerWidth, y: 0.3 * window.innerHeight, name: 'Cardia', letter: 'O', message: 'Secondly, this is supposed to be a heart-shaped constellation xD.' },
    { id: 3, x: 0.3 * window.innerWidth, y: 0.25 * window.innerHeight, name: 'Aelso', letter: 'U', message: 'Because di ka lang star, heart din kita' },
    { id: 5, x: 0.5 * window.innerWidth, y: 0.27 * window.innerHeight, name: 'Valora', letter: 'H', message: "Julie Anne, you mean a lot to me" },
    { id: 6, x: 0.6 * window.innerWidth, y: 0.32 * window.innerHeight, name: 'Rayelle', letter: 'A', message: "You are radiant, you are true!" },
    { id: 7, x: 0.7 * window.innerWidth, y: 0.28 * window.innerHeight, name: 'Skephira', letter: 'V', message: 'We dont believe in zodiac signs though!' },
    { id: 8, x: 0.8 * window.innerWidth, y: 0.34 * window.innerHeight, name: 'Aniway', letter: 'E', message: 'But I made this anyway...' },
    { id: 10, x: 0.3 * window.innerWidth, y: 0.4 * window.innerHeight, name: 'Punnia', letter: 'M', message: "Zodiac-ould see my love for her." },
    { id: 11, x: 0.4 * window.innerWidth, y: 0.45 * window.innerHeight, name: 'Sonna', letter: 'Y', message: 'Sana nagets mo yung pun HAHAHAHA' },
    { id: 12, x: 0.5 * window.innerWidth, y: 0.5 * window.innerHeight, name: 'Plix', letter: 'H', message: "If I ever miss another week, pagbigyan mo na" },
    { id: 13, x: 0.6 * window.innerWidth, y: 0.48 * window.innerHeight, name: 'Konnekta', letter: 'E', message: "Lagi naman tayo connected, I made the cards so we would connect" },
    { id: 14, x: 0.7 * window.innerWidth, y: 0.46 * window.innerHeight, name: 'Stren', letter: 'A', message: 'At sana di masira ang constellation na ating nagawa with our stars of memories' },
    { id: 15, x: 0.8 * window.innerWidth, y: 0.3 * window.innerHeight, name: 'Zuun', letter: 'R', message: 'Excited to go stargazing with you again' },
    { id: 15, x: 0.8 * window.innerWidth, y: 0.3 * window.innerHeight, name: 'Menzaje', letter: 'T', message: 'Di ko alam kung basa but it says "YOU HAVE MY HEART", you do' },
  ];

  // p5.js sketch for starry background
  useEffect(() => {
    const sketch = (p: p5) => {
      let stars: Star[] = [];
      let particles: Particle[] = [];
      let comet = { x: -50, y: p.random(0.2 * window.innerHeight, 0.4 * window.innerHeight), vx: 3, vy: -0.5 };

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        // Generate fewer stars for mobile performance
        for (let i = 0; i < 100; i++) {
          stars.push({
            x: p.random(p.width),
            y: p.random(p.height),
            size: p.random(1, 3),
            brightness: p.random(100, 255),
            twinkleSpeed: p.random(0.01, 0.05),
          });
        }
      };

      p.draw = () => {
        p.background(10, 20, 40); // Dark blue night sky
        // Draw random stars with twinkle effect
        stars.forEach((star) => {
          p.fill(255, 255, 255, star.brightness + 50 * p.sin(p.frameCount * star.twinkleSpeed));
          p.noStroke();
          p.ellipse(star.x, star.y, star.size, star.size);
        });
        // Draw comet
        p.fill(255, 255, 200, 150);
        p.ellipse(comet.x, comet.y, 4, 4);
        comet.x += comet.vx;
        comet.y += comet.vy;
        if (comet.x > p.width + 50) {
          comet = { x: -50, y: p.random(0.2 * window.innerHeight, 0.4 * window.innerHeight), vx: 3, vy: -0.5 };
        }
        // Draw constellation stars
        // constellations.forEach((star, index) => {
        //   const isActive = index === currentStarIndex;
        //   const pulse = isActive ? 10 + 5 * p.sin(p.frameCount * 0.1) : 10;
        //   p.fill(isActive ? 255 : 255, isActive ? 255 : 215, 0); // Brighten active star
        //   p.ellipse(star.x, star.y, pulse, pulse);
        // });
        // Draw particles around active star
        if (currentStarIndex < constellations.length) {
          const activeStar = constellations[currentStarIndex];
          particles = particles.filter((particle) => particle.life > 0);
          // Add new particles
          for (let i = 0; i < 2; i++) {
            particles.push({
              x: activeStar.x,
              y: activeStar.y,
              size: p.random(2, 4),
              life: p.random(20, 40),
              vx: p.random(-1.5, 1.5),
              vy: p.random(-1.5, 1.5),
            });
          }
          // Draw and update particles
          particles.forEach((particle) => {
            p.fill(255, 255, 0, particle.life * 6);
            p.ellipse(particle.x, particle.y, particle.size, particle.size);
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= 1;
          });
        }
      };

      p.mouseClicked = () => {
        handleInteraction(p);
      };

      p.touchStarted = () => {
        handleInteraction(p);
        return false; // Prevent default touch behavior
      };

      const handleInteraction = (p: p5) => {
        if (currentStarIndex < constellations.length) {
          const star = constellations[currentStarIndex];
          if (p.dist(p.mouseX, p.mouseY, star.x, star.y) < 25) { // Larger touch area
            chime.play().catch((err) => console.log('Audio play failed:', err));
            setSelectedStar(star);
            setCurrentStarIndex(currentStarIndex + 1);
          }
        }
      };
    };

    const p5Instance = new p5(sketch);
    return () => p5Instance.remove();
  }, [currentStarIndex, chime]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 text-white">
      {/* Canvas is rendered by p5.js */}
      <div className="absolute inset-0 z-0" />
      <div className="relative z-10 p-2 sm:p-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-4xl font-serif text-center mb-2 sm:mb-4"
        >
          A Starry Adventure for You!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-base sm:text-lg text-center mb-4 sm:mb-6"
        >
          Tap the glowing star to explore a magical journey through the constellations!
        </motion.p>
      </div>
      {/* Modal for constellation messages */}
      <AnimatePresence>
  {selectedStar && (
    <motion.div
      className="fixed inset-0 z-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => setSelectedStar(null)}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Modal Content */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-blue-800 p-4 sm:p-6 rounded-lg max-w-[85vw] sm:max-w-md text-center">
          <h2 className="text-xl sm:text-2xl font-serif mb-2">{selectedStar.name}</h2>
          <p className="mb-3 sm:mb-4 text-sm sm:text-base">{selectedStar.message}</p>
          {selectedStar.id === constellations.length && (
            <p className="font-bold text-yellow-300 animate-pulse text-sm sm:text-base">
              The stars spell: {constellations.map((s) => s.letter).join('')}
            </p>
          )}
          <button
            onClick={() => setSelectedStar(null)}
            className="mt-3 sm:mt-4 p-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 text-sm sm:text-base"
          >
            Next Star
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
      {constellations.map((star, index) => {
  const isActive = index === currentStarIndex;
  const isUnlocked = index < currentStarIndex;
  return (
    <div
      key={star.id}
      className={`star ${isActive ? 'active' : ''}`}
      style={{
        left: star.x,
        top: star.y,
        transform: 'translate(-50%, -50%)',
      }}
      onClick={() => {
        if (isActive) {
          chime.play().catch((err) => console.log('Audio play failed:', err));
          setSelectedStar(star);
          setCurrentStarIndex(currentStarIndex + 1);
        }
      }}
    >
      {/* Show letter only if star has already been activated */}
      {isUnlocked && <span className="star-letter">{star.letter}</span>}
    </div>
  );
})}

    </div>
  );
};

export default Week11;