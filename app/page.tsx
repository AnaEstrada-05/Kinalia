import About from "@/components/About";
import CalendlyModal from "@/components/CalendlyModal";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Process from "@/components/Process";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Process />
        <About />
      </main>
      <Footer />
      <CalendlyModal />
    </>
  );
}
