import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Modalities from '@/components/Modalities';
import Products from '@/components/Products';
import Authority from '@/components/Authority';
import Mural from '@/components/Mural';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-mm-text selection:bg-mm-orange selection:text-black">
      <Navigation />
      <Hero />
      <Modalities />
      <Products />
      <Authority />
      <Mural />
      <Footer />
    </main>
  );
}
