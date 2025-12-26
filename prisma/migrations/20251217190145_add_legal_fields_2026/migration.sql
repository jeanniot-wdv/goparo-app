/*
  Warnings:

  - Added the required column `formeJuridique` to the `Garage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Garage" ADD COLUMN     "complementAdresse" TEXT,
ADD COLUMN     "delaiPaiement" INTEGER NOT NULL DEFAULT 30,
ADD COLUMN     "indemniteForfaitaire" DECIMAL(10,2) NOT NULL DEFAULT 40,
ADD COLUMN     "pays" TEXT NOT NULL DEFAULT 'France',
ADD COLUMN     "tauxEscompte" DECIMAL(5,2),
ADD COLUMN     "tauxPenaliteRetard" DECIMAL(5,2) NOT NULL DEFAULT 10.5,
DROP COLUMN "formeJuridique",
ADD COLUMN     "formeJuridique" TEXT NOT NULL;

-- DropEnum
DROP TYPE "FormeJuridique";

-- CreateIndex
CREATE INDEX "Garage_siret_idx" ON "Garage"("siret");
