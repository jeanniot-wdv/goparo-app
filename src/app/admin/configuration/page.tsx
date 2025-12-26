// src/app/admin/configuration/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  garageConfigSchema,
  type GarageConfigFormData,
} from "@/lib/validations/garage";
import { useUser } from "@/hooks/useUser";
import { FORMES_JURIDIQUES, MENTIONS_LEGALES } from "@/lib/constants/legal";
import {
  Save,
  Building2,
  FileText,
  CreditCard,
  Globe,
  Loader2,
  Lightbulb,
  Check,
  CheckCircle,
  CheckCircle2,
  AlertCircle,
  Copy,
  Info,
  Sparkles,
  Package,
  FileBarChart,
  Calendar,
  Car,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ConfigurationPage() {
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<GarageConfigFormData>({
    resolver: zodResolver(garageConfigSchema) as Resolver<GarageConfigFormData>,
  });

  // Observer la forme juridique pour afficher/masquer le capital social
  const formeJuridique = form.watch("formeJuridique");
  const needsCapital =
    formeJuridique &&
    ["SARL", "EURL", "SAS", "SASU", "SA"].includes(formeJuridique);

  // Charger la config du garage
  useEffect(() => {
    async function fetchGarage() {
      if (!user?.garage?.id) {
        console.log("⚠️ Pas de garage ID");
        setLoading(false);
        return;
      }

      try {
        console.log("🌐 Fetching garage:", user.garage.id);
        const res = await fetch(`/api/garages/${user.garage.id}`);
        const data = await res.json();

        console.log("📦 Data received:", data);

        if (data.success) {
          const g = data.data;
          form.reset({
            nom: g.nom || "",
            formeJuridique: g.formeJuridique || "EI",
            siret: g.siret || "",
            numeroRCS: g.numeroRCS || "",
            capitalSocial: g.capitalSocial
              ? parseFloat(g.capitalSocial)
              : undefined,
            codeAPE: g.codeAPE || "",
            numeroTVA: g.numeroTVA || "",
            adresse: g.adresse || "",
            complementAdresse: g.complementAdresse || "",
            codePostal: g.codePostal || "",
            ville: g.ville || "",
            pays: g.pays || "France",
            email: g.email || "",
            telephone: g.telephone || "",
            assurancePro: g.assurancePro || "",
            numeroPolice: g.numeroPolice || "",
            garantiesAssurance: g.garantiesAssurance || "",
            logo: g.logo || "",
            tarifHoraire: parseFloat(g.tarifHoraire) || 50,
            prefixeFacture: g.prefixeFacture || "FA",
            prefixeDevis: g.prefixeDevis || "DE",
            delaiPaiement: g.delaiPaiement || 30,
            tauxPenaliteRetard: g.tauxPenaliteRetard
              ? parseFloat(g.tauxPenaliteRetard)
              : 10.5,
            indemniteForfaitaire: g.indemniteForfaitaire
              ? parseFloat(g.indemniteForfaitaire)
              : 40,
            tauxEscompte: g.tauxEscompte
              ? parseFloat(g.tauxEscompte)
              : undefined,
            moduleVitrine: g.moduleVitrine || false,
            modulePieces: g.modulePieces || false,
            moduleComptaPro: g.moduleComptaPro || false,
            modulePlanning: g.modulePlanning || false,
            moduleVenteVehicules: g.moduleVenteVehicules || false,
            domaineCustom: g.domaineCustom || "",
          });
        }
      } catch (error) {
        console.error("Fetch garage error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGarage();
  }, [user, form]);

  const onSubmit = async (data: GarageConfigFormData) => {
    console.log("💾 Submitting:", data);
    setSaving(true);
    setSuccess(false);

    try {
      const res = await fetch(`/api/garages/${user?.garage.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        router.refresh();
      } else {
        alert(result.message || "Erreur lors de la sauvegarde");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Erreur réseau");
    } finally {
      setSaving(false);
    }
  };

  const [copied, setCopied] = useState(false);
  const moduleVitrine = form.watch("moduleVitrine");
  const domaineCustom = form.watch("domaineCustom");
  const siteUrl = `https://${user?.garage.slug}.goparo.fr`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(siteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Configuration</h1>
          <p className="text-gray-600 mt-1">
            Gérez les paramètres de votre garage
          </p>
        </div>
        {success && (
          <Badge variant="default" className="bg-green-600">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Sauvegardé
          </Badge>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">
                <Building2 className="mr-2 h-4 w-4" />
                Général
              </TabsTrigger>
              <TabsTrigger value="facturation">
                <FileText className="mr-2 h-4 w-4" />
                Facturation
              </TabsTrigger>
              <TabsTrigger value="modules">
                <CreditCard className="mr-2 h-4 w-4" />
                Modules
              </TabsTrigger>
              <TabsTrigger value="vitrine">
                <Globe className="mr-2 h-4 w-4" />
                Site vitrine
              </TabsTrigger>
            </TabsList>

            {/* ========== ONGLET GÉNÉRAL ========== */}
            <TabsContent value="general" className="space-y-6">
              {/* Informations légales de base */}
              <Card>
                <CardHeader>
                  <CardTitle>Informations légales</CardTitle>
                  <CardDescription>
                    Obligatoires pour la facturation électronique 2026
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="nom"
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
                      control={form.control}
                      name="formeJuridique"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Forme juridique *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={true}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez..." />
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
                          <FormDescription>
                            Obligatoire pour la facturation électronique
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="siret"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SIRET *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="12345678901234"
                              maxLength={14}
                              {...field}
                              disabled={true}
                            />
                          </FormControl>
                          <FormDescription>
                            14 chiffres sans espaces
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="numeroRCS"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Numéro RCS</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="RCS Paris 123 456 789"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>Si société</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="codeAPE"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Code APE/NAF</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="4520A"
                              maxLength={5}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Code activité (ex: 4520A pour réparation auto)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {needsCapital && (
                    <FormField
                      control={form.control}
                      name="capitalSocial"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Capital social (€) *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="10000.00"
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  parseFloat(e.target.value) || undefined
                                )
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
                    control={form.control}
                    name="numeroTVA"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>N° TVA intracommunautaire</FormLabel>
                        <FormControl>
                          <Input placeholder="FR12345678900" {...field} />
                        </FormControl>
                        <FormDescription>
                          Obligatoire si assujetti à la TVA
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Adresse */}
              <Card>
                <CardHeader>
                  <CardTitle>Adresse complète</CardTitle>
                  <CardDescription>
                    Adresse du siège social (obligatoire sur les factures)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
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

                  <FormField
                    control={form.control}
                    name="complementAdresse"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Complément d'adresse</FormLabel>
                        <FormControl>
                          <Input placeholder="Bâtiment A" {...field} />
                        </FormControl>
                        <FormDescription>
                          Bâtiment, étage, lieu-dit (optionnel)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
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
                      control={form.control}
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
                    control={form.control}
                    name="pays"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pays</FormLabel>
                        <FormControl>
                          <Input placeholder="France" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Coordonnées de contact</CardTitle>
                  <CardDescription>
                    Affichées sur les factures et accessibles aux clients
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
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

                    <FormField
                      control={form.control}
                      name="telephone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Téléphone *</FormLabel>
                          <FormControl>
                            <Input placeholder="01 23 45 67 89" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Assurance Pro */}
              <Card>
                <CardHeader>
                  <CardTitle>Assurance professionnelle</CardTitle>
                  <CardDescription>
                    Obligatoire pour les artisans (mention légale sur les
                    factures)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      L'assurance professionnelle est obligatoire pour les
                      activités artisanales. Ces informations doivent figurer
                      sur toutes vos factures.
                    </AlertDescription>
                  </Alert>

                  <FormField
                    control={form.control}
                    name="assurancePro"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom de l'assureur</FormLabel>
                        <FormControl>
                          <Input placeholder="AXA Assurances" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="numeroPolice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Numéro de police</FormLabel>
                        <FormControl>
                          <Input placeholder="POL123456789" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="garantiesAssurance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Garanties couvertes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Responsabilité civile professionnelle, garantie décennale..."
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Détail des garanties de votre assurance
                          professionnelle
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Logo */}
              <Card>
                <CardHeader>
                  <CardTitle>Logo</CardTitle>
                  <CardDescription>
                    Votre logo apparaîtra sur les factures et le site vitrine
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL du logo</FormLabel>
                        <FormControl>
                          <Input
                            type="url"
                            placeholder="https://exemple.com/logo.png"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Format PNG transparent recommandé
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* ========== ONGLET FACTURATION ========== */}
            <TabsContent value="facturation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tarification par défaut</CardTitle>
                  <CardDescription>
                    Ces tarifs seront appliqués par défaut sur vos nouvelles
                    factures
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="tarifHoraire"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tarif horaire (€ HT) *</FormLabel>
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
                          Tarif par défaut pour la main d'œuvre
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Vous pourrez modifier ce tarif sur chaque facture
                      individuellement.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Numérotation</CardTitle>
                  <CardDescription>
                    Configuration des préfixes pour la numérotation automatique
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="prefixeFacture"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Préfixe factures *</FormLabel>
                          <FormControl>
                            <Input placeholder="FA" maxLength={5} {...field} />
                          </FormControl>
                          <FormDescription>Ex: FA-2025-0001</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="prefixeDevis"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Préfixe devis *</FormLabel>
                          <FormControl>
                            <Input placeholder="DE" maxLength={5} {...field} />
                          </FormControl>
                          <FormDescription>Ex: DE-2025-0001</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      La numérotation doit être continue et chronologique
                      (obligation légale). Ne modifiez les préfixes qu'en début
                      d'année.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conditions de paiement par défaut</CardTitle>
                  <CardDescription>
                    Conformes aux obligations légales (Loi Macron, Code de
                    commerce)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="delaiPaiement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Délai de paiement (jours) *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            max={MENTIONS_LEGALES.DELAI_PAIEMENT_MAX}
                            placeholder={MENTIONS_LEGALES.DELAI_PAIEMENT_DEFAUT.toString()}
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                parseInt(e.target.value) ||
                                  MENTIONS_LEGALES.DELAI_PAIEMENT_DEFAUT
                              )
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Maximum légal : {MENTIONS_LEGALES.DELAI_PAIEMENT_MAX}{" "}
                          jours
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">
                      Pénalités de retard (obligatoires)
                    </h4>

                    <FormField
                      control={form.control}
                      name="tauxPenaliteRetard"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Taux de pénalité (% annuel) *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.1"
                              min="0"
                              placeholder={MENTIONS_LEGALES.PENALITE_RETARD_DEFAUT.toString()}
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  parseFloat(e.target.value) ||
                                    MENTIONS_LEGALES.PENALITE_RETARD_DEFAUT
                                )
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            Minimum légal : 3× taux directeur BCE (actuellement{" "}
                            {MENTIONS_LEGALES.PENALITE_RETARD_DEFAUT}%)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="indemniteForfaitaire"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Indemnité forfaitaire de recouvrement (€) *
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              min="40"
                              placeholder={MENTIONS_LEGALES.INDEMNITE_FORFAITAIRE.toString()}
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            Minimum légal : 40 € (Art. L441-10 du Code de
                            commerce)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Mentions légales automatiques</AlertTitle>
                    <AlertDescription className="mt-2">
                      Les mentions de pénalités seront automatiquement ajoutées
                      sur toutes vos factures :
                      <br />
                      <span className="text-xs mt-2 block italic">
                        "En cas de retard de paiement, il sera appliqué des
                        pénalités d'un taux annuel de{" "}
                        {form.watch("tauxPenaliteRetard") ||
                          MENTIONS_LEGALES.PENALITE_RETARD_DEFAUT}
                        % calculées sur le montant TTC. Une indemnité
                        forfaitaire pour frais de recouvrement de{" "}
                        {form.watch("indemniteForfaitaire") ||
                          MENTIONS_LEGALES.INDEMNITE_FORFAITAIRE}
                        € sera également due."
                      </span>
                    </AlertDescription>
                  </Alert>

                  <Separator />

                  <FormField
                    control={form.control}
                    name="tauxEscompte"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Taux d'escompte (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            min="0"
                            max="100"
                            placeholder="0"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                parseFloat(e.target.value) || undefined
                              )
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Pourcentage de réduction si paiement comptant (laissez
                          vide si non applicable)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* ========== ONGLET MODULES ========== */}
            <TabsContent value="modules" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Modules disponibles</CardTitle>
                  <CardDescription>
                    Activez ou désactivez les fonctionnalités selon vos besoins
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Les modules sont facturés mensuellement. Vous pouvez les
                      activer/désactiver à tout moment.
                    </AlertDescription>
                  </Alert>

                  {/* Site vitrine */}
                  <FormField
                    control={form.control}
                    name="moduleVitrine"
                    render={({ field }) => (
                      <FormItem className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-lg border p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Sparkles className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="space-y-1 flex-1">
                            <FormLabel className="text-base font-semibold cursor-pointer">
                              Site vitrine professionnel
                            </FormLabel>
                            <FormDescription className="text-sm">
                              Créez votre présence en ligne avec un site web
                              moderne incluant : présentation, services,
                              actualités, formulaire de contact
                            </FormDescription>
                            <div className="pt-2">
                              <Badge variant="secondary" className="text-xs">
                                19€/mois
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Gestion pièces */}
                  <FormField
                    control={form.control}
                    name="modulePieces"
                    render={({ field }) => (
                      <FormItem className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-lg border p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Package className="h-5 w-5 text-green-600" />
                          </div>
                          <div className="space-y-1 flex-1">
                            <FormLabel className="text-base font-semibold cursor-pointer">
                              Gestion pièces détachées
                            </FormLabel>
                            <FormDescription className="text-sm">
                              Gérez votre stock de pièces détachées :
                              références, prix d'achat/vente, marges, alertes de
                              stock, inventaire
                            </FormDescription>
                            <div className="pt-2">
                              <Badge variant="secondary" className="text-xs">
                                15€/mois
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Comptabilité Pro */}
                  <FormField
                    control={form.control}
                    name="moduleComptaPro"
                    render={({ field }) => (
                      <FormItem className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-lg border p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <FileBarChart className="h-5 w-5 text-purple-600" />
                          </div>
                          <div className="space-y-1 flex-1">
                            <FormLabel className="text-base font-semibold cursor-pointer">
                              Comptabilité professionnelle
                            </FormLabel>
                            <FormDescription className="text-sm">
                              Export compatible Sage/EBP, suivi trésorerie,
                              rapports comptables, accès comptable
                              multi-utilisateurs
                            </FormDescription>
                            <div className="pt-2">
                              <Badge variant="secondary" className="text-xs">
                                29€/mois
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Planning - Bientôt disponible */}
                  <FormField
                    control={form.control}
                    name="modulePlanning"
                    render={({ field }) => (
                      <FormItem className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-lg border p-4 opacity-60">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-orange-100 rounded-lg">
                            <Calendar className="h-5 w-5 text-orange-600" />
                          </div>
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <FormLabel className="text-base font-semibold">
                                Planning atelier
                              </FormLabel>
                              <Badge variant="outline" className="text-xs">
                                Bientôt
                              </Badge>
                            </div>
                            <FormDescription className="text-sm">
                              Calendrier des interventions, gestion des
                              rendez-vous clients, suivi des baies, rappels
                              automatiques
                            </FormDescription>
                            <div className="pt-2">
                              <Badge variant="secondary" className="text-xs">
                                À venir
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Vente véhicules - Bientôt disponible */}
                  <FormField
                    control={form.control}
                    name="moduleVenteVehicules"
                    render={({ field }) => (
                      <FormItem className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-lg border p-4 opacity-60">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-red-100 rounded-lg">
                            <Car className="h-5 w-5 text-red-600" />
                          </div>
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <FormLabel className="text-base font-semibold">
                                Vente véhicules d'occasion
                              </FormLabel>
                              <Badge variant="outline" className="text-xs">
                                Bientôt
                              </Badge>
                            </div>
                            <FormDescription className="text-sm">
                              Catalogue en ligne de vos véhicules d'occasion,
                              fiches détaillées, photos, demandes d'information
                            </FormDescription>
                            <div className="pt-2">
                              <Badge variant="secondary" className="text-xs">
                                À venir
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Résumé facturation */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Résumé de votre abonnement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Offre de base</span>
                      <span className="font-medium">Gratuit</span>
                    </div>

                    {form.watch("moduleVitrine") && (
                      <div className="flex justify-between text-sm">
                        <span>Site vitrine</span>
                        <span className="font-medium">19€/mois</span>
                      </div>
                    )}

                    {form.watch("modulePieces") && (
                      <div className="flex justify-between text-sm">
                        <span>Gestion pièces</span>
                        <span className="font-medium">15€/mois</span>
                      </div>
                    )}

                    {form.watch("moduleComptaPro") && (
                      <div className="flex justify-between text-sm">
                        <span>Comptabilité Pro</span>
                        <span className="font-medium">29€/mois</span>
                      </div>
                    )}

                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total HT</span>
                        <span className="text-blue-600">
                          {(form.watch("moduleVitrine") ? 19 : 0) +
                            (form.watch("modulePieces") ? 15 : 0) +
                            (form.watch("moduleComptaPro") ? 29 : 0)}
                          €/mois
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ========== ONGLET SITE VITRINE ========== */}
            <TabsContent value="vitrine" className="space-y-6">
              {/* Avertissement si module non activé */}
              {!moduleVitrine && (
                <Alert className="border-orange-200 bg-orange-50">
                  <Info className="h-4 w-4 text-orange-600" />
                  <AlertTitle className="text-orange-900">
                    Module non activé
                  </AlertTitle>
                  <AlertDescription className="text-orange-800">
                    Activez le module "Site vitrine" dans l'onglet Modules pour
                    accéder à ces fonctionnalités.
                  </AlertDescription>
                </Alert>
              )}

              {/* URL du site */}
              <Card className={!moduleVitrine ? "opacity-60" : ""}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Votre site web
                  </CardTitle>
                  <CardDescription>
                    URL de votre site vitrine professionnel
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 rounded-lg bg-blue-50 border border-blue-200 p-4">
                      <p className="text-sm font-medium text-blue-900 mb-1">
                        Adresse de votre site
                      </p>
                      <div className="flex items-center gap-2">
                        <code className="text-sm text-blue-700 break-all">
                          {siteUrl}
                        </code>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleCopyUrl}
                          disabled={!moduleVitrine}
                          className="shrink-0"
                        >
                          {copied ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      disabled={!moduleVitrine}
                      onClick={() => window.open(siteUrl, "_blank")}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">Voir le site</span>
                      <span className="sm:hidden">Voir</span>
                    </Button>
                  </div>

                  {moduleVitrine && (
                    <Alert>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-sm">
                        Votre site est en ligne et accessible à vos clients !
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Domaine personnalisé */}
              <Card className={!moduleVitrine ? "opacity-60" : ""}>
                <CardHeader>
                  <CardTitle>Domaine personnalisé</CardTitle>
                  <CardDescription>
                    Utilisez votre propre nom de domaine (option payante)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="domaineCustom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Votre nom de domaine</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="www.garage-dupont.fr"
                            disabled={!moduleVitrine}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Vous possédez déjà un nom de domaine ? Configurez-le
                          pour pointer vers votre site Goparo
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {domaineCustom && (
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>Configuration DNS requise</AlertTitle>
                      <AlertDescription className="mt-2 text-sm space-y-2">
                        <p>
                          Pour utiliser votre domaine personnalisé, ajoutez ces
                          enregistrements DNS chez votre registrar :
                        </p>
                        <div className="bg-gray-100 p-3 rounded font-mono text-xs space-y-1">
                          <div>Type: CNAME</div>
                          <div>Nom: www</div>
                          <div>Valeur: {user?.garage.slug}.goparo.fr</div>
                        </div>
                        <p className="text-xs text-gray-600">
                          La propagation DNS peut prendre jusqu'à 48h.
                          Contactez-nous si vous avez besoin d'aide.
                        </p>
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="rounded-lg bg-gray-50 border p-4">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-gray-600 shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-700">
                        <p className="font-medium mb-1">
                          Vous n'avez pas de domaine ?
                        </p>
                        <p className="text-gray-600">
                          Nous vous accompagnons dans l'achat et la
                          configuration de votre nom de domaine. Tarif : 15€/an
                          + configuration incluse.
                        </p>
                        <Button
                          type="button"
                          variant="link"
                          className="h-auto p-0 text-blue-600 mt-2"
                          disabled={!moduleVitrine}
                        >
                          Nous contacter →
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Fonctionnalités du site */}
              <Card className={!moduleVitrine ? "opacity-60" : ""}>
                <CardHeader>
                  <CardTitle>Fonctionnalités incluses</CardTitle>
                  <CardDescription>
                    Tout ce dont vous avez besoin pour votre présence en ligne
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">
                          Présentation du garage
                        </p>
                        <p className="text-xs text-gray-600">
                          Vos informations, services, horaires
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Page actualités</p>
                        <p className="text-xs text-gray-600">
                          Publiez vos nouveautés et promotions
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">
                          Formulaire de contact
                        </p>
                        <p className="text-xs text-gray-600">
                          Recevez les demandes par email
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Design responsive</p>
                        <p className="text-xs text-gray-600">
                          Optimisé mobile, tablette, desktop
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Référencement SEO</p>
                        <p className="text-xs text-gray-600">
                          Visible sur Google Maps & recherche
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">HTTPS sécurisé</p>
                        <p className="text-xs text-gray-600">
                          Certificat SSL inclus
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Aperçu et personnalisation */}
              {moduleVitrine && (
                <Card>
                  <CardHeader>
                    <CardTitle>Personnalisation</CardTitle>
                    <CardDescription>
                      Gérez le contenu de votre site vitrine
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-between"
                      onClick={() =>
                        (window.location.href = "/admin/actualites")
                      }
                    >
                      <span>Gérer les actualités</span>
                      <ExternalLink className="h-4 w-4" />
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-between"
                      onClick={() => (window.location.href = "/admin/services")}
                    >
                      <span>Gérer les services</span>
                      <ExternalLink className="h-4 w-4" />
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-between"
                      onClick={() => (window.location.href = "/admin/horaires")}
                    >
                      <span>Modifier les horaires</span>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          <div className="flex justify-end pt-6">
            <Button type="submit" size="lg" disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Save className="mr-2 h-4 w-4" />
              Enregistrer les modifications
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
