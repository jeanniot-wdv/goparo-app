import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Cloud, Shield, Globe, CheckCircle2, Sparkles } from "lucide-react";
import TitleItem from "./TitleItem";

export default function IntroSection() {
  const features = [
    {
      icon: Cloud,
      title: "Accessible partout,",
      highlight: "aucun logiciel à installer",
      highlightColor: "text-violet-500",
      text: "Accessible depuis ordinateur, tablette ou mobile, Goparo fonctionne sans installation. Votre garage reste opérationnel partout : bureau, atelier ou déplacement. Un SaaS simple, flexible et toujours à jour.",
      iconColor: "text-violet-500",
      bgColor: "bg-violet-50",
    },
    {
      icon: CheckCircle2,
      title: "Facturation électronique 2026",
      highlight: "conforme",
      highlightColor: "text-orange-500",
      text: "Goparo vous prépare dès maintenant à la réforme 2026 : factures conformes, archivage sécurisé et exports normalisés. Restez en règle sans effort et évitez les risques de non-conformité.",
      iconColor: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      icon: Shield,
      title: "Données sécurisées et hébergées",
      highlight: "en France",
      highlightColor: "text-emerald-500",
      text: "Vos données sont chiffrées, sauvegardées et hébergées en France, garantissant confidentialité et conformité RGPD. Accédez-y à tout moment en toute sécurité, où que vous soyez.",
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-50",
    },
  ];

  return (
    <section className="relative bg-gradient-to-tl from-sky-400 via-white to-sky-200 rounded-3xl px-6 py-16 sm:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Badge et introduction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Badge className="bg-white text-orange-600 px-4 py-2 mb-6 rounded-full font-semibold inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Goparo c'est quoi ?
          </Badge>
          <TitleItem
            text="Fini les allers-retours entre plusieurs outils : planning, devis,
              factures, stocks, WordPress… tout est centralisé dans une
              interface rapide, fluide et 100% modulable. Moins de tâches manuelles, plus de performance. Que demander de plus ?"
          >
            Bien plus qu'un logiciel de facturation : la solution tout-en-un
            pour piloter votre garage
          </TitleItem>
        </motion.div>

        {/* Image avec animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="overflow-hidden"
        >
          <Image
            src="/images/img-feature.png"
            alt="Features"
            width={1280}
            height={800}
            className="w-[80vw] h-full -mb-5 md:-mb-40 mx-auto overflow-hidden"
            priority
          />
        </motion.div>

        {/* Liste des fonctionnalités avec cartes */}
        <div className="flex flex-col gap-5 mb-10 md:mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                whileHover={{
                  x: 10,
                  transition: { duration: 0.3 },
                }}
              >
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
                    {/* Côté gauche - Titre avec icône */}
                    <div className="flex items-start gap-4">
                      <div
                        className={`${feature.bgColor} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shrink-0`}
                      >
                        <Icon
                          className={`w-8 h-8 ${feature.iconColor}`}
                          strokeWidth={2}
                        />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
                        {feature.title}{" "}
                        <span className={feature.highlightColor}>
                          {feature.highlight}
                        </span>
                      </h2>
                    </div>

                    {/* Côté droit - Description */}
                    <div>
                      <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                        {feature.text}
                      </p>
                    </div>
                  </div>

                  {/* Barre de progression décorative */}
                  <div className={`h-1 ${feature.bgColor} rounded-full mt-6`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA final */}
        <div className="text-center">
          <Link href="/register" className="inline-block">
            <Button
              size="lg"
              className="bg-gradient-to-r from-sky-600 to-violet-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 text-white px-10 py-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >Commencer gratuitement
            </Button>
          </Link>
          <p className="text-gray-600 text-sm mt-4">
            Sans engagement • Essai gratuit sans CB
          </p>
        </div>
      </div>
    </section>
  );
}
