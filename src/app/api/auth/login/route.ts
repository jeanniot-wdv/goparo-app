import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyPassword, generateToken } from '@/lib/auth'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Mot de passe trop court'),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validation
    const validation = loginSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { success: false, errors: validation.error.flatten() },
        { status: 400 }
      )
    }

    const { email, password } = validation.data

    // Trouver l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email },
      include: { garage: true },
    })

    if (!user || !user.actif) {
      return NextResponse.json(
        { success: false, message: 'Email ou mot de passe incorrect' },
        { status: 401 }
      )
    }

    // Vérifier le mot de passe
    const isValid = await verifyPassword(password, user.password)
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: 'Email ou mot de passe incorrect' },
        { status: 401 }
      )
    }

    // Générer le token JWT
    const token = generateToken({
      userId: user.id,
      garageId: user.garageId,
      role: user.role,
      email: user.email,
    })

    // Créer la réponse avec cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        role: user.role,
        garage: {
          id: user.garage.id,
          nom: user.garage.nom,
          slug: user.garage.slug,
        },
      },
    })

    // Définir le cookie HTTP-only
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: '/',
    })

    // Mettre à jour la dernière connexion
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}