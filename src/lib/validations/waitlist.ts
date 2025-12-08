// src/lib/validations/waitlist.ts
import { z } from 'zod'

export const waitlistSchema = z.object({
  nom: z.string().min(2).max(100),
  email: z.string().email().toLowerCase(),
  nomGarage: z.string().min(2).max(100),
  tailleGarage: z.string(),
  forfaitInteresse: z.string(),
  recaptchaToken: z.string().min(1, 'Validation anti-spam requise'),
})

export type WaitlistFormData = z.infer<typeof waitlistSchema>