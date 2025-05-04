import { useState, useEffect } from "react";
import Modal from "@/components/Modal";

const Week8 = () => {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowContent(true), 50); // Small delay ensures modal appears first
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Modal date="2025-03-17" redirectTo="/" />
            {showContent && (
                <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                    <div className="bg-white p-10 rounded-xl shadow-2xl text-center animate-continuousBounce max-w-md mx-auto border-4 border-indigo-400">
                        <h2 className="text-3xl font-extrabold text-indigo-700 mb-4">Content Coming Soon!</h2>
                        <p className="text-teal-600 text-xl font-medium">
                            I'll add the content later today or tomorrow. Stay tuned!
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Week8;