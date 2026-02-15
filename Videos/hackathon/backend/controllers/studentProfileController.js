import StudentProfile from "../models/StudentProfile.js";

export const saveKnownSkills = async (req, res) => {
  try {
    const { known_skills } = req.body;

    const profile = await StudentProfile.findOneAndUpdate(
      { user_id: req.user.id },
      {
        known_skills,
        updated_at: Date.now(),
      },
      { new: true, upsert: true },
    );

    res.json(profile);
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

export const addAnalysis = async (req, res) => {
  try {
    const { course_id, missing_skills, suggestion_text, study_plan } = req.body;

    const profile = await StudentProfile.findOne({ user_id: req.user.id });

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }

    profile.analysis_history.push({
      course_id,
      missing_skills,
      suggestion_text,
      study_plan,
    });

    profile.updated_at = Date.now();

    await profile.save();

    res.json({ msg: "Analysis saved successfully" });
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ user_id: req.user.id });

    res.json(profile);
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};
