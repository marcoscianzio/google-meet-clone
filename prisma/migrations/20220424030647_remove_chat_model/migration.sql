/*
  Warnings:

  - You are about to drop the column `chatId` on the `message` table. All the data in the column will be lost.
  - You are about to drop the `chat` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `meetId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `chat` DROP FOREIGN KEY `Chat_meetId_fkey`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `Message_chatId_fkey`;

-- AlterTable
ALTER TABLE `message` DROP COLUMN `chatId`,
    ADD COLUMN `meetId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `chat`;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_meetId_fkey` FOREIGN KEY (`meetId`) REFERENCES `Meet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
