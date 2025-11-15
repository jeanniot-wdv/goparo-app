import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const garages = await prisma.garage.findMany({
      select: {
        id: true,
        nom: true,
        slug: true,
      },
    })

    return NextResponse.json({ 
      success: true,
      data: garages 
    })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { success: false, error: 'Database error' },
      { status: 500 }
    )
  }
}