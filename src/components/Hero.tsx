import { useState } from "react";
import { Lang, translations } from "@/lib/i18n";

export default function Hero({ lang }: { lang: Lang }) {
    const [tab, setTab] = useState<"comprar" | "arrendar">("comprar");
    const [location, setLocation] = useState("");
    const [type, setType] = useState("");

    const t = translations[lang].hero;

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Scroll to properties section
        document.getElementById("imoveis")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900">
            {/* Background Image Setup */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
                    backgroundPosition: "center 60%"
                }}
            />
            {/* Gradient Overlay for Corporate Look */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "linear-gradient(to right, rgba(0, 61, 165, 0.85), rgba(0, 40, 122, 0.6))"
                }}
            />

            <div className="container-custom relative z-10">
                <div className="max-w-3xl slide-up">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white/30">
                        {t.badge}
                    </span>
                    <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight mb-6 text-balance drop-shadow-lg">
                        {t.title}
                    </h1>
                    <p className="text-lg md:text-xl text-blue-50 mb-10 max-w-2xl text-balance drop-shadow-md">
                        {t.desc}
                    </p>

                    {/* Search Box */}
                    <div className="bg-white rounded-lg shadow-2xl p-2 md:p-3 max-w-4xl">
                        {/* Tabs */}
                        <div className="flex mb-3 border-b border-slate-200">
                            <button
                                className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors ${tab === "comprar" ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-800"
                                    }`}
                                onClick={() => setTab("comprar")}
                            >
                                {t.tabBuy}
                            </button>
                            <button
                                className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors ${tab === "arrendar" ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-800"
                                    }`}
                                onClick={() => setTab("arrendar")}
                            >
                                {t.tabRent}
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 p-2">
                            <div className="flex-1 relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </span>
                                <input
                                    type="text"
                                    placeholder={t.placeholder}
                                    className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium placeholder:font-normal"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>

                            <div className="md:w-48 relative">
                                <select
                                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none font-medium"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option value="">{t.typePlaceholder}</option>
                                    <option value="apartamento">Apartamento</option>
                                    <option value="moradia">Moradia</option>
                                    <option value="terreno">Terreno</option>
                                    <option value="escritorio">Escritório</option>
                                </select>
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                </span>
                            </div>

                            <button type="submit" className="btn btn-accent md:w-32 py-3.5 text-base shadow-md font-bold">
                                {t.searchBtn}
                            </button>
                        </form>
                    </div>

                    {/* Trust indicators */}
                    <div className="mt-8 flex items-center gap-6 text-sm text-blue-100 font-medium">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                            {t.trust1}
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                            {t.trust2}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
