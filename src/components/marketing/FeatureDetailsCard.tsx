// frontend/src/components/marketing/FeatureCard.tsx

import { LucideIcon, CircleCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
  bgColor: string;
  icon: LucideIcon; // Composant LucideIcon
  title: string;
  content: string;
  iconColor?: string; // Couleur par défaut de l'icône
  iconSize?: number; // Taille par défaut de l'icône
  features: string[];
}

export default function FeatureDetailsCard({
  bgColor,
  icon: Icon,
  title,
  content,
  iconColor = "text-white",
  iconSize = 70,
  features,
}: FeatureCardProps) {
  return (
    <Card
      className={`bg-${bgColor}-500 rounded-3xl text-white shadow-lg border-gray-200 h-full`}
    >
      <CardHeader className="flex gap-3">
        <Icon size={iconSize} className={`-mt-2 ${iconColor}`} />

        <CardTitle className="text-2xl xl:text-3xl font-semibold">
          <h3>{title}</h3>
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="hidden sm:block">{content}</div>
        <ul className="text-sm font-medium mt-4 space-y-2 leading-snug">
          {features.map((feature) => (
            <li key={feature} className="flex gap-2">
              <CircleCheck className="h-5 w-5 shrink-0 mt-px" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
