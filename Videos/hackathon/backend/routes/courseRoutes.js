import express from "express";
import {authMiddleware} from "../middleware/authMiddleware.js";
import {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

const router = express.Router();

router.post("/", authMiddleware, createCourse);
router.get("/", getCourses);
router.put("/:id", authMiddleware, updateCourse);
router.delete("/:id", authMiddleware, deleteCourse);

export default router;
