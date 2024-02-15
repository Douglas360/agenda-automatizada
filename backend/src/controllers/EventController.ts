import { Response, Request } from "express";
import { EventServices } from "../services/EventServices";
import { IEventCreate, IEventeDelete } from "../types/EventType";
import { IAuthRequest } from "../types/AuthType";

class EventController {
  async create(req: Request, res: Response) {
    const { name, description, date, ministryId } = req.body as IEventCreate;
    const { idMinistryToken, isAdmin, user_id } =
      req as unknown as IAuthRequest;

    const { file } = req;

    const folderName = "events";

    const eventServices = new EventServices();
    const event = await eventServices.create(
      {
        name,
        description,
        date,
        file,
        folderName,
        ministryId: Number(ministryId),
        user_id: Number(user_id),
      },
      { isAdmin, idMinistryToken } as IAuthRequest
    );

    res.status(201).json(event);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const { user_id, isAdmin } = req as unknown as IAuthRequest;

    const eventServices = new EventServices();

    const event = await eventServices.delete({
      id: Number(id),
      user_id: Number(user_id),
      isAdmin,
    } as IEventeDelete);

    res.status(200).json(event);
  }

  async getAllEvents(req: Request, res: Response) {
    const eventServices = new EventServices();
    const events = await eventServices.getAllEvents();
    res.status(200).json(events);
  }
}

export { EventController };
