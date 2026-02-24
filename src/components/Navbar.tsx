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
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
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
        { label: t.arrendar, href: "/#imoveis" },
        { label: t.servicos, href: "/#servicos" },
        { label: t.precos, href: "/precos" },
        { label: t.sobre, href: "/#sobre-nos" },
        { label: t.contactos, href: "/#contacto" },
    ];

    const UserMenu = () => (
        <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-bold text-slate-700 hover:text-primary transition-all uppercase tracking-widest">
                Dashboard
            </Link>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-200 group relative cursor-pointer">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold uppercase">
                    {user?.email?.charAt(0) || "U"}
                </div>
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest hidden sm:inline">{user?.email?.split('@')[0]}</span>
                <button onClick={handleLogout} className="text-[9px] font-black text-accent uppercase tracking-tighter hover:underline px-2">
                    Sair
                </button>
            </div>
        </div>
    );

    const LangSelector = () => (
        <div className="flex items-center gap-2 mr-4">
            <button
                onClick={() => setLang("pt")}
                className={`w-6 h-6 flex items-center justify-center rounded-full transition-all ${lang === 'pt' ? 'ring-2 ring-primary ring-offset-2 scale-110' : 'opacity-50 hover:opacity-100'}`}
                title="Português"
            >
                🇵🇹
            </button>
            <button
                onClick={() => setLang("en")}
                className={`w-6 h-6 flex items-center justify-center rounded-full transition-all ${lang === 'en' ? 'ring-2 ring-primary ring-offset-2 scale-110' : 'opacity-50 hover:opacity-100'}`}
                title="English"
            >
                🇺🇸
            </button>
        </div>
    );

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-3" : "bg-white/95 backdrop-blur-sm py-4 border-b border-slate-200"
                    }`}
            >
                <div className="container-custom flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-sm transition-transform group-hover:scale-105">
                            <span className="text-white font-bold text-xl tracking-tighter">IZ</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-slate-800 leading-none">Imóvel Zeta</span>
                            <span className="text-[10px] uppercase font-bold text-accent tracking-wider leading-tight">{t.local}</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-8">
                        <ul className="flex items-center gap-6">
                            {menuItems.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="flex items-center border-l border-slate-200 pl-6 gap-6">
                            <LangSelector />
                            {user ? <UserMenu /> : (
                                <div className="flex items-center gap-4">
                                    <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-primary border-2 border-slate-100 px-5 py-2 rounded-xl transition-all">
                                        Login
                                    </Link>
                                    <Link href="/precos" className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-primary-dark transition-all shadow-lg active:scale-95">
                                        Contact Sales
                                    </Link>
                                </div>
                            )}
                        </div>
                    </nav>

                    {/* Mobile Lang Selector + Toggle */}
                    <div className="flex items-center lg:hidden gap-4">
                        <LangSelector />
                        <button
                            className="p-2 text-slate-600 focus:outline-none"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Drawer */}
            <div
                className={`fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setMobileMenuOpen(false)}
            >
                <div
                    className={`absolute right-0 top-0 bottom-0 w-[280px] bg-white shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                        <span className="font-bold text-slate-800">Menu</span>
                        <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto py-4 px-4 flex flex-col gap-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="block px-4 py-3 rounded text-slate-700 font-medium hover:bg-slate-50 hover:text-primary transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <hr className="my-2 border-slate-100" />

                        {user ? (
                            <div className="px-4 py-3 border border-slate-100 rounded-xl bg-slate-50">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">User</span>
                                <div className="text-sm font-bold text-slate-900 mb-4">{user.email}</div>
                                <button onClick={handleLogout} className="w-full text-left text-xs font-black text-accent uppercase tracking-widest">Logout</button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <Link href="/login" className="block px-4 py-3 rounded text-slate-700 font-bold hover:bg-slate-50" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                                <Link href="/precos" className="block px-4 py-3 rounded bg-primary text-white font-bold text-center" onClick={() => setMobileMenuOpen(false)}>Contact Sales</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
