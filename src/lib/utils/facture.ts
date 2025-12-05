// src/lib/utils/facture.ts
import { LigneFactureFormData, LigneFactureCalculee, FactureTotaux } from '@/lib/validations/facture'

/**
 * Calcule les totaux d'une ligne de facture
 */
export function calculerLigne(ligne: LigneFactureFormData): LigneFactureCalculee {
  const totalHT = Number((ligne.quantite * ligne.prixUnitaireHT).toFixed(2))
  const totalTVA = Number((totalHT * (ligne.tauxTVA / 100)).toFixed(2))
  const totalTTC = Number((totalHT + totalTVA).toFixed(2))

  return {
    ...ligne,
    totalHT,
    totalTVA,
    totalTTC,
  }
}

/**
 * Calcule les totaux d'une facture
 */
export function calculerTotauxFacture(
  lignes: LigneFactureFormData[],
  heuresTravail: number = 0,
  tarifHoraire: number = 0
): FactureTotaux {
  // Calculer main d'œuvre
  const mainOeuvreHT = Number((heuresTravail * tarifHoraire).toFixed(2))
  
  // Calculer pièces et autres
  const lignesCalculees = lignes.map(calculerLigne)
  const piecesHT = lignesCalculees.reduce((sum, ligne) => sum + ligne.totalHT, 0)
  
  // Totaux
  const totalHT = Number((mainOeuvreHT + piecesHT).toFixed(2))
  
  // TVA sur main d'œuvre (20% par défaut)
  const mainOeuvreTVA = Number((mainOeuvreHT * 0.20).toFixed(2))
  
  // TVA sur pièces
  const piecesTVA = lignesCalculees.reduce((sum, ligne) => sum + ligne.totalTVA, 0)
  
  const totalTVA = Number((mainOeuvreTVA + piecesTVA).toFixed(2))
  const totalTTC = Number((totalHT + totalTVA).toFixed(2))

  return {
    totalHT,
    totalTVA,
    totalTTC,
    mainOeuvreHT,
    piecesHT,
  }
}

/**
 * Génère le prochain numéro de facture/devis
 */
export function genererNumero(
  type: 'FACTURE' | 'DEVIS',
  prefix: string,
  numero: number,
  annee: number = new Date().getFullYear()
): string {
  const prefixe = type === 'FACTURE' ? prefix : 'DE'
  return `${prefixe}-${annee}-${numero.toString().padStart(4, '0')}`
}

/**
 * Formate un montant en euros
 */
export function formaterMontant(montant: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(montant)
}

/**
 * Badge de statut
 */
export function getStatutBadge(statut: string): {
  label: string
  color: string
  variant: 'default' | 'secondary' | 'destructive' | 'outline'
} {
  const badges: Record<string, any> = {
    BROUILLON: { label: 'Brouillon', color: 'gray', variant: 'secondary' },
    ENVOYE: { label: 'Envoyé', color: 'blue', variant: 'default' },
    ACCEPTE: { label: 'Accepté', color: 'green', variant: 'default' },
    REFUSE: { label: 'Refusé', color: 'red', variant: 'destructive' },
    PAYE: { label: 'Payé', color: 'green', variant: 'default' },
    PARTIELLEMENT_PAYE: { label: 'Partiellement payé', color: 'yellow', variant: 'outline' },
    EN_RETARD: { label: 'En retard', color: 'red', variant: 'destructive' },
    ANNULE: { label: 'Annulé', color: 'gray', variant: 'outline' },
  }

  return badges[statut] || badges.BROUILLON
}