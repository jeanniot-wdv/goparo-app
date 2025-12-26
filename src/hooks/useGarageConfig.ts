// src/hooks/useGarageConfig.ts
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Resolver, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { garageConfigSchema, type GarageConfigFormData } from '@/lib/validations/garage'
import { useUser } from '@/hooks/useUser'

export function useGarageConfig() {
  const router = useRouter()
  const { user } = useUser()
  const [loading, setLoading] = useState<boolean>(true)
  const [saving, setSaving] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  const form = useForm<GarageConfigFormData>({
    resolver: zodResolver(garageConfigSchema) as Resolver<GarageConfigFormData>,
    defaultValues: {
      pays: 'France',
    },
  })

  const fetchGarage = async () => {
    if (!user?.garage?.id) {
      console.log('⚠️ Pas de garage ID')
      setLoading(false)
      return
    }

    try {
      console.log('🌐 Fetching garage:', user.garage.id)
      const res = await fetch(`/api/garages/${user.garage.id}`)
      const data = await res.json()
      
      console.log('📦 Données reçues:', data)

      if (data.success && data.data) {
        const garage = data.data
        
        form.reset({
          nom: garage.nom || '',
          formeJuridique: garage.formeJuridique || 'EI',
          siret: garage.siret || '',
          numeroRCS: garage.numeroRCS || '',
          capitalSocial: garage.capitalSocial ? parseFloat(garage.capitalSocial.toString()) : undefined,
          codeAPE: garage.codeAPE || '',
          numeroTVA: garage.numeroTVA || '',
          adresse: garage.adresse || '',
          complementAdresse: garage.complementAdresse || '',
          codePostal: garage.codePostal || '',
          ville: garage.ville || '',
          pays: garage.pays || 'France',
          email: garage.email || '',
          telephone: garage.telephone || '',
          assurancePro: garage.assurancePro || '',
          numeroPolice: garage.numeroPolice || '',
          garantiesAssurance: garage.garantiesAssurance || '',
          logo: garage.logo || '',
          tarifHoraire: parseFloat(garage.tarifHoraire.toString()) || 50,
          prefixeFacture: garage.prefixeFacture || 'FA',
          prefixeDevis: garage.prefixeDevis || 'DE',
          delaiPaiement: garage.delaiPaiement || 30,
          tauxPenaliteRetard: garage.tauxPenaliteRetard ? parseFloat(garage.tauxPenaliteRetard.toString()) : 10.5,
          indemniteForfaitaire: garage.indemniteForfaitaire ? parseFloat(garage.indemniteForfaitaire.toString()) : 40,
          tauxEscompte: garage.tauxEscompte ? parseFloat(garage.tauxEscompte.toString()) : undefined,
          moduleVitrine: garage.moduleVitrine || false,
          modulePieces: garage.modulePieces || false,
          moduleComptaPro: garage.moduleComptaPro || false,
          modulePlanning: garage.modulePlanning || false,
          moduleVenteVehicules: garage.moduleVenteVehicules || false,
          domaineCustom: garage.domaineCustom || '',
        })
        
        console.log('✅ Formulaire réinitialisé')
      }
    } catch (error) {
      console.error('❌ Fetch garage error:', error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: GarageConfigFormData) => {
    console.log('💾 Sauvegarde des données:', data)
    setSaving(true)
    setSuccess(false)

    try {
      const res = await fetch(`/api/garages/${user?.garage.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await res.json()
      console.log('📨 Résultat:', result)

      if (result.success) {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
        router.refresh()
      } else {
        alert(result.message || 'Erreur lors de la sauvegarde')
      }
    } catch (error) {
      console.error('❌ Save error:', error)
      alert('Erreur réseau')
    } finally {
      setSaving(false)
    }
  }

  return { form, loading, saving, success, fetchGarage, onSubmit }
}