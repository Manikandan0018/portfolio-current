import Course from "../models/Course.js";

export const createCourse = async (req, res) => {
  try {
    const { title, description, duration, skills_required, difficulty_level } =
      req.body;

    const course = await Course.create({
      title,
      description,
      duration,
      skills_required,
      difficulty_level,
    });

    res.status(201).json(course);
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ is_active: true });

    res.json(courses);
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Course.findByIdAndUpdate(
      id,
      {
        ...req.body,
        updated_at: Date.now(),
      },
      { new: true },
    );

    res.json(updated);
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    await Course.findByIdAndUpdate(id, {
      is_active: false,
      updated_at: Date.now(),
    });

    res.json({ msg: "Course deactivated" });
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};
