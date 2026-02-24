import { Lang, translations } from "@/lib/i18n";

export default function ServicesSection({ lang }: { lang: Lang }) {
    const t = translations[lang].services;

    // Define icons locally
    const serviceIcons = [
        <svg key="0" className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
        <svg key="1" className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        <svg key="2" className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
    ];

    return (
        <section id="servicos" className="section-pad bg-white">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <span className="text-accent font-bold uppercase tracking-wider text-sm mb-2 block">Premium Experience</span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-800">{t.title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {t.list.map((service, i) => (
                        <div key={i} className="flex flex-col items-center text-center p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl transition-all group">
                            <div className="mb-6 transform transition-transform group-hover:scale-110">
                                {serviceIcons[i]}
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-4">{service.title}</h3>
                            <p className="text-slate-600 leading-relaxed">
                                {service.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
