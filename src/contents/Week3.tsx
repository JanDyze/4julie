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
                <LoveLetter
                    content={`
My Dear Ja💖,

Kumusta ang 8 days mo sa Siargao? Makapangumusta ako kala mo di tayo nagco-call halos araw araw. Pero really kumusta - your life aspects - your spirituality🙏, your emotions😑, your health💪, your socials🤼, your finances💵(magsabi ka lang sakin... I'll pray with you 😂AHAHAHA), and syempre your work? I do hope na beyond sa alam ko ay okay ka talaga diyan.

Do you know... I'm a man who's slow pagdating sa sinking in mga bagay or syncing, di ko alam ang tamang word basta yun. May times na pag may sinasabi ang people or ang Lord mismo sakin, it would take weeks or months para marealize ko. I admit my kabagalan he he. And part of that is the slow realization that you're really away and won't be coming back anytime now. I'm sorry I used to joke around about you leaving and sarcastic tones about missing you but FR, i miss u and i know im gonna miss u more. Buti na lang may comms pa rin tayo, di ka naman seaman e HAHAHA. Always ready ako to answer your calls #oneCallAway. 

Ang hopes ko ay mag-enjoy ka dyan but not sin-enjoy just life-enjoy. Matuto ka sa work and life experiences dyan. Umuwi kang buo ang pisikal at pagkatao haha! Hope ko rin na makabisita sayo bago ka umuwi aaaa sanaaaa. I also trust Sean to protect u and always be with u althroughout kahit di kami magkakilala talaga hahaha. Sana di sya gaya ng iba dyaaaan... Bantay salakay 😡. Sino ba yun?!? hahaha. Hope ko rin na maging official na tayo - im the weakest and prideful man I know and I cringe when i think about it - sorry 😢. Hope with me along these things please! Hope with prayer.

Ako, thank u for asking! I'm not okay. Nahihirapan akong bumalik sa spritual walk ko. I may look okay but im dying inside chz. Pero ayun, I'm having the struggle of my life and idk what to do. Perhaps, alam ko pala ang gagawin pero di ko ginagawa. Hays...
Sana next time, I can bring u the good news na okay na ako. 

Hey, Im serious with my questions, update mo pa rin ako kung kumusta ka na sa kung paanong paraan. Hanggang dito na lang muna. Hanggang sa muli (next week 🤣)

Nagmamahal sa malayong dilag, 
Dyze
`}
                />
            )}
        </div>
    );
};

export default Week1;