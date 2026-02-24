import { useState, useEffect } from "react";
import { Lang, translations } from "@/lib/i18n";

export default function Navbar({ lang, setLang }: { lang: Lang, setLang: (l: Lang) => void }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const t = translations[lang].navbar;

    const menuItems = [
        { label: t.comprar, href: "/#imoveis" },
        { label: t.arrendar, href: "/#imoveis" },
        { label: t.servicos, href: "/#servicos" },
        { label: t.precos, href: "/precos" },
        { label: t.sobre, href: "/#sobre-nos" },
        { label: t.contactos, href: "/#contacto" },
    ];

    const LangSelector = () => (
        <div className="flex items-center gap-2 mr-4 text-[11px] font-black uppercase tracking-widest text-slate-400">
            <button
                onClick={() => setLang("pt")}
                className={`transition-all ${lang === 'pt' ? 'text-[#003DA5]' : 'hover:text-slate-800'}`}
            >
                PS
            </button>
            <span className="opacity-20 text-slate-300">|</span>
            <button
                onClick={() => setLang("en")}
                className={`transition-all ${lang === 'en' ? 'text-[#003DA5]' : 'hover:text-slate-800'}`}
            >
                US
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
                    <a href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-sm transition-transform group-hover:scale-105">
                            <span className="text-white font-bold text-xl tracking-tighter">IZ</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-slate-800 leading-none">Imóvel Zeta</span>
                            <span className="text-[10px] uppercase font-bold text-accent tracking-wider leading-tight">{t.local}</span>
                        </div>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-8">
                        <ul className="flex items-center gap-6">
                            {menuItems.map((item) => (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="flex items-center border-l border-slate-200 pl-6 gap-6">
                            <LangSelector />
                            <div className="flex items-center gap-6">
                                <button className="text-[13px] font-black text-slate-500 hover:text-primary transition-colors uppercase tracking-widest whitespace-nowrap">
                                    Login / Signup
                                </button>
                                <button className="bg-[#003DA5] text-white px-8 py-3.5 rounded-2xl text-[12px] font-black uppercase tracking-[0.15em] hover:bg-slate-800 transition-all shadow-xl active:scale-95 whitespace-nowrap">
                                    Contact Sales
                                </button>
                            </div>
                        </div>
                    </nav>

                    {/* Mobile Lang Selector + Toggle */}
                    <div className="flex items-center lg:hidden">
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
                            <a
                                key={item.label}
                                href={item.href}
                                className="block px-4 py-3 rounded text-slate-700 font-medium hover:bg-slate-50 hover:text-primary transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.label}
                            </a>
                        ))}
                        <hr className="my-2 border-slate-100" />
                    </div>

                    <div className="p-4 border-t border-slate-100">
                        <button
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            onClick={() => { setMobileMenuOpen(false); (window as any).__openChat?.(); }}
                            className="btn w-full bg-accent text-white hover:bg-accent-dark"
                        >
                            {t.falarAgente}
                        </button>
                        <p className="text-center text-xs text-slate-500 mt-3">{t.ligue} 910 745 105</p>
                    </div>
                </div>
            </div>
        </>
    );
}
