import { useState, useEffect } from "react";
import LoveLetter from "@/components/LoveLetter/LoveLetter"; // Adjust the import path as needed
import Modal from "@/components/Modal";

const Week1 = () => {
    const [showLetter, setShowLetter] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowLetter(true), 50); // Small delay ensures modal appears first
        return () => clearTimeout(timer);
    }, []);
 
    return (
        <div className="min-h-[1000vh]"> {/* Add enough height to enable scrolling */}
            <Modal date="2025-04-01" redirectTo="/" />
            {showLetter && (
               <div>
                Wala pa 😢
               </div>
            )}
        </div>
    );
};

export default Week1;