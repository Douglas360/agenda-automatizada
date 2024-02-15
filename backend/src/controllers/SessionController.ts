import { Request, Response } from "express";
import { SessionServices } from "../services/SessionServices";

class SessionController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const sessionServices = new SessionServices();

    const user = await sessionServices.create({ email, password });

    return res.json(user);
  }
}

export { SessionController };
