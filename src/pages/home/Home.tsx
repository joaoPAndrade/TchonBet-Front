import { useState } from "react";
import { FAQ } from "../../components/FAQ";
import { Footer } from "../../components/Footer";
import { MainText } from "../../components/MainText";
import { HowItWorks } from "../../components/HowItWorks";
import { Navbar } from "../../components/Navbar";
import { ScrollToTop } from "../../components/ScrollToTop";
import { AuthDrawer } from "../auth/AuthDrawer";
import { PaymentDrawer } from "../payment/Payment";

export const Home = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isPaymentOpen, setPaymentOpen] = useState(false);

  return (
    <>
      <Navbar onOpenLogin={() => setIsLoginOpen(true)} onOpenPayment={() => setPaymentOpen(true)} />
      <MainText />
      <HowItWorks />
      <FAQ />
      <Footer />
      <ScrollToTop />
      <AuthDrawer isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <PaymentDrawer isOpen={isPaymentOpen} onClose={() => setPaymentOpen(false)} />
    </>
  );
};

export default Home;
