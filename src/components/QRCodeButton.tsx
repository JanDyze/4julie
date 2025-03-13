import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeButton = () => {
    const [showQR, setShowQR] = useState(false);
    const pageUrl = window.location.href; // Get the current page URL

    return (
        <div className="flex flex-col items-center">
            <button 
                onClick={() => setShowQR(!showQR)} 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
                {showQR ? "Hide QR Code" : "Generate QR Code"}
            </button>

            {showQR && (
                <div className="mt-4 p-4 bg-white rounded-lg shadow-lg">
                    <QRCodeCanvas value={pageUrl} size={200} />
                </div>
            )}
        </div>
    );
};

export default QRCodeButton;
