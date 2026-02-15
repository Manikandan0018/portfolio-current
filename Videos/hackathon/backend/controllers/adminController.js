import Course from "../models/Course.js";

export const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch {
    res.status(500).json({ msg: "Failed to create course" });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updated_at: Date.now() },
      { new: true },
    );

    res.json(updated);
  } catch {
    res.status(500).json({ msg: "Update failed" });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndUpdate(req.params.id, {
      is_active: false,
      updated_at: Date.now(),
    });

    res.json({ msg: "Course deactivated" });
  } catch {
    res.status(500).json({ msg: "Delete failed" });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch {
    res.status(500).json({ msg: "Fetch failed" });
  }
};
