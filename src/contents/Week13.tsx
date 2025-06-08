import { useState, useEffect, useRef } from 'react';
import penguinJa from '../assets/pengja.png';
import ampalaya from '../assets/ampalaya.png'; // Import the ampalaya image

interface FallingObject {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  color?: string; // Optional color for generic objects
  type: 'good' | 'bad'; // New property: type of object
  imageSrc?: string; // Image source for bad objects
  svgData?: string; // SVG data URI for good objects
}

const messages = [
  "Sorry na",
  "I love you!",
  "Ganda mo!",
  "No sound effects :<",
  "See you soon!",
  "I miss you!",
  "Galingan mo dyan!",
  "Utot well!",
  "Read your Bible always!",
  "Keep on praying!",
  "Ingat always"
];

const Week13 = () => {
  const [position, setPosition] = useState(0);
  const [isMovingLeft, setIsMovingLeft] = useState(false);
  const [isMovingRight, setIsMovingRight] = useState(false);
  const [fallingObjects, setFallingObjects] = useState<FallingObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);
  const [win, setWin] = useState(false);
  const [collectedHeartsCount, setCollectedHeartsCount] = useState(0);
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);
  const [messageIndex, setMessageIndex] = useState(0);
  const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const characterRef = useRef<HTMLImageElement>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const characterSize = 50; // Size of the character
  const baseGoodObjectSize = 40; // Base size for good objects (hearts)
  const goodObjectSizeIncreasePerLevel = 10; // How much good object size increases per level

  const baseAmpalayaSize = 50; // Base size for ampalaya (bad objects)
  const ampalayaSizeIncreasePerLevel = 15; // How much ampalaya size increases per level
  
  const maxGoodObjects = 10; // Max number of good objects

  // Function to generate SVG for heart
  const getHeartSVG = (color: string) => {
    const encodedColor = encodeURIComponent(color);
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${encodedColor}'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C15.09 3.81 16.76 3 18.5 3 21.58 3 24 5.42 24 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E`;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setIsMovingLeft(true);
      }
      if (e.key === 'ArrowRight') {
        setIsMovingRight(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setIsMovingLeft(false);
      }
      if (e.key === 'ArrowRight') {
        setIsMovingRight(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (gameOver || win) return;

    const moveInterval = setInterval(() => {
      if (isMovingLeft) {
        setPosition(prev => Math.max(0, prev - 5));
      }
      if (isMovingRight) {
        const gameAreaWidth = gameAreaRef.current?.offsetWidth || window.innerWidth; // Use game area width
        setPosition(prev => Math.min(gameAreaWidth - characterSize, prev + 5));
      }
    }, 16); // Approximately 60 FPS

    return () => clearInterval(moveInterval);
  }, [isMovingLeft, isMovingRight, gameOver, win, characterSize]);

  // Level up logic
  useEffect(() => {
    setLevel(Math.floor(score / 30) + 1);
  }, [score]);

  // Generate falling objects
  useEffect(() => {
    if (gameOver || win) return;

    const baseGenerateInterval = 1000; // Base interval for generating objects (ms)
    const adjustedGenerateInterval = Math.max(200, baseGenerateInterval - (level - 1) * 100); // Decrease interval by 100ms per level, min 200ms

    const generateInterval = setInterval(() => {
      setFallingObjects(prevObjects => {
        const gameAreaWidth = gameAreaRef.current?.offsetWidth || window.innerWidth;
        
        let newObjectType: 'good' | 'bad';
        let currentObjectSize: number;
        let objectSpeed: number;

        if (collectedHeartsCount < maxGoodObjects && Math.random() < 0.2) { // 20% chance for a good object, if not reached max
          newObjectType = 'good';
          currentObjectSize = baseGoodObjectSize + (level - 1) * goodObjectSizeIncreasePerLevel;
          objectSpeed = (3 + Math.random() * 2) + (level - 1) * 0.7;
        } else {
          newObjectType = 'bad';
          currentObjectSize = baseAmpalayaSize + (level - 1) * ampalayaSizeIncreasePerLevel; // Ampalaya size increases faster
          objectSpeed = (3 + Math.random() * 2) + (level - 1) * 0.9; // Ampalaya speed increases faster
        }

        const heartColor = '#FF69B4'; // Pink for hearts
        const newObject: FallingObject = {
          id: Date.now() + Math.random(),
          x: Math.random() * (gameAreaWidth - currentObjectSize),
          y: 0,
          size: currentObjectSize,
          speed: objectSpeed,
          type: newObjectType,
          ...(newObjectType === 'bad' && { imageSrc: ampalaya }),
          ...(newObjectType === 'good' && { color: heartColor, svgData: getHeartSVG(heartColor) }),
        };
        return [...prevObjects, newObject];
      });
    }, adjustedGenerateInterval);

    return () => clearInterval(generateInterval);
  }, [gameOver, win, level, collectedHeartsCount, baseGoodObjectSize, goodObjectSizeIncreasePerLevel, baseAmpalayaSize, ampalayaSizeIncreasePerLevel, maxGoodObjects]); // Added maxGoodObjects to dependencies

  // Animate falling objects and check for collisions
  useEffect(() => {
    if (gameOver || win) return;

    const gameInterval = setInterval(() => {
      setFallingObjects(prevObjects => {
        const updatedObjects = prevObjects.map(obj => ({
          ...obj,
          y: obj.y + obj.speed,
        }));

        // Collision detection
        const characterRect = characterRef.current?.getBoundingClientRect();
        const gameAreaRect = gameAreaRef.current?.getBoundingClientRect();

        let newGameOverState = false;
        let newObjects: FallingObject[] = [];

        for (let i = 0; i < updatedObjects.length; i++) {
          const obj = updatedObjects[i];
          if (characterRect && gameAreaRect) {
            const characterRelativeRect = {
              left: characterRect.left - gameAreaRect.left,
              right: characterRect.right - gameAreaRect.left,
              top: characterRect.top - gameAreaRect.top,
              bottom: characterRect.bottom - gameAreaRect.top,
            };

            const objRect = {
              left: obj.x,
              right: obj.x + obj.size,
              top: obj.y,
              bottom: obj.y + obj.size,
            };

            if (
              objRect.left < characterRelativeRect.right &&
              objRect.right > characterRelativeRect.left &&
              objRect.top < characterRelativeRect.bottom &&
              objRect.bottom > characterRelativeRect.top
            ) {
              if (obj.type === 'bad') {
                newGameOverState = true;
                break;
              } else if (obj.type === 'good') {
                setScore(prev => prev + 10);
                setCollectedHeartsCount(prev => {
                  const newCount = prev + 1;
                  // Display message sequentially
                  if (newCount <= messages.length) {
                    setCurrentMessage(messages[messageIndex]);
                    setMessageIndex(prev => (prev + 1) % messages.length);
                    if (messageTimeoutRef.current) {
                      clearTimeout(messageTimeoutRef.current);
                    }
                    messageTimeoutRef.current = setTimeout(() => {
                      setCurrentMessage(null);
                    }, 1500);
                  }
                  return newCount;
                });
                continue;
              }
            }
          }
          newObjects.push(obj);
        }

        if (newGameOverState) {
          setGameOver(true);
          clearInterval(gameInterval);
          return prevObjects; // Stop updating objects on game over
        }

        // Remove objects that have fallen off screen and update score for bad objects
        const gameAreaHeight = gameAreaRef.current?.offsetHeight || window.innerHeight;
        const filteredObjects = newObjects.filter(obj => {
          if (obj.y > gameAreaHeight) { // Constrain to game area height
            if (obj.type === 'bad') {
              setScore(prev => prev + 1); // Still give score for dodging bad objects
            }
            return false; // Remove object
          }
          return true; // Keep object
        });

        // Check for win condition (user set to 180)
        if (score >= 180) { 
          setWin(true);
          clearInterval(gameInterval);
          return filteredObjects; // Stop updating objects on win
        }

        return filteredObjects;
      });
    }, 20); // Update objects every 20ms

    return () => clearInterval(gameInterval);
  }, [gameOver, win, score, collectedHeartsCount]); // Add all relevant dependencies

  const buttonStyle = {
    width: '100px',
    height: '100px',
    backgroundColor: '#8A2BE2',
    border: '4px solid #DDA0DD',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '36px',
    color: 'white',
    userSelect: 'none' as const,
    touchAction: 'manipulation' as const,
    cursor: 'pointer',
    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.2s ease-in-out',
    margin: '10px'
  };

  const restartGame = () => {
    setGameOver(false);
    setWin(false);
    setScore(0);
    setLevel(1);
    setCollectedHeartsCount(0); // Reset collected hearts on restart
    setPosition(0);
    setFallingObjects([]);
    setCurrentMessage(null); // Clear message on restart
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
      messageTimeoutRef.current = null;
    }
  };

  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: '#aed6f1',
      overflow: 'hidden',
      gap: '20px',
      padding: '20px',
      position: 'relative'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        position: 'relative',
        zIndex: 1
      }}>
        <div
          ref={gameAreaRef}
          style={{
            position: 'relative',
            width: '400px',
            height: '600px',
            border: '2px solid #5d6d7e',
            backgroundColor: '#eaf2f8',
            overflow: 'hidden',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
            borderRadius: '10px',
          }}
        >
          {!gameOver && !win && (
            <img
              ref={characterRef}
              src={penguinJa}
              style={{
                width: `${characterSize}px`,
                position: 'absolute',
                left: `${position}px`,
                top: `calc(100% - ${characterSize + 20}px)`,
                transform: 'translateY(-50%)',
                transition: 'left 0.1s linear',
                filter: 'drop-shadow(0 0 8px rgba(0, 0, 0, 0.3))'
              }}
              alt="Character"
            />
          )}

          {fallingObjects.map(obj => (
            obj.type === 'good' ? (
              <img
                key={obj.id}
                src={obj.svgData}
                alt="Heart"
                style={{
                  position: 'absolute',
                  left: `${obj.x}px`,
                  top: `${obj.y}px`,
                  width: `${obj.size}px`,
                  height: `${obj.size}px`,
                  opacity: (gameOver || win) ? 0.5 : 1,
                  objectFit: 'contain',
                }}
              />
            ) : (
              <img
                key={obj.id}
                src={obj.imageSrc}
                alt="Ampalaya"
                style={{
                  position: 'absolute',
                  left: `${obj.x}px`,
                  top: `${obj.y}px`,
                  width: `${obj.size}px`,
                  height: `${obj.size}px`,
                  opacity: (gameOver || win) ? 0.5 : 1,
                }}
              />
            )
          ))}

          {currentMessage && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              padding: '15px 25px',
              borderRadius: '10px',
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#333',
              zIndex: 1001,
              boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
              opacity: 1,
              transition: 'opacity 0.5s ease-out',
            }}>
              {currentMessage}
            </div>
          )}

          {(gameOver || win) && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              maxWidth: '500px',
              backgroundColor: gameOver ? 'rgba(139, 0, 0, 0.9)' : 'rgba(46, 139, 87, 0.9)',
              color: 'white',
              padding: '40px 30px',
              borderRadius: '15px',
              textAlign: 'center',
              zIndex: 2000,
              boxShadow: gameOver 
                ? '0 15px 25px rgba(139, 0, 0, 0.6)' 
                : '0 15px 25px rgba(46, 139, 87, 0.6)',
              animation: gameOver 
                ? 'shake 0.5s ease-in-out' 
                : 'bounce 0.5s ease-in-out',
            }}>
              <h2 style={{ 
                margin: '0 0 25px 0', 
                fontSize: '48px', 
                color: win ? '#98FB98' : '#FF6347',
                textShadow: win 
                  ? '0 0 10px rgba(152, 251, 152, 0.5)' 
                  : '0 0 10px rgba(255, 99, 71, 0.5)'
              }}>
                {gameOver ? 'Game Over!' : 'You Win!'}
              </h2>
              <p style={{ 
                margin: '0 0 40px 0', 
                fontSize: '28px', 
                fontWeight: 'normal',
                color: win ? '#E0FFF0' : '#FFE4E1'
              }}>
                Your score: <span style={{ fontWeight: 'bold' }}>{score}</span>
              </p>
              <button 
                onClick={restartGame}
                style={{
                  padding: '18px 36px',
                  fontSize: '22px',
                  backgroundColor: win ? '#32CD32' : '#DC143C',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = win ? '#228B22' : '#B22222'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = win ? '#32CD32' : '#DC143C'}
                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {win ? 'Play Again!' : 'Try Again'}
              </button>
            </div>
          )}
        </div>

        {!gameOver && !win && (
          <div style={{
            display: 'flex',
            gap: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            backdropFilter: 'blur(5px)',
            position: 'relative',
            zIndex: 2,
            padding: '10px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
          }}>
            <div
              style={{ ...buttonStyle, transform: isMovingLeft ? 'scale(1.1)' : 'scale(1)' }}
              onTouchStart={() => setIsMovingLeft(true)}
              onTouchEnd={() => setIsMovingLeft(false)}
              onMouseDown={() => setIsMovingLeft(true)}
              onMouseUp={() => setIsMovingLeft(false)}
              onMouseLeave={() => setIsMovingLeft(false)}
            >
              ←
            </div>
            <div
              style={{ ...buttonStyle, transform: isMovingRight ? 'scale(1.1)' : 'scale(1)' }}
              onTouchStart={() => setIsMovingRight(true)}
              onTouchEnd={() => setIsMovingRight(false)}
              onMouseDown={() => setIsMovingRight(true)}
              onMouseUp={() => setIsMovingRight(false)}
              onMouseLeave={() => setIsMovingRight(false)}
            >
              →
            </div>
          </div>
        )}
      </div>

      {!gameOver && !win && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#333',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '10px 20px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          zIndex: 3
        }}>
          Score: {score} | Level: {level}
        </div>
      )}

      <style>
        {`
          @keyframes shake {
            0%, 100% { transform: translate(-50%, -50%); }
            25% { transform: translate(-52%, -50%); }
            75% { transform: translate(-48%, -50%); }
          }
          @keyframes bounce {
            0%, 100% { transform: translate(-50%, -50%); }
            50% { transform: translate(-50%, -52%); }
          }
        `}
      </style>
    </div>
  );
};

export default Week13;