import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key"; // Use a secure secret key in production
const userController = {
  registerUserController: async (
    req: Request,
    res: Response
  ): Promise<void> => {
    console.log("Registering user with data:", req.body);
    const { firstName, lastName, email, password, state } = req.body;

    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        res.status(400).json({ error: "User already exists" });
      }
      const hashedPassword = bcrypt.hashSync(password, 10); // Hash the password
      // Create new user
      const newUser = await prisma.user.create({
        data: {
          first_name: firstName,
          last_name: lastName,
          email,
          password: hashedPassword,
          status: 0,
        },
      });

      const token = jwt.sign(newUser, JWT_SECRET);
      res.status(201).json({ error: null, token });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  loginUserController: async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        res.status(400).json({ error: "Invalid email or password" });
        return;
      }

      // Check password
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      console.log({isPasswordValid})
      if (!isPasswordValid) {
        res.status(400).json({ error: "Invalid email or password" });
        return;
      }

      // Generate JWT token
      const token = jwt.sign(user, JWT_SECRET);
      res.status(200).json({ error: null, token });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default userController;
