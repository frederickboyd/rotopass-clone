import express, { Request, Response } from "express";
import apiRoute from "./routes/api_route";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express!");
});

app.use("/api", apiRoute);
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
