'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Edit, Mail, Phone, MapPin, Car, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function ClientDetailPage() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()
  const [client, setClient] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchClient() {
      try {
        const res = await fetch(`/api/clients/${id}`)
        const data = await res.json()

        if (data.success) {
          setClient(data.data)
        } else {
          router.push('/admin/clients')
        }
      } catch (error) {
        console.error('Fetch error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchClient()
  }, [id, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }

  if (!client) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/admin/clients')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              {client.prenom} {client.nom}
            </h1>
            <p className="text-gray-600">Fiche client</p>
          </div>
        </div>
        <Button
          onClick={() => router.push(`/admin/clients/${client.id}/modifier`)}>
          <Edit className="mr-2 h-4 w-4" />
          Modifier
        </Button>
      </div>

      {/* Infos principales */}
      <Card>
        <CardHeader>
          <CardTitle>Informations de contact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {client.email && (
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <span>{client.email}</span>
            </div>
          )}
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-gray-400" />
            <span>{client.telephone}</span>
          </div>
          {client.adresse && (
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p>{client.adresse}</p>
                <p>
                  {client.codePostal} {client.ville}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Véhicules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Véhicules ({client.vehicules?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {client.vehicules?.length > 0 ? (
            <div className="space-y-3">
              {client.vehicules.map((vehicule: any) => (
                <div
                  key={vehicule.id}
                  className="flex items-center justify-between border rounded-lg p-4"
                >
                  <div>
                    <p className="font-semibold">{vehicule.immatriculation}</p>
                    <p className="text-sm text-gray-600">
                      {vehicule.marque} {vehicule.modele}
                    </p>
                  </div>
                  <Badge>{vehicule.kilometrage || 0} km</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Aucun véhicule enregistré</p>
          )}
        </CardContent>
      </Card>

      {/* Factures */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Dernières factures
          </CardTitle>
        </CardHeader>
        <CardContent>
          {client.factures?.length > 0 ? (
            <div className="space-y-3">
              {client.factures.map((facture: any) => (
                <div
                  key={facture.id}
                  className="flex items-center justify-between border rounded-lg p-4"
                >
                  <div>
                    <p className="font-semibold">{facture.numero}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(facture.dateEmission).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{facture.totalTTC} €</p>
                    <Badge
                      variant={
                        facture.statut === 'PAYE' ? 'default' : 'secondary'
                      }
                    >
                      {facture.statut}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Aucune facture</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}