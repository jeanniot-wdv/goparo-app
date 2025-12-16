// frontend/prisma/seed.ts
// Script de seed pour initialiser la base de données avec des données de test
import { PrismaClient } from '@/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Créer un garage de démo
  const garage = await prisma.garage.create({
    data: {
      nom: 'Garage Dupont',
      slug: 'garage-dupont',
      siret: '12345678900012',
      adresse: '15 Rue de la Réparation',
      codePostal: '75001',
      ville: 'Paris',
      email: 'contact@garage-dupont.fr',
      telephone: '0123456789',
      tarifHoraire: 65,
      moduleVitrine: true,
      modulePieces: true,
    },
  })

  // Créer un admin
  const hashedPassword = await bcrypt.hash('admin123', 12)
  await prisma.user.create({
    data: {
      email: 'admin@garage-dupont.fr',
      password: hashedPassword,
      nom: 'Dupont',
      prenom: 'Jean',
      role: 'ADMIN',
      garageId: garage.id,
      emailVerified: true,
    },
  })

  // Créer quelques clients
  const clients = await Promise.all([
    prisma.client.create({
      data: {
        nom: 'Martin',
        prenom: 'Pierre',
        email: 'pierre.martin@email.com',
        telephone: '0612345678',
        adresse: '10 Avenue des Champs',
        codePostal: '75008',
        ville: 'Paris',
        garageId: garage.id,
      },
    }),
    prisma.client.create({
      data: {
        nom: 'Bernard',
        prenom: 'Sophie',
        email: 'sophie.bernard@email.com',
        telephone: '0698765432',
        adresse: '10 Avenue des Champs',
        codePostal: '75008',
        ville: 'Paris',
        garageId: garage.id,
      },
    }),
  ])

  // Créer quelques véhicules
  await prisma.vehicule.create({
    data: {
      immatriculation: 'AB-123-CD',
      marque: 'Peugeot',
      modele: '308',
      annee: 2020,
      kilometrage: 45000,
      clientId: clients[0].id,
      garageId: garage.id,
    },
  })

  // Créer quelques pièces
  await Promise.all([
    prisma.piece.create({
      data: {
        reference: 'FH-001',
        designation: 'Filtre à huile',
        prixAchatHT: 8,
        prixVenteHT: 15,
        stock: 25,
        stockMin: 5,
        garageId: garage.id,
      },
    }),
    prisma.piece.create({
      data: {
        reference: 'PF-002',
        designation: 'Plaquettes de frein avant',
        prixAchatHT: 35,
        prixVenteHT: 65,
        stock: 10,
        stockMin: 3,
        garageId: garage.id,
      },
    }),
  ])

  console.log('✅ Database seeded successfully!')
  console.log('📧 Login: admin@garage-dupont.fr')
  console.log('🔑 Password: admin123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })