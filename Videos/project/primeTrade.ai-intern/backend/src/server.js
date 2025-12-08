import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import folderRoutes from "./routes/folders.js";
import taskRoutes from "./routes/tasks.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 4000;
const MONGO = process.env.MONGO_URI;

mongoose.set("strictQuery", false);

mongoose
  .connect(MONGO)
  .then(() => {
    console.log("Mongo connected");
    app.listen(PORT, () => console.log(`Server ${PORT}`));
  })
  .catch((err) => {
    console.error("Mongo err", err);
  });
