export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#1E293B] text-slate-300 pt-16 pb-8 border-t-4 border-primary">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Col 1 */}
                    <div>
                        <a href="#" className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 bg-white flex items-center justify-center rounded-sm">
                                <span className="text-primary font-bold text-xl tracking-tighter">IP</span>
                            </div>
                            <div className="flex flex-col text-white">
                                <span className="text-xl font-bold leading-none">Imóvel Zeta</span>
                                <span className="text-[10px] uppercase font-bold text-accent tracking-wider leading-tight">Portugal</span>
                            </div>
                        </a>
                        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                            A marca líder e de maior confiança no setor imobiliário em Portugal. Ajudamos famílias a encontrarem o seu lar ideal há mais de 15 anos.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Placeholders */}
                            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white hover:bg-primary transition-colors cursor-pointer">
                                in
                            </div>
                            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white hover:bg-primary transition-colors cursor-pointer">
                                fb
                            </div>
                            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white hover:bg-accent transition-colors cursor-pointer">
                                ig
                            </div>
                        </div>
                    </div>

                    {/* Col 2 */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Imóveis</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Imóveis em Lisboa</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Imóveis no Porto</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Imóveis no Algarve</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Casas para Arrendar</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Terrenos e Quintas</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Projetos Novos</a></li>
                        </ul>
                    </div>

                    {/* Col 3 */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">A Agência</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">A Nossa História</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Rede de Agentes</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Carreiras e Recrutamento</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Notícias do Mercado</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Investimento Estrangeiro</a></li>
                        </ul>
                    </div>

                    {/* Col 4 */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Contactos</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                Av. da Liberdade, 110<br />1250-144 Lisboa
                            </li>
                            <li className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                910 745 105
                            </li>
                            <li className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                geral@imovel-zeta.pt
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Badges / Certs */}
                <div className="flex flex-wrap items-center justify-center gap-6 py-8 border-t border-slate-700">
                    <div className="text-xs uppercase tracking-widest text-slate-500 font-bold px-4 py-2 bg-slate-800 rounded">
                        Licença AMI 12345
                    </div>
                    <div className="text-xs uppercase tracking-widest text-slate-500 font-bold px-4 py-2 bg-slate-800 rounded">
                        Empresa Certificada NP EN ISO 9001
                    </div>
                    <div className="text-xs uppercase tracking-widest text-slate-500 font-bold px-4 py-2 bg-slate-800 rounded">
                        Livro de Reclamações Eletrónico
                    </div>
                </div>

                {/* Legal */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-700 text-xs text-slate-500 gap-4">
                    <p>© {currentYear} Imóvel Zeta, Lda. Todos os direitos reservados.</p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-white transition-colors">Termos e Condições</a>
                        <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
                        <a href="#" className="hover:text-white transition-colors">Política de Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
