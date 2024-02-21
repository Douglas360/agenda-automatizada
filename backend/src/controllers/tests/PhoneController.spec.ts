import { Request, Response } from "express";
import { PhoneController } from "../PhoneController";
import { PhoneServices } from "../../services/PhoneServices";

describe("PhoneController", () => {
  let phoneController: PhoneController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    phoneController = new PhoneController();
    mockRequest = {
      body: {
        phone: "123456789",
        idUser: 1,
      },
    };
    mockResponse = {
      json: jest.fn(),
    };
  });

  it("should create a new phone", async () => {
    const mockPhone = { id: 1, phone: "123456789" };
    const mockPhoneServices = {
      create: jest.fn().mockResolvedValue(mockPhone),
    };

    const mockAuthRequest = {
      user_id: 1,
      idMinistryToken: 1,
      isAdmin: true,
    };

    const phoneServicesSpy = jest
      .spyOn(PhoneServices.prototype, "create")
      .mockImplementation(mockPhoneServices.create);

    await phoneController.create(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(phoneServicesSpy).toHaveBeenCalledWith(
      {
        phone: "123456789",
        idUser: 1,
      },
      mockAuthRequest
    );

    expect(mockResponse.json).toHaveBeenCalledWith(mockPhone);
  });
});
