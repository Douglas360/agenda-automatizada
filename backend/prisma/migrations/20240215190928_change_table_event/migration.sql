/*
  Warnings:

  - Added the required column `userId` to the `t_event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `t_event` ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `t_event` ADD CONSTRAINT `t_event_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `t_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
