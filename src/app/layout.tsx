import type { Metadata } from "next";
import { raleway } from "./fonts";
import "./globals.css";
import { RecaptchaProvider } from "@/components/marketing/RecaptchaProvider";
import Script from 'next/script';

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
      {/* Google Tag Manager (partie head) */}
      <Script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="2dad90b4-5262-4f73-89c7-1b1fa1eda12e" data-blockingmode="auto" type="text/javascript" />
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;
          f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
        `}
      </Script>

      <body className={`${raleway.className} antialiased`}>
        {/* Google Tag Manager (partie body - noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <RecaptchaProvider>
          {children}
        </RecaptchaProvider>
      </body>
    </html>
  );
}
