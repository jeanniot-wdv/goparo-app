// frontend/src/components/marketing/PricingSection.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const plans = [
  {
    title: "Gratuit",
    price: "0€",
    items: [
      "20 factures / mois",
      "Gestion Clients & Véhicules",
      "Export CSV",
      "1 utilisateur",
      "Sans site vitrine",
    ]
  },
  {
    title: "Essentiel",
    price: "29€",
    items: [
      "Facturation illimitée",
      "2 utilisateurs",
      "Export comptable basique",
      "Site vitrine inclus",
      "Sous-domaine personnalisé"
    ]
  },
  {
    title: "Professionnel",
    price: "69€",
    items: [
      "Tout Essentiel",
      "Modules Pièces détachées",
      "Module Comptabilité Pro",
      "5 utilisateurs",
      "Accès comptable dédié",
      "Domaine custom inclus"
    ]
  },
  {
    title: "Premium",
    price: "129€",
    items: [
      "Tout Pro",
      "Planning atelier inclus",
      "Module Vente véhicules",
      "Multi-sites (3 garages)",
      "API + Support téléphone"
    ]
  }
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Tarification simple et transparente
        </h2>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <Card key={plan.title} className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold">{plan.title}</CardTitle>
                <p className="text-3xl font-black mt-3">{plan.price}<span className="text-base font-normal">/mois</span></p>
              </CardHeader>

              <CardContent>
                <ul className="list-disc ml-4 text-slate-700 mb-6">
                  {plan.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  Choisir
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
