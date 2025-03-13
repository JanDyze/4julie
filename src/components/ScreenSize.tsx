import { useState, useEffect } from "react";

const getScreenSize = (width: number): string => {
  if (width < 640) return "xs"; // < 640px
  if (width < 768) return "sm"; // 640px - 767px
  if (width < 1024) return "md"; // 768px - 1023px
  if (width < 1280) return "lg"; // 1024px - 1279px
  if (width < 1536) return "xl"; // 1280px - 1535px
  return "2xl"; // 1536px+
};

const ScreenSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    screen: getScreenSize(window.innerWidth),
  });

  const [isVisible, setIsVisible] = useState(false); // Toggle visibility

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
        screen: getScreenSize(window.innerWidth),
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed bottom-4 right-4">
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-gray-800 text-white px-3 py-1 rounded-md mb-2"
      >
        {isVisible ? "Hide" : "Show"}
      </button>

      {/* Info Box (conditionally rendered) */}
      {isVisible && (
        <div className="bg-black text-white px-4 py-2 rounded-lg shadow-md">
          <p className="text-sm">
            Width: {size.width}px | Height: {size.height}px
          </p>
          <p className="text-sm font-bold">Screen Size: {size.screen}</p>
        </div>
      )}
    </div>
  );
};

export default ScreenSize;
