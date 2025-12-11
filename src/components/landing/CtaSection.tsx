
import Link from "next/link";
import TitleItem from "./TitleItem";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function CtaSection() {
  return (
    <motion.section
        className="flex flex-col items-center justify-center bg-gradient-to-r from-sky-600 to-violet-600 text-white rounded-r-3xl md:rounded-r-full py-10 sm:py-24 px-6"
        initial={{ opacity: 0, translateX: "-100%" }}
        whileInView={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl text-center mx-auto mb-6">
          <TitleItem text="Rejoignez les garages qui modernisent leur gestion avec Goparo. Commencez gratuitement dès aujourd'hui et découvrez la simplicité d'une solution tout-en-un conçue pour vous.">
            Prêt à transformer la gestion de votre garage ?
          </TitleItem>
        </div>
        <Link href="/register" className="w-full sm:w-fit">
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-white to-white text-sky-600 hover:from-violet-50 hover:to-violet-300 hover:shadow-xl transition-all hover:scale-105 "
          >
            Commencer gratuitement
          </Button>
        </Link>
      </motion.section>
  )
}