'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const products = [
    {
        name: "M100 200L (TAMBOR)",
        tag: "M100 // 99,95% PUREZA",
        text: "M100 com garantia mínima de 99,95% de pureza em tambor revestido especial anticorrosão. Motor mais frio e máxima resposta.",
        specs: ["Pureza Mínima: 99,95% (CH3OH)", "Tambor Revestido Especial", "Resfriamento Extremo"],
        price: "Consulte"
    },
    {
        name: "M100 18L / 5L",
        tag: "M100 // 99,95% PUREZA",
        text: "M100 100% puro para queima rápida e uniforme. Disponível em galões de 18L e 5L para acertos de pista e dinamômetro.",
        specs: ["Pureza Mínima: 99,95% (CH3OH)", "Galões de 18L e 5L", "Envasado sem contato humano"],
        price: "Consulte"
    },
    {
        name: "LINHA PREPARADA (M5 / M10 / M20)",
        tag: "LINHA PREPARADA",
        text: "Misturas prontas com aditivos de combustão que superam o M100 puro. Combustão rápida, uniforme e proteção mecânica.",
        specs: ["Base M100 + Aditivos de Queima", "Maior energia e vaporização", "Ajustes ar/combustível precisos"],
        price: "Consulte"
    },
    {
        name: "NITRO100 (1L / 5L)",
        tag: "NITROMETANO PURO",
        text: "O mais alto nível de pureza do mercado nacional (CH3NO2). Envasado com lacre de segurança e máxima energia química.",
        specs: ["100% Nitrometano Filtrado", "Lacre de Segurança", "Potência Extrema para Arrancada"],
        price: "Consulte"
    },
    {
        name: "COLD POWER",
        tag: "WMI // WATER METHANOL",
        text: "Fluido pronto para kits WMI (50% Água Desmineralizada + 50% M100). Ganho de 5% a 15% de potência e resfriamento da admissão.",
        specs: ["50% Água Desmineralizada + 50% M100", "Ganho de 5% a 15% de potência", "Reduz detonação e limpa câmara"],
        price: "Consulte"
    }
];

export default function Products() {
    return (
        <section id="combustiveis" className="bg-mm-dark py-24 relative overflow-hidden font-mono">
            {/* Circuit board pattern abstract overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-mm-orange tracking-[0.3em] text-xs font-bold uppercase mb-4 block">LABORATÓRIO MM</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter uppercase">
                        Química de Alta Performance
                    </h2>
                    <p className="text-mm-muted text-sm max-w-2xl mx-auto mt-4">
                        Química de alta precisão. Selecione os produtos para cotação ou acesse as especificações técnicas completas.
                    </p>
                    <div className="mt-6">
                        <a
                            href="/catalogo-produtos-mmracing.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-mm-orange/10 border border-mm-orange text-mm-orange hover:bg-mm-orange hover:text-black font-bold px-6 py-3 text-xs uppercase tracking-widest transition-all"
                        >
                            <span>Baixar Ficha Técnica / Catálogo Oficial (PDF)</span>
                            <ArrowUpRight size={16} />
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="bg-mm-gray/40 border border-[#333] hover:border-mm-orange/50 transition-colors duration-300 p-8 flex flex-col group relative overflow-hidden"
                        >
                            {/* Corner accent */}
                            <div className="absolute top-0 right-0 w-8 h-8 bg-black border-b border-l border-mm-gray group-hover:border-mm-orange transition-colors"></div>

                            <span className="text-xs text-mm-orange font-bold tracking-widest uppercase mb-3 block">{product.tag}</span>

                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-mm-orange transition-colors uppercase leading-tight min-h-[48px] flex items-center">
                                {product.name}
                            </h3>

                            <p className="text-mm-muted text-xs leading-relaxed mb-4">
                                {product.text}
                            </p>

                            <ul className="text-[11px] text-gray-400 space-y-1 mb-6 border-t border-[#222] pt-4">
                                {product.specs.map((spec, sIdx) => (
                                    <li key={sIdx} className="flex items-center gap-2">
                                        <span className="text-mm-orange font-bold">✓</span> {spec}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-auto border-t border-[#333] pt-6 group-hover:border-mm-orange/30 transition-colors">
                                <p className="text-white font-bold text-base mb-4">{product.price}</p>

                                <a
                                    href="https://wa.me/5511922880177?text=Ol%C3%A1!+Gostaria+de+falar+com+a+nossa+equipe+MM+Racing+Fuel."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between w-full px-4 py-3 bg-mm-gray/50 border border-mm-gray text-xs tracking-widest text-mm-text uppercase hover:bg-mm-orange hover:border-mm-orange hover:text-black transition-all duration-300 group/btn font-bold"
                                >
                                    <span>Cotar com a Equipe</span>
                                    <ArrowUpRight size={16} className="text-mm-orange group-hover/btn:text-black transition-colors" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <motion.a
                        href="https://wa.me/5511922880177?text=Ol%C3%A1!+Gostaria+de+falar+com+a+nossa+equipe+MM+Racing+Fuel."
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block bg-transparent border-2 border-mm-orange text-mm-orange hover:bg-mm-orange hover:text-black font-bold px-8 py-5 text-sm uppercase tracking-widest transition-all focus:outline-none"
                    >
                        Solicitar Orçamento com a Nossa Equipe
                    </motion.a>
                </div>
            </div>
        </section>
    );
}
