import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    skills_required: "",
    difficulty_level: "beginner",
  });

  const token = localStorage.getItem("token");

  const fetchCourses = () => {
    fetch("http://localhost:5000/api/admin/courses", {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then(setCourses);
  };

  useEffect(fetchCourses, []);

  const createCourse = async () => {
    const res = await fetch("http://localhost:5000/api/admin/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        ...form,
        skills_required: form.skills_required.split(",").map((s) => s.trim()),
      }),
    });

    if (res.ok) {
      alert("Course created");
      fetchCourses();
    }
  };

  const deactivateCourse = async (id) => {
    await fetch(`http://localhost:5000/api/admin/courses/${id}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });

    fetchCourses();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-800">Admin Panel</h1>
          <p className="text-slate-400 text-sm">
            Manage courses and prerequisites
          </p>
        </div>

        {/* Create Course Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 mb-10">
          <h2 className="text-lg font-semibold text-slate-700 mb-6">
            Create New Course
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              placeholder="Course Title"
              className="bg-slate-50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20"
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <input
              placeholder="Duration (e.g. 8 weeks)"
              className="bg-slate-50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20"
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
            />

            <input
              placeholder="Description"
              className="bg-slate-50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 md:col-span-2"
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <input
              placeholder="Skills Required (comma separated)"
              className="bg-slate-50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 md:col-span-2"
              onChange={(e) =>
                setForm({ ...form, skills_required: e.target.value })
              }
            />
          </div>

          <button
            onClick={createCourse}
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md shadow-indigo-200/40 transition-all"
          >
            Create Course
          </button>
        </div>

        {/* Courses List */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
          <h2 className="text-lg font-semibold text-slate-700 mb-6">
            All Courses
          </h2>

          {courses.length === 0 ? (
            <p className="text-slate-400 text-sm">No courses available</p>
          ) : (
            <div className="space-y-3">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="flex items-center justify-between bg-slate-50 hover:bg-indigo-50 rounded-xl px-4 py-3 transition-colors"
                >
                  <div>
                    <p className="font-medium text-slate-700">{course.title}</p>
                    <p className="text-xs text-slate-400">{course.duration}</p>
                  </div>

                  <button
                    onClick={() => deactivateCourse(course._id)}
                    className="text-red-500 text-sm font-semibold hover:text-red-600"
                  >
                    Deactivate
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

};

export default AdminDashboard;
