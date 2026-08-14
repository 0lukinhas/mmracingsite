import { Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-black border-t border-mm-gray font-mono pt-16 pb-8 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0 mb-12">

                    {/* Logo & Slogan */}
                    <div className="text-center md:text-left">
                        <span className="text-2xl font-black tracking-tighter uppercase text-white block mb-2">
                            MM RACING<span className="text-mm-orange">.</span>FUEL
                        </span>
                        <p className="text-mm-orange font-bold text-sm tracking-widest uppercase mb-4">
                            MM Racing, apaixonados por força.
                        </p>
                    </div>

                    {/* Socials */}
                    <div className="flex gap-6">
                        <a href="#" className="text-mm-muted hover:text-mm-orange transition-colors">
                            <Instagram size={24} />
                        </a>
                        <a href="#" className="text-mm-muted hover:text-mm-orange transition-colors">
                            <Youtube size={24} />
                        </a>
                        <a href="#" className="text-mm-muted hover:text-mm-orange transition-colors">
                            <Facebook size={24} />
                        </a>
                    </div>
                </div>

                {/* Links */}
                <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4 text-xs tracking-widest uppercase text-mm-muted mb-12 border-b border-mm-gray pb-12">
                    <a href="#" className="hover:text-white transition-colors">Especificações Técnicas</a>
                    <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
                    <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
                </div>

                {/* Disclaimer */}
                <div className="text-center flex flex-col items-center justify-center">
                    <div className="w-full flex justify-center mb-4">
                        <div className="bg-mm-orange/20 border border-mm-orange px-4 py-2 text-[10px] text-mm-orange tracking-widest uppercase max-w-xl text-center">
                            Aviso: Produtos destinados exclusivamente para uso em competições automobilísticas.
                        </div>
                    </div>
                    <p className="text-[10px] text-mm-gray-500 uppercase tracking-widest">
                        &copy; {new Date().getFullYear()} MM Racing Fuel. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
