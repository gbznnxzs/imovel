"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (!supabase) throw new Error("Supabase not configured");
            const { error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { full_name: fullName }
                }
            });
            if (authError) throw authError;
            alert("Check your email for confirmation!");
            router.push("/login");
        } catch (err: any) {
            setError(err.message || "Failed to register");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-white p-6">
            <div className="w-full max-w-md bg-slate-950 rounded-[2.5rem] shadow-2xl p-10 border border-slate-900 slide-up">
                <div className="text-center mb-10">
                    <div className="w-12 h-12 bg-[#003DA5] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <span className="text-white font-black text-xl tracking-tighter">IZ</span>
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tighter italic uppercase">Create Account</h1>
                    <p className="text-slate-400 text-sm mt-2 font-medium">Join the Global Elite.</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-xs font-bold mb-6 text-center italic">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2 px-1">Full Name</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#003DA5]/20 transition-all"
                            placeholder="John Doe"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2 px-1">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#003DA5]/20 transition-all"
                            placeholder="investor@zetaglobal.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2 px-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#003DA5]/20 transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#003DA5] py-4 rounded-2xl text-white font-black uppercase tracking-widest text-sm shadow-xl hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50"
                    >
                        {loading ? "CREATING ACCOUNT..." : "REGISTER"}
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-slate-500 text-sm font-medium">
                        Already have an account?{" "}
                        <Link href="/login" className="text-[#003DA5] font-bold hover:underline">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
