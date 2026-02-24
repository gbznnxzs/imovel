"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Dashboard() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function getSession() {
            if (!supabase) return;
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/login");
            } else {
                setUser(session.user);
            }
            setLoading(false);
        }
        getSession();
    }, [router]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
            <div className="w-10 h-10 border-4 border-[#003DA5] border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar lang="pt" setLang={() => { }} />

            <main className="flex-1 container-custom pt-32 pb-20">
                <div className="slide-up">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">Investidor Dashboard</h1>
                            <p className="text-slate-500 font-medium mt-1">Bem-vindo de volta, {user?.email}</p>
                        </div>
                        <div className="flex gap-4">
                            <button className="bg-slate-950 text-white px-6 py-3 rounded-2xl text-[12px] font-black uppercase tracking-widest shadow-xl">
                                Novo Investimento
                            </button>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Stats Card */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm transition-all hover:shadow-xl group">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Portfólio Ativo</span>
                                <div className="text-4xl font-black text-slate-950 italic">€0.00</div>
                                <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                                    <span className="text-[11px] font-bold text-slate-500 uppercase">Imóveis Guardados</span>
                                    <span className="text-primary font-black">0</span>
                                </div>
                            </div>

                            <div className="bg-slate-950 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-blue-500/10 opacity-50" />
                                <div className="relative z-10 text-white">
                                    <h3 className="text-lg font-black italic uppercase mb-2">Acesso Premium</h3>
                                    <p className="text-slate-400 text-sm mb-6 font-medium">Desbloqueie oportunidades off-market com a Zeta Elite.</p>
                                    <button className="w-full bg-[#003DA5] py-3 rounded-xl text-[10px] font-black uppercase tracking-widest">Upgrade Now</button>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity / Saved Listings */}
                        <div className="lg:col-span-2">
                            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 min-h-[400px] flex flex-col items-center justify-center text-center">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                </div>
                                <h2 className="text-xl font-black text-slate-900 italic uppercase">Nenhum imóvel guardado</h2>
                                <p className="text-slate-500 mt-2 max-w-xs font-medium">Explore as nossas propriedades exclusivas e adicione-as aos seus favoritos.</p>
                                <button
                                    onClick={() => router.push("/")}
                                    className="mt-8 text-primary font-black text-sm uppercase tracking-widest hover:underline"
                                >
                                    Ver Propriedades
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer lang="pt" />
        </div>
    );
}
