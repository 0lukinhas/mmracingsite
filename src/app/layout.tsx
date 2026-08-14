import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MM Racing Fuel | A Química da Vitória",
  description: "Distribuidora oficial de combustíveis de corrida. Do barro do Off-Road aos 400 metros do Drag Racing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${jetBrainsMono.variable} font-mono antialiased bg-black text-mm-text`}>
        {children}
      </body>
    </html>
  );
}
