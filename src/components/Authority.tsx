'use client';

import { motion } from 'framer-motion';

export default function Authority() {
    return (
        <section id="dna" className="bg-black relative font-mono">
            <div className="grid grid-cols-1 lg:grid-cols-2">

                {/* Text Half */}
                <div className="flex flex-col justify-center px-6 py-20 lg:px-20 lg:py-32 relative z-10 order-2 lg:order-1 border-r border-mm-gray/30">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-[1px] bg-mm-orange"></div>
                            <span className="text-mm-orange text-xs tracking-[0.2em] font-bold">PROVA SOCIAL // 400M</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight tracking-tighter uppercase">
                            Nós testamos no limite. <br />
                            <span className="text-mm-gray-text hover:text-white transition-colors duration-300">Você acelera com segurança.</span>
                        </h2>

                        <p className="text-mm-muted text-base md:text-lg leading-relaxed max-w-xl">
                            Nós somos a nossa prova de conceito. O Civic mais rápido da América não é apenas um troféu, é o nosso laboratório de testes. Com preparação própria, levamos nossos combustíveis ao extremo antes de distribuí-los.
                        </p>

                        <div className="mt-12 grid grid-cols-2 gap-8 max-w-md border-t border-mm-gray/30 pt-8">
                            <div>
                                <p className="text-4xl font-bold text-mm-orange mb-1">✓</p>
                                <p className="text-xs uppercase tracking-widest text-mm-muted">Laboratório</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-mm-orange mb-1">✓</p>
                                <p className="text-xs uppercase tracking-widest text-mm-muted">Certificação</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Image Half */}
                <div className="relative h-[600px] lg:h-auto order-1 lg:order-2 overflow-hidden group">
                    <motion.div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] scale-100 group-hover:scale-105"
                        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1596700010952-19e34bc8ffbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')` }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    ></motion.div>
                    {/* Grayscale overlay that disappears on hover */}
                    <div className="absolute inset-0 bg-black/60 backdrop-grayscale backdrop-contrast-200 transition-all duration-700 ease-in-out group-hover:backdrop-grayscale-0 group-hover:bg-black/20"></div>

                    <div className="absolute top-6 right-6 border border-mm-orange/50 p-2 text-[10px] text-mm-orange tracking-widest bg-black/50 backdrop-blur-sm">
                        REC ● HONDA CIVIC MM RACING
                    </div>
                </div>

            </div>
        </section>
    );
}
