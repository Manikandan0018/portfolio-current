import Session from "../models/Session.model.js";
import { extractAudio } from "../utils/ffmpeg.js";
import { speechToText } from "../services/deepgram.service.js";
import { emitStatus } from "../socket/socket.js";

export const processVideo = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    emitStatus(sessionId, "Extracting audio...");
    const audioPath = await extractAudio(session.videoPath);

    emitStatus(sessionId, "Transcribing with Deepgram...");
    const transcript = await speechToText(audioPath);

    if (!transcript.length) {
      session.status = "error";
      session.summary = "No speech detected";
      session.transcript = [];
      session.sections = [];
      await session.save();

      emitStatus(sessionId, "No speech detected");
      return res.json({ success: false });
    }

    session.transcript = transcript;
    session.summary = transcript.map((t) => t.text).join(" ");
    session.sections = transcript.map((t, i) => ({
      title: `Section ${i + 1}`,
      start: t.time,
    }));
    session.status = "completed";

    await session.save();

    emitStatus(sessionId, "Completed");
    res.json({ success: true });
  } catch (err) {
    console.error("❌ processVideo error:", err);
    res.status(500).json({ error: "Processing failed" });
  }
};

export const getSession = async (req, res) => {
  const session = await Session.findById(req.params.id);
  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }
  res.json(session);
};
