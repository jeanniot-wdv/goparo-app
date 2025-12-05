// src/app/admin/factures/nouvelle/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, Save, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LigneFactureItem } from '@/components/admin/factures/LigneFactureItem'
import { LigneFactureFormData } from '@/lib/validations/facture'
import { calculerTotauxFacture, formaterMontant } from '@/lib/utils/facture'
import { useUser } from '@/hooks/useUser'

export default function NouvelleFacturePage() {
  const router = useRouter()
  const { user } = useUser()
  
  // Données formulaire
  const [type, setType] = useState<'FACTURE' | 'DEVIS'>('FACTURE')
  const [clientId, setClientId] = useState('')
  const [vehiculeId, setVehiculeId] = useState('')
  const [dateEmission, setDateEmission] = useState(
    new Date().toISOString().split('T')[0]
  )
  const [dateEcheance, setDateEcheance] = useState('')
  const [heuresTravail, setHeuresTravail] = useState(0)
  const [tarifHoraire, setTarifHoraire] = useState(50)
  const [notes, setNotes] = useState('')
  const [modePaiement, setModePaiement] = useState('')

  // Lignes de facture
  const [lignes, setLignes] = useState<LigneFactureFormData[]>([])

  // Données pour les selects
  const [clients, setClients] = useState<any[]>([])
  const [vehicules, setVehicules] = useState<any[]>([])
  const [loadingClients, setLoadingClients] = useState(true)
  const [saving, setSaving] = useState(false)

  // Charger les clients
  useEffect(() => {
    async function fetchClients() {
      try {
        const res = await fetch('/api/clients?limit=1000')
        const data = await res.json()
        if (data.success) {
          setClients(data.data)
        }
      } catch (error) {
        console.error('Fetch clients error:', error)
      } finally {
        setLoadingClients(false)
      }
    }
    fetchClients()
  }, [])

  // Charger les véhicules du client sélectionné
  useEffect(() => {
    if (clientId) {
      const client = clients.find((c) => c.id === clientId)
      setVehicules(client?.vehicules || [])
      setVehiculeId('')
    }
  }, [clientId, clients])

  // Charger le tarif horaire du garage
  // useEffect(() => {
  //   if (user?.garage.tarifHoraire) {
  //     setTarifHoraire(parseFloat(user.garage.tarifHoraire.toString()))
  //   }
  // }, [user])

  useEffect(() => {
  // Vérifier si garage existe et a un tarifHoraire
  if (user?.garage && 'tarifHoraire' in user.garage && user.garage.tarifHoraire) {
    setTarifHoraire(parseFloat(user.garage.tarifHoraire.toString()))
  }
}, [user])

  // Ajouter une ligne
  const ajouterLigne = () => {
    const nouvelleLigne: LigneFactureFormData = {
      type: 'PIECE',
      designation: '',
      quantite: 1,
      prixUnitaireHT: 0,
      tauxTVA: 20,
    }
    setLignes([...lignes, nouvelleLigne])
  }

  // Modifier une ligne
  const modifierLigne = (index: number, ligne: LigneFactureFormData) => {
    const nouvellesLignes = [...lignes]
    nouvellesLignes[index] = ligne
    setLignes(nouvellesLignes)
  }

  // Supprimer une ligne
  const supprimerLigne = (index: number) => {
    setLignes(lignes.filter((_, i) => i !== index))
  }

  // Calculer les totaux
  const totaux = calculerTotauxFacture(lignes, heuresTravail, tarifHoraire)

  // Sauvegarder
  const handleSave = async (statut: string = 'BROUILLON') => {
    if (!clientId) {
      alert('Veuillez sélectionner un client')
      return
    }

    if (lignes.length === 0 && heuresTravail === 0) {
      alert('Ajoutez au moins une ligne ou des heures de travail')
      return
    }

    setSaving(true)

    try {
      const res = await fetch('/api/factures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          statut,
          clientId,
          vehiculeId: vehiculeId || undefined,
          dateEmission,
          dateEcheance: dateEcheance || undefined,
          heuresTravail,
          tarifHoraire,
          lignes,
          notes,
          modePaiement: modePaiement || undefined,
        }),
      })

      const data = await res.json()

      if (data.success) {
        router.push(`/admin/factures/${data.data.id}`)
      } else {
        alert(data.message || 'Erreur lors de la création')
      }
    } catch (error) {
      console.error('Save error:', error)
      alert('Erreur réseau')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/admin/factures')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              {type === 'FACTURE' ? 'Nouvelle facture' : 'Nouveau devis'}
            </h1>
            <p className="text-gray-600">
              Remplissez les informations ci-dessous
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleSave('BROUILLON')}
            disabled={saving}
          >
            <Save className="mr-2 h-4 w-4" />
            Brouillon
          </Button>
          <Button onClick={() => handleSave('ENVOYE')} disabled={saving}>
            <Send className="mr-2 h-4 w-4" />
            {saving ? 'Enregistrement...' : 'Envoyer'}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-6">
          {/* Type & Client */}
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Type */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Type de document *
                </label>
                <Select value={type} onValueChange={(v: any) => setType(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DEVIS">Devis</SelectItem>
                    <SelectItem value="FACTURE">Facture</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Client */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Client *
                </label>
                <Select value={clientId} onValueChange={setClientId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.prenom} {client.nom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Véhicule */}
              {vehicules.length > 0 && (
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Véhicule
                  </label>
                  <Select value={vehiculeId} onValueChange={setVehiculeId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un véhicule (optionnel)" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicules.map((vehicule) => (
                        <SelectItem key={vehicule.id} value={vehicule.id}>
                          {vehicule.immatriculation} - {vehicule.marque}{' '}
                          {vehicule.modele}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Date d'émission
                  </label>
                  <Input
                    type="date"
                    value={dateEmission}
                    onChange={(e) => setDateEmission(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Date d'échéance
                  </label>
                  <Input
                    type="date"
                    value={dateEcheance}
                    onChange={(e) => setDateEcheance(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main d'œuvre */}
          <Card>
            <CardHeader>
              <CardTitle>Main d'œuvre</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Heures de travail
                  </label>
                  <Input
                    type="number"
                    step="0.5"
                    value={heuresTravail}
                    onChange={(e) =>
                      setHeuresTravail(parseFloat(e.target.value) || 0)
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Tarif horaire (€)
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={tarifHoraire}
                    onChange={(e) =>
                      setTarifHoraire(parseFloat(e.target.value) || 0)
                    }
                  />
                </div>
              </div>
              {heuresTravail > 0 && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm">
                    <span className="font-medium">
                      {heuresTravail}h × {tarifHoraire}€
                    </span>{' '}
                    ={' '}
                    <span className="font-bold">
                      {formaterMontant(totaux.mainOeuvreHT)}
                    </span>{' '}
                    HT
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Lignes de facture */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Pièces et prestations</CardTitle>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={ajouterLigne}
              >
                <Plus className="mr-2 h-4 w-4" />
                Ajouter
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {lignes.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  Aucune ligne ajoutée
                </p>
              ) : (
                lignes.map((ligne, index) => (
                  <LigneFactureItem
                    key={index}
                    ligne={ligne}
                    index={index}
                    onChange={modifierLigne}
                    onDelete={supprimerLigne}
                  />
                ))
              )}
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Notes et conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Notes internes
                </label>
                <Textarea
                  placeholder="Informations complémentaires..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Mode de paiement
                </label>
                <Select value={modePaiement} onValueChange={setModePaiement}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CB">Carte bancaire</SelectItem>
                    <SelectItem value="ESPECES">Espèces</SelectItem>
                    <SelectItem value="CHEQUE">Chèque</SelectItem>
                    <SelectItem value="VIREMENT">Virement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Colonne récapitulatif */}
        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Récapitulatif</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Main d'œuvre HT</span>
                <span className="font-medium">
                  {formaterMontant(totaux.mainOeuvreHT)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Pièces HT</span>
                <span className="font-medium">
                  {formaterMontant(totaux.piecesHT)}
                </span>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total HT</span>
                  <span className="font-semibold">
                    {formaterMontant(totaux.totalHT)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">TVA</span>
                <span className="font-medium">
                  {formaterMontant(totaux.totalTVA)}
                </span>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-lg">Total TTC</span>
                  <span className="font-bold text-2xl text-blue-600">
                    {formaterMontant(totaux.totalTTC)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}