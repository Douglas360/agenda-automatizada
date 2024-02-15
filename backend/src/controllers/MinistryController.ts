import { Request, Response } from "express";
import { MinistryServices } from "../services/MinistryServices";

export class MinistryController {
  async create(req: Request, res: Response) {
    const { name } = req.body;

    const ministryServices = new MinistryServices();

    const ministry = await ministryServices.create({
      name,
    });

    return res.json(ministry);
  }

  async getAllMinistries(req: Request, res: Response) {
    const ministryServices = new MinistryServices();

    const ministries = await ministryServices.getAllMinistries();

    return res.json(ministries);
  }
}
