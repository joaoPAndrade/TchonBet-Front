import { FAQ } from "../../components/FAQ";
import { Footer } from "../../components/Footer";
import { Hero } from "../../components/Hero";
import { HowItWorks } from "../../components/HowItWorks";
import { Navbar } from "../../components/Navbar";
import { ScrollToTop } from "../../components/ScrollToTop";
import { Sponsors } from "../../components/Sponsors";

export const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Sponsors />
      <HowItWorks />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default Home;
