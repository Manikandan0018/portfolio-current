import Session from "../models/Session.model.js";

export const uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const session = await Session.create({
      videoPath: req.file.path, // ✅ THIS WAS MISSING
      status: "uploaded",
      createdAt: new Date(),
    });

    res.json({
      _id: session._id,
      videoPath: session.videoPath,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};
