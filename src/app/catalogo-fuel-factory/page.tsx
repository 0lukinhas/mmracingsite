'use client';

import { ArrowLeft, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const pages = [
    { num: 1, title: "Capa - Fuel Factory Brasil", src: "/catalogo-fuel-factory/page-1.webp" },
    { num: 2, title: "F NOS", src: "/catalogo-fuel-factory/page-2.webp" },
    { num: 3, title: "2WL", src: "/catalogo-fuel-factory/page-3.webp" },
    { num: 4, title: "MXR 4T", src: "/catalogo-fuel-factory/page-4.webp" },
    { num: 5, title: "K2 MX", src: "/catalogo-fuel-factory/page-5.webp" },
    { num: 6, title: "MX RIP", src: "/catalogo-fuel-factory/page-6.webp" },
    { num: 7, title: "MXR 2", src: "/catalogo-fuel-factory/page-7.webp" },
    { num: 8, title: "Fragrância Combustível UVA 120ml", src: "/catalogo-fuel-factory/page-8.webp" },
    { num: 9, title: "Galão de Abastecimento", src: "/catalogo-fuel-factory/page-9.webp" },
    { num: 10, title: "Mangueira de Abastecimento", src: "/catalogo-fuel-factory/page-10.webp" },
    { num: 11, title: "Tabela de Referência Cruzada", src: "/catalogo-fuel-factory/page-11.webp" },
    { num: 12, title: "Cotação WhatsApp", src: "/catalogo-fuel-factory/page-12.webp" },
];

const waMessage = encodeURIComponent('Olá, vi o catálogo da Fuel Factory no link da bio do Instagram e gostaria de um orçamento.');
const waUrl = `https://wa.me/5511922880177?text=${waMessage}`;

export default function CatalogoFuelFactoryPage() {
    return (
        <div className="min-h-screen bg-black text-white font-mono flex flex-col items-center pb-28">
            {/* Sticky Header */}
            <header className="sticky top-0 z-40 w-full bg-black/90 backdrop-blur-md border-b border-[#222] px-4 py-3 flex items-center justify-between">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#888] hover:text-[#D2F005] transition-colors"
                >
                    <ArrowLeft size={16} />
                    <span>Início</span>
                </Link>

                <div className="text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-white block">
                        FUEL FACTORY<span className="text-[#D2F005]">.</span>BR
                    </span>
                    <span className="text-[10px] text-[#D2F005] tracking-wider block">
                        CATÁLOGO OFICIAL 2026
                    </span>
                </div>

                <a
                    href="/public/catalogo-fuel-factory.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] uppercase tracking-wider text-[#888] hover:text-[#D2F005] transition-colors"
                >
                    PDF
                </a>
            </header>

            {/* Catalog Pages Feed */}
            <main className="w-full max-w-2xl px-2 sm:px-4 pt-4 flex flex-col gap-6 items-center">
                {pages.map((p) => (
                    <div
                        key={p.num}
                        id={`page-${p.num}`}
                        className="w-full bg-[#0a0a0a] rounded-lg overflow-hidden border border-[#222] shadow-2xl relative group"
                    >
                        {/* Page indicator pill */}
                        <div className="absolute top-3 right-3 z-10 bg-black/80 border border-[#333] px-2.5 py-1 rounded text-[10px] tracking-widest text-[#bbb]">
                            {p.num} / {pages.length}
                        </div>

                        {p.num === 12 ? (
                            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
                                <img
                                    src={p.src}
                                    alt={`Página ${p.num} - ${p.title}`}
                                    className="w-full h-auto block"
                                    loading="lazy"
                                />
                            </a>
                        ) : (
                            <img
                                src={p.src}
                                alt={`Página ${p.num} - ${p.title}`}
                                className="w-full h-auto block"
                                loading={p.num <= 2 ? "eager" : "lazy"}
                            />
                        )}
                    </div>
                ))}
            </main>

            {/* Sticky Floating Bottom Bar for Instant WhatsApp Lead Conversion */}
            <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-black/95 border-t border-[#222] backdrop-blur-lg flex justify-center">
                <div className="w-full max-w-md">
                    <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full bg-[#D2F005] hover:bg-[#bce000] text-black font-black uppercase text-sm sm:text-base tracking-wider py-4 px-6 rounded-lg transition-all shadow-[0_0_25px_rgba(210,240,5,0.45)] active:scale-95"
                    >
                        <MessageCircle size={22} className="text-black" />
                        <span>FAZER COTAÇÃO NO WHATSAPP</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
