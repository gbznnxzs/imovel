import { Lang, translations } from "@/lib/i18n";

export default function Footer({ lang }: { lang: Lang }) {
    const t = translations[lang].footer;
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-slate-400 py-16">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">IZ</div>
                            <span className="text-2xl font-bold text-white tracking-tight">Imóvel <span className="text-primary">Zeta</span></span>
                        </div>
                        <p className="text-sm leading-relaxed mb-6">
                            {lang === 'pt'
                                ? "Líderes no mercado imobiliário em Portugal. Transformamos a sua jornada de compra ou venda numa experiência premium."
                                : "Leaders in the Portuguese real estate market. We turn your buying or selling journey into a premium experience."}
                        </p>
                    </div>

                    <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div>
                            <h4 className="text-white font-bold mb-6">{lang === 'pt' ? 'Empresa' : 'Company'}</h4>
                            <ul className="space-y-4 text-sm">
                                <li><a href="#hero" className="hover:text-primary transition-colors">{lang === 'pt' ? 'Início' : 'Home'}</a></li>
                                <li><a href="#imoveis" className="hover:text-primary transition-colors">{lang === 'pt' ? 'Imóveis' : 'Properties'}</a></li>
                                <li><a href="#sobre-nos" className="hover:text-primary transition-colors">{lang === 'pt' ? 'Sobre Nós' : 'About Us'}</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6">{lang === 'pt' ? 'Links Úteis' : 'Useful Links'}</h4>
                            <ul className="space-y-4 text-sm">
                                {t.links.map(link => (
                                    <li key={link}><a href="#" className="hover:text-primary transition-colors">{link}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6">Social</h4>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">FB</a>
                                <a href="#" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">IG</a>
                                <a href="#" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">LN</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row gap-8 justify-between items-center text-sm">
                    <p>© {currentYear} Imóvel Zeta. {t.rights}</p>
                    <div className="flex gap-x-8 gap-y-2 text-slate-500 font-medium">
                        {t.links.slice(0, 2).map((link) => (
                            <a key={link} href="#" className="hover:text-primary transition-colors">{link}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
