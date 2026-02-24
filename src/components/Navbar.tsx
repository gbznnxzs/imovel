"use client";

import { useState, useEffect } from "react";
import { Lang, translations } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Navbar({ lang, setLang }: { lang: Lang, setLang: (l: Lang) => void }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll, { passive: true });

        // Listen for auth changes
        if (supabase) {
            supabase.auth.getSession().then(({ data }: { data: { session: any } }) => {
                setUser(data.session?.user ?? null);
            });
            const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
                setUser(session?.user ?? null);
            });
            return () => {
                window.removeEventListener("scroll", handleScroll);
                subscription.unsubscribe();
            };
        }
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = async () => {
        if (supabase) {
            await supabase.auth.signOut();
            window.location.href = "/";
        }
    };

    const t = translations[lang].navbar;

    const menuItems = [
        { label: t.comprar, href: "/#imoveis" },
        { label: t.servicos, href: "/#servicos" },
        { label: t.precos, href: "/precos" },
        { label: t.sobre, href: "/#sobre-nos" },
    ];

    const LangSelector = () => (
        <div className="flex items-center gap-2 mr-6">
            <button
                onClick={() => setLang("pt")}
                className={`text-[11px] font-black transition-all ${lang === 'pt' ? 'text-primary' : 'text-slate-400 opacity-50'}`}
            >
                PT
            </button>
            <span className="text-slate-200 text-[10px]">|</span>
            <button
                onClick={() => setLang("en")}
                className={`text-[11px] font-black transition-all ${lang === 'en' ? 'text-primary' : 'text-slate-400 opacity-50'}`}
            >
                EN
            </button>
        </div>
    );

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-lg py-3" : "bg-white/95 backdrop-blur-md py-5 border-b border-slate-100"}`}>
                <div className="container-custom flex items-center justify-between">
                    {/* Logo */}
                    <a href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-xl transition-transform group-hover:rotate-12 shadow-lg">
                            <span className="text-white font-black text-xl tracking-tighter italic">Z</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-black text-slate-900 leading-none tracking-tighter italic uppercase">Zeta Global</span>
                            <span className="text-[9px] uppercase font-black text-accent tracking-[0.2em] leading-tight">Command Center</span>
                        </div>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-10">
                        <ul className="flex items-center gap-8">
                            {menuItems.map((item) => (
                                <li key={item.label}>
                                    <a href={item.href} className="text-[13px] font-black text-slate-500 hover:text-primary transition-colors uppercase tracking-widest">{item.label}</a>
                                </li>
                            ))}
                        </ul>

                        <div className="flex items-center border-l border-slate-100 pl-10 gap-6">
                            <LangSelector />

                            {user ? (
                                <div className="flex items-center gap-6">
                                    <Link href="/dashboard" className="text-[13px] font-black text-primary uppercase tracking-widest hover:opacity-80 transition-all">Command Console</Link>
                                    <button onClick={handleLogout} className="text-[13px] font-black text-slate-400 uppercase tracking-widest hover:text-red-500 transition-colors">Logout</button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <Link href="/login" className="text-[13px] font-black text-slate-900 uppercase tracking-widest hover:text-primary transition-colors">Access Level 1</Link>
                                    <button className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl text-[12px] font-black uppercase tracking-[0.15em] hover:bg-slate-800 transition-all shadow-xl active:scale-95">Contact Sales</button>
                                </div>
                            )}
                        </div>
                    </nav>

                    {/* Mobile Toggle */}
                    <div className="flex items-center lg:hidden gap-4">
                        <button className="p-2 text-slate-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xl transition-all duration-300 lg:hidden ${mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setMobileMenuOpen(false)}>
                <div className={`absolute right-0 top-0 bottom-0 w-[300px] bg-white shadow-2xl transition-transform duration-500 ease-soft ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`} onClick={(e) => e.stopPropagation()}>
                    <div className="p-10 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-12">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-black text-white italic">Z</div>
                            <span className="font-black text-slate-900 uppercase italic tracking-tighter">ZETA CENTER</span>
                        </div>
                        <div className="flex-1 flex flex-col gap-6">
                            {menuItems.map((item) => (
                                <a key={item.label} href={item.href} className="text-lg font-black text-slate-800 uppercase italic tracking-tight" onClick={() => setMobileMenuOpen(false)}>{item.label}</a>
                            ))}
                        </div>
                        <div className="pt-10 border-t border-slate-100 space-y-4">
                            {user ? (
                                <Link href="/dashboard" className="block w-full text-center bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl" onClick={() => setMobileMenuOpen(false)}>My Account</Link>
                            ) : (
                                <>
                                    <Link href="/login" className="block w-full text-center border-2 border-slate-900 text-slate-900 py-4 rounded-2xl font-black uppercase tracking-widest text-sm" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                                    <button className="block w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl">Contact Sales</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
