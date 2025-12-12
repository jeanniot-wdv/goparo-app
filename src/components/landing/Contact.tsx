import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import Link from "next/link";
import TitleItem from "./TitleItem";

export default function Contact() {
  return (
    <section
      id="contact"
      className="flex flex-col items-center justify-center my-16 lg:my-32 px-6"
    >
      <div className="max-w-6xl text-center mx-auto mb-6">
        <TitleItem
          className="mb-10 lg:mb-15"
          text="Laissez-nous vos coordonnées, nous vous répondrons sous 24h."
        >
          Vous avez une autre{" "}
          <span className="text-violet-600">question ?</span>
        </TitleItem>
        <div className="flex items-center justify-center">
          {/* Form */}
          <form className="flex flex-col w-full md:w-3/4">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                <div className="md:w-1/2">
                  <Label htmlFor="firstName">Prénom*</Label>
                  <Input
                    placeholder="Prénom"
                    id="firstName"
                    className="mt-2 bg-white h-10 shadow-none"
                    required
                  />
                </div>
                <div className="md:w-1/2">
                  <Label htmlFor="lastName">Nom*</Label>
                  <Input
                    placeholder="Nom"
                    id="lastName"
                    className="mt-2 bg-white h-10 shadow-none"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email*</Label>
                <Input
                  type="email"
                  placeholder="Email"
                  id="email"
                  className="mt-2 bg-white h-10 shadow-none"
                  required
                />
              </div>
              <div>
                <Label htmlFor="message">Message*</Label>
                <Textarea
                  id="message"
                  placeholder="Parlez-nous de vos besoins..."
                  className="mt-2 bg-white shadow-none"
                  rows={6}
                  required
                />
              </div>
              <div className="flex gap-3">
                <Checkbox id="acceptTerms" className="mt-1 bg-background" />
                <div className="font-[Inter] text-sm text-start text-muted">
                  <Label htmlFor="acceptTerms" className="block leading-snug">
                    J’accepte que mes données personnelles soient utilisées pour
                    me recontacter dans le cadre de ma demande.
                  </Label>
                  <Link
                    href="/politique-de-confidentialite"
                    className="block text-violet-600 hover:underline text-xs mt-0.5"
                  >
                    En savoir plus sur notre politique de confidentialité
                  </Link>
                </div>
              </div>
            </div>
            <Button className="mt-6 w-full sm:w-min mx-auto" size="lg">
              Envoyer mon message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
