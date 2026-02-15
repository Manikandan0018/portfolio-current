import AnalysisResult from "../models/AnalysisResult.js";
import Course from "../models/Course.js";
import StudentProfile from "../models/StudentProfile.js";
import { generateRealisticPlan } from "../utils/studyPlanner.js";

export const createAnalysisResult = async (req, res) => {
  try {
    const { course_id, availability_input } = req.body;

    const profile = await StudentProfile.findOne({ user_id: req.user.id });
    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    const course = await Course.findById(course_id);
    if (!course) return res.status(404).json({ msg: "Course not found" });

    const normalize = (arr) => arr.map((s) => s.toLowerCase().trim());

    const known = normalize(profile.known_skills);

    const missing_skills = course.skills_required.filter(
      (s) => !known.includes(s.toLowerCase().trim()),
    );

    const readiness_score =
      ((course.skills_required.length - missing_skills.length) /
        course.skills_required.length) *
      100;

    // ✅ REALISTIC LOGIC-BASED PLAN
    const guidance = generateRealisticPlan(
      missing_skills,
      availability_input,
      readiness_score,
    );

    const result = await AnalysisResult.create({
      student_id: req.user.id,
      course_id,
      known_skills_snapshot: profile.known_skills,
      missing_skills,
      suggestion_text: guidance.suggestion,
      study_plan: guidance.plan,
      availability_input,
      readiness_score,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};


export const markSkillComplete = async (req, res) => {
  try {
    const { id } = req.params;
    const { skill } = req.body;

    const result = await AnalysisResult.findById(id);
    if (!result) return res.status(404).json({ msg: "Analysis not found" });

    if (!result.completed_skills.includes(skill)) {
      result.completed_skills.push(skill);
    }

    const total = result.missing_skills.length;
    const done = result.completed_skills.length;

    result.readiness_score = total === 0 ? 100 : (done / total) * 100;

    const remaining = result.missing_skills.filter(
      (s) => !result.completed_skills.includes(s),
    );

    if (remaining.length === 0) {
      result.study_plan =
        "Outstanding progress. All previously missing skills have been completed. You are now fully prepared.";
    } else {
      result.study_plan = `Great progress. Next recommended focus: ${remaining.join(
        ", ",
      )}. Maintain consistency for best results.`;
    }

    await result.save();

    res.json(result);
  } catch {
    res.status(500).json({ msg: "Update failed" });
  }
};
