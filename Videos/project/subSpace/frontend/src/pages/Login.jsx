import { useState } from "react";
import { api } from "../services/api";
import { Link } from "react-router-dom";
import logo from '../../image/logo.png'


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="" />
        </div>

        <h1 className="text-2xl font-semibold mb-6">Log in to Clueso</h1>

        <div className="border border-gray-200 bg-white rounded-xl p-6 space-y-4 shadow-sm">
          <div className="text-left">
            <label className="text-sm font-medium">Email</label>
            <input
              className="mt-1 w-full bg-gray-100 shadow border border-gray-200  rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="text-left">
            <div className="flex justify-between text-sm font-medium">
              <label>Password</label>
              <span className="text-pink-500 cursor-pointer">
                Forgot password?
              </span>
            </div>
            <input
              type="password"
              className="mt-1 w-full bg-gray-100 shadow border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={submit}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg font-medium"
          >
            Log in with email
          </button>
        </div>

        <p className="text-sm mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-pink-500 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
