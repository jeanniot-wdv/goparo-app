'use client'

import { useUser } from '@/hooks/useUser'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Euro, FileText, Users, Car, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  const { user } = useUser()

  // Données de démo (à remplacer par de vraies données API)
  const stats = [
    {
      title: 'CA du mois',
      value: '12 450 €',
      change: '+12.5%',
      icon: Euro,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Factures',
      value: '28',
      change: '+3',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Clients',
      value: '156',
      change: '+8',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Interventions',
      value: '42',
      change: '+5',
      icon: Car,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ]

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold">
          Bonjour, {user?.prenom} 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Voici un aperçu de votre activité aujourd'hui
        </p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.bgColor} p-2 rounded-lg`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  {stat.change} ce mois
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Graphique & Dernières factures */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Graphique CA */}
        <Card>
          <CardHeader>
            <CardTitle>Chiffre d'affaires</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-400">
              Graphique à venir (Recharts)
            </div>
          </CardContent>
        </Card>

        {/* Dernières factures */}
        <Card>
          <CardHeader>
            <CardTitle>Dernières factures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b pb-3 last:border-0"
                >
                  <div>
                    <p className="font-medium">FA-2025-00{i}</p>
                    <p className="text-sm text-gray-500">Client {i}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{150 * i} €</p>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      Payée
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertes / Messages */}
      {!user?.garage.moduleVitrine && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900">
                🚀 Activez votre site vitrine
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                Soyez visible en ligne pour seulement 19€/mois
              </p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Activer
            </button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}