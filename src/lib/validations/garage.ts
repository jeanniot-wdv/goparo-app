// src/lib/validations/garage.ts
import { z } from 'zod'
import { MENTIONS_LEGALES, FORMES_JURIDIQUES } from '@/lib/constants/legal'

// ÉTAPE 1 : Informations utilisateur
export const registerStep1Schema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Minimum 8 caractères'),
  confirmPassword: z.string(),
  nom: z.string().min(2, 'Nom requis'),
  prenom: z.string().min(2, 'Prénom requis'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
})

export type RegisterStep1Data = z.infer<typeof registerStep1Schema>

// ÉTAPE 2 : Informations garage
export const registerStep2Schema = z.object({
  nomGarage: z.string().min(2, 'Nom du garage requis'),
  formeJuridique: z.enum(FORMES_JURIDIQUES).refine((val) => val !== undefined, {
    message: 'La forme juridique est obligatoire',
  }),
  siret: z.string().min(14, 'SIRET invalide (14 chiffres)').max(14),
  adresse: z.string().min(5, 'Adresse requise'),
  codePostal: z.string().min(4, 'Code postal requis'),
  ville: z.string().min(2, 'Ville requise'),
  telephone: z.string().min(10, 'Téléphone invalide'),
  emailGarage: z.string().email('Email invalide'),
})

export type RegisterStep2Data = z.infer<typeof registerStep2Schema>

// Schéma complet pour l'API
export const registerCompleteSchema = registerStep1Schema.merge(registerStep2Schema)
export type RegisterCompleteData = z.infer<typeof registerCompleteSchema>

// ============================================
// SCHÉMA CONFIGURATION GARAGE - COMPLET 2026
// ============================================

export const garageConfigSchema = z.object({
  // ========== INFORMATIONS LÉGALES OBLIGATOIRES ==========
  nom: z.string().min(2, { message: 'Le nom du garage est requis (min. 2 caractères)' }),
  
  formeJuridique: z.enum(FORMES_JURIDIQUES).refine((val) => val !== undefined, {
    message: 'La forme juridique est obligatoire',
  }),
  
  siret: z.string()
    .length(14, { message: 'Le SIRET doit comporter exactement 14 chiffres' })
    .regex(/^\d{14}$/, { message: 'Le SIRET ne doit contenir que des chiffres' }),
  
  numeroRCS: z.string().optional().or(z.literal('')),
  
  capitalSocial: z.number()
    .min(0, { message: 'Le capital social doit être positif' })
    .optional(),
  
  codeAPE: z.string()
    .regex(/^\d{4}[A-Z]$/, { message: 'Format invalide (ex: 4520A)' })
    .optional()
    .or(z.literal('')),
  
  numeroTVA: z.string()
    .regex(/^FR\d{11}$/, { message: 'Format invalide (ex: FR12345678900)' })
    .optional()
    .or(z.literal('')),

  // ========== ADRESSE COMPLÈTE ==========
  adresse: z.string().min(5, { message: "L'adresse est requise (min. 5 caractères)" }),
  
  complementAdresse: z.string().optional().or(z.literal('')),
  
  codePostal: z.string().min(4, { message: 'Le code postal est requis' }),
  
  ville: z.string().min(2, { message: 'La ville est requise' }),
  
  pays: z.string().min(1).default('France'),

  // ========== COORDONNÉES CONTACT ==========
  email: z.string().email({ message: 'Email invalide' }),
  
  telephone: z.string().min(10, { message: 'Le téléphone doit comporter au moins 10 caractères' }),

  // ========== ASSURANCE PROFESSIONNELLE (OBLIGATOIRE ARTISAN) ==========
  assurancePro: z.string()
    .min(2, { message: 'Le nom de l\'assureur est requis' })
    .optional()
    .or(z.literal('')),
  
  numeroPolice: z.string()
    .min(5, { message: 'Le numéro de police est requis' })
    .optional()
    .or(z.literal('')),
  
  garantiesAssurance: z.string()
    .min(10, { message: 'Détaillez les garanties couvertes (min. 10 caractères)' })
    .optional()
    .or(z.literal('')),

  // ========== MÉDIA ==========
  logo: z.string()
    .url({ message: 'L\'URL du logo doit être valide' })
    .optional()
    .or(z.literal('')),

  // ========== CONFIGURATION FACTURATION ==========
  tarifHoraire: z.number()
    .min(0.01, { message: 'Le tarif horaire doit être supérieur à 0' })
    .max(999.99, { message: 'Le tarif horaire semble trop élevé' }),
  
  prefixeFacture: z.string()
    .min(1)
    .max(5, { message: 'Préfixe facture : 1 à 5 caractères' })
    .regex(/^[A-Z0-9]+$/, { message: 'Uniquement lettres majuscules et chiffres' }),
  
  prefixeDevis: z.string()
    .min(1)
    .max(5, { message: 'Préfixe devis : 1 à 5 caractères' })
    .regex(/^[A-Z0-9]+$/, { message: 'Uniquement lettres majuscules et chiffres' }),

  // ========== CONDITIONS DE PAIEMENT ==========
  delaiPaiement: z.number()
    .int()
    .min(1, { message: 'Le délai de paiement doit être au moins 1 jour' })
    .max(MENTIONS_LEGALES.DELAI_PAIEMENT_MAX, { 
      message: `Le délai de paiement ne peut pas dépasser ${MENTIONS_LEGALES.DELAI_PAIEMENT_MAX} jours` 
    })
    .default(MENTIONS_LEGALES.DELAI_PAIEMENT_DEFAUT),

  tauxPenaliteRetard: z.number()
    .min(0, { message: 'Le taux de pénalité doit être positif' })
    .max(100, { message: 'Le taux de pénalité ne peut pas dépasser 100%' })
    .default(MENTIONS_LEGALES.PENALITE_RETARD_DEFAUT),

  indemniteForfaitaire: z.number()
    .min(MENTIONS_LEGALES.INDEMNITE_FORFAITAIRE, { 
      message: `L'indemnité forfaitaire doit être au minimum ${MENTIONS_LEGALES.INDEMNITE_FORFAITAIRE}€` 
    })
    .default(MENTIONS_LEGALES.INDEMNITE_FORFAITAIRE),

  tauxEscompte: z.number()
    .min(0)
    .max(100)
    .optional(),

  // ========== MODULES ==========
  moduleVitrine: z.boolean().default(false),
  modulePieces: z.boolean().default(false),
  moduleComptaPro: z.boolean().default(false),
  modulePlanning: z.boolean().default(false),
  moduleVenteVehicules: z.boolean().default(false),

  // ========== SITE VITRINE ==========
  domaineCustom: z.string()
    .regex(/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/, { 
      message: 'Format de domaine invalide (ex: garage-dupont.fr)' 
    })
    .optional()
    .or(z.literal('')),
})

// Validation conditionnelle pour capital social
.refine((data) => {
  const formesSocietesCapital = ['SARL', 'EURL', 'SAS', 'SASU', 'SA']
  if (formesSocietesCapital.includes(data.formeJuridique)) {
    return data.capitalSocial !== undefined && data.capitalSocial > 0
  }
  return true
}, {
  message: 'Le capital social est obligatoire pour cette forme juridique',
  path: ['capitalSocial'],
})

// Validation assurance pro obligatoire pour artisans
.refine((data) => {
  // L'assurance est obligatoire pour toutes les formes (artisan)
  return data.assurancePro && data.numeroPolice && data.garantiesAssurance
}, {
  message: 'L\'assurance professionnelle est obligatoire pour les artisans',
  path: ['assurancePro'],
})

// Type TypeScript inféré
export type GarageConfigFormData = z.infer<typeof garageConfigSchema>