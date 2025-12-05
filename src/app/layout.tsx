import type { Metadata } from "next";
import { raleway } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Logiciel de Gestion et Facturation pour Garages – Goparo | Simplifiez votre quotidien",
    template: "%s | GoParo"
  },
  description: "Goparo automatise la gestion et la facturation de votre garage. Créez des devis en 1 clic, suivez vos clients et boostez votre productivité. Essayez gratuitement dès aujourd’hui !",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: ["logiciel", "application", "garage", "gestion", "facturation", "factures", "véhicules", "automobile"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Goparo",
    description: "Application de facturation pour garage",
    url: "https://goparo.fr",
    siteName: "Goparo",
    type: "website",
  },
  appleWebApp: {
    title: "Goparo",
    capable: true,
    statusBarStyle: "default",
  },
  twitter: {
    card: "summary_large_image",
    title: "Goparo",
    description: "Application de facturation pour garage",
  },
  alternates: {
    canonical: "https://goparo.fr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${raleway.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
