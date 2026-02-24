"use client";

import { useState } from "react";
import { Lang, translations } from "@/lib/i18n";

export default function ContactSection({ lang }: { lang: Lang }) {
    const t = translations[lang].contact;
    const [form, setForm] = useState({ nome: "", email: "", telefone: "", mensagem: "", honeypot: "" });
    const [sent, setSent] = useState(false);
    const [enviando, setEnviando] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.honeypot) return; // Silent discard for bots

        setEnviando(true);
        // Simulate API call
        await new Promise(r => setTimeout(r, 1500));
        setSent(true);
        setEnviando(false);
        setForm({ nome: "", email: "", telefone: "", mensagem: "", honeypot: "" });
    };

    return (
        <section id="contactos" className="section-pad bg-slate-50">
            <div className="container-custom">
                <div className="flex flex-col lg:flex-row gap-16 lg:items-center">

                    {/* Left Column: Info */}
                    <div className="lg:w-2/5">
                        <span className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4 block">
                            {t.preTitle}
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-800 mb-8 leading-tight">
                            {t.title}
                        </h2>
                        <p className="text-lg text-slate-600 mb-12 leading-relaxed">
                            {t.desc}
                        </p>

                        {/* Info Items */}
                        <div className="space-y-10">
                            {[
                                {
                                    icon: <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
                                    label: t.seat,
                                    val: "Av. da Liberdade, 110\n1250-144 Lisboa, Portugal"
                                },
                                {
                                    icon: <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
                                    label: t.support,
                                    val: "910 745 105",
                                    desc: t.workDays
                                }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-5">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-slate-100 shadow-sm flex-shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-lg mb-1">{item.label}</h4>
                                        <p className="text-slate-600 leading-relaxed whitespace-pre-line">{item.val}</p>
                                        {item.desc && <p className="text-xs text-slate-400 mt-1 font-medium">{item.desc}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="lg:w-3/5 bg-white p-8 lg:p-12 rounded-3xl shadow-xl border border-slate-100 transform transition-all hover:shadow-2xl">
                        {sent ? (
                            <div className="text-center py-20 flex flex-col items-center">
                                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-4">{lang === 'pt' ? 'Mensagem enviada!' : 'Message sent!'}</h3>
                                <p className="text-slate-600 mb-8 max-w-sm">
                                    {lang === 'pt'
                                        ? "Obrigado por nos contactar. Um dos nossos consultores irá responder-lhe em menos de 2 horas úteis."
                                        : "Thank you for contacting us. One of our consultants will respond to you within 2 business hours."}
                                </p>
                                <button
                                    onClick={() => setSent(false)}
                                    className="btn btn-outline"
                                >
                                    {lang === 'pt' ? 'Enviar outra mensagem' : 'Send another message'}
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">{t.formName} *</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Ex: João da Silva"
                                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                            value={form.nome}
                                            onChange={(e) => setForm({ ...form, nome: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">{t.formPhone} *</label>
                                        <input
                                            type="tel"
                                            required
                                            placeholder="+351 900 000 000"
                                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                            value={form.telefone}
                                            onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.formEmail} *</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="joao@email.com"
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.formMsg} *</label>
                                    <textarea
                                        rows={4}
                                        required
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none"
                                        value={form.mensagem}
                                        onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                                    ></textarea>
                                </div>

                                {/* Honeypot field (hidden for users) */}
                                <div className="hidden">
                                    <input
                                        type="text"
                                        value={form.honeypot}
                                        onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
                                        tabIndex={-1}
                                        autoComplete="off"
                                    />
                                </div>

                                <div className="flex items-start gap-3">
                                    <input type="checkbox" required className="mt-1 w-4 h-4 text-primary" id="consent" />
                                    <label htmlFor="consent" className="text-sm text-slate-500 leading-relaxed cursor-pointer">
                                        {t.formConsent}
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={enviando}
                                    className="w-full btn btn-primary py-5 text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-70 disabled:cursor-not-allowed group"
                                >
                                    {enviando ? t.sending : (
                                        <span className="flex items-center justify-center gap-2">
                                            {t.btnSend}
                                            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                        </span>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
