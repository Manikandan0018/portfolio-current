import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema({
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },

  missing_skills: [String],

  suggestion_text: String,

  study_plan: String,

  created_at: {
    type: Date,
    default: Date.now,
  },
});

const studentProfileSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },

  known_skills: [String],

  analysis_history: [analysisSchema],

  updated_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("StudentProfile", studentProfileSchema);
