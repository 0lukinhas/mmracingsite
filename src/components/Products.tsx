'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const products = [
    {
        name: "M100 (200L / 18L / 5L)",
        tag: "M100 // PUREZA MÍNIMA 99,95%",
        text: "Alto padrão de pureza desenvolvido para máxima performance. Permite que o motor trabalhe mais frio e proporciona uma combustão mais rápida, aumentando o rendimento e preservando os componentes mecânicos.",
        specs: [
            "Pureza Mínima: 99,95% (CH3OH)",
            "Tambores Revestidos Anticorrosão",
            "Combustão Rápida e Motor Mais Frio",
            "Disponível em Tambor 200L, 18L e 5L"
        ],
        price: "Consulte"
    },
    {
        name: "NITRO 100 (1L / 5L)",
        tag: "NITROMETANO PURO // 99,9%",
        text: "O mais alto nível de pureza disponível no mercado brasileiro (CH3NO2). Uma poderosa arma na obtenção de potência extrema em motores de competição, envasado sem contato humano com lacre de segurança.",
        specs: [
            "100% Nitrometano Filtrado (Pureza 99,9%)",
            "Envase Automatizado Sem Contato Humano",
            "Embalagem com Lacre de Segurança",
            "Disponível em Frasco 1L e Galão 5L"
        ],
        price: "Consulte"
    },
    {
        name: "M5 (GALÃO 20L)",
        tag: "FASTER COMBUSTION // PREPARADO",
        text: "A composição perfeita para o mais alto desempenho. Produz mais energia se comparado ao metanol puro graças aos seus avançados aditivos de combustão. Proteção superior contra desgaste e máxima vaporização.",
        specs: [
            "Aditivos Avançados de Combustão Rápida",
            "Energia Superior ao Metanol Puro",
            "Faixa Mais Ampla na Relação Ar/Combustível",
            "Projetado para Corridas de Arrancada"
        ],
        price: "Consulte"
    },
    {
        name: "M10 (GALÃO 20L)",
        tag: "FASTER COMBUSTION // PREPARADO",
        text: "Combustível de alta energia que supera o M5 através de aditivos de queima acelerada e máxima vaporização. Garante proteção mecânica extra e faixa estendida para ajustes finos de calibração ar/combustível.",
        specs: [
            "Energia e Resposta Superiores ao M5",
            "Máxima Vaporização e Queima Uniforme",
            "Proteção Contra Desgaste em Alto Boost",
            "Projetado para Arrancada Profissional"
        ],
        price: "Consulte"
    },
    {
        name: "M20 (GALÃO 20L)",
        tag: "FASTER COMBUSTION // FORÇA MÁXIMA",
        text: "O ápice de liberação de energia da Linha Preparada MM Racing. Formulado para superar o M10 com a mais alta densidade de aditivos, oferecendo máxima taxa de vaporização e torque para arrancada extrema.",
        specs: [
            "Nível Máximo de Energia da Linha Preparada",
            "Supera o M10 em Liberação de Potência",
            "Proteção Mecânica em Condições Extremas",
            "Projetado para Arrancada Profissional"
        ],
        price: "Consulte"
    },
    {
        name: "COLDPOWER (GALÃO 5L)",
        tag: "WATER/METHANOL // WMI",
        text: "Fluido calibrado pronto para uso em kits WMI (50% Água Desmineralizada + 50% Metanol). Fornece ganho de 5% a 15% de potência com acerto adequado, reduz drasticamente o IAT e previne detonação.",
        specs: [
            "50% Água Desmineralizada + 50% Metanol Puro",
            "Ganho Potencial de 5% a 15% de Potência",
            "Reduz Temperatura de Admissão e Knock",
            "Limpa Depósitos de Carbono nas Câmaras"
        ],
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
                        Química de alta precisão baseada no Catálogo Oficial 2026. Selecione os produtos para cotação direta ou acesse o catálogo técnico completo.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-4">
                        <a
                            href="/catalogo.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-mm-orange/10 border border-mm-orange text-mm-orange hover:bg-mm-orange hover:text-black font-bold px-6 py-3 text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(255,107,0,0.15)]"
                        >
                            <span>Baixar Catálogo Oficial 2026 (PDF)</span>
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
