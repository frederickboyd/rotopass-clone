import express, { Request, Response } from "express";
import usersRoute from "./routes/users";
import cors from "cors";
import paymentsRoute from "./routes/payments";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express!");
});

app.use("/api/users", usersRoute);
app.use("/api/payments", paymentsRoute);
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
