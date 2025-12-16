// src/lib/validations/client.ts
import { z } from 'zod'

export const clientSchema = z.object({
  // Type de client
  typeClient: z.enum(['PARTICULIER', 'PROFESSIONNEL', 'ADMINISTRATION']),
  
  // Particulier
  civilite: z.enum(['M', 'Mme', 'Autre']).optional(),
  nom: z.string().min(1, 'Le nom est requis').max(100),
  prenom: z.string().min(1, 'Le prénom est requis').max(100),
  
  // Professionnel (conditionnels)
  raisonSociale: z.string().max(200).optional(),
  siretClient: z.string().length(14, 'SIRET invalide (14 chiffres)').optional().or(z.literal('')),
  numeroTVAClient: z.string().max(30).optional(),
  
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  telephone: z.string().min(10, 'Téléphone invalide').max(20),
  
  // Adresse COMPLÈTE (OBLIGATOIRE 2026)
  adresse: z.string().min(5, 'Adresse requise').max(255),
  complementAdresse: z.string().max(100).optional(),
  codePostal: z.string().min(4, 'Code postal requis').max(10),
  ville: z.string().min(2, 'Ville requise').max(100),
  pays: z.string(),
  
  // RGPD
  consentementRGPD: z.boolean(),
  
  notes: z.string().max(1000).optional(),
}).refine((data) => {
  // Si professionnel, raison sociale obligatoire
  if (data.typeClient === 'PROFESSIONNEL' && !data.raisonSociale) {
    return false
  }
  return true
}, {
  message: 'Raison sociale obligatoire pour un professionnel',
  path: ['raisonSociale'],
})

export type ClientFormData = z.infer<typeof clientSchema>