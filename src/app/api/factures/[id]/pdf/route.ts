// src/app/api/factures/[id]/pdf/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'

// GET - Générer le PDF d'une facture
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

    // Récupérer la facture avec toutes les données nécessaires
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

    // TODO: Implémenter la génération du PDF
    // Vous pouvez utiliser une bibliothèque comme 'jspdf', 'pdfkit', ou '@react-pdf/renderer'
    
    // Pour l'instant, retourner les données
    return NextResponse.json({
      success: true,
      message: 'Génération PDF à implémenter',
      data: facture,
    })

    // Exemple avec un buffer PDF:
    // const pdfBuffer = await generatePDF(facture)
    // return new NextResponse(pdfBuffer, {
    //   headers: {
    //     'Content-Type': 'application/pdf',
    //     'Content-Disposition': `attachment; filename="facture-${facture.numero}.pdf"`,
    //   },
    // })

  } catch (error) {
    console.error('GET PDF error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

// Fonction helper pour générer le PDF (à implémenter)
// async function generatePDF(facture: any): Promise<Buffer> {
//   // Votre logique de génération de PDF ici
//   throw new Error('PDF generation not implemented')
// }