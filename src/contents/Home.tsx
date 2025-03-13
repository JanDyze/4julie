import { useEffect, useState } from "react";

const Home = () => {
  const [borderImage, setBorderImage] = useState("/sketchbg.jpg");

  useEffect(() => {
    const updateBorderImage = () => {
      if (window.innerWidth >= 1280) {
        // xl and above
        setBorderImage("/burgundyxl.png");
      } else {
        setBorderImage("/burgandy.png");
      }
    };

    updateBorderImage(); // Set initial value on mount
    window.addEventListener("resize", updateBorderImage);

    return () => window.removeEventListener("resize", updateBorderImage);
  }, []);

  return (
    <>
      <div className="relative h-screen bg-[url('/sketchbg.jpg')] bg-cover bg-center flex items-center">
        {/* Border with Background Image */}
        <div
          className="fixed inset-0 pointer-events-none xl:border-[12vh] lg:border-[12vh] border-[3vh] border-solid"
          style={{
            borderImageSource: `url('${borderImage}')`,
            borderImageSlice: "100 fill", // Ensures it stretches properly
            borderImageWidth: "12vh", // Matches the Tailwind class
            borderImageRepeat: "stretch", // Prevents tiling
          }}
        ></div>

        {/* Content (Make sure it is above the border) */}
        <div
          className="relative z-[10] text-center xl:mx-[12vh] lg:mx-[12vh] mx-[3vh] h-[94vh] xl:h-[76vh] lg:h-[76vh] rounded-4xl bg-rose-200 overflow-auto w-full scrollbar-hide "
        >
          <div className="h-full items-center flex justify-end flex-col xl:bg-[url('/JAwelcs.jpg')] lg:bg-[url('/lgbg.png')] bg-cover bg-center">
            {/* Your content here */}
          </div>
        </div>

      </div>
    </>
  );
};

export default Home;
