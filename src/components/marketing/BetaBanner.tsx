// components/BetaBanner.tsx

import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BetaBanner() {
  return (
    <div className="relative bg-gradient-to-r from-sky-600 to-violet-600 text-white">
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between py-3 gap-4">
          {/* Icône + Message (desktop) */}
          <div className="hidden md:flex items-center gap-3 flex-1">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              <span className="text-xs font-semibold">NOUVEAU</span>
            </div>
            <p className="font-medium">
              🚀 Application en développement — Inscrivez-vous maintenant et
              bénéficiez de <span className="font-bold">3 mois gratuits</span>{" "}
              au lancement !
            </p>
          </div>

          {/* Message mobile (simplifié) */}
          <div className="flex md:hidden items-center gap-2 flex-1 min-w-0">
            <Sparkles className="h-4 w-4 text-yellow-300 flex-shrink-0" />
            <p className="text-xs font-medium truncate">
              <span className="font-bold">3 mois gratuits</span> • Liste
              d'attente
            </p>
          </div>

          {/* CTA Button */}
          <Link href="#contact" className="inline-block">
            <Button
              size="sm"
              className="bg-white text-sky-700 hover:bg-gray-100 font-semibold"
            >
              <span className="hidden sm:inline">Rejoindre la liste</span>
              <span className="sm:hidden">S'inscrire</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Effet brillant animé */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div> */}
    </div>
  );
}
