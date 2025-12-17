import express from "express";
import { processVideo, getSession } from "../controllers/process.controller.js";

const router = express.Router();

router.post("/", processVideo);
router.get("/:id", getSession);

export default router;
