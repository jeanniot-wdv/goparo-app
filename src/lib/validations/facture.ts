// src/lib/validations/facture.ts
import { z } from 'zod'

export const ligneFactureSchema = z.object({
  id: z.string().optional(),
  type: z.enum(['PIECE', 'MAIN_OEUVRE', 'FORFAIT', 'REMISE']),
  designation: z.string().min(1, 'Désignation requise'),
  quantite: z.number().min(0.001, 'Quantité minimale : 0.001'),
  prixUnitaireHT: z.number().min(0, 'Prix doit être positif'),
  tauxTVA: z.number().min(0).max(100),
  pieceId: z.string().optional(),
})

export const factureSchema = z.object({
  type: z.enum(['DEVIS', 'FACTURE']),
  statut: z.enum(['BROUILLON', 'ENVOYE', 'ACCEPTE', 'REFUSE', 'PAYE', 'PARTIELLEMENT_PAYE', 'EN_RETARD', 'ANNULE']).optional(),
  
  clientId: z.string().min(1, 'Client requis'),
  vehiculeId: z.string().optional(),
  
  dateEmission: z.string().optional(),
  dateEcheance: z.string().optional(),
  
  // Main d'œuvre
  heuresTravail: z.number().min(0).default(0),
  tarifHoraire: z.number().min(0),
  
  // Lignes
  lignes: z.array(ligneFactureSchema).min(1, 'Au moins une ligne requise'),
  
  // Notes
  notes: z.string().optional(),
  conditionsReglement: z.string().optional(),
  modePaiement: z.string().optional(),
})

export type LigneFactureFormData = z.infer<typeof ligneFactureSchema>
export type FactureFormData = z.infer<typeof factureSchema>

// Types pour affichage
export interface LigneFactureCalculee extends LigneFactureFormData {
  totalHT: number
  totalTVA: number
  totalTTC: number
}

export interface FactureTotaux {
  totalHT: number
  totalTVA: number
  totalTTC: number
  mainOeuvreHT: number
  piecesHT: number
}