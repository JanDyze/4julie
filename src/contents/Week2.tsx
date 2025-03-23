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
            <Modal date="2025-03-25" redirectTo="/" />
            {showLetter && (
                <LoveLetter
                    content={`
My Dear Ja💖,

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. 

Suspendisse potenti. Sed sollicitudin, eros auctor vestibulum tempor, magna libero semper nisl, id commodo purus risus eu eros. Praesent nec lorem eget massa aliquam interdum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce porttitor, magna eu sollicitudin tempor, lorem libero sodales augue, eget aliquam nunc nisl eu eros. Phasellus in felis eu eros varius aliquet. Nulla facilisi. Sed id urna nec lorem pellentesque commodo. Proin euismod, lorem sed dictum tristique, purus nisl ultricies eros, id aliquam nunc nisl eu eros. 

Vivamus euismod, lorem sed dictum tristique, purus nisl ultricies eros, id aliquam nunc nisl eu eros. Integer euismod, lorem sed dictum tristique, purus nisl ultricies eros, id aliquam nunc nisl eu eros. Sed id urna nec lorem pellentesque commodo. Proin euismod, lorem sed dictum tristique, purus nisl ultricies eros, id aliquam nunc nisl eu eros. Fusce porttitor, magna eu sollicitudin tempor, lorem libero sodales augue, eget aliquam nunc nisl eu eros. Phasellus in felis eu eros varius aliquet. Nulla facilisi. 

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. 

Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Suspendisse potenti. Sed sollicitudin, eros auctor vestibulum tempor, magna libero semper nisl, id commodo purus risus eu eros. 

Praesent nec lorem eget massa aliquam interdum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce porttitor, magna eu sollicitudin tempor, lorem libero sodales augue, eget aliquam nunc nisl eu eros. Phasellus in felis eu eros varius aliquet. Nulla facilisi. Sed id urna nec lorem pellentesque commodo. Proin euismod, lorem sed dictum tristique, purus nisl ultricies eros, id aliquam nunc nisl eu eros. Vivamus euismod, lorem sed dictum tristique, purus nisl ultricies eros, id aliquam nunc nisl eu eros. Integer euismod, lorem sed dictum tristique, purus nisl ultricies eros, id aliquam nunc nisl eu eros. Sed id urna nec lorem pellentesque commodo.
Always yours,

Dyze
`}
                />
            )}
        </div>
    );
};

export default Week1;