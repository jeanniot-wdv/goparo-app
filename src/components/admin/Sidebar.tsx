'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  Car,
  FileText,
  Package,
  Newspaper,
  Settings,
  Calendar,
  ShoppingCart,
} from 'lucide-react'
import { User } from '@/hooks/useUser'

interface SidebarProps {
  user: User
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname()

  const menuItems = [
    {
      label: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
      active: true,
    },
    {
      label: 'Clients',
      href: '/admin/clients',
      icon: Users,
      active: true,
    },
    {
      label: 'Véhicules',
      href: '/admin/vehicules',
      icon: Car,
      active: true,
    },
    {
      label: 'Facturation',
      href: '/admin/factures',
      icon: FileText,
      active: true,
    },
    {
      label: 'Pièces détachées',
      href: '/admin/pieces',
      icon: Package,
      active: user.garage.modulePieces,
      badge: !user.garage.modulePieces ? 'Pro' : null,
    },
    {
      label: 'Planning',
      href: '/admin/planning',
      icon: Calendar,
      active: false,
      badge: 'Bientôt',
    },
    {
      label: 'Actualités',
      href: '/admin/actualites',
      icon: Newspaper,
      active: user.garage.moduleVitrine,
      badge: !user.garage.moduleVitrine ? 'Pro' : null,
    },
    {
      label: 'Vente véhicules',
      href: '/admin/ventes',
      icon: ShoppingCart,
      active: false,
      badge: 'Bientôt',
    },
    {
      label: 'Configuration',
      href: '/admin/configuration',
      icon: Settings,
      active: true,
    },
  ]

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
            MG
          </div>
          <span className="text-xl font-bold">MonGarage</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          const isDisabled = !item.active

          return (
            <Link
              key={item.href}
              href={isDisabled ? '#' : item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive && 'bg-blue-50 text-blue-600',
                !isActive && !isDisabled && 'text-gray-700 hover:bg-gray-100',
                isDisabled && 'text-gray-400 cursor-not-allowed opacity-60'
              )}
              onClick={(e) => isDisabled && e.preventDefault()}
            >
              <Icon className="h-5 w-5" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Garage Info */}
      <div className="border-t p-4">
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs font-medium text-gray-500">Garage actuel</p>
          <p className="mt-1 text-sm font-semibold text-gray-900 truncate">
            {user.garage.nom}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Plan : {user.garage.modulePieces ? 'Pro' : 'Gratuit'}
          </p>
        </div>
      </div>
    </aside>
  )
}