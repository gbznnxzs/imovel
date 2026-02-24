"use client";

import React from "react";
import { Lang } from "@/lib/i18n";

export default function PropertyMap({ lang }: { lang: Lang }) {
    const locations = [
        { name: "Lisboa, Portugal", coords: "38.7223° N, 9.1393° W", status: "Active" },
        { name: "Dubai, EAU", coords: "25.2048° N, 55.2708° E", status: "Investment Hub" },
        { name: "Miami, EUA", coords: "25.7617° N, 80.1918° W", status: "Premium Area" },
        { name: "Rio, Brasil", coords: "22.9068° S, 43.1729° W", status: "Expansion" }
    ];

    return (
        <section className="section-pad bg-white overflow-hidden">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="slide-up">
                        <span className="badge badge-primary mb-4">{lang === "pt" ? "Presença Global" : "Global Presence"}</span>
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                            {lang === "pt" ? "Conectando Investidores ao Mundo" : "Connecting Investors to the World"}
                        </h2>
                        <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                            {lang === "pt"
                                ? "A nossa rede estende-se pelos mercados mais dinâmicos do planeta. Do charme histórico de Lisboa ao luxo futurista do Dubai."
                                : "Our network spans the most dynamic markets on the planet. From the historical charm of Lisbon to the futuristic luxury of Dubai."}
                        </p>

                        <div className="space-y-4">
                            {locations.map((loc, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/30 transition-colors group">
                                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                                        {loc.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-800">{loc.name}</h4>
                                        <p className="text-xs text-slate-400 font-mono">{loc.coords}</p>
                                    </div>
                                    <span className="text-[10px] font-black uppercase text-accent tracking-widest">{loc.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative slide-in-right">
                        {/* Interactive Map Visual (Stylized SVG or Placeholder) */}
                        <div className="aspect-square bg-slate-100 rounded-[2rem] border border-slate-200 shadow-premium flex items-center justify-center overflow-hidden relative group">
                            <div className="absolute inset-0 grad-primary opacity-5 group-hover:opacity-10 transition-opacity" />

                            {/* SVG World Map Element */}
                            <svg className="w-4/5 h-4/5 text-slate-300 opacity-60" fill="currentColor" viewBox="0 0 1000 600">
                                <path d="M... World map paths would be huge... simplified placeholder" />
                                <circle cx="450" cy="200" r="12" className="text-primary animate-pulse" />
                                <circle cx="800" cy="300" r="10" className="text-accent animate-pulse" />
                                <circle cx="200" cy="450" r="8" className="text-primary animate-pulse" />
                                <circle cx="350" cy="500" r="10" className="text-accent animate-pulse" />
                            </svg>

                            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                                <span className="bg-white/80 backdrop-blur-md border border-white p-4 rounded-2xl shadow-xl text-primary font-black text-xl uppercase tracking-tighter italic">
                                    {lang === "pt" ? "Mapa Interativo Zeta" : "Zeta Interactive Map"}
                                </span>
                                <p className="mt-4 text-slate-500 text-sm font-medium">
                                    {lang === "pt" ? "Selecione uma região para ver imóveis disponíveis" : "Select a region to view available properties"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
