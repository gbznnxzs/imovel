"use client";

import { useState } from "react";

export default function ContactSection() {
    const [form, setForm] = useState({ nome: "", email: "", telefone: "", mensagem: "", honeypot: "" });
    const [sent, setSent] = useState(false);
    const [enviando, setEnviando] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Anti-Bot Honeypot validation
        if (form.honeypot) {
            setSent(true);
            return;
        }

        setEnviando(true);
        // Simular chamada de API/Backend
        await new Promise((r) => setTimeout(r, 1000));

        setEnviando(false);
        setSent(true);
        setForm({ nome: "", email: "", telefone: "", mensagem: "", honeypot: "" });
        setTimeout(() => setSent(false), 5000);
    };

    return (
        <section id="contacto" className="section-pad bg-white border-t border-slate-200">
            <div className="container-custom">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* Contact Info */}
                    <div className="lg:w-1/3">
                        <span className="text-sm font-bold text-accent uppercase tracking-wider mb-2 block">
                            Fale Connosco
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6">
                            Estamos aqui para si.
                        </h2>
                        <p className="text-slate-600 mb-10 text-lg">
                            Quer pretenda comprar, vender ou apenas aconselhar-se sobre o mercado imobiliário em Portugal, a nossa equipa está pronta para ajudar.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-50 text-primary rounded-full flex items-center justify-center shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-1">Sede Nacional</h4>
                                    <p className="text-slate-600 text-sm">Av. da Liberdade, 110<br />1250-144 Lisboa, Portugal</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-50 text-primary rounded-full flex items-center justify-center shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-1">Linha de Apoio</h4>
                                    <p className="text-slate-600 text-sm font-medium">+351 210 000 000</p>
                                    <p className="text-slate-500 text-xs mt-1">Dias úteis das 9h às 19h</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-50 text-primary rounded-full flex items-center justify-center shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-1">E-mail Comercial</h4>
                                    <p className="text-slate-600 text-sm font-medium">contacto@imovelprime.pt</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:w-2/3">
                        <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-slate-200">
                            {sent ? (
                                <div className="text-center py-16 slide-up">
                                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Mensagem Enviada!</h3>
                                    <p className="text-slate-600 mb-8">Recebemos o seu contacto e um consultor irá ligar-lhe dentro de algumas horas.</p>
                                    <button className="btn btn-outline" onClick={() => setSent(false)}>
                                        Enviar Nova Mensagem
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6 slide-up">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="nome" className="input-label">Nome Completo *</label>
                                            <input
                                                id="nome"
                                                type="text"
                                                required
                                                className="input-field"
                                                placeholder="Ex: João da Silva"
                                                value={form.nome}
                                                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                                                disabled={enviando}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="telefone" className="input-label">Telemóvel *</label>
                                            <input
                                                id="telefone"
                                                type="tel"
                                                required
                                                className="input-field"
                                                placeholder="+351 900 000 000"
                                                value={form.telefone}
                                                onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                                                disabled={enviando}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="input-label">E-mail *</label>
                                        <input
                                            id="email"
                                            type="email"
                                            required
                                            className="input-field"
                                            placeholder="joao@email.com"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            disabled={enviando}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="mensagem" className="input-label">Motivo do Contacto</label>
                                        <textarea
                                            id="mensagem"
                                            rows={4}
                                            className="input-field resize-none"
                                            placeholder="Descreva brevemente como podemos ajudar..."
                                            value={form.mensagem}
                                            onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                                            disabled={enviando}
                                        />
                                    </div>

                                    {/* Honeypot field - Hidden from real users but bots will fill it */}
                                    <div className="hidden absolute opacity-0 -z-50" aria-hidden="true">
                                        <label htmlFor="website">Website</label>
                                        <input
                                            id="website"
                                            type="url"
                                            tabIndex={-1}
                                            autoComplete="off"
                                            value={form.honeypot}
                                            onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
                                        />
                                    </div>

                                    <div className="flex items-start gap-3 mt-4">
                                        <input type="checkbox" id="rgpd" required className="mt-1 h-4 w-4 text-primary rounded border-slate-300 focus:ring-primary" disabled={enviando} />
                                        <label htmlFor="rgpd" className="text-xs text-slate-500 leading-relaxed cursor-pointer hover:text-slate-700 transition-colors">
                                            Ao submeter este formulário, concordo que a ImóvelPrime armazene e processe os dados pessoais fornecidos de acordo com a Política de Privacidade (Regime Geral de Proteção de Dados EU 2016/679).
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={enviando}
                                        className="btn btn-primary w-full md:w-auto px-10 py-3.5 text-lg shadow-md hover:shadow-lg mt-4 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {enviando ? (
                                            <>
                                                <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                                                A Processar...
                                            </>
                                        ) : "Enviar Mensagem"}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
