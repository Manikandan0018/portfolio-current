import express from "express";
import auth from "../middleware/auth.js";
import { noteValidation } from "../utils/validators.js";
import {
  createNote,
  listNotes,
  getNote,
  updateNote,
  deleteNote,
} from "../controllers/notesController.js";

const router = express.Router();

router.use(auth);

router.get("/", listNotes);
router.post("/", noteValidation, createNote);
router.get("/:id", getNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
