"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  waitlistSchema,
  type WaitlistFormData,
} from "@/lib/validations/waitlist";
import { Loader2, CheckCircle2, AlertCircle, Shield } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function WaitlistForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const form = useForm<Omit<WaitlistFormData, "recaptchaToken">>({
    resolver: zodResolver(waitlistSchema.omit({ recaptchaToken: true })),
  });

  const onSubmit = async (data: Omit<WaitlistFormData, "recaptchaToken">) => {
    setSubmitting(true);
    setError("");
    try {
      if (typeof window === "undefined" || !window.grecaptcha) {
        setError("reCAPTCHA non chargé. Veuillez accepter les cookies.");
        return;
      }
      const recaptchaToken = await window.grecaptcha.execute(
        `${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`,
        { action: "waitlist_submit" }
      );
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, recaptchaToken }),
      });
      const result = await res.json();
      if (result.success) {
        // Envoie les données à GTM AVANT de mettre success à true
        if (typeof window !== "undefined" && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: "waitlist_submit",
            garage_name: data.nomGarage,
            garage_size: data.tailleGarage,
            plan: data.forfaitInteresse,
          });
        }
        setSuccess(true);
        form.reset();
      } else {
        setError(result.message || "Une erreur est survenue");
      }
    } catch (err) {
      setError("Erreur réseau. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <Card className="max-w-2xl mx-auto border-2 border-green-200 bg-green-50 my-16 lg:my-32">
        <CardContent className="p-8 text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-600 mb-4" />
          <CardTitle className="text-2xl mb-2">
            🎉 Inscription réussie !
          </CardTitle>
          <AlertDescription className="text-green-700 mb-4">
            Merci de votre intérêt pour Goparo. Nous vous avons envoyé un email
            de confirmation.
          </AlertDescription>
          <p className="text-sm text-green-600">
            Consultez votre boîte de réception (et les spams, au cas où 😉)
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <section id="contact" className="mx-6 sm:mx-auto my-16 lg:my-32">
      <Card className="max-w-2xl shadow-xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">
            Rejoignez la liste d'attente
          </CardTitle>
          <CardDescription className="pb-10">
            Soyez parmi les premiers à découvrir Goparo et profitez de{" "}
            <span className="font-semibold text-blue-600">3 mois gratuits</span>{" "}
            !
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <Alert variant="destructive" className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 mt-0.5" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {/* Nom */}
              <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Votre nom *</FormLabel>
                    <FormControl>
                      <Input placeholder="Jean Dupont" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse email *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="jean.dupont@garage.fr"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Nom du garage */}
              <FormField
                control={form.control}
                name="nomGarage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du garage *</FormLabel>
                    <FormControl>
                      <Input placeholder="Garage Dupont" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4">
                {/* Taille garage */}
                <FormField
                  control={form.control}
                  name="tailleGarage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre d'employés *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1-5">1 à 5 employés</SelectItem>
                          <SelectItem value="6-10">6 à 10 employés</SelectItem>
                          <SelectItem value="11-20">
                            11 à 20 employés
                          </SelectItem>
                          <SelectItem value="21+">
                            Plus de 20 employés
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Forfait intéressé */}
                <FormField
                  control={form.control}
                  name="forfaitInteresse"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Forfait qui vous intéresse *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Découverte">
                            Gratuit - 0€/mois
                          </SelectItem>
                          <SelectItem value="Essentiel">
                            Essentiel - 29€/mois
                          </SelectItem>
                          <SelectItem value="Pro">Pro - 69€/mois</SelectItem>
                          <SelectItem value="Premium">
                            Premium - 129€/mois
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Badge reCAPTCHA */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Shield className="h-4 w-4" />
                <span>Protégé par reCAPTCHA</span>
              </div>
              {/* Submit */}
              <Button
                size={"lg"}
                type="submit"
                disabled={submitting}
                className="flex w-full sm:w-fit mx-auto bg-gradient-to-r from-sky-600 to-violet-600 hover:from-blue-700 hover:to-purple-700 transition-all hover:scale-105 active:scale-95 shadow-lg"
                onClick={() => {
                  if (
                    typeof window !== "undefined" &&
                    (window as any).dataLayer
                  ) {
                    (window as any).dataLayer.push({
                      event: "waitlist_cta_click",
                      button_text: "Rejoindre la liste d'attente",
                    });
                  }
                }}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Inscription en cours...
                  </>
                ) : (
                  "Rejoindre la liste d'attente"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500">
          <p>
            En vous inscrivant, vous acceptez de recevoir nos communications.
            Vous pouvez vous désinscrire à tout moment.
            <br />
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Politique de confidentialité Google
            </a>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}
