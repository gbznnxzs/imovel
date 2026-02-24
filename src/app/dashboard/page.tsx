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
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white font-black uppercase tracking-[0.3em]">
            SYNCING COMMAND CENTER...
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar lang="pt" setLang={() => { }} />
            <main className="flex-1 pt-32 pb-24 container-custom">
                <div className="grid lg:grid-cols-4 gap-10">

                    {/* Sidebar / Stats */}
                    <aside className="lg:col-span-1 space-y-6">
                        <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 grad-primary opacity-20 -mr-12 -mt-12 rounded-full" />
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Authenticated Account</p>
                            <h2 className="text-2xl font-black tracking-tight mb-4 italic truncate">{user?.email}</h2>
                            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Tier</span>
                                <span className="text-xs font-black text-accent uppercase tracking-widest">Global Elite</span>
                            </div>
                        </div>

                        <nav className="flex flex-col gap-2">
                            {["Portfolio", "Saved Hubs", "AI Analytics", "Account Settings"].map((item) => (
                                <button key={item} className="flex items-center gap-4 px-6 py-4 rounded-2xl hover:bg-white hover:shadow-premium transition-all text-sm font-bold text-slate-600 hover:text-primary group">
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-primary transition-colors" />
                                    {item}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* Main Feed */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="fade-in">
                            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter mb-4 italic uppercase">Command Dashboard</h1>
                            <p className="text-slate-500 font-medium">Welcome back, {user?.user_metadata?.full_name || 'Agent'}. Monitoring your real estate ecosystem.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { label: "Saved Listings", val: "12", unit: "Prop" },
                                { label: "ROI Potential", val: "8.4", unit: "%" },
                                { label: "AI Consults", val: "47", unit: "Msg" }
                            ].map((stat, i) => (
                                <div key={i} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-premium group hover:border-primary/20 transition-all">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-black text-slate-900 tracking-tighter italic">{stat.val}</span>
                                        <span className="text-xs font-black text-primary uppercase">{stat.unit}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Recent Activity Mock */}
                        <div className="bg-white rounded-[2rem] p-10 shadow-premium border border-slate-100 min-h-[400px]">
                            <h3 className="text-xl font-black text-slate-800 italic uppercase mb-8">AI Property Matcher</h3>
                            <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
                                <div className="w-16 h-16 rounded-full border-4 border-slate-100 border-t-primary animate-spin mb-6" />
                                <p className="font-bold text-slate-500">Analyzing global markets for your profile...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer lang="pt" />
        </div>
    );
}
