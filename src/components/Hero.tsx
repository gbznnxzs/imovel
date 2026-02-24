"use client";

import React, { useEffect, useState } from "react";
import { Lang, translations } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";

export default function Hero({ lang }: { lang: Lang }) {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        if (supabase) {
            supabase.auth.getSession().then(({ data }: { data: { session: any } }) => {
                setUser(data.session?.user ?? null);
            });
        }
    }, []);

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
                        <span className="text-[#003DA5]">INVESTIMENTOS INTELIGENTES.</span>
                    </h1>

                    <p className="text-slate-500 text-lg lg:text-xl font-medium max-w-xl mb-12 leading-relaxed">
                        Plataforma para investidores institucionais e indivíduos de alto património. <br />
                        <span className="text-slate-900 font-bold">Aceda a oportunidades exclusivas em tempo real.</span>
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

                {/* Right Side: FORCED DARK COMMAND CONTAINER */}
                <div className="relative slide-in-right">
                    <div className="bg-slate-950 rounded-[3.5rem] p-1 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] relative overflow-hidden group border-[12px] border-slate-900 min-h-[580px]">
                        <div className="absolute inset-0 bg-blue-500/5 opacity-40 mix-blend-overlay" />
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#003DA5]/60 to-transparent animate-scanLine" />

                        <div className="absolute inset-x-0 top-0 h-full p-12 flex flex-col justify-center items-center">
                            {/* Command Center Visualization */}
                            <div className="flex-1 relative w-full flex items-center justify-center">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-[300px] h-[300px] border border-[#003DA5]/20 rounded-full animate-ping opacity-20" />
                                    <div className="w-[450px] h-[450px] border border-[#003DA5]/10 rounded-full animate-pulse absolute" />
                                </div>

                                <div className="relative z-10 text-center">
                                    <div className="inline-block px-4 py-1.5 bg-slate-900/80 border border-slate-800 rounded-full mb-6 backdrop-blur-md">
                                        <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">System.Zeta_Active</span>
                                    </div>
                                    <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4 leading-none">
                                        Global Performance<br />
                                        <span className="text-[#003DA5]">Dashboard</span>
                                    </h2>
                                    <p className="text-slate-400 text-xs font-medium max-w-[280px] mx-auto leading-relaxed">
                                        Monitoring high-yield off-market assets across our strategic global hubs.
                                    </p>

                                    <div className="mt-10 flex flex-col items-center gap-4">
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4].map(x => (
                                                <div key={x} className="w-12 h-1 bg-slate-800 rounded-full overflow-hidden">
                                                    <div className="w-full h-full bg-[#003DA5] origin-left animate-pulse" style={{ animationDelay: `${x * 0.2}s` }} />
                                                </div>
                                            ))}
                                        </div>
                                        <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Processing_Global_Data_Streams</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between w-full items-end border-t border-white/5 pt-8 mt-auto">
                                <div className="flex flex-col gap-1">
                                    <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div className="w-2/3 h-full bg-[#003DA5] animate-pulse" />
                                    </div>
                                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">ZETA_SYNC_V3.14</span>
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
