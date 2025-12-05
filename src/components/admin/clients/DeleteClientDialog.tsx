// src/components/admin/clients/DeleteClientDialog.tsx
'use client'

import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Loader2 } from 'lucide-react'

interface DeleteClientDialogProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
  client: any
}

export function DeleteClientDialog({
  open,
  onClose,
  onSuccess,
  client,
}: DeleteClientDialogProps) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)

    try {
      const res = await fetch(`/api/clients/${client.id}`, {
        method: 'DELETE',
      })

      const result = await res.json()

      if (result.success) {
        onSuccess()
        onClose()
      } else {
        alert(result.message || 'Erreur lors de la suppression')
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('Erreur réseau')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Vous êtes sur le point de supprimer le client{' '}
            <span className="font-semibold">
              {client?.prenom} {client?.nom}
            </span>
            . Cette action est irréversible.
            {client?._count?.factures > 0 && (
              <span className="block mt-2 text-red-600 font-medium">
                ⚠️ Ce client a {client._count.factures} facture(s). La
                suppression sera impossible.
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}