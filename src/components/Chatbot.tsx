"use client";

import { useState, useRef, useEffect } from "react";
import { Lang } from "@/lib/i18n";
import { useGeoLocation } from "@/lib/useGeoLocation";

// Utility for phone validation
function validatePhone(val: string, lang: Lang): { valid: boolean; normalized: string } {
    let clean = val.replace(/[\s\-\.]/g, "");
    if (lang === "pt") {
        if (clean.startsWith("00351")) clean = clean.slice(5);
        else if (clean.startsWith("+351")) clean = clean.slice(4);
        if (!/^\d{9}$/.test(clean)) return { valid: false, normalized: "" };
        return { valid: true, normalized: `+351 ${clean}` };
    }
    if (!/^\+?\d{7,15}$/.test(clean)) return { valid: false, normalized: "" };
    return { valid: true, normalized: clean.startsWith("+") ? clean : `+${clean}` };
}

const botTranslations = {
    pt: {
        ai_name: "Zeta AI",
        welcome: "Olá! Sou o **Zeta AI**, o seu assistente inteligente na Imóvel Zeta. Como posso tornar a sua jornada imobiliária mais simples hoje?",
        geo_greet: (city: string, country: string) => `Vejo que está em **${city}, ${country}**. Interessa-lhe ver opções locais ou está à procura de investimento internacional (Dubai/Portugal)?`,
        placeholder: "Pergunte-me qualquer coisa...",
        typing: "Zeta AI está a analisar...",
        error_phone: "Ups, esse número não parece correto. Pode validar?",
        success_lead: "Perfeito! Já encaminhei os seus dados para o nosso consultor mais próximo. Receberá um contacto em breve.",
        identity_prompt: "Antes de continuarmos, como gostaria que o tratasse?",
        contact_prompt: (name: string) => `Prazer em conhecê-lo, **${name}**! Para que possamos enviar-lhe as melhores oportunidades, qual é o seu melhor contacto telefónico?`,
        fallback: "Posso ajudá-lo a encontrar, vender ou avaliar um imóvel agora mesmo. Qual o seu interesse?",
        privacy: "A nossa conversa é segura e segue o RGPD.",
    },
    en: {
        ai_name: "Zeta AI",
        welcome: "Hello! I am **Zeta AI**, your intelligent assistant at Imóvel Zeta. How can I make your real estate journey easier today?",
        geo_greet: (city: string, country: string) => `I see you are in **${city}, ${country}**. Are you interested in local options or looking for international investment (Dubai/Portugal)?`,
        placeholder: "Ask me anything...",
        typing: "Zeta AI is analyzing...",
        error_phone: "Oops, that number doesn't look right. Could you check it?",
        success_lead: "Perfect! I've sent your details to our nearest consultant. You'll be contacted shortly.",
        identity_prompt: "Before we continue, how should I address you?",
        contact_prompt: (name: string) => `Nice to meet you, **${name}**! To send you the best opportunities, what's your best phone contact?`,
        fallback: "I can help you find, sell or value a property right now. What are you interested in?",
        privacy: "Our conversation is secure and GDPR-compliant.",
    }
};

interface Msg { id: string; role: "bot" | "user"; text: string; options?: string[]; }

export default function Chatbot({ lang: propLang, compact = false }: { lang?: Lang, compact?: boolean }) {
    const { geo, loading: loadingGeo } = useGeoLocation();
    const [msgs, setMsgs] = useState<Msg[]>([]);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const [lang, setLang] = useState<Lang>(propLang || "pt");
    const [context, setContext] = useState({
        name: "",
        phone: "",
        intent: "",
        step: "welcome"
    });

    const t = botTranslations[lang];
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (propLang) setLang(propLang);
    }, [propLang]);

    useEffect(() => {
        if (msgs.length === 0 && !loadingGeo) {
            initChat();
        }
    }, [loadingGeo]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [msgs, typing]);

    const initChat = async () => {
        setTyping(true);
        await new Promise(r => setTimeout(r, 800));
        setTyping(false);
        setMsgs([
            { id: "1", role: "bot", text: t.welcome },
            { id: "2", role: "bot", text: t.geo_greet(geo.city, geo.country) }
        ]);
    };

    const addMessage = (role: "bot" | "user", text: string, options?: string[]) => {
        setMsgs(p => [...p, { id: crypto.randomUUID(), role, text, options }]);
    };

    const handleSend = async (val: string) => {
        if (!val.trim() || typing) return;

        const userMsg = val.trim();
        setInput("");
        addMessage("user", userMsg);
        setTyping(true);

        await new Promise(r => setTimeout(r, 1200));
        setTyping(false);

        let responseText = "";
        let newStep = context.step;
        let newName = context.name;
        let newPhone = context.phone;

        if (context.step === "welcome") {
            responseText = t.identity_prompt;
            newStep = "name";
        } else if (context.step === "name") {
            newName = userMsg;
            responseText = t.contact_prompt(newName);
            newStep = "phone";
        } else if (context.step === "phone") {
            const v = validatePhone(userMsg, lang);
            if (!v.valid) {
                responseText = t.error_phone;
            } else {
                newPhone = v.normalized;
                responseText = t.success_lead;
                newStep = "fluid";
                // Trigger lead capture
                fetch("/api/leads", {
                    method: "POST",
                    body: JSON.stringify({ name: newName, phone: newPhone, origin: geo.country, lang })
                }).catch(() => { });
            }
        } else {
            responseText = t.fallback;
        }

        setContext({ ...context, step: newStep, name: newName, phone: newPhone });
        addMessage("bot", responseText);
    };

    return (
        <div className="flex flex-col h-full bg-slate-50 overflow-hidden relative">
            <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between glass z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full grad-primary flex items-center justify-center text-white text-xs font-bold animate-pulse-soft">AI</div>
                    <div>
                        <h3 className="font-bold text-slate-800 text-sm">{t.ai_name}</h3>
                        <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-[10px] text-slate-400 font-bold uppercase">Online • {geo.country_code}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {msgs.map((m) => (
                    <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} slide-up`}>
                        <div className={`group relative max-w-[85%] px-4 py-3 rounded-2xl text-sm shadow-premium ${m.role === "user" ? "bg-primary text-white rounded-tr-sm" : "bg-white text-slate-700 border border-slate-100 rounded-tl-sm"
                            }`}>
                            <p className="leading-relaxed">
                                {m.text.split(/(\*\*[^*]+\*\*)/).map((p, i) =>
                                    p.startsWith("**") && p.endsWith("**") ? <strong key={i} className="font-extrabold">{p.slice(2, -2)}</strong> : <span key={i}>{p}</span>
                                )}
                            </p>
                        </div>
                    </div>
                ))}
                {typing && (
                    <div className="flex justify-start slide-up">
                        <div className="bg-white border border-slate-100 px-5 py-4 rounded-2xl rounded-tl-sm shadow-premium flex gap-1.5 items-center">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                        </div>
                    </div>
                )}
                <div ref={bottomRef} className="h-4" />
            </div>

            <div className="p-4 bg-white border-t border-slate-100 glass">
                <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="flex gap-2 relative">
                    <input
                        type="text"
                        placeholder={t.placeholder}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-full pl-5 pr-12 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={typing}
                    />
                    <button type="submit" disabled={!input.trim() || typing} className="absolute right-1 top-1 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-md">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </button>
                </form>
            </div>
        </div>
    );
}
