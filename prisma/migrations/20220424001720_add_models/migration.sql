-- CreateTable
CREATE TABLE `Participant` (
    `id` VARCHAR(191) NOT NULL,
    `userGoogleId` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `meetId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` VARCHAR(191) NOT NULL,
    `userGoogleId` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `chatId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chat` (
    `id` VARCHAR(191) NOT NULL,
    `meetId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Chat_meetId_key`(`meetId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Meet` (
    `id` VARCHAR(191) NOT NULL,
    `enableScreenSharing` BOOLEAN NOT NULL DEFAULT true,
    `enableChat` BOOLEAN NOT NULL DEFAULT true,
    `enableMicrophone` BOOLEAN NOT NULL DEFAULT true,
    `enableVideo` BOOLEAN NOT NULL DEFAULT true,
    `organizerAdministration` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `duration` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FeedBack` (
    `id` VARCHAR(191) NOT NULL,
    `userGoogleId` VARCHAR(191) NOT NULL,
    `meetId` VARCHAR(191) NOT NULL,
    `stars` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Participant` ADD CONSTRAINT `Participant_userGoogleId_fkey` FOREIGN KEY (`userGoogleId`) REFERENCES `User`(`googleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Participant` ADD CONSTRAINT `Participant_meetId_fkey` FOREIGN KEY (`meetId`) REFERENCES `Meet`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_userGoogleId_fkey` FOREIGN KEY (`userGoogleId`) REFERENCES `User`(`googleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `Chat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_meetId_fkey` FOREIGN KEY (`meetId`) REFERENCES `Meet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedBack` ADD CONSTRAINT `FeedBack_userGoogleId_fkey` FOREIGN KEY (`userGoogleId`) REFERENCES `User`(`googleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedBack` ADD CONSTRAINT `FeedBack_meetId_fkey` FOREIGN KEY (`meetId`) REFERENCES `Meet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
