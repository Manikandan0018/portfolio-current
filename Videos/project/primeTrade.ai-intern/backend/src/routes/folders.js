import express from "express";
import auth from "../middleware/auth.js";
import Folder from "../models/Folder.js";

const router = express.Router();

// create folder
router.post("/", auth, async (req, res) => {
  const { title, color } = req.body;
  try {
    const folder = new Folder({ user: req.user._id, title, color });
    await folder.save();
    res.json({ folder });
  } catch (err) {
    res.status(500).json({ msg: "err" });
  }
});

// list user folders
router.get("/", auth, async (req, res) => {
  try {
    const folders = await Folder.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json({ folders });
  } catch (err) {
    res.status(500).json({ msg: "err" });
  }
});

// get single folder
router.get("/:id", auth, async (req, res) => {
  try {
    const folder = await Folder.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!folder) return res.status(404).json({ msg: "Not found" });
    res.json({ folder });
  } catch (err) {
    res.status(500).json({ msg: "err" });
  }
});

// delete folder (and tasks cascade)
router.delete("/:id", auth, async (req, res) => {
  try {
    const folder = await Folder.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!folder) return res.status(404).json({ msg: "Not found" });
    // cascade delete tasks
    const Task = (await import("../models/Task.js")).default;
    await Task.deleteMany({ folder: folder._id });
    res.json({ msg: "deleted" });
  } catch (err) {
    res.status(500).json({ msg: "err" });
  }
});

export default router;
