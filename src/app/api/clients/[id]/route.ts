// src/app/api/clients/[id]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'
import { clientSchema } from '@/lib/validations/client'

// GET - Récupérer un client
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const client = await prisma.client.findFirst({
      where: {
        id: params.id,
        garageId: payload.garageId, // Sécurité : isolation des données
      },
      include: {
        vehicules: {
          orderBy: { createdAt: 'desc' },
        },
        factures: {
          orderBy: { dateEmission: 'desc' },
          take: 10,
          select: {
            id: true,
            numero: true,
            dateEmission: true,
            totalTTC: true,
            statut: true,
            type: true,
          },
        },
      },
    })

    if (!client) {
      return NextResponse.json(
        { success: false, message: 'Client introuvable' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: client,
    })
  } catch (error) {
    console.error('GET client error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

// PUT - Modifier un client
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    // Vérifier que le client appartient au garage
    const existingClient = await prisma.client.findFirst({
      where: {
        id: params.id,
        garageId: payload.garageId,
      },
    })

    if (!existingClient) {
      return NextResponse.json(
        { success: false, message: 'Client introuvable' },
        { status: 404 }
      )
    }

    const body = await request.json()

    // Validation
    const validation = clientSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Données invalides',
          errors: validation.error.format(),
        },
        { status: 400 }
      )
    }

    // Mettre à jour
    const client = await prisma.client.update({
      where: { id: params.id },
      data: validation.data,
      include: {
        vehicules: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: client,
      message: 'Client modifié avec succès',
    })
  } catch (error) {
    console.error('PUT client error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer un client
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    // Vérifier que le client appartient au garage
    const client = await prisma.client.findFirst({
      where: {
        id: params.id,
        garageId: payload.garageId,
      },
      include: {
        factures: { take: 1 },
        vehicules: { take: 1 },
      },
    })

    if (!client) {
      return NextResponse.json(
        { success: false, message: 'Client introuvable' },
        { status: 404 }
      )
    }

    // Vérifier si le client a des factures
    if (client.factures.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Impossible de supprimer un client avec des factures',
        },
        { status: 400 }
      )
    }

    // Supprimer les véhicules associés d'abord (si pas de factures)
    if (client.vehicules.length > 0) {
      await prisma.vehicule.deleteMany({
        where: { clientId: params.id },
      })
    }

    // Supprimer le client
    await prisma.client.delete({
      where: { id: params.id },
    })

    return NextResponse.json({
      success: true,
      message: 'Client supprimé avec succès',
    })
  } catch (error) {
    console.error('DELETE client error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}