import { Response } from "express";

export const errorResponse = (
  res: Response,
  { statusCode = 400, message = "Internal Server Error" }
) => {
  return res.status(statusCode).json({ success: false, message });
};

interface Payload {
  allUsers: any[];
}

interface SuccessResponseOptions {
  statusCode: number;
  message: string;
  payload?: Payload;
}

export const successResponse = (
  res: Response,
  options: SuccessResponseOptions
) => {
  const { statusCode = 200, message, payload = {} } = options;
  return res.status(statusCode).json({ success: true, message, payload });
};
