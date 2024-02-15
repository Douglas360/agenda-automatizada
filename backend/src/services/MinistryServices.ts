import prismaClient from "../prisma";
import { Ministry } from "@prisma/client";
import { IMinistry } from "../types/MinistryType";

export class MinistryServices {
  async create({ name }: IMinistry): Promise<Ministry> {
    try {
      const ministryAlreadyExists = await prismaClient.ministry.findFirst({
        where: {
          name: name,
        },
      });

      if (ministryAlreadyExists) {
        throw new Error("Ministry already exists");
      }

      return await prismaClient.ministry.create({
        data: {
          name: name,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async getAllMinistries(): Promise<Ministry[]> {
    return await prismaClient.ministry.findMany();
  }
}
