// src/app/page.tsx

import Link from "next/link";
import Header from "@/components/marketing/Header";
import Footer from "@/components/marketing/Footer";
import TitleItem from "@/components/marketing/TitleItem";
import FeatureItem from "@/components/marketing/FeatureItem";
import FeaturesSection from "@/components/marketing/FeaturesSection";
import Stats from "@/components/marketing/stats";
import FeaturesDetailsSection from "@/components/marketing/FeaturesDetailsSection";
import PrincingSection from "@/components/marketing/PricingSection";
import FaqSection from "@/components/marketing/FaqSection";
import Contact  from "@/components/marketing/Contact";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Hero from "@/components/marketing/Hero";
import { success } from "zod";

export default function HomePage() {
  return (
    <>
      {/* HERO SECTION */}
      <Header />

      {/* HERO LARGE */}
      <Hero />

      {/* SECTION FONCTIONNALITÉS */}
      <section
        id="features"
        className="flex flex-col items-center justify-center gap-12 py-10 sm:py-20"
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
            <Badge className="bg-white text-orange-500 px-4 py-2 mb-4 rounded-full font-semibold">
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

      {/* SECTION BESOIN */}
      <section className="bg-slate-100 mt-10 lg:mt-20 py-8 lg:py-20">
        <div className="max-w-6xl text-center mx-auto pb-10 lg:pb-20 px-6">
          <TitleItem text="Un ensemble d'outils pensés pour la gestion complète d'un garage, accessible partout.">
            Tout ce dont un{" "}
            <span className="text-violet-500">garage moderne</span> a besoin
          </TitleItem>
        </div>

        <FeaturesSection />

        {/* <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-5">
            <FeatureCard
              title="Facturation conforme"
              icon={FileText}
              content="Créez, envoyez et archivez des factures conformes DGFiP. Numérotation légale, piste d'audit, archivage sécurisé, envoi automatique."
            />

            <FeatureCard
              title="Gestion clients & véhicules"
              icon={Users}
              content="Fiches complètes avec historique des interventions, documents, photos. Recherche instantanée et export CSV."
            />

            <FeatureCard
              title="Site vitrine automatique"
              icon={Globe}
              content="Votre site professionnel généré automatiquement. Personnalisable, rapide, SEO optimisé. Sous-domaine inclus."
            />
            <FeatureCard
              title="Gestion pièces & fournisseurs"
              icon={Wrench}
              content="Catalogue interne, suivi des stocks, alertes de réapprovisionnement, gestion complète de vos fournisseurs."
            />

            <FeatureCard
              title="Vente véhicules VO/VN"
              icon={Car}
              content="Gestion complète et publication automatique sur votre site vitrine. Photos, détails, prix, tout est synchronisé."
            />

            <FeatureCard
              title="Planning atelier intelligent"
              icon={CalendarCheck}
              content="Planifiez vos interventions, assignez vos mécaniciens, visualisez votre charge de travail en temps réel."
            />
          </div>
        </div> */}

        <div className="mx-auto px-6 text-center">
          <Link href="#pricing">
            <Button
              variant="success"
              size="lg"
              className="w-full sm:w-auto mt-5 lg:mt-10"
            >
              Découvrir notre offre complète
            </Button>
          </Link>
        </div>
      </section>

      {/* IMAGE FULL */}
      <Image
        src="/images/full-desktop.svg"
        alt="Full Desktop"
        width={1920}
        height={600}
        className="w-full lg:max-w-6xl mx-auto my-5 lg:my-10"
      />

      {/* SECTION MODERNISER */}
      <section className="flex flex-col items-center justify-center gap-12 pb-10 sm:pb-20">
        <div className="container flex flex-col lg:flex-row px-5 sm:px-0 items-center gap-12">
          <div className="flex flex-col gap-12 lg:w-1/2">
            <TitleItem text="Digitalisez vos process, simplifiez la gestion quotidienne et offrez une expérience moderne à vos équipes comme à vos clients.">
              <span className="text-orange-500">Modernisez</span> chaque étape
            </TitleItem>
            <TitleItem text="Centralisez planning, réparations, factures et ventes au même endroit pour gagner du temps et réduire les erreurs.">
              <span className="text-orange-500">Accélérez</span> vos opérations
            </TitleItem>
          </div>
          <div className="flex lg:w-1/2">
            <TitleItem text="Développez votre garage grâce à une solution simple et complète : améliorez votre visibilité en ligne, optimisez vos processus internes et offrez un meilleur service à vos clients. GoParo centralise toutes vos opérations pour vous aider à gagner du temps, augmenter vos revenus et faire grandir votre activité sereinement.">
              <span className="text-orange-500">Développez</span> votre garage
              avec une solution simple
            </TitleItem>
          </div>
        </div>
      </section>

      <Stats />

      {/* SECTION FONCTIONNALITÉS DETAILLEES*/}
      <section className="items-center justify-center my-10 lg:my-20">
        <div className="text-center mx-auto pb-5 lg:pb-10 px-6">
          <TitleItem
            className="sm:w-4/5 lg:w-2/3 mx-auto"
            text="De la facturation électronique à la gestion des stocks, découvrez comment chaque outil peut transformer votre activité."
          >
            Découvrez Goparo <span className="text-violet-500">en détail</span>
          </TitleItem>
        </div>

        <FeaturesDetailsSection />
      </section>

      {/* SECTION PRICING */}
      <section
        id="pricing"
        className="flex justify-center bg-slate-100 py-10 lg:py-20"
      >
        <div className="text-center mx-auto pb-5 lg:pb-10 px-6">
          <Badge className="bg-violet-100 text-violet-600 px-4 py-2 mb-4 rounded-full font-semibold">
            Tarification simple et sans surprise
          </Badge>
          <TitleItem
            className="md:w-2/3 mx-auto"
            text="Sans engagement. Passez à l'offre supérieure à tout moment. Annulation en un clic."
          >
            Des tarifs clairs, <span className="text-emerald-500">adaptés</span>{" "}
            à votre garage
          </TitleItem>

          <PrincingSection />
        </div>
      </section>

      {/* <section
        id="pricing"
        className="py-24 bg-slate-100"
      >
        <TitleItem text="Un ensemble d'outils pensés pour la gestion complète d'un garage, accessible partout.">
          Tout ce dont un{" "}
          <span className="text-violet-500">garage moderne</span> a besoin
        </TitleItem>
        <div className="max-w-6xl mx-auto px-6">
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
      </section> */}

      {/* SECTION CTA */}
      <section className="flex flex-col items-center justify-center bg-emerald-500 text-white py-10 sm:py-20 px-6">
        <div className="max-w-6xl text-center mx-auto mb-6">
          <TitleItem text="Rejoignez les garages qui modernisent leur gestion avec Goparo. Commencez gratuitement dès aujourd'hui et découvrez la simplicité d'une solution tout-en-un conçue pour vous.">
            Prêt à transformer la gestion de votre garage ?
          </TitleItem>
        </div>
        <Link href="/register">
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-emerald-500"
          >
            Commencer gratuitement
          </Button>
        </Link>
      </section>

      {/* SECTION FAQ */}
      <FaqSection />

      {/* SECTION CONTACT FORM */}
      <section className="flex flex-col items-center justify-center mb-10 lg:mb-20 px-6">
        <div className="max-w-6xl text-center mx-auto mb-6">
          <TitleItem 
          className="mb-10 lg:mb-15"
          text="Laissez-nous vos coordonnées, nous vous répondrons sous 24h.">
            Vous avez une autre{" "}
            <span className="text-violet-600">question ?</span>
          </TitleItem>
        <Contact />
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
