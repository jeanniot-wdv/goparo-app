// src/app/api/auth/check-email/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email requis' },
        { status: 400 }
      )
    }

    // Vérifier si l'email existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { 
          success: false, 
          available: false,
          message: 'Cet email est déjà utilisé' 
        },
        { status: 200 }
      )
    }

    return NextResponse.json({
      success: true,
      available: true,
      message: 'Email disponible',
    })
  } catch (error) {
    console.error('Check email error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}