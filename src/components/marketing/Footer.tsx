import { Separator } from "@/components/ui/separator";
import {
  DribbbleIcon,
  GithubIcon,
  TwitchIcon,
  TwitterIcon,
} from "lucide-react";
import Link from "next/link";

const footerSections = [
  {
    title: "Solution",
    links: [
      {
        title: "Fonctionnalités",
        href: "#",
      },
      {
        title: "Tarifs",
        href: "#",
      },
      {
        title: "Sécurité & Conformité",
        href: "#",
      },
      {
        title: "Intégrations (Sage, EBP...)",
        href: "#",
      },
      {
        title: "API Documentation",
        href: "#",
      },
    ],
  },
  {
    title: "Ressources",
    links: [
      {
        title: "Centre d'aide",
        href: "#",
      },
      {
        title: "Blog / Actualités ",
        href: "#",
      },
      {
        title: "Guide de démarrage",
        href: "#",
      },
      {
        title: "Études de cas",
        href: "#",
      },
      {
        title: "Téléchargements",
        href: "#",
      },
    ],
  },
  {
    title: "Entreprise",
    links: [
      {
        title: "À propos",
        href: "#",
      },
      {
        title: "Contact",
        href: "#",
      },
      {
        title: "Devenir partenaire",
        href: "#",
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-white via-violet-100 to-sky-300 border-t">
      <div className="max-w-(--breakpoint-xl) mx-auto">
        <div className="max-w-6xl mx-auto py-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10 px-6">
          <div className="col-span-full lg:col-span-2 flex flex-col sm:flex-row lg:flex-col gap-4 sm:gap-10 lg:gap-4">
            <div>

            <Link href="/">
              <img src="images/logo.svg" alt="Goparo Logo" />
            </Link>
            <div className="mt-4 flex items-center gap-5 text-muted-foreground">
              <Link href="#" target="_blank">
                <TwitterIcon className="h-5 w-5" />
              </Link>
              <Link href="#" target="_blank">
                <DribbbleIcon className="h-5 w-5" />
              </Link>
              <Link href="#" target="_blank">
                <TwitchIcon className="h-5 w-5" />
              </Link>
              <Link href="#" target="_blank">
                <GithubIcon className="h-5 w-5" />
              </Link>
            </div>
            </div>

            <p>
              Goparo est la solution SaaS tout-en-un pour les garages automobiles. Facturation conforme 2026, site vitrine automatique, gestion complète de l'atelier.
            </p>
          </div>

          {footerSections.map(({ title, links }) => (
            <div key={title}>
              <h6 className="font-medium">{title}</h6>
              <ul className="mt-6 space-y-4">
                {links.map(({ title, href }) => (
                  <li key={title}>
                    <Link
                      href={href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Separator />
        <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6">
          {/* Copyright */}
          <span className="text-muted-foreground">
            &copy; {new Date().getFullYear()}{" "}
            <Link href="/" target="_blank">
              Goparo
            </Link>
            . Tous droits réservés.
          </span>

          <div className="font-[Inter] text-sm flex flex-col sm:flex-row items-center sm:gap-3 text-muted-foreground">
              <Link href="#" target="_blank">CGU</Link>
              <Link href="#" target="_blank">Politique de confidentialité</Link>
              <Link href="#" target="_blank">Mentions légales</Link>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
