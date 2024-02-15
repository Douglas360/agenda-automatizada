import twilio from "twilio";
import { ISendMessage } from "../types/SendMessageType";

class SendMessageServices {
  private client: twilio.Twilio;

  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    // Validate environment variables
    if (!accountSid || !authToken) {
      throw new Error("TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN must be set");
    }
    this.client = twilio(accountSid, authToken);
  }

  async sendMessage({ from, to, body, mediaUrl }: ISendMessage): Promise<void> {
    try {
      await this.client.messages.create({
        body,
        from,
        to,
        mediaUrl,
      });
      console.log("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      throw new Error("Failed to send message");
    }
  }
}

export { SendMessageServices };
