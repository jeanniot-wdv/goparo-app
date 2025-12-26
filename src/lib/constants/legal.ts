// src/lib/constants/legal.ts

/**
 * Mentions légales obligatoires pour la facturation électronique 2026
 * Sources : 
 * - Code de commerce (art. L441-9, L441-10)
 * - Code de la consommation (art. L217-4, L224-32)
 * - LOI n°2023-1322 du 29/12/2023 (facturation électronique)
 */

// ============================================
// PÉNALITÉS ET DÉLAIS DE PAIEMENT
// ============================================

export const MENTIONS_LEGALES = {
  // Pénalités de retard (art. L441-10 Code de commerce)
  PENALITE_RETARD_DEFAUT: 10.5, // % annuel (3x taux directeur BCE)
  INDEMNITE_FORFAITAIRE: 40, // € fixe (minimum légal)
  
  // Délais de paiement (art. L441-6 Code de commerce)
  DELAI_PAIEMENT_DEFAUT: 30, // jours
  DELAI_PAIEMENT_MAX: 60, // jours max légal entre professionnels
  
  // TVA
  TAUX_TVA: {
    NORMAL: 20, // Taux normal (main d'œuvre, pièces)
    INTERMEDIAIRE: 10, // Taux intermédiaire (certains travaux)
    REDUIT: 5.5, // Taux réduit (amélioration énergétique)
    SUPER_REDUIT: 2.1, // Taux super réduit (médicaments, etc.)
  },
  
  // Garanties légales (Code de la consommation)
  GARANTIE_CONFORMITE_DEFAUT: 24, // mois (art. L217-4)
  GARANTIE_VICES_CACHES: 24, // mois (art. 1648 Code civil)
}

// ============================================
// FORMES JURIDIQUES FRANÇAISES
// ============================================

// Enlever le 'as const' pour permettre la mutation par Zod
export const FORMES_JURIDIQUES = [
  'EI', // Entrepreneur Individuel
  'EIRL', // Entrepreneur Individuel à Responsabilité Limitée (abrogé 2022 mais existant)
  'EURL', // Entreprise Unipersonnelle à Responsabilité Limitée
  'SARL', // Société à Responsabilité Limitée
  'SAS', // Société par Actions Simplifiée
  'SASU', // Société par Actions Simplifiée Unipersonnelle
  'SA', // Société Anonyme
  'SNC', // Société en Nom Collectif
  'SCS', // Société en Commandite Simple
  'Auto-entrepreneur', // Micro-entreprise
  'Micro-entreprise',
  'Autre',
] as [string, ...string[]]

export type FormeJuridique = (typeof FORMES_JURIDIQUES)[number]

// Formes nécessitant un capital social
export const FORMES_AVEC_CAPITAL = ['SARL', 'EURL', 'SAS', 'SASU', 'SA']

// ============================================
// MODES DE PAIEMENT
// ============================================

export const MODES_PAIEMENT = [
  { value: 'CB', label: 'Carte bancaire' },
  { value: 'ESPECES', label: 'Espèces' },
  { value: 'CHEQUE', label: 'Chèque' },
  { value: 'VIREMENT', label: 'Virement bancaire' },
  { value: 'PRELEVEMENT', label: 'Prélèvement automatique' },
  { value: 'TRAITE', label: 'Traite' },
] as const

// ============================================
// TEXTES LÉGAUX POUR FACTURES
// ============================================

/**
 * Génère le texte de pénalités de retard
 */
export function getMentionPenalites(
  tauxPenalite: number = MENTIONS_LEGALES.PENALITE_RETARD_DEFAUT,
  indemniteForfaitaire: number = MENTIONS_LEGALES.INDEMNITE_FORFAITAIRE
): string {
  return `En cas de retard de paiement, il sera appliqué des pénalités d'un taux annuel de ${tauxPenalite}% calculées sur le montant TTC. Une indemnité forfaitaire pour frais de recouvrement de ${indemniteForfaitaire}€ sera également due (Art. L441-10 du Code de commerce).`
}

/**
 * Génère le texte de garantie légale de conformité
 */
export function getMentionGarantie(
  dureeMois: number = MENTIONS_LEGALES.GARANTIE_CONFORMITE_DEFAUT
): string {
  return `Les pièces vendues bénéficient de la garantie légale de conformité d'une durée de ${dureeMois} mois à compter de la livraison, conformément aux articles L217-4 et suivants du Code de la consommation.`
}

/**
 * Génère le texte d'assurance professionnelle
 */
export function getMentionAssurance(
  nomAssureur: string,
  numeroPolice: string,
  garanties: string
): string {
  return `Assurance professionnelle : ${nomAssureur} - Police n°${numeroPolice} - Garanties : ${garanties}`
}

/**
 * Mention ordre de réparation (secteur automobile)
 * Art. L224-32 du Code de la consommation
 */
export const MENTION_ORDRE_REPARATION = 
  `Ordre de réparation établi conformément à l'article L224-32 du Code de la consommation. ` +
  `Le devis initial a été accepté par le client avant le commencement des travaux. ` +
  `Tout dépassement du prix initial devra faire l'objet d'un accord préalable du client.`

/**
 * Mention TVA non applicable (franchise en base)
 * Art. 293 B du CGI
 */
export const MENTION_TVA_NON_APPLICABLE = 
  `TVA non applicable, art. 293 B du CGI`

/**
 * Mention escompte pour paiement anticipé
 */
export function getMentionEscompte(tauxEscompte: number): string {
  return `Escompte pour paiement anticipé : ${tauxEscompte}% du montant TTC`
}

/**
 * Mentions RGPD
 */
export const MENTION_RGPD = 
  `Les données collectées font l'objet d'un traitement informatique destiné à la gestion commerciale et comptable. ` +
  `Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. ` +
  `Pour exercer ces droits, contactez-nous par email.`

/**
 * Texte complet des conditions générales de vente (CGV)
 */
export const CGV_TEMPLATE = `
CONDITIONS GÉNÉRALES DE VENTE

Article 1 - Objet
Les présentes conditions générales de vente régissent les relations contractuelles entre le garage et ses clients.

Article 2 - Prix
Les prix sont exprimés en euros, hors taxes. Ils sont majorés du taux de TVA en vigueur.

Article 3 - Paiement
Le paiement est exigible à réception de la facture, sauf convention contraire.
${getMentionPenalites()}

Article 4 - Garanties
${getMentionGarantie()}

Article 5 - Responsabilité
Le garage est assuré pour sa responsabilité professionnelle conformément aux dispositions légales.

Article 6 - Données personnelles
${MENTION_RGPD}

Article 7 - Litiges
En cas de litige, une solution amiable sera recherchée avant toute action judiciaire.
`.trim()

// ============================================
// HELPERS DE VALIDATION
// ============================================

/**
 * Valide un SIRET (14 chiffres)
 */
export function isValidSIRET(siret: string): boolean {
  if (!/^\d{14}$/.test(siret)) return false
  
  // Algorithme de Luhn
  let sum = 0
  for (let i = 0; i < 14; i++) {
    let digit = parseInt(siret[i])
    if (i % 2 === 1) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    sum += digit
  }
  return sum % 10 === 0
}

/**
 * Valide un numéro de TVA intracommunautaire français
 */
export function isValidTVAIntra(tva: string): boolean {
  return /^FR\d{11}$/.test(tva)
}

/**
 * Valide un code APE/NAF
 */
export function isValidCodeAPE(code: string): boolean {
  return /^\d{4}[A-Z]$/.test(code)
}

/**
 * Formate un SIRET avec espaces
 */
export function formatSIRET(siret: string): string {
  return siret.replace(/(\d{3})(\d{3})(\d{3})(\d{5})/, '$1 $2 $3 $4')
}

// ============================================
// MENTIONS SECTEUR AUTOMOBILE SPÉCIFIQUES
// ============================================

/**
 * Mentions spécifiques réparation automobile
 * Décret n°2021-609 du 18/05/2021
 */
export const MENTIONS_AUTO = {
  ORDRE_REPARATION: MENTION_ORDRE_REPARATION,
  
  DEPASSEMENT_DEVIS: 
    `Conformément à l'article L224-32 du Code de la consommation, tout dépassement du prix ` +
    `initialement prévu doit faire l'objet d'un accord exprès du client avant la poursuite des travaux.`,
  
  PIECES_REMPLACEES: 
    `Les pièces remplacées sont tenues à disposition du client, sauf demande expresse de sa part ` +
    `ou impossibilité matérielle de conservation.`,
}

// ============================================
// CALENDRIER FACTURATION ÉLECTRONIQUE 2026
// ============================================

/**
 * Dates d'entrée en vigueur de la réforme
 * LOI n°2023-1322 du 29/12/2023
 */
export const CALENDRIER_FACTURE_ELEC = {
  GRANDES_ENTREPRISES: new Date('2026-09-01'), // ETI et grandes entreprises
  PME_ETI: new Date('2027-09-01'), // PME et micro-entreprises
}

/**
 * Formats de facturation électronique acceptés
 */
export const FORMATS_FACTURE_ELEC = [
  'FACTUR-X', // Format hybride PDF/XML
  'CII', // Cross Industry Invoice (XML)
  'UBL', // Universal Business Language
] as const

export type FormatFactureElec = typeof FORMATS_FACTURE_ELEC[number]