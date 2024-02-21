import { Request, Response } from "express";
import { UserController } from "../UserController";
import { UserServices } from "../../services/UserServices";

describe("UserController", () => {
  let userController: UserController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    userController = new UserController();
    mockRequest = {
      body: {
        name: "John Doe",
        email: "john@example.com",
        phone: "123456789",
        password: "password",
        idMinistry: 1,
      },
    };
    mockResponse = {
      json: jest.fn(),
    };
  });

  it("should create a new user", async () => {
    const mockUser = { id: 1, name: "John Doe", email: "john@example.com" };
    const mockUserServices = {
      create: jest.fn().mockResolvedValue(mockUser),
    };

    const mockAuthRequest = {
      user_id: 1,
      idMinistryToken: 1,
      isAdmin: true,
    };

    const userServicesSpy = jest
      .spyOn(UserServices.prototype, "create")
      .mockImplementation(mockUserServices.create);

    await userController.create(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(userServicesSpy).toHaveBeenCalledWith(
      {
        name: "John Doe",
        email: "john@example.com",
        phone: "123456789",
        password: "password",
        idMinistry: 1,
      },
      mockAuthRequest
    );

    expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
  });
});
