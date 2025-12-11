// src/lib/validations/garage.ts
import { z } from 'zod'

// Schéma Register (création compte)
export const registerSchema = z.object({
  // Informations utilisateur
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Minimum 8 caractères'),
  confirmPassword: z.string(),
  nom: z.string().min(2, 'Nom requis'),
  prenom: z.string().min(2, 'Prénom requis'),
  
  // Informations garage
  nomGarage: z.string().min(2, 'Nom du garage requis'),
  siret: z.string().min(14, 'SIRET invalide (14 chiffres)').max(14),
  adresse: z.string().min(5, 'Adresse requise'),
  codePostal: z.string().min(4, 'Code postal requis'),
  ville: z.string().min(2, 'Ville requise'),
  telephone: z.string().min(10, 'Téléphone invalide'),
  emailGarage: z.string().email('Email invalide'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
})

export type RegisterFormData = z.infer<typeof registerSchema>

// Schéma Configuration Garage
export const garageConfigSchema = z.object({
  // Informations générales
  nom: z.string().min(2, 'Nom requis'),
  siret: z.string().min(14, 'SIRET invalide').max(14),
  adresse: z.string().min(5, 'Adresse requise'),
  codePostal: z.string().min(4, 'Code postal requis'),
  ville: z.string().min(2, 'Ville requise'),
  email: z.string().email('Email invalide'),
  telephone: z.string().min(10, 'Téléphone invalide'),
  numeroTVA: z.string().optional().or(z.literal('')),
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