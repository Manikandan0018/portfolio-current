// upload.routes.js
import { Router } from "express";
import multer from "multer";
import path from "path";
import { uploadVideo } from "../controllers/upload.controller.js";

const router = Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".webm";
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("video"), uploadVideo);

export default router;
