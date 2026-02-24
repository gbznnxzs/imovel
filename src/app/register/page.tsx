"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (!supabase) throw new Error("Supabase not configured");
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { full_name: name }
                }
            });
            if (error) throw error;
            setSuccess(true);
            setTimeout(() => router.push("/login"), 3000);
        } catch (err: any) {
            setError(err.message || "Falha no registo");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
            <div className="w-full max-w-md bg-slate-900 rounded-[2.5rem] shadow-2xl p-10 border border-slate-800 slide-up">
                <div className="text-center mb-10">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <span className="text-white font-black text-xl tracking-tighter">IZ</span>
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tighter italic">JOIN THE ELITE</h1>
                    <p className="text-slate-400 text-sm mt-2 font-medium">Start your international investment journey.</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-xs font-bold mb-6 text-center italic">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-xs font-bold mb-6 text-center italic">
                        Conta criada! A redirecionar para o login...
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2 px-1">Full Name</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            placeholder="Gabriel Zeta"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2 px-1">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            placeholder="investor@zetaglobal.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2 px-1">Security Key (Password)</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || success}
                        className="w-full grad-primary py-4 rounded-2xl text-white font-black uppercase tracking-widest text-sm shadow-xl hover:shadow-primary/20 active:scale-95 transition-all disabled:opacity-50"
                    >
                        {loading ? "Registering..." : "Create Account"}
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-slate-500 text-sm font-medium">
                        Já tem conta?{" "}
                        <Link href="/login" className="text-primary font-bold hover:underline">
                            Login aqui
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
