// src/components/marketing/Hero.tsx

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LogoCloud from "./LogoCloud";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Hero() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      className="bg-gradient-to-tr from-white via-violet-100 to-sky-300 -mt-5 py-10 md:py-20 xl:py-32 px-5 sm:px-8 lg:px-10"
      id="hero"
    >
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        <Badge className="bg-orange-100 text-orange-600 px-4 py-2 mb-2 border-orange-600 rounded-full font-semibold">
          Site web inclus
        </Badge>
        <Badge className="bg-orange-100 text-orange-600 px-4 py-2 mb-2 border-orange-600 rounded-full font-semibold">
          Conforme facturation 2026
        </Badge>
        <Badge className="bg-orange-100 text-orange-600 px-4 py-2 mb-2 border-orange-600 rounded-full font-semibold">
          Export comptabilité
        </Badge>
      </div>
      <div className="sm:flex flex-col lg:flex-row gap-5 items-center mb-20">
        {/* Left side */}
        <div className="lg:w-1/2 flex flex-col justify-center text-slate-900 mt-5">
          <h1 className="text-5xl lg:text-6xl xl:text-6xl font-bold leading-12 lg:leading-16 xl:leading-16">
            Le logiciel de gestion garage <br />
            <span className="text-violet-600">qui simplifie tout</span>
          </h1>
          <p className="mt-10 lg:mt-15 mb-10 lg:mb-0 text-xl md:text-2xl mx-auto leading-relaxed">
            Avec Goparo, vous centralisez tout : devis, factures conformes 2026,
            planning des interventions, vente de véhicules, site vitrine
            dynamique et export comptable. Simple, rapide et 100 % cloud —
            accessible partout, même dans l’atelier.
          </p>
        </div>

        {/* Right side */}
        <div className="lg:w-1/2 items-center">
          <Image
            src="images/full-desktop.svg"
            alt="Goparo App Screenshot"
            width={600}
            height={400}
            className="w-full"
          />
        </div>
      </div>
      {/* CTA */}
      <div className="text-center">
        <Link href="/register" className="inline-block">
          <Button
            size="lg"
            className="bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white px-10 py-6 text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
          >
            <span className="flex items-center gap-2">
              Commencer gratuitement
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                →
              </motion.span>
            </span>
          </Button>
        </Link>
        <p className="text-gray-600 text-sm mt-4">
          Sans engagement • Configuration en 5 minutes
        </p>
      </div>
    </section>
  );
}
