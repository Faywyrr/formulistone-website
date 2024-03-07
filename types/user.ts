import { Prisma } from "@prisma/client";

export type PrismaUser = Prisma.UserGetPayload<null>;
export type PrismaUserEdit = Prisma.UserUpdateInput;

export type PrismaStaff = Prisma.StaffGetPayload<{
  include: {
    questions: true;
  };
}>;
export type PrismaStaffEdit = Prisma.StaffUpdateInput;
export type PrismaStaffCreate = Prisma.StaffCreateInput;

export type PrismaQrCode = Prisma.QrCodeGetPayload<{
  include: {
    staff: true;
  };
}>;
export type PrismaQrCodeEdit = Prisma.QrCodeUpdateInput;
export type PrismaQrCodeCreate = Prisma.QrCodeCreateInput;

export type PrismaQuestion = Prisma.QuestionGetPayload<null>;
