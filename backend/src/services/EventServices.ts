import prismaClient from "../prisma";
import { Event } from ".prisma/client";
import { IEventCreate, IEventeDelete } from "../types/EventType";
import { IAuthRequest } from "../types/AuthType";
import { deleteFile, uploadFile } from "../config/multer";

class EventServices {
  async create(
    {
      name,
      description,
      date,
      file,
      folderName,
      ministryId,
      user_id,
    }: IEventCreate,
    { isAdmin, idMinistryToken }: IAuthRequest
  ) {
    let event;

    try {
      await this.validateInputAndFile(
        {
          name,
          description,
          date,
          file,
          ministryId,
          user_id,
        },
        user_id
      );
      await this.validateMinistryExists(ministryId);
      await this.validateIdMinistryTokenIsSameMinistryId(
        idMinistryToken,
        ministryId,
        isAdmin
      );
      await this.validateEventExistsSameDate(date);

      let fileUrl;
      if (file) {
        event = await prismaClient.event.create({
          data: {
            name,
            description,
            date,
            ministryId,
            userId: user_id,
          },
        });

        // Se o evento foi criado com sucesso, então faça o upload do arquivo para o S3
        fileUrl = await uploadFile(file, folderName);

        // Atualize o evento com a URL do arquivo
        await prismaClient.event.update({
          where: {
            id: event.id,
          },
          data: {
            image: fileUrl as string,
          },
        });
      } else {
        // Se não há arquivo, crie o evento sem a imagem
        event = await prismaClient.event.create({
          data: {
            name,
            description,
            date,
            ministryId,
            userId: user_id,
          },
        });
      }

      return event;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async delete({ user_id, id, isAdmin }: IEventeDelete) {
    try {
      await this.validateUserCanDeleteEvent({ user_id, id, isAdmin });
      const event = await prismaClient.event.delete({
        where: {
          id,
        },
      });

      const fileUrl = event.image?.split("/");
      const fileKey = `events/${fileUrl?.[fileUrl.length - 1]}`;
      await deleteFile(fileKey);

      return { message: "Event deleted" };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAllEvents(): Promise<Event[]> {
    const events = await prismaClient.event.findMany({
      orderBy: {
        date: "asc",
      },
    });

    return events;
  }

  private async validateInputAndFile(
    { name, description, date, file }: IEventCreate,
    user_id: number
  ) {
    if (!user_id) {
      throw new Error("User id is required");
    }
    if (!name || !description || !date) {
      throw new Error("Name description and date are required");
    }

    if (!file) {
      throw new Error("Image is required");
    }
  }

  private async validateEventExistsSameDate(date: Date) {
    const event = await prismaClient.event.findFirst({
      where: {
        date,
      },
    });

    if (event) {
      throw new Error("Event already exists in this date");
    }
  }
  private async validateMinistryExists(ministryId: number) {
    const ministry = await prismaClient.ministry.findFirst({
      where: {
        id: ministryId,
      },
    });

    if (!ministry) {
      throw new Error("Ministry not found");
    }
  }
  private async validateIdMinistryTokenIsSameMinistryId(
    idMinistryToken: number,
    ministryId: number,
    isAdmin: boolean
  ) {
    if (!isAdmin) {
      if (idMinistryToken !== ministryId) {
        throw new Error("Only the user from this ministry can create an event");
      }
    }
  }

  //User can only delete his own events
  async validateUserCanDeleteEvent({ user_id, id, isAdmin }: IEventeDelete) {
    const event = await prismaClient.event.findFirst({
      where: {
        id,
      },
    });

    if (!event) {
      throw new Error("Event not found");
    }

    if (!isAdmin) {
      if (event.userId !== user_id) {
        throw new Error("User can only delete his own events");
      }
    }
  }
}

export { EventServices };
