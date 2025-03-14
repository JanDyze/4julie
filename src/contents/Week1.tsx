import { useState, useEffect } from "react";
import Poem from "@/components/Poem";
import Modal from "@/components/Modal";

const Week1 = () => {
    const [showPoem, setShowPoem] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowPoem(true), 50); // Small delay ensures modal appears first
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Modal date="2025-03-17" redirectTo="/" />
            {showPoem && (
                <Poem
                    title="Iba Na Ang 'Yong Dalampasigan"
                    image="/island2.jpg"
                    content={`Iba na ang ‘yong dalampasigan,
Di na tulad ng nakaraan.
Mga alon mong dating kay lambing,
Ngayo’y tila may hinanakit sa hangin.

Buhangin mong dati’y kay puti,
Ngayon ay may bahid ng dumi.
Mga yapak na minsang naglaro,
Ngayon ay wala, nilamon ng lungkot at gulo.

Hinahanap ko ang ating kahapon,
Mga halakhak sa baybayin noon.
Ngunit tila ba’y ikaw ay nagbago,
Dala ng panahong di na bumalik ng buo.

Sana'y marinig mo ang aking hinaing,
Dalampasigang minsan kong hinalikan.
Ibalik mo ang aliw ng daluyong,
Ang yakap ng dagat sa pusong ligaw.`}
                />
            )}
        </>
    );
};

export default Week1;
