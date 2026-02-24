"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PropertiesSection from "@/components/PropertiesSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import PropertyMap from "@/components/PropertyMap";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [lang, setLang] = useState<"pt" | "en">("pt");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("iz_language_pref");
      if (saved === "pt" || saved === "en") {
        setLang(saved as "pt" | "en");
      } else {
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith("pt")) setLang("pt");
        else setLang("en");
      }
    }
  }, []);

  const handleSetLang = (newLang: "pt" | "en") => {
    setLang(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("iz_language_pref", newLang);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "ZetaGlobal2026") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Senha de acesso incorreta. Acesso negado.");
    }
  };

  return (
    <>
      <Navbar lang={lang} setLang={handleSetLang} />
      <Hero lang={lang} />
      <PropertyMap lang={lang} />
      <PropertiesSection lang={lang} />
      <ServicesSection lang={lang} />
      <AboutSection lang={lang} />
      <ContactSection lang={lang} />
      <Footer lang={lang} />
      <FloatingChat lang={lang} />

      {/* Intranet Overlay */}
      <div id="dashboard-layer" className="fixed inset-0 z-[100] bg-slate-900 overflow-y-auto" style={{ display: "none" }}>
        <div className="bg-slate-800 border-b border-slate-700 py-4 px-6 fixed top-0 w-full z-10 flex justify-between items-center shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold text-white text-xs">IZ</div>
            <span className="text-white font-semibold flex items-center gap-2">Intranet Agentes</span>
          </div>
          <button className="text-slate-400 hover:text-white transition-colors bg-slate-700 px-3 py-1.5 rounded text-sm font-medium" onClick={() => {
            const el = document.getElementById("dashboard-layer");
            if (el) el.style.display = "none";
            setIsAuthenticated(false);
          }}>
            Sair da Área
          </button>
        </div>
        <div className="pt-24 pb-12 max-w-[1400px] mx-auto px-6 flex items-center justify-center min-h-screen">
          {!isAuthenticated ? (
            <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md text-center border border-slate-100">
              <h3 className="text-2xl font-black text-slate-800 mb-6 italic">Secure Access</h3>
              <form onSubmit={handleLogin} className="space-y-4">
                <input type="password" placeholder="Password Master" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-center text-lg" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus />
                {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
                <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all font-bold uppercase tracking-widest text-sm">Login</button>
              </form>
            </div>
          ) : <Dashboard />}
        </div>
      </div>
    </>
  );
}
