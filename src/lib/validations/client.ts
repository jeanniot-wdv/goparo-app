// src/lib/validations/client.ts
import { z } from 'zod'

export const clientSchema = z.object({
  civilite: z.enum(['M', 'Mme', 'Autre']).optional(),
  nom: z.string().min(1, 'Le nom est requis').max(100),
  prenom: z.string().min(1, 'Le prénom est requis').max(100),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  telephone: z.string().min(10, 'Téléphone invalide').max(20),
  adresse: z.string().max(255).optional().or(z.literal('')),
  codePostal: z.string().max(10).optional().or(z.literal('')),
  ville: z.string().max(100).optional().or(z.literal('')),
  notes: z.string().max(1000).optional().or(z.literal('')),
})

export type ClientFormData = z.infer<typeof clientSchema>