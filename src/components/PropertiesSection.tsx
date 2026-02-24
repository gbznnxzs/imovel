"use client";

import { useState } from "react";

interface Property {
    id: number;
    tipo: "Compra" | "Arrendamento";
    tag?: string; // e.g. "Novo", "Exclusivo", "Baixa de Preço"
    titulo: string;
    rua: string;
    zona: string;
    preco: string;
    quartos: number;
    wc: number;
    area: number;
    refCode: string;
    img: string;
}

const PROPERTIES: Property[] = [
    {
        id: 1, tipo: "Compra", tag: "Novo",
        titulo: "Apartamento T4 com Terraço", rua: "Avenidas Novas", zona: "Lisboa",
        preco: "850.000 €", quartos: 4, wc: 3, area: 180, refCode: "IP-74921",
        img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2, tipo: "Compra", tag: "Exclusivo",
        titulo: "Moradia T5 Térrea", rua: "Quinta da Marinha", zona: "Cascais",
        preco: "2.100.000 €", quartos: 5, wc: 4, area: 350, refCode: "IP-11204",
        img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3, tipo: "Arrendamento",
        titulo: "Loft Renovado Alta Baixa", rua: "Rua das Flores", zona: "Porto",
        preco: "1.200 € /mês", quartos: 1, wc: 1, area: 75, refCode: "IP-33902",
        img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4, tipo: "Compra", tag: "Baixa de Preço",
        titulo: "Moradia Geminada T3", rua: "Gulpilhares", zona: "Vila Nova de Gaia",
        preco: "380.000 €", quartos: 3, wc: 3, area: 160, refCode: "IP-88432",
        img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5, tipo: "Arrendamento",
        titulo: "Escritório Corporate Open Space", rua: "Parque das Nações", zona: "Lisboa",
        preco: "2.500 € /mês", quartos: 0, wc: 2, area: 220, refCode: "IP-19034",
        img: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6, tipo: "Compra", tag: "Exclusivo",
        titulo: "Apartamento T2 Luxo c/ Piscina", rua: "Vilamoura", zona: "Algarve",
        preco: "620.000 €", quartos: 2, wc: 2, area: 120, refCode: "IP-55219",
        img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
];

export default function PropertiesSection() {
    const [filter, setFilter] = useState("Todos");

    const filtered = PROPERTIES.filter((p) => {
        if (filter === "Todos") return true;
        if (filter === "Comprar" || filter === "Arrendar") return p.tipo === (filter === "Comprar" ? "Compra" : "Arrendamento");
        return true; // We can expand filters later
    });

    return (
        <section id="imoveis" className="section-pad bg-bg-alt">
            <div className="container-custom">

                {/* Header */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-3">Imóveis em Destaque</h2>
                        <p className="text-slate-600 max-w-2xl text-lg">
                            Explore a nossa seleção curada de propriedades exclusivas nas melhores localizações de Portugal.
                        </p>
                    </div>

                    <div className="flex bg-white rounded-md shadow-sm border border-slate-200 p-1">
                        {["Todos", "Comprar", "Arrendar"].map((f) => (
                            <button
                                key={f}
                                className={`px-6 py-2 text-sm font-semibold rounded-sm transition-colors ${filter === f ? "bg-primary text-white" : "bg-transparent text-slate-600 hover:bg-slate-50"
                                    }`}
                                onClick={() => setFilter(f)}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map((p) => (
                        <div key={p.id} className="property-card cursor-pointer group flex flex-col h-full bg-white rounded-lg shadow-sm hover:shadow-xl transition-shadow border border-slate-200 overflow-hidden relative">

                            {/* Image Area */}
                            <div className="relative h-64 overflow-hidden bg-slate-200">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={p.img}
                                    alt={p.titulo}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />

                                {/* Overlay gradient for legibility */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/20" />

                                {/* Top Badges */}
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wide rounded text-white shadow-sm ${p.tipo === "Compra" ? "bg-primary" : "bg-slate-800"
                                        }`}>
                                        {p.tipo}
                                    </span>
                                    {p.tag && (
                                        <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wide rounded text-white shadow-sm ${p.tag === "Exclusivo" ? "bg-primary-dark" : "bg-accent"
                                            }`}>
                                            {p.tag}
                                        </span>
                                    )}
                                </div>

                                {/* Bottom Overlay Info (Price) */}
                                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                    <p className="text-2xl font-bold text-white shadow-sm">{p.preco}</p>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-6 flex flex-col flex-1">
                                <div className="mb-4 flex-1">
                                    <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight group-hover:text-primary transition-colors">
                                        {p.titulo}
                                    </h3>
                                    <p className="text-sm text-slate-500 font-medium flex items-center gap-1.5">
                                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        {p.zona} • <span className="text-slate-400 font-normal">{p.rua}</span>
                                    </p>
                                </div>

                                {/* Specs */}
                                <div className="grid grid-cols-3 gap-2 py-4 border-t border-slate-100">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-400 uppercase font-semibold">Quartos</span>
                                        <span className="text-sm font-bold text-slate-700">{p.quartos > 0 ? p.quartos : "-"}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-400 uppercase font-semibold">Banhos</span>
                                        <span className="text-sm font-bold text-slate-700">{p.wc}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-400 uppercase font-semibold">Área</span>
                                        <span className="text-sm font-bold text-slate-700">{p.area} m²</span>
                                    </div>
                                </div>

                                {/* Footer Action */}
                                <div className="pt-4 flex justify-between items-center border-t border-slate-100">
                                    <span className="text-xs font-mono text-slate-400">Ref: {p.refCode}</span>
                                    <button className="text-sm font-semibold text-primary group-hover:text-primary-dark flex items-center gap-1 transition-colors">
                                        Ver Detalhes <span className="transition-transform group-hover:translate-x-1">→</span>
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

                {/* Global CTA */}
                <div className="mt-16 text-center">
                    <button
                        className="btn btn-primary px-8 py-3 text-lg shadow-md"
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onClick={() => (window as any).__openChat?.()}
                    >
                        Procura algo específico? Contacte os Nossos Consultores
                    </button>
                </div>
            </div>
        </section>
    );
}
