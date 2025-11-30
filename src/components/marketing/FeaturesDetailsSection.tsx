// frontend/src/components/marketing/FeaturesDetailsSection.tsx

"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import FeatureDetailsCard from "@/components/marketing/FeatureDetailsCard";
import {
  FileText,
  UserRoundCog,
  Wrench,
  Globe,
  CalendarCheck,
  Unplug
} from "lucide-react";

export default function FeaturesDetailsSection() {
  const features = [
    {
      bgColor: "emerald",
      title: "Facturation conforme 2026, sans effort",
      icon: FileText,
      content:
        "Goparo intègre nativement toutes les exigences de la facturation électronique obligatoire. Numérotation légale inviolable, piste d'audit fiable, archivage sécurisé conforme, formats structurés prêts pour transmission aux plateformes PDP/PPF.",
      features: [
        "Génération devis, ordres de réparation et factures",
        "Numérotation légale automatique",
        "Envoi automatique aux plateformes PDP/PPF",
        "Rappels de paiement programmables",
        "Journaux d'audit consultables à tout moment",
        "Export comptable automatique (Sage, EBP, CSV)",
        "QR-codes règlementaires intégrés",
        "Piste d'audit fiable intégrée"
      ],
    },
    {
      bgColor: "orange",
      title: "Toutes les infos clients et véhicules, centralisées",
      icon: UserRoundCog,
      content:
        "Créez des fiches clients enrichies avec coordonnées complètes, historique détaillé par véhicule (kilométrage, interventions, pièces changées), documents associés (cartes grises, contrôles techniques, devis précédents).",
      features: [
        "Recherche ultra-rapide (nom, plaque, téléphone)",
        "Tags et filtres personnalisables",
        "Historique complet des interventions",
        "Photos et documents joints",
        "Export CSV pour analyses externes",
        "Fusion de doublons automatique"
      ],
    },
    {
      bgColor: "violet",
      title: "Organisez votre atelier comme jamais",
      icon: CalendarCheck,
      content:
        "Visualisez votre planning par jour, semaine ou mois. Assignez les interventions à vos mécaniciens en glisser-déposer, estimez les temps de travail, recevez des notifications en temps réel. Tout est synchronisé avec la facturation.",
      features: [
        "Vue calendrier intuitive (jour/semaine/mois)",
        "Assignation mécaniciens par glisser-déposer",
        "Estimation temps d'intervention",
        "Indicateurs de disponibilité en temps réel",
        "Notifications internes automatiques",
        "Intégration facturation fin d'intervention",
        "Synchronisation smartphone/tablette"
      ],
    },
    {
      bgColor: "emerald",
      title: "Maîtrisez vos stocks et vos fournisseurs",
      icon: Wrench,
      content:
        "Créez votre catalogue interne de pièces détachées, gérez vos fournisseurs, définissez les prix d'achat et de vente, suivez les mouvements de stock en temps réel. Goparo vous alerte automatiquement quand un stock atteint le seuil minimal.",
      features: [
        "Catalogue pièces complet avec références",
        "Gestion complète des fournisseurs",
        "Prix d'achat et prix public",
        "Alertes de réapprovisionnement automatiques",
        "Historique des commandes fournisseurs",
        "Statistiques d'achat et de rotation des stocks"
      ],
    },
    {
      bgColor: "orange",
      title: "Votre site web professionnel, généré automatiquement",
      icon: Globe,
      content:
        "Augmentez votre visibilité sans développeur, sans agence web et attirez de nouveaux clients. Depuis votre administration modifiez logo, couleurs, bannières, textes, services, horaires, promotions. Le site se met à jour en temps réel.",
      features: [
        "Génération automatique du site dès inscription",
        "Pages professionnelles pré-configurées",
        "Modification intuitive depuis le back-office",
        "SEO optimisé pour moteurs de recherche",
        "Publication automatique des véhicules à vendre",
        "Formulaire de contact intégré"
      ],
    },
    {
      bgColor: "violet",
      title: "Connectez votre comptable en un clic",
      icon: Unplug,
      content:
        "Goparo prépare automatiquement tous vos exports comptables. Votre expert-comptable dispose d'un accès sécurisé dédié pour récupérer factures, journaux, et pièces justificatives. Formats compatibles Sage, EBP, ACD, et exports standards (FEC, CSV, PDF).",
      features: [
        "Accès comptable sécurisé par rôle",
        "Exports compatibles Sage, EBP, ACD",
        "Fichier FEC (Fichier des Écritures Comptables)",
        "Journaux de ventes pré-formatés",
        "Lettrage simplifié",
        "API pour intégrations ERP personnalisées (Premium)"
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto xl:max-w-full px-6 mb-10">
      {/* Carousel pour mobile (jusqu'à lg) */}
      <div className="">
        <Carousel
          opts={{
            align: "start", // Alignement des slides
            loop: true, // Boucle infinie
            slidesToScroll: 1, // Avance d'1 carte à la fois
          }}
        >
          <CarouselContent className="-ml-2 sm:-ml-4 py-4 sm:py-6">
            {features.map((feature, index) => (
              <CarouselItem key={index} className="pl-2 sm:pl-4 sm:basis-1/2 xl:basis-1/3">
                <FeatureDetailsCard {...feature} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-8 mt-6">
            <CarouselPrevious className="static transform-none" />
            <CarouselNext className="static transform-none" />
          </div>
        </Carousel>
      </div>

      {/* Grille pour desktop (à partir de lg) */}
      {/* <div className="hidden lg:grid lg:grid-cols-3 lg:gap-5">
        {features.map((feature, index) => (
          <FeatureDetailsCard key={index} {...feature} />
        ))}
      </div> */}
    </div>
  );
}
