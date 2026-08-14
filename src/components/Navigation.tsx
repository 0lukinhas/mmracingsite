'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-mm-gray/20' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-24">

                    <div className="flex-shrink-0 flex items-center">
                        <span className="text-xl font-bold tracking-tighter uppercase text-white">
                            MM RACING<span className="text-mm-orange">.</span>FUEL
                        </span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8 text-sm tracking-widest text-mm-muted">
                        <a href="#inicio" className="text-white hover:text-mm-orange transition-colors">INÍCIO</a>
                        <a href="#combustiveis" className="hover:text-mm-orange transition-colors">COMBUSTÍVEIS</a>
                        <a href="#modalidades" className="hover:text-mm-orange transition-colors">MODALIDADES</a>
                        <a href="#dna" className="hover:text-mm-orange transition-colors">NOSSO DNA</a>
                        <a href="#pilotos" className="hover:text-mm-orange transition-colors">PILOTOS MM</a>
                    </div>

                    <div className="hidden md:flex">
                        <a href="#contato" className="bg-mm-orange text-black hover:bg-mm-orange-hover font-bold px-6 py-3 uppercase tracking-wider transition-all rounded-none ring-1 ring-mm-orange shadow-[0_0_15px_rgba(255,107,0,0.3)] hover:shadow-[0_0_25px_rgba(255,107,0,0.6)]">
                            Fale com a nossa equipe
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
                            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden bg-black/95 backdrop-blur-md border-b border-mm-gray"
                >
                    <div className="px-2 pt-2 pb-6 space-y-4 flex flex-col items-center">
                        <a href="#inicio" className="text-white block px-3 py-2 text-base tracking-widest uppercase" onClick={() => setIsMobileMenuOpen(false)}>Início</a>
                        <a href="#combustiveis" className="text-mm-muted hover:text-white block px-3 py-2 text-base tracking-widest uppercase" onClick={() => setIsMobileMenuOpen(false)}>Combustíveis</a>
                        <a href="#modalidades" className="text-mm-muted hover:text-white block px-3 py-2 text-base tracking-widest uppercase" onClick={() => setIsMobileMenuOpen(false)}>Modalidades</a>
                        <a href="#dna" className="text-mm-muted hover:text-white block px-3 py-2 text-base tracking-widest uppercase" onClick={() => setIsMobileMenuOpen(false)}>Nosso DNA</a>
                        <a href="#pilotos" className="text-mm-muted hover:text-white block px-3 py-2 text-base tracking-widest uppercase" onClick={() => setIsMobileMenuOpen(false)}>Pilotos MM</a>
                        <a href="#contato" className="bg-mm-orange text-black font-bold px-6 py-3 w-[90%] text-center uppercase tracking-wider mt-4" onClick={() => setIsMobileMenuOpen(false)}>
                            Fale com a nossa equipe
                        </a>
                    </div>
                </motion.div>
            )}
        </nav>
    );
}
