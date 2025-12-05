
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import TitleItem from "./TitleItem";

import { motion } from "framer-motion";

const plans = [
  {
    name: "Découverte",
    price: 0,
    description: "Idéal pour tester Goparo",
    features: [
      "Accessible sans CB",
      "20 factures / mois",
      "1 utilisateur",
      "Gestion clients",
      "Export CSV",
      "Sans site vitrine",
    ],
    buttonText: "Essayer gratuitement",
  },
  {
    name: "Essentiel",
    price: 29,
    description: "Pour petits garages en croissance",
    features: [
      "Facturation illimitée",
      "2 utilisateurs",
      "Site vitrine inclus",
      "Publication actualités & promotions",
      "Export comptable basique",
    ],
    buttonText: "Essayer Essentiel",
  },
  {
    name: "Professionnel",
    price: 69,
    isRecommended: true,
    description: "Pour garages professionnels exigeants",
    features: [
      "Tout Essentiel",
      "5 utilisateurs",
      "Modules Pièces & Fournisseurs",
      "Module Comptabilité Pro (Sage/EBP)",
      "Accès comptable dédié",
      "Domaine personnalisé inclus",
    ],
    buttonText: "Essayer Professionnel",
    isPopular: true,
  },
  {
    name: "Premium",
    price: 129,
    description: "Pour réseaux et multi-sites",
    features: [
      "Tout Professionnel",
      "Utilisateurs illimités",
      "Module PLanning Atelier",
      "Module Vente Véhicules (avec publication auto sur site)",
      "Multi-sites (jusqu'à 3 garages)",
      "Account manager dédié",
      "Migration premium assistée",
    ],
    buttonText: "Essayer Premium",
  },
];

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="flex justify-center pb-10 lg:pb-25"
    >
      <div className="text-center mx-auto pb-5 lg:pb-10 px-6">
        <Badge className="bg-violet-100 text-violet-600 px-4 py-2 mb-4 rounded-full font-semibold">
          Tarification simple et sans surprise
        </Badge>
        <TitleItem
          className="md:w-2/3 mx-auto"
          text="Sans engagement. Passez à l'offre supérieure à tout moment. Annulation en un clic."
        >
          Des tarifs clairs, <span className="text-emerald-500">adaptés</span> à
          votre garage
        </TitleItem>

        <motion.div className="flex flex-col items-center justify-center mt-10 lg:mt-15"
          initial={{opacity: 0, scale: 0.5}}
          whileInView={{opacity: 1, scale: 1}}
          transition={{duration: 1}}>
          <div className="mx-auto grid grid-cols-1 lg:w-3/4 xl:w-full sm:grid-cols-2 xl:grid-cols-4 items-center gap-6 sm:gap-0">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "bg-white relative flex flex-col h-full border p-6",
                  {
                    "border-2 border-primary bg-linear-to-br from-violet-200 to-white shadow-xl shadow-violet-200":
                      plan.isPopular,
                  }
                )}
              >
                {plan.isPopular && (
                  <Badge className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2">
                    Le plus populaire
                  </Badge>
                )}
                <div className="h-42 flex flex-col">
                  <h3 className="text-3xl text-violet-600 font-bold">
                    {plan.name}
                  </h3>
                  <p className="mt-4 grow text-lg text-muted-foreground">
                    {plan.description}
                  </p>
                  <p className="font-['Inter'] mt-auto text-5xl text-violet-600 font-extrabold">
                    {plan.price}€
                  </p>
                </div>
                <Separator className="my-5" />

                <ul className="space-y-3 grow leading-snug">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <ArrowRight className="shrink-0 h-5 w-5 mt-px text-violet-500" />
                      <span className="block text-left">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  // variant={plan.isPopular ? "default" : "outline"}
                  size="lg"
                  className="w-full mt-6"
                >
                  {plan.buttonText}
                </Button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
