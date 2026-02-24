"use client";

import React, { useEffect, useState } from "react";
import { Lang } from "@/lib/i18n";
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

                {/* Left Side: Command Title */}
                <div className="slide-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full mb-8">
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Institutional Access</span>
                    </div>

                    <h1 className="text-[60px] lg:text-[100px] leading-[0.85] font-black text-slate-900 tracking-[-0.05em] mb-10 italic uppercase">
                        Global <br />
                        <span className="text-primary">Real Estate.</span> <br />
                        Intelligent <br />
                        Investments.
                    </h1>

                    <p className="text-slate-500 text-xl lg:text-2xl font-medium max-w-xl mb-12 leading-tight">
                        Curated portfolios for <span className="text-slate-900 font-black italic">High-Net-Worth Individuals</span> and institutional partners.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button className="bg-slate-900 text-white px-10 py-5 rounded-2xl text-[14px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/20 active:scale-95">
                            {user ? "Enter Command Center" : "Initialize Account"}
                        </button>
                        <button className="border-2 border-slate-100 text-slate-400 px-10 py-5 rounded-2xl text-[14px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                            View Global Hubs
                        </button>
                    </div>
                </div>

                {/* Right Side: Command Container */}
                <div className="relative slide-in-right">
                    <div className="bg-slate-950 rounded-[3rem] p-12 border-8 border-slate-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden group min-h-[500px]">
                        <div className="absolute inset-0 bg-blue-500/5 opacity-40 mix-blend-overlay" />
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />

                        <div className="relative z-10 flex justify-between items-center mb-16 border-b border-white/5 pb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-primary animate-pulse flex items-center justify-center font-black text-white text-[10px]">IZ</div>
                                <span className="text-white/40 text-[10px] uppercase font-black tracking-[0.3em]">Global Hub Status</span>
                            </div>
                            <div className="text-green-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                                Live Feed Alpha
                            </div>
                        </div>

                        <div className="space-y-6">
                            {[
                                { name: "LISBOA, PORTUGAL", status: "ACTIVE HUB", icon: "PT" },
                                { name: "DUBAI, UAE", status: "INVESTMENT", icon: "DXB" },
                                { name: "MIAMI, USA", status: "PREMIUM", icon: "MIA" },
                                { name: "S.PAULO, BRAZIL", status: "GROWTH", icon: "SPL" }
                            ].map((hub, i) => (
                                <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 transition-all group/item cursor-crosshair">
                                    <div className="flex items-center gap-5">
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-[10px] font-black group-hover/item:bg-primary transition-colors">
                                            {hub.icon}
                                        </div>
                                        <span className="text-white text-sm font-black tracking-tight">{hub.name}</span>
                                    </div>
                                    <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-white/10 ${i % 2 === 0 ? 'text-primary' : 'text-accent'}`}>{hub.status}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 text-right">
                            <span className="text-white/10 font-black text-[40px] tracking-tighter italic uppercase select-none">Command_CTR</span>
                        </div>
                    </div>

                    {/* Background Decorative Element */}
                    <div className="absolute -z-10 -bottom-20 -right-20 w-[400px] h-[400px] grad-primary opacity-10 rounded-full blur-[100px]" />
                </div>
            </div>


        </section>
    );
}
