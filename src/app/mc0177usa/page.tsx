'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Instagram,
    ShoppingBag,
    Flag,
    Check,
    MessageCircle,
    ChevronDown,
    Flame,
    ArrowUpRight
} from 'lucide-react';

const MERCADO_LIVRE_URL = "https://lista.mercadolivre.com.br/camiseta-malton-coimbra-0177";
const INSTAGRAM_URL = "https://www.instagram.com/maltoncoimbra/";
const WHATSAPP_DUVIDAS_URL = "https://wa.me/5511922880177?text=" + encodeURIComponent("Olá Malton! Vi a página da USA Tour 2027 e gostaria de saber mais sobre a camiseta oficial do Civic 177!");

const SIZES = ["P", "M", "G", "GG", "XGG"];

const getWhatsAppBuyUrl = (size: string) => {
    const text = `Olá Malton! Gostaria de pedir a Camiseta Oficial USA Tour 2027 (Carro 177) no tamanho [${size}]. Como faço para confirmar meu pedido e envio?`;
    return `https://wa.me/5511922880177?text=${encodeURIComponent(text)}`;
};

export default function MaltonUsaPage() {
    const [selectedSize, setSelectedSize] = useState<string>("G");
    const [activeView, setActiveView] = useState<'costas' | 'arte'>('costas');

    return (
        <div className="min-h-screen bg-black text-mm-text font-mono selection:bg-mm-orange selection:text-black overflow-x-hidden">

            {/* ========================================================= */}
            {/* 1. CABEÇALHO LIMPO E ELEGANTE                             */}
            {/* ========================================================= */}
            <nav className="sticky top-0 z-40 w-full bg-black/90 backdrop-blur-md border-b border-[#1c1c1c] px-4 sm:px-8 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div>
                        <span className="text-base sm:text-lg font-black tracking-tight uppercase text-white block">
                            MALTON COIMBRA <span className="text-mm-orange">177</span>
                        </span>
                        <span className="text-[10px] text-gray-400 tracking-widest block uppercase">
                            USA TOUR 2027 // WORLD RECORD
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <a
                            href={INSTAGRAM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-mm-orange transition-colors px-2.5 py-1.5 border border-[#262626] hover:border-mm-orange"
                            aria-label="Instagram de Malton Coimbra"
                        >
                            <Instagram size={15} />
                            <span className="hidden sm:inline">@maltoncoimbra</span>
                        </a>

                        <a
                            href="#camiseta"
                            className="bg-mm-orange text-black font-black text-xs uppercase tracking-wider px-4 py-2 hover:bg-mm-orange-hover transition-colors shadow-[0_0_15px_rgba(255,107,0,0.3)]"
                        >
                            APOIAR COM A CAMISETA
                        </a>
                    </div>
                </div>
            </nav>

            {/* ========================================================= */}
            {/* 2. HERO: FOCO NO MALTON, NO CARRO E NA MISSÃO             */}
            {/* ========================================================= */}
            <section className="relative min-h-[90vh] flex items-end md:items-center overflow-hidden border-b border-[#1c1c1c]">
                {/* Foto do Malton com o Civic */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/malton/hero.jpg"
                        alt="Malton Coimbra 177 e seu Honda Civic de arrancada"
                        fill
                        priority
                        className="object-cover object-top md:object-center filter contrast-105"
                    />

                    {/* Degradê preto natural e cinematográfico para leitura */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/30 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10 hidden md:block" />
                    <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black to-transparent z-10" />
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full py-16 md:py-24">
                    <div className="max-w-2xl">
                        
                        {/* Selo da Missão */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1 mb-6 backdrop-blur-sm"
                        >
                            <Flag size={13} className="text-mm-orange" />
                            <span className="text-[11px] font-bold text-white tracking-widest uppercase">
                                USA TOUR 2027
                            </span>
                            <span className="text-gray-400 text-[11px] tracking-widest uppercase">
                                {"//"} CARRO 177
                            </span>
                        </motion.div>

                        {/* Nome do Piloto */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-tight leading-[1.05] mb-3">
                                MALTON <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-mm-orange to-orange-500">
                                    COIMBRA 177
                                </span>
                            </h1>

                            <div className="inline-block bg-black/60 border-l-4 border-mm-orange px-3 py-1.5 mb-6">
                                <p className="text-base sm:text-xl font-bold text-white tracking-wide">
                                    World Record All motor Nitro!
                                </p>
                            </div>

                            <p className="text-base sm:text-lg text-gray-200 mb-8 leading-relaxed">
                                O corredor do Honda mais rápido do mundo e o único piloto do planeta que desenvolveu e acertou um motor All Motor para andar com <strong className="text-mm-orange font-bold">+ de 90% de Nitrometano</strong>.
                            </p>

                            {/* Convite direto e sincero de apoio */}
                            <div className="bg-black/70 border border-[#2b2b2b] p-5 mb-8 backdrop-blur-md">
                                <p className="text-sm text-white font-medium mb-1">
                                    🏁 <strong className="text-mm-orange">Me apoie comprando a camiseta oficial da USA Tour.</strong>
                                </p>
                                <p className="text-xs text-gray-400">
                                    Toda a verba arrecadada com a venda das camisetas será revertida totalmente para a tour de levar o Honda para acelerar nos Estados Unidos.
                                </p>
                            </div>

                            {/* Botões limpos */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="#camiseta"
                                    className="bg-mm-orange text-black font-black uppercase text-xs sm:text-sm tracking-widest py-4 px-6 flex items-center justify-center gap-2 hover:bg-mm-orange-hover transition-colors shadow-[0_0_20px_rgba(255,107,0,0.4)]"
                                >
                                    <ShoppingBag size={18} />
                                    <span>VER CAMISETA OFICIAL (R$ 99,90)</span>
                                </a>

                                <a
                                    href="#historia"
                                    className="border border-[#333] hover:border-white text-white font-bold uppercase text-xs tracking-widest py-4 px-5 flex items-center justify-center gap-2 transition-colors"
                                >
                                    <span>CONHECER A HISTÓRIA</span>
                                    <ChevronDown size={16} />
                                </a>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* 3. A HISTÓRIA DO MALTON & O HONDA                         */}
            {/* ========================================================= */}
            <section id="historia" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-b border-[#1c1c1c]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Texto sobre Malton e seu trabalho */}
                    <div className="lg:col-span-7">
                        <span className="text-xs uppercase tracking-[0.2em] text-mm-orange font-bold block mb-3">
                            A TRAJETÓRIA DO PILOTO E PREPARADOR
                        </span>

                        <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight mb-6">
                            QUEM É MALTON COIMBRA <br />
                            <span className="text-mm-orange">& O CIVIC 177</span>
                        </h2>

                        <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                            <p>
                                Construir um carro recordista mundial não é fruto da sorte. É resultado de anos de trabalho incansável de <strong className="text-white">Malton Coimbra</strong> na oficina, desenvolvendo cada detalhe do motor, cabeçote, chassi e calibração de injeção.
                            </p>
                            <p>
                                Enquanto a maioria dizia que era impossível um motor Honda 4 cilindros aspirado suportar o impacto violento do Nitrometano quase puro, Malton estudou a fundo a mecânica, quebrou paradigmas e colocou o carro para andar com <strong className="text-white">+ de 90% de Nitrometano</strong>.
                            </p>
                            <p>
                                O resultado? O <strong className="text-mm-orange">Honda All Motor mais rápido do mundo</strong> e a conquista do Recorde Mundial na categoria, provando a força e a inteligência da preparação brasileira nas pistas de arrancada.
                            </p>
                            <p className="text-xs text-gray-400 border-l-2 border-[#333] pl-3">
                                ⛽ <em>Combustível oficial utilizado nos recordes: MM Racing Fuel (Nitro 100).</em>
                            </p>
                        </div>
                    </div>

                    {/* Foto do Honda Civic 177 na pista */}
                    <div className="lg:col-span-5">
                        <div className="relative h-72 sm:h-96 w-full border border-[#2b2b2b] overflow-hidden group shadow-2xl">
                            <Image
                                src="/honda-civic.webp"
                                alt="Honda Civic 177 de Malton Coimbra na pista"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                                <span className="text-[10px] uppercase tracking-widest text-mm-orange block font-bold">
                                    HONDA CIVIC 177 // FLD
                                </span>
                                <span className="text-sm font-bold text-white uppercase">
                                    World Record All Motor Nitro
                                </span>
                            </div>
                        </div>

                        {/* 3 destaques simples */}
                        <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                            <div className="bg-[#0f0f0f] border border-[#222] p-3">
                                <span className="text-xl font-black text-mm-orange block">+90%</span>
                                <span className="text-[10px] text-gray-400 uppercase block">Nitro Puro</span>
                            </div>
                            <div className="bg-[#0f0f0f] border border-[#222] p-3">
                                <span className="text-xl font-black text-white block">177</span>
                                <span className="text-[10px] text-gray-400 uppercase block">Número</span>
                            </div>
                            <div className="bg-[#0f0f0f] border border-[#222] p-3">
                                <span className="text-xl font-black text-white block">USA</span>
                                <span className="text-[10px] text-gray-400 uppercase block">Tour 2027</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* 4. A MISSÃO USA TOUR 2027                                 */}
            {/* ========================================================= */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center border-b border-[#1c1c1c]">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-mm-orange font-bold mb-3">
                    <Flame size={14} />
                    <span>O PRÓXIMO PASSO</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-6">
                    LEVAR O HONDA BRASILEIRO <br />
                    <span className="text-mm-orange">PARA AS PISTAS DOS ESTADOS UNIDOS</span>
                </h2>

                <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto mb-6">
                    Os Estados Unidos são a capital global do Drag Racing. A meta de Malton Coimbra é embarcar o Civic 177 em um contêiner, cruzar o continente e disputar de igual para igual contra os maiores nomes da arrancada mundial em solo americano.
                </p>

                <p className="text-sm text-gray-400 max-w-xl mx-auto">
                    Para viabilizar os custos de transporte internacional, logística, inscrições e equipe, criamos a <strong className="text-white">Camiseta Oficial USA Tour</strong>. Comprando a sua, você ajuda diretamente a colocar esse carro na pista.
                </p>
            </section>

            {/* ========================================================= */}
            {/* 5. ÁREA DE COMPRA DA CAMISETA (SHOWCASE CLARO & DIRETO)   */}
            {/* ========================================================= */}
            <section id="camiseta" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-b border-[#1c1c1c]">
                
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <span className="text-xs uppercase tracking-widest text-mm-orange font-bold block mb-2">
                        EDIÇÃO OFICIAL DA CAMPANHA
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4">
                        CAMISETA OFICIAL <br />
                        <span className="text-mm-orange">USA TOUR MALTON COIMBRA 2027</span>
                    </h2>
                    <p className="text-sm sm:text-base text-gray-300">
                        Me apoie comprando uma camiseta oficial da USA TOUR. A verba será revertida totalmente para a tour.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    
                    {/* Mockup da Camiseta (Costas) & Alternador de Visão */}
                    <div className="lg:col-span-6 flex flex-col items-center">
                        {/* Seletor de Visão */}
                        <div className="flex items-center gap-2 mb-3 w-full justify-center sm:justify-start">
                            <button
                                type="button"
                                onClick={() => setActiveView('costas')}
                                className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all border ${
                                    activeView === 'costas'
                                        ? 'bg-mm-orange text-black border-mm-orange shadow-[0_0_12px_rgba(255,107,0,0.3)]'
                                        : 'bg-[#111] text-gray-400 border-[#2b2b2b] hover:border-gray-500 hover:text-white'
                                }`}
                            >
                                👕 COSTAS (MOCKUP OFICIAL)
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveView('arte')}
                                className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all border ${
                                    activeView === 'arte'
                                        ? 'bg-mm-orange text-black border-mm-orange shadow-[0_0_12px_rgba(255,107,0,0.3)]'
                                        : 'bg-[#111] text-gray-400 border-[#2b2b2b] hover:border-gray-500 hover:text-white'
                                }`}
                            >
                                🔍 VER ARTE DETALHADA
                            </button>
                        </div>

                        {/* Moldura do Produto */}
                        <div className="w-full max-w-lg bg-[#0a0a0a] border border-[#262626] p-4 relative shadow-2xl group">
                            <div className="absolute top-6 left-6 z-10 bg-black/90 border border-mm-orange px-2.5 py-1 text-[10px] font-black text-mm-orange tracking-widest uppercase backdrop-blur-sm">
                                {activeView === 'costas' ? 'ESTAMPA DAS COSTAS // MODELAGEM STREETWEAR' : 'ARTE VETORIAL OFICIAL // ALTA DEFINIÇÃO'}
                            </div>

                            <div className="relative aspect-square w-full overflow-hidden bg-black flex items-center justify-center border border-[#1a1a1a]">
                                <Image
                                    src={activeView === 'costas' ? '/malton/camiseta-costas.jpg' : '/malton/camiseta-arte.jpg'}
                                    alt={activeView === 'costas' ? 'Camiseta preta oficial costas - USA Tour Malton Coimbra 2027' : 'Arte oficial do Honda Civic 177 USA Tour'}
                                    fill
                                    priority
                                    className={activeView === 'costas' ? 'object-cover group-hover:scale-105 transition-transform duration-500' : 'object-contain group-hover:scale-105 transition-transform duration-500'}
                                />
                            </div>

                            <div className="mt-3 flex items-center justify-between text-[11px] text-gray-400">
                                <span className="uppercase tracking-wider">
                                    {activeView === 'costas' ? 'Serigrafia Premium em Alta Definição' : 'World Record All motor Nitro // Carro 177'}
                                </span>
                                <span className="text-mm-orange font-bold uppercase">
                                    Edição Oficial 2027
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Detalhes de Compra e Ações (Mercado Livre + WhatsApp) */}
                    <div className="lg:col-span-6 flex flex-col justify-center">
                        <div className="bg-[#0d0d0d] border border-[#262626] p-6 sm:p-8">
                            
                            {/* Preço e Destinação */}
                            <div className="pb-5 border-b border-[#222] mb-6 flex items-center justify-between">
                                <div>
                                    <span className="text-xs uppercase tracking-wider text-gray-400 block">Valor Especial</span>
                                    <div className="text-4xl font-black text-white mt-1">
                                        R$ 99,90
                                    </div>
                                </div>

                                <div className="text-right">
                                    <span className="text-[11px] font-bold text-mm-orange bg-mm-orange/10 border border-mm-orange/30 px-3 py-1 uppercase tracking-wider inline-block">
                                        100% REVERTIDO
                                    </span>
                                    <span className="text-[10px] text-gray-400 block mt-1">
                                        Direto para a tour nos EUA
                                    </span>
                                </div>
                            </div>

                            {/* Seletor de Tamanhos Interativo */}
                            <div className="mb-6">
                                <span className="text-xs uppercase tracking-wider text-white font-bold block mb-3">
                                    Escolha seu Tamanho:
                                </span>
                                <div className="grid grid-cols-5 gap-2">
                                    {SIZES.map((size) => (
                                        <button
                                            key={size}
                                            type="button"
                                            onClick={() => setSelectedSize(size)}
                                            className={`py-3 text-center text-xs font-black uppercase transition-all border ${
                                                selectedSize === size
                                                    ? 'bg-mm-orange text-black border-mm-orange shadow-[0_0_12px_rgba(255,107,0,0.35)] scale-105'
                                                    : 'bg-black text-white border-[#333] hover:border-white'
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-2.5 text-[11px] text-gray-400 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-mm-orange"></span>
                                    <span>Tamanho selecionado: <strong className="text-white font-bold">{selectedSize}</strong> (já configurado no botão do WhatsApp)</span>
                                </div>
                            </div>

                            {/* Especificações de Qualidade */}
                            <div className="space-y-2 mb-8 text-xs text-gray-300">
                                <div className="flex items-center gap-2">
                                    <Check size={16} className="text-mm-orange flex-shrink-0" />
                                    <span>Camiseta 100% algodão de alta gramatura e corte confortável</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check size={16} className="text-mm-orange flex-shrink-0" />
                                    <span>Estampa durável em serigrafia de alta resolução nas costas</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check size={16} className="text-mm-orange flex-shrink-0" />
                                    <span>Envio para todo o Brasil com rastreamento completo</span>
                                </div>
                            </div>

                            {/* Os 2 Botões Principais de Compra */}
                            <div className="space-y-3">
                                {/* Botão 1: Pedir direto no App do Mercado Livre */}
                                <a
                                    href={MERCADO_LIVRE_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-[#FFE600] hover:bg-[#F2DA00] text-black font-black uppercase text-xs sm:text-sm tracking-wider py-4 px-5 flex items-center justify-between gap-3 transition-all duration-200 shadow-[0_0_25px_rgba(255,230,0,0.25)] hover:shadow-[0_0_35px_rgba(255,230,0,0.45)] border border-[#FFE600] group"
                                >
                                    <div className="flex items-center gap-3 text-left">
                                        <div className="w-9 h-9 bg-black/10 flex items-center justify-center flex-shrink-0">
                                            <ShoppingBag size={19} className="text-black" />
                                        </div>
                                        <div>
                                            <span className="block font-black text-xs sm:text-sm text-black leading-tight">
                                                PEDIR DIRETO NO APP DO MERCADO LIVRE
                                            </span>
                                            <span className="block text-[10px] font-bold text-black/75 tracking-normal normal-case">
                                                Compra 100% protegida • Frete rápido Mercado Envios
                                            </span>
                                        </div>
                                    </div>
                                    <ArrowUpRight size={18} className="text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
                                </a>

                                {/* Botão 2: Pedir via WhatsApp com Tamanho Vinculado */}
                                <a
                                    href={getWhatsAppBuyUrl(selectedSize)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-black font-black uppercase text-xs sm:text-sm tracking-wider py-4 px-5 flex items-center justify-between gap-3 transition-all duration-200 shadow-[0_0_25px_rgba(37,211,102,0.25)] hover:shadow-[0_0_35px_rgba(37,211,102,0.45)] border border-[#25D366] group"
                                >
                                    <div className="flex items-center gap-3 text-left">
                                        <div className="w-9 h-9 bg-black/15 flex items-center justify-center flex-shrink-0">
                                            <MessageCircle size={19} className="text-black" />
                                        </div>
                                        <div>
                                            <span className="block font-black text-xs sm:text-sm text-black leading-tight">
                                                PEDIR VIA WHATSAPP (TAMANHO {selectedSize})
                                            </span>
                                            <span className="block text-[10px] font-bold text-black/80 tracking-normal normal-case">
                                                Atendimento direto com a equipe • Pix & envio imediato
                                            </span>
                                        </div>
                                    </div>
                                    <ArrowUpRight size={18} className="text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
                                </a>
                            </div>

                            {/* Trust Signals Rodapé do Card */}
                            <div className="mt-5 pt-4 border-t border-[#1f1f1f] flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-500">
                                <span>🔒 Compra Segura</span>
                                <span>📦 Rastreio Correios / ML</span>
                                <span>🏁 Apoio Oficial Piloto 177</span>
                            </div>

                            {/* Dúvidas Gerais no WhatsApp */}
                            <a
                                href={WHATSAPP_DUVIDAS_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-center text-xs text-gray-400 hover:text-white mt-4 py-1 transition-colors"
                            >
                                Dúvidas sobre envio ou falar com a equipe? Clique aqui
                            </a>

                        </div>
                    </div>

                </div>


            </section>

            {/* ========================================================= */}
            {/* 6. INSTAGRAM DO MALTON                                    */}
            {/* ========================================================= */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
                <div className="w-14 h-14 bg-[#111] border border-[#2b2b2b] flex items-center justify-center mx-auto mb-5 text-mm-orange">
                    <Instagram size={28} />
                </div>

                <span className="text-xs uppercase tracking-widest text-mm-orange font-bold block mb-2">
                    ACOMPANHE DE PERTO
                </span>

                <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight mb-4">
                    SIGA O MALTON NO INSTAGRAM
                </h2>

                <p className="text-sm text-gray-300 max-w-xl mx-auto mb-8 leading-relaxed">
                    Acompanhe os bastidores da oficina, acertos no dinamômetro, passagens na pista e todos os passos da preparação para a viagem aos Estados Unidos.
                </p>

                <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border-2 border-mm-orange text-white hover:bg-mm-orange hover:text-black font-bold uppercase text-xs sm:text-sm tracking-widest px-8 py-4 transition-colors"
                >
                    <Instagram size={18} />
                    <span>SEGUIR @MALTONCOIMBRA</span>
                    <ArrowUpRight size={16} />
                </a>
            </section>

            {/* ========================================================= */}
            {/* 7. RODAPÉ DISCRETO                                        */}
            {/* ========================================================= */}
            <footer className="bg-[#070707] border-t border-[#1c1c1c] py-8 px-4 text-center text-xs text-gray-500">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                        <span className="font-bold text-white uppercase tracking-wider block">
                            MALTON COIMBRA 177 // USA TOUR 2027
                        </span>
                        <span className="text-[11px] text-gray-400 block">
                            Combustível oficial do Honda: MM Racing Fuel
                        </span>
                    </div>

                    <div className="flex items-center gap-6 text-[11px] uppercase tracking-wider">
                        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            Instagram
                        </a>
                        <a href={MERCADO_LIVRE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            Mercado Livre
                        </a>
                        <Link href="/" className="hover:text-white transition-colors">
                            MM Racing Fuel
                        </Link>
                    </div>
                </div>

                <p className="mt-6 text-[10px] text-gray-600">
                    &copy; {new Date().getFullYear()} Malton Coimbra 177. Todos os direitos reservados.
                </p>
            </footer>

        </div>
    );
}
