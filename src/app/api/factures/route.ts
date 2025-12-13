// src/app/api/factures/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'
import { factureSchema } from '@/lib/validations/facture'
import { calculerTotauxFacture, genererNumero, calculerLigne } from '@/lib/utils/facture'
import { error } from 'console'

// GET - Liste des factures
export async function GET(request: Request) {
  try {
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

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const type = searchParams.get('type') // DEVIS ou FACTURE
    const statut = searchParams.get('statut')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    const where: any = {
      garageId: payload.garageId,
      ...(type && { type }),
      ...(statut && { statut }),
      ...(search && {
        OR: [
          { numero: { contains: search, mode: 'insensitive' } },
          { client: { nom: { contains: search, mode: 'insensitive' } } },
          { client: { prenom: { contains: search, mode: 'insensitive' } } },
        ],
      }),
    }

    const [factures, total] = await Promise.all([
      prisma.facture.findMany({
        where,
        include: {
          client: {
            select: { id: true, nom: true, prenom: true, email: true, telephone: true },
          },
          vehicule: {
            select: { id: true, immatriculation: true, marque: true, modele: true },
          },
        },
        orderBy: { dateEmission: 'desc' },
        skip,
        take: limit,
      }),
      prisma.facture.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: factures,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('GET factures error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

// POST - Créer une facture
export async function POST(request: Request) {
  try {
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

    const body = await request.json()

    // Validation
    const validation = factureSchema.safeParse(body)
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

    // Récupérer le garage pour les préfixes et numéros
    const garage = await prisma.garage.findUnique({
      where: { id: payload.garageId },
      select: {
        prefixeFacture: true,
        prefixeDevis: true,
        prochainNumeroFacture: true,
        prochainNumeroDevis: true,
        tarifHoraire: true,
      },
    })

    if (!garage) {
      return NextResponse.json(
        { success: false, message: 'Garage introuvable' },
        { status: 404 }
      )
    }

    // Générer le numéro
    const isFacture = data.type === 'FACTURE'
    const prefix = isFacture ? garage.prefixeFacture : garage.prefixeDevis
    const prochainNumero = isFacture
      ? garage.prochainNumeroFacture
      : garage.prochainNumeroDevis
    
    const numero = genererNumero(data.type, prefix, prochainNumero)

    // Calculer les totaux
    const totaux = calculerTotauxFacture(
      data.lignes,
      data.heuresTravail,
      data.tarifHoraire
    )

    // Créer la facture
    const facture = await prisma.$transaction(async (tx) => {
      // Créer la facture
      const newFacture = await tx.facture.create({
        data: {
          numero,
          type: data.type,
          statut: data.statut || 'BROUILLON',
          garageId: payload.garageId,
          clientId: data.clientId,
          vehiculeId: data.vehiculeId || null,
          dateEmission: data.dateEmission ? new Date(data.dateEmission) : new Date(),
          dateEcheance: data.dateEcheance ? new Date(data.dateEcheance) : null,
          heuresTravail: data.heuresTravail,
          tarifHoraire: data.tarifHoraire,
          totalHT: totaux.totalHT,
          totalTVA: totaux.totalTVA,
          totalTTC: totaux.totalTTC,
          notes: data.notes || null,
          conditionsReglement: data.conditionsReglement || null,
          modePaiement: data.modePaiement || null,
          lignes: {
            create: data.lignes.map((ligne, index) => {
              const ligneCalculee = calculerLigne(ligne)
              return {
                ordre: index,
                type: ligne.type,
                designation: ligne.designation,
                quantite: ligne.quantite,
                prixUnitaireHT: ligne.prixUnitaireHT,
                tauxTVA: ligne.tauxTVA,
                totalHT: ligneCalculee.totalHT,
                totalTVA: ligneCalculee.totalTVA,
                totalTTC: ligneCalculee.totalTTC,
                pieceId: ligne.pieceId || null,
              }
            }),
          },
        },
        include: {
          client: true,
          vehicule: true,
          lignes: {
            orderBy: { ordre: 'asc' },
          },
        },
      })

      // Mettre à jour le compteur
      if (isFacture) {
        await tx.garage.update({
          where: { id: payload.garageId },
          data: { prochainNumeroFacture: { increment: 1 } },
        })
      } else {
        await tx.garage.update({
          where: { id: payload.garageId },
          data: { prochainNumeroDevis: { increment: 1 } },
        })
      }

      return newFacture
    })

    return NextResponse.json({
      success: true,
      data: facture,
      message: `${data.type === 'FACTURE' ? 'Facture' : 'Devis'} créé(e) avec succès`,
    })
  } catch (error) {
    console.error('POST facture error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}