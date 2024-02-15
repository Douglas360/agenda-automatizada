import { Request, Response } from "express";
import prismaClient from "../prisma";
import { SendMessageServices } from "../services/SendMessageServices";

class SendMessageController {
  constructor() {
    this.handle = this.handle.bind(this);
    this.bodyFormatted = this.bodyFormatted.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }

  async handle(req: Request, res: Response) {
    const sendMessageServices = new SendMessageServices();
    try {
      // Obtém a data atual
      const currentDate = new Date();

      // Adiciona três dias à data atual
      const threeDaysLater = new Date(currentDate.getTime());
      threeDaysLater.setDate(currentDate.getDate() + 3);

      // Define a hora, minutos, segundos e milissegundos para 0
      threeDaysLater.setHours(0, 0, 0, 0);

      const tomorrow = new Date();

      //Get tomorrow's events
      const eventsTomorrow = await prismaClient.event.findMany({
        where: {
          date: {
            gte: tomorrow,
            lte: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
          },
        },
      });

      //Get events three days later
      const eventsThreeDaysLater = await prismaClient.event.findMany({
        where: {
          date: {
            gte: threeDaysLater,
            lte: new Date(threeDaysLater.getTime() + 24 * 60 * 60 * 1000),
          },
        },
      });

      const allEvents = [...eventsTomorrow, ...eventsThreeDaysLater];
      if (allEvents.length === 0) {
        return res.status(200).json({ message: "No events found" });
      }

      // Desativar eventos que já aconteceram
      for (const event of allEvents) {
        if (new Date(event.date).getTime() < new Date().getTime()) {
          await prismaClient.event.update({
            where: { id: event.id },
            data: { isActive: false },
          });
        }
      }

      const phones = await prismaClient.phones.findMany();

      for (const event of allEvents) {
        for (const phone of phones) {
          const from = "whatsapp:+14155238886";
          const to = `whatsapp:${phone.phoneNumber}`;
          const body = await this.bodyFormatted([event]);
          const imageUrl = [event.image];

          await sendMessageServices.sendMessage({
            from,
            to,
            body,
            mediaUrl: imageUrl as string[],
          });
        }
      }

      return res.json(allEvents);
    } catch (error) {
      console.log("Error sending message:", error);
      return res.status(500).json({ error: "Failed to send message" });
    }
  }

  private async bodyFormatted(events: any) {
    let body = "";

    for (const event of events) {
      body += `*Evento:* ${event.name}\n`;
      body += `📅 *Data:* ${this.formatDate(event.date)}\n`;
      body += `*Descrição:* ${event.description}\n`;
    }

    return body;
  }

  private formatDate(date: string) {
    const dateObj = new Date(date);

    const day = dateObj.getUTCDate().toString().padStart(2, "0");
    const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0"); // Mês é base 0, então adicionamos 1
    const year = dateObj.getUTCFullYear().toString();
    const hour = dateObj.getUTCHours().toString().padStart(2, "0");
    const minute = dateObj.getUTCMinutes().toString().padStart(2, "0");

    const formattedMinute = minute.length === 1 ? `0${minute}` : minute;

    return `${day}/${month}/${year} às ${hour}:${formattedMinute}`;
  }
}

export { SendMessageController };
