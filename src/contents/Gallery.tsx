import React, { useState, useEffect, useRef } from "react";

const INITIAL_ITEMS = 40;
const COLUMNS = 5;
const LOAD_MORE = 10;

const COLUMN_MARGINS = ["mt-60", "mt-0", "mt-20", "mt-0", "mt-60"];

const COLUMN_IMAGES = [
    ["island2.jpg", "island.jpg", "pengu.jpg", "buildings.jpg"],
    ["pingwi.jpg", "bny.jpg", "sketchbg.jpg"],
    ["sketchbgxl.jpg", "dancepeng.gif", "dancepeng2.gif"],
    ["border.jpg", "bordere.jpg", "buildings.jpg"],
    ["border2.jpg", "BG.png", "bg.jpg"]
];

const SCROLL_SPEEDS: Record<number, number> = {
    0: 0.2,
    1: 0.5,
    2: 0.3,
    3: 0.5,
    4: 0.2,
};

const Gallery = () => {
    const [items, setItems] = useState(INITIAL_ITEMS);
    const [scrollOffset, setScrollOffset] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const columnRefs = useRef<(HTMLDivElement | null)[]>(new Array(COLUMNS).fill(null));

    useEffect(() => {
        if (containerRef.current) {
            const middle = containerRef.current.scrollHeight / 2;
            window.scrollTo({ top: middle, behavior: "instant" });
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setScrollOffset(scrollY);

            columnRefs.current.forEach((column, colIndex) => {
                if (!column) return;

                const maxScroll = column.scrollHeight - window.innerHeight;
                const scrollThreshold = maxScroll * 0.05; // 5% from bottom

                if (scrollY <= 50 || scrollY >= maxScroll - scrollThreshold) {
                    setItems((prev) => prev + LOAD_MORE);
                }

                // Loop scrolling at different points per column
                if (scrollY < scrollThreshold) {
                    window.scrollTo({ top: maxScroll - scrollThreshold, behavior: "instant" });
                } else if (scrollY > maxScroll - scrollThreshold) {
                    window.scrollTo({ top: scrollThreshold, behavior: "instant" });
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div ref={containerRef} className="p-4">
            <div className="grid grid-cols-5 xl:gap-4 gap-1">
                {Array.from({ length: COLUMNS }).map((_, colIndex) => (
                    <div
                        key={colIndex}
                        ref={(el) => {
                            columnRefs.current[colIndex] = el;
                        }}
                        className="flex flex-col gap-4"
                        style={{
                            transform: `translateY(${scrollOffset * SCROLL_SPEEDS[colIndex]}px)`,
                            transition: "transform 0.1s linear",
                            willChange: "transform",
                        }}
                    >
                        {Array.from({ length: items }).map((_, rowIndex) => {
                            const imageIndex = rowIndex % COLUMN_IMAGES[colIndex].length;
                            const imageSrc = COLUMN_IMAGES[colIndex][imageIndex];

                            return (
                                <div
                                    key={rowIndex}
                                    className={`${rowIndex === 0 ? COLUMN_MARGINS[colIndex] : ""
                                        } rounded-lg shadow-md overflow-hidden relative xl:h-120 h-40`}
                                >
                                    <img
                                        src={imageSrc}
                                        alt={`Column ${colIndex} - Image ${rowIndex}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
