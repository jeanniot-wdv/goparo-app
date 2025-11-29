// src/components/marketing/Hero.tsx

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <section
      className="sm:flex -mt-5 bg-linear-to-tl from-violet-700 to-violet-900 py-10 lg:py-20 px-8 md:pl-20 md:px-0 gap-10 items-center"
      id="hero"
    >
      {/* Left side */}
      <div className="md:w-3/4 lg:w-1/2 flex flex-col justify-center mt-5">
        <div className="flex flex-wrap gap-4 mb-4">
          <Badge variant="success">Conforme facturation 2026</Badge>
          <Badge variant="success">Site web inclus</Badge>
          <Badge variant="success">Export comptabilité</Badge>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-12 md:leading-16 uppercase">
          Le logiciel de gestion garage <br />
          <span className="text-orange-500">qui simplifie tout</span>
        </h1>
        <p className="mt-6 text-lg md:text-lg text-white mx-auto">
          La solution tout-en-un pour gérer votre garage : facturation conforme
          + site web professionnel intégré.
        </p>

        <p className="mt-6 text-white mx-auto">
          Avec Goparo, vous centralisez tout : devis, factures conformes 2026,
          planning des interventions, vente de véhicules, site vitrine dynamique
          et export comptable. Simple, rapide et 100 % cloud — accessible
          partout, même dans l’atelier.
        </p>
        <div className="mt-10 flex gap-8">
          <Link href="/register">
            <Button size="lg" className="shadow-lg/50 shadow-white/50 font-medium">
              Commencer gratuitement
            </Button>
          </Link>
          <Link href="#features">
            <Button variant="outline" size="lg" className="text-white font-medium">
              Contacter notre équipe
            </Button>
          </Link>
        </div>
      </div>

      {/* Right side */}
      <div className="hidden lg:w-1/2 lg:flex items-center justify-center mt-5">
        <Image
          src="images/img-hero.svg"
          alt="Goparo App Screenshot"
          width={600}
          height={400}
          className="w-full"
        />
      </div>
    </section>
  );
}
