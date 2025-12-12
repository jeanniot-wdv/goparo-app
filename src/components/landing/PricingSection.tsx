import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import TitleItem from "./TitleItem";

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
      "Module Planning Atelier",
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
      className="bg-gradient-to-tl from-sky-600 to-violet-600 rounded-3xl flex justify-center sm:mx-6 py-16 lg:py-32"
    >
      <div className="text-center mx-auto px-6">
        <Badge className="bg-white text-sky-600 border-sky-500 px-4 py-2 mb-4 rounded-full font-semibold">
          Tarification simple et sans surprise
        </Badge>
        <TitleItem
          className="md:w-2/3 pb-4 lg:pb-8 mx-auto text-white"
          text="Sans engagement. Passez à l'offre supérieure à tout moment. Annulation en un clic."
        >
          <span className="text-white">Des tarifs clairs, adaptés à votre garage</span>
        </TitleItem>

        <div className="max-w-6xl flex flex-col items-center justify-center mx-auto mt-10 lg:mt-15">
          <div className="mx-auto grid grid-cols-1 lg:w-3/4 xl:w-full sm:grid-cols-2 xl:grid-cols-4 items-center gap-6 sm:gap-0">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "bg-white hover:scale-102 hover:z-50 hover:shadow-2xl duration-300 hover:scale-105 relative flex flex-col h-full border p-6",
                  {
                    "border-2 border-primary bg-gradient-to-bl from-sky-200 to-white":
                      plan.isPopular,
                  }
                )}
              >
                {plan.isPopular && (
                  <Badge className="absolute bg-white text-violet-500 font-semibold top-0 right-1/2 translate-x-1/2 -translate-y-1/2">
                    Le plus populaire
                  </Badge>
                )}
                <div className="h-40 flex flex-col">
                  <h3 className="text-3xl text-violet-600 font-bold">
                    {plan.name}
                  </h3>
                  <p className="mt-4 grow text-lg text-muted-foreground">
                    {plan.description}
                  </p>
                  <div className="flex text-violet-600 items-center justify-center gap-2">
                    <p className="mt-auto text-5xl font-extrabold">
                      {plan.price}€
                    </p>
                    <p className="text-sm font-medium text-left">
                      HT<br />/mois
                    </p>
                  </div>
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
        </div>
      </div>
    </section>
  );
}
