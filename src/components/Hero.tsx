"use client";

import React from "react";
import { Lang } from "@/lib/i18n";

export default function Hero({ lang }: { lang: Lang }) {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-white">
            <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-20 items-center">

                {/* Left Side: Elite Messaging */}
                <div className="slide-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full mb-8">
                        <span className="w-2 h-2 bg-[#003DA5] rounded-full animate-pulse" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Institutional Command Console</span>
                    </div>

                    <h1 className="text-[52px] lg:text-[72px] leading-[0.95] font-black text-slate-900 tracking-tight mb-10 italic uppercase">
                        GLOBAL REAL ESTATE.<br />
                        <span className="text-[#003DA5]">INTELLIGENT INVESTMENTS.</span>
                    </h1>

                    <p className="text-slate-500 text-lg lg:text-xl font-medium max-w-xl mb-12 leading-relaxed">
                        AI-Driven Platform for High-Net-worth individuals. <br />
                        <span className="text-slate-900 font-bold">Access off-market opportunities worldwide.</span>
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
                        {[
                            { name: "Lisboa, Portugal", status: "ACTIVE HUB", icon: "L", coords: "25.7323° N, 0.2393° W" },
                            { name: "Dubai, EAU", status: "INVESTMENT", icon: "D", coords: "33.7233° N, 55.2102° E" },
                            { name: "Miami, EUA", status: "PREMIUM", icon: "M", coords: "25.7617° N, 80.1918° W" },
                            { name: "S.Paulo, Brasil", status: "GROWTH", icon: "S", coords: "23.5505° S, 46.6333° W" }
                        ].map((hub, i) => (
                            <div key={i} className="flex items-center justify-between p-6 bg-slate-50/80 rounded-3xl border border-slate-100 hover:border-primary/20 transition-all group/item relative">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#003DA5] flex items-center justify-center text-white text-[10px] font-black group-hover/item:scale-110 transition-transform">
                                        {hub.icon}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-slate-900 text-[13px] font-black tracking-tight">{hub.name}</span>
                                        <div className="flex flex-col mt-1">
                                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Status</span>
                                            <span className="text-[10px] font-black text-[#DC1C2E] uppercase tracking-widest">{hub.status}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <span className="text-[8px] text-slate-300 font-mono tracking-tighter">{hub.coords}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Command Container with World Map Arcs */}
                <div className="relative slide-in-right">
                    <div className="bg-[#050A18] rounded-[3.5rem] p-1 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] relative overflow-hidden group border-[12px] border-slate-900 min-h-[580px]">
                        <div className="absolute inset-0 bg-blue-500/5 opacity-40 mix-blend-overlay" />
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#003DA5]/60 to-transparent animate-scanLine" />

                        <div className="absolute inset-x-0 top-0 h-full p-12 flex flex-col">
                            {/* World Map SVG with Arc Connections */}
                            <div className="flex-1 relative flex items-center justify-center">
                                <svg className="w-full h-full text-slate-700/20" fill="currentColor" viewBox="0 0 1000 500">
                                    <g opacity="0.1" fill="white">
                                        <path d="M100,100 L250,100 L280,300 L120,320 Z" />
                                        <path d="M150,320 L280,300 L250,450 L180,450 Z" />
                                        <path d="M450,80 L550,80 L580,250 L420,250 Z" />
                                        <path d="M480,250 L580,250 L550,420 L450,420 Z" />
                                        <path d="M600,100 L850,100 L880,350 L620,350 Z" />
                                        <path d="M750,350 L850,350 L820,450 L780,450 Z" />
                                    </g>

                                    <path d="M480,180 Q600,120 780,220" fill="none" stroke="#003DA5" strokeWidth="1.5" strokeDasharray="6,4" className="opacity-60" />
                                    <path d="M480,180 Q350,150 220,280" fill="none" stroke="#003DA5" strokeWidth="1.5" strokeDasharray="6,4" className="opacity-60" />
                                    <path d="M480,180 Q520,320 250,400" fill="none" stroke="#003DA5" strokeWidth="1.5" strokeDasharray="6,4" className="opacity-60" />

                                    <circle cx="480" cy="180" r="10" fill="#003DA5" className="animate-pulse" />
                                    <circle cx="480" cy="180" r="4" fill="white" />

                                    <circle cx="780" cy="220" r="6" fill="#FACC15" />
                                    <circle cx="220" cy="280" r="6" fill="#FACC15" />
                                    <circle cx="250" cy="400" r="6" fill="#FACC15" />
                                </svg>
                            </div>

                            <div className="flex justify-between items-end border-t border-white/5 pt-8 mt-auto">
                                <div className="flex flex-col gap-1">
                                    <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div className="w-2/3 h-full bg-[#003DA5] animate-pulse" />
                                    </div>
                                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">ZETA_SYNC_ACTIVE</span>
                                </div>
                                <span className="text-white/20 font-black text-[32px] tracking-tighter italic uppercase select-none">COMMAND_CTR</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scanLine {
                    0% { top: -10%; }
                    100% { top: 110%; }
                }
                .animate-scanLine {
                    animation: scanLine 6s linear infinite;
                }
            `}</style>
        </section>
    );
}
