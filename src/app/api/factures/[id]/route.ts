// src/app/api/factures/[id]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'

// GET - Récupérer une facture
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
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

    const { id } = await params

    const facture = await prisma.facture.findFirst({
      where: {
        id,
        garageId: payload.garageId,
      },
      include: {
        client: true,
        vehicule: true,
        garage: true,
        lignes: {
          orderBy: { ordre: 'asc' },
        },
      },
    })

    if (!facture) {
      return NextResponse.json(
        { success: false, message: 'Facture introuvable' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: facture,
    })
  } catch (error) {
    console.error('GET facture error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

// PUT - Modifier une facture
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
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

    const { id } = await params

    // Vérifier que la facture appartient au garage
    const existingFacture = await prisma.facture.findFirst({
      where: {
        id,
        garageId: payload.garageId,
      },
    })

    if (!existingFacture) {
      return NextResponse.json(
        { success: false, message: 'Facture introuvable' },
        { status: 404 }
      )
    }

    const body = await request.json()

    // Mettre à jour la facture
    const facture = await prisma.facture.update({
      where: { id },
      data: {
        statut: body.statut,
        notes: body.notes,
        // Ajoutez d'autres champs modifiables selon vos besoins
      },
      include: {
        client: true,
        vehicule: true,
        lignes: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: facture,
      message: 'Facture modifiée avec succès',
    })
  } catch (error) {
    console.error('PUT facture error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer une facture
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
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

    const { id } = await params

    // Vérifier que la facture appartient au garage
    const facture = await prisma.facture.findFirst({
      where: {
        id,
        garageId: payload.garageId,
      },
    })

    if (!facture) {
      return NextResponse.json(
        { success: false, message: 'Facture introuvable' },
        { status: 404 }
      )
    }

    // Supprimer les lignes de facture d'abord
    await prisma.ligneFacture.deleteMany({
      where: { factureId: id },
    })

    // Supprimer la facture
    await prisma.facture.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: 'Facture supprimée avec succès',
    })
  } catch (error) {
    console.error('DELETE facture error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}