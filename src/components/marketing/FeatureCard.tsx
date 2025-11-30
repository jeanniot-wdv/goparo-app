// frontend/src/components/marketing/FeatureCard.tsx

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon, // Composant LucideIcon
  title: string,
  content: string,
  iconColor?: string, // Couleur par défaut de l'icône
  iconSize?: number, // Taille par défaut de l'icône
}

export default function FeatureCard({ icon: Icon, title, content, iconColor = "text-white", iconSize = 30 }: FeatureCardProps) {
  return (
    <Card className="rounded-3xl shadow-sm border-gray-200 h-full">
      <CardHeader className="flex flex-col gap-3 items-center sm:items-start text-center sm:text-start">
        <div className="p-3 rounded-lg bg-linear-to-r from-green-300 to-emerald-400">
          <Icon size={iconSize} className={iconColor} />
        </div>
        <CardTitle className="text-2xl font-semibold"><h3>{title}</h3></CardTitle>
      </CardHeader>
      <CardContent className="grow items-center sm:items-start text-center sm:text-start">{content}</CardContent>
      <CardFooter className="justify-center sm:justify-start pt-0 mt-auto">
        <Link href="#features">
          <Button
            variant="link"
            className=" text-emerald-400 inline-flex gap-2"
          >
            En savoir plus <ArrowRight size={16} />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}