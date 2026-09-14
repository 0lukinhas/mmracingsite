import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Malton Coimbra 177 | USA Tour 2027 - World Record All Motor Nitro',
    description: 'Apoie a USA Tour 2027 de Malton Coimbra 177, piloto e preparador do Honda mais rápido do mundo com +90% de Nitrometano. Garanta a camiseta oficial da missão por R$ 99,90.',
    openGraph: {
        title: 'Malton Coimbra 177 | USA Tour 2027',
        description: 'O Honda mais rápido do mundo rumo às pistas dos EUA. Camiseta oficial com 100% da renda revertida para a tour.',
        images: [
            {
                url: '/malton/camiseta-arte.jpg',
                width: 1200,
                height: 1500,
                alt: 'USA Tour Malton Coimbra 177 Arte Camiseta Oficial',
            },
        ],
    },
};

export default function MaltonUsaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
