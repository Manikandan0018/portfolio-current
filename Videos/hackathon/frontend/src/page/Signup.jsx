import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "student", // DEFAULT ROLE
  });

  const handleSignup = async () => {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.phone ||
      !form.password
    ) {
      alert("Please fill all fields");
      return;
    }

    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: form.role, // IMPORTANT
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Signup successful");
      navigate("/login");
    } else {
      alert(data.msg || "Signup failed");
    }
  };

  return (
    
  <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
    <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-8">

      <h2 className="text-2xl font-bold text-slate-800 mb-1">
        Create Account
      </h2>
      <p className="text-slate-400 text-sm mb-6">
        Start your learning journey 🚀
      </p>

      <div className="space-y-4">

        <div className="grid grid-cols-2 gap-3">
          <input
            placeholder="First Name"
            className="w-full bg-slate-50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20"
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />

          <input
            placeholder="Last Name"
            className="w-full bg-slate-50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20"
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
        </div>

        <input
          placeholder="Email Address"
          className="w-full bg-slate-50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Phone Number"
          className="w-full bg-slate-50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full bg-slate-50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* ✅ ROLE SELECTOR */}
        <div>
          <label className="text-xs font-semibold text-slate-400 ml-1">
            Select Role
          </label>

          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full mt-1 bg-slate-50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
          >
            <option value="student">🎓 Student</option>
            <option value="admin">🛠 Admin</option>
          </select>
        </div>

        <button
          onClick={handleSignup}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-200/50 transition-all"
        >
          Create Account
        </button>

        <p className="text-center text-sm text-slate-400 pt-3">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  </div>

  );
};

export default Signup;
