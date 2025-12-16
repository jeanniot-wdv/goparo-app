/*
  Warnings:

  - A unique constraint covering the columns `[ordreReparationNumero]` on the table `Facture` will be added. If there are existing duplicate values, this will fail.
  - Made the column `adresse` on table `Client` required. This step will fail if there are existing NULL values in that column.
  - Made the column `codePostal` on table `Client` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ville` on table `Client` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "TypeClient" AS ENUM ('PARTICULIER', 'PROFESSIONNEL', 'ADMINISTRATION');

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "complementAdresse" TEXT,
ADD COLUMN     "consentementRGPD" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "dateConsentement" TIMESTAMP(3),
ADD COLUMN     "numeroTVAClient" TEXT,
ADD COLUMN     "pays" TEXT NOT NULL DEFAULT 'France',
ADD COLUMN     "raisonSociale" TEXT,
ADD COLUMN     "siretClient" TEXT,
ADD COLUMN     "typeClient" "TypeClient" NOT NULL DEFAULT 'PARTICULIER',
ALTER COLUMN "adresse" SET NOT NULL,
ALTER COLUMN "codePostal" SET NOT NULL,
ALTER COLUMN "ville" SET NOT NULL;

-- AlterTable
ALTER TABLE "Facture" ADD COLUMN     "accordClientSigne" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "dateArchivage" TIMESTAMP(3),
ADD COLUMN     "datePrestation" TIMESTAMP(3),
ADD COLUMN     "delaiPaiement" INTEGER NOT NULL DEFAULT 30,
ADD COLUMN     "formatElectronique" TEXT,
ADD COLUMN     "hashDocument" TEXT,
ADD COLUMN     "indemniteForfaitaire" DECIMAL(10,2) NOT NULL DEFAULT 40,
ADD COLUMN     "mentionsLegales" TEXT,
ADD COLUMN     "montantEscompte" DECIMAL(10,2),
ADD COLUMN     "ordreReparationDate" TIMESTAMP(3),
ADD COLUMN     "ordreReparationNumero" TEXT,
ADD COLUMN     "signatureElectronique" TEXT,
ADD COLUMN     "tauxEscompte" DECIMAL(5,2),
ADD COLUMN     "tauxPenaliteRetard" DECIMAL(5,2) NOT NULL DEFAULT 10.5;

-- AlterTable
ALTER TABLE "Garage" ADD COLUMN     "assurancePro" TEXT,
ADD COLUMN     "capitalSocial" DECIMAL(10,2),
ADD COLUMN     "codeAPE" TEXT,
ADD COLUMN     "formeJuridique" TEXT,
ADD COLUMN     "garantiesAssurance" TEXT,
ADD COLUMN     "numeroPolice" TEXT,
ADD COLUMN     "numeroRCS" TEXT;

-- AlterTable
ALTER TABLE "LigneFacture" ADD COLUMN     "dureeGarantie" INTEGER,
ADD COLUMN     "garantieLegale" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reference" TEXT,
ADD COLUMN     "unite" TEXT NOT NULL DEFAULT 'unité';

-- CreateIndex
CREATE INDEX "Client_siretClient_idx" ON "Client"("siretClient");

-- CreateIndex
CREATE UNIQUE INDEX "Facture_ordreReparationNumero_key" ON "Facture"("ordreReparationNumero");

-- CreateIndex
CREATE INDEX "Facture_ordreReparationNumero_idx" ON "Facture"("ordreReparationNumero");
