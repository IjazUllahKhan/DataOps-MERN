import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connection.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("./uploads"));
app.use("/public", express.static("./public/exports"));
const port = 7000;

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  return res.status(200).send("Hello World");
});

connectDB();
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
