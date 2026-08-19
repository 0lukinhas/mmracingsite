'use client';

import Image from 'next/image';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const pages = [
    { num: 1, title: "M100 - 5L", src: "/catalogo-pages/page-1.webp" },
    { num: 2, title: "M100 - 18L", src: "/catalogo-pages/page-2.webp" },
    { num: 3, title: "M100 - 200L", src: "/catalogo-pages/page-3.webp" },
    { num: 4, title: "NITRO 100 - 1L", src: "/catalogo-pages/page-4.webp" },
    { num: 5, title: "NITRO 100 - 5L", src: "/catalogo-pages/page-5.webp" },
    { num: 6, title: "M5 - 20L", src: "/catalogo-pages/page-6.webp" },
    { num: 7, title: "M10 - 20L", src: "/catalogo-pages/page-7.webp" },
    { num: 8, title: "M20 - 20L", src: "/catalogo-pages/page-8.webp" },
    { num: 9, title: "COLDPOWER - 5L", src: "/catalogo-pages/page-9.webp" },
    { num: 10, title: "Cotação WhatsApp", src: "/catalogo-pages/page-10.webp" },
];

const waMessage = encodeURIComponent('Olá, equipe MM Racing Fuel! Acessei o Catálogo Oficial 2026 pelo link da bio e gostaria de solicitar uma cotação para o meu projeto. Poderiam me passar os valores e condições de envio, por favor?');
const waUrl = `https://wa.me/5511922880177?text=${waMessage}`;

export default function CatalogoPage() {
    return (
        <div className="min-h-screen bg-black text-white font-mono flex flex-col items-center pb-28">
            {/* Sticky Header */}
            <header className="sticky top-0 z-40 w-full bg-black/90 backdrop-blur-md border-b border-[#222] px-4 py-3 flex items-center justify-between">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#888] hover:text-[#FD4102] transition-colors"
                >
                    <ArrowLeft size={16} />
                    <span>Início</span>
                </Link>

                <div className="text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-white block">
                        MM RACING<span className="text-[#FD4102]">.</span>FUEL
                    </span>
                    <span className="text-[10px] text-[#FD4102] tracking-wider block">
                        CATÁLOGO OFICIAL 2026
                    </span>
                </div>

                <a
                    href="/catalogo.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] uppercase tracking-wider text-[#888] hover:text-white transition-colors"
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

                        {p.num === 10 ? (
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
                        className="flex items-center justify-center gap-3 w-full bg-[#FD4102] hover:bg-[#e03a02] text-black font-black uppercase text-sm sm:text-base tracking-wider py-4 px-6 rounded-lg transition-all shadow-[0_0_25px_rgba(253,65,2,0.4)] active:scale-95"
                    >
                        <MessageCircle size={22} className="text-black" />
                        <span>FAZER COTAÇÃO NO WHATSAPP</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
