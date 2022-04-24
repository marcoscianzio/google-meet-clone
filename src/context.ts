import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Session } from "express-session";

export const prisma = new PrismaClient();

export type Context = {
  req: Request & {
    session: Session & {
      userId?: string;
    };
  };
  res: Response;
  prisma: PrismaClient;
};
