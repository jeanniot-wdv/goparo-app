// frontend/src/components/landing/FeaturesSection.tsx

import TitleItem from "./TitleItem";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import FeatureCard from "@/components/landing/FeatureCard";
import {
  FileText,
  Users,
  Wrench,
  Globe,
  Car,
  CalendarCheck,
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      title: "Facturation conforme",
      icon: FileText,
      iconColor: "text-emerald-500",
      content:
        "Créez, envoyez et archivez des factures conformes DGFiP. Numérotation légale, piste d'audit, archivage sécurisé, envoi automatique.",
    },
    {
      title: "Gestion clients & véhicules",
      icon: Users,
      iconColor: "text-indigo-500",
      content:
        "Fiches complètes avec historique des interventions, documents, photos. Recherche instantanée et export CSV.",
    },
    {
      title: "Site vitrine automatique",
      icon: Globe,
      iconColor: "text-pink-400",
      content:
        "Votre site professionnel généré automatiquement. Personnalisable, rapide, SEO optimisé. Sous-domaine inclus.",
    },
    {
      title: "Gestion pièces & fournisseurs",
      icon: Wrench,
      iconColor: "text-yellow-500",
      content:
        "Catalogue interne, suivi des stocks, alertes de réapprovisionnement, gestion complète de vos fournisseurs.",
    },
    {
      title: "Vente véhicules VO/VN",
      icon: Car,
      iconColor: "text-orange-500",
      content:
        "Gestion complète et publication automatique sur votre site vitrine. Photos, détails, prix, tout est synchronisé.",
    },
    {
      title: "Planning atelier intelligent",
      icon: CalendarCheck,
      iconColor: "text-violet-500",
      content:
        "Planifiez vos interventions, assignez vos mécaniciens, visualisez votre charge de travail en temps réel.",
    },
  ];

  return (
    <section id="features" className="max-w-6xl mx-auto py-16 md:py-20 lg:py-32">
      <div className="max-w-6xl text-center mx-auto pb-5 lg:pb-10 px-6">
        <TitleItem text="Un ensemble d'outils pensés pour la gestion complète d'un garage, accessible partout.">
          Tout ce dont un{" "}
          <span className="text-emerald-500">garage moderne</span> a besoin
        </TitleItem>
      </div>
        {/* Carousel pour mobile (jusqu'à lg) */}
        <div className="lg:hidden">
          <Carousel
            opts={{
              align: "start", // Alignement des slides
              loop: false, // Boucle infinie
              slidesToScroll: 1, // Avance d'1 carte à la fois
            }}
          >
            <CarouselContent className="ml-2 mr-6 py-6">
              {features.map((feature, index) => (
                <CarouselItem key={index} className="pl-4 gap-6 basis-[70%] sm:basis-[55%] md:basis-[45%]">
                  <FeatureCard {...feature} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-8">
              <CarouselPrevious className="static transform-none" />
              <CarouselNext className="static transform-none" />
            </div>
          </Carousel>
        </div>

        {/* Grille pour desktop (à partir de lg) */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8 px-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
      </div>

      <div className="mx-auto px-6 text-center">
        <Link href="#pricing">
          <Button
            variant="success"
            size="lg"
            className="w-full sm:w-fit bg-gradient-to-r from-sky-600 to-violet-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl transition-all hover:scale-105 mt-5 lg:mt-10"
          >
            Découvrir notre offre complète
          </Button>
        </Link>
      </div>
    </section>
  );
}
