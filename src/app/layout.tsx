import type { Metadata } from "next";
import { Nunito } from 'next/font/google';
import "./globals.css";
import Script from 'next/script';

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default:
      "Logiciel de Gestion et Facturation pour Garages – Goparo | Simplifiez votre quotidien",
    template: "%s | GoParo",
  },
  description:
    "Goparo automatise la gestion et la facturation de votre garage. Créez des devis en 1 clic, suivez vos clients et boostez votre productivité. Essayez gratuitement dès aujourd'hui !",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    'logiciel garage automobile',
    'gestion garage',
    'facturation garage',
    'SaaS garage',
    'logiciel mécanique',
    'gestion atelier',
    'facturation DGFIP 2026',
    'devis facture garage',
    'gestion stock pièces',
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Logiciel de Gestion et Facturation pour Garages – Goparo | Simplifiez votre quotidien",
    description: "Goparo automatise la gestion et la facturation de votre garage. Créez des devis en 1 clic, suivez vos clients et boostez votre productivité. Essayez gratuitement dès aujourd'hui !",
    url: "https://goparo.fr",
    siteName: "Goparo",
    type: "website",
  },
  appleWebApp: {
    title: "Goparo - Logiciel de Gestion pour Garages Automobiles",
    capable: true,
    statusBarStyle: "default",
  },
  twitter: {
    card: "summary_large_image",
    title: "Goparo - Logiciel de Gestion pour Garages Automobiles",
    description: "Solution complète pour gestion garages automobiles : facturation, gestion clients, véhicules.",
  },
  alternates: {
    canonical: "https://goparo.fr",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link 
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/tarteaucitronjs@latest/css/tarteaucitron.min.css" 
        />
        <Script 
          src="/tarteaucitron-init.js" 
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${nunito.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}