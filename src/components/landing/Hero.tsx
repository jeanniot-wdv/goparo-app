// src/components/landing/Hero.tsx

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <section
      className="bg-gradient-to-tr from-white via-violet-100 to-violet-400 -mt-5 py-10 md:py-20 xl:py-32 px-5 sm:px-8 lg:px-10"
      id="hero"
    >
      <div className="max-w-7xl grid grid-cols-1 lg:grid-cols-2 lg:gap-10 items-center mx-auto mb-10 sm:mb-20">
        {/* Left side */}
        <div className=" text-slate-900">
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
          <h1 className="text-5xl lg:text-7xl font-black mt-5">
            Le logiciel de gestion garage <br />
            <span className="text-violet-600">qui simplifie tout</span>
          </h1>
          <p className="mt-10 lg:mt-15 mb-10 lg:mb-0 text-xl md:text-2xl mx-auto">
            Avec Goparo, vous centralisez tout : devis, factures conformes 2026,
            planning des interventions, vente de véhicules, site vitrine
            dynamique et export comptable. Simple, rapide et 100 % cloud —
            accessible partout, même dans l’atelier.
          </p>
        </div>

        {/* Right side */}
        <div className="rounded-[30%] shadow-2xl overflow-hidden">
          <Image
            src="/images/hero.png"
            alt="Goparo App Screenshot"
            width={600}
            height={400}
            priority
            className="w-full object-cover"
          />
        </div>
      </div>
      {/* CTA */}
      <div className="text-center">
        <Link href="/register" className="inline-block">
          <Button
            size="lg"
            className="bg-gradient-to-r from-sky-600 to-violet-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105  text-white px-10 py-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
          >
            Commencer gratuitement
          </Button>
        </Link>
        <p className="text-gray-600 text-sm mt-4">
          Sans engagement • Configuration en 5 minutes
        </p>
      </div>
    </section>
  );
}
