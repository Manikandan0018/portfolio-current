import { useState } from "react";
import { api } from "../services/api";
import { Link } from "react-router-dom";
import logo from '../../image/logo.png'

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      setLoading(true);
      setError("");
      await api.post("/auth/signup", { email, password });
      window.location.href = "/";
    } catch {
      setError("Signup failed. Try a different email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="" />
        </div>

        <h1 className="text-2xl font-semibold mb-6">Create your account</h1>

        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 shadow-sm">
          {error && (
            <p className="bg-red-100 text-red-600 p-2 rounded text-sm">
              {error}
            </p>
          )}

          <div className="text-left">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="mt-1 bg-gray-100 shadow border border-gray-200  w-full  rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="text-left">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              className="mt-1 w-full bg-gray-100 shadow border border-gray-200  rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={submit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg font-medium disabled:opacity-50"
          >
            {loading ? "Creating..." : "Sign up"}
          </button>
        </div>

        <p className="text-sm mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-pink-500 font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
