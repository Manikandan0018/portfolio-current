import mongoose from "mongoose";

const analysisResultSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },

  known_skills_snapshot: [String],

  missing_skills: [String],

  completed_skills: {
    type: [String],
    default: [], // ✅ CRITICAL
  },

  suggestion_text: String,

  study_plan: String,

  availability_input: String,

  readiness_score: Number,

  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("AnalysisResult", analysisResultSchema);
