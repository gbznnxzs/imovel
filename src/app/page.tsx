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

export default function Home() {
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
    </>
  );
}
