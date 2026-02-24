import { Lang, translations } from "@/lib/i18n";

export default function AboutSection({ lang }: { lang: Lang }) {
    const t = translations[lang].about;

    const stats = [
        { label: "Anos de Experiência", value: "15+" },
        { label: "Consultores Ativos", value: "340" },
        { label: "Agências em PT", value: "45" },
        { label: "Imóveis Vendidos", value: "28k+" },
    ];

    return (
        <section id="sobre-nos" className="section-pad bg-bg-alt border-y border-slate-200">
            <div className="container-custom">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

                    {/* Text Content */}
                    <div className="lg:w-1/2">
                        <span className="text-sm font-bold text-accent uppercase tracking-wider mb-2 block">
                            {t.title}
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6 leading-tight">
                            {lang === 'pt' ? "A Maior Rede Imobiliária Nacional" : "The Largest National Real Estate Network"}
                        </h2>

                        <div className="space-y-4 text-slate-600 mb-8 max-w-xl text-lg">
                            <p>
                                {t.desc}
                            </p>

                            <p>
                                Hoje somos a marca de eleição dos portugueses no momento de vender, comprar ou arrendar casa. O nosso segredo? Profundo conhecimento local aliado a uma rede global de contactos fortíssima.
                            </p>
                        </div>

                        <ul className="mb-10 space-y-3 font-medium text-slate-700">
                            <li className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                O maior portal imobiliário de Portugal
                            </li>
                            <li className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                Acompanhamento jurídico e processual gratuito
                            </li>
                            <li className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                Garantia de venda rápida ao melhor preço de mercado
                            </li>
                        </ul>

                        <button className="btn btn-outline px-8 py-3">
                            Conhecer a nossa História
                        </button>
                    </div>

                    {/* Stats Grid */}
                    <div className="lg:w-1/2 w-full">
                        <div className="grid grid-cols-2 gap-4 sm:gap-6">
                            {stats.map((s) => (
                                <div
                                    key={s.label}
                                    className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-slate-200 text-center flex flex-col items-center justify-center transform transition-transform hover:-translate-y-1"
                                >
                                    <span className="text-4xl sm:text-5xl font-extrabold text-primary mb-2">
                                        {s.value}
                                    </span>
                                    <span className="text-sm sm:text-base font-semibold text-slate-500 uppercase tracking-wide">
                                        {s.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Trust badge */}
                        <div className="mt-6 flex items-center justify-center gap-3 bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                            <span className="text-3xl text-yellow-400">★★★★★</span>
                            <p className="font-semibold text-slate-700">4.9/5 Avaliação Google Reviews</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
