import CalendlyModal from "@/components/CalendlyModal";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import Products from "@/components/Products";
import CtaBanner from "@/components/CtaBanner";
import Team from "@/components/Team";
import PainPoints from "@/components/PainPoints";
import HappyClients from "@/components/HappyClients";

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Hero />
        <main className="flex flex-col bg-[#F4F4F4] text-[#111111]">
          <PainPoints />
          <Process />
          <Products />
          <HappyClients />
          <CtaBanner />
          {/* <Team /> */}
        </main>
        <Footer />
      </div>

      <CalendlyModal />
    </>
  );
}