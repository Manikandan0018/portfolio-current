import { validationResult } from "express-validator";
import Note from "../models/Note.js";

export const createNote = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { title, content, tags } = req.body;
  try {
    const note = new Note({
      userId: req.userId,
      title,
      content: content || "",
      tags: Array.isArray(tags) ? tags : tags ? [tags] : [],
    });
    await note.save();
    res.json({ note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

export const listNotes = async (req, res) => {
  // supports ?q=text & tag=tagname & sort=createdAt|updatedAt & page/limit (basic)
  const { q, tag, sort = "-createdAt", page = 1, limit = 50 } = req.query;
  const skip = (Math.max(1, page) - 1) * Number(limit);

  const filter = { userId: req.userId };
  if (q)
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { content: { $regex: q, $options: "i" } },
      { tags: { $regex: q, $options: "i" } },
    ];
  if (tag) filter.tags = tag;

  try {
    const notes = await Note.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));
    const total = await Note.countDocuments(filter);
    res.json({ notes, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

export const getNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.userId });
    if (!note) return res.status(404).json({ msg: "Note not found" });
    res.json({ note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { $set: req.body },
      { new: true }
    );
    if (!note) return res.status(404).json({ msg: "Note not found" });
    res.json({ note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!note) return res.status(404).json({ msg: "Note not found" });
    res.json({ msg: "Deleted", note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
