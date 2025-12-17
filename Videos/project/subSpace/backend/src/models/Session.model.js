import mongoose from "mongoose";

const TranscriptSchema = new mongoose.Schema(
  {
    time: { type: Number, required: true },
    text: { type: String, required: true },
  },
  { _id: false }
);

const SectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    start: { type: Number, required: true },
  },
  { _id: false }
);

const SessionSchema = new mongoose.Schema(
  {
    videoPath: {
      type: String,
      required: true,
    },
    outputVideo: String,
    transcript: {
      type: [TranscriptSchema],
      default: [],
    },

    sections: {
      type: [SectionSchema],
      default: [],
    },

    summary: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["uploaded", "processing", "completed", "error"],
      default: "uploaded",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Session", SessionSchema);
