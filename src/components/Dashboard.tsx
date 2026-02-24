"use client";

import { useState } from "react";

interface Lead {
    id: string;
    nome: string;
    telemovel: string;
    tipoNegocio: string;
    zona: string;
    orcamento: string;
    timestampISO: string;
    estado: "Novo" | "Contactado" | "Visita Marcada" | "Fechado";
}

const DEMO: Lead[] = [
    ...Array(12).fill(null).map((_, i) => ({
        id: `demo-${i}`,
        nome: ["Ana Rodrigues", "Miguel Santos", "Sofia Mendes", "Carlos Ferreira", "Inês Almeida", "Pedro Costa"][i % 6],
        telemovel: `+351 9${Math.floor(10000000 + Math.random() * 89999999)}`,
        tipoNegocio: i % 3 === 0 ? "Arrendamento" : "Compra",
        zona: ["Lisboa", "Porto", "Algarve", "Coimbra"][i % 4],
        orcamento: ["Até 150k €", "150k – 300k €", "300k – 600k €", "Acima de 600k €"][i % 4],
        timestampISO: new Date(Date.now() - (i * 2 + 1) * 3600000).toISOString(),
        estado: ["Novo", "Novo", "Contactado", "Contactado", "Visita Marcada", "Fechado"][i % 6] as Lead["estado"],
    }))
];

const ESTADO_STYLE: Record<Lead["estado"], string> = {
    Novo: "bg-blue-100 text-primary border border-blue-200",
    Contactado: "bg-amber-100 text-amber-700 border border-amber-200",
    "Visita Marcada": "bg-purple-100 text-purple-700 border border-purple-200",
    Fechado: "bg-emerald-100 text-emerald-700 border border-emerald-200",
};

export default function Dashboard() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [leads, setLeads] = useState<Lead[]>(DEMO);
    const [filter, setFilter] = useState("Todos");
    const [search, setSearch] = useState("");

    const filtered = leads.filter(l =>
        (filter === "Todos" || l.estado === filter) &&
        (search === "" || l.nome.toLowerCase().includes(search.toLowerCase()) || l.zona.toLowerCase().includes(search.toLowerCase()))
    );

    const stats = {
        total: leads.length,
        novos: leads.filter(l => l.estado === "Novo").length,
        visitas: leads.filter(l => l.estado === "Visita Marcada").length,
        fechados: leads.filter(l => l.estado === "Fechado").length
    };

    const exportCSV = () => {
        const csv = ["Nome,Telemóvel,Tipo,Zona,Orçamento,Estado,Data",
            ...filtered.map(l => `${l.nome},${l.telemovel},${l.tipoNegocio},${l.zona},${l.orcamento},${l.estado},${new Date(l.timestampISO).toLocaleDateString("pt-PT")}`)
        ].join("\n");
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
        a.download = `leads-export-${Date.now()}.csv`;
        a.click();
    };

    return (
        <div className="bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">

            {/* Intranet Header */}
            <div className="bg-slate-50 border-b border-slate-200 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Painel de Gestão (Leads)</h2>
                    <p className="text-slate-500 text-sm mt-1">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                        A receber novos leads em tempo real
                    </p>
                </div>

                <button onClick={exportCSV} className="btn bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm px-4 py-2 text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Exportar Lista CSV
                </button>
            </div>

            {/* KPI Cards */}
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50 border-b border-slate-200">
                <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-1">Total Leads</p>
                        <p className="text-3xl font-bold text-slate-800">{stats.total}</p>
                    </div>
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-lg border border-blue-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-1">Novos</p>
                        <p className="text-3xl font-bold text-primary">{stats.novos}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 text-primary rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" /></svg>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-lg border border-purple-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold text-purple-600 uppercase tracking-widest mb-1">Visitas Marc.</p>
                        <p className="text-3xl font-bold text-purple-700">{stats.visitas}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-lg border border-emerald-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-1">Negócios</p>
                        <p className="text-3xl font-bold text-emerald-700">{stats.fechados}</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                    </div>
                </div>
            </div>

            {/* Database View */}
            <div className="p-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
                    <div className="relative w-full md:w-80">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Pesquisar cliente ou zona..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                        />
                    </div>

                    <div className="flex bg-slate-100 p-1 rounded-md border border-slate-200">
                        {["Todos", "Novo", "Contactado", "Visita Marcada", "Fechado"].map((f) => (
                            <button
                                key={f}
                                className={`px-3 py-1.5 text-xs font-bold rounded ${filter === f ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                                onClick={() => setFilter(f)}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto rounded-lg border border-slate-200">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider">Cliente</th>
                                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider">Contacto</th>
                                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider">Interesse</th>
                                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider">Zona/Orçamento</th>
                                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider">Estado</th>
                                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider">Entrada</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-100">
                            {filtered.map(l => (
                                <tr key={l.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">
                                                {l.nome.split(" ").map(n => n[0]).join("").substring(0, 2)}
                                            </div>
                                            <span className="font-semibold text-slate-800 text-sm">{l.nome}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm font-mono text-slate-600">{l.telemovel}</td>
                                    <td className="px-4 py-4">
                                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700">
                                            {l.tipoNegocio === "Compra" ? "🏠" : "🔑"} {l.tipoNegocio}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <p className="text-sm font-medium text-slate-700">{l.zona}</p>
                                        <p className="text-xs text-slate-500">{l.orcamento}</p>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className={`inline-flex px-2.5 py-1 text-xs font-bold rounded-full ${ESTADO_STYLE[l.estado]}`}>
                                            {l.estado}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-slate-500">
                                        Hoje, {new Date(l.timestampISO).toLocaleTimeString("pt-PT", { hour: '2-digit', minute: '2-digit' })}
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-12 text-center text-slate-500">
                                        Não existem leads compatíveis com o filtro de pesquisa.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
