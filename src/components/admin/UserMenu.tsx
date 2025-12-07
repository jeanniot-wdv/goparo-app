'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, User as UserIcon, Settings, ChevronDown } from 'lucide-react'
import { User } from '@/hooks/useUser'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

interface UserMenuProps {
  user: User
}

export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setLoading(false)
    }
  }

  const getInitials = () => {
    return `${user.prenom[0]}${user.nom[0]}`.toUpperCase()
  }

  const getRoleBadge = () => {
    const roles = {
      ADMIN: 'Administrateur',
      MECANICIEN: 'Mécanicien',
      COMPTABLE: 'Comptable',
      SECRETARIAT: 'Secrétariat',
    }
    return roles[user.role as keyof typeof roles] || user.role
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-white">
            {getInitials()}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium">
              {user.prenom} {user.nom}
            </p>
            <p className="text-xs text-gray-500">{getRoleBadge()}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="bg-white w-56">
        <DropdownMenuLabel>
          <div>
            <p className="font-medium">
              {user.prenom} {user.nom}
            </p>
            <p className="text-xs font-normal text-gray-500">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => router.push('/admin/profil')}>
          <UserIcon className="mr-2 h-4 w-4" />
          <span>Mon profil</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => router.push('/admin/configuration')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Paramètres</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={handleLogout} 
          disabled={loading}
          className="text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{loading ? 'Déconnexion...' : 'Se déconnecter'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}