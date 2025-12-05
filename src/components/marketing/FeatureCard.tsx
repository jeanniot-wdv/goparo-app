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
  iconSize = 40,
}: FeatureCardProps) {
  return (
    <motion.div whileHover={{scale: 1.05}}>
      <Card className="h-full shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <CardHeader className="flex flex-col gap-2 items-center sm:items-start text-center sm:text-start">
          <Icon size={iconSize} className={`text-${iconColor}`} />
          <CardTitle className="text-2xl font-medium">
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
