
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TitleItem from "./TitleItem";
import {
  FileText,
  UserRoundCog,
  Wrench,
  Globe,
  CalendarCheck,
  Unplug,
} from "lucide-react";

export default function DetailsSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const features = [
    {
      bgColor: "bg-emerald-500",
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
      bgColor: "bg-orange-500",
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
      bgColor: "bg-violet-500",
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
      bgColor: "bg-emerald-500",
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
      bgColor: "bg-orange-500",
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
      bgColor: "bg-violet-500",
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

  const FeatureCard = ({ 
    feature, 
    index 
  }: { 
    feature: typeof features[0]; 
    index: number;
  }) => {
    const totalCards = features.length;
    const startProgress = index / totalCards;
    const endProgress = (index + 1) / totalCards;
    
    // Opacité : apparaît progressivement puis disparaît
    const opacity = useTransform(
      scrollYProgress,
      [
        startProgress - 0.05,
        startProgress,
        endProgress - 0.05,
        endProgress
      ],
      [0, 1, 1, 0]
    );
    
    // Scale : légèrement plus petit au début et à la fin
    const scale = useTransform(
      scrollYProgress,
      [
        startProgress - 0.05,
        startProgress,
        endProgress - 0.05,
        endProgress
      ],
      [0.9, 1, 1, 0.9]
    );
    
    const Icon = feature.icon;
    
    return (
      <motion.div
        style={{ opacity, scale }}
        className="absolute inset-0 flex items-center justify-center mt-5 px-6"
      >
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Partie gauche - Titre et description */}
            <div className={`${feature.bgColor} p-6 sm:p-8 lg:p-12 text-white flex flex-col justify-center`}>
              <div className="sm:mb-6 mx-auto">
                <Icon className="w-16 h-16 mb-4" strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-center sm:text-left sm:mb-6">
                {feature.title}
              </h3>
              <p className="hidden sm:block text-lg lg:text-xl leading-relaxed opacity-95">
                {feature.content}
              </p>
            </div>
            
            {/* Partie droite - Liste des features */}
            <div className="bg-gray-50 p-6 sm:sp-8 lg:p-12 flex flex-col justify-center">
              <h4 className="hidden sm:block text-xl font-semibold mb-6 text-gray-800">
                Fonctionnalités clés :
              </h4>
              <ul className="space-y-2 sm:space-y-4">
                {feature.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-green-500 shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700 leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="items-center justify-center my-10 lg:my-24">
      <div className="text-center mx-auto px-6">
        <TitleItem
          className="sm:w-4/5 lg:w-2/3 mx-auto"
          text="De la facturation électronique à la gestion des stocks, découvrez comment chaque outil peut transformer votre activité."
        >
          Découvrez Goparo <span className="text-violet-500">en détail</span>
        </TitleItem>
      </div>

      {/* Section avec scroll bloqué */}
      <div 
        ref={containerRef}
        className="relative"
        style={{ height: `${features.length * 100}vh` }}
      >
        <div className="sticky top-0 h-[100vh] flex items-center justify-center">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              feature={feature} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}