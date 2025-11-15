-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('FREE', 'STARTER', 'ESSENTIEL', 'PROFESSIONNEL', 'PREMIUM', 'CUSTOM');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('TRIAL', 'ACTIVE', 'PAST_DUE', 'CANCELLED', 'INCOMPLETE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MECANICIEN', 'COMPTABLE', 'SECRETARIAT');

-- CreateEnum
CREATE TYPE "TypeFacture" AS ENUM ('DEVIS', 'FACTURE');

-- CreateEnum
CREATE TYPE "StatutFacture" AS ENUM ('BROUILLON', 'ENVOYE', 'ACCEPTE', 'REFUSE', 'PAYE', 'PARTIELLEMENT_PAYE', 'EN_RETARD', 'ANNULE');

-- CreateEnum
CREATE TYPE "TypeLigne" AS ENUM ('PIECE', 'MAIN_OEUVRE', 'FORFAIT', 'REMISE');

-- CreateTable
CREATE TABLE "Garage" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "siret" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "codePostal" TEXT NOT NULL,
    "ville" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "numeroTVA" TEXT,
    "logo" TEXT,
    "tarifHoraire" DECIMAL(10,2) NOT NULL DEFAULT 50,
    "prefixeFacture" TEXT NOT NULL DEFAULT 'FA',
    "prefixeDevis" TEXT NOT NULL DEFAULT 'DE',
    "prochainNumeroFacture" INTEGER NOT NULL DEFAULT 1,
    "prochainNumeroDevis" INTEGER NOT NULL DEFAULT 1,
    "subscriptionPlan" "Plan" NOT NULL DEFAULT 'FREE',
    "moduleVitrine" BOOLEAN NOT NULL DEFAULT false,
    "modulePieces" BOOLEAN NOT NULL DEFAULT false,
    "moduleComptaPro" BOOLEAN NOT NULL DEFAULT false,
    "modulePlanning" BOOLEAN NOT NULL DEFAULT false,
    "moduleVenteVehicules" BOOLEAN NOT NULL DEFAULT false,
    "limiteFacutresMois" INTEGER NOT NULL DEFAULT 20,
    "limiteUtilisateurs" INTEGER NOT NULL DEFAULT 1,
    "limiteStockageMo" INTEGER NOT NULL DEFAULT 100,
    "domaineCustom" TEXT,
    "domaineVerifie" BOOLEAN NOT NULL DEFAULT false,
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "subscriptionStatus" "SubscriptionStatus" NOT NULL DEFAULT 'TRIAL',
    "trialEndsAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Garage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MECANICIEN',
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "garageId" TEXT NOT NULL,
    "lastLoginAt" TIMESTAMP(3),
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "civilite" TEXT,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT,
    "telephone" TEXT NOT NULL,
    "adresse" TEXT,
    "codePostal" TEXT,
    "ville" TEXT,
    "notes" TEXT,
    "garageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicule" (
    "id" TEXT NOT NULL,
    "immatriculation" TEXT NOT NULL,
    "marque" TEXT NOT NULL,
    "modele" TEXT NOT NULL,
    "annee" INTEGER,
    "couleur" TEXT,
    "vin" TEXT,
    "kilometrage" INTEGER,
    "dateMiseCirculation" TIMESTAMP(3),
    "notes" TEXT,
    "clientId" TEXT NOT NULL,
    "garageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Facture" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "type" "TypeFacture" NOT NULL DEFAULT 'FACTURE',
    "statut" "StatutFacture" NOT NULL DEFAULT 'BROUILLON',
    "dateEmission" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateEcheance" TIMESTAMP(3),
    "datePaiement" TIMESTAMP(3),
    "clientId" TEXT NOT NULL,
    "vehiculeId" TEXT,
    "garageId" TEXT NOT NULL,
    "heuresTravail" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "tarifHoraire" DECIMAL(10,2) NOT NULL,
    "totalHT" DECIMAL(10,2) NOT NULL,
    "totalTVA" DECIMAL(10,2) NOT NULL,
    "totalTTC" DECIMAL(10,2) NOT NULL,
    "modePaiement" TEXT,
    "notes" TEXT,
    "conditionsReglement" TEXT,
    "devisOrigineId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Facture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LigneFacture" (
    "id" TEXT NOT NULL,
    "factureId" TEXT NOT NULL,
    "ordre" INTEGER NOT NULL DEFAULT 0,
    "type" "TypeLigne" NOT NULL DEFAULT 'PIECE',
    "designation" TEXT NOT NULL,
    "quantite" DECIMAL(10,3) NOT NULL,
    "prixUnitaireHT" DECIMAL(10,2) NOT NULL,
    "tauxTVA" DECIMAL(5,2) NOT NULL DEFAULT 20,
    "totalHT" DECIMAL(10,2) NOT NULL,
    "totalTVA" DECIMAL(10,2) NOT NULL,
    "totalTTC" DECIMAL(10,2) NOT NULL,
    "pieceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LigneFacture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Piece" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "description" TEXT,
    "prixAchatHT" DECIMAL(10,2) NOT NULL,
    "prixVenteHT" DECIMAL(10,2) NOT NULL,
    "tauxTVA" DECIMAL(5,2) NOT NULL DEFAULT 20,
    "margePercentage" DECIMAL(5,2),
    "stock" INTEGER NOT NULL DEFAULT 0,
    "stockMin" INTEGER NOT NULL DEFAULT 0,
    "stockMax" INTEGER,
    "categorie" TEXT,
    "garageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Piece_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actualite" (
    "id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "extrait" TEXT,
    "image" TEXT,
    "publie" BOOLEAN NOT NULL DEFAULT false,
    "datePublication" TIMESTAMP(3),
    "garageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Actualite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "garageId" TEXT NOT NULL,
    "userId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "details" JSONB,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Garage_slug_key" ON "Garage"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Garage_siret_key" ON "Garage"("siret");

-- CreateIndex
CREATE UNIQUE INDEX "Garage_domaineCustom_key" ON "Garage"("domaineCustom");

-- CreateIndex
CREATE UNIQUE INDEX "Garage_stripeCustomerId_key" ON "Garage"("stripeCustomerId");

-- CreateIndex
CREATE INDEX "Garage_slug_idx" ON "Garage"("slug");

-- CreateIndex
CREATE INDEX "Garage_stripeCustomerId_idx" ON "Garage"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_garageId_idx" ON "User"("garageId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "Client_garageId_idx" ON "Client"("garageId");

-- CreateIndex
CREATE INDEX "Client_email_idx" ON "Client"("email");

-- CreateIndex
CREATE INDEX "Client_telephone_idx" ON "Client"("telephone");

-- CreateIndex
CREATE INDEX "Vehicule_garageId_idx" ON "Vehicule"("garageId");

-- CreateIndex
CREATE INDEX "Vehicule_clientId_idx" ON "Vehicule"("clientId");

-- CreateIndex
CREATE INDEX "Vehicule_immatriculation_idx" ON "Vehicule"("immatriculation");

-- CreateIndex
CREATE UNIQUE INDEX "Facture_numero_key" ON "Facture"("numero");

-- CreateIndex
CREATE INDEX "Facture_garageId_idx" ON "Facture"("garageId");

-- CreateIndex
CREATE INDEX "Facture_clientId_idx" ON "Facture"("clientId");

-- CreateIndex
CREATE INDEX "Facture_numero_idx" ON "Facture"("numero");

-- CreateIndex
CREATE INDEX "Facture_statut_idx" ON "Facture"("statut");

-- CreateIndex
CREATE INDEX "Facture_dateEmission_idx" ON "Facture"("dateEmission");

-- CreateIndex
CREATE INDEX "LigneFacture_factureId_idx" ON "LigneFacture"("factureId");

-- CreateIndex
CREATE INDEX "Piece_garageId_idx" ON "Piece"("garageId");

-- CreateIndex
CREATE INDEX "Piece_reference_idx" ON "Piece"("reference");

-- CreateIndex
CREATE INDEX "Piece_stock_idx" ON "Piece"("stock");

-- CreateIndex
CREATE UNIQUE INDEX "Piece_garageId_reference_key" ON "Piece"("garageId", "reference");

-- CreateIndex
CREATE INDEX "Actualite_garageId_idx" ON "Actualite"("garageId");

-- CreateIndex
CREATE INDEX "Actualite_publie_idx" ON "Actualite"("publie");

-- CreateIndex
CREATE UNIQUE INDEX "Actualite_garageId_slug_key" ON "Actualite"("garageId", "slug");

-- CreateIndex
CREATE INDEX "AuditLog_garageId_idx" ON "AuditLog"("garageId");

-- CreateIndex
CREATE INDEX "AuditLog_userId_idx" ON "AuditLog"("userId");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicule" ADD CONSTRAINT "Vehicule_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicule" ADD CONSTRAINT "Vehicule_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Facture" ADD CONSTRAINT "Facture_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Facture" ADD CONSTRAINT "Facture_vehiculeId_fkey" FOREIGN KEY ("vehiculeId") REFERENCES "Vehicule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Facture" ADD CONSTRAINT "Facture_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LigneFacture" ADD CONSTRAINT "LigneFacture_factureId_fkey" FOREIGN KEY ("factureId") REFERENCES "Facture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LigneFacture" ADD CONSTRAINT "LigneFacture_pieceId_fkey" FOREIGN KEY ("pieceId") REFERENCES "Piece"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Piece" ADD CONSTRAINT "Piece_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actualite" ADD CONSTRAINT "Actualite_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
