import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Mail, Lock, ArrowRight, Fingerprint } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const cardRef = useRef(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const tl = gsap.timeline();

    gsap.to(".bg-circle", {
      y: "30px",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.5,
    });

    tl.from(cardRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 1.2,
      ease: "expo.out",
    }).from(
      ".animate-up",
      {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.8",
    );
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault(); // ✅ IMPORTANT FIX

    if (!form.email || !form.password) {
      alert("Please enter credentials");
      return;
    }

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);

      // ✅ OPTIONAL ROLE-BASED REDIRECT
      const payload = JSON.parse(atob(data.token.split(".")[1]));

      if (payload.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      alert(data.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="bg-circle absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-200/50 rounded-full blur-[100px]" />
      <div className="bg-circle absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-rose-100/60 rounded-full blur-[120px]" />

      <div
        ref={cardRef}
        className="w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10 relative z-10"
      >
        <div className="animate-up mb-10 text-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-indigo-200">
            <Fingerprint className="text-white w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
            Welcome back
          </h2>
        </div>

        {/* ✅ FIXED FORM HANDLER */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="animate-up group">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Email"
                className="w-full border rounded-xl py-3.5 pl-12 pr-4"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          <div className="animate-up group">
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="password"
                placeholder="Password"
                className="w-full border rounded-xl py-3.5 pl-12 pr-4"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            className="animate-up w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-4 rounded-xl"
          >
            Sign in <ArrowRight className="inline w-4 h-4 ml-2" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-blue-400 hover:text-blue-300"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
