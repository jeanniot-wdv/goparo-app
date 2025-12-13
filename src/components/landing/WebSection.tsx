import { Badge } from "../ui/badge";
import TitleItem from "./TitleItem";
import Image from "next/image";

import { motion } from "framer-motion";

export default function WebSection() {
  return (
    <section className="max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-y-10 items-center px-6 sm:mx-auto my-20 lg:my-32">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
      >
        <Image
          src="/images/img-screen.jpg"
          alt="Goparo App Screenshot"
          width={600}
          height={400}
          priority
          className="rounded-3xl shadow-xl mx-auto"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
        className="text-center mx-auto pb-5 lg:pb-10 px-6">
        <Badge className="bg-orange-100 text-orange-600 border-orange-500 px-4 py-2 mb-4 rounded-full font-semibold">
          Exclusivité Goparo
        </Badge>
        <TitleItem
          className="sm:w-4/5 lg:w-2/3 mx-auto"
          text="Le seul logiciel de facturation garage qui génère automatiquement votre site professionnel personnalisable. Gagnez en visibilité, attirez plus de clients et gérez facilement votre image en ligne. Services, promotions, actualités, véhicules à vendre : personnalisez votre site en quelques clics depuis Goparo."
        >
          <span className="text-orange-500">Votre site web inclus</span> et 100%
          administrable
        </TitleItem>
      </motion.div>
    </section>
  );
}
