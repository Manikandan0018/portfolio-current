import express from "express";
import auth from "../middleware/auth.js";
import Task from "../models/Task.js";
import Folder from "../models/Folder.js";
import mongoose from "mongoose";

const router = express.Router();

// CREATE TASK (note)
router.post("/", auth, async (req, res) => {
  const { folder, title, content, dueDate } = req.body;

  try {
    let folderId = folder;

    // AUTO-CREATE DEFAULT FOLDER
    if (!folderId) {
      let f = await Folder.findOne({ user: req.user._id });
      if (!f) {
        f = new Folder({ user: req.user._id, title: "My Notes" });
        await f.save();
      }
      folderId = f._id.toString();
    }

    // VALIDATE FOLDER BELONGS TO USER
    const f = await Folder.findOne({ _id: folderId, user: req.user._id });
    if (!f) return res.status(400).json({ msg: "Invalid folder" });

    const task = new Task({
      user: req.user._id,
      folder: folderId,
      title,
      content,
      dueDate,
    });

    await task.save();
    res.json({ task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// LIST TASKS
router.get("/", auth, async (req, res) => {
  const { folder, q, date } = req.query;
  const filter = { user: req.user._id };

  if (folder) filter.folder = folder;
  if (q)
    filter.$or = [
      { title: new RegExp(q, "i") },
      { content: new RegExp(q, "i") },
    ];
  if (date) {
    const d = new Date(date);
    const next = new Date(d);
    next.setDate(d.getDate() + 1);
    filter.createdAt = { $gte: d, $lt: next };
  }

  try {
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// GET SINGLE TASK
router.get("/:id", auth, async (req, res) => {
  try {
    const t = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!t) return res.status(404).json({ msg: "Not found" });
    res.json({ task: t });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// UPDATE TASK
router.put("/:id", auth, async (req, res) => {
  const { title, content, completed, status, dueDate, folder } = req.body;

  try {
    const t = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!t) return res.status(404).json({ msg: "Not found" });

    if (title !== undefined) t.title = title;
    if (content !== undefined) t.content = content;
    if (completed !== undefined) t.completed = completed;
    if (status !== undefined) t.status = status;
    if (dueDate !== undefined) t.dueDate = dueDate;
    if (folder !== undefined) t.folder = folder;

    await t.save();
    res.json({ task: t });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  try {
    const t = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!t) return res.status(404).json({ msg: "Not found" });
    res.json({ msg: "deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/stats/summary", auth, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);

    const agg = await Task.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: {
            $cond: [{ $eq: ["$completed", true] }, "completed", "pending"],
          },
          count: { $sum: 1 },
        },
      },
    ]);

    const byDate = await Task.aggregate([
      { $match: { user: userId } },
      {
        $project: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          completed: 1,
        },
      },
      { $sort: { date: 1 } },
      {
        $group: {
          _id: "$date",
          total: { $sum: 1 },
          completed: { $sum: { $cond: ["$completed", 1, 0] } },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({ agg, byDate });
  } catch (err) {
    console.error("SUMMARY ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});


export default router;
