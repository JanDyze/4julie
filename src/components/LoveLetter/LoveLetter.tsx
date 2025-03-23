// LoveLetter.tsx
import React, { useState, useRef, useEffect } from 'react';

interface LoveLetterProps {
  content: string;
}

const LoveLetter: React.FC<LoveLetterProps> = ({ content }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFullSize, setIsFullSize] = useState<boolean>(false);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const letterRef = useRef<HTMLDivElement>(null);

  const handleOpenLetter = (): void => {
    setIsOpen(true);
    setTimeout(() => {
      setIsFullSize(true);
    }, 800);
  };

  const handleCloseLetter = (): void => {
    setIsFullSize(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 800);
  };

  useEffect(() => {
    const letter = letterRef.current;
    if (!letter) return;

    if (isFullSize) {
      const envelopeHeight = 400; // Envelope height in px
      const letterHeight = letter.scrollHeight; // Full height of the letter content
      const extraSpace = 600; // Extra 600px to allow more scrolling
      const maxTranslate = letterHeight - envelopeHeight + extraSpace; // Max distance to pull up

      const handleScroll = () => {
        const scrollTop = window.scrollY; // Page scroll position
        const translateY = Math.min(0, Math.max(-maxTranslate, -scrollTop));
        letter.style.transform = `translateY(${translateY}px)`;
        // Hide hint once scrolling starts
        if (scrollTop > 0) setHasScrolled(true);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      // Reset transform when not full size
      letter.style.transform = `translateY(0px)`;
      setHasScrolled(false); // Reset scroll state when closing
    }
  }, [isFullSize]);

  return (
    <div
      className={`w-full xl:w-[600px] lg:w-[600px] h-96 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer perspective-[1000px] bg-[url('https://content.mycutegraphics.com/backgrounds/valentine/valentine-penguin-love-background.gif')] rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.3)] transition-transform duration-600 ease-in-out overflow-visible z-10 ${
        isOpen ? 'open' : ''
      }`}
      onClick={!isFullSize ? handleOpenLetter : handleCloseLetter}
    >
      <div
        className={`absolute w-full h-1/2 bg-[url('https://content.mycutegraphics.com/backgrounds/valentine/valentine-penguin-love-background.gif')] origin-bottom transition-transform duration-800 ease-in-out rounded-t-lg shadow-[0_2px_5px_rgba(0,0,0,0.2)] z-31 ${
          isOpen ? '-rotate-x-180 shadow-[0_10px_20px_rgba(0,0,0,0.5)]' : ''
        }`}
      ></div>
      <div
        className="absolute top-1/2 w-full h-1/2 bg-[url('https://content.mycutegraphics.com/backgrounds/valentine/valentine-penguin-love-background.gif')] rounded-b-lg shadow-[inset_0_2px_5px_rgba(0,0,0,0.1)] z-30"
      ></div>
      <div
        ref={letterRef}
        className={`absolute top-full left-0 w-full bg-[#fafafa] transition-all duration-300 ease-out z-0 opacity-0 font-['Sedan'] text-xl p-5 box-border text-justify mb-[50rem] ${
          isFullSize ? 'opacity-100 z-10' : ''
        }`}
      >
        {content.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>
      <div
        className="absolute top-full left-0 w-full h-[100vh] bg-white z-20"
      ></div>
      {isFullSize && !hasScrolled && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center justify-center bg-[#ff6b6b] text-white text-sm font-['Sedan'] px-4 py-2 rounded-full shadow-md animate-bounce"
        >
          <span>Scroll down to unveil my heart’s words</span>
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default LoveLetter;