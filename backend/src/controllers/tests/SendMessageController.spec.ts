import { Request, Response } from "express";
import { SendMessageController } from "../SendMessageController";
import { SendMessageServices } from "../../services/SendMessageServices";

describe("SendMessageController", () => {
  let sendMessageController: SendMessageController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    sendMessageController = new SendMessageController();
    mockRequest = {
      body: {
        message: "Hello World",
        idUser: 1,
      },
    };
    mockResponse = {
      json: jest.fn(),
    };
  });

  it("should create a new message", async () => {
    const mockMessage = { id: 1, message: "Hello World" };
    const mockSendMessageServices = {
      create: jest.fn().mockResolvedValue(mockMessage),
    };

    const mockAuthRequest = {
      user_id: 1,
      idMinistryToken: 1,
      isAdmin: true,
    };

    const sendMessageServicesSpy = jest
      .spyOn(SendMessageServices.prototype, "create")
      .mockImplementation(mockSendMessageServices.create);

    await sendMessageController.create(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(sendMessageServicesSpy).toHaveBeenCalledWith(
      {
        message: "Hello World",
        idUser: 1,
      },
      mockAuthRequest
    );

    expect(mockResponse.json).toHaveBeenCalledWith(mockMessage);
  });
});
