import { Request, Response } from "express";
import { SendMessageServices } from "../services/SendMessageServices";
import { Router } from "express";
import prismaClient from "../prisma";

const twilioRouter = Router();

twilioRouter.post("/webhook", async (req: Request, res: Response) => {
  const sendMessageServices = new SendMessageServices();
  const twilioData = req.body;

  // Processa a mensagem recebida do Twilio
  const messageBody = twilioData.Body;
  const phoneNumber = twilioData.From.replace("whatsapp:", "");

  if (messageBody.toLowerCase() === "oi") {
    // Salva o número de telefone na tabela t_phones
    // Lógica para salvar o número de telefone no banco de dados
    const phoneNumberAlreadyExists = await prismaClient.phones.findFirst({
      where: {
        phoneNumber,
      },
    });

    if (!phoneNumberAlreadyExists) {
      await prismaClient.phones.create({
        data: {
          phoneNumber,
        },
      });
      await sendMessageServices.sendMessage({
        from: "whatsapp:+14155238886",
        to: `whatsapp:${phoneNumber}`,
        body: "Olá! A partir de agora você receberá nossas mensagens! 🎉",
      });

      console.log(`Phone number ${phoneNumber} saved successfully!`);
    } else {
      await sendMessageServices.sendMessage({
        from: "whatsapp:+14155238886",
        to: `whatsapp:${phoneNumber}`,
        body: "Olá! Você já está cadastrado em nossa lista! 🎉",
      });
    }
  } else if (messageBody.toLowerCase() === "stop-test") {
    // Remove o número de telefone da tabela t_phones
    // Lógica para remover o número de telefone do banco de dados
    const phoneNumberExists = await prismaClient.phones.findFirst({
      where: {
        phoneNumber,
      },
    });

    if (phoneNumberExists) {
      await prismaClient.phones.delete({
        where: {
          phoneNumber,
        },
      });
      await sendMessageServices.sendMessage({
        from: "whatsapp:+14155238886",
        to: `whatsapp:${phoneNumber}`,
        body: "Você foi removido com sucesso! 😢",
      });
      console.log(`Phone number ${phoneNumber} removed successfully!`);
    }
  } else {
    // Responde com uma mensagem padrão
    // Lógica para responder automaticamente
  }

  // Process the received message
  console.log(`Received message from ${twilioData.From}: ${twilioData.Body}`);

  // Send a response back to Twilio
  res.status(200).end();
});

export { twilioRouter };
