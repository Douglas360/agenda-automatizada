import { Request, Response } from "express";
import { PhoneServices } from "../services/PhoneServices";

class PhoneController {
  async create(request: Request, response: Response) {
    const { phoneNumber } = request.body;

    const phoneServices = new PhoneServices();

    const phone = await phoneServices.create(phoneNumber);

    return response.json(phone);
  }

  async getAllPhones(request: Request, response: Response) {
    const phoneServices = new PhoneServices();

    const phones = await phoneServices.getAllPhones();

    return response.json(phones);
  }
}

export { PhoneController };
