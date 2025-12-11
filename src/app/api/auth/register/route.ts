// src/app/api/auth/register/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, generateToken } from '@/lib/auth'
import { registerSchema } from '@/lib/validations/garage'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validation
    const validation = registerSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Données invalides',
          errors: validation.error.flatten(),
        },
        { status: 400 }
      )
    }

    const data = validation.data

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    })

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Cet email est déjà utilisé' },
        { status: 400 }
      )
    }

    // Vérifier si le SIRET existe déjà
    const existingGarage = await prisma.garage.findUnique({
      where: { siret: data.siret },
    })

    if (existingGarage) {
      return NextResponse.json(
        { success: false, message: 'Ce SIRET est déjà enregistré' },
        { status: 400 }
      )
    }

    // Générer le slug du garage
    const slug = data.nomGarage
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Retirer accents
      .replace(/[^a-z0-9]+/g, '-') // Remplacer caractères spéciaux par -
      .replace(/^-+|-+$/g, '') // Retirer - au début/fin

    // Vérifier unicité du slug
    let finalSlug = slug
    let counter = 1
    while (await prisma.garage.findUnique({ where: { slug: finalSlug } })) {
      finalSlug = `${slug}-${counter}`
      counter++
    }

    // Hasher le mot de passe
    const hashedPassword = await hashPassword(data.password)

    // Créer le garage et l'utilisateur admin dans une transaction
    const result = await prisma.$transaction(async (tx) => {
      // Créer le garage
      const garage = await tx.garage.create({
        data: {
          nom: data.nomGarage,
          slug: finalSlug,
          siret: data.siret,
          adresse: data.adresse,
          codePostal: data.codePostal,
          ville: data.ville,
          email: data.emailGarage,
          telephone: data.telephone,
          tarifHoraire: 50, // Valeur par défaut
          subscriptionStatus: 'TRIAL',
          trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 jours
        },
      })

      // Créer l'utilisateur admin
      const user = await tx.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          nom: data.nom,
          prenom: data.prenom,
          role: 'ADMIN',
          garageId: garage.id,
          emailVerified: true, // Auto-vérifié pour simplifier le MVP
        },
      })

      return { garage, user }
    })

    // Générer le token JWT
    const token = generateToken({
      userId: result.user.id,
      garageId: result.garage.id,
      role: result.user.role,
      email: result.user.email,
    })

    // Créer la réponse avec cookie
    const response = NextResponse.json({
      success: true,
      message: 'Compte créé avec succès',
      user: {
        id: result.user.id,
        email: result.user.email,
        nom: result.user.nom,
        prenom: result.user.prenom,
        role: result.user.role,
      },
      garage: {
        id: result.garage.id,
        nom: result.garage.nom,
        slug: result.garage.slug,
      },
    })

    // Définir le cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}