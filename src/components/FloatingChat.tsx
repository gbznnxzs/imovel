import { useEffect, useState } from "react";
import Chatbot from "./Chatbot";
import { Lang } from "@/lib/i18n";

export default function FloatingChat({ lang }: { lang: Lang }) {
    const [open, setOpen] = useState(false);
    const [notifCount, setNotifCount] = useState(1);
    const [showBalloon, setShowBalloon] = useState(false);

    // Register global opener
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).__openChat = (message?: string) => {
            setOpen(true);
            setNotifCount(0);
            setShowBalloon(false);
            if (message) {
                window.dispatchEvent(new CustomEvent("chat-custom-message", { detail: { message } }));
            }
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return () => { delete (window as any).__openChat; };
    }, []);

    // Proactive Welcome Balloon after 5s
    useEffect(() => {
        const t = setTimeout(() => {
            if (!open) {
                setShowBalloon(true);
                setNotifCount(1);
            }
        }, 5000);
        return () => clearTimeout(t);
    }, [open]);

    const handleOpen = () => {
        setOpen(true);
        setNotifCount(0);
        setShowBalloon(false);
    };

    const t = {
        pt: {
            title: "Zeta AI proativo",
            desc: "Olá! Procura investir em Portugal ou prefere o mercado do Dubai/Brasil?",
            support: "Zeta Global AI",
            location: "Centro de Comando",
            badge: "Online Agora"
        },
        en: {
            title: "Proactive Zeta AI",
            desc: "Hi! Looking to invest in Portugal or prefer the Dubai/Brazil market?",
            support: "Zeta Global AI",
            location: "Command Center",
            badge: "Online Now"
        }
    }[lang];

    return (
        <>
            {/* ── Proactive Welcome Balloon ── */}
            {showBalloon && !open && (
                <div
                    className="fixed bottom-24 right-6 z-40 bg-white p-5 rounded-2xl shadow-premium border border-primary/20 slide-up cursor-pointer max-w-[280px] animate-bounce-subtle"
                    onClick={handleOpen}
                >
                    <button
                        className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 p-1"
                        onClick={(e) => { e.stopPropagation(); setShowBalloon(false); }}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-lg">
                            <span className="font-bold text-xs">AI</span>
                        </div>
                        <p className="font-black text-slate-900 text-sm tracking-tight">{t.title}</p>
                    </div>
                    <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                        "{t.desc}"
                    </p>

                    {/* Arrow pointing down */}
                    <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b border-r border-primary/10 transform rotate-45" />
                </div>
            )}

            {/* ── Main Floating Button ── */}
            <button
                onClick={handleOpen}
                className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-premium active:scale-95 group overflow-hidden"
                style={{
                    background: "var(--color-primary)",
                    display: open ? "none" : "flex",
                }}
                aria-label="Talk to Agent"
            >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <svg className="w-8 h-8 text-white z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                {notifCount > 0 && (
                    <span
                        className="absolute -top-1 -right-1 w-6 h-6 rounded-full text-[11px] font-black flex items-center justify-center bg-accent text-white border-2 border-white animate-pulse"
                    >
                        {notifCount}
                    </span>
                )}
            </button>

            {/* ── Chat Panel ── */}
            {open && (
                <div
                    className="fixed bottom-6 right-6 z-50 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col slide-up"
                    style={{
                        width: "min(400px, calc(100vw - 32px))",
                        height: "min(650px, calc(100vh - 40px))",
                    }}
                >
                    {/* Header bar */}
                    <div className="grad-primary px-6 py-5 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-primary font-black shadow-lg">
                                    AI
                                </div>
                                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-primary animate-pulse" />
                            </div>
                            <div>
                                <p className="text-white font-black text-sm tracking-tight">{t.support}</p>
                                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">{t.location}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setOpen(false)}
                            className="w-9 h-9 rounded-full flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    {/* Status Badge */}
                    <div className="bg-slate-50 px-4 py-2 flex items-center justify-center gap-2 border-b border-slate-100 shrink-0">
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.1em]">{t.badge}</span>
                        </div>
                    </div>

                    {/* Chat Body */}
                    <div className="flex-1 overflow-hidden" style={{ background: "#FAFAFA" }}>
                        <Chatbot compact lang={lang} />
                    </div>
                </div>
            )}
        </>
    );
}
