// src/app/admin/configuration/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { garageConfigSchema, type GarageConfigFormData } from '@/lib/validations/garage'
import { useUser } from '@/hooks/useUser'
import {
  Save,
  Building2,
  FileText,
  CreditCard,
  Globe,
  Loader2,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

export default function ConfigurationPage() {
  const router = useRouter()
  const { user } = useUser()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  const form = useForm<GarageConfigFormData>({
    resolver: zodResolver(garageConfigSchema),
  })

  // Charger la config du garage
  useEffect(() => {
    async function fetchGarage() {
      if (!user?.garage.id) return

      try {
        const res = await fetch(`/api/garages/${user.garage.id}`)
        const data = await res.json()

        if (data.success) {
          form.reset({
            nom: data.data.nom,
            siret: data.data.siret,
            adresse: data.data.adresse,
            codePostal: data.data.codePostal,
            ville: data.data.ville,
            email: data.data.email,
            telephone: data.data.telephone,
            numeroTVA: data.data.numeroTVA || '',
            logo: data.data.logo || '',
            tarifHoraire: parseFloat(data.data.tarifHoraire),
            prefixeFacture: data.data.prefixeFacture,
            prefixeDevis: data.data.prefixeDevis,
            moduleVitrine: data.data.moduleVitrine,
            modulePieces: data.data.modulePieces,
            moduleComptaPro: data.data.moduleComptaPro,
            modulePlanning: data.data.modulePlanning,
            moduleVenteVehicules: data.data.moduleVenteVehicules,
            domaineCustom: data.data.domaineCustom || '',
          })
        }
      } catch (error) {
        console.error('Fetch garage error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGarage()
  }, [user, form])

  const onSubmit = async (data: GarageConfigFormData) => {
    setSaving(true)
    setSuccess(false)

    try {
      const res = await fetch(`/api/garages/${user?.garage.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (result.success) {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
        router.refresh()
      } else {
        alert(result.message || 'Erreur lors de la sauvegarde')
      }
    } catch (error) {
      console.error('Save error:', error)
      alert('Erreur réseau')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    )
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

            {/* Onglet Général */}
            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations générales</CardTitle>
                  <CardDescription>
                    Informations légales de votre garage
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
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="siret"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SIRET *</FormLabel>
                          <FormControl>
                            <Input {...field} maxLength={14} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="numeroTVA"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>N° TVA intracommunautaire</FormLabel>
                          <FormControl>
                            <Input placeholder="FR12345678900" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="adresse"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adresse *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
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
                            <Input {...field} />
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
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormDescription>
                            Affiché sur les factures
                          </FormDescription>
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
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Onglet Facturation */}
            <TabsContent value="facturation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres de facturation</CardTitle>
                  <CardDescription>
                    Configuration des tarifs et numérotation
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
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>
                          Tarif par défaut pour la main d'œuvre
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator />

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
                          <FormDescription>
                            Ex: FA-2025-0001
                          </FormDescription>
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
                          <FormDescription>
                            Ex: DE-2025-0001
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Onglet Modules */}
            <TabsContent value="modules" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Modules activés</CardTitle>
                  <CardDescription>
                    Activez ou désactivez les fonctionnalités
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="moduleVitrine"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Site vitrine
                          </FormLabel>
                          <FormDescription>
                            Créez votre site web professionnel (19€/mois)
                          </FormDescription>
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

                  <FormField
                    control={form.control}
                    name="modulePieces"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Gestion pièces détachées
                          </FormLabel>
                          <FormDescription>
                            Gérez votre stock et vos marges (15€/mois)
                          </FormDescription>
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

                  <FormField
                    control={form.control}
                    name="moduleComptaPro"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Comptabilité Pro
                          </FormLabel>
                          <FormDescription>
                            Export Sage/EBP et accès comptable (29€/mois)
                          </FormDescription>
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

                  <FormField
                    control={form.control}
                    name="modulePlanning"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4 opacity-60">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Planning atelier
                            <Badge variant="secondary" className="ml-2">
                              Bientôt
                            </Badge>
                          </FormLabel>
                          <FormDescription>
                            Calendrier et gestion des interventions
                          </FormDescription>
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

                  <FormField
                    control={form.control}
                    name="moduleVenteVehicules"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4 opacity-60">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Vente véhicules
                            <Badge variant="secondary" className="ml-2">
                              Bientôt
                            </Badge>
                          </FormLabel>
                          <FormDescription>
                            Catalogue véhicules d'occasion
                          </FormDescription>
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
            </TabsContent>

            {/* Onglet Site vitrine */}
            <TabsContent value="vitrine" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configuration du site vitrine</CardTitle>
                  <CardDescription>
                    Personnalisez votre présence en ligne
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg bg-blue-50 p-4">
                    <p className="text-sm font-medium text-blue-900">
                      URL de votre site
                    </p>
                    <p className="text-sm text-blue-700 mt-1">
                      {user?.garage.slug}.goparo.fr
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="domaineCustom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Domaine personnalisé</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="www.garage-dupont.fr"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Configurez votre propre nom de domaine (option payante)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-600">
                      💡 Le module site vitrine vous permet de créer votre site
                      web professionnel avec actualités et formulaire de contact.
                    </p>
                  </div>
                </CardContent>
              </Card>
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
  )
}