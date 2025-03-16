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
                    content={`
Hindi naman nagbago ang dagat na pumapalibot,
Pareho pa rin ang alat, pareho pa rin ang araw, 
Maging ang Diyos natin ay hindi nagbago’t naiba,
Ngunit hindi maipagkakaila na malayo ka na,

Ngayon, ibang pampang na ang iyong tinatanaw,
Ibang alon na ang sa paa’y humahapaw,
Hindi ka na kilala ng mga isdang sisisirin,
Iba na ang babalot sayo’ng buhangin,

Mauunawan pa ba natin ang himig ng malamig na hangin,
Kung magkaiba ang nais nitong sabihin,
Hindi kayang pawiin ng alat ang uhaw,
Dagat man ay bughaw, malabo pa rin salamin,

Iba na ang iyong dalampasigan,
Iniwan mo na ang tinatawag mong tahanan,
Siyam na siklo ang iikutin ng buwan,
Siyang aking hihintayin, bago ka muling mahawakan,

Hindi matagal ang nakalaang pahanong malayo ka,
Kumpara sa buhay na ating kakamtang magkasama,
At lalong ano ang siyam na buwan,
Sa buhay na walang hanggan – sa piling Niya,

`}
                />
            )}
        </>
    );
};

export default Week1;
