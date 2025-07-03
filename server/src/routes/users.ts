import express from "express";
import userController from "../controllers/users_controller";
const usersRoute = express.Router();

usersRoute.post("/register", userController.registerUserController);
usersRoute.post("/login", userController.loginUserController);
usersRoute.post("/check_expires", userController.checkExpiresController)
export default usersRoute;
