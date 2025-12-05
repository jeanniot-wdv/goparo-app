// src/app/admin/factures/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  FileText,
  Euro,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formaterMontant, getStatutBadge } from '@/lib/utils/facture'

export default function FacturesPage() {
  const router = useRouter()
  const [factures, setFactures] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [statutFilter, setStatutFilter] = useState<string>('all')
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  })

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    caMois: 0,
    enAttente: 0,
  })

  const fetchFactures = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        search,
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(typeFilter !== 'all' && { type: typeFilter }),
        ...(statutFilter !== 'all' && { statut: statutFilter }),
      })

      const res = await fetch(`/api/factures?${params}`)
      const data = await res.json()

      if (data.success) {
        setFactures(data.data)
        setPagination(data.pagination)
        
        // Calculer stats (simplifié)
        const caMois = data.data
          .filter((f: any) => f.type === 'FACTURE' && f.statut === 'PAYE')
          .reduce((sum: number, f: any) => sum + parseFloat(f.totalTTC), 0)
        
        const enAttente = data.data.filter(
          (f: any) => f.statut === 'ENVOYE'
        ).length

        setStats({
          total: data.pagination.total,
          caMois,
          enAttente,
        })
      }
    } catch (error) {
      console.error('Fetch factures error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFactures()
  }, [pagination.page, search, typeFilter, statutFilter])

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Facturation</h1>
          <p className="text-gray-600 mt-1">
            Gérez vos devis et factures
          </p>
        </div>
        <Button onClick={() => router.push('/admin/factures/nouvelle')}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle facture
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Total factures
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Euro className="h-4 w-4" />
              CA du mois
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formaterMontant(stats.caMois)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              En attente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.enAttente}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Rechercher par numéro, client..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="FACTURE">Factures</SelectItem>
                <SelectItem value="DEVIS">Devis</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statutFilter} onValueChange={setStatutFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="BROUILLON">Brouillon</SelectItem>
                <SelectItem value="ENVOYE">Envoyé</SelectItem>
                <SelectItem value="PAYE">Payé</SelectItem>
                <SelectItem value="EN_RETARD">En retard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tableau */}
      <Card>
        <CardContent className="pt-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto"></div>
                <p className="mt-4 text-sm text-gray-600">Chargement...</p>
              </div>
            </div>
          ) : factures.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucune facture trouvée</p>
              <Button
                onClick={() => router.push('/admin/factures/nouvelle')}
                className="mt-4"
              >
                Créer la première facture
              </Button>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Numéro</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Montant TTC</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {factures.map((facture) => {
                    const statutBadge = getStatutBadge(facture.statut)
                    return (
                      <TableRow
                        key={facture.id}
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => router.push(`/admin/factures/${facture.id}`)}
                      >
                        <TableCell className="font-medium">
                          {facture.numero}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {facture.type === 'FACTURE' ? '📄 Facture' : '📋 Devis'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              {facture.client.prenom} {facture.client.nom}
                            </p>
                            {facture.vehicule && (
                              <p className="text-sm text-gray-500">
                                {facture.vehicule.immatriculation}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {formatDate(facture.dateEmission)}
                        </TableCell>
                        <TableCell className="font-semibold">
                          {formaterMontant(parseFloat(facture.totalTTC))}
                        </TableCell>
                        <TableCell>
                          <Badge variant={statutBadge.variant}>
                            {statutBadge.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              router.push(`/admin/factures/${facture.id}`)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-between pt-4">
                  <p className="text-sm text-gray-600">
                    Page {pagination.page} sur {pagination.totalPages}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={pagination.page === 1}
                      onClick={() =>
                        setPagination((prev) => ({
                          ...prev,
                          page: prev.page - 1,
                        }))
                      }
                    >
                      Précédent
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={pagination.page === pagination.totalPages}
                      onClick={() =>
                        setPagination((prev) => ({
                          ...prev,
                          page: prev.page + 1,
                        }))
                      }
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}