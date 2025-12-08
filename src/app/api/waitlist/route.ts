// src/app/api/waitlist/route.ts
import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'
import { Resend } from 'resend'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const resend = new Resend(process.env.RESEND_API_KEY)

// Vérifier le token reCAPTCHA v3
async function verifyRecaptcha(token: string): Promise<{ success: boolean; score: number }> {
  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      }
    )

    const data = await response.json()
    
    return {
      success: data.success === true,
      score: data.score || 0,
    }
  } catch (error) {
    console.error('reCAPTCHA verification error:', error)
    return { success: false, score: 0 }
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validation manuelle simple
    if (!body.nom || !body.email || !body.nomGarage || !body.tailleGarage || !body.forfaitInteresse) {
      return NextResponse.json(
        { success: false, message: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, message: 'Email invalide' },
        { status: 400 }
      )
    }

    // Vérification reCAPTCHA
    if (!body.recaptchaToken) {
      return NextResponse.json(
        { success: false, message: 'Validation anti-spam requise' },
        { status: 400 }
      )
    }

    const recaptchaResult = await verifyRecaptcha(body.recaptchaToken)
    
    // Score entre 0 (bot) et 1 (humain)
    // On accepte les scores >= 0.5
    if (!recaptchaResult.success || recaptchaResult.score < 0.5) {
      console.log('reCAPTCHA failed:', recaptchaResult)
      return NextResponse.json(
        { 
          success: false, 
          message: 'Vérification anti-spam échouée. Veuillez réessayer.',
        },
        { status: 400 }
      )
    }

    // Ajouter à Notion
    try {
      await notion.pages.create({
        parent: {
          type: 'database_id',
          database_id: process.env.NOTION_DATABASE_ID!,
        },
        properties: {
          Nom: {
            title: [{ text: { content: body.nom } }],
          },
          Email: {
            email: body.email.toLowerCase(),
          },
          'Nom du garage': {
            rich_text: [{ text: { content: body.nomGarage } }],
          },
          'Taille du garage': {
            select: { name: body.tailleGarage },
          },
          'Forfait intéressé': {
            select: { name: body.forfaitInteresse },
          },
          Status: {
            select: { name: 'Nouveau' },
          },
        },
      })
    } catch (error: any) {
      console.error('Notion error:', error)
      
      // Gérer les doublons
      if (error.body?.includes('already exists') || error.status === 400) {
        return NextResponse.json(
          { success: false, message: 'Cet email est déjà inscrit.' },
          { status: 400 }
        )
      }
      
      return NextResponse.json(
        { success: false, message: 'Erreur lors de l\'enregistrement' },
        { status: 500 }
      )
    }

    // Envoyer l'email de bienvenue
    try {
      await resend.emails.send({
        from: 'MonGarage <onboarding@resend.dev>',
        to: body.email,
        subject: '🎉 Bienvenue sur la liste d\'attente Goparo !',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  line-height: 1.6;
                  color: #333;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                }
                .header {
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  color: white;
                  padding: 40px 20px;
                  text-align: center;
                  border-radius: 10px 10px 0 0;
                }
                .content {
                  background: #f9fafb;
                  padding: 40px 30px;
                  border-radius: 0 0 10px 10px;
                }
              </style>
            </head>
            <body>
              <div class="header">
                <h1 style="margin: 0; font-size: 32px;">Goparo</h1>
                <p style="margin: 10px 0 0; font-size: 18px;">Merci de votre intérêt !</p>
              </div>
              
              <div class="content">
                <h2>Bonjour ${body.nom} 👋</h2>
                
                <p>
                  Nous sommes ravis de vous compter parmi les premiers intéressés par <strong>Goparo</strong>,
                  la solution SaaS complète pour la gestion de votre garage automobile.
                </p>
                
                <p><strong>Vos informations :</strong></p>
                <ul>
                  <li>Garage : ${body.nomGarage}</li>
                  <li>Taille : ${body.tailleGarage} employés</li>
                  <li>Forfait : ${body.forfaitInteresse}</li>
                </ul>
                
                <p><strong>Prochaines étapes :</strong></p>
                <ol>
                  <li>Nous finalisons les dernières fonctionnalités</li>
                  <li>Vous recevrez un accès anticipé dès le lancement</li>
                  <li>Une démo personnalisée vous sera proposée</li>
                </ol>
                
                <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                  <strong>🎁 Offre spéciale lancement :</strong><br>
                  En tant que membre de la liste d'attente, vous bénéficierez de 
                  <strong>3 mois gratuits</strong> à l'ouverture du service !
                </p>
              </div>
              
              <div style="text-align: center; margin-top: 30px; color: #666; font-size: 14px;">
                <p>Goparo - La gestion de garage simplifiée<br>
                © ${new Date().getFullYear()} Tous droits réservés</p>
              </div>
            </body>
          </html>
        `,
      })
    } catch (emailError) {
      console.error('Email error:', emailError)
      // On ne bloque pas l'inscription si l'email échoue
    }

    return NextResponse.json({
      success: true,
      message: 'Inscription réussie ! Consultez votre email.',
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}