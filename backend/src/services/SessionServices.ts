import * as dotenv from "dotenv";
dotenv.config();
import prismaClient from "../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
class SessionServices {
  async create({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<any> {
    try {
      const user = await prismaClient.user.findFirst({
        where: {
          email,
        },
        include: {
          userMinistry: {
            select: {
              ministryId: true,
            },
          },
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const passwordMatch = await compare(password, user.password);
      if (!passwordMatch) {
        throw new Error("Email/Password incorrect");
      }

      const token = sign(
        {
          email: user.email,
          isAdmin: user.isAdmin,
          idMinistryToken: user.userMinistry[0].ministryId,
        },
        process.env.JWT_SECRET!,
        {
          subject: user.id.toString(),
          expiresIn: "1d",
        }
      );

      return {
        token,
        //id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        //isAdmin: user.isAdmin,
        //userMinistry: user.userMinistry,
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export { SessionServices };
