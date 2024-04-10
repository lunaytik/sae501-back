-- CreateTable
CREATE TABLE `VariantImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(191) NULL,
    `variantId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB;

-- AddForeignKey
ALTER TABLE `VariantImage` ADD CONSTRAINT `VariantImage_variantId_fkey` FOREIGN KEY (`variantId`) REFERENCES `Variant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
