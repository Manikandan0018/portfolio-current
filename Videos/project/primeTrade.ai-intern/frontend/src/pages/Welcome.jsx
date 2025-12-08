import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const n = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      n("/dashboard");
      return;
    }
    const t = setTimeout(() => n("/login"), 3000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card p-12 max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold text-[var(--accent)]">
          OnNotes
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Create folders, add tasks, track progress with charts & calendar.
        </p>
        <p className="mt-4 text-sm text-[var(--muted)]">
          Redirecting to login…
        </p>
      </div>
    </div>
  );
}
