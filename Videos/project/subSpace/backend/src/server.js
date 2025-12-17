import express from "express";
import http from "http";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";

import authRoutes from "./routes/auth.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import processRoutes from "./routes/process.routes.js";
import {initSocket} from "./socket/socket.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

initSocket(io);

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/process", processRoutes);

// ✅ CONNECT TO MONGODB ATLAS
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
