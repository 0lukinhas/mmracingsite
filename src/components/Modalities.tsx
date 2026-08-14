'use client';

import { motion } from 'framer-motion';

const modalities = [
    {
        title: "DRAG RACING & PRO MOD",
        bgUrl: "https://images.unsplash.com/photo-1541443131876-44b03de101c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Combustível de alta octanagem para recordes em 400m."
    },
    {
        title: "OFF-ROAD & MOTOCROSS",
        bgUrl: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Desempenho extremo no barro e na terra."
    },
    {
        title: "TRACK DAYS & CIRCUITO",
        bgUrl: "https://images.unsplash.com/photo-1611016186353-9af58c69a533?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Resistência para curvas em alta RPM."
    },
    {
        title: "STREET PERFORMANCE",
        bgUrl: "https://images.unsplash.com/photo-1629828552636-6e4760ba26c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Consistência laboratorial para seu street de rua."
    }
];

export default function Modalities() {
    return (
        <section id="modalidades" className="bg-black py-20 relative border-t border-mm-gray/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold font-mono text-white tracking-tighter uppercase">
                        Para Quem Fornecemos
                    </h2>
                    <div className="w-24 h-1 bg-mm-orange mt-6"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 lg:h-[600px] shadow-2xl overflow-hidden font-mono border border-mm-gray">
                    {modalities.map((item, index) => (
                        <motion.div
                            key={index}
                            className="relative group h-[300px] lg:h-full cursor-pointer flex flex-col justify-end p-6 border-b lg:border-b-0 lg:border-r border-mm-gray last:border-b-0 last:border-r-0"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            {/* Image that gains color on hover */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-80 scale-100 group-hover:scale-105 origin-center"
                                style={{ backgroundImage: `url(${item.bgUrl})` }}
                            ></div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10 transition-opacity duration-300"></div>

                            <div className="relative z-20">
                                <div className="font-mono text-mm-orange font-bold text-sm tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                    [{index + 1}]
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2 leading-tight uppercase group-hover:text-mm-orange transition-colors duration-300 decoration-none">
                                    {item.title}
                                </h3>
                                <p className="text-mm-text/80 text-sm font-light mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
