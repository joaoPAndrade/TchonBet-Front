import { useState } from "react";
import { FAQ } from "../../components/FAQ";
import { Footer } from "../../components/Footer";
import { MainText } from "../../components/MainText";
import { HowItWorks } from "../../components/HowItWorks";
import { Navbar } from "../../components/Navbar";
import { ScrollToTop } from "../../components/ScrollToTop";
import { AuthDrawer } from "../auth/AuthDrawer";

export const Home = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <Navbar onOpenLogin={() => setIsLoginOpen(true)} />
      <MainText />
      <HowItWorks />
      <FAQ />
      <Footer />
      <ScrollToTop />
      <AuthDrawer isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Home;
