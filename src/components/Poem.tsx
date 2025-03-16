interface PoemProps {
    title: string;
    content: string;
    image: string;
}

const Poem: React.FC<PoemProps> = ({ title, content, image }) => {
    return (
        <div className="h-screen flex flex-col md:grid md:grid-cols-12 bg-black">
            {/* Left Section with Image */}
            <div className="md:col-span-8 w-full h-1/4 md:h-full relative">
                <img
                    src={image}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 w-full h-full bg-black/30"></div>
                <div className="relative z-10 text-white p-4 flex items-center justify-center h-full ">
                    <div className="md:w-1/2">
                        <h1 className="font-bold text-4xl md:text-6xl text-start">
                            {title}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="md:col-span-4 w-full h-auto md:h-full bg-black text-white flex flex-col items-center justify-center gap-4 p-6 overflow-auto ">
                <div className="text-justify whitespace-pre-line xl:mt-0 mt-80">{content}</div>
            </div>
        </div>
    );
};

export default Poem;
