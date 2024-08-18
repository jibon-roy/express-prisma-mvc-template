import express, { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { userRouter } from "./src/routers/userRouter";
import { errorResponse } from "./src/controllers/responseController";
import bodyParser from "body-parser";

export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//router point
app.use("/api", userRouter);

//client error handling
app.use((req, res, next) => {
  next(createHttpError(404, "route not found"));
});

interface CustomError extends Error {
  status?: number;
}

//api handling all errors
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  return errorResponse(res, {
    statusCode: err.status || 500,
    message: err.message,
  });
});

app.listen(3000, () =>
  console.log(`
🚀 Server ready at: ${port}`)
);
