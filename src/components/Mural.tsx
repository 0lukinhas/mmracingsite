'use client';

import { motion } from 'framer-motion';

export default function Mural() {
    const images = [
        "https://images.unsplash.com/photo-1549488344-c1fa178e5898?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1579782534571-fb814fece2ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1623886534978-43d9426f0bea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1588636402447-fd5e970b5d92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ];

    return (
        <section id="pilotos" className="bg-mm-dark py-24 border-t border-mm-gray/30 relative font-mono">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-16 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter uppercase mb-4">
                            Mural MM Racing
                        </h2>
                        <p className="text-mm-muted">Fique conectado. Nossos parceiros e clientes em ação.</p>
                    </div>
                    <a href="#" className="hidden md:inline-flex items-center gap-2 text-mm-orange hover:text-white uppercase tracking-widest text-sm transition-colors border-b border-mm-orange pb-1">
                        VER TELEMETRIA
                    </a>
                </div>

                {/* Asymmetrical Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] mb-16">

                    <motion.div
                        className="col-span-2 row-span-2 group overflow-hidden relative"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105"
                            style={{ backgroundImage: `url(${images[0]})` }}></div>
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
                        <div className="absolute bottom-4 left-4 text-xs font-bold text-mm-orange tracking-widest bg-black/80 px-2 py-1">@MMRACINGFUEL</div>
                    </motion.div>

                    <motion.div
                        className="group overflow-hidden relative"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105"
                            style={{ backgroundImage: `url(${images[1]})` }}></div>
                    </motion.div>

                    <motion.div
                        className="group overflow-hidden relative"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105"
                            style={{ backgroundImage: `url(${images[2]})` }}></div>
                    </motion.div>

                    <motion.div
                        className="group overflow-hidden relative"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <div className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105"
                            style={{ backgroundImage: `url(${images[3]})` }}></div>
                    </motion.div>

                    <motion.div
                        className="group overflow-hidden relative"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105"
                            style={{ backgroundImage: `url(${images[4]})` }}></div>
                    </motion.div>

                </div>

                {/* Newsletter Integrated */}
                <div id="contato" className="max-w-4xl mx-auto bg-[#0a0a0a] border border-[#1a1a1a] p-8 md:p-14 relative overflow-hidden flex flex-col md:flex-row gap-8 items-center justify-between">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-mm-orange opacity-10 filter blur-[80px]"></div>

                    <div className="text-center md:text-left relative z-10 md:w-1/2">
                        <h3 className="text-3xl md:text-4xl font-bold uppercase text-white mb-2 leading-none">ASSINE A <br />TELEMETRIA.</h3>
                        <p className="text-mm-muted text-sm tracking-widest mt-4">Receba atualizações do laboratório, lançamentos e resultados das pistas.</p>
                    </div>

                    <form className="flex flex-col gap-4 relative z-10 w-full md:w-1/2" onSubmit={(e) => e.preventDefault()}>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="text"
                                placeholder="NOME"
                                className="flex-1 bg-[#111] text-white px-5 py-4 focus:outline-none focus:ring-1 focus:ring-mm-orange transition-all font-mono tracking-widest text-xs uppercase placeholder:text-mm-muted"
                                required
                            />
                            <input
                                type="text"
                                placeholder="SOBRENOME"
                                className="flex-1 bg-[#111] text-white px-5 py-4 focus:outline-none focus:ring-1 focus:ring-mm-orange transition-all font-mono tracking-widest text-xs uppercase placeholder:text-mm-muted"
                                required
                            />
                        </div>
                        <input
                            type="email"
                            placeholder="SEU@EMAIL.COM"
                            className="w-full bg-[#111] text-white px-5 py-4 focus:outline-none focus:ring-1 focus:ring-mm-orange transition-all font-mono tracking-widest text-xs uppercase placeholder:text-mm-muted"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-mm-orange text-black font-bold uppercase tracking-widest px-8 py-4 hover:bg-mm-orange-hover transition-colors w-full sm:w-auto self-start mt-2"
                        >
                            Acelerar
                        </button>
                    </form>
                </div>

            </div>
        </section>
    );
}
