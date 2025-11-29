// src/app/page.tsx

import Link from "next/link";
import Header from "@/components/marketing/Header";
import Footer from "@/components/marketing/Footer";
import TitleItem from "@/components/marketing/TitleItem";
import FeatureItem from "@/components/marketing/FeatureItem";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Check,
  Wrench,
  Calendar,
  Users,
  FileText,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Hero from "@/components/marketing/Hero";

export default function HomePage() {
  return (
    <div className="">
      {/* HERO SECTION */}
      <Header />

      {/* HERO LARGE */}
      <Hero />

      {/* SECTION FONCTIONNALITÉS */}
      <section
        id="features"
        className="bg-white flex flex-col items-center justify-center gap-12 py-10 sm:py-20"
      >
        <div className="container flex flex-col lg:flex-row px-5 sm:px-0 items-center gap-12">
          <div className="flex lg:w-1/2">
            <Image
              src="images/img-feature-1.svg"
              alt="Features"
              width={800}
              height={600}
            />
          </div>
          <div className="flex flex-col gap-12 lg:w-1/2">
            <TitleItem text="Accessible depuis ordinateur, tablette ou mobile, Goparo fonctionne sans installation. Votre garage reste opérationnel partout : bureau, atelier ou déplacement. Un SaaS simple, flexible et toujours à jour.">
              Accessible partout,{" "}
              <span className="text-emerald-500">
                aucun logiciel à installer
              </span>
            </TitleItem>
            <TitleItem text="Goparo vous prépare dès maintenant à la réforme 2026 : factures conformes, archivage sécurisé et exports normalisés. Restez en règle sans effort et évitez les risques de non-conformité.">
              Facturation électronique 2026{" "}
              <span className="text-orange-500">conforme</span>
            </TitleItem>
          </div>
        </div>

        <div className="container flex flex-col lg:flex-row px-5 sm:px-0 items-center gap-12">
          <div className="flex lg:w-1/2">
            <Image
              src="images/img-feature-1.svg"
              alt="Features"
              width={800}
              height={600}
            />
          </div>
          <div className="flex flex-col lg:order-first gap-12 lg:w-1/2">
            <TitleItem text="Vos données sont chiffrées, sauvegardées et hébergées en France, garantissant confidentialité et conformité RGPD. Accédez-y à tout moment en toute sécurité, où que vous soyez.">
              Données sécurisées et hébergées{" "}
              <span className="text-emerald-500">en France</span>
            </TitleItem>
            <div>
              <Badge className="bg-orange-100 text-orange-600 px-4 py-2 mb-2 rounded-full font-semibold">
                Exlusivité Goparo
              </Badge>

              <TitleItem text="Présentez vos services, promotions et véhicules en quelques clics. Gagnez en visibilité, attirez plus de clients et gérez facilement votre image en ligne depuis Goparo.">
                Votre <span className="text-orange-500">site web inclus </span>{" "}
                et 100% administrable
              </TitleItem>
            </div>
          </div>
        </div>

        <Link href="/register">
          <Button size="lg">Commencer gratuitement</Button>
        </Link>
      </section>

      {/* SECTION POURQUOI */}
      <section id="why" className="px-5 sm:px-0">

        <div className="container bg-linear-to-br from-orange-500 to-orange-400 text-white text-center mx-auto rounded-3xl px-5 sm:px-10 py-10 sm:py-15">
          
          <div className="lg:w-3/4 mx-auto mb-6 lg:mb-12">
            <Badge className="bg-white text-orange-500 px-4 py-2 mb-2 rounded-full font-semibold">
              Conçu pour les garages
            </Badge>
            <TitleItem text="Conçu spécifiquement pour les garages — simple à prendre en main, complet dans les fonctions, et conforme aux normes les plus strictes.">
              Pourquoi choisir Goparo ?
            </TitleItem>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-10 mx-auto xl:w-4/5">
            <FeatureItem
              title="Conformité légale garantie"
              text="Goparo respecte toutes les exigences de la facturation électronique obligatoire (DGFiP 2026). Formats structurés, archivage légal, QR-codes règlementaires, suivi TVA automatique. Aucune mise à jour technique à prévoir : vous êtes protégé."
            />
            <FeatureItem
              title="Site web professionnel inclus"
              text="Le seul logiciel garage qui génère automatiquement votre site internet et le met à jour en temps réel. Bannières, services, actualités, véhicules à vendre : tout est synchronisé depuis votre back-office. Sous-domaine personnalisé inclus, domaine custom en option."
            />
            <FeatureItem
              title="Accès comptable dédié"
              text="Votre expert-comptable accède directement à vos factures. Exports automatiques vers Sage, EBP, ACD. Formats FEC, CSV, PDF. Vos données comptables sont prêtes en un clic chaque mois."
            />
            <FeatureItem
              title="Publication automatique des véhicules"
              text="Ajoutez un véhicule VO/VN dans Goparo, et il apparaît instantanément sur votre site vitrine avec photos, détails techniques, prix et formulaire de contact. Zéro double saisie, gain de temps maximal."
            />
          </div>
        </div>
      </section>

      {/* SECTION TARIFS */}
      <section
        id="pricing"
        className="py-24 bg-gray-100 border-t border-gray-300"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-light text-center mb-16">
            Tarification
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <PricingCard
              title="Starter"
              price="19€/mois"
              features={[
                "Gestion clients",
                "Gestion factures",
                "Suivi véhicules",
                "Site vitrine inclus",
              ]}
            />

            <PricingCard
              highlighted
              title="Pro"
              price="29€/mois"
              features={[
                "Tout le Starter",
                "Exports comptables",
                "Personnalisation complète",
                "Support prioritaire",
              ]}
            />

            <PricingCard
              title="Option Planning"
              price="+9€/mois"
              features={[
                "Planning mécaniciens",
                "Rendez-vous clients",
                "Gestion tâches atelier",
              ]}
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

function PricingCard({
  title,
  price,
  features,
  highlighted,
}: {
  title: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}) {
  return (
    <Card
      className={`rounded-3xl shadow-sm border-gray-200 ${
        highlighted ? "bg-blue-600 text-white" : ""
      }`}
    >
      <CardHeader>
        <CardTitle className="text-center text-2xl font-light">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p
          className={`text-3xl font-semibold mb-6 ${
            highlighted ? "text-white" : "text-blue-700"
          }`}
        >
          {price}
        </p>
        <div className="space-y-3">
          {features.map((f) => (
            <div
              key={f}
              className="flex items-center justify-center gap-2 text-sm"
            >
              <Check
                className={`${highlighted ? "text-white" : "text-blue-600"}`}
                size={16}
              />
              <span className="font-light">{f}</span>
            </div>
          ))}
        </div>
        <Link href="/register">
          <Button
            className={`mt-8 w-full rounded-xl ${
              highlighted ? "bg-white text-blue-700" : "bg-blue-600 text-white"
            }`}
          >
            S'inscrire
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
