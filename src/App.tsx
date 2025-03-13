import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/contents/Home";
import NotFound from "@/contents/NotFound";
import ScreenSize from "@/components/ScreenSize";
import Gallery from "@/contents/Gallery";

// Import all weeks dynamically
import Week1 from "@/contents/Week1";
import Week2 from "@/contents/Week2";
import Week3 from "@/contents/Week3";
import Week4 from "@/contents/Week4";
import Week5 from "@/contents/Week5";
import Week6 from "@/contents/Week6";
import Week7 from "@/contents/Week7";
import Week8 from "@/contents/Week8";
import Week9 from "@/contents/Week9";
import Week10 from "@/contents/Week10";
import Week11 from "@/contents/Week11";
import Week12 from "@/contents/Week12";
import Week13 from "@/contents/Week13";
import Week14 from "@/contents/Week14";
import Week15 from "@/contents/Week15";
import Week16 from "@/contents/Week16";
import Week17 from "@/contents/Week17";
import Week18 from "@/contents/Week18";
import Week19 from "@/contents/Week19";
import Week20 from "@/contents/Week20";
import Week21 from "@/contents/Week21";
import Week22 from "@/contents/Week22";
import Week23 from "@/contents/Week23";
import Week24 from "@/contents/Week24";
import Week25 from "@/contents/Week25";
import Week26 from "@/contents/Week26";
import Week27 from "@/contents/Week27";
import Week28 from "@/contents/Week28";
import Week29 from "@/contents/Week29";
import Week30 from "@/contents/Week30";
import Week31 from "@/contents/Week31";
import Week32 from "@/contents/Week32";
import Week33 from "@/contents/Week33";
import Week34 from "@/contents/Week34";
import Week35 from "@/contents/Week35";
import Week36 from "@/contents/Week36";
import Week37 from "@/contents/Week37";
import Week38 from "@/contents/Week38";
import Week39 from "@/contents/Week39";
import Week40 from "@/contents/Week40";
import Week41 from "@/contents/Week41";

// Define an array of routes
const weekRoutes = [
  { path: "/marxvii", component: Week1 },
  { path: "/marxxiv", component: Week2 },
  { path: "/marxxxi", component: Week3 },
  { path: "/aprvii", component: Week4 },
  { path: "/aprxiv", component: Week5 },
  { path: "/aprxxi", component: Week6 },
  { path: "/aprxxviii", component: Week7 },
  { path: "/mayv", component: Week8 },
  { path: "/mayxii", component: Week9 },
  { path: "/mayxix", component: Week10 },
  { path: "/mayxxvi", component: Week11 },
  { path: "/junii", component: Week12 },
  { path: "/junix", component: Week13 },
  { path: "/junxvi", component: Week14 },
  { path: "/junxxiii", component: Week15 },
  { path: "/junxxx", component: Week16 },
  { path: "/julyvii", component: Week17 },
  { path: "/julyxiv", component: Week18 },
  { path: "/julyxxi", component: Week19 },
  { path: "/julyxxviii", component: Week20 },
  { path: "/augiv", component: Week21 },
  { path: "/augxi", component: Week22 },
  { path: "/augxviii", component: Week23 },
  { path: "/augxxv", component: Week24 },
  { path: "/sep1", component: Week25 },
  { path: "/sepviii", component: Week26 },
  { path: "/sepxv", component: Week27 },
  { path: "/sepxxii", component: Week28 },
  { path: "/sepxxix", component: Week29 },
  { path: "/octvi", component: Week30 },
  { path: "/octxiii", component: Week31 },
  { path: "/octxx", component: Week32 },
  { path: "/octxxvii", component: Week33 },
  { path: "/noviii", component: Week34 },
  { path: "/novx", component: Week35 },
  { path: "/novxvii", component: Week36 },
  { path: "/novxxiv", component: Week37 },
  { path: "/dec1", component: Week38 },
  { path: "/decviii", component: Week39 },
  { path: "/decxv", component: Week40 },
  { path: "/decxxii", component: Week41 },
];

function App() {
  return (
    <div>
      <ScreenSize />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          {weekRoutes.map(({ path, component: Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
