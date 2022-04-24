/*
  Warnings:

  - You are about to drop the `participant` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `hostId` to the `Meet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `participant` DROP FOREIGN KEY `Participant_meetId_fkey`;

-- DropForeignKey
ALTER TABLE `participant` DROP FOREIGN KEY `Participant_userGoogleId_fkey`;

-- AlterTable
ALTER TABLE `meet` ADD COLUMN `hostId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `participant`;

-- CreateTable
CREATE TABLE `_MEETS_HISTORY` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_MEETS_HISTORY_AB_unique`(`A`, `B`),
    INDEX `_MEETS_HISTORY_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Meet` ADD CONSTRAINT `Meet_hostId_fkey` FOREIGN KEY (`hostId`) REFERENCES `User`(`googleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MEETS_HISTORY` ADD FOREIGN KEY (`A`) REFERENCES `Meet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MEETS_HISTORY` ADD FOREIGN KEY (`B`) REFERENCES `User`(`googleId`) ON DELETE CASCADE ON UPDATE CASCADE;
