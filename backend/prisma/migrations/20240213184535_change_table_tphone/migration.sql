/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `t_phones` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `t_phones_phoneNumber_key` ON `t_phones`(`phoneNumber`);
