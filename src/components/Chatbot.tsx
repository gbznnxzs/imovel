"use client";

import { useState, useRef, useEffect } from "react";

function validarTelemovel(valor: string): { valido: boolean; erro: string; normalizado: string } {
    let limpo = valor.replace(/[\s\-\.]/g, "");
    if (limpo.startsWith("00351")) limpo = limpo.slice(5);
    else if (limpo.startsWith("+351")) limpo = limpo.slice(4);
    else if (limpo.startsWith("351") && limpo.length > 9) limpo = limpo.slice(3);

    if (!/^\d{9}$/.test(limpo))
        return { valido: false, erro: "O número deve ter 9 dígitos.", normalizado: "" };

    const p2 = parseInt(limpo.slice(0, 2));
    const p3 = parseInt(limpo.slice(0, 3));
    if ([900, 800, 808, 116, 707, 700].includes(p3))
        return { valido: false, erro: "Por favor insira um telemóvel válido.", normalizado: "" };
    if (![91, 92, 93, 96].includes(p2) && !(p2 >= 21 && p2 <= 29))
        return { valido: false, erro: "Prefixo não reconhecido em PT.", normalizado: "" };

    return { valido: true, erro: "", normalizado: `+351 ${limpo.slice(0, 3)} ${limpo.slice(3, 6)} ${limpo.slice(6)}` };
}

interface Msg { id: string; role: "bot" | "user"; text: string; options?: string[]; }
type Etapa = "rgpd" | "nome" | "telemovel" | "tipo" | "zona" | "orcamento" | "done";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Chatbot({ compact = false }: { compact?: boolean }) {
    const [iniciado, setIniciado] = useState(false);
    const [msgs, setMsgs] = useState<Msg[]>([]);
    const [input, setInput] = useState("");
    const [etapa, setEtapa] = useState<Etapa>("rgpd");
    const [typing, setTyping] = useState(false);
    const [lead, setLead] = useState<Record<string, string | boolean>>({});
    const [erro, setErro] = useState("");
    const [enviando, setEnviando] = useState(false);

    // ── Resiliência (LocalStorage) ──
    useEffect(() => {
        try {
            const saved = localStorage.getItem("ip_bot_mem");
            if (saved) {
                const st = JSON.parse(saved);
                if (st.etapa !== "done") {
                    setIniciado(st.iniciado); setMsgs(st.msgs);
                    setEtapa(st.etapa); setLead(st.lead);
                }
            }
        } catch { }
    }, []);

    useEffect(() => {
        if (iniciado && etapa !== "done") {
            localStorage.setItem("ip_bot_mem", JSON.stringify({ iniciado, msgs, etapa, lead }));
        } else if (etapa === "done") {
            localStorage.removeItem("ip_bot_mem");
        }
    }, [iniciado, msgs, etapa, lead]);

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
        await addBot("Olá! Bem-vindo ao atendimento da **ImóvelPrime**.", undefined, 400);
        await addBot("Antes de passar a um agente, preciso de alguns dados. Qual é o seu **nome completo**?", undefined, 800);
        setEtapa("nome");
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const process = async (resposta: string) => {
        setErro("");
        if (typing || enviando) return;

        if (etapa === "nome") {
            if (resposta.trim().length < 2) { setErro("Introduza um nome válido."); return; }
            addUser(resposta);
            setLead((p) => ({ ...p, nome: resposta }));
            await addBot(`Obrigado, **${resposta.split(" ")[0]}**. Qual o seu **número de telemóvel**?`);
            setEtapa("telemovel");

        } else if (etapa === "telemovel") {
            const r = validarTelemovel(resposta);
            if (!r.valido) { setErro(r.erro); return; }
            addUser(r.normalizado);
            setLead((p) => ({ ...p, telemovel: r.normalizado }));
            await addBot("Para que serviço nos contacta?", ["🏠 Comprar Imóvel", "🔑 Arrendar", "💰 Vender Imóvel"]);
            setEtapa("tipo");

        } else if (etapa === "tipo") {
            addUser(resposta);
            setLead((p) => ({ ...p, tipoNegocio: resposta.replace(/^[^\s]+ /, "") }));
            await addBot("Qual a **zona geográfica** de interesse principal?", ["Lisboa", "Porto", "Algarve", "Outra zona"]);
            setEtapa("zona");

        } else if (etapa === "zona") {
            addUser(resposta);
            setLead((p) => ({ ...p, zona: resposta }));
            await addBot("Por fim, selecione o seu intervalo de **orçamento**:", ["Até 150.000 €", "150k – 300k €", "300k – 600k €", "Acima de 600k €"]);
            setEtapa("orcamento");

        } else if (etapa === "orcamento") {
            addUser(resposta);
            setEnviando(true);
            const orcamento = resposta;
            const leadFinal = { ...lead, orcamento, timestampISO: new Date().toISOString() };
            setLead(leadFinal);

            await addBot("A registar contacto... Aguarde por favor.", undefined, 500);
            try {
                const res = await fetch("/api/leads", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(leadFinal),
                });
                if (!res.ok) throw new Error();
                await addBot(`✅ **Informação registada.**\nUm consultor especializado da zona de **${lead.zona}** irá ligar-lhe dentro de minutos para o número ${lead.telemovel}.`);
                setEtapa("done");
            } catch {
                await addBot("⚠️ Ocorreu uma falha no sistema. Ligue-nos para o +351 210 000 000.");
            } finally {
                setEnviando(false);
            }
        }
        setInput("");
    };

    const showOptions = !["nome", "telemovel", "done"].includes(etapa) && msgs[msgs.length - 1]?.options && !typing;

    // -- Pre-Chat RGPD Screen --
    if (!iniciado) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-6 bg-white">
                <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Inicie uma conversa</h3>
                <p className="text-center text-sm text-slate-500 mb-6">Estamos prontos para ajudar a encontrar a sua casa ou a vender o seu imóvel.</p>
                <button onClick={start} className="btn btn-primary w-full shadow-md">
                    Nova Conversa
                </button>
                <p className="text-[10px] text-slate-400 text-center mt-6">
                    Ao iniciar pressupõe-se a aceitação da nossa <a href="#" className="underline">Política de Privacidade</a> (RGPD).
                </p>
            </div>
        );
    }

    // -- Active Chat --
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
                    <p className="text-xs text-center py-2 font-medium text-slate-500">Conversa finalizada.</p>
                ) : (
                    <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); if (input.trim()) process(input.trim()); }}>
                        <input
                            ref={inputRef}
                            type="text"
                            className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            placeholder="Escreva a sua mensagem..."
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
