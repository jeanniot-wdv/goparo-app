// src/components/admin/clients/ClientModal.tsx
'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { clientSchema, type ClientFormData } from '@/lib/validations/client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface ClientModalProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
  client?: any // Client à éditer (optionnel)
}

export function ClientModal({ open, onClose, onSuccess, client }: ClientModalProps) {
  const [loading, setLoading] = useState(false)
  const isEditing = !!client

  const form = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      civilite: 'M',
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      adresse: '',
      codePostal: '',
      ville: '',
      notes: '',
    },
  })

  // Charger les données du client si édition
  useEffect(() => {
    if (client) {
      form.reset({
        typeClient: client.typeClient || 'PARTICULIER',
        civilite: client.civilite || 'M',
        nom: client.nom,
        prenom: client.prenom,
        raisonSociale: client.raisonSociale || '',
        siretClient: client.siretClient || '',
        numeroTVAClient: client.numeroTVAClient || '',
        email: client.email || '',
        telephone: client.telephone,
        adresse: client.adresse || '',
        complementAdresse: client.complementAdresse || '',
        codePostal: client.codePostal || '',
        ville: client.ville || '',
        pays: client.pays || 'France',
        consentementRGPD: client.consentementRGPD || false,
        notes: client.notes || '',
      })
    } else {
      form.reset({
        typeClient: 'PARTICULIER',
        civilite: 'M',
        nom: '',
        prenom: '',
        raisonSociale: '',
        siretClient: '',
        numeroTVAClient: '',
        email: '',
        telephone: '',
        adresse: '',
        complementAdresse: '',
        codePostal: '',
        ville: '',
        pays: 'France',
        consentementRGPD: false,
        notes: '',
      })
    }
  }, [client, form])

  const onSubmit = async (data: ClientFormData) => {
    setLoading(true)

    try {
      const url = isEditing ? `/api/clients/${client.id}` : '/api/clients'
      const method = isEditing ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (result.success) {
        onSuccess()
        onClose()
        form.reset()
      } else {
        alert(result.message || 'Une erreur est survenue')
      }
    } catch (error) {
      console.error('Submit error:', error)
      alert('Erreur réseau')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Modifier le client' : 'Nouveau client'}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Modifiez les informations du client'
              : 'Remplissez les informations du nouveau client'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Type de client */}
            <FormField
              control={form.control}
              name="typeClient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de client *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="PARTICULIER">Particulier</SelectItem>
                      <SelectItem value="PROFESSIONNEL">Professionnel</SelectItem>
                      <SelectItem value="ADMINISTRATION">Administration</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Si PROFESSIONNEL : Raison sociale + SIRET */}
            {form.watch('typeClient') === 'PROFESSIONNEL' && (
              <>
                <FormField
                  control={form.control}
                  name="raisonSociale"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Raison sociale *</FormLabel>
                      <FormControl>
                        <Input placeholder="Garage Martin SARL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="siretClient"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SIRET</FormLabel>
                        <FormControl>
                          <Input placeholder="12345678900012" maxLength={14} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="numeroTVAClient"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>N° TVA</FormLabel>
                        <FormControl>
                          <Input placeholder="FR12345678900" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            {/* Civilité (seulement si PARTICULIER) */}
            {form.watch('typeClient') === 'PARTICULIER' && (
              <FormField
                control={form.control}
                name="civilite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Civilité</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="M">M.</SelectItem>
                        <SelectItem value="Mme">Mme</SelectItem>
                        <SelectItem value="Autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Nom & Prénom */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom *</FormLabel>
                    <FormControl>
                      <Input placeholder="Dupont" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prenom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom *</FormLabel>
                    <FormControl>
                      <Input placeholder="Jean" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Email & Téléphone */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="jean.dupont@email.com"
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
                      <Input placeholder="0612345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Adresse COMPLÈTE (OBLIGATOIRE) */}
            <FormField
              control={form.control}
              name="adresse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse *</FormLabel>
                  <FormControl>
                    <Input placeholder="15 Rue de la République" {...field} />
                  </FormControl>
                  <FormDescription>Adresse complète obligatoire pour facturation</FormDescription>
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
                    <Input placeholder="Bât. A, Appt. 12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Code Postal & Ville */}
            <div className="grid grid-cols-3 gap-4">
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

              <div className="col-span-2">
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

            {/* RGPD */}
            <FormField
              control={form.control}
              name="consentementRGPD"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="mt-1"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Consentement RGPD
                    </FormLabel>
                    <FormDescription>
                      Le client accepte le traitement de ses données personnelles
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes internes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Informations complémentaires..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditing ? 'Modifier' : 'Créer'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}