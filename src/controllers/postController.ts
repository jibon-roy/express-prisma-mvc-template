import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { successResponse } from "./responseController";
import createHttpError from "http-errors";

const prisma = new PrismaClient();

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allPosts = await prisma.post.findMany();

    if (allPosts.length === 0) {
      throw createHttpError(404, "No post found!");
    }
    res.status(200).send(allPosts);
  } catch (error) {
    next(error);
  }
};
