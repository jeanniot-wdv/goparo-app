/*
  Warnings:

  - The `formeJuridique` column on the `Garage` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "FormeJuridique" AS ENUM ('EI', 'EIRL', 'EURL', 'SARL', 'SAS', 'SASU', 'SA', 'SNC', 'SCS', 'AUTO_ENTREPRENEUR', 'MICRO_ENTREPRISE', 'AUTRE');

-- AlterTable
ALTER TABLE "Garage" DROP COLUMN "formeJuridique",
ADD COLUMN     "formeJuridique" "FormeJuridique";
