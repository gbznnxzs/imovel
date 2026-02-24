"use client";

import { useEffect, useState } from "react";
import Chatbot from "./Chatbot";

export default function FloatingChat() {
    const [open, setOpen] = useState(false);
    const [notifCount, setNotifCount] = useState(1);
    const [showBalloon, setShowBalloon] = useState(false);

    // Register global opener
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).__openChat = () => {
            setOpen(true);
            setNotifCount(0);
            setShowBalloon(false);
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return () => { delete (window as any).__openChat; };
    }, []);

    // Show welcome balloon after 5s
    useEffect(() => {
        const t = setTimeout(() => {
            if (!open) setShowBalloon(true);
        }, 5000);
        return () => clearTimeout(t);
    }, [open]);

    const handleOpen = () => {
        setOpen(true);
        setNotifCount(0);
        setShowBalloon(false);
    };

    return (
        <>
            {/* ── Welcome Balloon ── */}
            {showBalloon && !open && (
                <div
                    className="fixed bottom-24 right-6 z-40 bg-white p-4 rounded-lg shadow-xl border border-slate-200 slide-up cursor-pointer max-w-[250px]"
                    onClick={handleOpen}
                >
                    <button
                        className="absolute top-2 right-2 text-slate-400 hover:text-slate-600"
                        onClick={(e) => { e.stopPropagation(); setShowBalloon(false); }}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-primary flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                        </div>
                        <p className="font-bold text-slate-800 text-sm">Precisa de ajuda?</p>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">Fale com um consultor agora. Respondemos em menos de 2 minutos.</p>

                    {/* Arrow pointing down */}
                    <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b border-r border-slate-200 transform rotate-45" />
                </div>
            )}

            {/* ── Floating button ── */}
            <button
                onClick={handleOpen}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-transform hover:scale-105 shadow-lg"
                style={{
                    background: "var(--color-primary)",
                    display: open ? "none" : "flex",
                }}
                aria-label="Falar com Agente"
            >
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                {notifCount > 0 && (
                    <span
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center bg-accent text-white"
                    >
                        {notifCount}
                    </span>
                )}
            </button>

            {/* ── Chat panel ── */}
            {open && (
                <div
                    className="fixed bottom-6 right-6 z-50 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col slide-up"
                    style={{
                        width: "min(380px, calc(100vw - 32px))",
                        height: "min(600px, calc(100vh - 40px))",
                    }}
                >
                    {/* Header bar */}
                    <div className="bg-primary px-5 py-4 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary font-bold shadow-sm">
                                    IP
                                </div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-primary" />
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm">Apoio ao Cliente</p>
                                <p className="text-blue-200 text-xs">Imóvel Zeta Portugal</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setOpen(false)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    {/* Banner message */}
                    <div className="bg-blue-50 px-4 py-2 flex items-center justify-center gap-2 border-b border-blue-100 shrink-0">
                        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                        <span className="text-xs font-semibold text-primary">Normalmente responde em 2 min</span>
                    </div>

                    {/* Chat body */}
                    <div className="flex-1 overflow-hidden" style={{ background: "#FAFAFA" }}>
                        <Chatbot compact />
                    </div>
                </div>
            )}
        </>
    );
}
