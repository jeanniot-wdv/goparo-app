// src/lib/validations/garage.ts
import { z } from 'zod'

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

// Schéma Configuration Garage
export const garageConfigSchema = z.object({
  // Informations générales
  nom: z.string().min(2, 'Nom requis'),
  
  // NON MODIFIABLE après création (lecture seule dans le form)
  siret: z.string().min(14, 'SIRET invalide').max(14),
  
  // Modifiable avec attention
  formeJuridique: z.string().optional().or(z.literal('')),
  numeroRCS: z.string().optional().or(z.literal('')),
  capitalSocial: z.number().optional(),
  codeAPE: z.string().optional().or(z.literal('')),
  
  adresse: z.string().min(5, 'Adresse requise'),
  codePostal: z.string().min(4, 'Code postal requis'),
  ville: z.string().min(2, 'Ville requise'),
  email: z.string().email('Email invalide'),
  telephone: z.string().min(10, 'Téléphone invalide'),
  numeroTVA: z.string().optional().or(z.literal('')),
  
  // Assurance professionnelle (OBLIGATOIRE artisan)
  assurancePro: z.string().optional().or(z.literal('')),
  numeroPolice: z.string().optional().or(z.literal('')),
  garantiesAssurance: z.string().optional().or(z.literal('')),
  
  logo: z.string().optional().or(z.literal('')),
  
  // Configuration facturation
  tarifHoraire: z.number().min(0, 'Tarif doit être positif'),
  prefixeFacture: z.string().min(1, 'Préfixe requis').max(5),
  prefixeDevis: z.string().min(1, 'Préfixe requis').max(5),
  
  // Modules activés
  moduleVitrine: z.boolean(),
  modulePieces: z.boolean(),
  moduleComptaPro: z.boolean(),
  modulePlanning: z.boolean(),
  moduleVenteVehicules: z.boolean(),
  
  // Domaine personnalisé
  domaineCustom: z.string().optional().or(z.literal('')),
})

export type GarageConfigFormData = z.infer<typeof garageConfigSchema>