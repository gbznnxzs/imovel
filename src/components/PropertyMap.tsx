"use client";

import React from "react";
import { Lang } from "@/lib/i18n";

export default function PropertyMap({ lang }: { lang: Lang }) {
    const locations = [
        { name: "Lisboa, Portugal", coords: "38.7223° N, 9.1393° W", status: "Active Hub", x: "42%", y: "42%" },
        { name: "Dubai, EAU", coords: "25.2048° N, 55.2708° E", status: "Investment", x: "62%", y: "48%" },
        { name: "Miami, EUA", coords: "25.7617° N, 80.1918° W", status: "Premium", x: "28%", y: "45%" },
        { name: "S.Paulo, Brasil", coords: "23.5505° S, 46.6333° W", status: "Growth", x: "32%", y: "75%" }
    ];

    return (
        <section className="section-pad bg-white overflow-hidden">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div className="slide-up">
                        <span className="badge badge-primary mb-5 uppercase tracking-[0.2em] font-black">{lang === "pt" ? "Centro de Comando" : "Command Center"}</span>
                        <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-8 tracking-tighter italic">
                            {lang === "pt" ? "O Mundo ao seu Alcance" : "The World at Your Reach"}
                        </h2>
                        <p className="text-slate-500 text-lg mb-10 leading-relaxed font-medium">
                            {lang === "pt"
                                ? "Monitorizamos em tempo real os mercados mais lucrativos. A nossa rede global garante acesso exclusivo a ativos 'off-market'."
                                : "We monitor the most profitable markets in real-time. Our global network ensures exclusive access to off-market assets."}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {locations.map((loc, i) => (
                                <div key={i} className="flex flex-col p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-primary/30 transition-all group hover:bg-white hover:shadow-premium">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-black group-hover:scale-110 transition-transform">
                                            {loc.name.charAt(0)}
                                        </div>
                                        <h4 className="font-black text-slate-800 tracking-tight">{loc.name}</h4>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Status</p>
                                            <span className="text-[11px] font-black uppercase text-accent tracking-widest">{loc.status}</span>
                                        </div>
                                        <p className="text-[9px] text-slate-300 font-mono">{loc.coords}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative slide-in-right">
                        {/* Interactive Global Visualizer */}
                        <div className="aspect-square bg-slate-950 rounded-[3rem] p-1 shadow-2xl overflow-hidden relative group border-8 border-slate-900">
                            <div className="absolute inset-0 bg-[#0a0f1d] overflow-hidden">
                                {/* Grid lines for command center feel */}
                                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

                                {/* Pulse Markers on a Stylized Map Background */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg className="w-4/5 h-4/5 text-blue-500/20" fill="currentColor" viewBox="0 0 1000 600">
                                        <path d="M150,150 L850,150 L850,450 L150,450 Z" className="opacity-0" /> {/* Layout Area */}
                                        {/* Simplistic stylized continents */}
                                        <rect x="200" y="200" width="150" height="200" rx="40" className="opacity-10" />
                                        <rect x="400" y="100" width="100" height="150" rx="30" className="opacity-10" />
                                        <rect x="600" y="250" width="180" height="180" rx="50" className="opacity-10" />
                                    </svg>
                                </div>

                                {/* Pulse Points */}
                                {locations.map((loc, i) => (
                                    <div key={i} className="absolute" style={{ left: loc.x, top: loc.y }}>
                                        <div className="relative flex items-center justify-center">
                                            <span className="absolute inline-flex h-12 w-12 rounded-full bg-primary opacity-20 animate-ping" />
                                            <span className="relative inline-flex rounded-full h-4 w-4 bg-primary shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                                            <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-2 py-1 rounded border border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-[9px] font-black text-white uppercase tracking-tighter">{loc.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Scanning Line Effect */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent animate-scan" style={{ top: 'var(--scan-pos)' }} />
                            </div>

                            {/* Decorative Tech Overlay */}
                            <div className="absolute bottom-10 left-10 right-10 flex justify-between items-center pointer-events-none">
                                <div className="flex flex-col gap-1">
                                    <div className="w-16 h-1 bg-primary/30 rounded-full overflow-hidden">
                                        <div className="w-2/3 h-full bg-primary animate-pulse" />
                                    </div>
                                    <span className="text-[10px] font-mono text-primary/60">ZETA_LINK_ACTIVE</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-[24px] font-black text-white tracking-tighter italic opacity-40">COMMAND_CTR</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scan {
                    0% { top: 0%; }
                    100% { top: 100%; }
                }
                .animate-scan {
                    animation: scan 4s linear infinite;
                }
            `}</style>
        </section>
    );
}
