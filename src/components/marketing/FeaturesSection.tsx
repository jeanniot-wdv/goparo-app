// frontend/src/components/marketing/FeaturesSection.tsx

"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import FeatureCard from "@/components/marketing/FeatureCard";
import {
  FileText,
  Users,
  Wrench,
  Globe,
  Car,
  CalendarCheck,
  Link,
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      title: "Facturation conforme",
      icon: FileText,
      content:
        "Créez, envoyez et archivez des factures conformes DGFiP. Numérotation légale, piste d'audit, archivage sécurisé, envoi automatique.",
    },
    {
      title: "Gestion clients & véhicules",
      icon: Users,
      content:
        "Fiches complètes avec historique des interventions, documents, photos. Recherche instantanée et export CSV.",
    },
    {
      title: "Site vitrine automatique",
      icon: Globe,
      content:
        "Votre site professionnel généré automatiquement. Personnalisable, rapide, SEO optimisé. Sous-domaine inclus.",
    },
    {
      title: "Gestion pièces & fournisseurs",
      icon: Wrench,
      content:
        "Catalogue interne, suivi des stocks, alertes de réapprovisionnement, gestion complète de vos fournisseurs.",
    },
    {
      title: "Vente véhicules VO/VN",
      icon: Car,
      content:
        "Gestion complète et publication automatique sur votre site vitrine. Photos, détails, prix, tout est synchronisé.",
    },
    {
      title: "Planning atelier intelligent",
      icon: CalendarCheck,
      content:
        "Planifiez vos interventions, assignez vos mécaniciens, visualisez votre charge de travail en temps réel.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* Carousel pour mobile (jusqu'à lg) */}
      <div className="lg:hidden">
        <Carousel
          opts={{
            align: "start", // Alignement des slides
            loop: true, // Boucle infinie
            slidesToScroll: 1, // Avance d'1 carte à la fois
          }}
        >
          <CarouselContent className="-ml-2 sm:-ml-4 py-4 sm:py-6">
            {features.map((feature, index) => (
              <CarouselItem
                key={index}
                className="pl-2 sm:pl-4 sm:basis-1/2"
              >
                <FeatureCard {...feature} />
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
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-5">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
}
