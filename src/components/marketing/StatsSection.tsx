
import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import Link from "next/link";
import TitleItem from "./TitleItem";
import { Button } from "../ui/button";
import { 
  Clock, 
  Shield, 
  Zap, 
  TrendingUp, 
  Users, 
  Star 
} from "lucide-react";

function AnimatedNumber({ 
  value, 
  suffix = "", 
  prefix = "",
  duration = 2 
}: { 
  value: number; 
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0
  });
  const displayed = useTransform(springValue, (latest) =>
    Math.round(latest)
  );

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  return (
    <span ref={ref} className="text-5xl lg:text-6xl font-bold">
      {prefix}
      <motion.span>{displayed}</motion.span>
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const stats = [
    {
      icon: Clock,
      value: 40,
      prefix: "-",
      suffix: "%",
      label: "Temps passé sur la facturation",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
      description: "Automatisez vos tâches administratives"
    },
    // {
    //   icon: Shield,
    //   value: 100,
    //   suffix: "%",
    //   label: "Conforme réglementation 2026",
    //   color: "text-blue-500",
    //   bgColor: "bg-blue-50",
    //   description: "Sérénité totale face aux contrôles"
    // },
    {
      icon: Zap,
      value: 99.9,
      suffix: "%",
      label: "Disponibilité garantie",
      color: "text-violet-500",
      bgColor: "bg-violet-50",
      description: "Votre garage toujours accessible"
    },
    {
      icon: TrendingUp,
      value: 25,
      prefix: "+",
      suffix: "%",
      label: "Productivité moyenne",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      description: "Optimisez chaque journée de travail"
    },
    // {
    //   icon: Users,
    //   value: 500,
    //   prefix: "+",
    //   suffix: "",
    //   label: "Garages nous font confiance",
    //   color: "text-pink-500",
    //   bgColor: "bg-pink-50",
    //   description: "Rejoignez une communauté qui grandit"
    // },
    // {
    //   icon: Star,
    //   value: 4.8,
    //   suffix: "/5",
    //   label: "Satisfaction client",
    //   color: "text-amber-500",
    //   bgColor: "bg-amber-50",
    //   description: "Note moyenne de nos utilisateurs"
    // }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative bg-gradient-to-tr from-white via-violet-100 to-sky-300 rounded-3xl py-16 lg:py-32 sm:mx-6 px-6 overflow-hidden"
    >
      {/* Éléments décoratifs en arrière-plan */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-emerald-500 rounded-full opacity-20 blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-violet-100 rounded-full opacity-20 blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <TitleItem 
          text="Rejoignez des centaines de garages qui ont transformé leur gestion quotidienne">
            Des résultats qui parlent d'eux-mêmes
          </TitleItem>
        </motion.div>

        {/* Grille de statistiques */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="relative group"
              >
                <div className="h-full bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
                  {/* Icône avec cercle coloré */}
                  <div className={`${stat.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${stat.color}`} strokeWidth={2} />
                  </div>

                  {/* Chiffre animé */}
                  <div className={`${stat.color} mb-3`}>
                    <AnimatedNumber 
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      duration={2}
                    />
                  </div>

                  {/* Label principal */}
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {stat.description}
                  </p>

                  {/* Barre de progression décorative */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "100%" } : {}}
                    transition={{ 
                      duration: 1.5, 
                      delay: 0.3 + index * 0.15,
                      ease: "easeOut"
                    }}
                    className={`h-1 ${stat.bgColor} rounded-full mt-6`}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <div className="text-center"
        >
          <Link href="/register">
            <Button
              size="lg"
              className="text-white bg-gradient-to-r from-sky-600 to-violet-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Commencer gratuitement
            </Button>
          </Link>
          <p className="text-sm mt-4">
            Sans engagement • Configuration en 5 minutes
          </p>
        </div>
      </div>
    </section>
  );
}