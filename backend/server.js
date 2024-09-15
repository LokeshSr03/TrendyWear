import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

dotenv.config();
connectDb();
const app = express();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port number ${PORT}`);
});
