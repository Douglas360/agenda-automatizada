import { Request, Response } from "express";
import { UserServices } from "../services/UserServices";
import { IUserCreate } from "../types/UserType";
import { IAuthRequest } from "../types/AuthType";

class UserController {
  async create(req: Request, res: Response) {
    const { user_id, idMinistryToken, isAdmin } =
      req as unknown as IAuthRequest;

    const { name, email, phone, password, idMinistry } =
      req.body as IUserCreate;

    const userServices = new UserServices();

    const user = await userServices.create(
      {
        name,
        email,
        phone,
        password,
        idMinistry,
      },
      { user_id, idMinistryToken, isAdmin } as IAuthRequest
    );

    return res.json(user);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const userServices = new UserServices();

    const user = await userServices.delete(Number(id));

    return res.json(user);
  }

  async getAllUsers(req: Request, res: Response) {
    const userServices = new UserServices();

    const users = await userServices.getAllUsers();

    return res.json(users);
  }
}

export { UserController };
