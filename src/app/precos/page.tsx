"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import { translations, Lang } from "@/lib/i18n";

export default function PrecosPage() {
    const [lang, setLang] = useState<Lang>("pt");

    // Auto-detection and Persistence with Window Check for Vercel Build (SSR)
    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("iz_language_pref");
            if (saved === "pt" || saved === "en") {
                setLang(saved as Lang);
            } else {
                const browserLang = navigator.language.toLowerCase();
                if (browserLang.startsWith("pt")) {
                    setLang("pt");
                } else {
                    setLang("en");
                }
            }
        }
    }, []);

    const handleSetLang = (newLang: Lang) => {
        setLang(newLang);
        if (typeof window !== "undefined") {
            localStorage.setItem("iz_language_pref", newLang);
        }
    };

    const handleCheckout = (planId: string) => {
        console.log("💳 Checkout plan:", planId);
        alert(lang === "pt"
            ? "A redirecionar para o checkout seguro..."
            : "Redirecting to secure checkout..."
        );
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar lang={lang} setLang={handleSetLang} />
            <main className="flex-1 pt-32 pb-24">
                <div className="container-custom">
                    <div className="text-center mb-20 fade-in">
                        <span className="badge badge-primary mb-4">Membership</span>
                        <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
                            {lang === "pt" ? "Expanda o seu Alcance" : "Expand Your Reach"}
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
                            {lang === "pt"
                                ? "Planos desenhados para investidores e agentes globais."
                                : "Plans designed for global investors and agents."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto px-4">
                        {/* Plan 1 */}
                        <div className="bg-white rounded-[2.5rem] shadow-premium p-12 border border-slate-100 flex flex-col hover:-translate-y-2 transition-all duration-500 relative group overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 grad-primary opacity-5 -mr-16 -mt-16 rounded-full group-hover:scale-150 transition-transform" />
                            <div className="mb-10">
                                <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">One-Time</span>
                                <h2 className="text-4xl font-black text-slate-900 mt-2 tracking-tighter italic">Professional AI</h2>
                                <p className="text-slate-500 mt-2 font-medium">Ecosystem Setup & Deployment</p>
                            </div>
                            <div className="mb-10">
                                <span className="text-7xl font-black text-slate-900 tracking-tighter">$997</span>
                            </div>
                            <ul className="space-y-6 mb-12 flex-1">
                                {["AI Chatbot Global", "Lead Automation", "Interactive Maps", "Geo-Intelligence"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-slate-600 font-bold">
                                        <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => handleCheckout("setup")} className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all uppercase tracking-widest text-sm shadow-xl">
                                Start Now
                            </button>
                        </div>

                        {/* Plan 2 */}
                        <div className="grad-primary rounded-[2.5rem] shadow-premium p-12 flex flex-col relative transform md:scale-105 hover:-translate-y-2 transition-all duration-500 border-4 border-white/10 text-white overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 -mr-16 -mt-16 rounded-full group-hover:scale-150 transition-transform" />
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-accent text-white text-[11px] font-black uppercase tracking-[0.2em] px-8 py-2.5 rounded-full shadow-2xl border-2 border-white/20 z-10">
                                Most Popular
                            </div>
                            <div className="mb-10">
                                <span className="text-xs font-black uppercase tracking-[0.2em] text-white/60">Subscription</span>
                                <h2 className="text-4xl font-black text-white mt-2 tracking-tighter italic">Global SaaS Fee</h2>
                                <p className="text-white/80 mt-2 font-medium">Maintenance & Priority Support</p>
                            </div>
                            <div className="mb-10 flex items-baseline gap-2">
                                <span className="text-7xl font-black text-white tracking-tighter">$147</span>
                                <span className="text-white/50 font-black">/mo</span>
                            </div>
                            <ul className="space-y-6 mb-12 flex-1">
                                {["Priority Support", "Security Updates", "Continuous AI Training", "Premium Analytics"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-white font-bold opacity-90">
                                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => handleCheckout("monthly")} className="w-full py-5 bg-white text-primary font-black rounded-2xl hover:bg-slate-50 transition-all uppercase tracking-widest text-sm shadow-2xl">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer lang={lang} />
            <FloatingChat lang={lang} />
        </div>
    );
}
