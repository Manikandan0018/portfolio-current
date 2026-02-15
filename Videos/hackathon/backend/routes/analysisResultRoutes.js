import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createAnalysisResult,
  markSkillComplete,
} from "../controllers/analysisResultController.js";

const router = express.Router();

router.post("/", authMiddleware, createAnalysisResult);
router.put("/:id/complete", authMiddleware, markSkillComplete);

export default router;