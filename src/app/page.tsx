"use client";

import React, { useState, useEffect } from "react";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [lang, setLang] = useState<"pt" | "en">("pt"); // Default to PT initially

  // Auto-detection and Persistence
  useEffect(() => {
    const saved = localStorage.getItem("iz_language_pref");
    if (saved === "pt" || saved === "en") {
      setLang(saved);
    } else {
      // Browser detection
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("pt")) {
        setLang("pt");
      } else {
        setLang("en");
      }
    }
  }, []);

  const handleSetLang = (newLang: "pt" | "en") => {
    setLang(newLang);
    localStorage.setItem("iz_language_pref", newLang);
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
      <PropertiesSection lang={lang} />
      <ServicesSection lang={lang} />
      <AboutSection lang={lang} />
      <ContactSection lang={lang} />
      <Footer lang={lang} />
      <FloatingChat lang={lang} />

      {/* Dashboard Intranet Embutido (Overlay) com Proteção */}
      <div
        id="dashboard-layer"
        className="fixed inset-0 z-[100] bg-slate-900 overflow-y-auto"
        style={{ display: "none" }}
      >
        <div className="bg-slate-800 border-b border-slate-700 py-4 px-6 fixed top-0 w-full z-10 flex justify-between items-center shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold text-white text-xs">
              IZ
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
              // Reset auth state on close for security
              setIsAuthenticated(false);
              setPassword("");
              setError("");
            }}
          >
            Sair da Área
          </button>
        </div>

        <div className="pt-24 pb-12 max-w-[1400px] mx-auto px-6 flex items-center justify-center min-h-screen">
          {!isAuthenticated ? (
            <div className="bg-white p-8 rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md text-center">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Acesso Restrito</h3>
              <p className="text-slate-500 text-sm mb-8">Introduza a sua credencial de agente para aceder à base de dados global de leads.</p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="Introduza a Password Master"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-center text-lg shadow-inner"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    autoFocus
                  />
                </div>
                {error && <p className="text-red-500 text-xs font-semibold">{error}</p>}
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-4 rounded-xl shadow-lg hover:shadow-xl transition-all font-bold uppercase tracking-wider"
                >
                  Entrar no Painel
                </button>
              </form>
              <p className="mt-8 text-[10px] text-slate-400 uppercase tracking-widest font-bold">Zeta Web Security v4.2.0</p>
            </div>
          ) : (
            <Dashboard />
          )}
        </div>
      </div>
    </>
  );
}
