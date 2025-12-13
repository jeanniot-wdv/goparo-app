// src/app/api/clients/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'
import { clientSchema } from '@/lib/validations/client'
import { error } from 'console'

// GET - Liste des clients
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

    // Paramètres de recherche
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    // Construire la requête
    const where = {
      garageId: payload.garageId,
      ...(search && {
        OR: [
          { nom: { contains: search, mode: 'insensitive' as const } },
          { prenom: { contains: search, mode: 'insensitive' as const } },
          { email: { contains: search, mode: 'insensitive' as const } },
          { telephone: { contains: search } },
        ],
      }),
    }

    // Récupérer les clients avec pagination
    const [clients, total] = await Promise.all([
      prisma.client.findMany({
        where,
        include: {
          vehicules: {
            select: { id: true, immatriculation: true, marque: true, modele: true },
          },
          _count: {
            select: { factures: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.client.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: clients,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('GET clients error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

// POST - Créer un client
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
    const validation = clientSchema.safeParse(body)
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

    // Créer le client
    const client = await prisma.client.create({
      data: {
        ...validation.data,
        garageId: payload.garageId,
      },
      include: {
        vehicules: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: client,
      message: 'Client créé avec succès',
    })
  } catch (error) {
    console.error('POST client error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}