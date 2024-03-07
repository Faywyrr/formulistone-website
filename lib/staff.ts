import prisma from "./prisma";
import { PrismaStaffCreate, PrismaStaffEdit } from "@/types/user";

export function getStaff(id: string) {
  return prisma.staff.findUnique({
    where: {
      id,
    },
  });
}

export function getStaffs() {
  return prisma.staff.findMany({
    include: {
      questions: true,
    },
  });
}

export function createStaff(data: PrismaStaffCreate) {
  return prisma.staff.create({
    data,
  });
}

export function deleteStaff(id: string) {
  return prisma.staff.delete({
    where: {
      id,
    },
  });
}

export function editStaff(id: string, data: PrismaStaffEdit) {
  return prisma.staff.update({
    where: {
      id,
    },
    data,
  });
}
