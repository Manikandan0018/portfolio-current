import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [skillsInput, setSkillsInput] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [availability, setAvailability] = useState("");
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then((res) => res.json())
      .then(setCourses);
  }, []);

  const runAnalysis = async () => {
    if (!selectedCourse || !skillsInput.trim())
      return alert("Enter skills & select course");

    setLoading(true);

    await fetch("http://localhost:5000/api/student-profile/skills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        known_skills: skillsInput.split(",").map((s) => s.toLowerCase().trim()),
      }),
    });

    const res = await fetch("http://localhost:5000/api/analysis-results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        course_id: selectedCourse,
        availability_input: availability,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setAnalysis(data);
      setCompleted(data.completed_skills || []);
    } else alert(data.msg);
  };

  const markComplete = async (skill) => {
    const res = await fetch(
      `http://localhost:5000/api/analysis-results/${analysis._id}/complete`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ skill }),
      },
    );

    const updated = await res.json();

    if (res.ok) {
      setAnalysis(updated);
      setCompleted(updated.completed_skills);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans p-4 md:p-12 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#E0E7FF] rounded-full blur-[120px] -z-10 opacity-60" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-[#FEE2E2] rounded-full blur-[100px] -z-10 opacity-60" />

      <div className="max-w-7xl mx-auto">
        <header className="mb-12 space-y-2">
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            AI-Powered Analysis
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
            SKILL<span className="text-indigo-600">GAP</span>
          </h1>
          <p className="text-lg text-gray-500 font-medium">
            Map your trajectory. Fill the void.
          </p>
        </header>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Input Module */}
          <div className="lg:col-span-5 bg-white border-2 border-black rounded-[2rem] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center text-sm">
                01
              </span>
              Define Your Baseline
            </h2>

            <div className="space-y-6">
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">
                  Known Skills
                </label>
                <textarea
                  placeholder="React, HTML, CSS, Node.js..."
                  className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-indigo-500 focus:bg-white transition-all outline-none resize-none h-32 font-medium"
                  onChange={(e) => setSkillsInput(e.target.value)}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">
                    Target Goal
                  </label>
                  <select
                    className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-indigo-500 outline-none appearance-none cursor-pointer font-bold"
                    onChange={(e) => setSelectedCourse(e.target.value)}
                  >
                    <option>Select Course</option>
                    {courses.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">
                    Velocity
                  </label>
                  <input
                    placeholder="2 hrs/day"
                    className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-indigo-500 outline-none font-bold"
                    onChange={(e) => setAvailability(e.target.value)}
                  />
                </div>
              </div>

              <button
                onClick={runAnalysis}
                disabled={loading}
                className="w-full bg-black text-white py-5 rounded-2xl font-black text-xl uppercase tracking-tighter hover:bg-indigo-600 transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-xl"
              >
                {loading ? "Processing..." : "Generate Audit"}
                {!loading && (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            {!analysis ? (
              <div className="h-full min-h-[400px] rounded-[2rem] border-4 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300">
                <svg
                  className="w-16 h-16 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="font-bold text-xl uppercase tracking-widest italic">
                  Awaiting Parameters
                </p>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">

                                  <div className="bg-indigo-600 rounded-[2rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />

                  <div className="relative z-10">
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-8 opacity-80">
                      Operational Readiness
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-8xl font-black tracking-tighter leading-none">
                        {(analysis.readiness_score || 0).toFixed(0)}
                      </span>
                      <span className="text-4xl font-black text-indigo-200">
                        %
                      </span>
                    </div>

                    <div className="mt-8 w-full bg-black/20 rounded-full h-4 overflow-hidden border border-white/10">
                      <div
                        className="bg-white h-full transition-all duration-1000 ease-out"
                        style={{ width: `${analysis.readiness_score}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-black rounded-[2rem] p-8">
                  <h3 className="text-xl font-bold mb-6 flex items-center justify-between">
                    The Skill Gap Bridge
                    <span className="text-xs bg-gray-100 px-3 py-1 rounded-lg">
                      LIVE FEED
                    </span>
                  </h3>

                  <div className="grid gap-3">
                    {analysis.missing_skills.map((skill) => (
                      <div
                        key={skill}
                        className="group flex items-center justify-between p-4 bg-gray-50 hover:bg-white border-2 border-transparent hover:border-black rounded-2xl transition-all"
                      >
                        <span
                          className={`font-bold text-lg uppercase tracking-tight ${completed.includes(skill) ? "text-gray-300 line-through" : "text-gray-800"}`}
                        >
                          {skill}
                        </span>

                        {completed.includes(skill) ? (
                          <div className="flex items-center gap-2 text-green-600 font-black text-xs uppercase italic">
                            <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center italic">
                              ✓
                            </span>
                            Mastered
                          </div>
                        ) : (
                          <button
                            onClick={() => markComplete(skill)}
                            className="bg-white border-2 border-black text-black px-5 py-2 rounded-xl text-xs font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                          >
                            Mark Complete
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#FFEB3B] border-2 border-black rounded-[2rem] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-xs font-black uppercase tracking-widest text-black/60 mb-3">
                    System Suggestion / Study Plan
                  </h3>
                  <p className="text-xl font-bold leading-tight text-black italic">
                    "{analysis.study_plan}"
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
