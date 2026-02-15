import express from "express";
import {authMiddleware} from "../middleware/authMiddleware.js";
import {
  saveKnownSkills,
  addAnalysis,
  getMyProfile,
} from "../controllers/studentProfileController.js";

const router = express.Router();

router.post("/skills", authMiddleware, saveKnownSkills);
router.post("/analysis", authMiddleware, addAnalysis);
router.get("/me", authMiddleware, getMyProfile);

export default router;
