import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// We use Inter exclusively for a clean, modern, and highly readable corporate look.
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Imóvel Zeta | Agência Imobiliária em Portugal',
  description: 'Compre, venda ou arrende casa em Portugal com os especialistas da Imóvel Zeta. A melhor seleção de imóveis com o acompanhamento mais profissional do mercado.',
  keywords: 'imobiliária, portugal, comprar casa, vender casa, apartamentos, moradias, imovel zeta',
  authors: [{ name: 'Imóvel Zeta' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#003DA5',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-PT" className={`${inter.variable}`}>
      <body>
        <main className="min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
