// frontend/src/components/marketing/FeatureCard.tsx

import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
  icon: LucideIcon; // Composant LucideIcon
  title: string;
  content: string;
  iconColor?: string; // Couleur par défaut de l'icône
  iconSize?: number; // Taille par défaut de l'icône
}

export default function FeatureCard({
  icon: Icon,
  title,
  content,
  iconColor,
  iconSize = 50,
}: FeatureCardProps) {
  return (
    <motion.div whileHover={{scale: 1.05}} className="h-full">
      <Card className="h-full shadow-lg hover:shadow-2xl transition-shadow px-5 py-10 duration-300">
        <CardHeader className="flex flex-col gap-2 items-center sm:items-start text-center sm:text-start">
          <Icon size={iconSize} className={iconColor} />
          <CardTitle className="text-2xl font-bold">
            <h3>{title}</h3>
          </CardTitle>
        </CardHeader>
        <CardContent className="grow items-center sm:items-start text-center sm:text-start">
          {content}
        </CardContent>
      </Card>
    </motion.div>
  );
}
