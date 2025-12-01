// frontend/src/components/marketing/Stats.tsx

import Link from "next/link";
import TitleItem from "./TitleItem";
import { Button } from "../ui/button";

export default function Stats () {
  return (
    <section className="bg-slate-100 flex flex-col items-center justify-center py-10 sm:py-20 px-6">
      <div className="max-w-(--breakpoint-xl) mx-auto text-center">
        <div className="mx-auto md:w-2/3">

        <TitleItem>
          Des résultats qui parlent d'eux-mêmes
        </TitleItem>
        </div>

        <div className="mt-5 lg:mt-10 grid md:grid-cols-3 gap-12 justify-center">
          <div className="max-w-3xs">
            <span className="text-5xl font-bold">-40%</span>
            <p className="mt-5 text-lg">
              Temps passé sur la facturation
            </p>
          </div>
          <div className="max-w-3xs">
            <span className="text-5xl font-bold">100%</span>
            <p className="mt-5 text-lg">
              Conforme réglementation 2026
            </p>
          </div>
          <div className="max-w-3xs">
            <span className="text-5xl font-bold">99,9%</span>
            <p className="mt-5 text-lg">
              Disponilité garantie pour votre garage
            </p>
          </div>
        </div>
      </div>
      <div className="w-full sm:mx-auto text-center">
          <Link href="/register">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto mt-5 lg:mt-10 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white"
            >
              Commencer gratuitement
            </Button>
          </Link>
        </div>
    </section>
  );
};
