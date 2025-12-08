import React, { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      nav("/dashboard");
    } catch (err) {
      setErr(err?.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="card p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {err && <div className="text-red-500 mb-3">{err}</div>}
        <form onSubmit={submit} className="space-y-3">
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 border rounded-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 border rounded-md"
          />
          <button className="w-full bg-[var(--accent)] text-white py-3 rounded-md">
            Login
          </button>
        </form>
        <p className="mt-3 text-sm">
          No account?{" "}
          <Link to="/register" className="text-[var(--accent)]">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
