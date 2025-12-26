// src/app/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { FORMES_JURIDIQUES } from "@/lib/constants/legal";
import {
  registerStep1Schema,
  registerStep2Schema,
  registerStep3Schema,
  type RegisterStep1Data,
  type RegisterStep2Data,
  type RegisterStep3Data,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Loader2,
  Building2,
  User,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Shield,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Données de l'étape 1 (conservées en mémoire)
  const [step1Data, setStep1Data] = useState<RegisterStep1Data | null>(null);
  const [step2Data, setStep2Data] = useState<RegisterStep2Data | null>(null);

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
      formeJuridique: "",
      siret: "",
      capitalSocial: undefined,
      adresse: "",
      codePostal: "",
      ville: "",
      pays: "",
      telephone: "",
      emailGarage: "",
    },
  });

  // Formulaire étape 3
  const formStep3 = useForm({
    resolver: zodResolver(registerStep3Schema),
    defaultValues: {
      assurancePro: "",
      numeroPolice: "",
      garantiesAssurance: "",
      numeroTVA: "",
      codeAPE: "",
    },
  });

  const formeJuridique = formStep2.watch("formeJuridique");
  const needsCapital =
    formeJuridique &&
    ["SARL", "EURL", "SAS", "SASU", "SA"].includes(formeJuridique);

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

  // Soumettre étape 2
const onSubmitStep2 = (data: RegisterStep2Data) => {
    setStep2Data(data)
    setStep(3)
  };

  // Soumettre étape 3 (création finale)
  const onSubmitStep3 = async (data: RegisterStep3Data) => {
    if (!step1Data || !step2Data) {
      setError("Données manquantes");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Combiner les données des 3 étapes
      const completeData = {
        ...step1Data,
        ...step2Data,
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

  const progressValue = (step / 3) * 100

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
          <CardTitle className="text-2xl">
            {step === 1 && 'Créer votre compte'}
            {step === 2 && 'Informations du garage'}
            {step === 3 && 'Sécurité et conformité'}
          </CardTitle>
          <CardDescription>
            Étape {step} sur 3
          </CardDescription>
          <Progress value={progressValue} className="mt-4" />
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
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
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
                <div className="bg-green-50 p-3 rounded-lg flex items-center gap-2 mb-4">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm">
                    {step1Data?.prenom} {step1Data?.nom} • {step1Data?.email}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold">Votre garage</h3>
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

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={formStep2.control}
                    name="formeJuridique"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Forme juridique *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choisir..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {FORMES_JURIDIQUES.map((forme) => (
                              <SelectItem key={forme} value={forme}>
                                {forme}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={formStep2.control}
                    name="siret"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SIRET *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="12345678901234"
                            maxLength={14}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {needsCapital && (
                  <FormField
                    control={formStep2.control}
                    name="capitalSocial"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capital social (€) *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Obligatoire pour {formeJuridique}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={formStep2.control}
                  name="adresse"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresse *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="15 rue de la République"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
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

                <FormField
                  control={formStep2.control}
                  name="pays"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pays *</FormLabel>
                      <FormControl>
                        <Input placeholder="France" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
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

                  <FormField
                    control={formStep2.control}
                    name="emailGarage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email garage *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="contact@garage.fr"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour
                  </Button>
                  <Button type="submit" className="flex-1">
                    Continuer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {/* ÉTAPE 3 : Assurance & TVA */}
          {step === 3 && (
            <Form {...formStep3}>
              <form
                onSubmit={formStep3.handleSubmit(onSubmitStep3)}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold">Assurance & conformité</h3>
                </div>

                <Alert>
                  <AlertDescription>
                    Ces informations sont obligatoires pour les artisans et
                    doivent figurer sur vos factures.
                  </AlertDescription>
                </Alert>

                <FormField
                  control={formStep3.control}
                  name="assurancePro"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom de l'assureur *</FormLabel>
                      <FormControl>
                        <Input placeholder="AXA Assurances" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formStep3.control}
                  name="numeroPolice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numéro de police *</FormLabel>
                      <FormControl>
                        <Input placeholder="POL123456789" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formStep3.control}
                  name="garantiesAssurance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Garanties couvertes *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="RC professionnelle, garantie décennale..."
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formStep3.control}
                  name="numeroTVA"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>N° TVA intracommunautaire</FormLabel>
                      <FormControl>
                        <Input placeholder="FR12345678900" {...field} />
                      </FormControl>
                      <FormDescription>Si assujetti à la TVA</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formStep3.control}
                  name="codeAPE"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code APE/NAF</FormLabel>
                      <FormControl>
                        <Input placeholder="4520A" maxLength={5} {...field} />
                      </FormControl>
                      <FormDescription>
                        Ex: 4520A pour réparation auto
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="flex-1"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour
                  </Button>
                  <Button type="submit" className="flex-1" disabled={loading}>
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
