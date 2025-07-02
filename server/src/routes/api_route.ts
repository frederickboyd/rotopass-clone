import { Request, Response } from "express";
import express from "express";
import { PrismaClient } from "@prisma/client";
import userController from "../controllers/user_controller";
const prisma = new PrismaClient();
const apiRoute = express.Router();

apiRoute.post("/register", userController.registerUserController);
apiRoute.post("/login", userController.loginUserController);
export default apiRoute;
