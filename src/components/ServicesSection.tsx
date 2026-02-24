export default function ServicesSection() {
    const services = [
        {
            title: "Comprar Imóvel",
            description: "Acesso privilegiado a milhares de imóveis em carteira e acompanhamento dedicado até à escritura.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            )
        },
        {
            title: "Vender Imóvel",
            description: "Marketing premium, fotografia profissional e a maior rede de potenciais compradores em Portugal.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            )
        },
        {
            title: "Arrendamento Segurança",
            description: "Processo rigoroso de seleção de inquilinos e garantia de rendas em atraso.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
            )
        },
        {
            title: "Intermediação de Crédito",
            description: "Tratamos de todo o processo de aprovação bancária sem custos adicionais para o cliente.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
            )
        }
    ];

    return (
        <section id="servicos" className="section-pad bg-white border-t border-slate-100">
            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-16 slide-up">
                    <span className="text-sm font-bold text-accent uppercase tracking-wider mb-2 block">
                        Os Nossos Serviços
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
                        Acompanhamento 360° em Todo o Processo
                    </h2>
                    <p className="text-lg text-slate-600">
                        A ImóvelPrime oferece soluções integradas para o mercado imobiliário, garantindo segurança, rapidez e o melhor negócio para os nossos clientes.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((s, i) => (
                        <div
                            key={s.title}
                            className={`p-8 bg-slate-50 border border-slate-100 rounded-lg hover:border-primary transition-all duration-300 group hover:-translate-y-1 reveal visible delay-${(i % 4) + 1}`}
                        >
                            <div className="w-14 h-14 bg-blue-50 text-primary rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                {s.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">{s.title}</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                {s.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Global Agent Banner */}
                <div className="mt-20 bg-primary text-white rounded-xl overflow-hidden flex flex-col md:flex-row relative shadow-xl">
                    <div className="absolute inset-0 bg-primary-dark opacity-20"
                        style={{ backgroundImage: "linear-gradient(45deg, transparent 20%, rgba(255,255,255,0.1) 25%, transparent 30%)", backgroundSize: "100px 100px" }} />

                    <div className="p-10 md:p-12 md:w-2/3 relative z-10">
                        <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                            Junte-se à Marca Número 1
                        </h3>
                        <p className="text-blue-100 mb-8 max-w-lg text-lg">
                            Construa uma carreira de sucesso na ImóvelPrime. Receba formação de elite, acesso à melhor tecnologia do mercado e comissões acima da média.
                        </p>
                        <button className="btn bg-white text-primary hover:bg-slate-50 px-8 py-3 font-bold shadow-sm">
                            Saber mais sobre Carreiras
                        </button>
                    </div>
                    <div className="md:w-1/3 bg-slate-100 relative min-h-[250px] md:min-h-full">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')] bg-cover bg-center" />
                    </div>
                </div>
            </div>
        </section>
    );
}
