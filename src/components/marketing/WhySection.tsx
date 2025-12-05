
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TitleItem from "./TitleItem";
import FeatureItem from "./FeatureItem";
import { Badge } from "../ui/badge";

export default function WhySection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const features = [
    {
      bgColor: "violet",
      title: "Conformité légale garantie",
      content:
        "Goparo respecte toutes les exigences de la facturation électronique obligatoire (DGFiP 2026). Formats structurés, archivage légal, QR-codes règlementaires, suivi TVA automatique. Aucune mise à jour technique à prévoir : vous êtes protégé.",
    },
    {
      bgColor: "sky",
      title: "Publication automatique des véhicules",
      content:
        "Ajoutez un véhicule VO/VN dans Goparo, et il apparaît instantanément sur votre site vitrine avec photos, détails techniques, prix et formulaire de contact. Zéro double saisie, gain de temps maximal.",
    },
    {
      bgColor: "violet",
      title: "Accès comptable dédié",
      content:
        "Votre expert-comptable accède directement à vos factures. Exports automatiques vers Sage, EBP, ACD. Formats FEC, CSV, PDF. Vos données comptables sont prêtes en un clic chaque mois.",
    },
  ];

  // Créer les transformations pour chaque carte
  const getCardTransform = (index: number) => {
    const totalCards = features.length;
    const start = index / totalCards;
    const end = (index + 1) / totalCards;

    return useTransform(scrollYProgress, [start, end], [1200, 0]);
  };

  const getCardOpacity = (index: number) => {
    const totalCards = features.length;
    const start = index / totalCards;
    const end = (index + 1) / totalCards;

    return useTransform(scrollYProgress, [start, end], [0, 1]);
  };

  return (
    <section
      id="features"
      className="items-center justify-center my-10 lg:my-25"
    >
      <div className="text-center mx-auto pb-5 lg:pb-10 px-6">
        <Badge className="bg-emerald-100 text-emerald-600 px-4 py-2 mb-4 rounded-full font-semibold">
          Conçu pour les garages
        </Badge>
        <TitleItem
          className="sm:w-4/5 lg:w-2/3 mx-auto"
          text="Conçu spécifiquement pour les garages — simple à prendre en main, complet dans les fonctions, et conforme aux normes les plus strictes."
        >
          <span className="text-violet-500">Pourquoi</span> choisir Goparo ?
        </TitleItem>
      </div>

      {/* Section avec scroll bloqué */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${features.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 xl:px-0 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
              {features.map((feature, index) => {
                const x = getCardTransform(index);
                const opacity = getCardOpacity(index);

                return (
                  <motion.div
                    key={index}
                    style={{ x, opacity }}
                    className="w-full"
                  >
                    <FeatureItem {...feature} />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
