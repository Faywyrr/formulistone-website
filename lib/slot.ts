import prisma from "./prisma";

export function getSlot(hour: string) {
  return prisma.slot.findUnique({
    where: {
      hour,
    },
  });
}

export function getSlots() {
  return prisma.slot.findMany();
}

export function deleteSlot(hour: string) {
  return prisma.slot.delete({
    where: {
      hour,
    },
  });
}
