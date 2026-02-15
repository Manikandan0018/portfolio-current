import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import studentProfileRoutes from "./routes/studentProfileRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import analysisResultRoutes from "./routes/analysisResultRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

console.log("XAI_API_KEY:", process.env.XAI_API_KEY);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.use("/api/auth", authRoutes);
app.use("/api/student-profile", studentProfileRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/analysis-results", analysisResultRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
