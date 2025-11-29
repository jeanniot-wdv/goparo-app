// src/components/admin/factures/LigneFactureItem.tsx
'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { LigneFactureFormData } from '@/lib/validations/facture'
import { calculerLigne } from '@/lib/utils/facture'

interface LigneFactureItemProps {
  ligne: LigneFactureFormData
  index: number
  onChange: (index: number, ligne: LigneFactureFormData) => void
  onDelete: (index: number) => void
}

export function LigneFactureItem({
  ligne,
  index,
  onChange,
  onDelete,
}: LigneFactureItemProps) {
  const ligneCalculee = calculerLigne(ligne)

  const handleChange = (field: keyof LigneFactureFormData, value: any) => {
    onChange(index, { ...ligne, [field]: value })
  }

  return (
    <div className="grid grid-cols-12 gap-2 items-start p-3 border rounded-lg bg-gray-50">
      {/* Type */}
      <div className="col-span-2">
        <Select
          value={ligne.type}
          onValueChange={(value) => handleChange('type', value)}
        >
          <SelectTrigger className="h-9 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PIECE">Pièce</SelectItem>
            <SelectItem value="MAIN_OEUVRE">Main d'œuvre</SelectItem>
            <SelectItem value="FORFAIT">Forfait</SelectItem>
            <SelectItem value="REMISE">Remise</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Désignation */}
      <div className="col-span-4">
        <Input
          placeholder="Désignation"
          value={ligne.designation}
          onChange={(e) => handleChange('designation', e.target.value)}
          className="h-9 bg-white"
        />
      </div>

      {/* Quantité */}
      <div className="col-span-1">
        <Input
          type="number"
          step="0.1"
          placeholder="Qté"
          value={ligne.quantite}
          onChange={(e) => handleChange('quantite', parseFloat(e.target.value) || 0)}
          className="h-9 bg-white"
        />
      </div>

      {/* Prix unitaire HT */}
      <div className="col-span-2">
        <Input
          type="number"
          step="0.01"
          placeholder="Prix HT"
          value={ligne.prixUnitaireHT}
          onChange={(e) =>
            handleChange('prixUnitaireHT', parseFloat(e.target.value) || 0)
          }
          className="h-9 bg-white"
        />
      </div>

      {/* TVA */}
      <div className="col-span-1">
        <Select
          value={ligne.tauxTVA.toString()}
          onValueChange={(value) => handleChange('tauxTVA', parseFloat(value))}
        >
          <SelectTrigger className="h-9 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">0%</SelectItem>
            <SelectItem value="5.5">5.5%</SelectItem>
            <SelectItem value="10">10%</SelectItem>
            <SelectItem value="20">20%</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Total TTC (calculé) */}
      <div className="col-span-1 flex items-center">
        <p className="text-sm font-semibold">
          {ligneCalculee.totalTTC.toFixed(2)} €
        </p>
      </div>

      {/* Supprimer */}
      <div className="col-span-1 flex items-center">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onDelete(index)}
          className="h-9 w-9 text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}