import prisma from "./prisma";
import { PrismaQrCodeCreate, PrismaQrCodeEdit } from "@/types/user";

export function getQrCodes() {
  return prisma.qrCode.findMany({
    include: {
      staff: true,
    },
  });
}

export function getQrCode(id: string) {
  return prisma.qrCode.findUnique({
    where: {
      id,
    },
    include: {
      staff: {
        include: {
          questions: true,
        },
      },
    },
  });
}

export function getQrCodeByCode(code: string) {
  return prisma.qrCode.findUnique({
    where: {
      code,
    },
    include: {
      staff: {
        include: {
          questions: true,
        },
      },
    },
  });
}

export function editQrCode(id: string, data: PrismaQrCodeEdit) {
  return prisma.qrCode.update({
    where: {
      id,
    },
    data,
  });
}

export function createQrCode(data: PrismaQrCodeCreate) {
  return prisma.qrCode.create({
    data,
  });
}

export function deleteQrCode(id: string) {
  return prisma.qrCode.delete({
    where: {
      id,
    },
  });
}
