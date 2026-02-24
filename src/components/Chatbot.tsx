"use client";

import { useState, useRef, useEffect } from "react";

function validarTelemovel(valor: string, lang: "pt" | "en"): { valido: boolean; erro: string; normalizado: string } {
    let limpo = valor.replace(/[\s\-\.]/g, "");

    // For PT numbers
    if (lang === "pt") {
        if (limpo.startsWith("00351")) limpo = limpo.slice(5);
        else if (limpo.startsWith("+351")) limpo = limpo.slice(4);
        else if (limpo.startsWith("351") && limpo.length > 9) limpo = limpo.slice(3);

        if (!/^\d{9,15}$/.test(limpo))
            return { valido: false, erro: "Número inválido.", normalizado: "" };

        return { valido: true, erro: "", normalizado: `+351 ${limpo}` };
    }

    // Global/EN numbers - more permissive for now
    if (!/^\+?\d{7,15}$/.test(limpo))
        return { valido: false, erro: "Invalid phone number.", normalizado: "" };

    return { valido: true, erro: "", normalizado: limpo.startsWith("+") ? limpo : `+${limpo}` };
}

type Lang = "pt" | "en";

const translations = {
    pt: {
        welcome: "Olá! Sou o **Assistente IA da Imóvel Zeta**.",
        intro: "Estou aqui para ajudar a encontrar o seu imóvel ideal ou vender a sua propriedade com rapidez e segurança. Qual é o seu **nome completo**?",
        nameError: "Introduza um nome válido.",
        requestPhone: (nome: string) => `Obrigado, **${nome}**. Qual o seu **número de telemóvel**?`,
        phoneError: "Por favor insira um telemóvel válido.",
        confirmData: "Confirma os seus dados?",
        confirmBtn: "✅ Confirmar",
        editNameBtn: "✏ Alterar Nome",
        editPhoneBtn: "📱 Alterar Telemóvel",
        confirmedData: "✅ Dados Confirmados",
        serviceRequest: "Excelente! Para que serviço nos contacta?",
        services: ["🏠 Comprar Imóvel", "🔑 Arrendar", "💰 Vender Imóvel"],
        geographicArea: "Qual a **zona geográfica** de interesse principal?",
        areas: ["Lisboa", "Porto", "Algarve", "Outra zona"],
        dynamicMarket: (cidade: string) => `Excelente escolha! O mercado em **${cidade}** está muito dinâmico e temos oportunidades exclusivas.`,
        budgetRequest: "Por favor, selecione o seu intervalo de **orçamento** para lhe enviarmos as melhores opções antes de irem para o portal:",
        budgets: ["Até 150.000 €", "150k – 300k €", "300k – 600k €", "Acima de 600k €"],
        registering: "A registar contacto... Aguarde por favor.",
        success: (zona: string, telemovel: string) => `✅ **Informação registada.**\nUm consultor especializado da zona de **${zona}** irá ligar-lhe dentro de minutos para o número ${telemovel}.`,
        error: "⚠️ Ocorreu uma falha no sistema. Ligue-nos para o 910 745 105.",
        placeholder: "Escreva a sua mensagem...",
        finished: "Conversa finalizada.",
        startBtn: "Nova Conversa",
        preTitle: "Inicie uma conversa",
        preDesc: "Estamos prontos para ajudar a encontrar a sua casa ou a vender o seu imóvel.",
        rgpd: "Ao iniciar pressupõe-se a aceitação da nossa Política de Privacidade.",
        correcting: "Sem problema, vamos retificar! Qual é o dado correto?",
        langSwitch: "Detectamos que prefere Inglês. Vamos continuar em Inglês!",
    },
    en: {
        welcome: "Hello! I am the **Imóvel Zeta AI Assistant**.",
        intro: "I'm here to help you find your ideal property or sell your property quickly and securely. What is your **full name**?",
        nameError: "Please enter a valid name.",
        requestPhone: (nome: string) => `Thank you, **${nome}**. What is your **phone number** (with country code)?`,
        phoneError: "Please enter a valid phone number.",
        confirmData: "Confirm your details?",
        confirmBtn: "✅ Confirm",
        editNameBtn: "✏ Change Name",
        editPhoneBtn: "📱 Change Phone",
        confirmedData: "✅ Details Confirmed",
        serviceRequest: "Excellent! Which service are you interested in?",
        services: ["🏠 Buy Property", "🔑 Rent", "💰 Sell Property"],
        geographicArea: "What is your main **geographic area** of interest?",
        areas: ["Lisbon", "Porto", "Algarve", "Other area"],
        dynamicMarket: (cidade: string) => `Excellent choice! The market in **${cidade}** is very dynamic and we have exclusive opportunities.`,
        budgetRequest: "Please select your **budget** range so we can send you the best options before they go to the portal:",
        budgets: ["Up to $150,000", "$150k – $300k", "$300k – $600k", "Above $600k"],
        registering: "Registering contact... Please wait.",
        success: (zona: string, telemovel: string) => `✅ **Information registered.**\nA specialized consultant from **${zona}** will call you within minutes at ${telemovel}.`,
        error: "⚠️ A system failure occurred. Please call us at +351 910 745 105.",
        placeholder: "Type your message...",
        finished: "Conversation finished.",
        startBtn: "New Conversation",
        preTitle: "Start a conversation",
        preDesc: "We are ready to help you find your home or sell your property.",
        rgpd: "By starting you accept our Privacy Policy.",
        correcting: "No problem, let's fix that! What is the correct information?",
        langSwitch: "Detectamos que prefere Português. Vamos continuar em Português!",
    }
};

interface Msg { id: string; role: "bot" | "user"; text: string; options?: string[]; }
type Etapa = "rgpd" | "nome" | "telemovel" | "confirm_data" | "tipo" | "zona" | "orcamento" | "done";

export default function Chatbot({ compact = false, lang: propLang }: { compact?: boolean, lang?: Lang }) {
    const [iniciado, setIniciado] = useState(false);
    const [msgs, setMsgs] = useState<Msg[]>([]);
    const [input, setInput] = useState("");
    const [etapa, setEtapa] = useState<Etapa>("rgpd");
    const [typing, setTyping] = useState(false);
    const [lead, setLead] = useState<Record<string, string | boolean>>({});
    const [erro, setErro] = useState("");
    const [enviando, setEnviando] = useState(false);
    const [lang, setLang] = useState<Lang>(propLang || "pt");

    // Sync from prop if it changes
    useEffect(() => {
        if (propLang) setLang(propLang);
    }, [propLang]);

    const t = translations[lang];

    // Listen for global custom message events
    useEffect(() => {
        const handleCustomMsg = (e: any) => {
            if (e.detail?.message) {
                setMsgs([]);
                setIniciado(true);
                addBot(e.detail.message, undefined, 400);
                setEtapa("nome");
            }
        };
        window.addEventListener("chat-custom-message", handleCustomMsg);
        return () => window.removeEventListener("chat-custom-message", handleCustomMsg);
    }, []);

    // Resilience (LocalStorage)
    useEffect(() => {
        try {
            const saved = localStorage.getItem("ip_bot_mem");
            if (saved) {
                const st = JSON.parse(saved);
                if (st.etapa !== "done") {
                    setIniciado(st.iniciado);
                    setMsgs(st.msgs);
                    setEtapa(st.etapa);
                    setLead(st.lead);
                    if (st.lang) setLang(st.lang);
                }
            }
        } catch { }
    }, []);

    useEffect(() => {
        if (iniciado && etapa !== "done") {
            localStorage.setItem("ip_bot_mem", JSON.stringify({ iniciado, msgs, etapa, lead, lang }));
        } else if (etapa === "done") {
            localStorage.removeItem("ip_bot_mem");
        }
    }, [iniciado, msgs, etapa, lead, lang]);

    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [msgs, typing]);

    const addBot = (text: string, options?: string[], delay = 800) =>
        new Promise<void>((res) => {
            setTyping(true);
            setTimeout(() => {
                setTyping(false);
                setMsgs((p) => [...p, { id: crypto.randomUUID(), role: "bot", text, options }]);
                res();
            }, delay);
        });

    const addUser = (text: string) =>
        setMsgs((p) => [...p, { id: crypto.randomUUID(), role: "user", text }]);

    const start = async () => {
        setIniciado(true);
        setLead({ consentimentoRGPD: true });
        await addBot(t.welcome, undefined, 400);
        await addBot(t.intro, undefined, 800);
        setEtapa("nome");
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const detectLanguage = (text: string) => {
        const enKeywords = ["hello", "hi", "hey", "good morning", "good afternoon", "want to buy", "looking for", "help"];
        const lowText = text.toLowerCase();
        if (lang === "pt" && enKeywords.some(kw => lowText.includes(kw))) {
            return "en";
        }
        return lang;
    };

    const process = async (resposta: string) => {
        setErro("");
        if (typing || enviando) return;

        // Auto-detect language
        const detected = detectLanguage(resposta);
        if (detected !== lang) {
            setLang(detected);
            // After changing language, we should probably acknowledge it or just continue in that lang
            // For now, let's just update the local 't' by letting the state settle or using translations[detected]
        }
        const activeT = translations[detected];

        if (etapa === "nome") {
            const low = resposta.toLowerCase();
            const correctionKeywords = ["errei", "corrigir", "espera", "mistake", "wrong", "fix"];
            if (correctionKeywords.some(kw => low.includes(kw))) {
                addUser(resposta);
                await addBot(activeT.correcting);
                return;
            }

            if (resposta.trim().length < 2) { setErro(activeT.nameError); return; }
            addUser(resposta);
            setLead((p) => ({ ...p, nome: resposta }));
            await addBot(activeT.requestPhone(resposta.split(" ")[0]));
            setEtapa("telemovel");

        } else if (etapa === "telemovel") {
            const low = resposta.toLowerCase();
            const correctionKeywords = ["errei", "corrigir", "espera", "mistake", "wrong", "fix"];
            if (correctionKeywords.some(kw => low.includes(kw))) {
                addUser(resposta);
                await addBot(activeT.correcting);
                setEtapa("nome");
                return;
            }

            const r = validarTelemovel(resposta, detected);
            if (!r.valido) { setErro(activeT.phoneError); return; }
            addUser(r.normalizado);
            setLead((p) => ({ ...p, telemovel: r.normalizado }));
            await addBot(activeT.confirmData + `\n\n**${detected === 'pt' ? 'Nome' : 'Name'}:** ${lead.nome}\n**${detected === 'pt' ? 'Telemóvel' : 'Phone'}:** ${r.normalizado}`, [activeT.confirmBtn, activeT.editNameBtn, activeT.editPhoneBtn]);
            setEtapa("confirm_data");

        } else if (etapa === "confirm_data") {
            if (resposta.includes(activeT.editNameBtn.slice(2))) {
                addUser(activeT.editNameBtn);
                await addBot(activeT.intro.split(". ").pop()!);
                setEtapa("nome");
            } else if (resposta.includes(activeT.editPhoneBtn.slice(2))) {
                addUser(activeT.editPhoneBtn);
                await addBot(activeT.requestPhone(String(lead.nome).split(" ")[0]));
                setEtapa("telemovel");
            } else {
                addUser(activeT.confirmedData);
                await addBot(activeT.serviceRequest, activeT.services);
                setEtapa("tipo");
            }

        } else if (etapa === "tipo") {
            addUser(resposta);
            setLead((p) => ({ ...p, tipoNegocio: resposta.replace(/^[^\s]+ /, "") }));
            await addBot(activeT.geographicArea, activeT.areas);
            setEtapa("zona");

        } else if (etapa === "zona") {
            addUser(resposta);
            setLead((p) => ({ ...p, zona: resposta }));
            await addBot(activeT.dynamicMarket(resposta));
            await addBot(activeT.budgetRequest, activeT.budgets);
            setEtapa("orcamento");

        } else if (etapa === "orcamento") {
            addUser(resposta);
            setEnviando(true);
            const leadFinal = { ...lead, orcamento: resposta, timestampISO: new Date().toISOString(), lang: detected };
            setLead(leadFinal);

            await addBot(activeT.registering, undefined, 500);
            try {
                const res = await fetch("/api/leads", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(leadFinal),
                });
                if (!res.ok) throw new Error();
                await addBot(activeT.success(String(lead.zona), String(lead.telemovel)));
                setEtapa("done");
            } catch {
                await addBot(activeT.error);
            } finally {
                setEnviando(false);
            }
        }
        setInput("");
    };

    const showOptions = !["nome", "telemovel", "done"].includes(etapa) && msgs[msgs.length - 1]?.options && !typing;

    if (!iniciado) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-6 bg-white">
                <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{t.preTitle}</h3>
                <p className="text-center text-sm text-slate-500 mb-6">{t.preDesc}</p>
                <button onClick={start} className="btn btn-primary w-full shadow-md">
                    {t.startBtn}
                </button>
                <p className="text-[10px] text-slate-400 text-center mt-6">
                    {t.rgpd}
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-[#FAFAFA]">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {msgs.map((m) => (
                    <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                        {m.role === "bot" && (
                            <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center font-bold text-[10px] text-slate-500 shrink-0 mr-2 mt-1">
                                IP
                            </div>
                        )}
                        <div
                            className={`max-w-[85%] px-4 py-2.5 text-sm ${m.role === "bot"
                                ? "bg-white border text-slate-700 border-slate-200 rounded-2xl rounded-tl-sm shadow-sm"
                                : "bg-primary text-white rounded-2xl rounded-tr-sm shadow-sm"
                                }`}
                        >
                            {m.text.split(/(\*\*[^*]+\*\*)/).map((p, i) =>
                                p.startsWith("**") && p.endsWith("**") ? <strong key={i}>{p.slice(2, -2)}</strong> : <span key={i}>{p}</span>
                            )}
                        </div>
                    </div>
                ))}
                {typing && (
                    <div className="flex justify-start">
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center font-bold text-[10px] text-slate-500 shrink-0 mr-2 mt-1">IP</div>
                        <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center shadow-sm">
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        </div>
                    </div>
                )}
                {showOptions && msgs[msgs.length - 1]?.options && (
                    <div className="flex flex-wrap gap-2 pl-8 pt-1">
                        {msgs[msgs.length - 1].options!.map((o) => (
                            <button
                                key={o}
                                onClick={() => process(o)}
                                className="px-3 py-1.5 bg-white border border-primary text-primary text-xs font-semibold rounded-full hover:bg-primary hover:text-white transition-colors"
                            >
                                {o}
                            </button>
                        ))}
                    </div>
                )}
                <div ref={bottomRef} className="h-2" />
            </div>

            <div className="p-3 bg-white border-t border-slate-200 shrink-0">
                {erro && <p className="text-xs text-accent font-semibold mb-2 ml-1">⚠ {erro}</p>}
                {etapa === "done" ? (
                    <p className="text-xs text-center py-2 font-medium text-slate-500">{t.finished}</p>
                ) : (
                    <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); if (input.trim()) process(input.trim()); }}>
                        <input
                            ref={inputRef}
                            type="text"
                            className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            placeholder={t.placeholder}
                            value={input}
                            onChange={(e) => { setInput(e.target.value); setErro(""); }}
                            disabled={typing || enviando || !!showOptions}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || typing || enviando || !!showOptions}
                            className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shrink-0 disabled:opacity-50 disabled:bg-slate-300"
                        >
                            {enviando ? <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
