import prismaClient from "../prisma";
import { User } from ".prisma/client";
import { IUserCreate } from "../types/UserType";
import { hash } from "bcryptjs";
import { IAuthRequest } from "../types/AuthType";

class UserServices {
  async create(
    { name, email, phone, password, idMinistry }: IUserCreate,
    { isAdmin }: IAuthRequest
  ): Promise<User> {
    try {
      await this.validateUserIsAdmin(isAdmin);
      await this.validateUserExists(email, phone);

      if (idMinistry) {
        await this.validateMinistryExists(idMinistry);
      }

      const passwordHash = await hash(password, 8);

      const user = await prismaClient.user.create({
        data: {
          name,
          email,
          phone,
          password: passwordHash,
        },
      });
      if (idMinistry) {
        await prismaClient.userMinistry.create({
          data: {
            userId: user.id,
            ministryId: idMinistry,
          },
        });
      }

      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const user = await prismaClient.user.delete({
        where: {
          id,
        },
      });
      await prismaClient.userMinistry.deleteMany({
        where: {
          userId: id,
        },
      });
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const users = await prismaClient.user.findMany();
      return users;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  //----- CUSTOM METHODS -----
  private async validateUserIsAdmin(isAdmin: boolean) {
    if (!isAdmin) {
      throw new Error("User is not admin");
    }
  }
  private async validateUserExists(email: string, phone: string) {
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const phoneAlreadyExists = await prismaClient.user.findFirst({
      where: {
        phone,
      },
    });

    if (phoneAlreadyExists) {
      throw new Error("Phone already exists");
    }
  }

  private async validateMinistryExists(idMinistry: number) {
    const ministryAlreadyExists = await prismaClient.ministry.findFirst({
      where: {
        id: idMinistry,
      },
    });
    if (!ministryAlreadyExists) {
      throw new Error("Ministry not found");
    }
  }
}
export { UserServices };
