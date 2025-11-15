// frontend/src/lib/utils.ts
// Utilitaire pour combiner clsx et tailwind-merge
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
