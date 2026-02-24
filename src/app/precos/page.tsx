"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";

export default function PrecosPage() {
    const handleCheckout = (planId: string) => {
        console.log("💳 Iniciando checkout para o plano:", planId);
        // Em produção, aqui redirecionaria para o Stripe Checkout:
        // window.location.href = `https://checkout.stripe.com/pay/${planId}`;
        alert("Obrigado pelo seu interesse! Redirecionando para o Gateway de Pagamento Seguro (Stripe)...");
    };

    return (
        <>
            <Navbar />
            <main className="flex-1 bg-slate-50 pt-32 pb-24">
                <div className="container-custom">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">Escolha o seu Plano</h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Potencialize os seus resultados com a nossa tecnologia de ponta e suporte especializado.
                        </p>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

                        {/* Plan 1: Setup IA */}
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 flex flex-col hover:border-primary transition-all hover:shadow-2xl">
                            <div className="mb-6">
                                <span className="bg-blue-100 text-primary text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">One-Time Payment</span>
                                <h2 className="text-2xl font-bold text-slate-800 mt-4">Professional AI Setup</h2>
                                <p className="text-slate-500 mt-2">Complete configuration of your real estate ecosystem.</p>
                            </div>
                            <div className="mb-8">
                                <span className="text-5xl font-black text-slate-800">$997</span>
                            </div>
                            <ul className="space-y-4 mb-10 flex-1">
                                {[
                                    "Supabase Integration",
                                    "Custom AI Chatbot",
                                    "Real-time Lead Automation",
                                    "Premium Responsive Design",
                                    "Conversion Optimization"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-600">
                                        <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                        <span className="text-sm font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => handleCheckout("price_setup_ia")}
                                className="w-full py-4 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-900 transition-colors shadow-lg"
                            >
                                Get Started
                            </button>
                        </div>

                        {/* Plan 2: Suporte Mensal */}
                        <div className="bg-white rounded-2xl shadow-xl border-2 border-primary p-8 flex flex-col relative transform md:scale-105 hover:shadow-2xl transition-all">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                                Recommended
                            </div>
                            <div className="mb-6">
                                <span className="bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">Subscription</span>
                                <h2 className="text-2xl font-bold text-slate-800 mt-4">Global SaaS Fee</h2>
                                <p className="text-slate-500 mt-2">Continuous maintenance and monthly AI updates.</p>
                            </div>
                            <div className="mb-8 flex items-baseline gap-1">
                                <span className="text-5xl font-black text-slate-800">$147</span>
                                <span className="text-slate-500 font-bold">/month</span>
                            </div>
                            <ul className="space-y-4 mb-10 flex-1">
                                {[
                                    "Priority Technical Support",
                                    "Security Updates",
                                    "Continuous Bot Improvements",
                                    "Performance Analytics",
                                    "Managed Hosting Included"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-600">
                                        <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                        <span className="text-sm font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => handleCheckout("price_monthly_support")}
                                className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-lg"
                            >
                                Subscribe Now
                            </button>
                        </div>

                    </div>

                    {/* Security Disclaimer */}
                    <div className="mt-16 text-center text-slate-400 text-xs flex items-center justify-center gap-4">
                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 4.908-3.067 9.126-7.403 10.796a.75.75 0 01-.594 0C5.633 16.126 2.566 11.908 2.566 7.001c0-.682.057-1.35.166-2.001zm11.53 3.28a.75.75 0 00-1.06-1.06L9 10.94 7.53 9.47a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l4-4z" clipRule="evenodd" /></svg>
                            Secure Payment
                        </div>
                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg>
                            Connects to Stripe
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            <FloatingChat />
        </>
    );
}
