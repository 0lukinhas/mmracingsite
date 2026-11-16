'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    Instagram,
    ShoppingBag,
    Flag,
    Check,
    MessageCircle,
    ChevronDown,
    Flame,
    ArrowUpRight,
    Truck,
    Copy,
    X,
    Clock,
    Loader2
} from 'lucide-react';

const MERCADO_LIVRE_URL = "https://lista.mercadolivre.com.br/camiseta-malton-coimbra-0177";
const INSTAGRAM_URL = "https://www.instagram.com/maltoncoimbra/";
const CONTACT_PHONE = "(48) 99665-3706";
const CONTACT_EMAIL = "maltoncoimbra@gmail.com";
const WHATSAPP_RAW = "5548996653706";
const WHATSAPP_DUVIDAS_URL = `https://wa.me/${WHATSAPP_RAW}?text=` + encodeURIComponent("Olá Malton! Vi a página da USA Tour 2027 e gostaria de saber mais sobre a camiseta oficial do Civic 177!");

const SIZES = ["P", "M", "G", "GG", "G1", "G2", "G3"];
const PIX_CHAVE = "09144976933"; // CPF oficial informado pelo cliente

interface ShippingQuote {
    id: number;
    name: string;
    company: string;
    price: number;
    formatted_price: string;
    delivery_days: number;
    delivery_range?: { min: number; max: number };
}

function generatePixPayload(opts: { key: string; name?: string; city?: string; amount?: number; txid?: string }) {
    function formatField(id: string, val: string) {
        const len = ('00' + val.length).slice(-2);
        return id + len + val;
    }
    const gui = formatField('00', 'br.gov.bcb.pix');
    let keyFormatted = opts.key.trim();
    // CPF tem exatamente 11 dígitos numéricos - NÃO adiciona +55
    if (/^\d{11}$/.test(keyFormatted)) {
        keyFormatted = keyFormatted;
    } else if (/^\d{10}$/.test(keyFormatted)) {
        keyFormatted = '+55' + keyFormatted;
    } else if (/^55\d{10,11}$/.test(keyFormatted)) {
        keyFormatted = '+' + keyFormatted;
    }
    const key = formatField('01', keyFormatted);
    const merchantAccount = formatField('26', gui + key);
    const merchantCat = formatField('52', '0000');
    const currency = formatField('53', '986');
    const amount = opts.amount ? formatField('54', Number(opts.amount).toFixed(2)) : '';
    const country = formatField('58', 'BR');
    const cleanName = (opts.name || 'MALTON COIMBRA 177')
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .substring(0, 25)
        .toUpperCase();
    const cleanCity = (opts.city || 'SAO PAULO')
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .substring(0, 15)
        .toUpperCase();
    const name = formatField('59', cleanName);
    const city = formatField('60', cleanCity);
    const txid = formatField('05', opts.txid || '***');
    const addData = formatField('62', txid);

    // 010211 = QR Code Estático Oficial do Banco Central do Brasil
    const payload = formatField('00', '01') +
                    formatField('01', '11') +
                    merchantAccount +
                    merchantCat +
                    currency +
                    amount +
                    country +
                    name +
                    city +
                    addData +
                    '6304';

    let crc = 0xFFFF;
    for (let i = 0; i < payload.length; i++) {
        crc ^= (payload.charCodeAt(i) << 8);
        for (let j = 0; j < 8; j++) {
            if ((crc & 0x8000) !== 0) {
                crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
            } else {
                crc = (crc << 1) & 0xFFFF;
            }
        }
    }
    const crcHex = ('0000' + crc.toString(16).toUpperCase()).slice(-4);
    return payload + crcHex;
}

const getWhatsAppBuyUrl = (size: string) => {
    const text = `Olá Malton! Gostaria de pedir a Camiseta Oficial USA Tour 2027 (Carro 177) no tamanho [${size}]. Como faço para confirmar meu pedido e envio?`;
    return `https://wa.me/${WHATSAPP_RAW}?text=${encodeURIComponent(text)}`;
};

export default function MaltonUsaPage() {
    const [selectedSize, setSelectedSize] = useState<string>("G");
    const [activeView, setActiveView] = useState<'costas' | 'arte'>('costas');

    // Shipping Calculator States
    const [cep, setCep] = useState("");
    const [isCalculating, setIsCalculating] = useState(false);
    const [calcError, setCalcError] = useState("");
    const [locationInfo, setLocationInfo] = useState<{ localidade: string; uf: string; logradouro?: string; bairro?: string } | null>(null);
    const [quotes, setQuotes] = useState<ShippingQuote[]>([]);
    const [selectedQuote, setSelectedQuote] = useState<ShippingQuote | null>(null);

    // Pix Modal States
    const [isPixModalOpen, setIsPixModalOpen] = useState(false);
    const [copiedPix, setCopiedPix] = useState(false);
    const [pixTimeLeft, setPixTimeLeft] = useState(15 * 60);
    const [customerData, setCustomerData] = useState({
        name: "",
        cpf: "",
        phone: "",
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        cep: ""
    });

    // Pix timer countdown
    useEffect(() => {
        if (!isPixModalOpen) return;
        const interval = setInterval(() => {
            setPixTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, [isPixModalOpen]);

    const handleCepInput = (val: string) => {
        const raw = val.replace(/\D/g, '').substring(0, 8);
        let masked = raw;
        if (raw.length > 5) {
            masked = raw.substring(0, 5) + '-' + raw.substring(5, 8);
        }
        setCep(masked);
    };

    const handleCalculateShipping = async () => {
        const cleanCep = cep.replace(/\D/g, '');
        setCalcError("");
        if (cleanCep.length !== 8) {
            setCalcError("Digite um CEP válido com 8 números.");
            return;
        }

        setIsCalculating(true);
        setQuotes([]);
        setSelectedQuote(null);

        try {
            // 1. ViaCEP
            try {
                const viaRes = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
                if (viaRes.ok) {
                    const viaData = await viaRes.json();
                    if (!viaData.erro) {
                        setLocationInfo(viaData);
                        setCustomerData((prev) => ({
                            ...prev,
                            street: viaData.logradouro || prev.street,
                            neighborhood: viaData.bairro || prev.neighborhood,
                            city: `${viaData.localidade} / ${viaData.uf}`,
                            cep: cep
                        }));
                    }
                }
            } catch (err) {
                console.warn("ViaCEP lookup error", err);
            }

            // 2. Local Next.js API /api/frete
            const res = await fetch('/api/frete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ postal_code: cleanCep, quantity: 1 })
            });

            if (!res.ok) {
                throw new Error("Erro na cotação");
            }

            const data = await res.json();
            if (data.quotes && data.quotes.length > 0) {
                setQuotes(data.quotes);
                setSelectedQuote(data.quotes[0]);
            } else {
                setCalcError("Nenhuma transportadora disponível para esse CEP no momento.");
            }
        } catch {
            setCalcError("Não foi possível calcular o frete agora. Tente novamente.");
        } finally {
            setIsCalculating(false);
        }
    };

    const shirtPrice = 99.90;
    const totalOrder = shirtPrice + (selectedQuote ? selectedQuote.price : 0);

    const [pixPayload, setPixPayload] = useState("");
    const [copiedChave, setCopiedChave] = useState(false);

    const handleOpenPixModal = () => {
        if (!selectedQuote) {
            alert("Por favor, digite seu CEP e clique em CALCULAR FRETE antes de prosseguir com o pagamento Pix.");
            return;
        }
        const generated = generatePixPayload({
            key: PIX_CHAVE,
            name: "MALTON COIMBRA 177",
            city: "SAO PAULO",
            amount: totalOrder,
            txid: "***"
        });
        setPixPayload(generated);
        setPixTimeLeft(15 * 60);
        setIsPixModalOpen(true);
    };

    const handleCopyPix = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(pixPayload);
            setCopiedPix(true);
            setTimeout(() => setCopiedPix(false), 2500);
        }
    };

    const handleCopyChave = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(PIX_CHAVE);
            setCopiedChave(true);
            setTimeout(() => setCopiedChave(false), 2500);
        }
    };

    const formatCpf = (v: string) => {
        const raw = v.replace(/\D/g, '').substring(0, 11);
        if (raw.length > 9) return raw.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        if (raw.length > 6) return raw.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
        if (raw.length > 3) return raw.replace(/(\d{3})(\d{1,3})/, '$1.$2');
        return raw;
    };

    const formatPhone = (v: string) => {
        const raw = v.replace(/\D/g, '').substring(0, 11);
        if (raw.length > 10) return raw.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        if (raw.length > 6) return raw.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        if (raw.length > 2) return raw.replace(/(\d{2})(\d{0,5})/, '($1) $2');
        return raw;
    };

    const handleSendWhatsAppProof = () => {
        if (!customerData.name || !customerData.cpf || !customerData.street || !customerData.number) {
            alert("Preencha os dados de envio (Nome, CPF, Rua e Número) para a etiqueta do Melhor Envio!");
            return;
        }

        let msg = "🏁 *PEDIDO CONFIRMADO // CAMISETA USA TOUR 2027*\n\n";
        msg += `👤 *Cliente:* ${customerData.name}\n`;
        msg += `📄 *CPF:* ${customerData.cpf}\n`;
        msg += `📱 *WhatsApp:* ${customerData.phone || 'Mesmo do contato'}\n`;
        msg += `👕 *Tamanho:* ${selectedSize}\n\n`;
        msg += `📦 *ENDEREÇO DE ENTREGA:*\n`;
        msg += `${customerData.street}, ${customerData.number} ${customerData.complement ? `(${customerData.complement})` : ''}\n`;
        msg += `Bairro: ${customerData.neighborhood}\n`;
        msg += `Cidade/UF: ${customerData.city} - CEP: ${customerData.cep || cep}\n\n`;
        msg += `🚚 *Frete Escolhido:* ${selectedQuote ? `${selectedQuote.company} ${selectedQuote.name} (${selectedQuote.formatted_price})` : 'A combinar'}\n`;
        msg += `💵 *VALOR TOTAL PAGO VIA PIX:* R$ ${totalOrder.toFixed(2).replace('.', ',')}\n\n`;
        msg += "Segue o comprovante do Pix em anexo para emissão do envio!";

        window.open(`https://wa.me/${WHATSAPP_RAW}?text=${encodeURIComponent(msg)}`, '_blank');
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    };

    return (
        <div className="min-h-screen bg-black text-mm-text font-racing selection:bg-mm-orange selection:text-black overflow-x-hidden">

            {/* ========================================================= */}
            {/* 2. HERO: SEGUINDO O DESIGN APROVADO (IMAGEM 1)           */}
            {/* ========================================================= */}
            <section className="relative min-h-screen flex flex-col justify-between overflow-hidden border-b border-[#1c1c1c] pt-8 sm:pt-12 pb-10 sm:pb-14">
                
                {/* Foto limpa e original do Malton com o Civic no fundo - Rosto 100% nítido e sem recortes */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/malton/hero-clean-mobile.webp"
                        alt="Malton Coimbra e o Civic 177 - USA Tour 2027"
                        fill
                        priority
                        className="object-cover object-[75%_top] sm:object-[center_12%] filter contrast-105 brightness-90"
                    />

                    {/* Vinhetas laterais e inferiores para contraste impecável sem manchar o piloto */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent z-10 w-full sm:w-4/5" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-transparent z-10 top-1/4" />
                    <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/80 to-transparent z-10" />
                </div>

                {/* Conteúdo Centralizado (Opção B - Perfeito no Mobile e Desktop) */}
                <div className="relative z-20 w-full max-w-md sm:max-w-lg mx-auto px-4 sm:px-6 flex flex-col justify-between min-h-full">
                    
                    {/* Top Bar da Imagem 1: USA TOUR 2027 // CARRO 177 & RACE DEVELOP IMPROVE REPEAT */}
                    <div className="flex items-start justify-between border-b border-white/15 pb-3 mb-5">
                        <div>
                            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-racing font-black tracking-widest text-white uppercase">
                                <span>🏁</span>
                                <span>USA TOUR</span>
                                <span className="text-mm-orange font-black">2027</span>
                            </div>
                            <span className="text-[10px] sm:text-xs font-tactical text-gray-400 tracking-[0.25em] block uppercase mt-0.5">
                                CARRO 177
                            </span>
                        </div>

                        <div className="text-right">
                            <div className="text-[9px] sm:text-[10px] font-tactical font-bold text-gray-400 tracking-widest uppercase leading-tight">
                                RACE<br />DEVELOP<br />IMPROVE<br />REPEAT
                            </div>
                            <div className="w-8 h-[2px] bg-mm-orange ml-auto mt-1" />
                        </div>
                    </div>

                    {/* Logo & Piloto Lockup em Tipografia Autêntica da Arte Aprovada */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-4"
                    >
                        {/* Lettering Brutalista de Arrancada */}
                        <div className="inline-block select-none">
                            <h1 className="font-danger uppercase italic leading-[0.80] tracking-normal">
                                <span className="text-white text-5xl sm:text-6xl lg:text-7xl block drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)]">
                                    MALTON
                                </span>
                                <span className="text-mm-orange text-5xl sm:text-6xl lg:text-7xl block drop-shadow-[0_4px_25px_rgba(255,107,0,0.5)] -mt-1 sm:-mt-2">
                                    COIMBRA
                                </span>
                            </h1>
                            <div className="flex items-center gap-3 mt-2">
                                <span className="font-racing-num italic text-white text-6xl sm:text-7xl leading-none drop-shadow-[0_4px_25px_rgba(255,107,0,0.6)] [-webkit-text-stroke:2px_#000]">
                                    177
                                </span>
                                <div className="flex flex-col justify-center">
                                    <span className="font-brush italic text-xs sm:text-sm text-gray-200 tracking-wider uppercase leading-tight border-b-2 border-mm-orange pb-0.5">
                                        BUILT TO GO FASTER
                                    </span>
                                    <span className="font-techno text-[9px] sm:text-[10px] text-mm-orange tracking-widest uppercase mt-0.5">
                                        RECORDISTA MUNDIAL
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* World Record / All Motor Nitromethane */}
                        <div className="mt-4">
                            <h2 className="text-sm sm:text-base font-techno font-bold text-white tracking-[0.25em] uppercase leading-none">
                                WORLD RECORD
                            </h2>
                            <p className="text-xs sm:text-sm font-racing font-bold text-mm-orange tracking-[0.22em] uppercase mt-1">
                                ALL MOTOR • NITROMETHANE
                            </p>
                        </div>
                    </motion.div>

                    {/* Descrição Oficial */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="space-y-1 text-xs sm:text-sm font-racing uppercase tracking-wider text-gray-200 leading-snug mb-5"
                    >
                        <p className="font-bold text-white">O HONDA ALL MOTOR MAIS RÁPIDO DO MUNDO.</p>
                        <p>PILOTADO, DESENVOLVIDO E CONSTRUÍDO POR MALTON COIMBRA.</p>
                        <p>
                            MAIS DE 90% DE NITROMETANO. UM PROJETO BRASILEIRO RUMO AOS{' '}
                            <strong className="text-mm-orange font-black">7 SEGUNDOS</strong> NOS EUA.
                        </p>
                    </motion.div>

                    {/* Caixa Tática Chanfrada: FAÇA PARTE DA USA TOUR 2027 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-black/90 border border-mm-orange p-4 mb-4 backdrop-blur-md tactical-notch shadow-[0_0_25px_rgba(255,107,0,0.25)]"
                    >
                        <div className="flex items-start justify-between gap-3 mb-2.5">
                            <div className="flex items-center gap-2">
                                <span className="text-base">🏁</span>
                                <h3 className="font-roadrage text-mm-orange text-xl sm:text-2xl tracking-wide uppercase leading-none drop-shadow-[0_2px_12px_rgba(255,107,0,0.35)]">
                                    FAÇA PARTE DA USA TOUR <span className="text-white">2027</span>
                                </h3>
                            </div>
                            <div className="flex flex-col items-end flex-shrink-0">
                                <span className="text-[9px] font-tactical font-bold text-gray-400 tracking-widest uppercase">
                                    BRAZIL TO USA
                                </span>
                                <svg className="w-14 h-4 text-mm-orange mt-0.5" viewBox="0 0 50 16" fill="none">
                                    <path d="M 2 13 Q 25 1 45 4" stroke="#FF6B00" strokeWidth="1.5" strokeDasharray="3 3"/>
                                    <path d="M 44 2 L 48 4 L 44 6 Z" fill="#FF6B00"/>
                                </svg>
                            </div>
                        </div>
                        <p className="text-[11px] sm:text-xs text-gray-300 font-racing uppercase tracking-wider leading-relaxed">
                            COMPRE A CAMISETA OFICIAL E AJUDE A LEVAR ESTE PROJETO BRASILEIRO PARA AS PISTAS DOS ESTADOS UNIDOS.
                        </p>
                    </motion.div>

                    {/* Botão Principal Laranja (Destacado & Impossível de não ver) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <a
                            href="#camiseta"
                            className="w-full bg-mm-orange hover:bg-mm-orange-hover text-black font-racing font-black py-4 px-6 text-center transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-[0_0_30px_rgba(255,107,0,0.5)] mb-3 block group"
                        >
                            <div className="flex items-center justify-center gap-2 text-base sm:text-lg tracking-widest uppercase font-black">
                                <span>VER CAMISETA OFICIAL</span>
                                <span className="transition-transform group-hover:translate-x-1.5 font-bold">──&gt;</span>
                            </div>
                            <div className="text-xs sm:text-sm tracking-wider font-black text-black/90">
                                (R$ 99,90)
                            </div>
                        </a>

                        {/* Botão Secundário Conhecer a História */}
                        <a
                            href="#historia"
                            className="w-full bg-[#0a0a0a]/90 hover:bg-[#151515] border border-[#333] hover:border-gray-400 text-white font-racing font-bold uppercase tracking-widest text-xs sm:text-sm py-3.5 px-6 flex items-center justify-center gap-2 transition-colors mb-4"
                        >
                            <span>CONHECER A HISTÓRIA</span>
                            <span className="font-bold">──&gt;</span>
                        </a>
                    </motion.div>

                    {/* Pilares: SONHO | TRABALHO | RESULTADOS */}
                    <div className="flex items-center justify-between text-[11px] sm:text-xs font-tactical font-bold text-gray-400 uppercase tracking-widest py-3 border-y border-[#222]/80 mb-3">
                        <div className="flex items-center gap-1.5">
                            <span>⚙</span>
                            <span>SONHO</span>
                        </div>
                        <span className="text-[#333]">|</span>
                        <div className="flex items-center gap-1.5">
                            <span>🔧</span>
                            <span>TRABALHO</span>
                        </div>
                        <span className="text-[#333]">|</span>
                        <div className="flex items-center gap-1.5">
                            <span>🏆</span>
                            <span>RESULTADOS</span>
                        </div>
                    </div>

                    {/* Linha Final: BRASIL PARA O MUNDO */}
                    <div className="flex items-center justify-center gap-3 text-center">
                        <div className="h-[1px] w-8 sm:w-16 bg-mm-orange/40" />
                        <span className="text-[10px] sm:text-xs font-racing font-bold uppercase tracking-[0.2em] text-mm-orange">
                            BRASIL PARA O MUNDO
                        </span>
                        <div className="h-[1px] w-8 sm:w-16 bg-mm-orange/40" />
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
                        </div>
                    </div>

                    {/* Foto do Honda Civic 177 na pista */}
                    <div className="lg:col-span-5">
                        <div className="relative h-72 sm:h-96 w-full border border-[#2b2b2b] overflow-hidden group shadow-2xl">
                            <Image
                                src="/malton/civic-177-pista.jpg"
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
                    <span className="text-sm sm:text-base font-roadrage uppercase tracking-widest text-mm-orange block mb-2">
                        EDIÇÃO OFICIAL DA CAMPANHA
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4 leading-tight">
                        <span className="font-danger block">CAMISETA OFICIAL</span>
                        <span className="text-mm-orange font-danger block -mt-1 sm:-mt-2">USA TOUR MALTON COIMBRA 2027</span>
                    </h2>
                    <p className="text-sm sm:text-base text-gray-300">
                        Me apoie comprando uma camiseta oficial da USA TOUR. A verba será revertida totalmente para a tour.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    
                    {/* Mockup da Camiseta (Frente e Costas Lado a Lado - Imagem 3 Atualizada) */}
                    <div className="lg:col-span-6 flex flex-col items-center">
                        <div className="w-full max-w-lg bg-[#0a0a0a] border border-[#262626] p-4 relative shadow-2xl group">
                            <div className="absolute top-6 left-6 z-10 bg-black/90 border border-mm-orange px-2.5 py-1 text-[10px] font-black text-mm-orange tracking-widest uppercase backdrop-blur-sm font-tactical">
                                MOCKUP OFICIAL // FRENTE & COSTAS
                            </div>

                            <div className="relative aspect-[859/1024] w-full overflow-hidden bg-black flex items-center justify-center border border-[#1a1a1a]">
                                <Image
                                    src="/malton/camiseta-oficial-2027.jpg"
                                    alt="Camiseta Oficial USA Tour 2027 - Malton Coimbra 177 - Frente e Costas"
                                    fill
                                    priority
                                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            <div className="mt-3 flex items-center justify-between text-[11px] text-gray-400 font-racing">
                                <span className="uppercase tracking-wider">
                                    Modelagem Streetwear • Estampa Frente & Costas
                                </span>
                                <span className="text-mm-orange font-bold uppercase font-tactical">
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
                                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
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

                            {/* Calculadora de Frete Melhor Envio */}
                            <div className="bg-[#080808] border border-[#222] p-4 mb-5">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                        <Truck size={15} className="text-mm-orange" />
                                        Calcular Frete e Prazo
                                    </span>
                                    <span className="text-[9px] font-black text-mm-orange bg-mm-orange/10 border border-mm-orange/30 px-2 py-0.5 tracking-wider">
                                        MELHOR ENVIO API
                                    </span>
                                </div>

                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={cep}
                                        onChange={(e) => handleCepInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleCalculateShipping()}
                                        placeholder="00000-000"
                                        maxLength={9}
                                        className="flex-1 bg-black border border-[#333] text-white px-3.5 py-2.5 text-sm font-bold tracking-wider focus:outline-none focus:border-mm-orange"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleCalculateShipping}
                                        disabled={isCalculating}
                                        className="bg-[#1c1c1c] hover:bg-mm-orange hover:text-black text-white border border-[#333] hover:border-mm-orange px-4 text-xs font-black tracking-wider transition-colors disabled:opacity-50 flex items-center gap-1.5"
                                    >
                                        {isCalculating ? (
                                            <>
                                                <Loader2 size={13} className="animate-spin" />
                                                <span>COTANDO...</span>
                                            </>
                                        ) : (
                                            <span>CALCULAR</span>
                                        )}
                                    </button>
                                </div>

                                <div className="flex items-center justify-between mt-1.5 text-[10px]">
                                    {locationInfo ? (
                                        <span className="text-mm-orange font-bold">
                                            📍 {locationInfo.localidade} - {locationInfo.uf}
                                        </span>
                                    ) : (
                                        <span></span>
                                    )}
                                    <a
                                        href="https://buscacepinter.correios.com.br/app/endereco/index.php"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-500 hover:text-gray-300 underline ml-auto"
                                    >
                                        Não sei meu CEP ↗
                                    </a>
                                </div>

                                {calcError && (
                                    <div className="mt-2.5 p-2.5 bg-red-950/40 border border-red-900/60 text-red-400 text-[11px] leading-tight">
                                        {calcError}
                                    </div>
                                )}

                                {/* Lista de Opções de Frete */}
                                {quotes.length > 0 && (
                                    <div className="mt-3 space-y-2 max-h-48 overflow-y-auto pr-1">
                                        {quotes.map((q, idx) => {
                                            const isSelected = selectedQuote?.id === q.id && selectedQuote?.name === q.name;
                                            return (
                                                <div
                                                    key={`${q.id}-${idx}`}
                                                    onClick={() => setSelectedQuote(q)}
                                                    className={`p-2.5 bg-black border transition-all cursor-pointer flex items-center justify-between ${
                                                        isSelected
                                                            ? 'border-mm-orange bg-mm-orange/5'
                                                            : 'border-[#222] hover:border-[#444]'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-2.5">
                                                        <input
                                                            type="radio"
                                                            checked={isSelected}
                                                            onChange={() => setSelectedQuote(q)}
                                                            className="accent-mm-orange w-3.5 h-3.5"
                                                        />
                                                        <div>
                                                            <div className="flex items-center gap-1.5">
                                                                <span className="text-xs font-bold text-white uppercase">
                                                                    {q.company} ({q.name})
                                                                </span>
                                                                {idx === 0 && (
                                                                    <span className="text-[8px] font-black bg-emerald-950 text-emerald-400 border border-emerald-800/80 px-1 py-0.5 uppercase">
                                                                        ECONÔMICO
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <span className="text-[10px] text-gray-400 block">
                                                                Chega em até {q.delivery_days} dias úteis
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <span className="text-xs font-black text-white">
                                                        {q.formatted_price}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Resumo Financeiro */}
                            <div className="bg-[#0a0a0a] border border-[#222] p-3.5 mb-5 space-y-1.5 text-xs">
                                <div className="flex justify-between text-gray-400 text-[11px]">
                                    <span>Camiseta Oficial 177:</span>
                                    <span>R$ 99,90</span>
                                </div>
                                <div className="flex justify-between text-gray-400 text-[11px]">
                                    <span>Frete ({selectedQuote ? `${selectedQuote.company} ${selectedQuote.name}` : 'Calcule acima'}):</span>
                                    <span className="text-white font-bold">{selectedQuote ? selectedQuote.formatted_price : '--'}</span>
                                </div>
                                <div className="pt-2 border-t border-[#222] flex justify-between items-center text-sm font-black text-white">
                                    <span>TOTAL:</span>
                                    <span className="text-mm-orange text-base font-black">
                                        R$ {totalOrder.toFixed(2).replace('.', ',')}
                                    </span>
                                </div>
                            </div>

                            {/* Especificações de Qualidade */}
                            <div className="space-y-1.5 mb-6 text-xs text-gray-300">
                                <div className="flex items-center gap-2">
                                    <Check size={15} className="text-mm-orange flex-shrink-0" />
                                    <span>Camiseta 100% algodão de alta gramatura e corte confortável</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check size={15} className="text-mm-orange flex-shrink-0" />
                                    <span>Envio para todo o Brasil via Melhor Envio (com rastreio)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check size={15} className="text-mm-orange flex-shrink-0" />
                                    <span>100% da verba revertida para a USA Tour 2027</span>
                                </div>
                            </div>

                            {/* Botões de Ação */}
                            <div className="space-y-2.5">
                                {/* Botão 1: Pagar com Pix */}
                                <button
                                    type="button"
                                    onClick={handleOpenPixModal}
                                    className="w-full bg-mm-orange hover:bg-mm-orange-hover text-black font-black uppercase text-xs sm:text-sm tracking-wider py-4 px-5 flex items-center justify-center gap-3 transition-all duration-200 shadow-[0_0_25px_rgba(255,107,0,0.35)] hover:shadow-[0_0_35px_rgba(255,107,0,0.55)] cursor-pointer"
                                >
                                    <span className="font-black">
                                        PAGAR COM PIX (R$ {totalOrder.toFixed(2).replace('.', ',')}) ➔
                                    </span>
                                </button>

                                {/* Botão 2: Pedir via WhatsApp com Tamanho Vinculado */}
                                <a
                                    href={getWhatsAppBuyUrl(selectedSize)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-black font-black uppercase text-xs tracking-wider py-3 px-5 flex items-center justify-center gap-2 transition-all duration-200 shadow-[0_0_20px_rgba(37,211,102,0.2)]"
                                >
                                    <MessageCircle size={17} className="text-black" />
                                    <span>PEDIR PELO WHATSAPP ➔</span>
                                </a>

                                {/* Botão 3: Mercado Livre */}
                                <a
                                    href={MERCADO_LIVRE_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-center w-full py-2.5 text-[11px] font-bold text-gray-400 hover:text-white uppercase tracking-wider border border-dashed border-[#262626] hover:border-[#555] transition-colors"
                                >
                                    OU COMPRAR NO MERCADO LIVRE ↗
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
                    ACOMPANHE O MEU DIA A DIA
                </span>

                <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight mb-4">
                    ME SIGA NO INSTAGRAM
                </h2>

                <p className="text-sm text-gray-300 max-w-xl mx-auto mb-8 leading-relaxed">
                    Acompanhe de perto a minha rotina na oficina, os acertos no dinamômetro, passagens na pista e cada etapa da preparação do meu Civic 177 rumo aos Estados Unidos.
                </p>

                <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 bg-mm-orange hover:bg-mm-orange-hover text-black font-black uppercase text-xs sm:text-sm tracking-widest px-8 py-4 transition-all duration-200 shadow-[0_0_25px_rgba(255,107,0,0.4)] hover:shadow-[0_0_35px_rgba(255,107,0,0.6)] hover:-translate-y-0.5"
                >
                    <Instagram size={20} className="text-black stroke-[2.3]" />
                    <span>@MALTONCOIMBRA</span>
                    <ArrowUpRight size={16} className="text-black stroke-[2.5]" />
                </a>
            </section>

            {/* ========================================================= */}
            {/* 7. RODAPÉ LIMPO E INDEPENDENTE                            */}
            {/* ========================================================= */}
            <footer className="bg-[#070707] border-t border-[#1c1c1c] py-12 px-4 text-center text-xs text-gray-500 font-racing">
                <div className="max-w-xl mx-auto text-center space-y-3">
                    <span className="font-bold text-white uppercase tracking-wider block text-base font-racing">
                        MALTON COIMBRA 177 // USA TOUR 2027
                    </span>
                    <p className="text-xs text-gray-400 leading-relaxed font-racing">
                        Site oficial da campanha para levar o Honda Civic recordista mundial aos Estados Unidos.
                    </p>
                    <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-tactical text-gray-300">
                        <a 
                            href={`https://wa.me/${WHATSAPP_RAW}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-mm-orange transition-colors flex items-center gap-1.5"
                        >
                            <span>📱 WhatsApp:</span>
                            <strong className="text-white">{CONTACT_PHONE}</strong>
                        </a>
                        <span className="text-[#333]">|</span>
                        <a 
                            href={`mailto:${CONTACT_EMAIL}`} 
                            className="hover:text-mm-orange transition-colors flex items-center gap-1.5"
                        >
                            <span>✉️ E-mail:</span>
                            <strong className="text-white">{CONTACT_EMAIL}</strong>
                        </a>
                    </div>
                </div>

                <p className="mt-8 text-[11px] text-gray-600 font-tactical">
                    &copy; {new Date().getFullYear()} Malton Coimbra. Todos os direitos reservados.
                </p>
            </footer>

            {/* Modal de Checkout Pix Transparente */}
            {isPixModalOpen && (
                <div 
                    className="fixed inset-0 bg-black/85 backdrop-blur-md z-[9999] flex items-center justify-center p-4 overflow-y-auto"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setIsPixModalOpen(false);
                    }}
                >
                    <div className="bg-[#0b0b0b] border border-[#2e2e2e] w-full max-w-lg p-6 sm:p-8 text-gray-200 shadow-2xl relative my-auto">
                        <button
                            type="button"
                            onClick={() => setIsPixModalOpen(false)}
                            className="absolute top-4 right-4 bg-[#161616] hover:bg-mm-orange hover:text-black border border-[#333] text-gray-400 w-8 h-8 flex items-center justify-center transition-colors"
                        >
                            <X size={16} />
                        </button>

                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-mm-orange font-black">⚡</span>
                            <h3 className="text-sm font-black text-white uppercase tracking-wider">
                                Pagamento Pix // Camiseta USA Tour
                            </h3>
                        </div>
                        <p className="text-xs text-gray-400 mb-5">
                            Camiseta Oficial Malton Coimbra 177 • Tamanho: <strong className="text-mm-orange">{selectedSize}</strong>
                        </p>

                        {/* Formulário de Entrega */}
                        <div className="border border-[#1f1f1f] bg-[#050505] p-4 mb-4 space-y-3">
                            <span className="text-[10px] font-black text-mm-orange uppercase tracking-wider block">
                                1. DADOS PARA ENVIO DA CAMISETA (MELHOR ENVIO)
                            </span>

                            <div>
                                <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">
                                    Nome Completo *
                                </label>
                                <input
                                    type="text"
                                    value={customerData.name}
                                    onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                                    placeholder="Seu nome completo"
                                    className="w-full bg-black border border-[#2e2e2e] text-white p-2.5 text-xs focus:outline-none focus:border-mm-orange"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                <div>
                                    <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">
                                        CPF (Exigido pelo Melhor Envio) *
                                    </label>
                                    <input
                                        type="text"
                                        value={customerData.cpf}
                                        onChange={(e) => setCustomerData({ ...customerData, cpf: formatCpf(e.target.value) })}
                                        placeholder="000.000.000-00"
                                        maxLength={14}
                                        className="w-full bg-black border border-[#2e2e2e] text-white p-2.5 text-xs focus:outline-none focus:border-mm-orange"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">
                                        WhatsApp para Rastreio *
                                    </label>
                                    <input
                                        type="text"
                                        value={customerData.phone}
                                        onChange={(e) => setCustomerData({ ...customerData, phone: formatPhone(e.target.value) })}
                                        placeholder="(11) 90000-0000"
                                        maxLength={15}
                                        className="w-full bg-black border border-[#2e2e2e] text-white p-2.5 text-xs focus:outline-none focus:border-mm-orange"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2.5">
                                <div className="col-span-2">
                                    <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">
                                        Rua / Logradouro *
                                    </label>
                                    <input
                                        type="text"
                                        value={customerData.street}
                                        onChange={(e) => setCustomerData({ ...customerData, street: e.target.value })}
                                        placeholder="Rua, Avenida..."
                                        className="w-full bg-black border border-[#2e2e2e] text-white p-2.5 text-xs focus:outline-none focus:border-mm-orange"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">
                                        Número *
                                    </label>
                                    <input
                                        type="text"
                                        value={customerData.number}
                                        onChange={(e) => setCustomerData({ ...customerData, number: e.target.value })}
                                        placeholder="123"
                                        className="w-full bg-black border border-[#2e2e2e] text-white p-2.5 text-xs focus:outline-none focus:border-mm-orange"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2.5">
                                <div>
                                    <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">
                                        Complemento
                                    </label>
                                    <input
                                        type="text"
                                        value={customerData.complement}
                                        onChange={(e) => setCustomerData({ ...customerData, complement: e.target.value })}
                                        placeholder="Apto, Bloco..."
                                        className="w-full bg-black border border-[#2e2e2e] text-white p-2.5 text-xs focus:outline-none focus:border-mm-orange"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">
                                        Bairro *
                                    </label>
                                    <input
                                        type="text"
                                        value={customerData.neighborhood}
                                        onChange={(e) => setCustomerData({ ...customerData, neighborhood: e.target.value })}
                                        placeholder="Bairro"
                                        className="w-full bg-black border border-[#2e2e2e] text-white p-2.5 text-xs focus:outline-none focus:border-mm-orange"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2.5">
                                <div>
                                    <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">
                                        Cidade / UF
                                    </label>
                                    <input
                                        type="text"
                                        value={customerData.city}
                                        readOnly
                                        className="w-full bg-black/60 border border-[#222] text-gray-400 p-2.5 text-xs"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">
                                        CEP
                                    </label>
                                    <input
                                        type="text"
                                        value={customerData.cep || cep}
                                        readOnly
                                        className="w-full bg-black/60 border border-[#222] text-gray-400 p-2.5 text-xs"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Pagamento Pix */}
                        <div className="border border-[#1f1f1f] bg-black p-4 text-center">
                            <span className="text-[10px] font-black text-mm-orange uppercase tracking-wider block mb-3">
                                2. PAGAMENTO VIA QR CODE OU CHAVE PIX
                            </span>

                            {/* Card Chave Pix Direta */}
                            <div className="bg-[#111] border border-[#222] p-2.5 mb-3 flex items-center justify-between text-left">
                                <div>
                                    <span className="text-[10px] text-gray-400 uppercase font-bold block">
                                        Chave Pix (CPF Oficial):
                                    </span>
                                    <span className="text-xs font-mono font-bold text-white select-all">
                                        {PIX_CHAVE}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleCopyChave}
                                    className={`px-2.5 py-1 text-[11px] font-bold border transition-colors flex items-center gap-1 ${
                                        copiedChave
                                            ? 'bg-emerald-500 text-black border-emerald-500'
                                            : 'bg-[#1e1e1e] hover:bg-mm-orange hover:text-black text-gray-200 border-[#444]'
                                    }`}
                                >
                                    {copiedChave ? <Check size={12} /> : <Copy size={12} />}
                                    <span>{copiedChave ? 'Copiada!' : 'Copiar Chave'}</span>
                                </button>
                            </div>

                            {/* QR Code Img - Estável e Estático */}
                            {pixPayload && (
                                <div className="w-48 h-48 bg-white p-2 mx-auto mb-3 border-2 border-mm-orange">
                                    <img
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pixPayload)}`}
                                        alt="QR Code Pix Estático"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            )}

                            <div className="text-sm font-black text-white mb-1">
                                TOTAL: <span className="text-mm-orange">R$ {totalOrder.toFixed(2).replace('.', ',')}</span>
                            </div>
                            <span className="text-[10px] text-gray-400 block mb-3">
                                (Camiseta R$ 99,90 + Frete {selectedQuote ? selectedQuote.formatted_price : ''})
                            </span>

                            <div className="flex gap-1.5 mb-3">
                                <input
                                    type="text"
                                    readOnly
                                    value={pixPayload}
                                    className="flex-1 bg-[#0a0a0a] border border-[#333] text-gray-400 text-[10px] px-2.5 py-2 font-mono truncate"
                                />
                                <button
                                    type="button"
                                    onClick={handleCopyPix}
                                    className={`px-3 py-2 text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                                        copiedPix
                                            ? 'bg-emerald-500 text-black'
                                            : 'bg-[#1a1a1a] hover:bg-mm-orange hover:text-black text-white border border-[#333]'
                                    }`}
                                >
                                    {copiedPix ? <Check size={14} /> : <Copy size={14} />}
                                    <span>{copiedPix ? 'Copiado!' : 'Copiar Código'}</span>
                                </button>
                            </div>

                            <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-[#1f1f1f]">
                                <span className="flex items-center gap-1 text-[11px]">
                                    <Clock size={12} className="text-mm-orange" />
                                    Expira em:
                                </span>
                                <span className="text-mm-orange font-black text-xs font-mono">
                                    {formatTime(pixTimeLeft)}
                                </span>
                            </div>
                        </div>

                        {/* Botão Enviar Comprovante */}
                        <button
                            type="button"
                            onClick={handleSendWhatsAppProof}
                            className="w-full mt-4 bg-[#25D366] hover:bg-[#1EBE5D] text-black font-black uppercase text-xs sm:text-sm tracking-wider py-3.5 px-4 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,211,102,0.3)] transition-all cursor-pointer"
                        >
                            <MessageCircle size={18} className="text-black" />
                            <span>ENVIAR COMPROVANTE NO WHATSAPP ➔</span>
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}
