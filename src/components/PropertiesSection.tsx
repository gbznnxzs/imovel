"use client";

import { useState, useEffect } from "react";
import { Lang, translations } from "@/lib/i18n";
import { useGeoLocation } from "@/lib/useGeoLocation";

interface Property {
    id: number;
    tipo: "Compra" | "Arrendamento" | "Venda";
    categoria: "Apartamento" | "Moradia" | "Comercial";
    country: "Portugal" | "EAU" | "EUA" | "Brasil";
    city: string;
    currency: "EUR" | "USD" | "BRL" | "AED";
    priceValue: number;
    titulo: string;
    rua: string;
    zona: string;
    preco: string;
    quartos: number;
    wc: number;
    area: number;
    refCode: string;
    img: string;
    tag?: string;
}

const PROPERTIES: Property[] = [
    // Portugal
    {
        id: 1, tipo: "Compra", categoria: "Apartamento", country: "Portugal", city: "Lisboa", currency: "EUR", priceValue: 850000,
        titulo: "Luxury T4 Duplex", rua: "Avenidas Novas", zona: "Lisboa",
        preco: "850.000 €", quartos: 4, wc: 3, area: 180, refCode: "IP-PT01",
        img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tag: "Exclusivo"
    },
    // Dubai
    {
        id: 2, tipo: "Compra", categoria: "Apartamento", country: "EAU", city: "Dubai", currency: "USD", priceValue: 1200000,
        titulo: "Skyline Views Apartment", rua: "Downtown Dubai", zona: "Dubai Mall Area",
        preco: "$1,200,000", quartos: 2, wc: 2, area: 150, refCode: "IP-DXB01",
        img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tag: "Investment"
    },
    // USA (Miami)
    {
        id: 3, tipo: "Compra", categoria: "Moradia", country: "EUA", city: "Miami", currency: "USD", priceValue: 3500000,
        titulo: "Oceanfront Mansion", rua: "Palm Island", zona: "Miami Beach",
        preco: "$3,500,000", quartos: 6, wc: 5, area: 450, refCode: "IP-MIA01",
        img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tag: "Premium"
    },
    // Brasil (Rio)
    {
        id: 4, tipo: "Compra", categoria: "Apartamento", country: "Brasil", city: "Rio de Janeiro", currency: "BRL", priceValue: 2500000,
        titulo: "Cobertura em Ipanema", rua: "Vieira Souto", zona: "Ipanema",
        preco: "R$ 2.500.000", quartos: 3, wc: 3, area: 220, refCode: "IP-BR01",
        img: "https://images.unsplash.com/photo-1566195992011-5f6b21e4d2a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tag: "Novo"
    },
    // Brasil (SP)
    {
        id: 5, tipo: "Compra", categoria: "Comercial", country: "Brasil", city: "São Paulo", currency: "BRL", priceValue: 4800000,
        titulo: "Escritório Triple A Faria Lima", rua: "Av. Faria Lima", zona: "Itaim Bibi",
        preco: "R$ 4.800.000", quartos: 0, wc: 4, area: 500, refCode: "IP-BR02",
        img: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
];

export default function PropertiesSection({ lang }: { lang: Lang }) {
    const { geo, loading: loadingGeo } = useGeoLocation();
    const t = translations[lang].properties;

    // Filters
    const [countryFilter, setCountryFilter] = useState<string>("All");
    const [typeFilter, setTypeFilter] = useState<string>("All");
    const [priceRange, setPriceRange] = useState<string>("All");

    // Auto-filter based on Geo
    useEffect(() => {
        if (!loadingGeo && geo.region !== "GLOBAL") {
            const countryMap: Record<string, string> = {
                "PT": "Portugal",
                "BR": "Brasil",
                "US": "EUA",
                "ME": "EAU"
            };
            if (countryMap[geo.region]) {
                setCountryFilter(countryMap[geo.region]);
            }
        }
    }, [geo, loadingGeo]);

    const filtered = PROPERTIES.filter((p) => {
        const matchesCountry = countryFilter === "All" || p.country === countryFilter;
        const matchesType = typeFilter === "All" || p.categoria === typeFilter;

        // Simplified price filter logic
        let matchesPrice = true;
        if (priceRange === "Low") matchesPrice = p.priceValue < 500000;
        else if (priceRange === "Mid") matchesPrice = p.priceValue >= 500000 && p.priceValue <= 1500000;
        else if (priceRange === "High") matchesPrice = p.priceValue > 1500000;

        return matchesCountry && matchesType && matchesPrice;
    });

    return (
        <section id="imoveis" className="section-pad bg-slate-50">
            <div className="container-custom">
                <div className="mb-12">
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                        {lang === "pt" ? "Portfólio Imobiliário Global" : "Global Real Estate Portfolio"}
                    </h2>
                    <p className="text-slate-600 max-w-2xl text-lg mb-10">
                        {lang === "pt"
                            ? "Filtre por país e encontre oportunidades exclusivas de investimento ou habitação."
                            : "Filter by country and find exclusive investment or housing opportunities."}
                    </p>

                    {/* Advanced Filters */}
                    <div className="glass p-6 rounded-3xl border border-slate-200 shadow-premium flex flex-wrap gap-6 items-center">
                        <div className="flex-1 min-w-[200px]">
                            <label className="input-label">{lang === "pt" ? "País" : "Country"}</label>
                            <select
                                className="input-field rounded-xl"
                                value={countryFilter}
                                onChange={(e) => setCountryFilter(e.target.value)}
                            >
                                <option value="All">{lang === "pt" ? "Todos os Países" : "All Countries"}</option>
                                <option value="Portugal">Portugal</option>
                                <option value="Brasil">Brasil</option>
                                <option value="EUA">EUA (Miami)</option>
                                <option value="EAU">EAU (Dubai)</option>
                            </select>
                        </div>

                        <div className="flex-1 min-w-[200px]">
                            <label className="input-label">{lang === "pt" ? "Tipo de Imóvel" : "Property Type"}</label>
                            <select
                                className="input-field rounded-xl"
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                            >
                                <option value="All">{lang === "pt" ? "Todos" : "All"}</option>
                                <option value="Apartamento">{lang === "pt" ? "Apartamento" : "Apartment"}</option>
                                <option value="Moradia">{lang === "pt" ? "Moradia" : "House"}</option>
                                <option value="Comercial">{lang === "pt" ? "Comercial" : "Commercial"}</option>
                            </select>
                        </div>

                        <div className="flex-1 min-w-[200px]">
                            <label className="input-label">{lang === "pt" ? "Faixa de Preço" : "Price Range"}</label>
                            <select
                                className="input-field rounded-xl"
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                            >
                                <option value="All">{lang === "pt" ? "Qualquer Preço" : "Any Price"}</option>
                                <option value="Low">&lt; 500k</option>
                                <option value="Mid">500k - 1.5M</option>
                                <option value="High">&gt; 1.5M</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Property Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filtered.map((p) => (
                        <div key={p.id} className="property-card cursor-pointer group flex flex-col h-full bg-white rounded-3xl shadow-premium hover:shadow-2xl transition-all duration-500 border border-slate-100 overflow-hidden relative hover:-translate-y-2">
                            <div className="relative h-72 overflow-hidden bg-slate-200">
                                <img src={p.img} alt={p.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-40" />
                                <div className="absolute top-5 left-5 flex flex-col gap-2">
                                    <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full text-white bg-primary/80 backdrop-blur-md border border-white/20">
                                        {p.country}
                                    </span>
                                    {p.tag && (
                                        <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full text-white grad-accent border border-white/20">
                                            {p.tag}
                                        </span>
                                    )}
                                </div>
                                <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                                    <p className="text-3xl font-black text-white tracking-tighter drop-shadow-lg">{p.preco}</p>
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-1">
                                <h3 className="text-2xl font-extrabold text-slate-800 mb-3 leading-tight group-hover:text-primary transition-colors italic">
                                    {p.titulo}
                                </h3>
                                <div className="flex items-center gap-2 mb-6">
                                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                                    <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">{p.city} • {p.zona}</span>
                                </div>

                                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100 mt-auto">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Area</span>
                                        <span className="text-sm font-extrabold text-slate-700">{p.area} m²</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Beds</span>
                                        <span className="text-sm font-extrabold text-slate-700">{p.quartos}</span>
                                    </div>
                                    <div className="flex flex-col text-right">
                                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Ref</span>
                                        <span className="text-sm font-mono text-slate-500">{p.refCode}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-xl font-bold text-slate-400 italic">
                                {lang === "pt" ? "Sem imóveis encontrados com estes filtros." : "No properties found with these filters."}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
