import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connection.js";

dotenv.config();

const port = 7000;

const app = express();

app.get("/", (req, res) => {
  return res.status(200).send("Hello World");
});

connectDB();
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
