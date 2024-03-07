import prisma from "./prisma";
import { PrismaUserEdit } from "@/types/user";

export function getUser(username: string) {
  return prisma.user.findUnique({
    where: {
      username,
    },
    include: {
      scans: {
        include: {
          qrCode: {
            include: {
              staff: true,
            },
          },
        },
      },
      slots: true,
    },
  });
}

export function getUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      scans: {
        include: {
          qrCode: {
            include: {
              staff: true,
            },
          },
        },
      },
      slots: true,
    },
  });
}

export function editUser(id: string, data: PrismaUserEdit) {
  return prisma.user.update({
    where: {
      id,
    },
    data,
  });
}

export function getUsers() {
  return prisma.user.findMany();
}

export function createOrGetUser(
  username: string | undefined,
  email: string,
  firstName: string,
  lastName: string,
) {
  return prisma.user.upsert({
    where: {
      email,
    },
    update: {},
    create: {
      username,
      email,
      firstName,
      lastName,
    },
  });
}
