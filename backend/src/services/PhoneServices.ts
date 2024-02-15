import prismaClient from "../prisma";

class PhoneServices {
  async create(phoneNumber: string) {
    const phoneAlreadyExists = await prismaClient.phones.findFirst({
      where: {
        phoneNumber,
      },
    });

    if (phoneAlreadyExists) {
      throw new Error("Phone already exists!");
    }

    const phoneCreated = await prismaClient.phones.create({
      data: {
        phoneNumber,
      },
    });

    return phoneCreated;
  }

  async getAllPhones() {
    const phones = await prismaClient.phones.findMany();
    return phones;
  }
}

export { PhoneServices };
