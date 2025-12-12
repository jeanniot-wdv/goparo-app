// src/app/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerStep1Schema,
  registerStep2Schema,
  type RegisterStep1Data,
  type RegisterStep2Data,
} from "@/lib/validations/garage";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Loader2,
  Building2,
  User,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Données de l'étape 1 (conservées en mémoire)
  const [step1Data, setStep1Data] = useState<RegisterStep1Data | null>(null);

  // Formulaire étape 1
  const formStep1 = useForm<RegisterStep1Data>({
    resolver: zodResolver(registerStep1Schema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      nom: "",
      prenom: "",
    },
  });

  // Formulaire étape 2
  const formStep2 = useForm<RegisterStep2Data>({
    resolver: zodResolver(registerStep2Schema),
    defaultValues: {
      nomGarage: "",
      siret: "",
      adresse: "",
      codePostal: "",
      ville: "",
      telephone: "",
      emailGarage: "",
    },
  });

  // Soumettre étape 1
  const onSubmitStep1 = async (data: RegisterStep1Data) => {
    setError("");
    setLoading(true);

    try {
      // Vérifier disponibilité email
      const res = await fetch("/api/auth/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await res.json();

      if (result.available) {
        // Email disponible, passer à l'étape 2
        setStep1Data(data);
        setStep(2);
      } else {
        setError(result.message || "Cet email est déjà utilisé");
      }
    } catch (err) {
      setError("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  // Soumettre étape 2 (création finale)
  const onSubmitStep2 = async (data: RegisterStep2Data) => {
    if (!step1Data) {
      setError("Données manquantes");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Combiner les données des 2 étapes
      const completeData = {
        ...step1Data,
        ...data,
      };

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(completeData),
      });

      const result = await res.json();

      if (result.success) {
        // Inscription réussie, rediriger vers le tableau de bord dans un nouvel onglet
        router.push("/");
        window.open("/admin/dashboard", "_blank");
        
        router.refresh();
      } else {
        setError(result.message || "Une erreur est survenue");
      }
    } catch (err) {
      setError("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  const progressValue = step === 1 ? 50 : 100;

  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-500 to-violet-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/logo.svg"
              alt="Goparo Logo"
              width={130}
              height={40}
            />
          </div>
          <CardTitle className="text-2xl font-bold">
            {step === 1 ? "Créer votre compte" : "Informations de votre garage"}
          </CardTitle>
          <CardDescription>
            {step === 1
              ? "Commencez par vos informations personnelles"
              : "Dernière étape avant de commencer !"}
          </CardDescription>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="flex justify-between mb-2 text-sm">
              <span
                className={
                  step === 1 ? "font-semibold text-blue-600" : "text-gray-500"
                }
              >
                Étape 1/2
              </span>
              <span
                className={
                  step === 2 ? "font-semibold text-blue-600" : "text-gray-500"
                }
              >
                Étape 2/2
              </span>
            </div>
            <Progress value={progressValue} className="h-2" />
          </div>
        </CardHeader>

        <CardContent>
          {/* ÉTAPE 1 : Informations utilisateur */}
          {step === 1 && (
            <Form {...formStep1}>
              <form
                onSubmit={formStep1.handleSubmit(onSubmitStep1)}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">Vos informations</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={formStep1.control}
                    name="prenom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Jean"
                            {...field}
                            autoComplete="given-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={formStep1.control}
                    name="nom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Dupont"
                            {...field}
                            autoComplete="family-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={formStep1.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="jean.dupont@email.com"
                          {...field}
                          autoComplete="email"
                        />
                      </FormControl>
                      <FormDescription>
                        Utilisé pour vous connecter à votre espace
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={formStep1.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mot de passe *</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                            autoComplete="new-password"
                          />
                        </FormControl>
                        <FormDescription>Minimum 8 caractères</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={formStep1.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmer *</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                            autoComplete="new-password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {error && (
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={loading}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Continuer
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <p className="text-center text-sm text-gray-600">
                  Vous avez déjà un compte ?{" "}
                  <Link href="/login" className="text-blue-600 hover:underline">
                    Se connecter
                  </Link>
                </p>
              </form>
            </Form>
          )}

          {/* ÉTAPE 2 : Informations garage */}
          {step === 2 && (
            <Form {...formStep2}>
              <form
                onSubmit={formStep2.handleSubmit(onSubmitStep2)}
                className="space-y-4"
              >
                {/* Récap étape 1 */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-900">
                        Compte utilisateur créé
                      </p>
                      <p className="text-sm text-green-700 mt-1">
                        {step1Data?.prenom} {step1Data?.nom} •{" "}
                        {step1Data?.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">Votre garage</h3>
                </div>

                <FormField
                  control={formStep2.control}
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

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={formStep2.control}
                    name="siret"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SIRET *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="12345678900012"
                            maxLength={14}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>14 chiffres</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={formStep2.control}
                    name="telephone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone *</FormLabel>
                        <FormControl>
                          <Input placeholder="0123456789" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={formStep2.control}
                  name="emailGarage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email du garage *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="contact@garage-dupont.fr"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Visible sur vos factures et devis
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formStep2.control}
                  name="adresse"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresse *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="15 Rue de la République"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={formStep2.control}
                    name="codePostal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Code postal *</FormLabel>
                        <FormControl>
                          <Input placeholder="75001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={formStep2.control}
                    name="ville"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ville *</FormLabel>
                        <FormControl>
                          <Input placeholder="Paris" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {error && (
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
                    {error}
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    disabled={loading}
                    className="flex-1"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour
                  </Button>

                  <Button
                    type="submit"
                    className="flex-1"
                    size="lg"
                    disabled={loading}
                  >
                    {loading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Créer mon garage
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
