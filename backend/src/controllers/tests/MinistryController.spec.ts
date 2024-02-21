import { Request, Response } from "express";
import { MinistryController } from "../MinistryController";
import { MinistryServices } from "../../services/MinistryServices";

describe("MinistryController", () => {
  let ministryController: MinistryController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    ministryController = new MinistryController();
    mockRequest = {
      body: {
        name: "John Doe",
        description: "description",
        idChurch: 1,
      },
    };
    mockResponse = {
      json: jest.fn(),
    };
  });

  it("should create a new ministry", async () => {
    const mockMinistry = {
      id: 1,
      name: "John Doe",
      description: "description",
    };
    const mockMinistryService = {
      create: jest.fn().mockResolvedValue(mockMinistry),
    };

    const mockAuthRequest = {
      user_id: 1,
      idChurchToken: 1,
      isAdmin: true,
    };

    const ministryServiceSpy = jest
      .spyOn(MinistryServices.prototype, "create")
      .mockImplementation(mockMinistryService.create);

    await ministryController.create(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(ministryServiceSpy).toHaveBeenCalledWith(
      {
        name: "John Doe",
        description: "description",
        idChurch: 1,
      },
      mockAuthRequest
    );

    expect(mockResponse.json).toHaveBeenCalledWith(mockMinistry);
  });
});
