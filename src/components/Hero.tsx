'use client';

import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section id="inicio" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-black">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1580971271618-b21703ab3dcd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=80"
                    alt="Drag Racing Context"
                    className="w-full h-full object-cover opacity-30 object-center grayscale mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 z-10"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full pt-20">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="inline-block bg-mm-gray/50 border border-mm-orange/20 px-3 py-1 mb-6 rounded-none backdrop-blur-sm">
                            <span className="text-mm-orange font-bold text-xs tracking-[0.2em] font-mono">TELEMETRIA ATIVADA // SYNC OK</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight leading-[1.1] mb-8 font-mono">
                            Seja rápido em <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-mm-orange to-red-600">qualquer terreno!</span> <br />
                            <span className="text-2xl md:text-4xl lg:text-5xl block mt-4 text-gray-300 font-normal tracking-tighter">Combustível de quem respira velocidade.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl leading-relaxed tracking-wide">
                            Do barro do Off-Road aos 400 metros do Drag Racing. Nós distribuímos a química exata da vitória. Você tem o fogo para competir? <strong className="text-white">Nós temos o combustível.</strong>
                        </p>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block"
                        >
                            <a href="#contato" className="bg-mm-orange text-black text-lg md:text-xl font-bold px-8 py-5 uppercase tracking-widest inline-flex items-center gap-3 transition-all hover:bg-mm-orange-hover outline-none ring-offset-black ring-offset-2 focus:ring-2 focus:ring-mm-orange shadow-[0_0_30px_rgba(255,107,0,0.4)]">
                                FALE COM A NOSSA EQUIPE
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Telemetry decoration */}
            <div className="absolute right-10 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-20 text-mm-gray font-mono text-[10px] hidden lg:flex tracking-widest">
                <span>AFR: 12.8</span>
                <span>BOOST: 2.1 BAR</span>
                <span>EGT: 850 C</span>
                <span>RPM: 9200</span>
                <div className="w-[1px] h-32 bg-mm-gray mt-4 self-center opacity-30"></div>
            </div>
        </section>
    );
}
