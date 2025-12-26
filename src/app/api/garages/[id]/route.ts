// src/app/api/garages/[id]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'
import { garageConfigSchema } from '@/lib/validations/garage'

// GET - Récupérer les infos du garage
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Non authentifié' },
        { status: 401 }
      )
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json(
        { success: false, message: 'Token invalide' },
        { status: 401 }
      )
    }

    // Vérifier que c'est bien son garage
    if (payload.garageId !== id) {
      return NextResponse.json(
        { success: false, message: 'Non autorisé' },
        { status: 403 }
      )
    }

    const garage = await prisma.garage.findUnique({
      where: { id },
    })

    if (!garage) {
      return NextResponse.json(
        { success: false, message: 'Garage introuvable' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: garage,
    })
  } catch (error) {
    console.error('GET garage error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour le garage
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Non authentifié' },
        { status: 401 }
      )
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json(
        { success: false, message: 'Token invalide' },
        { status: 401 }
      )
    }

    // Vérifier que c'est bien son garage et qu'il est admin
    if (payload.garageId !== id || payload.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, message: 'Non autorisé' },
        { status: 403 }
      )
    }

    const body = await request.json()

    // Validation
    const validation = garageConfigSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Données invalides',
          errors: validation.error.issues,
        },
        { status: 400 }
      )
    }

    const data = validation.data

    // Vérifier unicité SIRET (si changé)
    const existingGarage = await prisma.garage.findUnique({
      where: { id },
    })

    if (!existingGarage) {
      return NextResponse.json(
        { success: false, message: 'Garage introuvable' },
        { status: 404 }
      )
    }

    if (data.siret !== existingGarage.siret) {
      const siretExists = await prisma.garage.findFirst({
        where: {
          siret: data.siret,
          id: { not: id },
        },
      })

      if (siretExists) {
        return NextResponse.json(
          { success: false, message: 'Ce SIRET est déjà utilisé' },
          { status: 400 }
        )
      }
    }

    // Mettre à jour
    const garage = await prisma.garage.update({
      where: { id },
      data: {
        nom: data.nom,
        formeJuridique: data.formeJuridique,
        siret: data.siret,
        numeroRCS: data.numeroRCS || null,
        capitalSocial: data.capitalSocial || null,
        codeAPE: data.codeAPE || null,
        numeroTVA: data.numeroTVA || null,
        adresse: data.adresse,
        complementAdresse: data.complementAdresse || null,
        codePostal: data.codePostal,
        ville: data.ville,
        pays: data.pays,
        email: data.email,
        telephone: data.telephone,
        assurancePro: data.assurancePro,
        numeroPolice: data.numeroPolice,
        garantiesAssurance: data.garantiesAssurance,
        logo: data.logo || null,
        tarifHoraire: data.tarifHoraire,
        prefixeFacture: data.prefixeFacture,
        prefixeDevis: data.prefixeDevis,
        delaiPaiement: data.delaiPaiement,
        tauxPenaliteRetard: data.tauxPenaliteRetard,
        indemniteForfaitaire: data.indemniteForfaitaire,
        tauxEscompte: data.tauxEscompte || null,
        moduleVitrine: data.moduleVitrine,
        modulePieces: data.modulePieces,
        moduleComptaPro: data.moduleComptaPro,
        modulePlanning: data.modulePlanning,
        moduleVenteVehicules: data.moduleVenteVehicules,
        domaineCustom: data.domaineCustom || null,
      },
    })

    return NextResponse.json({
      success: true,
      data: garage,
      message: 'Configuration mise à jour avec succès',
    })
  } catch (error) {
    console.error('PUT garage error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}