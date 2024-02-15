import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import "express-async-errors";
import cors from "cors";
require("dotenv");
import * as dotenv from "dotenv";
import { router } from "./routes";
import { twilioRouter } from "./hooks/ReceiveTwilio";
import prismaClient from "./prisma";

const path = require("path");

dotenv.config();

const app = express();

// Add this middleware to parse JSON data
app.use(bodyParser.urlencoded({ extended: true }));
const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));
app.use(express.json());

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(twilioRouter);
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      eror: err.message,
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Internal Server Error.",
  });
});

//Test connection prismaClient to database
prismaClient.$connect().then(() => {
  console.log("Connected to database");
});

app.listen(3001, () => {
  console.log("Rodando na porta 3001");
});

export { app };
