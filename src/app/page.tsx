"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PropertiesSection from "@/components/PropertiesSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <PropertiesSection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <FloatingChat />

      {/* Dashboard Intranet Embutido (Overlay) */}
      <div
        id="dashboard-layer"
        className="fixed inset-0 z-[100] bg-slate-900 overflow-y-auto"
        style={{ display: "none" }}
      >
        <div className="bg-slate-800 border-b border-slate-700 py-4 px-6 fixed top-0 w-full z-10 flex justify-between items-center shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold text-white text-xs">
              IP
            </div>
            <span className="text-white font-semibold flex items-center gap-2">
              Intranet Agentes <span className="text-[10px] bg-accent px-2 py-0.5 rounded uppercase tracking-wider font-bold">Confidencial</span>
            </span>
          </div>
          <button
            className="text-slate-400 hover:text-white transition-colors bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded text-sm font-medium"
            onClick={() => {
              const el = document.getElementById("dashboard-layer");
              if (el) el.style.display = "none";
            }}
          >
            Sair da Área
          </button>
        </div>
        <div className="pt-24 pb-12 max-w-[1400px] mx-auto px-6">
          <Dashboard />
        </div>
      </div>
    </>
  );
}
