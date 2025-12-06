import { Badge } from "../ui/badge";
import TitleItem from "./TitleItem";

import { motion } from "framer-motion";

export default function WebSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="items-center justify-center my-20 lg:my-35"
    >
      <div className="text-center mx-auto pb-5 lg:pb-10 px-6">
        <Badge className="bg-orange-100 text-orange-600 border-orange-500 px-4 py-2 mb-4 rounded-full font-semibold">
          Exclusivité Goparo
        </Badge>
        <TitleItem
          className="sm:w-4/5 lg:w-2/3 mx-auto"
          text="Le seul logiciel de facturation garage qui génère automatiquement votre site professionnel personnalisable. Gagnez en visibilité, attirez plus de clients et gérez facilement votre image en ligne. Services, promotions, actualités, véhicules à vendre : personnalisez votre site en quelques clics depuis Goparo."
        >
          <span className="text-orange-500">Votre site web inclus</span> et 100% administrable
        </TitleItem>
      </div>
      </motion.section>
  )
}