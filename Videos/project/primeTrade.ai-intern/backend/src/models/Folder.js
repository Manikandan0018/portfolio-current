import mongoose from "mongoose";

const FolderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    color: { type: String, default: "#F97316" },
  },
  { timestamps: true }
);

export default mongoose.model("Folder", FolderSchema);
