import { Request, Response } from "express";
import { EventController } from "../EventController";
import { EventServices } from "../../services/EventServices";

describe("EventController", () => {
  let eventController: EventController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    eventController = new EventController();
    mockRequest = {
      body: {
        name: "John Doe",
        description: "description",
        location: "location",
        date: "2021-12-12",
        time: "12:00:00",
        idMinistry: 1,
      },
    };
    mockResponse = {
      json: jest.fn(),
    };
  });

  it("should create a new event", async () => {
    const mockEvent = { id: 1, name: "John Doe", description: "description" };
    const mockEventService = {
      create: jest.fn().mockResolvedValue(mockEvent),
    };

    const mockAuthRequest = {
      user_id: 1,
      idMinistryToken: 1,
      isAdmin: true,
    };

    const eventServiceSpy = jest
      .spyOn(EventServices.prototype, "create")
      .mockImplementation(mockEventService.create);

    await eventController.create(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(eventServiceSpy).toHaveBeenCalledWith(
      {
        name: "John Doe",
        description: "description",
        location: "location",
        date: "2021-12-12",
        time: "12:00:00",
        idMinistry: 1,
      },
      mockAuthRequest
    );

    expect(mockResponse.json).toHaveBeenCalledWith(mockEvent);
  });
});
