import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { successResponse } from "./responseController";
import createHttpError from "http-errors";

const prisma = new PrismaClient();

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const allUsers = await prisma.user.findMany({
      include: {
        posts: true,
      },
    });

    if (allUsers.length === 0) {
      throw createHttpError(404, "users not found!");
    }
    successResponse(res, {
      statusCode: 200,
      message: "users return successfully",
      payload: { allUsers },
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, name } = req.body;
  try {
    await prisma.user.create({
      data: {
        email,
        name,
      },
    });
    return successResponse(res, {
      statusCode: 200,
      message: "user created successfull",
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      include: {
        posts: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: "User not found",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
