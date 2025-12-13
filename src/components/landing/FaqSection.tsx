import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import TitleItem from "./TitleItem";

const faq = [
  {
    question: "Goparo est-il vraiment conforme à la facturation électronique obligatoire 2026 ?",
    answer:
      "Oui, absolument. Goparo intègre nativement toutes les exigences de la réglementation DGFiP : formats de factures structurés, numérotation légale inviolable, piste d'audit fiable, archivage sécurisé, QR-codes règlementaires, suivi TVA automatique. Vous êtes protégé et prêt dès maintenant, sans mise à jour technique à prévoir.",
  },
  {
    question: "Comment fonctionne la génération automatique du site vitrine ?",
    answer:
      "Dès votre inscription, Goparo crée automatiquement un site web professionnel pour votre garage avec un sous-domaine personnalisé (votre-garage.goparo.com). Vous modifiez tout depuis votre administration : logo, couleurs, bannières, services, horaires, actualités, photos. Le site se met à jour en temps réel, sans compétence technique requise. Vous pouvez également ajouter votre propre nom de domaine (option à 5€/mois).",
  },
  {
    question: "Comment se passe la publication automatique des véhicules sur le site ?",
    answer:
      "C'est magique et ultra-simple. Quand vous ajoutez un véhicule VO/VN dans Goparo (avec photos, détails, prix), il est automatiquement publié sur votre site vitrine avec une mise en page professionnelle. Page dédiée, galerie photos, détails techniques, formulaire de contact : tout est généré proprement. Zéro double saisie, zéro manipulation technique.",
  },
  {
    question: "Puis-je connecter mon expert-comptable ?",
    answer:
      "Oui, totalement. Goparo propose un accès comptable sécurisé dédié. Votre comptable peut récupérer automatiquement toutes vos factures, journaux, et pièces justificatives. Nous proposons des exports compatibles Sage, EBP, ACD, ainsi que des formats standards (FEC, CSV, PDF). Vos données comptables sont prêtes en un clic chaque mois.",
  },
  {
    question: "Comment fonctionne la période d'essai ?",
    answer:
      "Vous pouvez commencer gratuitement avec l'offre Découverte (0€/mois, 20 factures/mois, sans carte bancaire). Pour tester les offres Professionnel ou Premium, contactez-nous pour une démo personnalisée ou un essai assisté de 14 jours. Aucun engagement, annulation possible à tout moment.",
  },
  {
    question: "Où sont hébergées mes données ?",
    answer:
      "Vos données sont hébergées sur des serveurs sécurisés en France, avec conformité RGPD garantie. Sauvegardes automatiques quotidiennes, chiffrement en transit et au repos, isolation complète multi-tenant (chaque garage a son propre sous-domaine et ses données cloisonnées).",
  },
  {
    question: "Goparo fonctionne-t-il sur smartphone et tablette ?",
    answer:
      "Oui, parfaitement. L'interface est entièrement responsive et optimisée pour une utilisation mobile/tablette, même dans l'atelier. Boutons larges, navigation intuitive, synchronisation en temps réel. Vous pouvez créer des factures, consulter le planning, ajouter des photos depuis votre téléphone en toute simplicité.",
  },
  {
    question: "Puis-je importer mes données existantes (clients, véhicules, factures) ?",
    answer:
      "Oui. Goparo propose un import CSV pour clients et véhicules. Pour une migration complète depuis votre ancien logiciel (factures historiques, pièces, etc.), nous proposons un service de migration assistée (inclus en Premium ou en option payante selon votre forfait).",
  },
  {
    question: "Comment fonctionne la gestion des fournisseurs ?",
    answer:
      "Le module Pièces (inclus en Pro et Premium) vous permet de créer des fiches fournisseurs complètes avec coordonnées, tarifs négociés, délais de livraison. Vous pouvez associer des pièces à vos fournisseurs, suivre l'historique de vos commandes, et valoriser automatiquement vos devis/factures avec les bons prix.",
  },
];

export default function FaqSection() {
  return (
    <section  id="faq" className="flex max-w-6xl mx-auto justify-center py-16 lg:py-32 px-6">
      <div className="container flex flex-col lg:flex-row items-start gap-4 sm:gap-8">
        <div className="xl:w-2/5 lg:pb-10">
          <Badge className="bg-emerald-100 text-emerald-600 px-4 py-2 mb-4 rounded-full font-semibold">
            FAQ - Questions fréquentes
          </Badge>
          <TitleItem 
          text= "Voici les réponses aux questions que les garages posent le plus souvent avant de rejoindre Goparo.">
            Besoin d’éclaircissements ?
          </TitleItem>
        </div>

        <Accordion type="single" className="w-full xl:w-3/5">
          {faq.map(({ question, answer }, index) => (
            <AccordionItem key={question} value={`question-${index}`}>
              <AccordionTrigger className="text-left text-lg">
                {question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
